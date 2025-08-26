// convex/crons.ts
import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// Check for trial reminders daily at 10 AM
crons.daily(
  "send trial reminders",
  { hourUTC: 10, minuteUTC: 0 },
  internal.notifications.sendTrialReminders,
);

export default crons;
