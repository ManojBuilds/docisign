"use client";

import { UserButton } from "@clerk/clerk-react";
import { GetProCTA } from "./get-pro-cta";
// import { SupportModal } from "./support";
import { Badge } from "@/components/ui/badge";
import { useTrialStatus } from "@/hooks/useTrialStatus";
import { cn } from "@/lib/utils";
import Logo from "./Logo";

export function Header({ classNames }: { classNames?: string }) {
  const { isPaidUser, isTrialActive, isLoading } = useTrialStatus();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-lg">
      <div className={cn("flex items-center justify-between gap-2 p-4 sm:p-2", classNames)}>
        <div className="flex items-center gap-1">
          <Logo href="/dashboard" />
          {!isLoading && (
            <>
              {isPaidUser ? (
                <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary border-primary/20">
                  PRO
                </Badge>
              ) : isTrialActive ? (
                <Badge variant="outline" className="ml-2 border-orange-200 text-orange-600 bg-orange-50">
                  Trial
                </Badge>
              ) : (
                <Badge variant="outline" className="ml-2 text-muted-foreground">
                  Free
                </Badge>
              )}
            </>
          )}
        </div>
        <div className="flex items-center gap-3.5 text-xs sm:text-sm">
          {/* <SupportModal /> */}
          <GetProCTA className="h-8" />
          <UserButton />
        </div>
      </div>
    </header>
  );
}
