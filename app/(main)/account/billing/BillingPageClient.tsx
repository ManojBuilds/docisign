"use client";


import { PlanBadge } from "@/components/PlanBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { useTrialStatus } from "@/hooks/useTrialStatus";
import { useAction } from "convex/react";
import { CreditCard, Loader2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function BillingPageClient() {
    const trialStatus = useTrialStatus();
    const [isLoading, setIsLoading] = useState(false);
    const createCustomerPortal = useAction(api.payments.createCustomerPortal);

    const handleManageSubscription = async () => {
        try {
            setIsLoading(true);
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
            setIsLoading(false);
        }
    };

    if (trialStatus.isLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="container mx-auto py-12 px-4 max-w-5xl font-sans">
            <div className="mb-8 flex items-end justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-foreground">Subscription</h1>
                    <p className="text-muted-foreground mt-1 text-sm">
                        Manage your billing and plan details
                    </p>
                </div>
                {/* Optional: Add invoice history link here if needed later */}
            </div>

            <Card className="border shadow-sm overflow-hidden bg-background">
                <CardContent className="p-0">
                    {/* Status Header */}
                    <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center bg-secondary/10">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Current Plan</span>
                                <PlanBadge />
                            </div>
                            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                                {trialStatus.isPaidUser ? "Boopsign Pro" : "Free Trial"}
                            </h2>
                            <p className="text-muted-foreground text-sm">
                                {trialStatus.isPaidUser
                                    ? "15.00 / month • Renews automatically"
                                    : "Experience the full power of Boopsign"
                                }
                            </p>
                        </div>

                        {trialStatus.isPaidUser ? (
                            <Button
                                variant="outline"
                                onClick={handleManageSubscription}
                                disabled={isLoading}
                                className="bg-background hover:bg-muted font-medium disabled:cursor-not-allowed cursor-pointer"
                            >
                                {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <CreditCard className="h-4 w-4 mr-2" />}
                                Manage Billing
                            </Button>
                        ) : (
                            <Button asChild size="lg" className="font-semibold shadow-sm">
                                <Link href="/upgrade">
                                    Upgrade Now
                                </Link>
                            </Button>
                        )}
                    </div>

                    <Separator />

                    {/* Content Section */}
                    <div className="p-6 sm:p-8">
                        {trialStatus.isPaidUser ? (
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-green-100 rounded-full">
                                    <ShieldCheck className="h-6 w-6 text-green-700" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">Active Subscription</h3>
                                    <p className="text-muted-foreground text-sm mt-1 max-w-md">
                                        Your subscription is active and in good standing. You have full access to all professional features including unlimited signing and audit trails.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm font-medium">
                                        <span>Trial Period</span>
                                        <span className={(trialStatus.daysRemaining ?? 0) <= 3 ? "text-orange-600" : "text-foreground"}>
                                            {trialStatus.daysRemaining ?? 0} days left
                                        </span>
                                    </div>
                                    <Progress value={((7 - (trialStatus.daysRemaining || 0)) / 7) * 100} className="h-2" />
                                </div>

                                <div className="bg-secondary/30 rounded-lg p-4 text-sm text-foreground/80 border border-border/50">
                                    <p>Your trial gives you full access to Boopsign Pro. Upgrade anytime to keep using these features without interruption.</p>
                                </div>
                            </div>
                        )}
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}
