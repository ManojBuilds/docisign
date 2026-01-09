import { CheckCircle } from "lucide-react";

export function Problem() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold  sm:text-5xl">
              Built for Freelancers & Consultants Who Need Speed
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-4">
              Stop wasting time with complex e-signature tools. BoopSign is designed for professionals who value simplicity over bloated features.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-4xl items-start gap-8 sm:grid-cols-1 md:gap-12 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="mt-1 size-5 text-green-500" />
              <div>
                <h3 className="font-semibold">Freelancers getting contracts signed fast</h3>
                <p className="text-sm text-muted-foreground mt-1">Get freelance contracts signed in under 3 minutes—no account creation for clients</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="mt-1 size-5 text-green-500" />
              <div>
                <h3 className="font-semibold">Consultants sending NDAs & proposals</h3>
                <p className="text-sm text-muted-foreground mt-1">Send NDAs, SOWs, and consulting agreements without the DocuSign complexity</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="mt-1 size-5 text-green-500" />
              <div>
                <h3 className="font-semibold">Small businesses needing quick approvals</h3>
                <p className="text-sm text-muted-foreground mt-1">Get vendor agreements, service contracts, and legal docs signed instantly</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="mt-1 size-5 text-green-500" />
              <div>
                <h3 className="font-semibold">Agencies managing client onboarding</h3>
                <p className="text-sm text-muted-foreground mt-1">Streamline client onboarding with simple, mobile-friendly e-signatures</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
