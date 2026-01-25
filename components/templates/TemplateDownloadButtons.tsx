"use client";

import { Button } from "@/components/ui/button";
import { Download, Loader2, FileText, FileCode, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import posthog from "posthog-js";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogTitle
} from "@/components/ui/dialog";
import { Confetti, type ConfettiRef } from "@/components/ui/confetti";
import { ALL_TEMPLATES } from "@/lib/seo/all-templates";
import { TemplateActionButton } from "./TemplateActionButton";

interface TemplateDownloadButtonsProps {
    templateId: string;
    docUrl?: string;
    pdfUrl?: string; // Kept for backward compatibility but docUrl is preferred
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
    const [isDownloadingDoc, setIsDownloadingDoc] = useState(false);
    const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
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
        if (!docUrl) {
            toast.error("Word document link is missing");
            return;
        }
        setIsDownloadingDoc(true);

        try {
            const response = await fetch(
                `/api/download?url=${encodeURIComponent(docUrl)}&filename=${templateId}.docx`
            );

            if (!response.ok) throw new Error("Download failed");

            const blob = await response.blob();
            const downloadLink = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = downloadLink;
            a.download = `${templateId}.docx`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(downloadLink);
            document.body.removeChild(a);

            posthog.capture("download_contract_as_docx", {
                contract: templateId,
            });

            toast.success("Word document download started");
            triggerSuccess();
        } catch (error) {
            console.error("Download error:", error);
            toast.error("Failed to download Word document");
        } finally {
            setIsDownloadingDoc(false);
        }
    };

    const handleDownloadPdf = async () => {
        if (!pdfUrl) {
            toast.error("PDF download link is missing");
            return;
        }

        setIsDownloadingPdf(true);

        try {
            // Direct PDF download
            const response = await fetch(pdfUrl);
            if (!response.ok) throw new Error("Failed to fetch PDF");
            const blob = await response.blob();
            const downloadLink = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = downloadLink;
            a.download = `${templateId}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(downloadLink);
            document.body.removeChild(a);

            posthog.capture("download_contract_as_pdf", {
                contract: templateId,
            });

            toast.success("PDF download started");
            triggerSuccess();
        } catch (error) {
            console.error("PDF download error:", error);
            toast.error("Failed to download PDF");
        } finally {
            setIsDownloadingPdf(false);
        }
    };

    return (
        <>
            <div className={cn("flex flex-col gap-5", className)}>
                <div className={cn("flex items-center gap-3", stack ? "flex-col w-full" : "flex-row justify-center")}>
                    {docUrl && (
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={handleDownloadDoc}
                            disabled={isDownloadingDoc}
                            className={cn(
                                stack && "w-full h-14",
                                "border border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/30",
                                "text-slate-900 font-black text-[14px] shadow-sm transition-all duration-200 active:scale-[0.98]",
                                buttonClassName
                            )}
                        >
                            {isDownloadingDoc ? (
                                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                            ) : (
                                <div className="flex items-center gap-2 justify-center w-full">
                                    <FileText className="mr-2.5 w-4 h-4 text-blue-500" />
                                    <span>Download Word</span>
                                    <Download className="ml-auto w-3.5 h-3.5 text-slate-400" />
                                </div>
                            )}
                        </Button>
                    )}

                    {(pdfUrl) && (
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={handleDownloadPdf}
                            disabled={isDownloadingPdf}
                            className={cn(
                                stack && "w-full h-14",
                                "border border-slate-200 bg-white hover:border-red-300 hover:bg-red-50/30",
                                "text-slate-900 font-black text-[14px] shadow-sm transition-all duration-200 active:scale-[0.98]",
                                buttonClassName
                            )}
                        >
                            {isDownloadingPdf ? (
                                <div className="flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin text-red-600" />
                                    <span className="text-xs font-medium text-red-600">Downloading...</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 justify-center w-full">
                                    <FileCode className="mr-2.5 w-4 h-4 text-red-500" />
                                    <span>Download PDF</span>
                                    <Download className="ml-auto w-3.5 h-3.5 text-slate-400" />
                                </div>
                            )}
                        </Button>
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
                                <DialogTitle className="text-3xl font-black mb-2 text-white tracking-tight">Download Started!</DialogTitle>
                                <DialogDescription className="text-white/60 text-[15px] font-medium max-w-[280px] mx-auto leading-relaxed">
                                    Your professional {template?.name || "document"} is ready for use.
                                </DialogDescription>
                            </div>
                        </div>

                        <div className="p-8 bg-white">
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] mb-8">
                                        Why users choose Boopsign
                                    </h4>
                                    <div className="space-y-8">
                                        <div className="flex gap-5 items-start">
                                            <div className="w-10 aspect-square bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 border border-blue-100/50">
                                                <Sparkles className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div className="pt-1">
                                                <p className="font-black text-slate-900 text-[15px] mb-1 leading-none tracking-tight">Professional e-Signatures</p>
                                                <p className="text-[13px] text-slate-500 leading-relaxed font-medium">Stop sending Word docs. Send a professional, mobile-ready signing link.</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-5 items-start">
                                            <div className="w-10 aspect-square bg-green-50 rounded-full flex items-center justify-center flex-shrink-0 border border-green-100/50">
                                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                                            </div>
                                            <div className="pt-1">
                                                <p className="font-black text-slate-900 text-[15px] mb-1 leading-none tracking-tight">3x Faster Closures</p>
                                                <p className="text-[13px] text-slate-500 leading-relaxed font-medium">Clients sign in 60 seconds from any phone without creating an account.</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-5 items-start">
                                            <div className="w-10 aspect-square bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0 border border-purple-100/50">
                                                <ArrowRight className="w-5 h-5 text-purple-600" />
                                            </div>
                                            <div className="pt-1">
                                                <p className="font-black text-slate-900 text-[15px] mb-1 leading-none tracking-tight">Automated Audit Trails</p>
                                                <p className="text-[13px] text-slate-500 leading-relaxed font-medium">Get a legally binding certificate of completion with every signed document.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <TemplateActionButton
                                        templateId={templateId}
                                        templateTitle={template?.name || "My Contract"}
                                        buttonText="Try Boopsign for Free"
                                        className="w-full"
                                    />
                                    <p className="text-center text-[10px] text-slate-400 mt-4">
                                        Trusted by 10,000+ professionals for secure document workflows.
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
