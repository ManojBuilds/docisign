import { Headphones, Clock, ShieldCheck } from "lucide-react";

const SupportSection = () => {
    return (
        <section className="py-24 bg-white overflow-hidden relative" id="support">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/30 -skew-x-12 translate-x-1/2 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                        Built for Freelancers by Freelancers
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-6">
                        Real Humans. <span className="text-blue-600">Real Fast.</span>
                    </h2>
                    <p className="text-xl text-slate-500 leading-relaxed">
                        Exasperated by chatbots and ghosting support? At Boopsign, your business is our priority. We offer personal technical support to ensure your deals never stall.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {[
                        {
                            icon: <Clock className="size-8 text-blue-600" />,
                            title: "Under-1h Response",
                            desc: "Pro users get guaranteed priority support. We typically respond to all critical issues in under 60 minutes."
                        },
                        {
                            icon: <Headphones className="size-8 text-emerald-600" />,
                            title: "Human Expertise",
                            desc: "Talk to real developers who understand contract laws and e-signature technology, not a level-1 outsourced agent."
                        },
                        {
                            icon: <ShieldCheck className="size-8 text-purple-600" />,
                            title: "Onboarding Help",
                            desc: "Need help migrating your templates from DocuSign? Our team will help you set up everything for free."
                        }
                    ].map((item, i) => (
                        <div key={i} className="group p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:border-blue-200 hover:shadow-2xl transition-all duration-300">
                            <div className="size-16 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* <div className="mt-20 p-10 bg-slate-900 rounded-[3rem] text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent)] pointer-events-none" />
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-3">
                            <MessageSquare className="size-6 text-blue-400" />
                            Need custom help right now?
                        </h3>
                        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                            Our support team is available Monday-Friday. Even on the Free plan, we aim to help every single user get their deals signed.
                        </p>
                        <a href="mailto:mkumar.react@gmail.com" className="inline-flex h-14 items-center justify-center px-10 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all hover:scale-105">
                            Contact Support Team
                        </a>
                    </div>
                </div> */}
            </div>
        </section>
    );
};

export default SupportSection;
