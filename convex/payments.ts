import { v } from "convex/values";
import { action } from "./_generated/server";
import { checkout, customerPortal } from "./dodo";

/**
 * Create a checkout session for the $15/month Pro plan with 7-day free trial
 * This action creates a DodoPayments checkout session
 */
export const createCheckout = action({
  args: {
    productId: v.string(), // The DodoPayments product ID for the $15/month plan
    returnUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: User must be logged in to create a checkout session");
    }

    const returnUrl = args.returnUrl || `${process.env.NEXT_PUBLIC_APP_URL}/upgrade/success`;

    return await checkout(ctx, {
      payload: {
        product_cart: [
          {
            product_id: args.productId,
            quantity: 1,
          },
        ],
        return_url: returnUrl,
        billing_currency: "USD",
        feature_flags: {
          allow_discount_code: false, // Disable discount codes for simplicity
        },
        metadata: {
          clerkId: identity.subject,
        },
      },
    });
  },
});

/**
 * Create a customer portal session for managing subscriptions
 * This allows users to update payment methods, cancel subscriptions, etc.
 */
export const createCustomerPortal = action({
  args: {
    send_email: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    return await customerPortal(ctx, args);
  },
});
