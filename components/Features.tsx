import { Zap, Smartphone, Shield, Users } from "lucide-react";

const Features = () => {
  return (
    <section className="py-32" id="features">
      <div className="container mx-auto">
        <p className="mb-4 text-sm text-muted-foreground lg:text-base">
          WHY BOOPSIGN
        </p>
        <h2 className="text-3xl font-semibold lg:text-4xl">
          Why Boopsign
        </h2>
        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-lg bg-accent p-5">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <Zap className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-semibold">
              No Login Signing
            </h3>
            <p className="leading-7 text-muted-foreground">
              Clients can sign directly from email—no registration required.
            </p>
          </div>
          <div className="rounded-lg bg-accent p-5">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <Smartphone className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-semibold">
              Email Verification
            </h3>
            <p className="leading-7 text-muted-foreground">
              Each signer's identity is verified via a unique one-time link.
            </p>
          </div>
          <div className="rounded-lg bg-accent p-5">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <Users className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-semibold">
              Audit Trail
            </h3>
            <p className="leading-7 text-muted-foreground">
              Every document includes a timestamped proof of signature.
            </p>
          </div>
          <div className="rounded-lg bg-accent p-5">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <Shield className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-semibold">
              Encrypted & Secure
            </h3>
            <p className="leading-7 text-muted-foreground">
              Built on Convex backend with Clerk authentication.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
