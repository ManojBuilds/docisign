import { Zap, Smartphone, Shield, Users } from "lucide-react";

const Features = () => {
  return (
    <section className="py-32" id="#features">
      <div className="container mx-auto">
        <p className="mb-4 text-sm text-muted-foreground lg:text-base">
          EVERYTHING YOU NEED
        </p>
        <h2 className="text-3xl font-medium lg:text-4xl">Why Choose Docisign?</h2>
        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-lg bg-accent p-5">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <Zap className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-medium">Lightning Fast</h3>
            <p className="leading-7 text-muted-foreground">
              Complete document setup in under 3 minutes. No training required, no complexity—just results that get you back to business.
            </p>
          </div>
          <div className="rounded-lg bg-accent p-5">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <Smartphone className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-medium">Works on Mobile</h3>
            <p className="leading-7 text-muted-foreground">
              Perfect mobile experience from day one. Your signers can sign documents on any device without downloading apps.
            </p>
          </div>
          <div className="rounded-lg bg-accent p-5">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <Users className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-medium">No Account Required</h3>
            <p className="leading-7 text-muted-foreground">
              Signers just click and sign—no registration, no passwords, no friction. Remove every barrier between you and signed documents.
            </p>
          </div>
          <div className="rounded-lg bg-accent p-5">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <Shield className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-medium">Secure & Legal</h3>
            <p className="leading-7 text-muted-foreground">
              Bank-level encryption and legally binding signatures. Your documents are protected and compliant with electronic signature laws.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
