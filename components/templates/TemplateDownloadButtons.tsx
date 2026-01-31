"use client";

import { Button } from "@/components/ui/button";
import { FileText, FileCode, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import posthog from "posthog-js";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle
} from "@/components/ui/dialog";
import { Confetti, type ConfettiRef } from "@/components/ui/confetti";
import { ALL_TEMPLATES } from "@/lib/seo/all-templates";
import Link from "next/link";
import { TemplateDownloadDialog } from "./TemplateDownloadDialog";

interface TemplateDownloadButtonsProps {
    templateId: string;
    docUrl?: string;
    pdfUrl?: string;
    className?: string;
    buttonClassName?: string;
    stack?: boolean;
}

export function TemplateDownloadButtons({
    templateId,
    docUrl,
    pdfUrl,
    className,
    buttonClassName,
    stack = false,
}: TemplateDownloadButtonsProps) {
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const confettiRef = useRef<ConfettiRef>(null);

    const template = ALL_TEMPLATES.find(t => t.slug === templateId);

    const triggerSuccess = () => {
        posthog.capture("template_download_success", {
            template_id: templateId,
        });

        setTimeout(() => {
            setShowSuccessDialog(true);
            confettiRef.current?.fire({});
        }, 500);
    };

    const handleDownloadDoc = async () => {
        posthog.capture("requested_template_docx", {
            contract: templateId,
        });
        triggerSuccess();
    };

    const handleDownloadPdf = async () => {
        posthog.capture("requested_template_pdf", {
            contract: templateId,
        });
        triggerSuccess();
    };

    return (
        <>
            <div className={cn("flex flex-col gap-5 p-2", className)}>
                <div className={cn("flex items-center flex-col gap-3", stack ? "flex-col w-full" : "md:flex-row justify-center")}>
                    {docUrl && (
                        <TemplateDownloadDialog
                            templateName={template?.name || "Contract Template"}
                            templateSlug={templateId}
                            onSuccess={handleDownloadDoc}
                        >
                            <Button
                                variant="outline"
                                size="lg"
                                className={cn(
                                    stack && "w-full h-14",
                                    "border border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/30",
                                    "text-slate-900 font-black text-[14px] shadow-sm transition-all duration-200 active:scale-[0.98]",
                                    buttonClassName
                                )}
                            >
                                <div className="flex items-center gap-2 justify-center w-full">
                                    <FileText className="mr-2.5 w-4 h-4 text-blue-500" />
                                    <span>Get Word Template</span>
                                    <ArrowRight className="ml-auto w-3.5 h-3.5 text-slate-400" />
                                </div>

                            </Button>
                        </TemplateDownloadDialog>
                    )}

                    {pdfUrl && (
                        <TemplateDownloadDialog
                            templateName={template?.name || "Contract Template"}
                            templateSlug={templateId}
                            onSuccess={handleDownloadPdf}
                        >
                            <Button
                                variant="outline"
                                size="lg"
                                className={cn(
                                    stack && "w-full h-14",
                                    "border border-slate-200 bg-white hover:border-red-300 hover:bg-red-50/30",
                                    "text-slate-900 font-black text-[14px] shadow-sm transition-all duration-200 active:scale-[0.98]",
                                    buttonClassName
                                )}
                            >
                                <div className="flex items-center gap-2 justify-center w-full">
                                    <FileCode className="mr-2.5 w-4 h-4 text-red-500" />
                                    <span>Get PDF Template</span>
                                    <ArrowRight className="ml-auto w-3.5 h-3.5 text-slate-400" />
                                </div>

                            </Button>
                        </TemplateDownloadDialog>
                    )}
                </div>

                <div className="rounded-2xl p-5">
                    <p className="text-[13px] text-center text-slate-600 font-bold mb-4 tracking-tight">
                        Want to sign this document legally?
                    </p>
                    <div className="flex items-center justify-center gap-3">
                        <div className="h-[1px] bg-slate-100 flex-1" />
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] whitespace-nowrap bg-blue-50 px-2 py-0.5 rounded">Recommended</span>
                        <div className="h-[1px] bg-slate-100 flex-1" />
                    </div>
                    <p className="text-[12px] text-center mt-4">
                        <span className="text-blue-700 font-black bg-blue-100/30 px-3 py-1.5 rounded-lg border border-blue-100/50 inline-block shadow-sm">
                            Use Boopsign to customize & send
                        </span>
                    </p>
                </div>
            </div>

            <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
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
                                    We've just sent your <strong>{template?.name || "document"}</strong> and a <span className="text-blue-400 font-bold">special surprise gift</span> to your email address.
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
            </Dialog>
        </>
    );
}
