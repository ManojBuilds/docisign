import { api } from "./_generated/api";
import { internalMutation } from "./_generated/server";

export const sendTrialReminders = internalMutation({
  handler: async (ctx) => {
    const now = Date.now();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

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
        await ctx.scheduler.runAfter(0, api.emails.sendTrialDay3Email, {
          email: user.email,
          name: userName,
        });

        await ctx.db.patch(user._id, {
          trialEmailsSent: {
            ...emailsSent,
            day3: true,
          },
          updatedAt: Date.now(),
        });
        console.log(`✅ Sent Day 3 email to ${user.email}`);
      }

      // Day 7: Case study
      if (daysSinceStart >= 7 && !emailsSent.day7) {
        await ctx.scheduler.runAfter(0, api.emails.sendTrialDay7Email, {
          email: user.email,
          name: userName,
        });

        await ctx.db.patch(user._id, {
          trialEmailsSent: {
            ...emailsSent,
            day7: true,
          },
          updatedAt: Date.now(),
        });
        console.log(`✅ Sent Day 7 email to ${user.email}`);
      }

      // Day 10: 3 days left
      if (daysSinceStart >= 10 && !emailsSent.day10) {
        await ctx.scheduler.runAfter(0, api.emails.sendTrialDay10Email, {
          email: user.email,
          name: userName,
        });

        await ctx.db.patch(user._id, {
          trialEmailsSent: {
            ...emailsSent,
            day10: true,
          },
          updatedAt: Date.now(),
        });
        console.log(`✅ Sent Day 10 email to ${user.email}`);
      }

      // Day 13: Upgrade tomorrow
      if (daysSinceStart >= 13 && !emailsSent.day13) {
        await ctx.scheduler.runAfter(0, api.emails.sendTrialDay13Email, {
          email: user.email,
          name: userName,
        });

        await ctx.db.patch(user._id, {
          trialEmailsSent: {
            ...emailsSent,
            day13: true,
          },
          updatedAt: Date.now(),
        });
        console.log(`✅ Sent Day 13 email to ${user.email}`);
      }
    }

    // Keep the old reminder logic for backward compatibility (Days 11 and 13)
    const threeDaysFromNowStart = now + 2 * 24 * 60 * 60 * 1000;
    const threeDaysFromNowEnd = now + 3 * 24 * 60 * 60 * 1000;
    const oneDayFromNowStart = now + 0 * 24 * 60 * 60 * 1000;
    const oneDayFromNowEnd = now + 1 * 24 * 60 * 60 * 1000;
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
    for (const user of usersExpiring3Days) {
      if (user.trialReminderFlags?.day3) continue;

      await ctx.scheduler.runAfter(0, api.emails.sendTrialReminder3DaysEmail, {
        email: user.email,
        name: user.firstName || user.email,
        upgradeUrl,
      });

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
      if (user.trialReminderFlags?.day1) continue;

      await ctx.scheduler.runAfter(0, api.emails.sendTrialReminder1DayEmail, {
        email: user.email,
        name: user.firstName || user.email,
        upgradeUrl,
      });

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

