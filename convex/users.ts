import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create user with automatic 7-day trial
export const createUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (existingUser) {
      return existingUser._id;
    }

    const now = Date.now();
    const trialEndDate = now + (7 * 24 * 60 * 60 * 1000); // 7 days from now

    const userId = await ctx.db.insert("users", {
      clerkId: args.clerkId,
      email: args.email,
      firstName: args.firstName,
      lastName: args.lastName,
      plan: "trial",
      documentsUsed: 0,
      trialStartDate: now,
      trialEndDate: trialEndDate,
      subscriptionStatus: "trial",
      createdAt: now,
      updatedAt: now,
    });

    return userId;
  },
});

// Get user by Clerk ID
export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();
  },
});

// Check trial status
export const getTrialStatus = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!user) {
      return null;
    }

    const now = Date.now();
    const timeRemaining = user.trialEndDate - now;
    const daysRemaining = Math.ceil(timeRemaining / (24 * 60 * 60 * 1000));

    return {
      isTrialActive: now < user.trialEndDate && user.subscriptionStatus === "trial",
      isPaidUser: user.subscriptionStatus === "active",
      daysRemaining: Math.max(0, daysRemaining),
      hoursRemaining: Math.max(0, Math.ceil(timeRemaining / (60 * 60 * 1000))),
      trialEnded: now >= user.trialEndDate,
      subscriptionStatus: user.subscriptionStatus,
      plan: user.plan,
    };
  },
});

// Update subscription status (called after payment)
export const updateSubscriptionStatus = mutation({
  args: {
    clerkId: v.string(),
    subscriptionStatus: v.union(
      v.literal("active"),
      v.literal("cancelled"),
      v.literal("expired"),
      v.literal("past_due")
    ),
    dodoCustomerId: v.optional(v.string()),
    dodoSubscriptionId: v.optional(v.string()),
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
      subscriptionStatus: args.subscriptionStatus,
      plan: args.subscriptionStatus === "active" ? "pro" : user.plan,
      dodoCustomerId: args.dodoCustomerId,
      dodoSubscriptionId: args.dodoSubscriptionId,
      updatedAt: Date.now(),
    });
  },
});

// Check if user can create documents (trial or paid)
export const canCreateDocument = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!user) {
      return false;
    }

    const now = Date.now();
    const isTrialActive = now < user.trialEndDate && user.subscriptionStatus === "trial";
    const isPaidUser = user.subscriptionStatus === "active";

    return isTrialActive || isPaidUser;
  },
});


// Get current user
export const getCurrentUser = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();
  },
});


// Increment document usage
export const incrementDocumentUsage = mutation({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(user._id, {
      documentsUsed: user.documentsUsed + 1,
      updatedAt: Date.now(),
    });
  },
});


// Add this mutation to convex/users.ts
// export const updateSubscriptionStatus = mutation({
//   args: {
//     clerkId: v.string(),
//     subscriptionStatus: v.union(
//       v.literal("active"),
//       v.literal("cancelled"),
//       v.literal("expired"),
//       v.literal("past_due")
//     ),
//     dodoCustomerId: v.optional(v.string()),
//     dodoSubscriptionId: v.optional(v.string()),
//   },
//   handler: async (ctx, args) => {
//     const user = await ctx.db
//       .query("users")
//       .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
//       .first();

//     if (!user) {
//       throw new Error("User not found");
//     }

//     await ctx.db.patch(user._id, {
//       subscriptionStatus: args.subscriptionStatus,
//       plan: args.subscriptionStatus === "active" ? "pro" : user.plan,
//       dodoCustomerId: args.dodoCustomerId || user.dodoCustomerId,
//       dodoSubscriptionId: args.dodoSubscriptionId || user.dodoSubscriptionId,
//       updatedAt: Date.now(),
//     });

//     return { success: true };
//   },
// });
