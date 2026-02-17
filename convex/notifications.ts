import { api } from "./_generated/api";
import { internalMutation } from "./_generated/server";

export const sendTrialReminders = internalMutation({
  handler: async (ctx) => {
    const now = Date.now();

    // Get all users currently on trial
    const trialUsers = await ctx.db
      .query("users")
      .withIndex("by_subscription_status", (q) => q.eq("subscriptionStatus", "trial"))
      .collect();

    for (const user of trialUsers) {
      const trialStartDate = user.trialStartDate;
      const daysSinceStart = Math.floor((now - trialStartDate) / (24 * 60 * 60 * 1000));

      const emailsSent = user.trialEmailsSent || {};
      const userName = user.firstName || user.email;

      // Day 3: Templates tip
      if (daysSinceStart >= 3 && !emailsSent.day3) {
        // Update flag FIRST to prevent race conditions
        await ctx.db.patch(user._id, {
          trialEmailsSent: {
            ...emailsSent,
            day3: true,
          },
          updatedAt: Date.now(),
        });

        // Then schedule the email
        await ctx.scheduler.runAfter(0, api.emails.sendTrialDay3Email, {
          email: user.email,
          name: userName,
        });

        console.log(`✅ Sent Day 3 email to ${user.email}`);
      }

      // Day 7: Case study
      if (daysSinceStart >= 7 && !emailsSent.day7) {
        // Update flag FIRST to prevent race conditions
        await ctx.db.patch(user._id, {
          trialEmailsSent: {
            ...emailsSent,
            day7: true,
          },
          updatedAt: Date.now(),
        });

        // Then schedule the email
        await ctx.scheduler.runAfter(0, api.emails.sendTrialDay7Email, {
          email: user.email,
          name: userName,
        });

        console.log(`✅ Sent Day 7 email to ${user.email}`);
      }

      // Day 10: 3 days left
      if (daysSinceStart >= 10 && !emailsSent.day10) {
        // Update flag FIRST to prevent race conditions
        await ctx.db.patch(user._id, {
          trialEmailsSent: {
            ...emailsSent,
            day10: true,
          },
          updatedAt: Date.now(),
        });

        // Then schedule the email
        await ctx.scheduler.runAfter(0, api.emails.sendTrialDay10Email, {
          email: user.email,
          name: userName,
        });

        console.log(`✅ Sent Day 10 email to ${user.email}`);
      }

      // Day 13: Upgrade tomorrow
      if (daysSinceStart >= 13 && !emailsSent.day13) {
        // Update flag FIRST to prevent race conditions
        await ctx.db.patch(user._id, {
          trialEmailsSent: {
            ...emailsSent,
            day13: true,
          },
          updatedAt: Date.now(),
        });

        // Then schedule the email
        await ctx.scheduler.runAfter(0, api.emails.sendTrialDay13Email, {
          email: user.email,
          name: userName,
        });

        console.log(`✅ Sent Day 13 email to ${user.email}`);
      }
    }
  },
});

