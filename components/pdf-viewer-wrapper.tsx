'use client'

import dynamic from "next/dynamic";
import type PDFViewer from "./pdf-viewer";

const PdfViewer = dynamic<React.ComponentProps<typeof PDFViewer>>(() => import('./pdf-viewer'), {
    ssr: false,
})

interface PdfViewerWrapperProps {
    fileUrl: string;
    pageNumber?: number;
    showControls?: boolean;
    onPageChange?: (pageNumber: number) => void;
    onScaleChange?: (scale: number) => void;
    onNumPagesChange?: (numPages: number) => void;
    children?: React.ReactNode | ((pageNumber: number) => React.ReactNode);
    className?: string;
    onPreviousSignatureField?: () => void;
    onNextSignatureField?: () => void;
    hasMultipleIncompleteFields?: boolean;
    onReady?: () => void;
}

const PdfViewerWrapper = ({ children, ...props }: PdfViewerWrapperProps) => {
    return (
        <PdfViewer {...props} >
            {children}
        </PdfViewer>
    )
}

export default PdfViewerWrapper