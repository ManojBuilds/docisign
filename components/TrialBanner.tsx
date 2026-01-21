"use client";
import { useTrialStatus } from "@/hooks/useTrialStatus";
import Link from "next/link";

export const TrialBanner = () => {
  const trialStatus = useTrialStatus();

  if (trialStatus.isLoading) {
    return (
      <div className="px-2 py-1 text-center bg-muted/20 border-l-4 border-transparent animate-pulse">
        <div className="h-5 bg-muted/30 rounded w-64 mx-auto" />
      </div>
    );
  }

  if (trialStatus.isPaidUser) {
    return null;
  }

  if (trialStatus.trialEnded) {
    return (
      <div className="px-2 py-1 text-center bg-red-50 border-l-4 border-red-400">
        <p className="text-sm text-red-800">
          Your trial has expired.{" "}
          <Link href="/pricing" className="font-semibold hover:underline">
            Upgrade to create more signatures
          </Link>
        </p>
      </div>
    );
  }

  if (trialStatus.isTrialActive) {
    const isLastDay = (trialStatus?.daysRemaining as number) <= 1;
    const bgColor = isLastDay
      ? "bg-orange-50 border-orange-400"
      : "bg-blue-50 border-blue-400";
    const textColor = isLastDay ? "text-orange-800" : "text-blue-800";

    const remainingTime =
      (trialStatus.daysRemaining as number) > 1
        ? `${trialStatus.daysRemaining} days left in trial`
        : `${trialStatus.hoursRemaining} hours left in trial`;

    return (
      <div className={`px-2 py-1 text-center ${bgColor} border-l-4`}>
        <p className={`text-sm ${textColor}`}>
          {remainingTime}.{" "}
          <Link href="/pricing" className="font-semibold hover:underline">
            Upgrade to create more signatures
          </Link>
        </p>
      </div>
    );
  }

  return null;
};
