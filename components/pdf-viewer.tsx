"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMobile } from "@/hooks/useMobile";
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { usePdfDimensions } from "./PdfDimensionsContext";
import { cn } from "@/lib/utils";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
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
  containerClassName?: string;
}
if (typeof window === "undefined") {
  // @ts-expect-error fix the error
  global.DOMMatrix = class DOMMatrix { };
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
  onReady,
  containerClassName,
}: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  // Initialize with first 3 pages visible for immediate rendering
  const [visiblePages, setVisiblePages] = useState<Set<number>>(() =>
    new Set([1, 2, 3])
  );

  const { pageDimensions, scale, setPageDimensions, setScale } =
    usePdfDimensions();
  const containerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const isMobile = useMobile();

  // Keep a ref to currentPage state to access it inside the effect without adding it to dependencies
  const currentPageRef = useRef(currentPage);
  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  // Handle intersection for updating current page while scrolling and tracking visible pages
  useEffect(() => {
    if (numPages === 0 || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Update visible pages for lazy rendering
        setVisiblePages((prev) => {
          const newVisible = new Set(prev);
          entries.forEach((entry) => {
            const pageNum = parseInt(entry.target.getAttribute("data-page-number") || "1");
            if (entry.isIntersecting) {
              // Add current page and preload adjacent pages
              newVisible.add(pageNum);
              if (pageNum > 1) newVisible.add(pageNum - 1);
              if (pageNum < numPages) newVisible.add(pageNum + 1);
            } else {
              // Keep pages near current page loaded
              if (Math.abs(pageNum - currentPageRef.current) > 3) {
                newVisible.delete(pageNum);
              }
            }
          });
          return newVisible;
        });

        // Find the page with the highest intersection ratio for current page tracking
        const visiblePages = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visiblePages.length > 0) {
          const pageNum = parseInt(visiblePages[0].target.getAttribute("data-page-number") || "1");
          if (pageNum !== currentPageRef.current) {
            setCurrentPage(pageNum);
            onPageChange?.(pageNum);
          }
        }
      },
      {
        root: containerRef.current,
        threshold: [0, 0.1],
        rootMargin: "300px 0px" // Preload pages further before they come into view
      }
    );

    Object.values(pageRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [numPages, onPageChange]); // Removed currentPage dependency

  // Sync with controlled page number (scrolling to page)
  useEffect(() => {
    if (controlledPageNumber && controlledPageNumber !== currentPage) {
      setCurrentPage(controlledPageNumber);
      const pageElement = pageRefs.current[controlledPageNumber];
      if (pageElement) {
        pageElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [controlledPageNumber]); // Only depend on controlledPageNumber to avoid loops

  const handlePageChange = useCallback(
    (newPage: number) => {
      const newPageNumber = Math.max(1, Math.min(newPage, numPages || 1));
      const pageElement = pageRefs.current[newPageNumber];
      if (pageElement) {
        pageElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [numPages],
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
    },
    [onNumPagesChange],
  );

  const onDocumentLoadError = useCallback((error: Error) => {
    console.error("PDF load error:", error);
    setError("Failed to load PDF. Please check the file format and try again.");
    setIsLoading(false);
  }, []);

  const onPageRenderSuccess = useCallback(
    (page: any, pNum: number) => {
      const viewport = page.getViewport({ scale: 1 });
      setPageDimensions(
        (prev: Record<number, { width: number; height: number }>) => {
          // Only update if dimensions actually changed (prevent re-renders)
          if (
            prev[pNum]?.width === viewport.width &&
            prev[pNum]?.height === viewport.height
          ) {
            return prev;
          }
          return {
            ...prev,
            [pNum]: { width: viewport.width, height: viewport.height },
          };
        }
      );
    },
    [setPageDimensions],
  );

  // Track if we've already set the initial scale to prevent loops
  const hasSetInitialScale = useRef(false);

  // Auto-adjust scale for mobile or initial fit-to-width
  useEffect(() => {
    if (numPages === 0 || hasSetInitialScale.current || !containerRef.current) return;

    const firstPageWidth = pageDimensions[1]?.width;
    if (firstPageWidth && containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const padding = isMobile ? 32 : 80;
      const targetWidth = containerWidth - padding;

      const optimalScale = targetWidth / firstPageWidth;

      // We only set the initial scale once to "Fit to Width"
      setScale(Math.min(1.5, Math.max(0.2, optimalScale)));
      hasSetInitialScale.current = true;
      onReady?.();
    }
  }, [pageDimensions, numPages, isMobile, setScale, onReady]);

  // Handle window resize separately if needed, but more cautiously
  useEffect(() => {
    const handleResize = () => {
      // We don't forcefully reset scale on every resize unless it's extreme or specifically requested
      // For now, let's keep it simple: initial fit-to-width is enough.
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        <div className="flex items-center p-2 md:p-4 bg-background border-b border-border shadow-sm">
          {/* Page Navigation */}
          <div className="flex items-center mx-auto md:space-x-4">
            <div className="flex items-center bg-gray-50 rounded-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-xs font-semibold font-mono min-w-[3rem] text-center text-gray-600">
                {currentPage} / {numPages}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= numPages}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Zoom Controls */}
            <div className="hidden md:flex items-center bg-gray-50 rounded-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleScaleChange(scale - 0.1)}
                disabled={scale <= 0.5}
                className="h-8 w-8 p-0"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleScaleChange(1.0)}
                className="min-w-[3.5rem] h-8 text-xs font-semibold"
              >
                {Math.round(scale * 100)}%
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleScaleChange(scale + 0.1)}
                disabled={scale >= 2.0}
                className="h-8 w-8 p-0"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>

            {/* Signature Field Navigation */}
            <div className="flex items-center gap-2 ml-4">
              <Button
                variant="outline"
                size="sm"
                onClick={onPreviousSignatureField}
                disabled={!hasMultipleIncompleteFields}
                className="h-8 text-xs font-medium border-gray-200"
              >
                <ChevronLeft className="w-3.5 h-3.5 mr-1" />
                <span className="hidden lg:inline">Previous</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onNextSignatureField}
                disabled={!hasMultipleIncompleteFields}
                className="h-8 text-xs font-medium border-gray-200"
              >
                <span className="hidden lg:inline">Next Field</span>
                <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <ScrollArea className={cn("flex-1 bg-transparent p-4 md:p-8", containerClassName)}>
        <div
          ref={containerRef}
          className="flex-1 bg-transparent scroll-smooth"
        >
          <div className="flex flex-col items-center min-h-full space-y-8">
            <Document
              file={fileUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={null}
              error={
                <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-red-100">
                  <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                  <p className="text-gray-900 font-semibold mb-1">Failed to load document</p>
                  <p className="text-gray-500 text-sm">Please try refreshing the page or check the file.</p>
                </div>
              }
              options={documentOptions}
            >
              {Array.from(new Array(numPages), (_, index) => {
                const pNum = index + 1;
                const isVisible = visiblePages.has(pNum);
                const isNearCurrent = Math.abs(pNum - currentPage) <= 2;

                // Only render pages that are visible or near current page
                const shouldRender = isVisible || isNearCurrent || pNum === 1;

                return (
                  <div
                    key={`page_container_${pNum}`}
                    ref={(el) => { pageRefs.current[pNum] = el; }}
                    data-page-number={pNum}
                    className="relative shadow-xl border border-gray-200/50 bg-white"
                    style={{
                      width: (pageDimensions[pNum]?.width || pageDimensions[1]?.width || 595) * scale,
                      height: (pageDimensions[pNum]?.height || pageDimensions[1]?.height || 842) * scale,
                    }}
                  >
                    {shouldRender ? (
                      <>
                        <Page
                          pageNumber={pNum}
                          scale={scale}
                          devicePixelRatio={Math.min(2, window.devicePixelRatio || 1)}
                          onRenderSuccess={(page) => onPageRenderSuccess(page, pNum)}
                          loading={
                            <div
                              className="flex items-center justify-center bg-gray-50"
                              style={{
                                width: (pageDimensions[pNum]?.width || pageDimensions[1]?.width || 595) * scale,
                                height: (pageDimensions[pNum]?.height || pageDimensions[1]?.height || 842) * scale,
                              }}
                            >
                              <div className="text-gray-400 text-sm">Loading page {pNum}...</div>
                            </div>
                          }
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                        />

                        {/* Overlay for this specific page */}
                        {!isLoading && (
                          <div
                            className="absolute inset-0 z-10"
                            style={{
                              width: (pageDimensions[pNum]?.width || pageDimensions[1]?.width || 0) * scale,
                              height: (pageDimensions[pNum]?.height || pageDimensions[1]?.height || 0) * scale,
                            }}
                          >
                            {/* We'll pass information about the page to children if it's a function */}
                            {typeof children === 'function' ? (children as any)(pNum) : children}
                          </div>
                        )}
                      </>
                    ) : (
                      // Placeholder for non-visible pages
                      <div
                        className="flex items-center justify-center bg-gray-100"
                        style={{
                          width: (pageDimensions[pNum]?.width || pageDimensions[1]?.width || 595) * scale,
                          height: (pageDimensions[pNum]?.height || pageDimensions[1]?.height || 842) * scale,
                        }}
                      >
                        <div className="text-gray-400 text-sm">Page {pNum}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </Document>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

