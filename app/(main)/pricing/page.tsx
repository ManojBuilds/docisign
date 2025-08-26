'use client'
import { Check, ArrowRight, Clock, Zap, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@clerk/nextjs";

export default function PricingPage() {
  const { isSignedIn } = useUser();
  const handleStartTrial = () => {
    if (isSignedIn) {
      window.location.href = "/upgrade";
    } else {
      window.location.href = "/sign-up";
    }
  };

  const features = [
    "Unlimited documents",
    "PDF, DOC, DOCX support",
    "Mobile-friendly signing",
    "Email notifications",
    "Document templates",
    "Custom branding",
    "Digital signatures",
    "Document tracking",
    "Export signed PDFs",
    "Email support"
  ];

  const competitors = [
    { name: "DocuSign", price: "$66", features: ["100 docs/month", "1 user", "Complex setup"] },
    { name: "PandaDoc", price: "$49", features: ["Unlimited docs", "1 user", "Steep learning curve"] },
    { name: "HelloSign", price: "$15", features: ["Unlimited docs", "1 user", "Limited features"] },
    { name: "Docisign", price: "$12", features: ["Unlimited docs", "Unlimited users", "3-minute setup"] }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="container mx-auto px-4 py-16 text-center">
        <Badge variant="secondary" className="mb-4">
          <Star className="h-3 w-3 mr-1" />
          Simple Pricing
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Document signing that doesn&apos;t break the bank
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Start your free 7-day trial today. No credit card required. 
          Cancel anytime.
        </p>
      </div>

      {/* Main Pricing Card */}
      <div className="container mx-auto px-4 mb-16">
        <div className="max-w-md mx-auto">
          <Card className="border-2 border-primary relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-primary"></div>
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Badge variant="default" className="text-xs">
                  Most Popular
                </Badge>
              </div>
              <CardTitle className="text-2xl">Docisign Pro</CardTitle>
              <CardDescription>
                Everything you need for professional document signing
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
              <Button onClick={handleStartTrial} className="w-full" size="lg">
                <Clock className="h-4 w-4 mr-2" />
                Start 7-Day Free Trial
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                No credit card required • Full access during trial
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Comparison Section */}
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              See how we compare
            </h2>
            <p className="text-muted-foreground">
              Docisign offers the same professional features at a fraction of the cost
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="font-semibold text-sm">Solution</div>
                <div className="font-semibold text-sm">Monthly Price</div>
                <div className="font-semibold text-sm">Document Limit</div>
                <div className="font-semibold text-sm">Users Included</div>
              </div>
              
              {competitors.map((competitor, index) => {
                const isDocisign = competitor.name === "Docisign";
                return (
                  <Card key={index} className={`mb-3 ${isDocisign ? 'border-primary bg-primary/5' : ''}`}>
                    <CardContent className="py-4">
                      <div className="grid grid-cols-4 gap-4 items-center">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{competitor.name}</span>
                          {isDocisign && (
                            <Badge variant="default" className="text-xs">
                              Our Product
                            </Badge>
                          )}
                        </div>
                        <div className="font-bold text-lg">
                          {competitor.price}
                          <span className="text-sm font-normal text-muted-foreground">/month</span>
                        </div>
                        <div className="text-sm">
                          {competitor.name === "DocuSign" ? "100 documents" : "Unlimited"}
                        </div>
                        <div className="text-sm">
                          {competitor.name === "Docisign" ? "Unlimited" : "1 user"}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground mb-4">
              Save up to <span className="font-semibold">$648 per year</span> vs DocuSign
            </p>
            <Button onClick={handleStartTrial} variant="outline">
              Try Docisign Free for 7 Days
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Why choose Docisign?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Lightning Fast</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Upload, add signatures, and send documents in under 3 minutes. 
                No complex workflows or lengthy setup required.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Secure & Reliable</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Bank-level security with legally binding digital signatures. 
                Your documents are encrypted and stored safely.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Simple Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                One simple plan with no hidden fees, no per-document charges, 
                and no user limits. What you see is what you pay.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Frequently asked questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What happens during my free trial?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  You get full access to all Docisign Pro features for 7 days. 
                  No credit card required to start. You can create unlimited documents, 
                  send them for signing, and explore all features risk-free.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Are there any hidden fees?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No hidden fees whatsoever. No per-document charges, no user fees, 
                  no setup costs. Just $12/month for unlimited document signing.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I cancel anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, you can cancel your subscription at any time. No contracts, 
                  no commitments. You can even cancel during your free trial with 
                  no questions asked.
                </p>
              </CardContent>
            </Card>

            

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do signers need to create an account?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No! Signers can sign documents directly from their email without 
                  creating any accounts. This reduces friction and speeds up the signing process.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to get started?
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of professionals who&apos;ve simplified their document signing workflow with Docisign.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button onClick={handleStartTrial} size="lg">
            <Clock className="h-4 w-4 mr-2" />
            Start Free 7-Day Trial
          </Button>
          <p className="text-sm text-muted-foreground">
            No credit card required • Setup in 2 minutes
          </p>
        </div>
      </div>
    </div>
  );
}
