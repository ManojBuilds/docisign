import StartTrialBtn from "./StartTrialBtn";
import { Highlighter } from "./ui/highlighter";


const Cta = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-white">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="relative bg-primary/5 border border-primary/10 rounded-3xl p-12 md:p-20 text-center overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -ml-32 -mb-32" />

          <div className="relative z-10 max-w-4xl mx-auto">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary/10 shadow-sm mb-10">
              <span className="text-slate-600 text-sm font-medium pl-2">
                Trusted by <span className="text-primary font-bold">20+ freelancers</span>
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Stop Chasing Signatures. <br className="hidden md:block" />
              <Highlighter action="underline" color="#3b82f6" strokeWidth={2} iterations={1} isView>
                <span className="text-primary">
                  Start Closing Deals.
                </span>
              </Highlighter>
            </h2>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join 20+ freelancers who switched to Boopsign to get contracts signed 3x faster. No credit card to start — cancel anytime.
            </p>

            {/* CTA Button Area */}
            <div className="flex flex-col items-center gap-6">
              <div className="scale-125 origin-center">
                <StartTrialBtn label="Start Free — No Credit Card" />
              </div>

              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-slate-600">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  7-day free trial
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  No credit card required
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Cancel anytime
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Legally binding e-signatures
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
