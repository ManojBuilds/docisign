"use client";

// import { GetProCTA } from "./get-pro-cta";
import { UserButton } from "@clerk/clerk-react";
import { SupportModal } from "./support";
import Logo from "./Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-lg">
      <div className="flex items-center justify-between gap-2 p-4">
        <div className="flex items-center gap-1">
          <Logo />
        </div>
        <div className="flex items-center gap-3.5 text-xs sm:text-sm">
          <SupportModal />
          {/* <GetProCTA className="h-8" /> */}
          <UserButton />
        </div>
      </div>
    </header>
  );
}
