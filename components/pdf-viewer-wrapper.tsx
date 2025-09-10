'use client'

import dynamic from "next/dynamic"
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const PdfViewer = dynamic(() => import('./pdf-viewer'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center w-full h-full p-8">
            <div className="text-center">
                <Loader2 className="w-10 h-10 animate-spin text-gray-400 mx-auto mb-3" />
                <p className="text-base font-semibold text-gray-700">Loading Document</p>
                <p className="text-sm text-gray-500">Please wait while we prepare the viewer.</p>
            </div>
        </div>
    ),
})

interface PdfViewerWrapperProps {
    fileUrl: string;
    pageNumber?: number;
    showControls?: boolean;
    onPageChange?: (pageNumber: number) => void;
    onScaleChange?: (scale: number) => void;
    onNumPagesChange?: (numPages: number) => void;
    children?: React.ReactNode;
    className?: string;
    onPreviousSignatureField?: () => void;
    onNextSignatureField?: () => void;
    hasMultipleIncompleteFields?: boolean;
}

const PdfViewerWrapper = ({children, ...props}: PdfViewerWrapperProps) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if(!isClient) {
        return null;
    }

    return (
        <PdfViewer {...props} >
            {children}
        </PdfViewer>
    )
}

export default PdfViewerWrapper