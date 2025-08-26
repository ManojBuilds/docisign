// convex/notifications.ts
import { internalMutation } from "./_generated/server";
import { api } from "./_generated/api";

export const sendTrialReminders = internalMutation({
  handler: async (ctx) => {
    const now = Date.now();
    const threeDaysFromNow = now + (3 * 24 * 60 * 60 * 1000);
    const oneDayFromNow = now + (1 * 24 * 60 * 60 * 1000);

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const upgradeUrl = `${appUrl}/upgrade`;

    // Get users whose trial expires in 3 days
    const usersExpiring3Days = await ctx.db
      .query("users")
      .withIndex("by_subscription_status", (q) => q.eq("subscriptionStatus", "trial"))
      .filter((q) => 
        q.and(
          q.gte(q.field("trialEndDate"), now),
          q.lte(q.field("trialEndDate"), threeDaysFromNow)
        )
      )
      .collect();

    // Get users whose trial expires in 1 day
    const usersExpiring1Day = await ctx.db
      .query("users")
      .withIndex("by_subscription_status", (q) => q.eq("subscriptionStatus", "trial"))
      .filter((q) => 
        q.and(
          q.gte(q.field("trialEndDate"), now),
          q.lte(q.field("trialEndDate"), oneDayFromNow)
        )
      )
      .collect();

    // Send 3-day reminders
    for (const user of usersExpiring3Days) {
      await ctx.scheduler.runAfter(0, api.emails.sendTrialReminder3DaysEmail, {
        email: user.email,
        name: user.firstName || user.email,
        upgradeUrl: upgradeUrl,
      });
    }

    // Send 1-day reminders
    for (const user of usersExpiring1Day) {
      await ctx.scheduler.runAfter(0, api.emails.sendTrialReminder1DayEmail, {
        email: user.email,
        name: user.firstName || user.email,
        upgradeUrl: upgradeUrl,
      });
    }
  },
});
