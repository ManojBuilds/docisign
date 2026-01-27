"use client";

import Link from "next/link";
import { Highlighter } from "./ui/highlighter";
import { Palette, Code, PenTool, Briefcase, ArrowRight } from "lucide-react";

const useCases = [
    {
        title: "Freelance Designers",
        description: "Send design contracts, NDAs, and project proposals. Get client approval on mockups with legally binding signatures.",
        icon: Palette,
        link: "/contracts/freelance/designer",
    },
    {
        title: "Freelance Developers",
        description: "Protect your code with clear IP agreements. Send SOWs, maintenance contracts, and project scopes that clients actually sign.",
        icon: Code,
        link: "/contracts/freelance/developer",
    },
    {
        title: "Freelance Writers",
        description: "Lock in rates with content agreements. Send contracts for blog posts, copywriting, and ghostwriting projects.",
        icon: PenTool,
        link: "/contracts/freelance/writer",
    },
    {
        title: "Freelance Consultants",
        description: "Professional retainer agreements and consulting contracts. Get paid faster with clear payment terms.",
        icon: Briefcase,
        link: "/esignature-for-freelancers",
    },
];

export default function FreelancerUseCases() {
    return (
        <section className="w-full py-24 bg-slate-50 border-t border-slate-100">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-semibold uppercase tracking-widest mb-4 border border-blue-200">
                        Built for Freelancers
                    </div>
                    <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6">
                        Perfect for{" "}
                        <Highlighter action="highlight" color="#dbeafe" iterations={1}>
                            Every Freelancer
                        </Highlighter>
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Whether you're a designer, developer, writer, or consultant—Boopsign makes getting contracts signed effortless.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
                    {useCases.map((useCase) => {
                        const IconComponent = useCase.icon;
                        return (
                            <Link
                                key={useCase.title}
                                href={useCase.link}
                                className="group p-8 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                                    <IconComponent className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                                    {useCase.title}
                                </h3>
                                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                    {useCase.description}
                                </p>
                                <div className="flex items-center gap-2 text-sm font-semibold text-blue-600">
                                    <span>Learn more</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="/esignature-for-freelancers"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                    >
                        See All Freelancer Features
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
