import { DollarSign, Smartphone, Zap } from "lucide-react";

export function Problem() {
  const problems = [
    {
      title: "Zero Signer Friction",
      description: "Signers never create accounts or download apps. They just click and sign. 3x higher completion rate than DocuSign.",
      icon: <Zap className="size-6 text-orange-500" />,
      tag: "Conversion"
    },
    {
      title: "Mobile-First Design",
      description: "Optimized for the thumb. Your clients can sign while in line for coffee. No zooming, no pinching, no frustration.",
      icon: <Smartphone className="size-6 text-blue-500" />,
      tag: "Experience"
    },
    {
      title: "Fair Pricing, Period",
      description: "$15/month for unlimited documents. No hidden fees, no per-envelope charges, no enterprise pricing games.",
      icon: <DollarSign className="size-6 text-green-500" />,
      tag: "Value"
    }
  ];

  return (
    <section className="w-full py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

      <div className="container px-4 md:px-6 mx-auto relative">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16 md:mb-24">
          <div className="space-y-4 max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              E-Signatures shouldn't be a <span className="text-blue-600">bottleneck.</span>
            </h2>
            <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Most tools are built for enterprises. Boopsign is built for speed. Get fewer follow-ups and faster payments by removing the #1 reason clients delay signing: the forced account creation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {problems.map((p, i) => (
            <div key={i} className="group flex flex-col p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden relative">
              {/* Subtle background icon */}
              <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-110 transition-all duration-500 transform rotate-12">
                {p.icon}
              </div>

              <div className="mb-6 inline-flex px-3 py-1 rounded-full bg-white border border-slate-100 text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-blue-500 group-hover:border-blue-100 transition-colors">
                {p.tag}
              </div>

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                {p.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                {p.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
