import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { api } from "./_generated/api";

export const generateOTP = mutation({
  args: {
    email: v.string(),
    purpose: v.union(v.literal("signer_verification"), v.literal("email_verification")),
  },
  handler: async (ctx, args) => {
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // OTP expires in 5 minutes
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000;

    // Remove any existing unverified OTPs for this email and purpose
    const existingOtps = await ctx.db
      .query("otps")
      .withIndex("by_email_and_purpose", (q) =>
        q.eq("email", args.email).eq("purpose", args.purpose)
      )
      .filter((q) => q.eq(q.field("verified"), false))
      .collect();

    for (const otpRecord of existingOtps) {
      await ctx.db.delete(otpRecord._id);
    }

    // Store the new OTP
    const otpId = await ctx.db.insert("otps", {
      email: args.email,
      otp,
      purpose: args.purpose,
      expiresAt,
      verified: false,
      createdAt: Date.now(),
    });

    // Schedule sending OTP email using the emails module
    await ctx.scheduler.runAfter(0, api.emails.sendOtpEmail, {
      email: args.email,
      otp,
      purpose: args.purpose,
    });

    return { success: true, otpId };
  },
});

export const verifyOTP = mutation({
  args: {
    email: v.string(),
    otp: v.string(),
    purpose: v.union(v.literal("signer_verification"), v.literal("email_verification")),
  },
  handler: async (ctx, args) => {
    // Find the OTP record
    const otpRecord = await ctx.db
      .query("otps")
      .withIndex("by_email_and_purpose", (q) =>
        q.eq("email", args.email).eq("purpose", args.purpose)
      )
      .filter((q) => q.eq(q.field("verified"), false))
      .order("desc")
      .first();

    if (!otpRecord) {
      return { success: false, error: "No OTP found for this email and purpose" };
    }

    // Check if OTP is expired
    if (otpRecord.expiresAt < Date.now()) {
      return { success: false, error: "OTP has expired" };
    }

    // Check if OTP matches
    if (otpRecord.otp !== args.otp) {
      return { success: false, error: "Invalid OTP" };
    }

    // Mark OTP as verified
    await ctx.db.patch(otpRecord._id, {
      verified: true,
    });

    return { success: true };
  },
});

export const checkVerificationStatus = query({
  args: {
    email: v.string(),
    purpose: v.union(v.literal("signer_verification"), v.literal("email_verification")),
  },
  handler: async (ctx, args) => {
    // Find the most recent verified OTP for this email and purpose
    const verifiedOtp = await ctx.db
      .query("otps")
      .withIndex("by_email_and_purpose", (q) =>
        q.eq("email", args.email).eq("purpose", args.purpose)
      )
      .filter((q) => q.eq(q.field("verified"), true))
      .order("desc")
      .first();

    if (!verifiedOtp) {
      return { isVerified: false };
    }

    // Check if verification was done within the last 30 days (or however long you want to keep it valid)
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    if (verifiedOtp.createdAt < thirtyDaysAgo) {
      return { isVerified: false };
    }

    return { 
      isVerified: true,
      verifiedAt: verifiedOtp.createdAt
    };
  },
});

export const cleanExpiredOtps = mutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();

    // Find all expired OTPs
    const expiredOtps = await ctx.db
      .query("otps")
      .withIndex("by_created_at")
      .filter((q) => q.lt(q.field("expiresAt"), now))
      .collect();

    // Delete expired OTPs
    for (const otp of expiredOtps) {
      await ctx.db.delete(otp._id);
    }

    return { deletedCount: expiredOtps.length };
  },
});