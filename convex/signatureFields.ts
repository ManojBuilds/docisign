import { v } from "convex/values";
import { api } from "./_generated/api";
import { mutation, query } from "./_generated/server";

// Add signature field
export const addSignatureField = mutation({
  args: {
    documentId: v.id("documents"),
    fieldType: v.union(
      v.literal("signature"),
      v.literal("initial"),
      v.literal("date"),
      v.literal("text")
    ),
    page: v.number(),
    x: v.number(),
    y: v.number(),
    width: v.number(),
    height: v.number(),
    signerEmail: v.string(),
    signerName: v.string(),
    isRequired: v.optional(v.boolean()),
    label: v.optional(v.string()),
    signerOrder: v.optional(v.number()),
    status: v.optional(v.union(
      v.literal("pending"),
      v.literal("sent"),
      v.literal("viewed"),
      v.literal("signed"),
      v.literal("declined"),
    )),
    accessToken: v.optional(v.string()),
    sentAt: v.optional(v.number()),
    viewedAt: v.optional(v.number()),
    signedAt: v.optional(v.number()),
    completedAt: v.optional(v.number()),
    signatureData: v.optional(v.string()),
    auditTrail: v.optional(v.object({
      ip: v.string(),
      timestamp: v.string(),
      userAgent: v.string(),
      signedAt: v.number(),
    })),
    reminderCount: v.optional(v.number()),
    lastReminderAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("signatureFields", {
      ...args,
      isRequired: args.isRequired ?? true,
      isCompleted: false,
      status: args.status || "pending",
      accessToken: args.accessToken || crypto.randomUUID(),
      reminderCount: args.reminderCount || 0,
      createdAt: Date.now(),
    });
  },
});

// Update signature field position
export const updateSignatureField = mutation({
  args: {
    fieldId: v.id("signatureFields"),
    x: v.number(),
    y: v.number(),
    width: v.optional(v.number()),
    height: v.optional(v.number()),
    signerEmail: v.optional(v.string()),
    signerName: v.optional(v.string()),
    label: v.optional(v.string()),
    isRequired: v.optional(v.boolean()),
    signerOrder: v.optional(v.number()),
    status: v.optional(v.union(
      v.literal("pending"),
      v.literal("sent"),
      v.literal("viewed"),
      v.literal("signed"),
      v.literal("declined"),
    )),
    accessToken: v.optional(v.string()),
    sentAt: v.optional(v.number()),
    viewedAt: v.optional(v.number()),
    signedAt: v.optional(v.number()),
    completedAt: v.optional(v.number()),
    signatureData: v.optional(v.string()),
    auditTrail: v.optional(v.object({
      ip: v.string(),
      timestamp: v.string(),
      userAgent: v.string(),
      signedAt: v.number(),
    })),
    reminderCount: v.optional(v.number()),
    lastReminderAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { fieldId, ...rest } = args;
    await ctx.db.patch(fieldId, rest);
  },
});

// Delete signature field
export const deleteSignatureField = mutation({
  args: { fieldId: v.id("signatureFields") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.fieldId);
  },
});

// Get signature fields for document
export const getDocumentSignatureFields = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("signatureFields")
      .withIndex("by_document", (q) => q.eq("documentId", args.documentId))
      .collect();
  },
});

// Complete signature field (when signed)
export const completeSignatureField = mutation({
  args: {
    fieldId: v.id("signatureFields"),
    signatureData: v.string(),
    auditInfo: v.optional(v.object({
      ip: v.string(),
      timestamp: v.string(),
      userAgent: v.string(),
    })),
  },
  handler: async (ctx, args) => {
    const field = await ctx.db.get(args.fieldId);
    if (!field) throw new Error("Signature field not found");

    const updates: any = {
      isCompleted: true,
      signatureData: args.signatureData,
      completedAt: Date.now(),
      status: "signed", // Update status to signed when completed
      signedAt: Date.now(), // Set signedAt timestamp
    };

    // Add audit information if provided
    if (args.auditInfo) {
      updates.auditTrail = {
        ip: args.auditInfo.ip,
        timestamp: args.auditInfo.timestamp,
        userAgent: args.auditInfo.userAgent,
        signedAt: Date.now(),
      };
    }

    const signerEmail = field.signerEmail.trim().toLowerCase();
    await ctx.db.patch(args.fieldId, updates);

    // Check if all fields for this signer are completed
    // We only care about fields for this signer on this document
    const signerFields = await ctx.db
      .query("signatureFields")
      .withIndex("by_document_and_signer", (q) =>
        q
          .eq("documentId", field.documentId)
          .eq("signerEmail", signerEmail)
      )
      .collect();

    const remainingIncomplete = signerFields.filter(f => f.isRequired && !f.isCompleted && f._id !== args.fieldId);

    // If no remaining required fields, trigger finalization logic
    if (remainingIncomplete.length === 0) {
      await ctx.runMutation(api.signers.finalizeDocument, {
        documentId: field.documentId,
        signerEmail: signerEmail,
      });
    }
  },
});

// Complete multiple signature fields at once
export const batchCompleteSignatureFields = mutation({
  args: {
    fields: v.array(v.object({
      fieldId: v.id("signatureFields"),
      signatureData: v.string(),
    })),
    auditInfo: v.optional(v.object({
      ip: v.string(),
      timestamp: v.string(),
      userAgent: v.string(),
    })),
  },
  handler: async (ctx, args) => {
    if (args.fields.length === 0) return;

    const firstField = await ctx.db.get(args.fields[0].fieldId);
    if (!firstField) throw new Error("Signature field not found");

    const documentId = firstField.documentId;
    const signerEmail = firstField.signerEmail.trim().toLowerCase();

    for (const fieldUpdate of args.fields) {
      const updates: any = {
        isCompleted: true,
        signatureData: fieldUpdate.signatureData,
        completedAt: Date.now(),
        status: "signed",
        signedAt: Date.now(),
      };

      if (args.auditInfo) {
        updates.auditTrail = {
          ...args.auditInfo,
          signedAt: Date.now(),
        };
      }

      await ctx.db.patch(fieldUpdate.fieldId, updates);
    }

    // After updating all fields, check if document should be finalized for this signer
    const signerFields = await ctx.db
      .query("signatureFields")
      .withIndex("by_document_and_signer", (q) =>
        q
          .eq("documentId", documentId)
          .eq("signerEmail", signerEmail)
      )
      .collect();

    const remainingIncomplete = signerFields.filter(f => f.isRequired && !f.isCompleted);

    if (remainingIncomplete.length === 0) {
      await ctx.runMutation(api.signers.finalizeDocument, {
        documentId,
        signerEmail,
      });
    }
  },
});

// Save all signature fields for a document
export const saveSignatureFields = mutation({
  args: {
    documentId: v.id("documents"),
    fields: v.array(
      v.object({
        id: v.optional(v.string()),
        fieldType: v.union(
          v.literal("signature"),
          v.literal("initial"),
          v.literal("date"),
          v.literal("text")
        ),
        page: v.number(),
        x: v.number(),
        y: v.number(),
        width: v.number(),
        height: v.number(),
        signerEmail: v.string(),
        signerName: v.string(),
        isRequired: v.optional(v.boolean()),
        label: v.optional(v.string()),
        signerOrder: v.optional(v.number()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const document = await ctx.db.get(args.documentId);
    if (!document) throw new Error("Document not found");

    const existingFields = await ctx.db
      .query("signatureFields")
      .withIndex("by_document", (q) => q.eq("documentId", args.documentId))
      .collect();

    const incomingIds = new Set(args.fields.map(f => f.id).filter(Boolean));

    // 1. Delete fields that are no longer present
    let hasChanges = false;
    for (const field of existingFields) {
      if (!incomingIds.has(field._id)) {
        await ctx.db.delete(field._id);
        hasChanges = true;
      }
    }

    // 2. Update or Insert fields
    let hasNewOrModifiedFields = false;
    for (const field of args.fields) {
      const existing = field.id ? existingFields.find(f => f._id === field.id) : null;

      const fieldData = {
        documentId: args.documentId,
        fieldType: field.fieldType,
        page: field.page,
        x: field.x,
        y: field.y,
        width: field.width,
        height: field.height,
        signerEmail: field.signerEmail.trim().toLowerCase(),
        signerName: field.signerName,
        isRequired: field.isRequired ?? true,
        label: field.label || "",
        signerOrder: field.signerOrder,
      };

      if (existing) {
        // Update existing, preserving completion data
        await ctx.db.patch(existing._id, fieldData);
      } else {
        // Insert new
        hasNewOrModifiedFields = true;
        await ctx.db.insert("signatureFields", {
          ...fieldData,
          status: "pending",
          isCompleted: false,
          accessToken: crypto.randomUUID(),
          reminderCount: 0,
          createdAt: Date.now(),
        });
      }
    }

    // 3. If it was completed and we added new fields, mark it as in_progress or draft again
    // This prevents a "Completed" document from having unfulfilled fields.
    if (document.status !== "draft" && (hasChanges || hasNewOrModifiedFields)) {
      await ctx.db.patch(args.documentId, {
        status: "draft",
        updatedAt: Date.now(),
      });

      await ctx.db.insert("documentActivities", {
        documentId: args.documentId,
        actorEmail: "owner", // Should ideally be current user email, but we don't have it here easily without more args
        actorType: "owner",
        actionType: "updated",
        details: "Document re-opened for new signatures.",
        timestamp: Date.now(),
      });
    } else {
      await ctx.db.insert("documentActivities", {
        documentId: args.documentId,
        actorEmail: "owner",
        actorType: "owner",
        actionType: "updated",
        details: "Signature fields updated.",
        timestamp: Date.now(),
      });
    }

    return { success: true };
  },
});
