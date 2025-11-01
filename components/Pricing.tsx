import { Check, Zap, Shield, Star, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import CheckoutButton from "../components/checkout-btn";

interface PricingProps {
  heading?: string;
  description?: string;
}

const Pricing = ({
  heading = "10x Cheaper Than DocuSign",
  description = "Start your 7-day free trial today. No credit card required. No account needed for signers. Cancel anytime with one click."
}: PricingProps) => {
  const features = [
    "Unlimited document signing (no per-doc fees)",
    "No account required for signers",
    "PDF, DOC, and DOCX support",
    "Mobile-optimized signing experience",
    "Legally binding audit trail",
    "Real-time email notifications",
    "Instant signed PDF delivery",
    "Fast email support",
  ];

  const steps = [
    {
      number: "01",
      icon: <Zap className="size-6" />,
      title: "10x Faster Than DocuSign",
      description:
        "Upload, place signatures, and send in under 3 minutes. Your clients sign instantly—no account creation, no app download. Average signing time: 2 minutes vs DocuSign's 24-48 hours.",
    },
    {
      number: "02",
      icon: <Shield className="size-6" />,
      title: "10x Cheaper Than Competitors",
      description:
        "DocuSign costs $120+/month. PandaDoc costs $99/month. BoopSign? Just $12/month for unlimited signing. No per-document fees, no user fees, no hidden costs.",
    },
    {
      number: "03",
      icon: <Check className="size-6" />,
      title: "Built for Freelancers & Consultants",
      description:
        "No enterprise bloat. No complex workflows. Just the features you actually need: upload, sign, done. Perfect for contracts, NDAs, proposals, and service agreements.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <Badge
          variant="secondary"
          className="mb-4 inline-flex items-center gap-1"
        >
          <Star className="h-3 w-3" />
          {heading}
        </Badge>
        <h1 className="from-foreground to-foreground/50 bg-gradient-to-r bg-clip-text text-5xl font-bold tracking-tight text-pretty text-transparent md:text-6xl">
          $12/Month for Unlimited Signing
        </h1>
        <p className="text-muted-foreground mx-auto max-w-3xl text-base text-balance md:text-lg">
          {description}
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Compare: DocuSign $120/mo • PandaDoc $99/mo • HelloSign $60/mo • <span className="font-semibold text-primary">BoopSign $12/mo</span>
        </p>
      </div>

      {/* Boopsign Pro Pricing Card */}
      <div className="px-4 mx-auto grid max-w-5xl gap-8 md:grid-cols-1 lg:grid-cols-3 lg:gap-12">
        <Card className="border-2 relative overflow-hidden">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Free Trial</CardTitle>
            <CardDescription>
              Try BoopSign Pro free for 7 days. All features included. No credit card required.
            </CardDescription>
            <div className="mt-4">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/7 days</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Then $12/month • Cancel anytime
              </p>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="space-y-3 mb-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button size="lg" asChild className="w-full" variant={"outline"}>
              <Link href={"/sign-in"}>Start 7 days free trial</Link>
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              No credit card required • Full feature access during trial period
            </p>
          </CardFooter>
        </Card>
        <Card className="border-2 border-primary relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Badge variant="default" className="text-xs">
                Most Popular Plan
              </Badge>
            </div>
            <CardTitle className="text-2xl">BoopSign Pro</CardTitle>
            <CardDescription>
              Everything freelancers and consultants need. No account required for signers. Unlimited signing.
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

          <CardContent className="pt-0">
            <div className="space-y-3 mb-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <CheckoutButton className="w-full">
              <Gem className="w-4 h-4 mr-2" />
              Upgrade to PRO
            </CheckoutButton>
            <p className="text-xs text-muted-foreground text-center">
              No credit card required • Full feature access during trial period
            </p>
          </CardFooter>
        </Card>
        <Card className="border-2 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-muted" />
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                Coming Soon
              </Badge>
            </div>
            <CardTitle className="text-2xl">Team</CardTitle>
            <CardDescription>
              Advanced features for growing teams and enterprises.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm">Everything in Pro plan</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm">Team management</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm">Custom branding</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col">
            <Button size="lg" variant="secondary" className="w-full" disabled>
              Coming Soon
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Freelancers Choose BoopSign Over DocuSign</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built specifically for freelancers, consultants, and small businesses who need speed over complexity.
          </p>
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center text-center"
              >
                {/* Icon */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-primary">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;