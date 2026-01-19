"use client";

import { BrandingSettings } from "@/components/branding/BrandingSettings";
import { UserMenu } from "@/components/UserMenu";
import { cn } from "@/lib/utils";
import { GetProCTA } from "./get-pro-cta";
import Logo from "./Logo";

export function Header({ classNames }: { classNames?: string }) {

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-lg">
      <div className={cn("flex items-center justify-between gap-2 p-2", classNames)}>
        <div className="flex items-center gap-1">
          <Logo href="/dashboard" showStatus={true} />
        </div>
        <div className="flex items-center gap-2 sm:gap-3.5">
          <div className="flex items-center gap-1 sm:gap-4">
            <BrandingSettings triggerClassName="hidden sm:flex" />
            <div className="hidden sm:block h-4 w-px bg-muted-foreground/20" />
            <GetProCTA className="hidden sm:flex h-9 sm:h-8 px-3 sm:px-4 rounded-xl sm:rounded-lg text-xs font-semibold" />
          </div>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
