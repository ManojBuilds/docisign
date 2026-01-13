import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 font-sans">
      <div className="w-full max-w-lg space-y-8 animate-in fade-in zoom-in duration-500">

        {/* Brand/Logo Area - optional if header exists, but good for standalone success page */}
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Welcome to Pro
          </h1>
          <p className="text-lg text-muted-foreground">
            Your account has been successfully upgraded.
          </p>
        </div>

        <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm ring-1 ring-border/50">
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/50">
                <Zap className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Unlimited Signing</p>
                  <p className="text-xs text-muted-foreground">No monthly limits</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/50">
                <ShieldCheck className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Audit Trails</p>
                  <p className="text-xs text-muted-foreground">Legal evidence logs</p>
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-muted-foreground pt-2">
              A receipt has been sent to your email address.
            </div>

            <div className="flex flex-col gap-3">
              <Button asChild size="lg" className="w-full font-semibold h-11 text-base">
                <Link href="/dashboard">
                  Go to Dashboard
                </Link>
              </Button>
              <Button asChild variant="ghost" size="sm" className="w-full text-muted-foreground hover:text-foreground">
                <Link href="/account/billing">
                  Manage Subscription
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          Need help? <Link href="mailto:support@boopsign.com" className="underline hover:text-foreground transition-colors">Contact Support</Link>
        </p>

      </div>
    </div>
  );
}
