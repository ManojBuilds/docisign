import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { Check, Info, Shield, Zap } from "lucide-react";
import CheckoutButton from "../components/checkout-btn";


const Pricing = () => {
  const features = [
    "Unlimited contract signing",
    "Audit trail & history",
    "Mobile-friendly signing",
    "Real-time status notifications",
    "Secure cloud storage",
    "Priority email support",
  ];

  return (
    <div className="bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-primary/5 to-transparent -z-10" />

      {/* Header Section */}
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
          One plan. All features. <br className="hidden md:block" />
          <span className="text-primary">$12/month.</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Get everything you need to sign contracts online. No hidden fees. Start your 7-day free trial today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground/80">
            <Check className="w-4 h-4 text-primary" />
            <span>No credit card required</span>
          </div>
          <div className="hidden sm:block text-muted-foreground">•</div>
          <div className="flex items-center gap-2 text-sm font-medium text-foreground/80">
            <Check className="w-4 h-4 text-primary" />
            <span>Cancel anytime</span>
          </div>
          <div className="hidden sm:block text-muted-foreground">•</div>
          <div className="flex items-center gap-2 text-sm font-medium text-foreground/80">
            <Check className="w-4 h-4 text-primary" />
            <span>Instant setup</span>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="max-w-lg mx-auto">
          <Card className="border-0 shadow-2xl ring-1 ring-border/50 bg-card/50 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary/80 via-primary to-primary/80" />

            <CardHeader className="pt-8 pb-2 text-center">
              <Badge variant="secondary" className="w-fit mx-auto mb-4 font-medium px-3 py-1">
                BoopSign Pro
              </Badge>
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="text-5xl font-bold tracking-tight">$12</span>
                <span className="text-lg text-muted-foreground font-medium">/month</span>
              </div>
              <CardDescription className="text-base">
                Billed monthly. 7-day free trial included.
              </CardDescription>
            </CardHeader>

            <CardContent className="py-8 px-6 sm:px-10">
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 text-left">
                    <div className="mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-foreground/90 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>

            <CardFooter className="pb-8 px-6 sm:px-10 flex flex-col gap-4">
              <CheckoutButton className="w-full h-12 text-lg font-semibold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] hover:shadow-primary/30">
                Start 7-Day Free Trial
              </CheckoutButton>
              <p className="text-xs text-center text-muted-foreground">
                Total due today: <span className="font-semibold text-foreground">$0.00</span>.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-secondary/30">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Lightning Fast</h3>
            <p className="text-muted-foreground leading-relaxed">
              Send contracts for signature in under 60 seconds. Recipients sign instantly on any device without downloading an app.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-secondary/30">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Bank-Level Security</h3>
            <p className="text-muted-foreground leading-relaxed">
              Your contracts are protected with 256-bit encryption. We maintain a comprehensive audit trail for every transaction.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-secondary/30">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
              <Info className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Legally Binding</h3>
            <p className="text-muted-foreground leading-relaxed">
              Signatures collected via BoopSign are ESIGN and UETA compliant, making them as legally binding as pen and paper.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;