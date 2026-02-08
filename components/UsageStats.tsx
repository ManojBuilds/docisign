"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Layout } from "lucide-react";
import Link from "next/link";

export const UsageStats = () => {
    const { user } = useUser();
    const stats = useQuery(api.users.getUsageStats, user ? { clerkId: user.id } : "skip");

    if (!stats) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {[1, 2].map((i) => (
                    <Card key={i} className="border-muted/20 shadow-sm animate-pulse">
                        <CardHeader className="pb-2">
                            <div className="h-4 w-24 bg-muted rounded" />
                        </CardHeader>
                        <CardContent>
                            <div className="h-2 w-full bg-muted rounded mb-4" />
                            <div className="h-3 w-32 bg-muted rounded" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    const sigReq = stats.signatureRequests;
    const sigPercent = (sigReq.used / sigReq.limit) * 100;

    const tempStats = stats.templates;
    const tempPercent = tempStats.limit === Infinity ? 0 : (tempStats.used / tempStats.limit) * 100;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card className="border-muted/20 shadow-sm overflow-hidden group hover:border-primary/20 transition-all duration-300">
                <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        Monthly Signature Requests
                    </CardTitle>
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full capitalize">
                        {stats.plan}
                    </span>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-baseline mb-2">
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black text-foreground">{sigReq.used}</span>
                            <span className="text-sm text-muted-foreground font-medium">/ {sigReq.limit} used</span>
                        </div>
                        <span className="text-xs font-bold text-muted-foreground">{Math.round(sigPercent)}%</span>
                    </div>
                    <Progress value={sigPercent} className="h-1.5 mb-2 bg-muted/30" />
                    <div className="flex justify-between items-center mt-4">
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">
                            Resets {new Date(stats.billingCycleStart || Date.now()).toLocaleDateString()}
                        </p>
                        {(sigPercent >= 100 || (stats.plan === "trial" && sigReq.used >= sigReq.limit)) && (
                            <Link href="/pricing" className="text-[10px] text-destructive font-black uppercase tracking-wider hover:underline">
                                UPGRADE REQUIRED &rarr;
                            </Link>
                        )}
                        {sigPercent > 80 && sigPercent < 100 && (
                            <Link href="/pricing" className="text-[10px] text-primary font-black uppercase tracking-wider hover:underline">
                                Upgrade Plan &rarr;
                            </Link>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card className="border-muted/20 shadow-sm overflow-hidden group hover:border-primary/20 transition-all duration-300">
                <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                        <Layout className="h-4 w-4 text-primary" />
                        Saved Templates
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-baseline mb-2">
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black text-foreground">{tempStats.used}</span>
                            <span className="text-sm text-muted-foreground font-medium">/ {tempStats.limit === Infinity ? "∞" : tempStats.limit} used</span>
                        </div>
                        {tempStats.limit !== Infinity && (
                            <span className="text-xs font-bold text-muted-foreground">{Math.round(tempPercent)}%</span>
                        )}
                    </div>
                    {tempStats.limit !== Infinity && (
                        <Progress value={tempPercent} className="h-1.5 mb-2 bg-muted/30" />
                    )}
                    <div className="flex justify-between items-center mt-4">
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">
                            {tempStats.remaining === Infinity ? "Unlimited templates" : `${tempStats.remaining} slots remaining`}
                        </p>
                        {(tempStats.remaining <= 0 || (stats.plan === "trial" && tempStats.used >= tempStats.limit)) && (
                            <Link href="/pricing" className="text-[10px] text-destructive font-black uppercase tracking-wider hover:underline">
                                UPGRADE REQUIRED &rarr;
                            </Link>
                        )}
                        {tempStats.remaining <= 1 && tempStats.limit !== Infinity && tempStats.remaining > 0 && (
                            <Link href="/pricing" className="text-[10px] text-primary font-black uppercase tracking-wider hover:underline">
                                Get More &rarr;
                            </Link>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
