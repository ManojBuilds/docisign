#!/usr/bin/env node

import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

// Function to extend trial for all users
async function extendTrialForAllUsers() {
  // Initialize Convex client
  const convex = new ConvexHttpClient(process.env.CONVEX_URL);

  try {
    console.log("Extending trial period for all users by 1 month...");

    // Call the mutation to extend trial for all users
    const result = await convex.mutation(api.scripts.extendTrial.extendTrialForAllUsers);

    console.log("Success:", result.message);
    console.log("Number of users updated:", result.usersUpdated);
  } catch (error) {
    console.error("Error extending trial for users:", error);
    process.exit(1);
  }
}

// Run the function
extendTrialForAllUsers();