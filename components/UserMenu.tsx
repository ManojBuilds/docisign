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
  Gem,
  LayoutDashboard,
  LayoutTemplate,
  LogOut,
  FileText,
  Zap
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface UserMenuProps {
  className?: string;
}

export function UserMenu({ className }: UserMenuProps) {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { isPaidUser } = useTrialStatus();
  const pathname = usePathname();

  if (!user) return null;

  const userEmail = user.emailAddresses[0]?.emailAddress;
  const userInitials = user.firstName?.charAt(0) || userEmail?.charAt(0) || "?";

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className={cn("relative h-9 w-9 rounded-full ring-offset-background transition-all hover:ring-2 hover:ring-primary/20 p-0 overflow-hidden", className)}>
            <Avatar className="h-9 w-9 border border-muted-foreground/10">
              <AvatarImage src={user.imageUrl} alt={user.fullName || "User"} />
              <AvatarFallback className="bg-primary/5 text-primary text-xs font-semibold">
                {userInitials.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-72 mt-2 p-1.5 rounded-xl border-muted/60 shadow-2xl bg-white/95 backdrop-blur-sm"
          align="end"
          forceMount
        >
          <DropdownMenuLabel className="font-normal px-3 py-3">
            <div className="flex flex-col space-y-1">
              <p className="text-[15px] font-semibold tracking-tight leading-none">{user.fullName}</p>
              <p className="text-xs font-medium leading-none text-muted-foreground/80 truncate">
                {userEmail}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="mx-1 bg-muted/50" />

          <DropdownMenuGroup className="px-1">
            <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50 px-2 py-2 flex items-center gap-2">
              Workspace
            </DropdownMenuLabel>

            {/* Mobile Navigation Links */}
            <DropdownMenuItem asChild className={cn("cursor-pointer py-2.5 px-3 rounded-lg md:hidden transition-colors", pathname === "/dashboard" && "bg-primary/5 text-primary focus:bg-primary/10")}>
              <Link href="/dashboard" prefetch={false}>
                <FileText className={cn("mr-3 h-4 w-4", pathname === "/dashboard" ? "text-primary" : "text-muted-foreground/70")} />
                <span className="font-semibold text-[14px]">My Contracts</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild className={cn("cursor-pointer py-2.5 px-3 rounded-lg md:hidden transition-colors", pathname.startsWith("/templates") && "bg-primary/5 text-primary focus:bg-primary/10")}>
              <Link href="/templates">
                <LayoutTemplate className={cn("mr-3 h-4 w-4", pathname.startsWith("/templates") ? "text-primary" : "text-muted-foreground/70")} />
                <span className="font-semibold text-[14px]">Templates</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild className="cursor-pointer py-2.5 px-3 rounded-lg hidden md:flex hover:bg-muted/50 transition-colors">
              <Link href="/dashboard" prefetch={false}>
                <LayoutDashboard className="mr-3 h-4 w-4 text-muted-foreground/70" />
                <span className="font-semibold text-[14px]">Dashboard</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="mx-1 bg-muted/50" />

          <DropdownMenuGroup className="px-1">
            <DropdownMenuItem asChild className="cursor-pointer py-2.5 px-3 rounded-lg hover:bg-muted/50 transition-colors">
              <Link href="/profile">
                <Zap className="mr-3 h-4 w-4 text-muted-foreground/70" />
                <span className="font-semibold text-[14px]">Account & Usage</span>
              </Link>
            </DropdownMenuItem>

            {!isPaidUser && (
              <DropdownMenuItem asChild className="cursor-pointer py-2.5 px-3 rounded-lg text-primary focus:text-primary focus:bg-primary/5 mt-1 transition-colors">
                <Link href="/pricing">
                  <Gem className="mr-3 h-4 w-4" />
                  <span className="font-bold text-[14px]">Upgrade to PRO</span>
                </Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="mx-1 bg-muted/50" />

          <div className="px-1">
            <DropdownMenuItem
              onClick={() => signOut({ redirectUrl: "/" })}
              className="cursor-pointer py-2.5 px-3 rounded-lg text-destructive focus:text-destructive focus:bg-destructive/5 transition-colors"
            >
              <LogOut className="mr-3 h-4 w-4" />
              <span className="font-semibold text-[14px]">Log out</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
