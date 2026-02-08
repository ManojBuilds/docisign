"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import posthog from "posthog-js";

export default function SuccessPage() {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const interval = searchParams.get('interval') || 'monthly';
    const plan = searchParams.get('plan') || 'professional';

    posthog.capture('subscription_started', {
      plan: plan,
      interval: interval
    });
  }, []);

  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const plan = searchParams?.get('plan') || 'professional';
  const isStarter = plan.toLowerCase() === 'starter';

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 font-sans">
      <div className="w-full max-w-md text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="space-y-4">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-500" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Upgrade Successful
            </h1>
            <p className="text-lg text-muted-foreground">
              Welcome to the {isStarter ? "Starter" : "Professional"} plan. Your account is now active.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <Button asChild size="lg" className="w-full font-semibold h-12 text-base shadow-sm">
            <Link href="/dashboard">
              Go to Dashboard
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg" className="w-full font-semibold h-12 text-base">
            <Link href="/profile?tab=manage-plan">
              Manage Subscription
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
