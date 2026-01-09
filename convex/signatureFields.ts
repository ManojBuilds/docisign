import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { api, internal } from "./_generated/api";

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

    await ctx.db.patch(args.fieldId, updates);

    // Check if all fields for this signer are completed
    const remainingFields = await ctx.db
      .query("signatureFields")
      .withIndex("by_document_and_signer", (q) =>
        q
          .eq("documentId", field.documentId)
          .eq("signerEmail", field.signerEmail)
      )
      .filter(q => q.eq(q.field("isCompleted"), false))
      .collect();

    // If no remaining fields, trigger finalization logic

    if (remainingFields.length === 0) {
      // Update the signer's overall status to "signed"
      await ctx.runMutation(api.signers.finalizeDocument, {
        documentId: field.documentId,
        signerEmail: field.signerEmail,
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
      })
    ),
  },
  handler: async (ctx, args) => {
    // Delete existing fields for this document
    const existingFields = await ctx.db
      .query("signatureFields")
      .withIndex("by_document", (q) => q.eq("documentId", args.documentId))
      .collect();

    for (const field of existingFields) {
      await ctx.db.delete(field._id);
    }

    // Insert new fields
    for (const field of args.fields) {
      await ctx.db.insert("signatureFields", {
        ...field,
        documentId: args.documentId,
        isRequired: field.isRequired ?? true,
        isCompleted: false,
        status: field.status || "pending",
        accessToken: field.accessToken || crypto.randomUUID(),
        reminderCount: field.reminderCount || 0,
        createdAt: Date.now(),
      });
    }
  },
});
