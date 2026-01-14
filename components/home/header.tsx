"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserButton, useUser } from "@clerk/nextjs";
import { Activity, Briefcase, ChevronDown, ChevronRight, Coffee, GraduationCap, Home, Menu, Wallet, X } from "lucide-react";
import Link from "next/link";
import Logo from "../Logo";

interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const solutions = [
  { label: "For Freelancers", href: "/esignature-for-freelancers", icon: Coffee },
  { label: "For Consultants", href: "/esignature-for-consultants", icon: Briefcase },
  { label: "Real Estate", href: "/real-estate-document-signing", icon: Home },
  { label: "Healthcare", href: "/healthcare-document-signing", icon: Activity },
  { label: "Fintech", href: "/fintech-document-signing", icon: Wallet },
  { label: "Education", href: "/education-document-signing", icon: GraduationCap },
];

const navbarItems = [
  {
    label: "How It Works",
    href: "/#how-it-works",
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
  {
    label: "FAQ",
    href: "/#faq",
  },
];

export function Header({
  mobileMenuOpen,
  setMobileMenuOpen,
}: HeaderProps) {
  const { isSignedIn } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-lg">
      <div className="mx-auto max-w-5xl flex h-16 items-center justify-center px-4 md:px-6">
        <div className="flex flex-1 justify-start">
          <Logo showStatus={true} />
        </div>
        <nav className="hidden items-center gap-4 md:flex lg:gap-8">
          <DropdownMenu>
            <DropdownMenuTrigger className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-xs font-medium transition-colors lg:text-sm outline-none">
              Solutions <ChevronDown className="size-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 p-2">
              {solutions.map((item) => (
                <DropdownMenuItem key={item.label} asChild>
                  <Link href={item.href} className="flex items-center gap-2 cursor-pointer w-full">
                    <item.icon className="size-4 text-primary" />
                    <span>{item.label}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {navbarItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-muted-foreground hover:text-foreground group relative text-xs font-medium transition-colors lg:text-sm"
            >
              {item.label}
              <span className="bg-primary absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 justify-end items-center gap-4">
          {isSignedIn ? (
            <>
              <Button variant="ghost" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <span className="hidden sm:block">
                <UserButton afterSignOutUrl="/" />
              </span>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button asChild className="cursor-pointer rounded-full font-medium transition-transform hover:scale-105">
                <Link href="/dashboard" prefetch>
                  Get Started
                  <ChevronRight className="ml-1 size-4" />
                </Link>
              </Button>
            </>
          )}
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className="bg-background/95 absolute inset-x-0 top-16 border-b backdrop-blur-lg md:hidden"
        >
          <div className="container mx-auto flex flex-col gap-4 px-4 py-4">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">Solutions</span>
              {solutions.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 py-2 px-2 text-sm font-medium hover:bg-accent rounded-md transition-colors"
                >
                  <item.icon className="size-4 text-primary" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
            <div className="border-t border-border/30 my-1"></div>
            {navbarItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="group relative overflow-hidden py-2 px-2 text-sm font-medium"
              >
                <span className="relative z-10">{item.label}</span>
                <span className="bg-primary absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            <div
              className="border-border/30 mt-2 border-t pt-2"
            >
              {isSignedIn ? (
                <div className="flex flex-col gap-2">

                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button variant="ghost" asChild className="w-full">
                    <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button asChild className="w-full rounded-full">
                    <Link href="/dashboard" prefetch onClick={() => setMobileMenuOpen(false)}>
                      Get Started
                      <ChevronRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
