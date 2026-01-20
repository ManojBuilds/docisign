import { Button } from "@/components/ui/button";
import { Check, Send, Upload } from "lucide-react";
import Link from "next/link";
import React from "react";

interface HowItWorksProps {
    heading?: string;
    description?: string;
    button?: {
        text: string;
        url: string;
    };
    steps?: {
        number: string;
        icon: React.ReactNode;
        title: string;
        description: string;
    }[];
}

const HowItWorks = ({
    button = {
        text: "Try Boopsign Free for 7 Days",
        url: "/dashboard",
    },
    steps = [
        {
            number: "01",
            icon: <Upload className="size-6 text-blue-600" />,
            title: "Upload document",
            description: "Drop your PDF or Word file manually. We handle the formatting and conversion automatically."
        },
        {
            number: "02",
            icon: <Send className="size-6 text-orange-600" />,
            title: "Add signature fields",
            description: "Click anywhere to place signature, initials, or date fields. Assigned to your signers with one click."
        },
        {
            number: "03",
            icon: <Check className="size-6 text-green-600" />,
            title: "Send & get signed",
            description: "Clients sign instantly from their inbox. You get notified the second the deal is closed. Zero friction."
        }
    ]
}: HowItWorksProps) => {
    return (
        <section id="how-it-works" className="py-24 md:py-32 bg-slate-50/50">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16 md:mb-24">
                    <div className="mx-auto flex max-w-4xl flex-col gap-4">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
                            Send Contracts in <span className="text-blue-600 underline decoration-blue-500/20">Seconds</span>, Not Minutes
                        </h2>
                        <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            Stop wasting hours on paperwork. Boopsign is designed for speed, so you can spend more time on billable work.
                        </p>
                    </div>
                </div>

                {/* Steps with Glassmorphism */}
                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-8 md:grid-cols-3">
                        {steps.map((step, index) => (
                            <div key={index} className="group relative flex flex-col p-8 bg-white border border-slate-200 rounded-3xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                {/* Step Number Badge */}
                                <div className="absolute top-4 right-4 text-xs font-bold text-slate-300 group-hover:text-blue-200 transition-colors">
                                    STEP {step.number}
                                </div>

                                {/* Icon Bagde */}
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                                    {step.icon}
                                </div>

                                {/* Content */}
                                <h3 className="mb-3 text-xl font-bold text-slate-900">
                                    {step.title}
                                </h3>
                                <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Secondary Bottom CTA */}
                <div className="text-center mt-16 md:mt-24">
                    <div className="inline-flex flex-col items-center p-8 bg-white rounded-3xl border border-blue-100 max-w-2xl mx-auto">
                        <p className="text-lg text-slate-700 mb-6 font-medium">
                            The fastest workflow for freelance contracts. Period.
                        </p>
                        <Button asChild size="lg" className="h-12 px-8 text-base">
                            <Link href={button.url}>{button.text}</Link>
                        </Button>
                        <p className="text-xs text-slate-400 mt-4 font-medium flex items-center gap-2">
                            <Check className="size-3 text-green-500" /> No credit card required • <Check className="size-3 text-green-500" /> Cancel anytime
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
