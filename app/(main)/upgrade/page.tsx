// app/upgrade/page.tsx
"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, Clock, CreditCard, Loader2, AlertCircle, Star } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useTrialStatus } from "@/hooks/useTrialStatus";

export default function UpgradePage() {
    const { user } = useUser();
    const trialStatus = useTrialStatus();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleUpgrade = async () => {
        if (!user) return;

        setIsLoading(true);
        setError(null);

        try {
            // Call your API route to create DodoPayments checkout
            const response = await fetch('/api/create-checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    clerkId: user.id,
                    email: user.emailAddresses[0]?.emailAddress,
                    name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
                }),
            });

            const data = await response.json();

            if (data.success && data.checkoutUrl) {
                // Redirect to DodoPayments checkout
                window.location.href = data.checkoutUrl;
            } else {
                setError(data.error || 'Failed to create checkout session');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
            console.error('Upgrade error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const proFeatures = [
        "Unlimited documents per month",
        "PDF, DOC, DOCX file support",
        "Mobile-friendly signing experience",
        "Email notifications & reminders",
        "Advanced signature fields",
        "Document tracking",
        "Export signed documents",
        "Priority email support",
    ];

    const savings = [
        { competitor: "DocuSign", price: 66, saving: 54 },
        { competitor: "PandaDoc", price: 49, saving: 37 },
        { competitor: "HelloSign", price: 15, saving: 3 },
    ];

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <Badge variant="secondary" className="mb-4">
                        <Star className="h-3 w-3 mr-1" />
                        Upgrade to Pro
                    </Badge>
                    <h1 className="text-3xl font-bold mb-2">
                        Continue with Docisign Pro
                    </h1>
                    {trialStatus?.trialEnded ? (
                        <p className="text-muted-foreground">
                            Your trial has expired. Upgrade to continue using Docisign.
                        </p>
                    ) : (
                        <p className="text-muted-foreground">
                            You have {trialStatus?.daysRemaining || 0} days left in your trial.
                            Upgrade now to ensure uninterrupted service.
                        </p>
                    )}
                </div>

                <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8">
                    {/* Pricing Card */}
                    <div>
                        <Card className="border-2 border-primary">
                            <CardHeader className="text-center">
                                <Badge variant="default" className="w-fit mx-auto mb-2">
                                    Recommended
                                </Badge>
                                <CardTitle className="text-2xl">Docisign Pro</CardTitle>
                                <CardDescription>
                                    Professional document signing for individuals 
                                </CardDescription>
                                <div className="mt-4">
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className="text-4xl font-bold">$12</span>
                                        <span className="text-muted-foreground">/month</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Billed monthly • Cancel anytime
                                    </p>
                                </div>
                            </CardHeader>

                            <CardContent>
                                <div className="space-y-3">
                                    {proFeatures.map((feature, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                            <span className="text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>

                            <CardFooter className="flex flex-col gap-4">
                                {error && (
                                    <Alert variant="destructive" className="w-full">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}

                                <Button
                                    onClick={handleUpgrade}
                                    className="w-full"
                                    size="lg"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <CreditCard className="h-4 w-4 mr-2" />
                                            Upgrade to Pro
                                        </>
                                    )}
                                </Button>

                                <div className="text-center space-y-2">
                                    <p className="text-xs text-muted-foreground">
                                        Secure payment powered by DodoPayments
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        30-day money-back guarantee
                                    </p>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>

                    {/* Savings Comparison */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">You&apos;re saving big!</CardTitle>
                                <CardDescription>
                                    See how much you save compared to other solutions
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {savings.map((item, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-medium">{item.competitor}</span>
                                            <div className="text-right">
                                                <div className="text-sm text-muted-foreground line-through">
                                                    ${item.price}/month
                                                </div>
                                                <Badge variant="secondary">
                                                    Save ${item.saving}/month
                                                </Badge>
                                            </div>
                                        </div>
                                        {index < savings.length - 1 && <Separator />}
                                    </div>
                                ))}

                                <div className="mt-6 p-4 bg-muted rounded-lg">
                                    <div className="text-center">
                                        <p className="text-sm text-muted-foreground">Annual savings vs DocuSign</p>
                                        <p className="text-2xl font-bold text-primary">$648</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Why Upgrade Now */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Why upgrade now?</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                                    <div>
                                        <p className="font-medium">Don&apos;t lose your progress</p>
                                        <p className="text-sm text-muted-foreground">
                                            Keep all your documents and continue where you left off
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Check className="h-5 w-5 text-primary mt-0.5" />
                                    <div>
                                        <p className="font-medium">Unlimited everything</p>
                                        <p className="text-sm text-muted-foreground">
                                            No limits on documents or signers
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <CreditCard className="h-5 w-5 text-primary mt-0.5" />
                                    <div>
                                        <p className="font-medium">Simple, honest pricing</p>
                                        <p className="text-sm text-muted-foreground">
                                            No hidden fees, no per-document charges
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="max-w-2xl mx-auto mt-12">
                    <h2 className="text-2xl font-bold text-center mb-8">
                        Frequently asked questions
                    </h2>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Can I cancel anytime?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Yes, you can cancel your subscription at any time. No contracts or commitments.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    We accept all major credit cards (Visa, MasterCard, American Express) and PayPal through our secure payment processor.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Is there a money-back guarantee?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Yes! We offer a 30-day money-back guarantee. If you&apos;re not satisfied, we&apos;ll refund your payment.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
