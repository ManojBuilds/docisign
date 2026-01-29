import { ConvexError, v } from "convex/values";
import { action, internalMutation, mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import { api, internal } from "./_generated/api";

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
      throw new ConvexError("Template not found");
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
 * Internal mutation to create a template and archived original document
 */
export const createTemplateInternal = internalMutation({
  args: {
    documentId: v.id("documents"),
    title: v.string(),
    fileStorageId: v.id("_storage"),
    roleMappings: v.array(
      v.object({
        email: v.string(),
        role: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const originalDoc = await ctx.db.get(args.documentId);
    if (!originalDoc) {
      throw new ConvexError("Document not found");
    }

    const fields = await ctx.db
      .query("signatureFields")
      .withIndex("by_document", (q) => q.eq("documentId", args.documentId))
      .collect();

    const roles = Array.from(new Set(args.roleMappings.map((m) => m.role)));

    // 1. Create a NEW document record for the template
    const templateId = await ctx.db.insert("documents", {
      title: args.title,
      originalFileName: originalDoc.originalFileName,
      fileStorageId: args.fileStorageId, // Now using the copied file
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

    // 2. Clone fields to the new template
    for (const field of fields) {
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
        signerEmail: undefined,
        signerName: undefined,
        rolePlaceholder: rolePlaceholder,
        signerOrder: field.signerOrder,
        status: "pending",
        isCompleted: false,
        accessToken: crypto.randomUUID(),
        createdAt: Date.now(),
        reminderCount: 0,
      });
    }

    // 3. Mark the original document as archived
    await ctx.db.patch(args.documentId, {
      isArchived: true,
      updatedAt: Date.now(),
    });

    return templateId;
  },
});

/**
 * Save a copy of an existing document as a reusable template
 */
export const createTemplateFromDocument = action({
  args: {
    documentId: v.id("documents"),
    title: v.string(),
    roleMappings: v.array(
      v.object({
        email: v.string(),
        role: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    console.log(`[createTemplateFromDocument] Action starting for document: ${args.documentId}`);

    // 1. Get original document (internal query or runQuery)
    const originalDoc = await ctx.runQuery(api.documents.getDocument, {
      documentId: args.documentId
    });

    if (!originalDoc || !("fileStorageId" in originalDoc)) {
      throw new ConvexError("Document file not found");
    }

    // 2. Copy the file in storage
    const originalFile = await ctx.storage.get(originalDoc.fileStorageId as Id<"_storage">);
    if (!originalFile) {
      throw new ConvexError("Source file not found in storage");
    }

    const newFileStorageId = await ctx.storage.store(originalFile);
    if (!newFileStorageId) {
      throw new ConvexError("Failed to store copied file");
    }
    console.log(`[createTemplateFromDocument] Copied file to: ${newFileStorageId}`);

    // 3. Create template via internal mutation
    const templateId: Id<"documents"> = await ctx.runMutation(internal.templates.createTemplateInternal, {
      documentId: args.documentId,
      title: args.title,
      fileStorageId: newFileStorageId,
      roleMappings: args.roleMappings,
    });

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
      throw new ConvexError("Template not found or is not a template");
    }

    // Check if the template is being used by other documents
    const documentsUsingThisTemplate = await ctx.db
      .query("documents")
      .withIndex("by_template", (q) => q.eq("templateId", args.templateId))
      .collect();

    if (documentsUsingThisTemplate.length > 0) {
      console.error(`[deleteTemplate] Cannot delete template ${args.templateId} - used by ${documentsUsingThisTemplate.length} documents`);
      throw new ConvexError("Cannot delete template because it is being used by other documents");
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
/**
 * Internal mutation to create a document instance and clone fields
 */
export const createInstanceFromTemplateInternal = internalMutation({
  args: {
    templateId: v.id("documents"),
    title: v.string(),
    ownerId: v.string(),
    fileStorageId: v.id("_storage"),
    signerMappings: v.array(
      v.object({
        role: v.string(),
        email: v.string(),
        name: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const template = await ctx.db.get(args.templateId);
    if (!template || !template.isTemplate) {
      throw new ConvexError("Template not found or is not a template");
    }

    // 1. Create the new document record
    const documentId = await ctx.db.insert("documents", {
      title: args.title,
      originalFileName: template.originalFileName,
      fileStorageId: args.fileStorageId,
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

    // 2. Clone the signature fields
    const templateFields = await ctx.db
      .query("signatureFields")
      .withIndex("by_document", (q) => q.eq("documentId", args.templateId))
      .collect();

    for (const field of templateFields) {
      let signerEmail = "";
      let signerName = "";

      if (field.rolePlaceholder) {
        const mapping = args.signerMappings.find(
          (m) => m.role === field.rolePlaceholder
        );

        if (mapping) {
          signerEmail = mapping.email;
          signerName = mapping.name;
        } else {
          throw new ConvexError(`No signer mapping found for role: "${field.rolePlaceholder}"`);
        }
      } else {
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
        accessToken: (globalThis as any).crypto.randomUUID(),
        createdAt: Date.now(),
        reminderCount: 0,
      });
    }

    return documentId;
  },
});

/**
 * Instantiate a document from a template using role mappings
 */
export const instantiateTemplate = action({
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
    console.log(`[instantiateTemplate] Action starting for template: ${args.templateId}`);

    // 1. Get template details (via query)
    const result = await ctx.runQuery(api.templates.getTemplateDetails, {
      templateId: args.templateId
    });

    if (!result || !result.template) {
      throw new ConvexError("Template details not found");
    }

    const { template } = result;

    // 2. Copy the template file in storage
    const templateFile = await ctx.storage.get(template.fileStorageId);
    if (!templateFile) {
      throw new ConvexError("Template file not found in storage");
    }

    const newFileStorageId = await ctx.storage.store(templateFile);
    console.log(`[instantiateTemplate] Copied template file to: ${newFileStorageId}`);

    // 3. Create the instance via internal mutation
    const documentId: Id<"documents"> = await ctx.runMutation(internal.templates.createInstanceFromTemplateInternal, {
      templateId: args.templateId,
      title: args.title || template.title,
      ownerId: args.ownerId,
      fileStorageId: newFileStorageId,
      signerMappings: args.signerMappings,
    });

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
