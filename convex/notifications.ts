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

      // Day 2: Templates tip
      if (daysSinceStart >= 2 && !emailsSent.day3) {
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

      // Day 4: Case study
      if (daysSinceStart >= 4 && !emailsSent.day7) {
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

      // Day 5: 2 days left
      if (daysSinceStart >= 5 && !emailsSent.day10) {
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

      // Day 6: Upgrade tomorrow
      if (daysSinceStart >= 6 && !emailsSent.day13) {
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

