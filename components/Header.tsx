"use client";

import { UserButton } from "@clerk/clerk-react";
import { GetProCTA } from "./get-pro-cta";
// import { SupportModal } from "./support";
import { cn } from "@/lib/utils";
import Logo from "./Logo";

export function Header({ classNames }: { classNames?: string }) {

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-lg">
      <div className={cn("flex items-center justify-between gap-2 p-4 sm:p-2", classNames)}>
        <div className="flex items-center gap-1">
          <Logo href="/dashboard" showStatus={true} />
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
