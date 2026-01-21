import { Shield, Smartphone, Users, Zap } from "lucide-react";

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
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6">
            Features that help you close the deal.
          </h2>
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed">
            Built specificially for freelancers and consultants. Unlike DocuSign or PandaDoc, we stripped away the enterprise bloat to focus on one thing: <strong className="text-slate-900 font-medium">speed to signature.</strong>
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              icon: <Zap className="size-6 text-amber-500" />,
              title: "No Account Required",
              desc: "Your clients sign directly from email—no login, no app download, no friction. Just click, sign, done."
            },
            {
              icon: <Smartphone className="size-6 text-blue-500" />,
              title: "Mobile-First Signing",
              desc: "Works perfectly on any device. Your clients can sign contracts on their phone in seconds."
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
            <div key={i} className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-blue-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <span className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-white border border-slate-200 shadow-sm group-hover:scale-110 transition-transform duration-300">
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
