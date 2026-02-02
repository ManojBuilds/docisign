import { httpRouter } from "convex/server";
import { Webhook, WebhookUnbrandedRequiredHeaders } from "standardwebhooks";
import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";
import { resend } from "./emails";

const http = httpRouter();

http.route({
  path: "/resend-webhook",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    return await resend.handleResendEventWebhook(ctx, req);
  }),
});

/**
 * DodoPayments webhook handler
 * This handles subscription events from DodoPayments and updates user subscription status
 *
 * IMPORTANT: Configure this endpoint in your DodoPayments dashboard
 * Webhook URL: https://your-convex-site.convex.site/dodo-webhook
 */
http.route({
  path: "/dodo-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    type SubscriptionStatus = "expired" | "active" | "cancelled" | "past_due";

    interface DodoSubscriptionPayload {
      business_id: string;
      data: {
        subscription_id: string;
        status: string;
        customer: {
          customer_id: string;
          email: string;
          name: string;
        };
        metadata: Record<string, any>;
      };
      timestamp: string;
      type: string;
    }

    // Verify webhook signature
    const webhook = new Webhook(process.env.DODO_PAYMENTS_WEBHOOK_SECRET!);

    const webhookHeaders: WebhookUnbrandedRequiredHeaders = {
      "webhook-id": request.headers.get("webhook-id") || "",
      "webhook-signature": request.headers.get("webhook-signature") || "",
      "webhook-timestamp": request.headers.get("webhook-timestamp") || "",
    };

    const rawBody = await request.text();

    try {
      // Verify the webhook signature
      webhook.verify(rawBody, webhookHeaders);

      const payload: DodoSubscriptionPayload = JSON.parse(rawBody);
      const { data, type } = payload;

      const clerkId = data.metadata?.clerkId;
      const interval = data.metadata?.interval as "monthly" | "annually" | undefined;
      const subscriptionId = data.subscription_id;
      const customerId = data.customer?.customer_id;
      const email = data.customer?.email;
      console.log(data, type);
      if (!clerkId) {
        console.error("⚠️ No clerkId in webhook metadata");
        return new Response(JSON.stringify({ error: "Missing clerkId" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
      if (!subscriptionId) {
        console.error("⚠️ No subscription_id in webhook data");
        return new Response(JSON.stringify({ error: "Missing subscription_id" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      let status: SubscriptionStatus;

      // Map DodoPayments event types to our subscription statuses
      switch (type) {
        case "subscription.active":
        case "subscription.renewed":
        case "subscription.plan_changed":
          status = "active";
          break;

        case "subscription.on_hold":
        case "subscription.failed":
          status = "past_due";
          break;

        case "subscription.cancelled":
          status = "cancelled";
          break;

        case "subscription.expired":
          status = "expired";
          break;

        default:
          console.log(`⚠️ Unhandled event type: ${type}`);
          return new Response(JSON.stringify({ received: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
      }

      // Update user subscription status
      await ctx.runMutation(internal.users.updateSubscriptionStatusInternal, {
        clerkId,
        subscriptionStatus: status,
        billingInterval: interval,
        dodoSubscriptionId: subscriptionId,
        dodoCustomerId: customerId,
      });

      console.log(`✅ Webhook processed: ${type} for ${email}`);

      return new Response(JSON.stringify({ received: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("❌ Webhook error:", error);
      return new Response(
        JSON.stringify({ error: "Webhook handler failed" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }),
});

export default http;

