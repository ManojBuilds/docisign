import { NoiseEffect } from "@/components/effects/noise-effect";
import StartTrialBtn from "./StartTrialBtn";


const Cta = () => {
  return (
    <section
      className="py-24 md:py-32 relative overflow-hidden bg-slate-900"
      style={{
        backgroundImage: 'url("/bg.webp")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <NoiseEffect />

      <div className="container max-w-4xl mx-auto px-4 text-center relative z-10">

        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-sm mb-10">
          <span className="text-slate-200 text-sm font-medium pl-2">
            Join <span className="text-white font-bold">1,000+ freelancers</span>
          </span>
        </div>

        {/* Main Heading */}
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1] drop-shadow-lg">
          Stop Chasing Signatures. <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
            Start Closing Deals.
          </span>
        </h2>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-slate-200 mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          Join 1,000+ freelancers who switched to Boopsign to get contracts signed 3x faster than DocuSign.
        </p>

        {/* CTA Button Area */}
        <div className="flex flex-col items-center gap-6">
          <div className="scale-125 origin-center">
            <StartTrialBtn label="Sign Your First Document Free" />
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-slate-300">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              7-day free trial
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              No credit card required
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Cancel anytime
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Cta;
