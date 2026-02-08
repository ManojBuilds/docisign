"use client";
import { useTrialStatus } from "@/hooks/useTrialStatus";
import Link from "next/link";

export const TrialBanner = () => {
  const trialStatus = useTrialStatus();

  if (trialStatus.isLoading || trialStatus.isPaidUser) {
    return null;
  }

  if (trialStatus.trialEnded) {
    return (
      <div className="bg-red-600 text-white px-4 py-2 text-center text-xs md:text-sm font-medium">
        <span className="flex items-center justify-center gap-2">
          Your trial has expired.
          <Link
            href="/pricing"
            className="underline decoration-white/50 underline-offset-4 hover:decoration-white transition-all font-bold"
          >
            Pick a plan to keep your workflows running
          </Link>
        </span>
      </div>
    );
  }

  if (trialStatus.isTrialActive) {
    const days = trialStatus.daysRemaining ?? 0;
    const isLastDays = days <= 3;

    return (
      <div className={`${isLastDays ? "bg-orange-600" : "bg-zinc-900"} text-white px-4 py-2.5 text-center text-xs md:text-sm font-medium shadow-sm transition-colors duration-500`}>
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-1.5 flex-wrap">
          <span className="opacity-95">
            You have <span className="font-bold text-blue-400">{days} days</span> left in your trial —
          </span>
          <Link
            href="/pricing"
            className="underline decoration-blue-400/50 underline-offset-4 hover:decoration-blue-400 hover:text-blue-400 transition-all font-bold ml-0.5"
          >
            Pick a plan to keep Boopsign running without interruption
          </Link>
        </div>
      </div>
    );
  }

  return null;
};
