#!/usr/bin/env node

import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

// Function to setup early users
async function setupEarlyUsers() {
  // Initialize Convex client
  if (!process.env.CONVEX_URL) {
    console.error("CONVEX_URL environment variable is not set");
    process.exit(1);
  }
  console.log(process.env.CONVEX_URL);
  const convex = new ConvexHttpClient(process.env.CONVEX_URL);

  try {
    console.log("Setting up early users with 1-month trial...");

    // Call the mutation to setup early users
    const result = await convex.mutation(api.scripts.extendTrial.setupEarlyUsers);

    console.log("Success:", result.message);
    console.log("Created:", result.created);
    console.log("Updated:", result.updated);
  } catch (error) {
    console.error("Error setting up early users:", error);
    process.exit(1);
  }
}

// Run the function
setupEarlyUsers();