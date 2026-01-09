"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";

export const syncUserToBrevo = action({
  args: {
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.BREVO_API_KEY;

    if (!apiKey) {
      console.warn("BREVO_API_KEY is not set. Skipping Brevo sync.");
      return;
    }

    const { email, firstName, lastName } = args;

    try {
      const response = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          email,
          attributes: {
            FIRSTNAME: firstName,
            LASTNAME: lastName,
          },
          updateEnabled: true, // Update if exists
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Failed to sync user to Brevo:", error);
        // Don't throw error to avoid failing the whole flow if it's just marketing
        return;
      }

      console.log(`Successfully synced user ${email} to Brevo.`);
    } catch (error) {
      console.error("Error syncing user to Brevo:", error);
    }
  },
});
