import { ConvexError, v } from "convex/values";
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
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthorized");
    if (args.ownerId !== identity.subject) {
      throw new ConvexError("Unauthorized");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) throw new ConvexError("User not found");

    // Protection for trial users: Check if they can create documents
    const now = Date.now();
    const isTrialActive = now < user.trialEndDate && user.subscriptionStatus === "trial";
    const isPaidUser = user.subscriptionStatus === "active";
    if (!isTrialActive && !isPaidUser) {
      throw new ConvexError("Your trial has expired. Please upgrade to continue.");
    }

    const documentId = await ctx.db.insert("documents", {
      ...args,
      status: "draft",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      documentHash: args.documentHash,
    });

    return documentId;
  },
});

// Get user's documents
export const getUserDocuments = query({
  args: {
    ownerId: v.string(),
    paginationOpts: v.any(),
    status: v.optional(v.string()),
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthorized");
    if (args.ownerId !== identity.subject) throw new ConvexError("Unauthorized");

    let query = ctx.db
      .query("documents")
      .withIndex("by_owner", (q) => q.eq("ownerId", args.ownerId));

    if (args.search) {
      // Use search index if search query is provided
      return await ctx.db
        .query("documents")
        .withSearchIndex("by_title", (q) =>
          q.search("title", args.search!).eq("ownerId", args.ownerId)
        )
        .paginate(args.paginationOpts);
    }

    return await query.order("desc").paginate(args.paginationOpts);
  },
});

// Get single document with details
export const getDocument = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const document = await ctx.db.get(args.documentId);
    if (!document) return null;

    // Parallel fetch: fields and URL
    const [signatureFields, fileUrl] = await Promise.all([
      ctx.db
        .query("signatureFields")
        .withIndex("by_document", (q) => q.eq("documentId", args.documentId))
        .collect(),
      ctx.storage.getUrl(document.fileStorageId),
    ]);

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
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    const document = await ctx.db.get(args.documentId);
    if (!document) throw new Error("Document not found");
    if (document.ownerId !== identity.subject) throw new Error("Not the document owner");

    const updateData: Record<string, unknown> = {
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
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    const document = await ctx.db.get(args.documentId);
    if (!document) throw new Error("Document not found");
    if (document.ownerId !== identity.subject) throw new Error("Not the document owner");

    console.log(`[deleteDocument] Starting deletion for ${args.documentId}`);

    // Check if other documents share the same storage file
    const otherDocsWithSameFile = await ctx.db
      .query("documents")
      .withIndex("by_file_storage_id", (q) => q.eq("fileStorageId", document.fileStorageId))
      .collect();

    const isLastReferenceToStorage = otherDocsWithSameFile.length === 1;
    console.log(`[deleteDocument] File storage ID: ${document.fileStorageId}. References count: ${otherDocsWithSameFile.length}. Is last ref: ${isLastReferenceToStorage}`);

    // Delete associated signature fields
    const fields = await ctx.db
      .query("signatureFields")
      .withIndex("by_document", (q) => q.eq("documentId", args.documentId))
      .collect();

    console.log(`[deleteDocument] Deleting ${fields.length} signature fields`);
    for (const field of fields) {
      await ctx.db.delete(field._id);
    }

    // Delete the file from storage ONLY if no other document refers to it
    if (isLastReferenceToStorage) {
      console.log(`[deleteDocument] Deleting file from storage: ${document.fileStorageId}`);
      try {
        await ctx.storage.delete(document.fileStorageId);
      } catch (error) {
        console.error(`[deleteDocument] Error deleting storage key ${document.fileStorageId}:`, error);
        // We continue even if storage delete fails to clean up DB record
      }
    } else {
      console.log(`[deleteDocument] Skipping storage deletion, file still in use by ${otherDocsWithSameFile.length - 1} other document(s)`);
    }

    // Finally delete the document
    console.log(`[deleteDocument] Deleting document record: ${args.documentId}`);
    await ctx.db.delete(args.documentId);
    console.log(`[deleteDocument] Finished deletion for ${args.documentId}`);
  },
});

// Generate file URL
export const getFileUrl = query({
  args: {
    storageId: v.id("_storage"),
    token: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // 1. If token is provided, allow access if the token matches a signature field for a document with this storageId
    if (args.token) {
      const field = await ctx.db
        .query("signatureFields")
        .withIndex("by_access_token", (q) => q.eq("accessToken", args.token!))
        .first();

      if (field) {
        const doc = await ctx.db.get(field.documentId);
        if (doc && doc.fileStorageId === args.storageId) {
          return await ctx.storage.getUrl(args.storageId);
        }
      }
    }

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
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    const document = await ctx.db.get(args.documentId);
    if (!document) throw new Error("Document not found");
    if (document.ownerId !== identity.subject) throw new Error("Not the document owner");

    await ctx.db.patch(args.documentId, {
      title: args.title,
      updatedAt: Date.now(),
    });
  },
});
