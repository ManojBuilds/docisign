import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";

interface HowItWorksProps {
    heading?: string;
    description?: string;
    button?: {
        text: string;
        url: string;
    };
    steps?: {
        number: string;
        title: string;
        description: string;
        image: string;
        color: string;
    }[];
}

const HowItWorks = ({
    button = {
        text: "Try Boopsign Free",
        url: "/dashboard",
    },
    steps = [
        {
            number: "01",
            title: "Upload & Place Fields",
            description: "Drop your PDF and drag signature fields exactly where you need them. It's faster than printing and scanning.",
            image: "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9PguI17ocWek6Tt8dN4Y3JApShGWkZ0n9cfeF1v5",
            color: "bg-blue-700"
        },
        {
            number: "02",
            title: "Clients Sign Anywhere",
            description: "Your clients get a secure link and sign beautifully on any device. No app downloads or accounts needed.",
            image: "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9PgunDI62txqPKoD3HWzv2hlrfdwZFGRcps6UX9E",
            color: "bg-orange-700"
        },
        {
            number: "03",
            title: "Deal Closed Instantly",
            description: "Receive a notification the second it's signed. Everyone gets a legally binding copy automatically.",
            image: "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9Pgu0T2iQ51wEbNSXo7vmLOKdr3JFGs9VcQCxBMp",
            color: "bg-green-700"
        }
    ]
}: HowItWorksProps) => {
    return (
        <section id="how-it-works" className="py-24 md:py-32 bg-white">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16 md:mb-24">
                    <div className="mx-auto flex max-w-4xl flex-col gap-4">
                        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">
                            The Simplest Way to <span className="text-blue-600">Close Deals</span>
                        </h2>
                        <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            Stop chasing signatures. Boopsign handles the heavy lifting so you can focus on your work.
                        </p>
                    </div>
                </div>

                {/* Steps Grid */}
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-12 lg:grid-cols-3">
                        {steps.map((step, index) => (
                            <div key={index} className="flex flex-col group">
                                {/* Image Container with "Float" effect */}
                                <div className="mb-8 relative aspect-video rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] group-hover:-translate-y-2">
                                    <Image
                                        src={step.image}
                                        alt={`Boopsign Step ${step.number}: ${step.title}`}
                                        fill
                                        className={"object-cover"}
                                    />
                                    {/* Step Number Overlay */}
                                    <div className={`absolute top-4 left-4 ${step.color.replace('600', '700')} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
                                        STEP {step.number}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="px-2">
                                    <h3 className="mb-3 text-2xl font-bold text-slate-900">
                                        {step.title}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed text-base">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Secondary Bottom CTA */}
                <div className="text-center mt-20 md:mt-32">
                    <div className="inline-flex flex-col items-center p-10 bg-slate-50 rounded-[3rem] border border-slate-200 max-w-3xl mx-auto">
                        <h4 className="text-2xl font-bold text-slate-900 mb-4">Ready to save hours of paperwork?</h4>
                        <p className="text-lg text-slate-700 mb-8 max-w-lg">
                            Join thousands of freelancers who use Boopsign to get paid faster.
                        </p>
                        <Button asChild size="lg" className="h-14 px-10 text-lg rounded-full font-semibold px-8 bg-blue-600 hover:bg-blue-700">
                            <Link href={button.url}>{button.text}</Link>
                        </Button>
                        <div className="mt-6 flex items-center gap-6 text-xs flex-wrap md:text-sm text-slate-600 font-medium">
                            <span className="flex items-center gap-1.5"><Check className="size-4 text-green-500" /> Free Trial</span>
                            <span className="flex items-center gap-1.5"><Check className="size-4 text-green-500" /> No CC Needed</span>
                            <span className="flex items-center gap-1.5"><Check className="size-4 text-green-500" /> Legal Compliance</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;

