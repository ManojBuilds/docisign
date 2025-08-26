import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export const useTrialStatus = () => {
  const { user } = useUser();
  const trialStatus = useQuery(
    api.users.getTrialStatus,
    user ? { clerkId: user.id } : "skip"
  );

  return {
    ...trialStatus,
    isLoading: trialStatus === undefined,
  };
};
