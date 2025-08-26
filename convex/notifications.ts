// convex/notifications.ts
import { internalMutation } from "./_generated/server";
import { sendEmail, emailTemplates } from "../lib/email";

export const sendTrialReminders = internalMutation({
  handler: async (ctx) => {
    const now = Date.now();
    const threeDaysFromNow = now + (3 * 24 * 60 * 60 * 1000);
    const oneDayFromNow = now + (1 * 24 * 60 * 60 * 1000);

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
      const template = emailTemplates.trialReminder3Days(user.firstName || 'there');
      await sendEmail({
        to: user.email,
        subject: template.subject,
        html: template.html,
      });
    }

    // Send 1-day reminders
    for (const user of usersExpiring1Day) {
      const template = emailTemplates.trialReminder1Day(user.firstName || 'there');
      await sendEmail({
        to: user.email,
        subject: template.subject,
        html: template.html,
      });
    }
  },
});
