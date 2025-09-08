import { Check, Clock, Zap, Shield, Star, Gem } from "lucide-react";
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
import Faq from "@/components/faq";
import CompetitorComparisonTable from "@/components/ComparasionTable";
import Link from "next/link";
import CheckoutButton from "../../components/checkout-btn";

export default function PricingPage() {
  const features = [
    "Unlimited document signing",
    "Supports PDF, DOC, and DOCX files",
    "Mobile-friendly e-signature platform",
    "Real-time email signing notifications",
    "Legally binding digital signatures",
    "Comprehensive document tracking",
    "Export your signed PDFs easily",
    "Reliable email support",
  ];

  const steps = [
    {
      number: "01",
      icon: <Zap className="size-6" />,
      title: "Lightning Fast Setup & Signing",
      description:
        "Upload, add signatures, and send documents in under 3 minutes with Boopsign’s mobile-first platform. No complex workflows or training needed.",
    },
    {
      number: "02",
      icon: <Shield className="size-6" />,
      title: "Secure, Industry-Standard Compliance",
      description:
        "Click exactly where signatures should go. Add signer names and emails with a few clicks—faster than DocuSign's complex field placement.",
    },
    {
      number: "03",
      icon: <Check className="size-6" />,
      title: "Simple & Transparent Pricing",
      description:
        "One affordable plan — no hidden fees, no per-document or per-user charges. What you see is what you pay.",
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
          Simple, Transparent Pricing
        </Badge>
        <h1 className="from-foreground to-foreground/50 bg-gradient-to-r bg-clip-text text-5xl font-bold tracking-tight text-pretty text-transparent md:text-6xl">
          Choose your perfect plan
        </h1>
        <p className="text-muted-foreground mx-auto max-w-3xl text-base text-balance md:text-lg">
          Start your 7-day free trial of Boopsign Pro today. No credit card
          required. Cancel anytime.
        </p>
      </div>

      {/* Boopsign Pro Pricing Card */}
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 lg:gap-12">
        <Card className="border-2 border-primary relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Free Plan</CardTitle>
            <CardDescription>
              Everything needed for fast, reliable, and mobile-first electronic
              signatures
            </CardDescription>
            <div className="mt-4">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                No credit card required
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
              <Link href={"/sign-in"}>Get Started Free</Link>
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
            <CardTitle className="text-2xl">Boopsign Pro Plan</CardTitle>
            <CardDescription>
              Everything needed for fast, reliable, and mobile-first electronic
              signatures
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
            <CheckoutButton>
              <Gem className="w-4 h-4 mr-2" />
              Upgrade to PRO
            </CheckoutButton>
            <p className="text-xs text-muted-foreground text-center">
              No credit card required • Full feature access during trial period
            </p>
          </CardFooter>
        </Card>
      </div>
      <CompetitorComparisonTable />

      {/* Benefits Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Boopsign?</h2>
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

      <Faq
        items={[
          {
            id: "q1",
            question: "What happens during my free trial of Boopsign Pro?",
            answer:
              "You get full access to all Boopsign Pro features for 7 days. No credit card is required to start. Create unlimited documents, send them securely for signing, and explore all features risk-free.",
          },
          {
            id: "q2",
            question: "Are there any hidden fees?",
            answer:
              "No hidden fees whatsoever. No per-document charges, no user fees, and no setup costs. Just $12/month for unlimited document signing.",
          },
          {
            id: "q3",
            question: "Can I cancel my Boopsign subscription anytime?",
            answer:
              "Yes, you can cancel your subscription at any time. No contracts or commitments. You can even cancel during your free trial with no questions asked.",
          },
          {
            id: "q4",
            question: "Do document signers need to create accounts?",
            answer:
              "No! Signers can sign documents directly from their email without creating any accounts. This reduces friction and speeds up the signing process significantly.",
          },
        ]}
      />

      {/* Final Call-To-Action Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to simplify your document signing?
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of freelancers, small businesses, and consultants who
          trust Boopsign as the best alternative to DocuSign.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" asChild>
            <Link href={"/sign-in"}>
              <Clock className="h-4 w-4 mr-2" />
              Start Your Free 7-Day Trial Today
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground">
            No credit card required • Setup in under 3 minutes
          </p>
        </div>
      </div>
    </div>
  );
}
