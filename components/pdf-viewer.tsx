"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { usePdfDimensions } from "./PdfDimensionsContext";
import { useMobile } from "@/hooks/useMobile";
import Logo from "./Logo";
import Image from "next/image";

// Use compatible worker for react-pdf v10
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.mjs`;

interface PDFViewerProps {
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
if (typeof window === "undefined") {
  // @ts-expect-error fix the error
  global.DOMMatrix = class DOMMatrix {};
}

export default function PDFViewer({
  fileUrl,
  pageNumber: controlledPageNumber,
  showControls = true,
  onPageChange,
  onScaleChange,
  onNumPagesChange,
  children,
  className = "",
  onPreviousSignatureField,
  onNextSignatureField,
  hasMultipleIncompleteFields,
}: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const { pageDimensions, scale, setPageDimensions, setScale } =
    usePdfDimensions();
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();

  // Sync with controlled page number
  useEffect(() => {
    if (controlledPageNumber && controlledPageNumber !== pageNumber) {
      setPageNumber(controlledPageNumber);
    }
  }, [controlledPageNumber, pageNumber]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      const newPageNumber = Math.max(1, Math.min(newPage, numPages || 1));
      setPageNumber(newPageNumber);
      onPageChange?.(newPageNumber);
    },
    [numPages, onPageChange],
  );

  const handleScaleChange = useCallback(
    (newScale: number) => {
      const clampedScale = Math.max(0.5, Math.min(2.0, newScale));
      setScale(clampedScale);
      onScaleChange?.(clampedScale);
    },
    [setScale, onScaleChange],
  );

  // Memoize options to prevent unnecessary reloads
  const documentOptions = useMemo(
    () => ({
      cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
      cMapPacked: true,
      standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
      isEvalSupported: false,
    }),
    [],
  );

  // Cleanup function to prevent transport destroyed errors
  useEffect(() => {
    return () => {
      setIsLoading(false);
      setError("");
    };
  }, []);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
      setIsLoading(false);
      setError("");
      onNumPagesChange?.(numPages);

      // Initialize page number if controlled
      if (controlledPageNumber && controlledPageNumber <= numPages) {
        setPageNumber(controlledPageNumber);
      } else if (!controlledPageNumber) {
        setPageNumber(1);
      }
    },
    [onNumPagesChange, controlledPageNumber],
  );

  const onDocumentLoadError = useCallback((error: Error) => {
    console.error("PDF load error:", error);
    setError("Failed to load PDF. Please check the file format and try again.");
    setIsLoading(false);
  }, []);

  const onPageRenderSuccess = useCallback(
    (page: any) => {
      const viewport = page.getViewport({ scale: 1 });
      setPageDimensions(
        (prev: Record<number, { width: number; height: number }>) => ({
          ...prev,
          [pageNumber]: { width: viewport.width, height: viewport.height },
        }),
      );
    },
    [pageNumber, setPageDimensions],
  );

  // Auto-adjust scale for mobile
  useEffect(() => {
    const handleResize = () => {
      const currentPageWidth = pageDimensions[pageNumber]?.width;
      if (containerRef.current && currentPageWidth > 0) {
        const containerWidth = containerRef.current.clientWidth;

        // Adjust scale to fit screen width, especially on mobile
        if (isMobile) {
          const optimalScale = containerWidth / currentPageWidth;
          setScale(optimalScale);
        } else {
          // Optional: Keep existing desktop logic or set a default
          const maxScale = (containerWidth - 40) / currentPageWidth;
          if (maxScale < scale) {
            handleScaleChange(maxScale);
          }
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener("resize", handleResize);
  }, [
    pageDimensions,
    pageNumber,
    scale,
    handleScaleChange,
    isMobile,
    setScale,
  ]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full p-4">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Controls */}
      {showControls && numPages > 0 && (
        <div className="flex items-center p-2 md:p-4 bg-background border-b border-border">
          {/* Page Navigation */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white shadow-2xl rounded-lg grid place-items-center relative">
              <Image
                src={"/logo.png"}
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-semibold">Boopsign Co. Ltd</span>
          </div>
          <div className="flex items-center mx-auto md:space-x-4">
            <Logo showText={false} className="md:hidden" />
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(pageNumber - 1)}
                disabled={pageNumber <= 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium min-w-[4rem] text-center">
                {pageNumber} / {numPages}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(pageNumber + 1)}
                disabled={pageNumber >= numPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            {/* Zoom Controls */}
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleScaleChange(scale - 0.1)}
                disabled={scale <= 0.5}
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleScaleChange(1.0)}
                className="min-w-[4rem]"
              >
                {Math.round(scale * 100)}%
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleScaleChange(scale + 0.1)}
                disabled={scale >= 2.0}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
            {/* Signature Field Navigation (NEW) */}
            <div className="flex items-center md:space-x-2 ml-4">
              <Button
                variant="outline"
                size="sm"
                onClick={onPreviousSignatureField}
                disabled={!hasMultipleIncompleteFields}
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Previous Field
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onNextSignatureField}
                disabled={!hasMultipleIncompleteFields}
              >
                Next Field <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* PDF Container */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto bg-muted/20 relative"
      >
        <div className="flex justify-center min-h-full md:pt-4">
          <div className="relative max-w-full">
            <Document
              file={fileUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div className="flex flex-col items-center justify-center h-96 space-y-4 min-w-full">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">
                    Loading PDF...
                  </p>
                </div>
              }
              error={
                <div className="flex flex-col items-center justify-center h-96 space-y-4">
                  <AlertCircle className="w-8 h-8 text-destructive" />
                  <p className="text-sm text-destructive">Failed to load PDF</p>
                </div>
              }
              options={documentOptions}
            >
              {!isLoading && numPages > 0 && pageNumber <= numPages && (
                <Page
                  key={`page_${pageNumber}`}
                  pageNumber={pageNumber}
                  scale={scale}
                  onRenderSuccess={onPageRenderSuccess}
                  onLoadError={(error) => {
                    console.warn("Page load error:", error);
                  }}
                  loading={
                    <div className="flex items-center justify-center h-96 w-full">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    </div>
                  }
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="shadow-sm"
                />
              )}
            </Document>

            {/* Overlay for signature fields */}
            {!isLoading && numPages > 0 && (
              <div
                className="signature-field-overlay absolute inset-0"
                style={{
                  width: (pageDimensions[pageNumber]?.width || 0) * scale,
                  height: (pageDimensions[pageNumber]?.height || 0) * scale,
                }}
              >
                {children}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
