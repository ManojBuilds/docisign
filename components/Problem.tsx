export function Problem() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Perfect For
            </h2>
          </div>
        </div>
        <div className="mx-auto grid max-w-4xl items-start gap-8 sm:grid-cols-1 md:gap-12 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 text-green-500">✅</div>
              <div>
                <h3 className="font-semibold">Freelancers sending client contracts</h3>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 text-green-500">✅</div>
              <div>
                <h3 className="font-semibold">Agencies signing NDAs and SOWs</h3>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 text-green-500">✅</div>
              <div>
                <h3 className="font-semibold">HR teams collecting offer letters</h3>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 text-green-500">✅</div>
              <div>
                <h3 className="font-semibold">Small businesses needing legal approvals</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
