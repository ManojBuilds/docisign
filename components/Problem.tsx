export function Problem() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Why Small Businesses Are Ditching DocuSign
            </h2>
          </div>
        </div>
        <div className="mx-auto grid max-w-xl items-start gap-8 sm:grid-cols-1 md:gap-12 pt-10">
          <ul className="grid gap-4 text-center">
            <li className="flex items-start gap-3">
              <span className="mt-1 h-5 w-5">❌</span>
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">
                  $25-65/month per user
                </span>{" "}
                (your team of 3 costs $200+/month)
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-5 w-5">❌</span>
              <p className="text-muted-foreground">
                Clients can&apos;t figure out{" "}
                <span className="font-semibold text-foreground">
                  mobile signing
                </span>
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-5 w-5">❌</span>
              <p className="text-muted-foreground">
                I never got the DocuSign email—
                <span className="font-semibold text-foreground">
                  you&apos;ve heard this 50 times
                </span>
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-5 w-5">❌</span>
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">
                  Spending 15 minutes setting up
                </span>{" "}
                what should take 2
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-5 w-5">❌</span>
              <p className="text-muted-foreground">
                Signers forced to{" "}
                <span className="font-semibold text-foreground">
                  create accounts
                </span>{" "}
                just to sign
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-5 w-5">❌</span>
              <p className="text-muted-foreground">
                &ldqou;I never got the DocuSign email&rdqou; -{" "}
                <span className="font-semibold text-foreground">
                  sound familiar?
                </span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
