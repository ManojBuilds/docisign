"use client";

import { BrandingSettings } from "@/components/branding/BrandingSettings";
import { UserMenu } from "@/components/UserMenu";
import { cn } from "@/lib/utils";
import { GetProCTA } from "./get-pro-cta";
import Logo from "./Logo";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FileText, LayoutTemplate, Menu, Sparkles } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Header({ classNames }: { classNames?: string }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const NavLinks = () => (
    <>
      <Link
        href="/dashboard"
        onClick={() => setIsOpen(false)}
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
        onClick={() => setIsOpen(false)}
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
            <GetProCTA className="h-9 px-4 rounded-xl text-xs font-bold" />
          </div>

          <div className="flex items-center gap-1">
            <UserMenu />

            <div className="md:hidden ml-1">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-slate-100">
                    <Menu className="h-5 w-5 text-slate-600" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[85vw] sm:w-[350px] p-0 border-none shadow-2xl rounded-l-3xl overflow-hidden">
                  <SheetHeader className="p-6 bg-slate-50 border-b border-slate-100">
                    <SheetTitle className="text-left">
                      <Logo href="/dashboard" />
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col h-full bg-white">
                    <nav className="flex flex-col gap-1 p-4">
                      <p className="px-2 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Navigation</p>
                      <Link
                        href="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-4 rounded-2xl transition-all duration-200",
                          pathname === "/dashboard"
                            ? "bg-primary/5 text-primary font-bold shadow-sm"
                            : "text-slate-600 font-medium hover:bg-slate-50"
                        )}
                      >
                        <FileText className="w-5 h-5" />
                        <span className="text-[15px]">My Contracts</span>
                      </Link>
                      <Link
                        href="/templates"
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-4 rounded-2xl transition-all duration-200",
                          pathname.startsWith("/templates")
                            ? "bg-primary/5 text-primary font-bold shadow-sm"
                            : "text-slate-600 font-medium hover:bg-slate-50"
                        )}
                      >
                        <LayoutTemplate className="w-5 h-5" />
                        <span className="text-[15px]">Templates</span>
                      </Link>
                    </nav>

                    <nav className="flex flex-col gap-1 p-4 border-t border-slate-50">
                      <p className="px-2 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Settings & Plan</p>
                      <div className="px-2 py-2">
                        <BrandingSettings
                          triggerClassName="w-full justify-start h-12 rounded-2xl bg-slate-50 hover:bg-slate-100 border-none px-4"
                          onOpenChange={(open) => !open && setIsOpen(false)}
                        />
                      </div>
                      <div className="px-2 py-2">
                        <Link href="/pricing" onClick={() => setIsOpen(false)}>
                          <Button className="w-full h-12 rounded-2xl font-bold shadow-lg shadow-primary/20 flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            Upgrade to Pro
                          </Button>
                        </Link>
                      </div>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
