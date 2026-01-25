"use client";

import PdfViewerWrapper from "./pdf-viewer-wrapper";
import { cn } from "@/lib/utils";

interface WordViewerProps {
    fileUrl: string;
    className?: string;
}

/**
 * WordViewer is a wrapper that displays a PDF preview of the document.
 * Despite the name, it currently handles PDF rendering for template previews.
 */
export function WordViewer({ fileUrl, className }: WordViewerProps) {
    if (!fileUrl) return null;

    return (
        <div className={cn("overflow-hidden flex flex-col", className)}>
            <PdfViewerWrapper
                fileUrl={fileUrl}
                showControls={false}
                className="flex-1"
            />
        </div>
    );
}
