import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';
import { Webhook, WebhookUnbrandedRequiredHeaders } from 'standardwebhooks';
import { headers } from 'next/headers';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const webhook = new Webhook(process.env.DODO_WEBHOOK_SECRET!);

type SubscriptionStatus = 'expired' | 'active' | 'cancelled' | 'past_due';

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

export async function POST(request: NextRequest) {
    const headersList = await headers();
    const rawBody = await request.text();

    const webhookHeaders: WebhookUnbrandedRequiredHeaders = {
        'webhook-id': headersList.get('webhook-id') || '',
        'webhook-signature': headersList.get('webhook-signature') || '',
        'webhook-timestamp': headersList.get('webhook-timestamp') || '',
    };

    try {
        webhook.verify(rawBody, webhookHeaders);

        const payload: DodoSubscriptionPayload = JSON.parse(rawBody);
        const { data, type } = payload;

        const clerkId = data.metadata?.clerkId;
        const subscriptionId = data.subscription_id;
        const customerId = data.customer.customer_id;
        const email = data.customer.email;

        let status: SubscriptionStatus;

        switch (type) {
            case 'subscription.active':
            case 'subscription.renewed':
            case 'subscription.plan_changed':
                status = 'active';
                break;

            case 'subscription.on_hold':
            case 'subscription.failed':
                status = 'past_due';
                break;

            case 'subscription.cancelled':
                status = 'cancelled';
                break;

            case 'subscription.expired':
                status = 'expired';
                break;

            default:
                console.log(`⚠️ Unhandled event type: ${type}`);
                return NextResponse.json({ received: true }, { status: 200 });
        }

        await convex.mutation(api.users.updateSubscriptionStatus, {
            clerkId,
            subscriptionStatus: status,
            dodoSubscriptionId: subscriptionId,
            dodoCustomerId: customerId,
        });

        if (status === 'active' && type === 'subscription.active') {
            await sendWelcomeEmail(email);
        }

        return NextResponse.json({ received: true }, { status: 200 });
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json(
            { error: 'Webhook handler failed' },
            { status: 400 }
        );
    }
}

async function sendWelcomeEmail(email?: string) {
    if (!email) return;
    console.log(`📩 Sending welcome email to ${email}`);
}
