import { DragAndClickUpload } from "./DragAndClickUpload";
import { Highlighter } from "./ui/highlighter";
import StartTrialBtn from "./StartTrialBtn";

const Hero = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-16 lg:py-24 overflow-hidden bg-white">
      {/* Background - Clean & Subtle inspired by the image */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-50/60 rounded-full blur-[100px] opacity-40 mix-blend-multiply" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-50/60 rounded-full blur-[100px] opacity-40 mix-blend-multiply" />
      </div>

      <div className="container relative mx-auto flex flex-col items-center text-center max-w-[1200px]">


        {/* Headline - Anti-Bloat Positioning */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-slate-900 mb-6 max-w-3xl md:max-w-5xl leading-tight text-center">
          DocuSign Has 847 Features.
          <br />
          <span className="text-slate-900">You'll Use </span>
          <Highlighter action="circle" color="#3b82f6" iterations={1} animationDuration={0} strokeWidth={2}>
            6 of Them.
          </Highlighter>
        </h1>

        <p className="mt-2 text-lg sm:text-xl md:text-2xl text-slate-500 max-w-xs sm:max-w-md md:max-w-2xl leading-relaxed font-normal">
          Boopsign gives you exactly those 6—lightning fast, beautifully simple,
          <span className="text-slate-900 font-medium"> without the $180/year bloat tax.</span>
        </p>

        {/* Primary CTA */}
        <div className="mt-6 sm:mt-8 flex justify-center">
          <StartTrialBtn
            label="Start 14-Day Free Trial →"
            variant="premium"
            className="h-12 sm:h-14 px-10 sm:px-12 text-base sm:text-xl font-bold rounded-lg"
          />
        </div>
        <div className="mt-3 sm:mt-4 flex flex-col items-center space-y-1">
          <p className="text-xs sm:text-sm font-semibold text-slate-500">
            No credit card • Cancel anytime
          </p>
          <p className="text-xs sm:text-sm font-semibold text-slate-500">
            Used by 20 solo entrepreneurs who refuse to pay
            for features they'll never touch.
          </p>
        </div>

        {/* Primary Action Area - Functional yet Beautiful */}
        <div className="w-full max-w-2xl mt-10 relative z-10">
          <p className="text-center text-sm font-medium text-slate-500 mb-4">Drop a PDF below to try signing now — no signup required</p>
          {/* The Main Card */}
          <div className="relative bg-white rounded-3xl p-3 shadow-[0_30px_100px_-20px_rgba(59,130,246,0.15)] ring-1 ring-slate-200 z-20">
            <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 hover:bg-blue-50/30 hover:border-blue-300 transition-all duration-300">
              <DragAndClickUpload />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-sm font-medium text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px]">✓</div>
              <span>Free to try (no credit card)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px]">✓</div>
              <span>Works on mobile</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px]">✓</div>
              <span>Legally binding</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
