import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

/**
 * Get all available templates
 */
export const getTemplates = query({
  args: { ownerId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (!args.ownerId) return [];

    return await ctx.db
      .query("documents")
      .withIndex("by_owner", (q) => q.eq("ownerId", args.ownerId!))
      .filter((q) => q.eq(q.field("isTemplate"), true))
      .order("desc") // Sort by creation time (descending)
      .collect();
  },
});

/**
 * Get a specific template with its roles and fields
 */
export const getTemplateDetails = query({
  args: { templateId: v.id("documents") },
  handler: async (ctx, args) => {
    const template = await ctx.db.get(args.templateId);
    if (!template || !template.isTemplate) {
      throw new Error("Template not found");
    }

    const fields = await ctx.db
      .query("signatureFields")
      .withIndex("by_document", (q) => q.eq("documentId", args.templateId))
      .collect();

    return {
      template,
      fields,
    };
  },
});

/**
 * Save a copy of an existing document as a reusable template
 */
export const createTemplateFromDocument = mutation({
  args: {
    documentId: v.id("documents"),
    title: v.string(), // New title for the template
    roleMappings: v.array(
      v.object({
        email: v.string(),
        role: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    console.log(`[createTemplateFromDocument] Starting template creation from document: ${args.documentId}`);

    const originalDoc = await ctx.db.get(args.documentId);
    if (!originalDoc) {
      console.error(`[createTemplateFromDocument] Document not found: ${args.documentId}`);
      throw new Error("Document not found");
    }

    console.log(`[createTemplateFromDocument] Found original document: "${originalDoc.title}". Storage ID: ${originalDoc.fileStorageId}`);

    // Validate that all emails in the original document have corresponding role mappings
    const fields = await ctx.db
      .query("signatureFields")
      .withIndex("by_document", (q) => q.eq("documentId", args.documentId))
      .collect();

    console.log(`[createTemplateFromDocument] Found ${fields.length} signature fields in original document`);

    const originalSignerEmails = fields
      .map(field => field.signerEmail)
      .filter(email => email !== undefined && email !== null) as string[];

    const mappedEmails = args.roleMappings.map(m => m.email);
    const unmappedEmails = originalSignerEmails.filter(
      email => email && !mappedEmails.includes(email)
    );

    if (unmappedEmails.length > 0) {
      console.error(`[createTemplateFromDocument] Missing role mappings for emails: ${unmappedEmails.join(', ')}`);
      throw new Error(`Missing role mappings for emails: ${unmappedEmails.join(', ')}`);
    }

    const roles = Array.from(new Set(args.roleMappings.map((m) => m.role)));
    console.log(`[createTemplateFromDocument] Creating template with roles: ${roles.join(', ')}`);

    // 1. Create a NEW document record for the template
    const templateId = await ctx.db.insert("documents", {
      title: args.title,
      originalFileName: originalDoc.originalFileName,
      fileStorageId: originalDoc.fileStorageId,
      fileType: originalDoc.fileType,
      fileSizeBytes: originalDoc.fileSizeBytes,
      ownerId: originalDoc.ownerId,
      pageCount: originalDoc.pageCount,
      status: "draft",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      documentHash: originalDoc.documentHash,
      isTemplate: true,
      templateRoles: roles,
    });

    console.log(`[createTemplateFromDocument] Created template document record: ${templateId}`);

    // 2. Clone fields to the new template
    let clonedFieldsCount = 0;
    for (const field of fields) {
      // Determine the role for this field based on the original signer's email
      let rolePlaceholder = undefined;
      if (field.signerEmail) {
        const mapping = args.roleMappings.find(
          (m) => m.email === field.signerEmail
        );
        if (mapping) {
          rolePlaceholder = mapping.role;
        }
      }

      await ctx.db.insert("signatureFields", {
        documentId: templateId,
        fieldType: field.fieldType,
        page: field.page,
        x: field.x,
        y: field.y,
        width: field.width,
        height: field.height,
        isRequired: field.isRequired,
        label: field.label,
        signerEmail: undefined, // Templates don't have specific emails
        signerName: undefined,
        rolePlaceholder: rolePlaceholder,
        signerOrder: field.signerOrder,
        status: "pending",
        isCompleted: false,
        accessToken: crypto.randomUUID(),
        createdAt: Date.now(),
        reminderCount: 0,
      });
      clonedFieldsCount++;
    }

    console.log(`[createTemplateFromDocument] Cloned ${clonedFieldsCount} fields to template`);

    // 3. Mark the original document as archived so it doesn't clutter the dashboard
    console.log(`[createTemplateFromDocument] Archiving original source document: ${args.documentId}`);
    await ctx.db.patch(args.documentId, {
      isArchived: true,
      updatedAt: Date.now(),
    });

    console.log(`[createTemplateFromDocument] Successfully completed template creation: ${templateId}`);
    return templateId;
  },
});

/**
 * Delete a template and all its associated signature fields
 */
export const deleteTemplate = mutation({
  args: {
    templateId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    console.log(`[deleteTemplate] Starting deletion for template: ${args.templateId}`);

    const template = await ctx.db.get(args.templateId);
    if (!template || !template.isTemplate) {
      console.error(`[deleteTemplate] Template not found or invalid: ${args.templateId}`);
      throw new Error("Template not found or is not a template");
    }

    // Check if the template is being used by other documents
    const documentsUsingThisTemplate = await ctx.db
      .query("documents")
      .withIndex("by_template", (q) => q.eq("templateId", args.templateId))
      .collect();

    if (documentsUsingThisTemplate.length > 0) {
      console.error(`[deleteTemplate] Cannot delete template ${args.templateId} - used by ${documentsUsingThisTemplate.length} documents`);
      throw new Error("Cannot delete template because it is being used by other documents");
    }

    // Check if other documents share the same storage file (instances, etc.)
    const otherDocsWithSameFile = await ctx.db
      .query("documents")
      .withIndex("by_file_storage_id", (q) => q.eq("fileStorageId", template.fileStorageId))
      .collect();

    const isLastReferenceToStorage = otherDocsWithSameFile.length === 1;
    console.log(`[deleteTemplate] File storage ID: ${template.fileStorageId}. References count: ${otherDocsWithSameFile.length}. Is last ref: ${isLastReferenceToStorage}`);

    // Delete all signature fields associated with the template
    const templateFields = await ctx.db
      .query("signatureFields")
      .withIndex("by_document", (q) => q.eq("documentId", args.templateId))
      .collect();

    console.log(`[deleteTemplate] Deleting ${templateFields.length} signature fields`);
    for (const field of templateFields) {
      await ctx.db.delete(field._id);
    }

    // Delete the file from storage ONLY if no other document refers to it
    if (isLastReferenceToStorage) {
      console.log(`[deleteTemplate] Deleting file from storage: ${template.fileStorageId}`);
      try {
        await ctx.storage.delete(template.fileStorageId);
      } catch (error) {
        console.error(`[deleteTemplate] Error deleting storage key ${template.fileStorageId}:`, error);
      }
    } else {
      console.log(`[deleteTemplate] Skipping storage deletion, file still in use by ${otherDocsWithSameFile.length - 1} other record(s)`);
    }

    // Delete the template document itself
    console.log(`[deleteTemplate] Deleting template record: ${args.templateId}`);
    await ctx.db.delete(args.templateId);
    console.log(`[deleteTemplate] Finished template deletion successfully`);

    return { success: true };
  },
});

/**
 * Instantiate a document from a template using role mappings
 */
export const instantiateTemplate = mutation({
  args: {
    templateId: v.id("documents"),
    title: v.optional(v.string()),
    ownerId: v.string(),
    signerMappings: v.array(
      v.object({
        role: v.string(),
        email: v.string(),
        name: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    console.log(`[instantiateTemplate] Starting instantiation from template: ${args.templateId}`);
    console.log(`[instantiateTemplate] Signer mappings received:`, JSON.stringify(args.signerMappings));

    const template = await ctx.db.get(args.templateId);
    if (!template || !template.isTemplate) {
      console.error(`[instantiateTemplate] Template not found or invalid: ${args.templateId}`);
      throw new Error("Template not found or is not a template");
    }

    console.log(`[instantiateTemplate] Found template: "${template.title}". File storage ID: ${template.fileStorageId}`);

    // Validate that all required roles have mappings
    if (template.templateRoles) {
      const unmappedRoles = template.templateRoles.filter(
        role => !args.signerMappings.some(mapping => mapping.role === role)
      );

      if (unmappedRoles.length > 0) {
        console.error(`[instantiateTemplate] Missing signer mappings for roles: ${unmappedRoles.join(', ')}`);
        throw new Error(`Missing signer mappings for roles: ${unmappedRoles.join(', ')}`);
      }
    }

    // 1. Create the new document instance with the same file reference
    const documentId = await ctx.db.insert("documents", {
      title: args.title || template.title,
      originalFileName: template.originalFileName,
      fileStorageId: template.fileStorageId, // Reuse the same file
      fileType: template.fileType,
      fileSizeBytes: template.fileSizeBytes,
      ownerId: args.ownerId,
      pageCount: template.pageCount,
      status: "draft",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      documentHash: template.documentHash,
      templateId: template._id,
      isTemplate: false,
    });

    console.log(`[instantiateTemplate] Created new document record: ${documentId} for user ${args.ownerId}`);

    // 2. Clone the signature fields and map them to the real signers
    const templateFields = await ctx.db
      .query("signatureFields")
      .withIndex("by_document", (q) => q.eq("documentId", args.templateId))
      .collect();

    console.log(`[instantiateTemplate] Cloning ${templateFields.length} signature fields from template`);

    let clonedFieldsCount = 0;
    for (const field of templateFields) {
      let signerEmail = "";
      let signerName = "";

      // Map the field based on rolePlaceholder if it exists
      if (field.rolePlaceholder) {
        const mapping = args.signerMappings.find(
          (m) => m.role === field.rolePlaceholder
        );

        if (mapping) {
          signerEmail = mapping.email;
          signerName = mapping.name;
          console.log(`[instantiateTemplate] Mapped role "${field.rolePlaceholder}" to ${signerEmail}`);
        } else {
          // If no mapping found for a role-based field, throw an error
          console.error(`[instantiateTemplate] No signer mapping found for role: "${field.rolePlaceholder}"`);
          throw new Error(`No signer mapping found for role: "${field.rolePlaceholder}"`);
        }
      } else {
        // For fields without role placeholders, use the original values if they exist
        signerEmail = field.signerEmail || "";
        signerName = field.signerName || "";
      }

      await ctx.db.insert("signatureFields", {
        documentId,
        fieldType: field.fieldType,
        page: field.page,
        x: field.x,
        y: field.y,
        width: field.width,
        height: field.height,
        isRequired: field.isRequired,
        label: field.label,
        signerEmail,
        signerName,
        rolePlaceholder: undefined,
        signerOrder: field.signerOrder,
        status: "pending",
        isCompleted: false,
        accessToken: crypto.randomUUID(),
        createdAt: Date.now(),
        reminderCount: 0,
      });
      clonedFieldsCount++;
    }

    console.log(`[instantiateTemplate] Successfully cloned ${clonedFieldsCount} fields to ${documentId}`);
    console.log(`[instantiateTemplate] Finished instantiation successfully`);
    return documentId;
  },
});

/**
 * Create a new document based on an SEO template (legacy/static)
 */
export const createDocumentFromTemplate = mutation({
  args: {
    templateId: v.string(),
    title: v.string(),
    fileStorageId: v.id("_storage"),
    fileSizeBytes: v.number(),
    ownerId: v.string(),
    originalFileName: v.string(),
    fileType: v.union(v.literal("pdf"), v.literal("doc"), v.literal("docx")),
    pageCount: v.number(),
    documentHash: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("documents", {
      ...args,
      status: "draft",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});
