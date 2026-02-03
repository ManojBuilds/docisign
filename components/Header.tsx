"use client";

import { BrandingSettings } from "@/components/branding/BrandingSettings";
import { UserMenu } from "@/components/UserMenu";
import { cn } from "@/lib/utils";
import { GetProCTA } from "./get-pro-cta";
import Logo from "./Logo";
import { FileText, LayoutTemplate } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header({ classNames }: { classNames?: string }) {
  const pathname = usePathname();

  const NavLinks = () => (
    <>
      <Link
        href="/dashboard"
        className={cn(
          "flex items-center gap-2 transition-colors hover:text-primary",
          pathname === "/dashboard" ? "text-primary font-bold" : "text-muted-foreground font-medium"
        )}
      >
        <FileText className="w-4 h-4 md:hidden" />
        Documents
      </Link>
      <Link
        href="/templates"
        className={cn(
          "flex items-center gap-2 transition-colors hover:text-primary",
          pathname.startsWith("/templates") ? "text-primary font-bold" : "text-muted-foreground font-medium"
        )}
      >
        <LayoutTemplate className="w-4 h-4 md:hidden" />
        Templates
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl transition-all">
      <div className={cn("flex items-center justify-between gap-4 py-3 px-4 sm:px-6", classNames)}>
        <div className="flex items-center gap-8">
          <Logo href="/dashboard" showStatus={true} />

          <nav className="hidden md:flex items-center gap-8 text-[13px]">
            <NavLinks />
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:flex items-center gap-4">
            <BrandingSettings triggerClassName="flex" />
            <div className="h-4 w-px bg-slate-200" />
            <GetProCTA />
          </div>

          <div className="flex items-center gap-1">
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
