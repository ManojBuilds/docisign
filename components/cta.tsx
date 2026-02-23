import StartTrialBtn from "./StartTrialBtn";

interface CtaProps {
  className?: string;
}

const Cta: React.FC<CtaProps> = ({ className = "py-24 md:py-32" }) => {
  return (
    <section className={`relative overflow-hidden bg-white ${className}`}>
      <div className="container max-w-6xl mx-auto px-4">
        <div className="relative bg-primary/5 border border-primary/10 rounded-3xl p-8 sm:p-12 md:p-20 text-center overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -ml-32 -mb-32" />

          <div className="relative z-10 max-w-4xl mx-auto">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary/10 shadow-sm mb-8 sm:mb-10">
              <span className="text-slate-600 text-sm font-medium pl-2">
                Used by <span className="text-primary font-bold">20 solo businesses</span> (and growing).
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-4 sm:mb-6 leading-[1.1]">
              Stop Overpaying for Features You'll Never Use
            </h2>

            {/* Subheading */}
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-8 sm:mb-12 max-w-xs sm:max-w-md md:max-w-2xl mx-auto leading-relaxed">
              Try Boopsign free for 7 days. No credit card. No pressure.
              <br />Just simple, fast e-signatures built for solo entrepreneurs.
            </p>

            {/* CTA Button Area */}
            <div className="flex flex-col items-center gap-4 sm:gap-6">
              <div className="scale-100 sm:scale-125 origin-center">
                <StartTrialBtn label="Start Free — No Credit Card" variant="premium" />
              </div>

              <p className="text-xs sm:text-sm text-slate-500 mt-2 sm:mt-4">
                Cancel anytime. No hard feelings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
