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
        text: "Try It Now →",
        url: "/dashboard",
    },
    steps = [
        {
            number: "01",
            icon: <Upload className="size-6" />,
            title: "Upload",
            description: "Upload any document (PDF, Docx, or image)."
        },
        {
            number: "02",
            icon: <MousePointer className="size-6" />,
            title: "Add Signer",
            description: "Enter your client's email — we'll verify their identity before signing."
        },
        {
            number: "03",
            icon: <Send className="size-6" />,
            title: "Get It Signed",
            description: "They sign with a secure link. You get a signed PDF + digital audit trail instantly."
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
                            How It Works
                        </h2>
                        <p className="text-muted-foreground text-balance lg:text-lg max-w-3xl mx-auto">
                            Get your documents signed in three simple steps. No complexity—just results.

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
                        That&apos;s it. Really. No training, no complexity.
                    </p>
                    <Button asChild size="lg">
                        <Link href={button.url}>{button.text}</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
