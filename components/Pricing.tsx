"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { useTrialStatus } from "@/hooks/useTrialStatus";
import { ArrowRight, Check, Info, Loader2, Shield, Zap } from "lucide-react";
import Link from "next/link";
import CheckoutButton from "./checkout-btn";

const Pricing = () => {
  const { isPaidUser, isLoading, isTrialActive } = useTrialStatus();

  const features = [
    "Unlimited contract signing",
    "Audit trail & history",
    "Mobile-friendly signing",
    "Real-time status notifications",
    "Secure cloud storage",
    "Priority email support",
  ];

  return (
    <div className="bg-background relative overflow-hidden font-sans">
      {/* Background Decor - clean and subtle */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-primary/5 to-transparent -z-10" />

      {/* Header Section */}
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
          Simple, transparent pricing.
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Everything you need to sign documents securely. <br />
          <span className="text-foreground font-medium">One plan. One price. No hidden fees.</span>
        </p>

        {/* Pricing Card */}
        <div className="max-w-lg mx-auto">
          <Card className="border shadow-xl ring-1 ring-border/50 bg-card/80 backdrop-blur-sm relative overflow-hidden transition-all duration-300 hover:shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-primary" />

            <CardHeader className="pt-8 pb-4 text-center">
              <Badge variant="secondary" className="w-fit mx-auto mb-6 text-sm font-medium px-4 py-1.5 bg-primary/10 text-primary hover:bg-primary/20">
                BoopSign Pro
              </Badge>
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="text-5xl font-bold tracking-tight text-foreground">$15</span>
                <span className="text-lg text-muted-foreground font-medium">/month</span>
              </div>
              <CardDescription className="text-base text-slate-900 font-bold mb-1">
                No per-signer fees • Unlimited documents
              </CardDescription>
              <CardDescription className="text-sm text-muted-foreground">
                Everything included. 7-day free trial.
              </CardDescription>
            </CardHeader>

            <CardContent className="py-8 px-8 sm:px-12">
              <div className="space-y-5">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 text-left group">
                    <div className="mt-0.5 h-5 w-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-colors">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-foreground/80 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>

            <CardFooter className="pb-8 px-8 sm:px-12 flex flex-col gap-4">
              {isLoading ? (
                <Button disabled className="w-full h-12 text-lg">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Checking status...
                </Button>
              ) : isPaidUser ? (
                <Button asChild className="w-full h-12 text-lg font-semibold shadow-md" size="lg">
                  <Link href="/account/billing">
                    Manage Subscription
                  </Link>
                </Button>
              ) : (
                <CheckoutButton className="w-full h-12 text-lg font-semibold shadow-lg shadow-primary/25 transition-all hover:scale-[1.01] hover:shadow-primary/40">
                  {isTrialActive ? "Upgrade to Pro" : "Start 7-Day Free Trial"}
                </CheckoutButton>
              )}

              {!isPaidUser && (
                <p className="text-xs text-center text-muted-foreground mt-2">
                  No credit card required for trial. Cancel anytime.
                </p>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Comparison Section */}
      <div className="container mx-auto px-4 py-32 text-center border-t border-slate-100">
        <h2 className="text-3xl font-bold mb-6 text-slate-900">Stop overpaying for enterprise bloat.</h2>
        <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
          We don't charge for 500-user hierarchical permissions or API integrations you'll never use. We just do e-signatures, beautifully.
        </p>
        <Link href="/docusign-vs-boopsign" className="inline-flex items-center gap-2 font-bold text-blue-600 hover:text-blue-700 transition-colors group">
          See how we compare to DocuSign <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Feature Highlights Grid - Cleaner */}
      <div className="container mx-auto px-4 py-24 bg-secondary/20">
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="h-14 w-14 rounded-2xl bg-white shadow-sm border border-border/50 flex items-center justify-center mb-6 text-primary">
              <Zap className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-bold mb-3 text-foreground">Lightning Fast</h3>
            <p className="text-muted-foreground leading-relaxed px-4 text-sm">
              Send contracts for signature in seconds. Sign instantly on any device without apps.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="h-14 w-14 rounded-2xl bg-white shadow-sm border border-border/50 flex items-center justify-center mb-6 text-primary">
              <Shield className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-bold mb-3 text-foreground">Bank-Level Security</h3>
            <p className="text-muted-foreground leading-relaxed px-4 text-sm">
              Protected with 256-bit encryption. comprehensive audit trails for every transaction.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="h-14 w-14 rounded-2xl bg-white shadow-sm border border-border/50 flex items-center justify-center mb-6 text-primary">
              <Info className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-bold mb-3 text-foreground">Legally Binding</h3>
            <p className="text-muted-foreground leading-relaxed px-4 text-sm">
              ESIGN and UETA compliant signatures. As legally binding as pen and paper.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;