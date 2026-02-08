import { FileUp, MousePointer2, Send, PenTool, FileCheck, LucideIcon } from "lucide-react";
import React from "react";
import Image from "next/image";
import { Highlighter } from "./ui/highlighter";
import { FrameHighlight } from "./effects/frame-highlight";

interface Step {
    number: string;
    badge: string;
    icon: LucideIcon;
    title: string;
    description: string;
    image: string;
}

interface HowItWorksProps {
    steps?: Step[];
}

const HowItWorks = ({
    steps = [
        {
            number: "01",
            badge: "Preparation",
            icon: FileUp,
            title: "Upload Your Contract",
            description: "Simply drag and drop your PDF or Word document into Boopsign. We handle all the heavy lifting, formatting your file for instant editing without any conversion delays or quality loss.",
            image: "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9Pgub7zA67YpiuVWJNbYakZKvysf0TlQOLdtcSGF",
        },
        {
            number: "02",
            badge: "Editing",
            icon: MousePointer2,
            title: "Place Signature Fields",
            description: "Our lightning-fast editor lets you drop signature boxes, initials, and date fields exactly where you need them. It’s intuitive, precise, and takes less than 20 seconds to prep your entire document.",
            image: "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9PguJHSH5W6R2PM1quQzNcvtpXGB7hnmfHaWbsCS",
        },
        {
            number: "03",
            badge: "Sending",
            icon: Send,
            title: "Send Secure Link",
            description: "Your client receives a professional, branded link to sign. We’ve removed the 'Create Account' friction and password resets, so your signers can focus on what matters—closing the deal.",
            image: "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9PguWf5pD3NxHZs9OA4zmVEduhgJ1CitxwnUDkyQ",
        },
        {
            number: "04",
            badge: "Signing",
            icon: PenTool,
            title: "They Sign (Actually)",
            description: "A clean, modern signing interface that feels like magic on any device. Whether they're on a laptop or using their finger on a phone, the process is seamless and completes in seconds.",
            image: "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9PguatasNxMW5bk4q23iuyfFhwQdGBN7vjse1zp6",
        },
        {
            number: "05",
            badge: "Completion",
            icon: FileCheck,
            title: "You Both Get Copies",
            description: "The moment the last party signs, everyone automatically receives a legally binding PDF. Your documents are stored in a secure vault with a comprehensive audit trail for total peace of mind.",
            image: "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9Pgu4RfxWeDBPdmNkVMiHxrphJCgt7E2zascFjI1",
        }
    ]
}: HowItWorksProps) => {
    return (
        <section id="how-it-works" className="py-24 md:py-40 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <div className="mb-24 md:mb-32 max-w-3xl">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
                        From Upload to Signed in <Highlighter action="box" color="#3b82f6" animationDuration={0} strokeWidth={2} padding={8}>90 Seconds</Highlighter>.
                    </h2>
                    <p className="text-slate-500 text-lg md:text-xl leading-relaxed font-medium">
                        We’ve stripped away the complexity of traditional e-signatures to help you get your contracts signed faster than ever before.
                    </p>
                </div>

                {/* Steps Section */}
                <div className="space-y-32 md:space-y-56">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24`}
                        >
                            {/* Text Content */}
                            <div className="flex-1 w-full lg:max-w-md space-y-6">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2.5 text-slate-900 font-bold tracking-tight">
                                        {/* <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                            <step.icon className="w-4 h-4 text-blue-600" />
                                        </div> */}
                                        <FrameHighlight className="text-blue-600 text-sm font-semibold tracking-wide uppercase">{step.badge}</FrameHighlight>
                                    </div>

                                    <h3 className="text-4xl md:text-5xl font-bold text-slate-900 leading-[1.1] tracking-tight">
                                        {step.title}
                                    </h3>

                                    <p className="text-slate-500 text-lg md:text-xl leading-relaxed font-medium">
                                        {step.description}
                                    </p>
                                </div>
                            </div>

                            {/* Large Image Mockup */}
                            <div className="flex-[1.7] w-full">
                                <div className="relative aspect-[16/9] w-full overflow-hidden border-2 border-slate-100 bg-slate-50 rounded-2xl">
                                    <Image
                                        src={step.image}
                                        alt={step.title}
                                        fill
                                        priority
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 100vw, 80vw"
                                    />
                                    <div className="absolute inset-0 ring-1 ring-inset ring-slate-900/5 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;


