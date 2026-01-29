import { Shield, Smartphone, Users, Zap } from "lucide-react";
import Image from "next/image";

const Features = () => {
  return (
    <section className="py-24 lg:py-32 bg-slate-50" id="features">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-medium uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            Why freelancers choose Boopsign
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6 font-primary">
            Features that help you close the deal.
          </h2>
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed">
            Built specificially for freelancers and consultants. Unlike DocuSign or PandaDoc, we stripped away the enterprise bloat to focus on one thing: <strong className="text-slate-900 font-medium">speed to signature.</strong>
          </p>
        </div>

        {/* Main Featured Section: Mobile First */}
        <div className="mb-20 grid lg:grid-cols-2 gap-12 items-center bg-white rounded-[3rem] p-8 md:p-12 lg:p-16 border border-slate-200 shadow-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/30 -skew-x-12 translate-x-1/2 pointer-events-none" />

          <div className="relative z-10">
            <div className="size-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-blue-200">
              <Smartphone className="size-8" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Mobile-First Signing for <br />
              <span className="text-blue-600">Frictionless Deals</span>
            </h3>
            <p className="text-lg text-slate-500 mb-8 leading-relaxed max-w-lg">
              Your clients don't want to download apps or create accounts. Boopsign gives them a premium signing experience directly in their mobile browser. Just tap, sign, and you're done.
            </p>
            <ul className="space-y-4">
              {[
                "No app download required",
                "Responsive design for all devices",
                "Email delivery",
                "Instant PDF download after signing"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="size-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px]">✓</div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-[340px] md:w-[400px] aspect-[9/16] rounded-[3rem] overflow-hidden shadow-2xl border border-slate-200 group transition-all duration-500 hover:shadow-blue-200/50 hover:-translate-y-2 group-hover:rotate-2">
              <Image
                src="https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9PgunDI62txqPKoD3HWzv2hlrfdwZFGRcps6UX9E"
                alt="Mobile Signing UI"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Subtle glass overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>

        {/* Feature Grid: Secondary Features */}
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: <Zap className="size-6 text-amber-500" />,
              title: "No Account Required",
              desc: "Your clients sign directly from email—no login, no app download. Just click, sign, done."
            },
            {
              icon: <Users className="size-6 text-emerald-500" />,
              title: "Legally Binding",
              desc: "Every signature includes timestamped proof, IP address, and email verification for complete compliance."
            },
            {
              icon: <Shield className="size-6 text-purple-500" />,
              title: "Bank-Level Security",
              desc: "Enterprise-grade encryption and secure authentication. Your documents are protected at every step."
            }
          ].map((feature, i) => (
            <div key={i} className="group p-8 rounded-3xl bg-white border border-slate-200 hover:border-blue-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <span className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </span>
              <h3 className="mb-3 text-xl font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-slate-500">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

