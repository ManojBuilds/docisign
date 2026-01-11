"use client";

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";
import Logo from "../Logo";

interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

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
          <Logo />
        </div>
        <nav className="hidden items-center gap-4 md:flex lg:gap-8">
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
            {navbarItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative overflow-hidden py-2 text-sm font-medium"
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
