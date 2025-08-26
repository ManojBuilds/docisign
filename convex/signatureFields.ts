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
    assignedToEmail: v.string(),
    assignedToName: v.string(),
    isRequired: v.optional(v.boolean()),
    label: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("signatureFields", {
      ...args,
      isRequired: args.isRequired ?? true,
      isCompleted: false,
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
    assignedToEmail: v.optional(v.string()),
    assignedToName: v.optional(v.string()),
    label: v.optional(v.string()),
    isRequired: v.optional(v.boolean()),
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
  },
  handler: async (ctx, args) => {
    const field = await ctx.db.get(args.fieldId);
    if (!field) throw new Error("Signature field not found");

    await ctx.db.patch(args.fieldId, {
      isCompleted: true,
      signatureData: args.signatureData,
      completedAt: Date.now(),
    });

    // Check if all fields for this document are completed
    const remainingFields = await ctx.db
      .query("signatureFields")
      .withIndex("by_completion_status", (q) =>
        q.eq("documentId", field.documentId).eq("isCompleted", false)
      )
      .collect();

    // If no remaining fields, generate the final PDF and mark document as completed
    await ctx.scheduler.runAfter(0, internal.actions.generateSignedPdf, {
      documentId: field.documentId,
    });

    if (remainingFields.length === 0) {
      await ctx.db.patch(field.documentId, {
        status: "completed",
        completedAt: Date.now(),
      });



      // Log completion
      await ctx.db.insert("documentActivities", {
        documentId: field.documentId,
        actorEmail: field.assignedToEmail,
        actorType: "signer",
        actionType: "completed",
        details: "All signature fields completed",
        timestamp: Date.now(),
      });
    }
  },
});

// Save all signature fields for a document
// export const saveSignatureFields = mutation({
//   args: {
//     documentId: v.id("documents"),
//     fields: v.array(
//       v.object({
//         fieldType: v.union(
//           v.literal("signature"),
//           v.literal("initial"),
//           v.literal("date"),
//           v.literal("text")
//         ),
//         page: v.number(),
//         x: v.number(),
//         y: v.number(),
//         width: v.number(),
//         height: v.number(),
//         assignedToEmail: v.string(),
//         isRequired: v.optional(v.boolean()),
//         label: v.optional(v.string()),
//       })
//     ),
//   },
//   handler: async (ctx, args) => {
//     // Delete existing fields for this document
//     const existingFields = await ctx.db
//       .query("signatureFields")
//       .withIndex("by_document", (q) => q.eq("documentId", args.documentId))
//       .collect();

//     for (const field of existingFields) {
//       await ctx.db.delete(field._id);
//     }

//     // Insert new fields
//     for (const field of args.fields) {
//       await ctx.db.insert("signatureFields", {
//         ...field,
//         documentId: args.documentId,
//         isCompleted: false,
//         createdAt: Date.now(),
//       });
//     }
//   },
// });

