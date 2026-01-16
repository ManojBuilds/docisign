import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getBranding = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!user) return null;

    let logoUrl = null;
    if (user.brandLogoStorageId) {
      logoUrl = await ctx.storage.getUrl(user.brandLogoStorageId);
    }

    return {
      brandName: user.brandName || "",
      brandLogoStorageId: user.brandLogoStorageId,
      logoUrl,
    };
  },
});

export const updateBranding = mutation({
  args: {
    clerkId: v.string(),
    brandName: v.optional(v.string()),
    brandLogoStorageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(user._id, {
      brandName: args.brandName,
      brandLogoStorageId: args.brandLogoStorageId,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});
