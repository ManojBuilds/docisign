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
import { useState } from "react";
import CheckoutButton from "./checkout-btn";

const Pricing = () => {
  const { isPaidUser, isLoading, isTrialActive } = useTrialStatus();
  const [billingInterval, setBillingInterval] = useState<"monthly" | "annually">("monthly");

  const features = [
    "Unlimited contract signing",
    "Custom Branding (Your Logo)",
    "Audit trail & history",
    "Mobile-friendly signing",
    "Real-time status notifications",
    "Secure cloud storage",
    "Priority email support",
  ];

  const prices = {
    monthly: 15,
    annually: 12, // $144 / 12
  };

  const productIds = {
    monthly: process.env.NEXT_PUBLIC_DODO_PRICE_ID_PRO,
    annually: process.env.NEXT_PUBLIC_DODO_PRICE_ID_PRO_ANNUAL,
  };

  return (
    <div className="bg-white relative overflow-hidden font-sans border-t border-slate-100" id="pricing">
      {/* Background Decor - clean and subtle */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-slate-50 to-transparent -z-10" />

      {/* Header Section */}
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6">
          Fair Pricing. Unlimited Signatures.
        </h2>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-4 leading-relaxed">
          Everything you need to sign documents securely. <br />
          <span className="text-slate-900 font-medium">One plan. One price. No hidden fees.</span>
        </p>
        <div className="mb-12">
          <Link href="/esignature-for-freelancers" className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline">
            Looking for freelancer-specific features? Check out our freelancer portal →
          </Link>
        </div>

        {/* Interval Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm font-medium ${billingInterval === "monthly" ? "text-slate-900" : "text-slate-500"}`}>
            Monthly
          </span>
          <button
            aria-label="Toggle between monthly and annually"
            onClick={() => setBillingInterval(billingInterval === "monthly" ? "annually" : "monthly")}
            className="relative w-14 h-7 bg-slate-200 rounded-full p-1 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${billingInterval === "annually" ? "translate-x-7" : "translate-x-0"
                }`}
            />
          </button>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${billingInterval === "annually" ? "text-slate-900" : "text-slate-500"}`}>
              Annually
            </span>
            <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 text-[10px] py-0 px-2 font-bold uppercase tracking-wider">
              Save 20%
            </Badge>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="max-w-md mx-auto relative z-10">
          <Card className="border-0 ring-1 ring-slate-200 bg-white relative overflow-hidden transition-all duration-300 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] rounded-[2rem]">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-600" />

            <CardHeader className="pt-10 pb-6 text-center">
              <Badge variant="secondary" className="w-fit mx-auto mb-8 text-sm font-semibold px-4 py-1 bg-blue-100 text-blue-800 tracking-wide hover:bg-blue-200 transition-colors">
                Boopsign PRO
              </Badge>
              <div className="flex items-baseline justify-center gap-1 mb-4">
                <span className="text-6xl font-black tracking-tighter text-slate-900">${prices[billingInterval]}</span>
                <span className="text-xl text-slate-500 font-medium tracking-tight">/month</span>
              </div>
              <CardDescription className="text-lg text-slate-700 font-semibold mb-2">
                {billingInterval === "annually" ? "$144 billed annually" : "Unlimited documents • No per-signer fees"}
              </CardDescription>
              <CardDescription className="text-sm text-slate-600 font-medium">
                7-day free trial. Cancel anytime.
              </CardDescription>
            </CardHeader>

            <CardContent className="py-8 px-8 sm:px-10 bg-slate-50/50 border-t border-slate-100 border-b">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-widest mb-6 text-center">
                What&apos;s included in Pro
              </p>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-left group">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                      <Check className="h-3.5 w-3.5 text-blue-600 group-hover:text-white" />
                    </div>
                    <span className="text-slate-600 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>

            <CardFooter className="py-8 px-8 sm:px-10 flex flex-col gap-4 bg-white">
              {isLoading ? (
                <Button disabled className="w-full h-14 text-lg rounded-xl">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Checking status...
                </Button>
              ) : isPaidUser ? (
                <Button asChild className="w-full h-14 text-lg font-semibold shadow-lg shadow-blue-500/20 rounded-xl hover:translate-y-[-2px] transition-all" size="lg">
                  <Link href="/account/billing">
                    Manage Subscription
                  </Link>
                </Button>
              ) : (
                <CheckoutButton
                  productId={productIds[billingInterval]}
                  interval={billingInterval}
                  className="w-full h-14 text-lg font-semibold shadow-xl shadow-blue-600/20 transition-all hover:-translate-y-1 hover:shadow-blue-600/30 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isTrialActive ? "Upgrade to Pro" : "Start 7-Day Free Trial"}
                </CheckoutButton>
              )}

              {!isPaidUser && (
                <p className="text-xs text-center text-slate-600 font-medium">
                  No credit card required for trial.
                </p>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>


      {/* Comparison Section */}
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-slate-900">Stop overpaying for features you don&apos;t use.</h2>
        <p className="text-lg text-slate-500 mb-8 max-w-2xl mx-auto">
          We strip away the enterprise bloat like hierarchical permissions and complex API integrations. We just do e-signatures, beautifully.
        </p>
        <Link href="/docusign-vs-boopsign" className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700 transition-colors group text-sm uppercase tracking-wide">
          See comparison table <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Feature Highlights Grid - Cleaner */}
      <div className="container mx-auto px-4 py-20 border-t border-slate-100">
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center group">
            <div className="h-16 w-16 rounded-2xl bg-amber-100 flex items-center justify-center mb-6 text-amber-600 group-hover:scale-110 transition-transform duration-300">
              <Zap className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-3 text-slate-900">Lightning Fast</h3>
            <p className="text-slate-600 leading-relaxed px-4 text-sm">
              Send contracts for signature in seconds. Sign instantly on any device without apps.
            </p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="h-16 w-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform duration-300">
              <Shield className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-3 text-slate-900">Bank-Level Security</h3>
            <p className="text-slate-600 leading-relaxed px-4 text-sm">
              Protected with 256-bit encryption. comprehensive audit trails for every transaction.
            </p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="h-16 w-16 rounded-2xl bg-green-100 flex items-center justify-center mb-6 text-green-600 group-hover:scale-110 transition-transform duration-300">
              <Info className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-3 text-slate-900">Legally Binding</h3>
            <p className="text-slate-600 leading-relaxed px-4 text-sm">
              ESIGN and UETA compliant signatures. As legally binding as pen and paper.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;