import { mutation } from "./_generated/server";

/**
 * Migration script to convert legacy "pro" plan users to "professional"
 * Run this once to migrate existing users
 */
export const migratePlanNames = mutation({
    args: {},
    handler: async (ctx) => {
        // Find all users with "pro" plan
        const proUsers = await ctx.db
            .query("users")
            .collect();

        const usersToMigrate = proUsers.filter(user => (user.plan as string) === "pro");

        console.log(`[Migration] Found ${usersToMigrate.length} users with legacy "pro" plan`);

        // Update each user to "professional"
        for (const user of usersToMigrate) {
            await ctx.db.patch(user._id, {
                plan: "professional",
            });
            console.log(`[Migration] Migrated user ${user.email} from "pro" to "professional"`);
        }

        console.log(`[Migration] Successfully migrated ${usersToMigrate.length} users`);

        return {
            success: true,
            migratedCount: usersToMigrate.length,
        };
    },
});
