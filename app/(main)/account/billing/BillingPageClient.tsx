"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Crown, CreditCard, Calendar, Loader2 } from "lucide-react";
import { useTrialStatus } from "@/hooks/useTrialStatus";
import { PlanBadge } from "@/components/PlanBadge";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@clerk/clerk-react";

export default function BillingPageClient() {
    const trialStatus = useTrialStatus();
    const {userId} = useAuth()
    const [isLoading, setIsLoading] = useState(false)

    const handleManageSubscription = async () => {
        try {
            setIsLoading(true)
            const res = await fetch('/api/customer-portal', { method: 'POST', body: JSON.stringify({clerkId: userId}) });
            const data = await res.json()
            if (data.link) {
                window.open(data.link, "_blank");
            }
        } catch (error: any) {
            console.error(error)
            toast.error(error?.message)
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <div className="container mx-auto py-6 px-4 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Billing & Subscription</h1>
                <p className="text-muted-foreground">
                    Manage your subscription, view billing history, and update payment methods.
                </p>
            </div>

            <div className="grid gap-6">
                {/* Current Plan */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <Crown className="h-5 w-5" />
                                    Current Plan
                                </CardTitle>
                                <CardDescription>
                                    Your current subscription details
                                </CardDescription>
                            </div>
                            <PlanBadge showDetails />
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {trialStatus.isPaidUser ? (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium">Plan</p>
                                        <p className="text-2xl font-bold">Boopsign Pro</p>
                                        <p className="text-sm text-muted-foreground">$12/month</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Status</p>
                                        <p className="text-lg font-semibold text-green-600">Active</p>
                                        <p className="text-sm text-muted-foreground">Renews automatically</p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex gap-3">
                                    <Button onClick={handleManageSubscription} disabled={isLoading}>
                                        {
                                            isLoading ?
                                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                :
                                                <CreditCard className="h-4 w-4 mr-2" />
                                        }
                                        Manage Subscription
                                    </Button>

                                </div>
                            </>
                        ) : (
                            <>
                                <div className="text-center py-8">
                                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <h3 className="font-semibold mb-2">
                                        {trialStatus.isTrialActive ? "Free Trial Active" : "No Active Subscription"}
                                    </h3>
                                    <p className="text-muted-foreground mb-4">
                                        {trialStatus.isTrialActive
                                            ? `${trialStatus.daysRemaining} days remaining in your trial`
                                            : "Upgrade to access all professional features"
                                        }
                                    </p>
                                    <Button asChild>
                                        <a href="/upgrade">
                                            <Crown className="h-4 w-4 mr-2" />
                                            Upgrade to Pro
                                        </a>
                                    </Button>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>

                {/* Features Included */}
                <Card>
                    <CardHeader>
                        <CardTitle>Features Included</CardTitle>
                        <CardDescription>
                            {trialStatus.isPaidUser || trialStatus.isTrialActive
                                ? "Everything you get with your current plan"
                                : "What you'll get with Boopsign Pro"
                            }
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                                    Unlimited documents
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                                    PDF, DOC, DOCX support
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                                    Mobile-friendly signing
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                                    Email notifications
                                </div>

                            </div>
                            <div className="space-y-2">

                                <div className="flex items-center gap-2 text-sm">
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                                    Advanced signature fields
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                                    Document tracking
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                                    Priority email support
                                </div>

                            </div>
                        </div>
                    </CardContent>
                </Card>


            </div>
        </div>
    );
}
