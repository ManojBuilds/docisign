import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get document activities
export const getDocumentActivities = query({
  args: {
    documentId: v.id("documents"),
    limit: v.optional(v.number()), // Make limit optional
  },
  handler: async (ctx, args) => {
    let q = ctx.db
      .query("documentActivities")
      .withIndex("by_document", (q) => q.eq("documentId", args.documentId))
      .order("desc");

    if (args.limit) {
      return await q.take(args.limit);
    } else {
      return await q.collect();
    }
  },
});

// Add activity log
export const logActivity = mutation({
  args: {
    documentId: v.id("documents"),
    actorEmail: v.string(),
    actorType: v.union(v.literal("owner"), v.literal("signer")),
    actionType: v.union(
      v.literal("created"),
      v.literal("updated"),
      v.literal("sent"),
      v.literal("viewed"),
      v.literal("signed"),
      v.literal("completed"),
      v.literal("expired"),
      v.literal("cancelled"),
      v.literal("declined"),
      v.literal("reminder_sent")
    ),
    details: v.optional(v.string()),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("documentActivities", {
      ...args,
      timestamp: Date.now(),
    });
  },
});
