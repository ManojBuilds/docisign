"use client";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";

export const useTrialStatus = () => {
  const { user, isLoaded } = useUser();

  const trialStatus = useQuery(
    api.users.getTrialStatus,
    user ? { clerkId: user.id } : "skip"
  );

  if (!isLoaded) {
    return {
      isAuthenticated: false,
      isLoading: true,
      isTrialActive: false,
      trialEnded: null,
      isPaidUser: false,
    };
  }

  if (!user) {
    return {
      isAuthenticated: false,
      isLoading: false,
      isTrialActive: true, // allow access for anon users
      trialEnded: null,
      isPaidUser: false,
    };
  }

  return {
    ...trialStatus,
    isAuthenticated: true,
    isLoading: trialStatus === undefined,
    isTrialActive: trialStatus?.isTrialActive ?? true,
    trialEnded: trialStatus?.trialEnded ?? null,
  };
};
