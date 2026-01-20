'use client';

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { pdfjs } from 'react-pdf';

// Configure worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PdfDocumentContextValue {
    pdfDocument: any | null;
    isLoading: boolean;
    error: string | null;
}

const PdfDocumentContext = createContext<PdfDocumentContextValue | undefined>(undefined);

interface PdfDocumentProviderProps {
    fileUrl: string;
    children: React.ReactNode;
}

/**
 * Provides a shared PDF document instance to avoid loading the same PDF multiple times
 * This significantly improves performance when using both thumbnails and main viewer
 */
export function PdfDocumentProvider({ fileUrl, children }: PdfDocumentProviderProps) {
    const [pdfDocument, setPdfDocument] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const loadingRef = useRef(false);

    useEffect(() => {
        if (!fileUrl || loadingRef.current) return;

        loadingRef.current = true;
        setIsLoading(true);
        setError(null);

        const loadDocument = async () => {
            try {
                const loadingTask = pdfjs.getDocument({
                    url: fileUrl,
                    cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
                    cMapPacked: true,
                    standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
                    isEvalSupported: false,
                });

                const pdf = await loadingTask.promise;
                setPdfDocument(pdf);
                setIsLoading(false);
            } catch (err) {
                console.error('Failed to load PDF:', err);
                setError('Failed to load PDF document');
                setIsLoading(false);
            } finally {
                loadingRef.current = false;
            }
        };

        loadDocument();

        return () => {
            if (pdfDocument) {
                pdfDocument.destroy().catch(() => {
                    // Ignore cleanup errors
                });
            }
        };
    }, [fileUrl, pdfDocument]);

    return (
        <PdfDocumentContext.Provider value={{ pdfDocument, isLoading, error }}>
            {children}
        </PdfDocumentContext.Provider>
    );
}

export function usePdfDocument() {
    const context = useContext(PdfDocumentContext);
    if (context === undefined) {
        throw new Error('usePdfDocument must be used within a PdfDocumentProvider');
    }
    return context;
}
