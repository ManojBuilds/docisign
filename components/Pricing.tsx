"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useTrialStatus } from "@/hooks/useTrialStatus";
import {
  ArrowRight,
  Check,
  Loader2,
  Shield,
  Zap,
  Star,
  Users,
  Mail,
  FileText,
  Palette,
  ClipboardList,
  Smartphone,
  Lock,
  Library,
  Rocket,
  Bell,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import CheckoutButton from "./checkout-btn";
import { Highlighter } from "./ui/highlighter";

const Pricing = () => {
  const { isPaidUser, isLoading, plan } = useTrialStatus();
  const [billingInterval, setBillingInterval] = useState<
    "monthly" | "annually"
  >("monthly");

  const plans = [
    {
      name: "STARTER",
      id: "starter",
      tagline: "Getting Started",
      price: {
        monthly: 19,
        annually: 16,
      },
      savings: {
        monthly: 0,
        annually: 36, // $19 × 12 = $228 vs $192 = $36 saved
      },
      productIds: {
        monthly: process.env.NEXT_PUBLIC_DODO_PRICE_ID_STARTER,
        annually: process.env.NEXT_PUBLIC_DODO_PRICE_ID_STARTER_ANNUAL,
      },
      description:
        "Perfect for solo entrepreneurs getting started with 5-20 contracts per month.",
      features: [
        {
          icon: <FileText className="w-5 h-5 text-slate-500" />,
          text: "20 signature requests per month",
          subtext: "Perfect for 5-20 contracts/month",
        },
        {
          icon: <Users className="w-5 h-5 text-slate-500" />,
          text: "Unlimited signers per document",
          subtext: "Send one contract to multiple people",
        },
        {
          icon: <Palette className="w-5 h-5 text-slate-500" />,
          text: "Custom branding (Logo + Name)",
          subtext: "Look professional from day one",
        },
        {
          icon: <ClipboardList className="w-5 h-5 text-slate-500" />,
          text: "5 saved templates",
          subtext: "Reuse your standard contracts",
        },
        {
          icon: <Smartphone className="w-5 h-5 text-slate-500" />,
          text: "Mobile-optimized signing",
          subtext: "Works perfectly on any device",
        },
        {
          icon: <Mail className="w-5 h-5 text-slate-500" />,
          text: "Email support",
          subtext: "24-hour response time",
        },
        {
          icon: <Lock className="w-5 h-5 text-slate-500" />,
          text: "Basic audit trails",
          subtext: "Timestamp, IP, and email verification",
        },
      ],
      notIncluded: ["Bulk sending", "Unlimited templates", "Priority support"],
      cta: "Start 14 days free trial",
      highlight: false,
    },
    {
      name: "PROFESSIONAL",
      id: "professional",
      tagline: "Most Popular",
      price: {
        monthly: 39,
        annually: 32,
      },
      savings: {
        monthly: 0,
        annually: 84, // $39 × 12 = $468 vs $384 = $84 saved
      },
      productIds: {
        monthly: process.env.NEXT_PUBLIC_DODO_PRICE_ID_PROFESSIONAL,
        annually: process.env.NEXT_PUBLIC_DODO_PRICE_ID_PROFESSIONAL_ANNUAL,
      },
      description:
        "For established solos sending 20-60 contracts monthly with priority support and bulk sending.",
      features: [
        {
          icon: <FileText className="w-5 h-5 text-blue-600" />,
          text: "75 signature requests per month",
          subtext: "Covers 95% of solo entrepreneurs",
        },
        {
          icon: <Library className="w-5 h-5 text-blue-600" />,
          text: "Unlimited template library",
          subtext: "Save all your contracts forever",
        },
        {
          icon: <Rocket className="w-5 h-5 text-blue-600" />,
          text: "Bulk send to 5 recipients at once",
          subtext: "Save 15 minutes on renewals and onboarding",
        },
        {
          icon: <Zap className="w-5 h-5 text-blue-600" />,
          text: "Priority email support",
          subtext: "4-hour response time",
        },
        {
          icon: <Search className="w-5 h-5 text-blue-600" />,
          text: "Advanced audit trails",
          subtext: "Detailed IP logging and timestamps",
        },
        {
          icon: <Bell className="w-5 h-5 text-blue-600" />,
          text: "Instant email notifications",
          subtext: "Get notified the moment contracts are signed",
        },
        {
          icon: <Palette className="w-5 h-5 text-blue-600" />,
          text: "Custom branding on all pages",
          subtext: "Your logo everywhere",
        },
      ],
      notIncluded: [],
      cta: "Start 14 days free trial",
      highlight: true,
    },
  ];

  return (
    <div
      className="bg-white relative overflow-hidden font-sans border-t border-slate-100"
      id="pricing"
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[700px] bg-gradient-to-b from-slate-50 via-blue-50/20 to-transparent -z-10" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl -z-10" />

      {/* Header Section */}
      <div className="container mx-auto px-4 pt-16 pb-8 text-center">
        <Badge
          variant="secondary"
          className="mb-4 text-xs font-semibold px-4 py-1.5 border-blue-200 text-blue-700 bg-blue-50"
        >
          Simple Pricing
        </Badge>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-4 leading-tight">
          Simple Pricing for{" "}
          <Highlighter
            action="circle"
            color="#3b82f6"
            animationDuration={0}
            strokeWidth={2}
            padding={10}
          >
            Solo
          </Highlighter>
        </h2>

        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-2 leading-relaxed">
          No team seats. No per-signature fees. No client account barriers.
        </p>
        <p className="text-base text-slate-500 max-w-2xl mx-auto mb-8">
          Just straightforward pricing that matches how you actually work.
        </p>

        {/* Interval Toggle */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <span
            className={`text-sm font-semibold transition-colors ${billingInterval === "monthly"
              ? "text-slate-900"
              : "text-slate-500"
              }`}
          >
            Monthly
          </span>

          <button
            aria-label="Toggle between monthly and annual billing"
            onClick={() =>
              setBillingInterval(
                billingInterval === "monthly" ? "annually" : "monthly",
              )
            }
            className={`relative w-16 h-8 rounded-full p-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${billingInterval === "annually" ? "bg-blue-500" : "bg-slate-300"
              }`}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${billingInterval === "annually"
                ? "translate-x-8"
                : "translate-x-0"
                }`}
            />
          </button>

          <div className="flex items-center gap-2">
            <span
              className={`text-sm font-semibold transition-colors ${billingInterval === "annually"
                ? "text-slate-900"
                : "text-slate-500"
                }`}
            >
              Annual
            </span>
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border-emerald-200 text-[10px] py-0.5 px-2 font-bold uppercase tracking-wider shadow-sm"
            >
              Save 18%
            </Badge>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto relative z-10 mb-12 items-start">
          {plans.map((p) => (
            <Card
              key={p.id}
              className={`relative flex flex-col transition-all duration-200 rounded-2xl ${p.highlight
                ? "border-2 border-blue-600 border-b-[6px] shadow-2xl shadow-blue-900/10 lg:scale-[1.02] z-10 bg-white"
                : "border border-slate-200 border-b-4 hover:border-slate-300 shadow-sm hover:shadow-md bg-white"
                }`}
            >
              <CardHeader className="pt-6 pb-4 text-center space-y-4">
                {/* Badge */}
                {p.highlight && (
                  <div className="absolute -top-3 left-0 right-0 flex justify-center">
                    <Badge className="px-4 py-1.5 bg-blue-600 text-white hover:bg-blue-700 shadow-sm uppercase tracking-wide text-[10px] font-bold rounded-full border-0">
                      <Star className="w-3 h-3 fill-current mr-1.5" />
                      {p.tagline}
                    </Badge>
                  </div>
                )}

                {!p.highlight && (
                  <Badge
                    variant="secondary"
                    className="w-fit mx-auto text-xs font-semibold px-4 py-1.5 border-slate-200 text-slate-500 bg-slate-50 tracking-wide uppercase"
                  >
                    {p.tagline}
                  </Badge>
                )}

                {/* Plan name */}
                <h3
                  className={`text-2xl font-black tracking-tight uppercase ${p.highlight ? "text-blue-600" : "text-slate-900"}`}
                >
                  {p.name}
                </h3>

                {/* Price */}
                <div className="py-2">
                  <div className="flex items-baseline justify-center gap-1">
                    <span
                      className={`text-5xl font-black tracking-tighter ${p.highlight ? "text-slate-900" : "text-slate-900"}`}
                    >
                      ${p.price[billingInterval]}
                    </span>
                    <span className="text-xl text-slate-500 font-semibold">
                      /month
                    </span>
                  </div>

                  {billingInterval === "annually" && p.savings.annually > 0 && (
                    <p className="text-sm text-emerald-600 font-semibold mt-2">
                      Save ${p.savings.annually}/year
                    </p>
                  )}

                  {billingInterval === "annually" && (
                    <p className="text-xs text-slate-500 mt-1">
                      ${p.price[billingInterval] * 12} billed annually
                    </p>
                  )}
                </div>

                {/* Description */}
                <CardDescription className="text-sm text-slate-600 font-medium px-4 leading-relaxed max-w-sm mx-auto">
                  {p.description}
                </CardDescription>
              </CardHeader>

              {/* Features */}
              <CardContent className="py-5 px-6 sm:px-8 bg-slate-50/50 border-t border-b border-slate-100 flex-grow">
                <div className="space-y-3">
                  {p.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4 group">
                      {/* Icon or checkmark */}
                      <div
                        className={`text-xl flex-shrink-0 mt-0.5 w-6 text-center`}
                      >
                        {feature.icon}
                      </div>

                      {/* Feature text */}
                      <div className="flex-1 min-w-0 text-left">
                        <p
                          className={`text-sm font-semibold leading-snug transition-colors ${p.highlight ? "text-slate-900" : "text-slate-700"}`}
                        >
                          {feature.text}
                        </p>
                        {feature.subtext && (
                          <p className="text-xs text-slate-500 mt-0.5 leading-tight">
                            {feature.subtext}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Not included section (only for Starter) */}
                {p.notIncluded.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-200/60">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 text-left">
                      Not Included:
                    </p>
                    <div className="space-y-2">
                      {p.notIncluded.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-slate-400 text-xs font-bold">
                              ×
                            </span>
                          </div>
                          <span className="text-xs text-slate-400 font-medium line-through decoration-slate-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>

              {/* CTA Footer */}
              <CardFooter className="py-5 px-6 sm:px-8 flex flex-col gap-3 bg-white rounded-b-2xl">
                {isLoading ? (
                  <Button
                    disabled
                    className="w-full h-11 text-base font-semibold rounded-xl"
                  >
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </Button>
                ) : isPaidUser && plan === p.id ? (
                  <Button asChild className="w-full h-11" variant="secondary">
                    <Link href="/account/usage?tab=manage-plan">
                      ✓ Your Current Plan
                    </Link>
                  </Button>
                ) : (
                  <CheckoutButton
                    productId={p.productIds[billingInterval]}
                    interval={billingInterval}
                    plan={p.id as "starter" | "professional"}
                    variant={p.highlight ? "default" : "secondary"}
                    className={`w-full h-11 rounded-xl font-bold transition-all ${p.highlight
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-xl shadow-blue-500/20"
                      : "border-2 border-slate-200 hover:border-blue-300 hover:text-blue-600 text-slate-600"
                      }`}
                  >
                    {p.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </CheckoutButton>
                )}

                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-slate-500 mt-1">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="font-medium">14-day free trial</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="font-medium">No credit card required</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600 max-w-4xl mx-auto mb-16">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 shadow-sm">
            <Shield className="w-4 h-4 text-blue-600" />
            <span className="font-semibold">ESIGN Act Compliant</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 shadow-sm">
            <Shield className="w-4 h-4 text-blue-600" />
            <span className="font-semibold">UETA Certified</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 shadow-sm">
            <Shield className="w-4 h-4 text-blue-600" />
            <span className="font-semibold">Bank-Level Security</span>
          </div>
        </div>
      </div>

      {/* Comparison Table Section */}
      <div className="container mx-auto px-4 py-24 bg-gradient-to-b from-slate-50 to-white relative">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent" />

        <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
          <Badge
            variant="secondary"
            className="mb-4 text-xs font-semibold px-3 py-1 border-slate-300 text-slate-600 bg-white"
          >
            Competitor Comparison
          </Badge>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Why Solos Choose Boopsign
          </h3>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
            Built for speed, simplicity, and getting contracts signed
            fast—without the enterprise bloat.
          </p>
        </div>

        <div className="max-w-5xl mx-auto overflow-hidden rounded border border-slate-200 bg-white relative z-10">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-6 px-6 font-bold text-slate-900 text-base w-1/3 bg-slate-50/50">
                    Feature
                  </th>
                  <th className="py-6 px-4 font-bold text-blue-700 text-center text-base bg-blue-50/50 border-x border-blue-100 w-1/4 relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-500" />
                    <div className="flex flex-col items-center gap-1.5">
                      <span className="text-lg">Boopsign</span>
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 font-bold shadow-sm"
                      >
                        PRO
                      </Badge>
                    </div>
                  </th>
                  <th className="py-6 px-4 font-semibold text-slate-500 text-center text-sm w-1/5">
                    DocuSign
                  </th>
                  <th className="py-6 px-4 font-semibold text-slate-500 text-center text-sm w-1/5">
                    PandaDoc
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/30 transition-colors group">
                  <td className="py-5 px-6 font-semibold text-slate-700 group-hover:text-slate-900">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-md bg-amber-50 text-amber-500">
                        <Zap className="w-4 h-4" />
                      </div>
                      Page Load Speed
                    </div>
                  </td>
                  <td className="py-5 px-4 text-center bg-blue-50/30 border-x border-blue-50">
                    <span className="inline-flex items-center justify-center font-bold text-blue-700 bg-blue-100/50 px-3 py-1.5 rounded-full text-sm w-full max-w-[120px] mx-auto">
                      &lt; 2 seconds
                    </span>
                  </td>
                  <td className="py-5 px-4 text-slate-400 text-center font-medium">
                    ~15 seconds
                  </td>
                  <td className="py-5 px-4 text-slate-400 text-center font-medium">
                    ~12 seconds
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/30 transition-colors group">
                  <td className="py-5 px-6 font-semibold text-slate-700 group-hover:text-slate-900">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-md bg-rose-50 text-rose-500">
                        <Users className="w-4 h-4" />
                      </div>
                      Client Accounts
                    </div>
                  </td>
                  <td className="py-5 px-4 text-center bg-blue-50/30 border-x border-blue-50">
                    <span className="inline-flex items-center justify-center font-bold text-emerald-700 bg-emerald-100/50 px-3 py-1.5 rounded-full text-sm w-full max-w-[120px] mx-auto">
                      Not Required
                    </span>
                  </td>
                  <td className="py-5 px-4 text-slate-400 text-center font-medium">
                    Start Account
                  </td>
                  <td className="py-5 px-4 text-slate-400 text-center font-medium">
                    Start Account
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/30 transition-colors group">
                  <td className="py-5 px-6 font-semibold text-slate-700 group-hover:text-slate-900">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-md bg-indigo-50 text-indigo-500">
                        <Star className="w-4 h-4" />
                      </div>
                      Mobile Experience
                    </div>
                  </td>
                  <td className="py-5 px-4 text-center bg-blue-50/30 border-x border-blue-50">
                    <span className="inline-flex items-center justify-center font-bold text-blue-700 bg-blue-100/50 px-3 py-1.5 rounded-full text-sm w-full max-w-[120px] mx-auto">
                      Native Feel
                    </span>
                  </td>
                  <td className="py-5 px-4 text-slate-400 text-center font-medium">
                    Clunky
                  </td>
                  <td className="py-5 px-4 text-slate-400 text-center font-medium">
                    Poor
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/30 transition-colors group">
                  <td className="py-5 px-6 font-semibold text-slate-700 group-hover:text-slate-900">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-md bg-emerald-50 text-emerald-500">
                        <Check className="w-4 h-4" />
                      </div>
                      Completion Rate
                    </div>
                  </td>
                  <td className="py-5 px-4 text-center bg-blue-50/30 border-x border-blue-50">
                    <span className="inline-flex items-center justify-center font-bold text-emerald-700 bg-emerald-100/50 px-3 py-1.5 rounded-full text-sm w-full max-w-[120px] mx-auto">
                      92%
                    </span>
                  </td>
                  <td className="py-5 px-4 text-slate-400 text-center font-medium">
                    63%
                  </td>
                  <td className="py-5 px-4 text-slate-400 text-center font-medium">
                    68%
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/30 transition-colors group">
                  <td className="py-5 px-6 font-semibold text-slate-700 group-hover:text-slate-900">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-md bg-cyan-50 text-cyan-500">
                        <Mail className="w-4 h-4" />
                      </div>
                      Support Response
                    </div>
                  </td>
                  <td className="py-5 px-4 text-center bg-blue-50/30 border-x border-blue-50">
                    <span className="inline-flex items-center justify-center font-bold text-blue-700 bg-blue-100/50 px-3 py-1.5 rounded-full text-sm w-full max-w-[120px] mx-auto">
                      ~4 hours
                    </span>
                  </td>
                  <td className="py-5 px-4 text-slate-400 text-center font-medium">
                    Tiered
                  </td>
                  <td className="py-5 px-4 text-slate-400 text-center font-medium">
                    Tiered
                  </td>
                </tr>

                <tr className="bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <td className="py-5 px-6 font-bold text-slate-900">
                    Monthly Price
                  </td>
                  <td className="py-5 px-4 text-center bg-blue-50/50 border-x border-blue-100 border-b border-blue-100 rounded-b-lg">
                    <span className="inline-flex items-center justify-center font-black text-lg text-blue-700">
                      $39
                    </span>
                    <span className="text-xs text-blue-600 font-medium ml-1">
                      /mo
                    </span>
                  </td>
                  <td className="py-5 px-4 text-slate-500 text-center font-bold">
                    $45-60
                  </td>
                  <td className="py-5 px-4 text-slate-500 text-center font-bold">
                    $49-65
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="container mx-auto px-4 py-24 border-t border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center group">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center mb-6 text-amber-600 border border-amber-100 shadow-sm group-hover:shadow-md transition-shadow group-hover:scale-110 duration-300">
              <Zap className="h-9 w-9" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-amber-600 transition-colors">
              Lightning Fast
            </h3>
            <p className="text-slate-600 font-medium leading-relaxed text-sm">
              Pages load in under 2 seconds. Clients sign instantly on any
              device. No account walls or app downloads.
            </p>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center mb-6 text-blue-600 border border-blue-100 shadow-sm group-hover:shadow-md transition-shadow group-hover:scale-110 duration-300">
              <Shield className="h-9 w-9" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-blue-600 transition-colors">
              Bank-Level Security
            </h3>
            <p className="text-slate-600 font-medium leading-relaxed text-sm">
              256-bit encryption protects every document. Complete audit trails
              with timestamp, IP, and email verification.
            </p>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center mb-6 text-emerald-600 border border-emerald-100 shadow-sm group-hover:shadow-md transition-shadow group-hover:scale-110 duration-300">
              <Check className="h-9 w-9" strokeWidth={2.5} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-emerald-600 transition-colors">
              Legally Binding
            </h3>
            <p className="text-slate-600 font-medium leading-relaxed text-sm">
              ESIGN and UETA compliant with full audit trails. Every signature
              is as legally binding as pen and paper.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
