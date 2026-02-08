"use client";

import { CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Confetti, type ConfettiRef } from "@/components/ui/confetti";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface SuccessDialogContentProps {
    templateName: string;
}

export default function SuccessDialogContent({ templateName }: SuccessDialogContentProps) {
    const confettiRef = useRef<ConfettiRef>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            confettiRef.current?.fire({});
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none shadow-2xl">
            <Confetti
                ref={confettiRef}
                className="absolute inset-0 z-0 pointer-events-none"
                manualstart
            />

            <div className="relative z-10">
                <div className="bg-slate-900 p-10 text-white text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10">
                        <div className="mx-auto w-16 aspect-square bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/20 shadow-xl">
                            <CheckCircle2 className="w-8 h-8 text-blue-400" />
                        </div>
                        <DialogTitle className="text-3xl font-black mb-2 text-white tracking-tight">Check Your Inbox! </DialogTitle>
                        <DialogDescription className="text-white/70 text-[15px] font-medium max-w-[340px] mx-auto leading-relaxed">
                            We've just sent your <strong>{templateName || "document"}</strong> and a <span className="text-blue-400 font-bold">special surprise gift</span> to your email address.
                        </DialogDescription>
                    </div>
                </div>

                <div className="p-8 bg-white">
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                                <div className="h-px bg-slate-100 flex-1" />
                                Next Steps with Boopsign
                                <div className="h-px bg-slate-100 flex-1" />
                            </h4>
                            <div className="space-y-8">
                                <div className="flex gap-5 items-start">
                                    <div className="w-10 aspect-square bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 border border-blue-100/50">
                                        <Sparkles className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div className="pt-1">
                                        <p className="font-black text-slate-900 text-[15px] mb-1 leading-none tracking-tight">Stop sending static files</p>
                                        <p className="text-[13px] text-slate-500 leading-relaxed font-medium">Instead of a Word doc, send a professional signing link directly to your client's phone.</p>
                                    </div>
                                </div>

                                <div className="flex gap-5 items-start">
                                    <div className="w-10 aspect-square bg-green-50 rounded-full flex items-center justify-center flex-shrink-0 border border-green-100/50">
                                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div className="pt-1">
                                        <p className="font-black text-slate-900 text-[15px] mb-1 leading-none tracking-tight">Sign in 60 seconds</p>
                                        <p className="text-[13px] text-slate-500 leading-relaxed font-medium">No account required for signers. They just click, sign, and finish in seconds.</p>
                                    </div>
                                </div>

                                <div className="flex gap-5 items-start">
                                    <div className="w-10 aspect-square bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0 border border-purple-100/50">
                                        <ArrowRight className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div className="pt-1">
                                        <p className="font-black text-slate-900 text-[15px] mb-1 leading-none tracking-tight">Legally Binding</p>
                                        <p className="text-[13px] text-slate-500 leading-relaxed font-medium">Get a tamper-proof audit trail and legal certificate for every document signed.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-2">
                            <Link href="/dashboard" className="block w-full">
                                <Button size={'lg'} className="w-full h-12 text-[15px] font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-200">
                                    Start Sending Documents Free
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                            <p className="text-center text-[10px] text-slate-400 mt-4">
                                P.S. Check your email for an <strong>exclusive 20% discount</strong> on Boopsign Pro.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </DialogContent>
    );
}
