"use client";

import { BrandingForm } from "@/components/branding/BrandingForm";
import { PlanBadge } from "@/components/PlanBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/convex/_generated/api";
import { useTrialStatus } from "@/hooks/useTrialStatus";
import { useUser } from "@clerk/nextjs";
import { useAction, useQuery } from "convex/react";
import {
    ArrowRight,
    CreditCard, Loader2, ShieldCheck,
    Zap
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function UsagePageClient() {
    const { user } = useUser();
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get("tab") || "usage";

    const onTabChange = (value: string) => {
        router.push(`/profile?tab=${value}`);
    };

    const stats = useQuery(api.users.getUsageStats, user ? { clerkId: user.id } : "skip");
    const trialStatus = useTrialStatus();
    const [isPortalLoading, setIsPortalLoading] = useState(false);
    const createCustomerPortal = useAction(api.payments.createCustomerPortal);



    const handleManageSubscription = async () => {
        try {
            setIsPortalLoading(true);
            const result = await createCustomerPortal({ send_email: false });

            if (result?.portal_url) {
                window.open(result.portal_url, "_blank");
            } else {
                toast.error("Failed to open customer portal");
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error?.message || "Failed to open customer portal");
        } finally {
            setIsPortalLoading(false);
        }
    };

    if (!stats || trialStatus.isLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
        );
    }

    const sigReq = stats.signatureRequests;
    const sigPercent = sigReq.limit > 0 ? Math.min((sigReq.used / sigReq.limit) * 100, 100) : 100;

    const tempStats = stats.templates;
    const tempPercent = tempStats.limit === Infinity ? 0 : (tempStats.limit > 0 ? Math.min((tempStats.used / tempStats.limit) * 100, 100) : 100);

    return (
        <div className="space-y-8 max-w-5xl mx-auto py-8 px-4 sm:px-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">Account & Usage</h1>
                <p className="text-muted-foreground">
                    Manage your subscription, branding, and track your usage.
                </p>
            </div>

            <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-8">
                <TabsList className="bg-transparent p-0 border-b w-full justify-start h-auto rounded-none space-x-6">
                    <TabsTrigger
                        value="usage"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-2"
                    >
                        Usage
                    </TabsTrigger>
                    <TabsTrigger
                        value="manage-plan"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-2"
                    >
                        Plans & Billing
                    </TabsTrigger>
                    <TabsTrigger
                        value="custom-branding"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-2"
                    >
                        Branding
                    </TabsTrigger>
                </TabsList>


                {/* Usage Tab Content */}
                <TabsContent value="usage" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Signature Requests Card */}
                        <Card className="shadow-none border-border/60">
                            <CardHeader className="pb-4">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg font-semibold">
                                        Signature Requests
                                    </CardTitle>
                                    <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full uppercase">
                                        {stats.plan}
                                    </span>
                                </div>
                                <CardDescription>
                                    Monthly allowance for document signing
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-baseline">
                                        <div className="flex items-baseline gap-1.5">
                                            <span className="text-3xl font-bold">{sigReq.used}</span>
                                            <span className="text-muted-foreground text-sm font-medium">/ {sigReq.limit} used</span>
                                        </div>
                                        <span className="text-sm font-semibold text-muted-foreground">{Math.round(sigPercent)}%</span>
                                    </div>
                                    <Progress value={sigPercent} className="h-2 bg-muted/30" />
                                </div>

                                {(sigPercent >= 100 || (stats.plan === "trial" && sigReq.used >= sigReq.limit)) && (
                                    <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5 text-destructive">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="12" cy="12" r="10"></circle>
                                                    <line x1="12" y1="8" x2="12" y2="12"></line>
                                                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-destructive">Limit Reached</h4>
                                                <p className="text-sm text-destructive/80 mt-1">
                                                    You've reached your signature request limit. Upgrade to send more documents.
                                                </p>
                                                <Button asChild size="sm" variant="destructive" className="mt-3">
                                                    <Link href="/pricing">Upgrade Plan</Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-col gap-4 mt-4 pt-4 border-t border-muted/20">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Reset Date</span>
                                        <span className="text-sm font-semibold">
                                            {new Date(stats.billingCycleStart || Date.now()).toLocaleDateString("en-US", {
                                                month: "long",
                                                day: "numeric",
                                                year: "numeric"
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Templates Card */}
                        <Card className="shadow-none border-border/60">
                            <CardHeader className="pb-4">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg font-semibold">
                                        Saved Templates
                                    </CardTitle>
                                </div>
                                <CardDescription>
                                    Reusable document templates
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-baseline">
                                        <div className="flex items-baseline gap-1.5">
                                            <span className="text-3xl font-bold">{tempStats.used}</span>
                                            <span className="text-muted-foreground text-sm font-medium">
                                                / {tempStats.limit === Infinity ? "∞" : tempStats.limit} used
                                            </span>
                                        </div>
                                        {tempStats.limit !== Infinity && (
                                            <span className="text-sm font-semibold text-muted-foreground">{Math.round(tempPercent)}%</span>
                                        )}
                                    </div>
                                    {tempStats.limit !== Infinity ? (
                                        <Progress value={tempPercent} className="h-2 bg-muted/30" />
                                    ) : (
                                        <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                                            <div className="h-full w-full bg-primary/20 animate-pulse" />
                                        </div>
                                    )}

                                    {(tempStats.remaining <= 0 || (stats.plan === "trial" && tempStats.used >= tempStats.limit)) && (
                                        <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                                            <div className="flex items-start gap-3">
                                                <div className="mt-0.5 text-destructive">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <circle cx="12" cy="12" r="10"></circle>
                                                        <line x1="12" y1="8" x2="12" y2="12"></line>
                                                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-destructive">Limit Reached</h4>
                                                    <p className="text-sm text-destructive/80 mt-1">
                                                        You've reached your template limit. Upgrade to save more templates.
                                                    </p>
                                                    <Button asChild size="sm" variant="destructive" className="mt-3">
                                                        <Link href="/pricing">Upgrade Plan</Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col gap-4 mt-4 pt-4 border-t border-muted/20">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Remaining Slots</span>
                                        <span className="text-sm font-semibold">
                                            {tempStats.limit === Infinity ? "Unlimited" : tempStats.remaining}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {trialStatus.plan !== "professional" && (
                        <Card className="shadow-none border-border/60 bg-secondary/20">
                            <CardContent className="p-8">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                    <div className="space-y-3 text-center md:text-left">
                                        <h3 className="text-xl font-bold">Need more capacity?</h3>
                                        <p className="text-muted-foreground max-w-md">
                                            Our professional plans offer higher limits, bulk sending, and custom branding to help you grow your business.
                                        </p>
                                        <div className="flex flex-wrap gap-4 pt-2">
                                            <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg border border-muted/40">
                                                <Zap className="h-3 w-3 text-primary" /> Unlimited Templates
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg border border-muted/40">
                                                <Zap className="h-3 w-3 text-primary" /> Audit Trails
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg border border-muted/40">
                                                <Zap className="h-3 w-3 text-primary" /> Personalized Branding
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3 min-w-[200px]">
                                        <Button asChild size="lg" className="w-full font-bold shadow-none">
                                            <Link href="/pricing">View Billing Plans</Link>
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>

                {/* Manage Plan Tab Content */}
                <TabsContent value="manage-plan">
                    <Card className="shadow-none border-border/60">
                        <CardHeader className="border-b border-border/40 pb-6">
                            <div className="flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Current Plan</span>
                                        <PlanBadge />
                                    </div>
                                    <h2 className="text-2xl font-bold tracking-tight">
                                        {trialStatus.isPaidUser
                                            ? `Boopsign ${trialStatus.plan === "starter" ? "Starter" : "Professional"} ${trialStatus.billingInterval === "annually" ? "(Annual)" : "(Monthly)"}`
                                            : "Free Trial"}
                                    </h2>
                                    <p className="text-muted-foreground text-sm">
                                        {trialStatus.isPaidUser
                                            ? trialStatus.billingInterval === "annually"
                                                ? `$${trialStatus.plan === "starter" ? "16.00" : "32.00"} / month (Billed annually) • Renews automatically`
                                                : `$${trialStatus.plan === "starter" ? "19.00" : "39.00"} / month • Renews automatically`
                                            : "Experience the full power of Boopsign"
                                        }
                                    </p>
                                </div>

                                {trialStatus.isPaidUser ? (
                                    <Button
                                        variant="secondary"
                                        onClick={handleManageSubscription}
                                        disabled={isPortalLoading}
                                        className="font-medium"
                                    >
                                        {isPortalLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <CreditCard className="h-4 w-4 mr-2" />}
                                        Manage Billing
                                    </Button>
                                ) : (
                                    <Button asChild className="font-semibold shadow-none">
                                        <Link href="/pricing">
                                            Upgrade Now
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 sm:p-8">
                            {trialStatus.isPaidUser ? (
                                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <ShieldCheck className="h-5 w-5 text-green-700" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-green-900">Active Subscription</h3>
                                        <p className="text-green-800/80 text-sm mt-1 max-w-md">
                                            Your subscription is active and in good standing. Thank you for being a valued customer!
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm font-medium">
                                            <span className="text-muted-foreground uppercase tracking-wider text-xs">Trial Progress</span>
                                            <span className={(trialStatus.daysRemaining ?? 0) <= 3 ? "text-orange-600 font-bold" : "text-foreground font-bold"}>
                                                {trialStatus.daysRemaining ?? 0} days remaining
                                            </span>
                                        </div>
                                        <Progress value={((7 - (trialStatus.daysRemaining || 0)) / 7) * 100} className="h-2.5" />
                                    </div>

                                    <div className="bg-secondary/20 rounded-xl p-6 text-sm border">
                                        <h4 className="font-semibold mb-2">About your trial</h4>
                                        <p className="text-muted-foreground leading-relaxed">
                                            Your trial gives you access to Boopsign features with limited usage: 1 signature request and 1 template.
                                            Custom branding is not available during the trial. Upgrade anytime to unlock full features.
                                        </p>
                                        <Button asChild variant="link" className="p-0 h-auto mt-4 text-primary font-semibold">
                                            <Link href="/pricing" className="flex items-center gap-1">
                                                Compare all plans <ArrowRight className="h-3 w-3" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Custom Branding Tab Content */}
                <TabsContent value="custom-branding">
                    <Card className="shadow-none border-border/60">
                        <CardHeader>
                            <CardTitle>Personal Branding</CardTitle>
                            <CardDescription>
                                Customize how your clients see your documents. This appearance will
                                be used on the signing page and in emails.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <BrandingForm />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
