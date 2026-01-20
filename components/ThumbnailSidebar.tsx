'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface ThumbnailSidebarProps {
  fileUrl: string;
  numPages: number;
  currentPage: number;
  onPageClick: (page: number) => void;
}

/**
 * Individual thumbnail component - memoized to prevent re-renders
 */
const ThumbnailPage = React.memo(({
  pageNumber,
  isActive,
  isVisible,
  onClick,
}: {
  pageNumber: number;
  isActive: boolean;
  isVisible: boolean;
  onClick: () => void;
}) => {
  // Only render the page if it's visible or active
  const shouldRender = isVisible || isActive;

  return (
    <div
      className="flex flex-col items-center gap-2 group cursor-pointer"
      onClick={onClick}
    >
      <div
        className={cn(
          "relative border-2 transition-all duration-200 rounded-sm overflow-hidden bg-white shadow-sm group-hover:shadow-md",
          isActive
            ? "border-primary ring-2 ring-primary/20 scale-[1.02]"
            : "border-transparent group-hover:border-gray-300"
        )}
      >
        {shouldRender ? (
          <Page
            pageNumber={pageNumber}
            width={140}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            devicePixelRatio={1} // Thumbnails don't need high DPI
            loading={
              <div className="w-[140px] h-[190px] bg-gray-100 animate-pulse flex items-center justify-center">
                <span className="text-[10px] font-bold text-gray-300">{pageNumber}</span>
              </div>
            }
          />
        ) : (
          <div className="w-[140px] h-[190px] bg-gray-100 flex items-center justify-center">
            <span className="text-[10px] font-bold text-gray-300">{pageNumber}</span>
          </div>
        )}
        <div className={cn(
          "absolute inset-0 transition-opacity duration-300",
          isActive ? "bg-primary/5 opacity-100" : "bg-black/0 group-hover:bg-black/5"
        )} />
      </div>
      <span className={cn(
        "text-[10px] font-bold transition-colors",
        isActive ? "text-primary" : "text-gray-400 group-hover:text-gray-600"
      )}>
        Page {pageNumber}
      </span>
    </div>
  );
});

ThumbnailPage.displayName = "ThumbnailPage";

export const ThumbnailSidebar = React.memo(({
  fileUrl,
  numPages,
  currentPage,
  onPageClick,
}: ThumbnailSidebarProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<Record<number, HTMLDivElement | null>>({});
  // Initialize with first 5 pages visible for immediate rendering
  const [visiblePages, setVisiblePages] = useState<Set<number>>(() =>
    new Set([1, 2, 3, 4, 5])
  );

  const documentOptions = useMemo(
    () => ({
      cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
      cMapPacked: true,
      standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
    }),
    []
  );

  // Intersection observer to track visible thumbnails
  useEffect(() => {
    if (numPages === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setVisiblePages((prev) => {
          const newVisible = new Set(prev);
          entries.forEach((entry) => {
            const pageNum = parseInt(entry.target.getAttribute('data-thumbnail-page') || '0');
            if (entry.isIntersecting) {
              newVisible.add(pageNum);
              // Preload adjacent pages
              if (pageNum > 1) newVisible.add(pageNum - 1);
              if (pageNum < numPages) newVisible.add(pageNum + 1);
            } else {
              // Keep current page and adjacent pages always loaded
              if (Math.abs(pageNum - currentPage) > 2) {
                newVisible.delete(pageNum);
              }
            }
          });
          return newVisible;
        });
      },
      {
        root: scrollAreaRef.current,
        rootMargin: '200px 0px', // Load thumbnails 200px before they come into view
        threshold: 0,
      }
    );

    Object.values(thumbnailRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [numPages, currentPage]);

  // Auto-scroll to current page
  useEffect(() => {
    const currentThumbnail = thumbnailRefs.current[currentPage];
    if (currentThumbnail) {
      currentThumbnail.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [currentPage]);

  const handlePageClick = useCallback((pageNum: number) => {
    onPageClick(pageNum);
  }, [onPageClick]);

  return (
    <aside className="w-48 bg-gray-50/50 border-r flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b bg-white flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Pages</h3>
        <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 font-mono">
          {numPages}
        </span>
      </div>
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="p-4 space-y-4">
          <Document
            file={fileUrl}
            options={documentOptions}
            loading={null}
          >
            {Array.from(new Array(numPages), (_, index) => {
              const pNum = index + 1;
              return (
                <div
                  key={`thumb_${pNum}`}
                  ref={(el) => { thumbnailRefs.current[pNum] = el; }}
                  data-thumbnail-page={pNum}
                >
                  <ThumbnailPage
                    pageNumber={pNum}
                    isActive={currentPage === pNum}
                    isVisible={visiblePages.has(pNum)}
                    onClick={() => handlePageClick(pNum)}
                  />
                </div>
              );
            })}
          </Document>
        </div>
      </ScrollArea>
    </aside>
  );
});

ThumbnailSidebar.displayName = "ThumbnailSidebar";
