import { DragAndClickUpload } from "./DragAndClickUpload";
import Image from "next/image";

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


        {/* Headline - SEO: "E-Signatures" + "Freelancers" */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-8 max-w-5xl leading-tight">
          Super simple <span className="relative whitespace-nowrap">
            e-signatures
            <svg className="absolute -bottom-2 left-0 w-full h-3 text-blue-200 opacity-50 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
            </svg>
          </span>
          <br />
          <span className="text-slate-900">for </span>
          <span className="text-blue-600 relative inline-block">
            Freelancers
            {/* Subtle underline SVG */}
            <svg className="absolute w-[110%] h-3 -bottom-2 -left-[5%] text-blue-100 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
            </svg>
          </span>
        </h1>

        <p className="mt-2 text-xl sm:text-2xl text-slate-500 max-w-2xl leading-relaxed font-normal">
          Create, send, and track <strong>legally binding</strong> contracts in seconds. <span className="text-slate-900 font-medium">No account required for signers.</span>
        </p>

        {/* Primary Action Area - Functional yet Beautiful */}
        <div className="w-full max-w-3xl mt-12 relative z-10">
          {/* The Main Card */}
          <div className="relative bg-white rounded-3xl p-3 shadow-[0_30px_100px_-20px_rgba(59,130,246,0.15)] ring-1 ring-slate-200 transition-all duration-500 hover:shadow-[0_40px_120px_-20px_rgba(59,130,246,0.2)]">
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

        {/* Social Proof Strip - Clean */}
        <div className="mt-16 pt-10 border-t border-slate-100 w-full max-w-5xl flex flex-col items-center gap-8">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest text-center">Trusted by freelancers from</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <Image
              src="/logos/upwork.svg"
              alt="Upwork"
              width={100}
              height={30}
              className="h-8 w-auto object-contain"
            />
            <Image
              src="/logos/fiverr-2.svg"
              alt="Fiverr"
              width={100}
              height={30}
              className="h-8 w-auto object-contain"
            />
            <Image
              src="/logos/freelancer.svg"
              alt="Freelancer"
              width={120}
              height={30}
              className="h-8 w-auto object-contain"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
