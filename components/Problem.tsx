
import { DollarSign, Smartphone, Zap } from "lucide-react";

export function Problem() {
  const problems = [
    {
      title: "No Client Account Needed",
      description: "Signers never create accounts or download apps. They just click a secure link and sign. 3x higher completion rate than DocuSign.",
      icon: <Zap className="size-6 text-amber-500" />,
      tag: "Speed",
      color: "amber"
    },
    {
      title: "Sign on Any Device",
      description: "Optimized for mobile. Your clients can sign contracts while in line for coffee. No pinch-to-zoom frustration.",
      icon: <Smartphone className="size-6 text-blue-500" />,
      tag: "Mobile",
      color: "blue"
    },
    {
      title: "No Hidden Fees",
      description: "Simple $15/month flat rate for unlimited documents. No per-envelope charges or enterprise upsells.",
      icon: <DollarSign className="size-6 text-emerald-500" />,
      tag: "Pricing",
      color: "emerald"
    }
  ];

  return (
    <section className="relative w-full py-24 md:py-32 bg-slate-50 overflow-hidden" id="features">
      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-6 text-center mb-20 md:mb-32">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-medium uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            The Problem with DocuSign
          </div>

          <div className="space-y-4 max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-slate-900 leading-[1.1]">
              Stop losing clients to <br className="hidden md:block" />
              <span className="relative inline-block mt-2">
                <span className="relative z-10 text-blue-600">login screens.</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-blue-100/50 z-0 -rotate-1"></span>
              </span>
            </h2>
            <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed pt-2">
              Complex software creates friction. Friction kills deals. Boopsign removes the barriers so you can <strong>get signed and paid faster.</strong>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {problems.map((p, i) => (
            <div
              key={i}
              className="group relative flex flex-col p-8 md:p-10 rounded-[2rem] bg-white border border-transparent hover:border-slate-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-8 inline-flex self-start items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-100 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                {p.tag}
              </div>

              <div className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white border border-slate-100 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                {p.icon}
              </div>

              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                {p.title}
              </h3>

              <p className="text-slate-500 leading-relaxed text-base md:text-lg mb-8">
                {p.description}
              </p>

              {/* Subtle background decoration */}
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                <div className="scale-[4] grayscale">
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
