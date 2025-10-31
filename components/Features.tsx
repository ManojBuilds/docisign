import { Zap, Smartphone, Shield, Users } from "lucide-react";

const Features = () => {
  return (
    <section className="py-32" id="features">
      <div className="container mx-auto">
        <p className="mb-4 text-sm text-muted-foreground lg:text-base">
          THE SIMPLE DOCUSIGN ALTERNATIVE
        </p>
        <h2 className="text-3xl font-semibold lg:text-4xl">
          Everything You Need. Nothing You Don&apos;t.
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          Unlike DocuSign, PandaDoc, or HelloSign, we focus on what actually matters: getting documents signed fast.
        </p>
        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-lg bg-accent p-5">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <Zap className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-semibold">
              No Account Required for Signers
            </h3>
            <p className="leading-7 text-muted-foreground">
              Your clients sign directly from email—no login, no app download, no friction. Just click, sign, done.
            </p>
          </div>
          <div className="rounded-lg bg-accent p-5">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <Smartphone className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-semibold">
              Mobile-Optimized Signing
            </h3>
            <p className="leading-7 text-muted-foreground">
              Works perfectly on any device. Your clients can sign contracts on their phone in seconds—no desktop required.
            </p>
          </div>
          <div className="rounded-lg bg-accent p-5">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <Users className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-semibold">
              Legally Binding Audit Trail
            </h3>
            <p className="leading-7 text-muted-foreground">
              Every signature includes timestamped proof, IP address, and email verification for complete legal compliance.
            </p>
          </div>
          <div className="rounded-lg bg-accent p-5">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <Shield className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-semibold">
              Bank-Level Security
            </h3>
            <p className="leading-7 text-muted-foreground">
              Enterprise-grade encryption and secure authentication. Your documents are protected at every step.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
