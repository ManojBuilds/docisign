# Extend User Trial Period Script

This script extends the trial period for all users by 1 month (30 days).

## Prerequisites

- You need to have your Convex deployment URL and API keys configured
- Make sure you have the Convex CLI installed and authenticated

## Setup Environment Variables

Before running the script, set your Convex URL:

```bash
export CONVEX_URL="https://your-convex-deployment-url.convex.cloud"
```

## Running the Script

To extend the trial period for all users by 1 month:

```bash
node scripts/extend-trial.js
```

## What the Script Does

1. Queries all users in the database
2. Extends each user's trial end date by 30 days (2,592,000,000 milliseconds)
3. Ensures the user's plan is set to "trial"
4. Ensures the user's subscription status is set to "trial"
5. Returns the number of users updated

## Important Notes

- This script affects ALL users in the database
- The trial extension is applied to the current trial end date, regardless of the user's current plan
- Make sure to test this in a development environment first