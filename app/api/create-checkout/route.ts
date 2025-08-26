import { NextRequest, NextResponse } from 'next/server';
import { convexClient } from '@/lib/convex';
import { api } from '@/convex/_generated/api';
import { dodopayments } from '@/lib/dodopayment';


export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { clerkId, email, name } = body;
        const user = await convexClient.query(api.users.getCurrentUser, {clerkId})
        let customerId = '';

        if(user?.dodoCustomerId){
            customerId = user.dodoCustomerId
        }else{
            const newCustomer = await dodopayments.customers.create({
                email,
                name,
            })
           if(newCustomer.customer_id){
            customerId= newCustomer.customer_id;
           } 

        }

        const checkoutData = await dodopayments.subscriptions.create({
            billing: { city: 'city', country: 'US', state: 'state', street: 'street', zipcode: "89789" },
            customer: { customer_id: customerId },
            product_id: process.env.DODO_PRICE_ID_PRO as string,
            payment_link: true,
            return_url: `${process.env.NEXT_PUBLIC_APP_URL}/upgrade/success`,
            quantity: 1,
            metadata: {
                clerkId,
                email
            },
        })


        if (!checkoutData.payment_link) {
            return NextResponse.json(
                { success: false, error: "Something went wrong" },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            checkoutUrl: checkoutData.payment_link,
            sessionId: checkoutData.payment_id,
        });

    } catch (error) {
        console.error('Checkout creation error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
