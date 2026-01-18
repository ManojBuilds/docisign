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
        );
    } else {
      baseQuery = ctx.db
        .query("documents")
        .withIndex("by_owner", (q) => q.eq("ownerId", ownerId))
        .order('desc');
    }

    if (status) {
      baseQuery = baseQuery.filter((q) => q.eq(q.field("status"), status));
    }

    const results = await baseQuery.paginate(paginationOpts);

    return {
      ...results,
      page: await Promise.all(
        results.page.map(async (doc) => {
          const signatureFields = await ctx.db
            .query("signatureFields")
            .withIndex("by_document", (q) => q.eq("documentId", doc._id))
            .collect();

          const uniqueSigners = [...new Set(signatureFields.map((f) => f.signerEmail))];

          return {
            ...doc,
            signers: uniqueSigners,
          };
        })
      ),
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
