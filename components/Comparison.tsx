"use client";

import { X, Check } from "lucide-react";
import { FrameHighlight } from "./effects/frame-highlight";
import { Highlighter } from "./ui/highlighter";
import Logo from "./Logo";
import Image from "next/image";

const Comparison = () => {
    const others = [
        "Constant back-and-forth between complex enterprise tools",
        "Expensive annual subscriptions for features you never use",
        "Client friction with 'Create Account' walls",
        "Hidden fees for every extra user or document",
        "Complex workflows designed for legal departments",
        "Bloated interface that slows down your business",
        "No freelancer-centric support or features",
    ];

    const boopsign = [
        "One simple platform for all your signing needs",
        "Fair, transparent pricing for solo-preneurs",
        "No-account signing for frictionless client experience",
        "Generous signature request limits with no hidden surprises",
        "Lightning-fast editor that takes seconds, not hours",
        "Clean, professional UI that builds client trust",
        "Built specifically for the way solo-preneurs work",
    ];

    return (
        <section className="py-24 bg-white overflow-hidden" id="comparison">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16 md:mb-24">
                        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6 font-primary">
                            Compare <Highlighter action="crossed-off" color="#ef4444" animationDuration={0} strokeWidth={2}>Other Solutions</Highlighter> vs <FrameHighlight className="text-blue-600 font-bold">Boopsign</FrameHighlight>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 md:gap-0 relative">
                        {/* Vertical Divider (Desktop) */}
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-slate-100 -translate-x-1/2">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-slate-100 bg-white flex items-center justify-center text-[10px] text-slate-300 font-bold uppercase tracking-wider">
                                VS
                            </div>
                        </div>

                        {/* Left Column: Other Platforms */}
                        <div className="md:pr-16">
                            <div className="flex items-center gap-3 mb-10">
                                <div className="flex items-center -space-x-3">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden p-1 relative z-30">
                                        <Image src="/docusign-logo.png" alt="DocuSign Logo" width={32} height={32} className="object-contain" />
                                    </div>
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden p-1 relative z-20">
                                        <Image src="/pandadoc-logo.png" alt="PandaDoc Logo" width={32} height={32} className="object-contain" />
                                    </div>
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[10px] font-bold text-slate-400 relative z-10">
                                        +5
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold text-slate-900">Other Platforms</h3>
                            </div>

                            <ul className="space-y-6">
                                {others.map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                                            <X className="w-4 h-4 text-red-600" />
                                        </span>
                                        <p className="text-slate-500 font-medium leading-relaxed">{item}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right Column: Boopsign */}
                        <div className="md:pl-16 mt-12 md:mt-0">
                            <div className="flex items-center gap-3 mb-10">
                                <Logo />
                            </div>

                            <ul className="space-y-6">
                                {boopsign.map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5">
                                            <Check className="w-4 h-4 text-emerald-600" />
                                        </span>
                                        <p className="text-slate-900 font-semibold leading-relaxed">{item}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-20 p-8 rounded-3xl bg-slate-50 border border-slate-100 text-center">
                        <p className="text-slate-600 font-medium italic">
                            "I used DocuSign for 3 years before switching. I realized I was paying $10/month per feature I never touched. Boopsign is the breath of fresh air freelancers need."
                        </p>
                        <p className="mt-4 text-sm font-bold text-slate-900">— Alex R., Independent Designer</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Comparison;
