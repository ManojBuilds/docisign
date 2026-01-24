"use client";

import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import posthog from "posthog-js";

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
    const [isDownloadingDoc, setIsDownloadingDoc] = useState(false);
    const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

    const docToPdf = useAction(api.conversion.docToPdfConversion);

    const handleDownloadDoc = async () => {
        if (!docUrl) return;
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
            })

            toast.success("Word document download started");
        } catch (error) {
            console.error("Download error:", error);
            toast.error("Failed to download Word document");
        } finally {
            setIsDownloadingDoc(false);
        }
    };

    const handleDownloadPdf = async () => {
        if (!docUrl && !pdfUrl) return;
        setIsDownloadingPdf(true);

        try {
            if (pdfUrl) {
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
                document.body.removeChild(a);
            } else if (docUrl) {
                // Fetch the Word document first
                const docResponse = await fetch(docUrl);
                if (!docResponse.ok) throw new Error("Failed to fetch Word document");

                const arrayBuffer = await docResponse.arrayBuffer();

                // Convert to PDF using Convex Action
                const result = await docToPdf({
                    fileData: arrayBuffer
                });

                if (!result || !result.fileUrl) throw new Error("Conversion failed");
                const res = await fetch(result.fileUrl);
                const blob = await res.blob();
                const downloadLink = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = downloadLink;
                a.download = `${templateId}.pdf`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

                posthog.capture("download_contract_as_pdf", {
                    contract: templateId,
                })

                toast.success("PDF conversion and download started");
            }
        } catch (error) {
            console.error("PDF conversion error:", error);
            toast.error("Failed to convert and download PDF");
        } finally {
            setIsDownloadingPdf(false);
        }
    };

    return (
        <div className={cn("flex flex-col gap-4", className)}>
            <div className={cn("flex items-center gap-3", stack ? "flex-col w-full" : "flex-row justify-center")}>
                {docUrl && (
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={handleDownloadDoc}
                        disabled={isDownloadingDoc}
                        className={cn(stack && "w-full h-11", "text-sm border-slate-200 hover:bg-slate-50", buttonClassName)}
                    >
                        {isDownloadingDoc ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <>
                                <Download className="mr-2 w-4 h-4" />
                                Download Word
                            </>
                        )}
                    </Button>
                )}

                {(docUrl || pdfUrl) && (
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={handleDownloadPdf}
                        disabled={isDownloadingPdf}
                        className={cn(stack && "w-full h-11", "text-sm border-slate-200 hover:bg-slate-50", buttonClassName)}
                    >
                        {isDownloadingPdf ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <>
                                <Download className="mr-2 w-4 h-4" />
                                Download PDF
                            </>
                        )}
                    </Button>
                )}
            </div>

            <p className="text-[11px] text-center text-slate-500 font-medium px-4 leading-relaxed">
                Want to sign this document legally? <br />
                <span className="text-blue-600">Use Boopsign above to customize and send for signature.</span>
            </p>
        </div>
    );
}
