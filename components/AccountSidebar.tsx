"use client";

import { cn } from "@/lib/utils";
import { Zap, CreditCard, Palette } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const navItems = [
    {
        title: "Usage Stats",
        href: "/profile?tab=usage",
        slug: "usage",
        icon: Zap,
    },
    {
        title: "Manage Plan",
        href: "/profile?tab=manage-plan",
        slug: "manage-plan",
        icon: CreditCard,
    },
    {
        title: "Custom Branding",
        href: "/profile?tab=custom-branding",
        slug: "custom-branding",
        icon: Palette,
    },
];

export function AccountSidebar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get("tab") || "usage";

    return (
        <div className="w-full md:w-64 flex-shrink-0">
            <div className="mb-8">
                <h2 className="text-xl font-bold tracking-tight">Profile</h2>
                <p className="text-sm text-muted-foreground">Manage your account settings</p>
            </div>
            <nav className="flex flex-col space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === "/profile" && activeTab === item.slug;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary/10 text-primary shadow-sm"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <Icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
                            {item.title}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
