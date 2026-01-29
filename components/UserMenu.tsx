"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTrialStatus } from "@/hooks/useTrialStatus";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  CreditCard,
  Gem,
  LayoutDashboard,
  LayoutTemplate,
  LogOut,
  Palette,
  FileText,
  User,
  Zap
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandingSettings } from "./branding/BrandingSettings";
import { cn } from "@/lib/utils";

export function UserMenu() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { isPaidUser } = useTrialStatus();
  const [brandingOpen, setBrandingOpen] = useState(false);
  const pathname = usePathname();

  if (!user) return null;

  const userEmail = user.emailAddresses[0]?.emailAddress;
  const userInitials = user.firstName?.charAt(0) || userEmail?.charAt(0) || "?";

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-offset-background transition-all hover:ring-2 hover:ring-primary/20 p-0 overflow-hidden">
            <Avatar className="h-9 w-9 border border-muted-foreground/10">
              <AvatarImage src={user.imageUrl} alt={user.fullName || "User"} />
              <AvatarFallback className="bg-primary/5 text-primary text-xs font-semibold">
                {userInitials.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 mt-2 p-2 rounded-2xl border-muted/60 shadow-xl" align="end" forceMount>
          <DropdownMenuLabel className="font-normal p-2">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-semibold leading-none">{user.fullName}</p>
              <p className="text-xs leading-none text-muted-foreground truncate">
                {userEmail}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="my-2 bg-muted/60" />

          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70 px-2 py-1.5 flex items-center gap-2">
              <Zap className="h-3 w-3" /> Workspace
            </DropdownMenuLabel>

            {/* Mobile Navigation Links */}
            <DropdownMenuItem asChild className={cn("rounded-xl cursor-pointer py-2.5 md:hidden", pathname === "/dashboard" && "bg-primary/5 text-primary")}>
              <Link href="/dashboard">
                <FileText className={cn("mr-3 h-4 w-4", pathname === "/dashboard" ? "text-primary" : "text-muted-foreground")} />
                <span className="font-medium">My Contracts</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild className={cn("rounded-xl cursor-pointer py-2.5 md:hidden", pathname.startsWith("/templates") && "bg-primary/5 text-primary")}>
              <Link href="/templates">
                <LayoutTemplate className={cn("mr-3 h-4 w-4", pathname.startsWith("/templates") ? "text-primary" : "text-muted-foreground")} />
                <span className="font-medium">Templates</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild className="rounded-xl cursor-pointer py-2.5 hidden md:flex">
              <Link href="/dashboard">
                <LayoutDashboard className="mr-3 h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Dashboard</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                setBrandingOpen(true);
              }}
              className="rounded-xl cursor-pointer py-2.5"
            >
              <Palette className="mr-3 h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Personal Branding</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="my-2 bg-muted/60" />

          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70 px-2 py-1.5 flex items-center gap-2">
              <User className="h-3 w-3" /> Account
            </DropdownMenuLabel>
            {isPaidUser ? (
              <DropdownMenuItem asChild className="rounded-xl cursor-pointer py-2.5">
                <Link href="/account/billing">
                  <CreditCard className="mr-3 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Subscription & Billing</span>
                </Link>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem asChild className="rounded-xl cursor-pointer py-2.5 text-primary focus:text-primary focus:bg-primary/5">
                <Link href="/pricing">
                  <Gem className="mr-3 h-4 w-4" />
                  <span className="font-semibold">Upgrade to PRO</span>
                </Link>
              </DropdownMenuItem>
            )}


          </DropdownMenuGroup>

          <DropdownMenuSeparator className="my-2 bg-muted/60" />

          <DropdownMenuItem
            onClick={() => signOut({ redirectUrl: "/" })}
            className="rounded-xl cursor-pointer py-2.5 text-destructive focus:text-destructive focus:bg-destructive/5"
          >
            <LogOut className="mr-3 h-4 w-4" />
            <span className="font-medium">Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <BrandingSettings
        isOpen={brandingOpen}
        onOpenChange={setBrandingOpen}
        showTrigger={false}
      />
    </>
  );
}
