import { v } from "convex/values";
import { mutation } from "./_generated/server";

/**
 * Create a document from a template
 * This is similar to createDocument but accepts a templateId to track template usage
 */
export const createDocumentFromTemplate = mutation({
  args: {
    title: v.string(),
    originalFileName: v.string(),
    fileStorageId: v.id("_storage"),
    fileType: v.union(v.literal("pdf"), v.literal("doc"), v.literal("docx")),
    fileSizeBytes: v.number(),
    ownerId: v.string(),
    pageCount: v.number(),
    documentHash: v.optional(v.string()),
    templateId: v.string(), // ID of the template this was created from
  },
  handler: async (ctx, args) => {
    const documentId = await ctx.db.insert("documents", {
      title: args.title,
      originalFileName: args.originalFileName,
      fileStorageId: args.fileStorageId,
      fileType: args.fileType,
      fileSizeBytes: args.fileSizeBytes,
      ownerId: args.ownerId,
      pageCount: args.pageCount,
      status: "draft",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      documentHash: args.documentHash,
      templateId: args.templateId,
    });


    return documentId;
  },
});
