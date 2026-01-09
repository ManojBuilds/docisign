import { api } from "../_generated/api";
import { mutation } from "../_generated/server";

const earlyUsers = [
  {
    clerkId: "user_37izEZ4ppSp1GYJ2mMuIZ3GmiQw",
    email: "ryancox4872@gmail.com",
    name: "Ryan"
  },
  {
    clerkId: "user_37WjLFIysp7QIuatSqHB3zzW89i",
    email: "gina.salomone@gmail.com",
    name: "Gina"
  },
  {
    clerkId: "user_37QEQVUqsuTJXZdtWhgLdm6CUTR",
    email: "jonp@hopeforprisoners.org",
  },
  {
    clerkId: "user_37E5Ra8UzBqBR9Pz7mWthyKC1wD",
    email: "anopia05@gmail.com",
    name: "Archie"
  },
  {
    clerkId: "user_371KqZ1eH5IvgVRGYrO14h8LtQr",
    email: "maghuyopjanrey83@gmail.com",
    name: "Jan Rey"
  },
  {
    clerkId: "user_36U8VZ630FfmI6l79lg6dJnntzx",
    email: "hotdudexd@gmail.com",
    name: "Hot"
  },
  {
    clerkId: "user_36NkzgqajSx3b1hRoQgF5Fc9KXV",
    email: "christiancomercioc@gmail.com",
    name: "Christian"
  },
  {
    clerkId: "user_36EcYqpzouoH3HDK9tkiVQsR8DZ",
    email: "flavial1991@hotmail.it",
  },
  {
    clerkId: "user_35RdjUc9CnhlpGNvvLPxWMFPByS",
    email: "dcobranzasadecv25@gmail.com",
    name: "DCobranza"
  },
  {
    clerkId: "user_32xl9kqdg7Kna4D4LU8aTdkQrB4",
    email: "ms8460149@gmail.com",
    name: "Manoj"
  },
];

// Mutation to setup early users with a 1-month trial
export const setupEarlyUsers = mutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const oneMonthInMs = 30 * 24 * 60 * 60 * 1000;
    const trialEndDate = now + oneMonthInMs;

    let createdCount = 0;
    let updatedCount = 0;

    for (const earlyUser of earlyUsers) {
      const existingUser = await ctx.db
        .query("users")
        .withIndex("by_clerk_id", (q) => q.eq("clerkId", earlyUser.clerkId))
        .first();

      if (existingUser) {
        await ctx.db.patch(existingUser._id, {
          trialEndDate: trialEndDate,
          plan: "trial",
          subscriptionStatus: "trial",
          updatedAt: now,
          firstName: earlyUser.name,
        });
        updatedCount++;
      } else {
        await ctx.db.insert("users", {
          clerkId: earlyUser.clerkId,
          email: earlyUser.email,
          plan: "trial",
          trialStartDate: now,
          trialEndDate: trialEndDate,
          subscriptionStatus: "trial",
          onboardingCompleted: false,
          createdAt: now,
          updatedAt: now,
        });
        createdCount++;
      }

      // Send New Year gift email
      await ctx.scheduler.runAfter(0, api.emails.sendNewYearGiftEmail, {
        email: earlyUser.email,
        name: earlyUser.name || earlyUser.email.split("@")[0], // Fallback name
      });
    }

    return {
      message: `Successfully processed ${earlyUsers.length} early users`,
      created: createdCount,
      updated: updatedCount,
    };
  },
});