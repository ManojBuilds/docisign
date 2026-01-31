import { v } from "convex/values";
import { internalMutation, mutation } from "./_generated/server";
import { api } from "./_generated/api";

export const subscribe = mutation({
    args: {
        email: v.string(),
        source: v.string(),
        name: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        // Check if already subscribed
        const existing = await ctx.db
            .query("leads")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .first();

        if (existing) {
            // Update name and source so the sequence becomes relevant to the latest request
            const updates: any = {};
            if (args.name && existing.name !== args.name) updates.name = args.name;
            if (existing.source !== args.source) updates.source = args.source;
            if (existing.status === "unsubscribed") updates.status = "active";

            // Reset sequence step to 0 so they receive the new template immediately
            // and the marketing sequence can optionally re-engage them.
            updates.sequenceStep = 0;

            if (Object.keys(updates).length > 0) {
                await ctx.db.patch(existing._id, updates);
            }

            console.log(`[Lead] Existing lead ${args.email} requested new template: ${args.source}`);
        } else {
            const leadId = await ctx.db.insert("leads", {
                email: args.email,
                source: args.source,
                name: args.name,
                status: "active",
                sequenceStep: 0,
                createdAt: Date.now(),
            });
            console.log(`[Lead] New Lead Created: ${args.email} (Source: ${args.source}) ID: ${leadId}`);
        }

        // ALWAYS schedule the template delivery email immediately
        await ctx.scheduler.runAfter(0, api.emails.sendSequenceEmail, {
            email: args.email,
            step: 1,
            source: args.source,
            name: args.name,
        });

        console.log(`[Lead] Delivering template [${args.source}] to ${args.email}`);

        return { success: true };
    },
});

export const unsubscribe = mutation({
    args: {
        email: v.string(),
    },
    handler: async (ctx, args) => {
        const lead = await ctx.db
            .query("leads")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .first();

        if (lead) {
            await ctx.db.patch(lead._id, { status: "unsubscribed" });
            console.log(`[Lead] Unsubscribed: ${args.email}`);
        } else {
            console.warn(`[Lead] Unsubscribe attempt for non-existent lead: ${args.email}`);
        }
    },
});

// Internal mutation to update sequence state and schedule next email
export const advanceSequence = internalMutation({
    args: {
        email: v.string(),
        completedStep: v.number(),
        source: v.string(),
        name: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const lead = await ctx.db
            .query("leads")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .first();

        if (!lead || lead.status !== "active") {
            console.warn(`[Sequence] Skipping advance for ${args.email}: Lead not found or inactive`);
            return;
        }

        await ctx.db.patch(lead._id, {
            sequenceStep: args.completedStep,
            lastEmailSentAt: Date.now(),
        });

        console.log(`[Sequence] Lead ${args.email} completed Step ${args.completedStep}`);

        // Schedule next email based on completed step
        let nextStep = 0;
        let delayMs = 0;

        if (args.completedStep === 1) {
            nextStep = 2;
            delayMs = 2 * 24 * 60 * 60 * 1000; // 2 days
        } else if (args.completedStep === 2) {
            nextStep = 3;
            delayMs = 3 * 24 * 60 * 60 * 1000; // 3 more days (total 5 days from start)
        }

        if (nextStep > 0) {
            await ctx.scheduler.runAfter(delayMs, api.emails.sendSequenceEmail, {
                email: args.email,
                step: nextStep,
                source: args.source,
                name: args.name,
            });
            console.log(`[Sequence] Scheduled Step ${nextStep} for ${args.email} in ${delayMs / (1000 * 60 * 60)} hours`);
        } else {
            console.log(`[Sequence] Completed all steps for ${args.email}`);
        }
    },
});
