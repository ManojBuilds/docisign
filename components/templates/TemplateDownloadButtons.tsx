"use client";

import { Button } from "@/components/ui/button";
import { FileText, FileCode, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import posthog from "posthog-js";
import { Dialog } from "@/components/ui/dialog";
import { getTemplateBySlug } from "@/lib/seo/all-templates";
import { TemplateDownloadDialog } from "./TemplateDownloadDialog";
import { useState, useMemo } from "react";
import dynamic from "next/dynamic";

const SuccessDialogContent = dynamic(() => import("./SuccessDialogContent"), {
    ssr: false,
});

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
    const [isDownloadDialogOpen, setIsDownloadDialogOpen] = useState(false);

    const template = useMemo(() => getTemplateBySlug(templateId), [templateId]);

    const triggerSuccess = (format: "docx" | "pdf") => {
        posthog.capture(`requested_template_${format}`, {
            contract: templateId,
        });

        posthog.capture("template_download_success", {
            template_id: templateId,
            format,
        });

        // Trigger the success dialog after a small delay
        setTimeout(() => {
            setShowSuccessDialog(true);
        }, 300);
    };

    return (
        <>
            <div className={cn("flex flex-col gap-5 p-2", className)}>
                <div className={cn("flex items-center flex-col gap-3", stack ? "flex-col w-full" : "md:flex-row justify-center")}>
                    {docUrl && (
                        <Button
                            variant="secondary"
                            size="lg"
                            onClick={() => setIsDownloadDialogOpen(true)}
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
                    )}

                    {pdfUrl && (
                        <Button
                            variant="secondary"
                            size="lg"
                            onClick={() => setIsDownloadDialogOpen(true)}
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

            <TemplateDownloadDialog
                templateName={template?.name || "Contract Template"}
                templateSlug={templateId}
                open={isDownloadDialogOpen}
                onOpenChange={setIsDownloadDialogOpen}
                onSuccess={() => triggerSuccess(docUrl ? "docx" : "pdf")}
            />

            <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
                {showSuccessDialog && (
                    <SuccessDialogContent templateName={template?.name || "document"} />
                )}
            </Dialog>
        </>
    );
}

TemplateDownloadButtons.displayName = "TemplateDownloadButtons";
