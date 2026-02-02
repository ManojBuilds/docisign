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
                <span className="text-[10px] font-semibold text-gray-300">{pageNumber}</span>
              </div>
            }
          />
        ) : (
          <div className="w-[140px] h-[190px] bg-gray-100 flex items-center justify-center">
            <span className="text-[10px] font-semibold text-gray-300">{pageNumber}</span>
          </div>
        )}
        <div className={cn(
          "absolute inset-0 transition-opacity duration-300",
          isActive ? "bg-primary/5 opacity-100" : "bg-black/0 group-hover:bg-black/5"
        )} />
      </div>
      <span className={cn(
        "text-[10px] font-semibold transition-colors",
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
              if (pageNum > 1) newVisible.add(pageNum - 1);
              if (pageNum < numPages) newVisible.add(pageNum + 1);
            } else {
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
        rootMargin: '200px 0px',
        threshold: 0,
      }
    );

    Object.values(thumbnailRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [numPages, currentPage]);

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
    <aside className="w-52 bg-white border-r border-gray-200/60 flex flex-col h-full overflow-hidden shadow-[inset_-1px_0_0_0_rgba(0,0,0,0.02)] relative z-10">
      <div className="px-6 py-5 border-b bg-gray-50/40 backdrop-blur-sm flex items-center justify-between sticky top-0 z-20">
        <div className="flex flex-col">
          <h3 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-400">Pages</h3>
          <p className="text-[9px] text-gray-300 font-bold uppercase mt-0.5 opacity-60">Navigation</p>
        </div>
        <span className="text-[10px] font-extrabold text-gray-900 bg-gray-100 border border-gray-200/50 px-2.5 py-0.5 rounded-full shadow-sm">
          {numPages}
        </span>
      </div>
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="p-6 space-y-6 pb-12 w-full flex flex-col items-center">
          <Document
            file={fileUrl}
            options={documentOptions}
            loading={null}
            className="w-full flex flex-col items-center gap-6"
          >
            {Array.from(new Array(numPages), (_, index) => {
              const pNum = index + 1;
              return (
                <div
                  key={`thumb_${pNum}`}
                  ref={(el) => { thumbnailRefs.current[pNum] = el; }}
                  data-thumbnail-page={pNum}
                  className="relative group w-full flex justify-center perspective-[1000px]"
                >
                  <ThumbnailPage
                    pageNumber={pNum}
                    isActive={currentPage === pNum}
                    isVisible={visiblePages.has(pNum)}
                    onClick={() => handlePageClick(pNum)}
                  />
                  {currentPage === pNum && (
                    <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-primary rounded-r-full shadow-[2px_0_12px_rgba(var(--primary),0.3)] animate-in slide-in-from-left-2 duration-300" />
                  )}
                  <span className={cn(
                    "absolute -right-2 top-2 text-[18px] font-black text-gray-100 select-none z-0 pointer-events-none transition-all duration-300",
                    currentPage === pNum ? "text-primary/10 scale-125 translate-x-1" : "opacity-0"
                  )}>
                    {pNum.toString().padStart(2, '0')}
                  </span>
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
