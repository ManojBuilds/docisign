import { mutation } from "./_generated/server";

// Generate upload URL for files
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});
