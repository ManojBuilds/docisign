import { api } from "./_generated/api";
import { internalMutation } from "./_generated/server";

export const sendTrialReminders = internalMutation({
  handler: async (ctx) => {
    const now = Date.now();

    // Define exact time windows
    const threeDaysFromNowStart = now + 2 * 24 * 60 * 60 * 1000; // 2 days from now
    const threeDaysFromNowEnd = now + 3 * 24 * 60 * 60 * 1000;   // 3 days from now

    const oneDayFromNowStart = now + 0 * 24 * 60 * 60 * 1000;    // today
    const oneDayFromNowEnd = now + 1 * 24 * 60 * 60 * 1000;      // 1 day from now

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const upgradeUrl = `${appUrl}/upgrade`;

    // Get users whose trial expires in ~3 days
    const usersExpiring3Days = await ctx.db
      .query("users")
      .withIndex("by_subscription_status", (q) => q.eq("subscriptionStatus", "trial"))
      .filter((q) =>
        q.and(
          q.gte(q.field("trialEndDate"), threeDaysFromNowStart),
          q.lte(q.field("trialEndDate"), threeDaysFromNowEnd)
        )
      )
      .collect();

    // Get users whose trial expires in ~1 day
    const usersExpiring1Day = await ctx.db
      .query("users")
      .withIndex("by_subscription_status", (q) => q.eq("subscriptionStatus", "trial"))
      .filter((q) =>
        q.and(
          q.gte(q.field("trialEndDate"), oneDayFromNowStart),
          q.lte(q.field("trialEndDate"), oneDayFromNowEnd)
        )
      )
      .collect();

    // Send 3-day reminders
    // Send 3-day reminders
    for (const user of usersExpiring3Days) {
      // Skip if already sent
      if (user.trialReminderFlags?.day3) continue;

      await ctx.scheduler.runAfter(0, api.emails.sendTrialReminder3DaysEmail, {
        email: user.email,
        name: user.firstName || user.email,
        upgradeUrl,
      });

      // Mark as sent
      await ctx.db.patch(user._id, {
        trialReminderFlags: {
          ...user.trialReminderFlags,
          day3: true,
          day1: user.trialReminderFlags?.day1 ?? false,
        },
        updatedAt: Date.now(),
      });
    }

    // Send 1-day reminders
    for (const user of usersExpiring1Day) {
      // Skip if already sent
      if (user.trialReminderFlags?.day1) continue;

      await ctx.scheduler.runAfter(0, api.emails.sendTrialReminder1DayEmail, {
        email: user.email,
        name: user.firstName || user.email,
        upgradeUrl,
      });

      // Mark as sent
      await ctx.db.patch(user._id, {
        trialReminderFlags: {
          ...user.trialReminderFlags,
          day1: true,
          day3: user.trialReminderFlags?.day3 ?? false,
        },
        updatedAt: Date.now(),
      });
    }
  },
});
