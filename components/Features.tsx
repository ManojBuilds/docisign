import { Zap, Smartphone, Shield, Users } from "lucide-react";

const Features = () => {
  return (
    <section className="py-32" id="#features">
      <div className="container mx-auto">
        <p className="mb-4 text-sm text-muted-foreground lg:text-base">
          EVERYTHING YOU NEED
        </p>
        <h2 className="text-3xl font-semibold lg:text-4xl">
          Why Choose Our DocuSign Alternative??
        </h2>
        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-lg bg-accent p-5">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <Zap className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-semibold">
              Setup Documents 5x Faster Than DocuSign
            </h3>
            <p className="leading-7 text-muted-foreground">
              Complete{" "}
              <span className="font-semibold">document signing setup</span> in
              under 3 minutes. No training required like DocuSign—just results
              that get you back to business.
            </p>
          </div>
          <div className="rounded-lg bg-accent p-5">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <Smartphone className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-semibold">
              Your Clients Will Actually Enjoy Mobile Signing
            </h3>
            <p className="leading-7 text-muted-foreground">
              Unlike DocuSign&apos;s complex mobile interface, our{" "}
              <span className="font-semibold">
                mobile-first e-signature platform
              </span>{" "}
              works flawlessly on any device from day one.
            </p>
          </div>
          <div className="rounded-lg bg-accent p-5">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <Users className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-semibold">
              Zero Barriers = Faster Signatures
            </h3>
            <p className="leading-7 text-muted-foreground">
              Signers just click and sign—no registration, no passwords, no app
              downloads. Remove every barrier that DocuSign creates between you
              and signed documents.
            </p>
          </div>
          <div className="rounded-lg bg-accent p-5">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <Shield className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-semibold">
              Enterprise Security at Small Business Prices
            </h3>
            <p className="leading-7 text-muted-foreground">
              <span className="font-semibold">
                Legally binding electronic signatures
              </span>{" "}
              with bank-level encryption. Fully compliant with e-signature
              laws—as secure as DocuSign but simpler to use.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
