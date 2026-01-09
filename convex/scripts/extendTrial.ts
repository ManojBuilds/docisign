import { mutation } from "../_generated/server";

// Mutation to extend trial period for all users by 1 month
export const extendTrialForAllUsers = mutation({
  args: {},
  handler: async (ctx) => {
    // Get all users
    const allUsers = await ctx.db.query("users").collect();

    const oneMonthInMs = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
    let updatedUsersCount = 0;

    for (const user of allUsers) {
      // Calculate new trial end date (current end date + 1 month)
      const newTrialEndDate = user.trialEndDate + oneMonthInMs;

      // Update the user's trial end date
      await ctx.db.patch(user._id, {
        trialEndDate: newTrialEndDate,
        plan: "trial", // Ensure the plan is set to trial
        subscriptionStatus: "trial", // Ensure subscription status reflects trial
      });

      updatedUsersCount++;
    }

    return {
      message: `Successfully extended trial period for ${updatedUsersCount} users by 1 month`,
      usersUpdated: updatedUsersCount,
    };
  },
});