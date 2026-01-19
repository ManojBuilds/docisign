import { v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";

// Upload and create document
export const createDocument = mutation({
  args: {
    title: v.string(),
    originalFileName: v.string(),
    fileStorageId: v.id("_storage"),
    fileType: v.union(v.literal("pdf"), v.literal("doc"), v.literal("docx")),
    fileSizeBytes: v.number(),
    ownerId: v.string(),
    pageCount: v.number(),
    documentHash: v.optional(v.string()), // For document integrity verification
  },
  handler: async (ctx, args) => {
    const documentId = await ctx.db.insert("documents", {
      ...args,
      status: "draft",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      documentHash: args.documentHash
    });


    return documentId;
  },
});

// Get user's documents
export const getUserDocuments = query({
  args: { ownerId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("documents")
      .withIndex("by_owner", (q) => q.eq("ownerId", args.ownerId))
      .order("desc")
      .collect();
  },
});

// Get single document with details
export const getDocument = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const document = await ctx.db.get(args.documentId);
    if (!document) return null;

    const signatureFields = await ctx.db
      .query("signatureFields")
      .withIndex("by_document", (q) => q.eq("documentId", args.documentId))
      .collect();

    // Get unique signers from signature fields
    const uniqueSignersMap = new Map();
    for (const field of signatureFields) {
      if (field.signerEmail && !uniqueSignersMap.has(field.signerEmail)) {
        uniqueSignersMap.set(field.signerEmail, {
          _id: field._id,
          email: field.signerEmail,
          name: field.signerName,
          documentId: field.documentId,
          status: field.status,
        });
      }
    }
    const signers = Array.from(uniqueSignersMap.values());

    const fileUrl = await ctx.storage.getUrl(document.fileStorageId);

    return {
      ...document,
      signatureFields,
      signers,
      fileUrl,
    };
  },
});

// Update document status
export const updateDocumentStatus = mutation({
  args: {
    documentId: v.id("documents"),
    status: v.union(
      v.literal("draft"),
      v.literal("sent"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("expired"),
      v.literal("cancelled")
    ),
  },
  handler: async (ctx, args) => {
    const updateData: any = {
      status: args.status,
      updatedAt: Date.now(),
    };

    if (args.status === "completed") {
      updateData.completedAt = Date.now();
    }

    await ctx.db.patch(args.documentId, updateData);

  },
});

// Delete document
export const deleteDocument = mutation({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const document = await ctx.db.get(args.documentId);
    if (!document) {
      throw new Error("Document not found");
    }

    // Delete associated signature fields (which contain signer info)
    const fields = await ctx.db
      .query("signatureFields")
      .withIndex("by_document", (q) => q.eq("documentId", args.documentId))
      .collect();

    for (const field of fields) {
      await ctx.db.delete(field._id);
    }


    // Delete the file from storage
    await ctx.storage.delete(document.fileStorageId);

    // Finally delete the document
    await ctx.db.delete(args.documentId);
  },
});

// Generate file URL
export const getFileUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

export const updateDocumentFile = internalMutation({
  args: {
    documentId: v.id("documents"),
    fileStorageId: v.id("_storage"),
    fileType: v.optional(v.union(v.literal("pdf"), v.literal("doc"), v.literal("docx"))),
  },
  handler: async (ctx, args) => {
    const patch: any = {
      fileStorageId: args.fileStorageId,
      updatedAt: Date.now(),
    };
    if (args.fileType) {
      patch.fileType = args.fileType;
    }
    await ctx.db.patch(args.documentId, patch);
  },
});

export const updateDocumentTitle = mutation({
  args: {
    documentId: v.id("documents"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.documentId, {
      title: args.title,
      updatedAt: Date.now(),
    });
  },
});
