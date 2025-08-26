import { api } from "@/convex/_generated/api";
import { convexClient } from "@/lib/convex";
import { dodopayments } from "@/lib/dodopayment";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { clerkId } = await req.json()
        const user = await convexClient.query(api.users.getCurrentUser, { clerkId })
        if (!user?.dodoCustomerId || !user.dodoSubscriptionId) {
            return NextResponse.json({ message: "User not found" }, { status: 400 })
        }

        const customerId = user.dodoCustomerId;
        const session = await dodopayments.customers.customerPortal.create(customerId)
        if (!session.link) {
            throw new Error("Something went wrong")
        }
        return NextResponse.json({ link: session.link }, { status: 200 })

    } catch (error: any) {
        console.error(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
