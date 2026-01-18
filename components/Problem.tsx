
import { ArrowRight, CheckCircle2, DollarSign, Smartphone, Zap } from "lucide-react";

export function Problem() {
  const problems = [
    {
      title: "Zero Signer Friction",
      description: "Signers never create accounts or download apps. They just click and sign. 3x higher completion rate than DocuSign.",
      icon: <Zap className="size-6 text-amber-500" />,
      tag: "Conversion",
      color: "amber"
    },
    {
      title: "Mobile-First Design",
      description: "Optimized for the thumb. Your clients can sign while in line for coffee. No zooming, no pinching, no frustration.",
      icon: <Smartphone className="size-6 text-blue-500" />,
      tag: "Experience",
      color: "blue"
    },
    {
      title: "Fair Pricing, Period",
      description: "$20/month for unlimited documents. No hidden fees, no per-envelope charges, no enterprise pricing games.",
      icon: <DollarSign className="size-6 text-emerald-500" />,
      tag: "Value",
      color: "emerald"
    }
  ];

  return (
    <section className="relative w-full py-24 md:py-40 bg-white overflow-hidden" id="features">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

      {/* Decorative Blur Blobs - Static */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl z-0"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-50/50 rounded-full blur-3xl z-0"></div>

      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-6 text-center mb-20 md:mb-32">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100/50 text-blue-600 text-sm font-semibold mb-2">
            <CheckCircle2 className="size-4" />
            <span>Built for modern teams</span>
          </div>

          <div className="space-y-4 max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
              E-Signatures shouldn't be a <br className="hidden md:block" />
              <span className="relative inline-block mt-2">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">bottleneck.</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-blue-50 z-0 -rotate-1"></span>
              </span>
            </h2>
            <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed pt-2">
              Most tools are built for enterprises and compliance departments. Boopsign is built for speed, conversion, and your brand.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((p, i) => (
            <div
              key={i}
              className="group relative flex flex-col p-8 md:p-10 rounded-[2.5rem] bg-white border border-slate-100 ring-1 ring-slate-200/50"
            >
              <div className="mb-8 inline-flex self-start items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {p.tag}
              </div>

              <div className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white border border-slate-100 ring-4 ring-slate-50`}>
                {p.icon}
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                {p.title}
              </h3>

              <p className="text-slate-500 leading-relaxed text-base md:text-lg mb-8">
                {p.description}
              </p>

              <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-blue-600 cursor-pointer">
                <span>Learn more</span>
                <ArrowRight className="size-4" />
              </div>

              {/* Subtle background decoration */}
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
                <div className="scale-[4]">
                  {p.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
