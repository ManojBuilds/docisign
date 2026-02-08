import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import { query } from "./_generated/server";

// Get dashboard stats
export const getDashboardStats = query({
  args: { ownerId: v.string() },
  handler: async (ctx, args) => {
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_owner", (q) => q.eq("ownerId", args.ownerId))
      .filter((q) => q.and(
        q.neq(q.field("isTemplate"), true),
        q.neq(q.field("isArchived"), true)
      ))
      .collect();

    const stats = {
      totalDocuments: documents.length,
      draftDocuments: documents.filter(d => d.status === "draft").length,
      sentDocuments: documents.filter(d => d.status === "sent").length,
      completedDocuments: documents.filter(d => d.status === "completed").length,
      recentDocuments: documents
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 5),
    };

    return stats;
  },
});

// Search documents
export const searchDocuments = query({
  args: {
    ownerId: v.string(),
    searchTerm: v.optional(v.string()),
    status: v.optional(v.union(
      v.literal("draft"),
      v.literal("sent"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("expired"),
      v.literal("cancelled"),
      v.literal("declined")
    )),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const { ownerId, searchTerm, status, paginationOpts } = args;

    let baseQuery;

    if (searchTerm) {
      baseQuery = ctx.db
        .query("documents")
        .withSearchIndex("by_title", (q) =>
          q.search("title", searchTerm).eq("ownerId", ownerId)
        )
        .filter((q) => q.and(
          q.neq(q.field("isTemplate"), true),
          q.neq(q.field("isArchived"), true)
        ));
    } else {
      baseQuery = ctx.db
        .query("documents")
        .withIndex("by_owner", (q) => q.eq("ownerId", ownerId))
        .filter((q) => q.and(
          q.neq(q.field("isTemplate"), true),
          q.neq(q.field("isArchived"), true)
        ))
        .order('desc');
    }

    if (status) {
      baseQuery = baseQuery.filter((q) => q.eq(q.field("status"), status));
    }

    const results = await baseQuery.paginate(paginationOpts);

    if (results.page.length === 0) {
      return { ...results, page: [] };
    }

    // Batch query: Get all signature fields for all documents in the page at once
    const allSignatureFieldsArrays = await Promise.all(
      results.page.map((doc) =>
        ctx.db
          .query("signatureFields")
          .withIndex("by_document", (q) => q.eq("documentId", doc._id))
          .collect()
      )
    );

    // Build a map of documentId -> unique signer emails
    const signersByDocId = new Map<string, string[]>();
    results.page.forEach((doc, index) => {
      const fields = allSignatureFieldsArrays[index];
      const uniqueSigners = [
        ...new Set(
          fields
            .map((f) => f.signerEmail)
            .filter((email): email is string => Boolean(email))
        ),
      ];
      signersByDocId.set(doc._id, uniqueSigners);
    });

    return {
      ...results,
      page: results.page.map((doc) => ({
        ...doc,
        signers: signersByDocId.get(doc._id) || [],
      })),
    };
  },
});

// New query to get total storage used
export const getTotalStorageUsed = query({
  args: { ownerId: v.string() },
  handler: async (ctx, args) => {
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_owner", (q) => q.eq("ownerId", args.ownerId))
      .collect();

    const totalBytes = documents.reduce((sum, doc) => sum + (doc.fileSizeBytes || 0), 0);

    return totalBytes;
  },
});
