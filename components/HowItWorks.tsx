import { Upload, MousePointer, Send, ArrowRight } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
        text: "Start Free Trial — No Credit Card →",
        url: "/dashboard",
    },
    steps = [
        {
            number: "01",
            icon: <Upload className="size-6" />,
            title: "Upload Your Document",
            description: "Upload any PDF, DOCX, or image. Drag and drop signature fields where you need them. Takes 30 seconds."
        },
        {
            number: "02",
            icon: <MousePointer className="size-6" />,
            title: "Add Signer Email",
            description: "Enter your client's email. No account creation needed—they'll get a secure, one-time signing link instantly."
        },
        {
            number: "03",
            icon: <Send className="size-6" />,
            title: "Get It Signed in Minutes",
            description: "They click, sign, and you're done. Signed PDF + legally binding audit trail delivered to your inbox immediately."
        }
    ]
}: HowItWorksProps) => {
    return (
        <section className="py-32">
            <div className="container mx-auto">
                {/* Header */}
                <div className="text-center mb-20">
                    <div className="mx-auto flex max-w-4xl flex-col gap-6">
                        <h2 className="text-3xl font-extrabold lg:text-5xl text-gray-900">
                            Sign Documents in Under 3 Minutes
                        </h2>
                        <p className="text-muted-foreground text-balance lg:text-lg max-w-3xl mx-auto">
                            No training required. No complex workflows. Just upload, send, and get signatures—faster than any DocuSign alternative.
                        </p>
                    </div>
                </div>

                {/* Steps */}
                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-12 md:grid-cols-3">
                        {steps.map((step, index) => (
                            <div key={index} className="relative flex flex-col items-center text-center">
                                {/* Step Number */}
                                {/* <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary font-bold text-lg">
                  {step.number}
                </div> */}

                                {/* Icon */}
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-primary">
                                    {step.icon}
                                </div>

                                {/* Content */}
                                <h3 className="mb-3 text-xl font-bold text-gray-900">
                                    {step.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {step.description}
                                </p>

                                {/* Arrow (desktop only, not on last item) */}
                                {index < steps.length - 1 && (
                                    <div className="absolute top-8 left-full hidden md:flex w-12 items-center justify-center">
                                        <ArrowRight className="h-6 w-6 opacity-50" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Text & CTA */}
                <div className="text-center mt-16">
                    <p className="text-lg text-muted-foreground mb-8 font-medium">
                        That&apos;s it. No training, no complexity, no wasted time. Just simple e-signatures that work.
                    </p>
                    <Button asChild size="lg">
                        <Link href={button.url}>{button.text}</Link>
                    </Button>
                    <p className="text-sm text-muted-foreground mt-4">
                        7-day free trial • No credit card required • Cancel anytime
                    </p>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
