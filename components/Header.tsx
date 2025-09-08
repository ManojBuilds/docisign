"use client";


import { GetProCTA } from "./get-pro-cta";
import { UserButton } from "@clerk/clerk-react";
import Logo from "./Logo";
import { Button } from "./ui/button";
import Link from "next/link";

export function Header() {
  return (
    <header className="border-b">
      <div className="flex items-center justify-between gap-2 p-4">
        <div className="flex items-center gap-1">
          <Logo />
        </div>
        <div className="flex items-center gap-3.5 text-xs sm:text-sm">
          <GetProCTA className="h-8" />
          <Button variant="link" className={""}>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <UserButton />
        </div>
      </div>
    </header>
  );
}
