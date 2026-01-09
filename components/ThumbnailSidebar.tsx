'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import React, { useMemo } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface ThumbnailSidebarProps {
  fileUrl: string;
  numPages: number;
  currentPage: number;
  onPageClick: (page: number) => void;
}

export const ThumbnailSidebar = React.memo(({
  fileUrl,
  numPages,
  currentPage,
  onPageClick,
}: ThumbnailSidebarProps) => {
  const documentOptions = useMemo(
    () => ({
      cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
      cMapPacked: true,
      standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
    }),
    []
  );

  return (
    <aside className="w-48 bg-gray-50/50 border-r flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b bg-white flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Pages</h3>
        <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 font-mono">
          {numPages}
        </span>
      </div>
      <ScrollArea className="flex-1">
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
                  className="flex flex-col items-center gap-2 group cursor-pointer"
                  onClick={() => onPageClick(pNum)}
                >
                  <div
                    className={cn(
                      "relative border-2 transition-all duration-200 rounded-sm overflow-hidden bg-white shadow-sm group-hover:shadow-md",
                      currentPage === pNum
                        ? "border-primary ring-2 ring-primary/20 scale-[1.02]"
                        : "border-transparent group-hover:border-gray-300"
                    )}
                  >
                    <Page
                      pageNumber={pNum}
                      width={140}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      devicePixelRatio={1} // Thumbnails don't need high DPI
                      loading={
                        <div className="w-[140px] h-[190px] bg-gray-100 animate-pulse flex items-center justify-center">
                          <span className="text-[10px] font-bold text-gray-300">{pNum}</span>
                        </div>
                      }
                    />
                    <div className={cn(
                      "absolute inset-0 transition-opacity duration-300",
                      currentPage === pNum ? "bg-primary/5 opacity-100" : "bg-black/0 group-hover:bg-black/5"
                    )} />
                  </div>
                  <span className={cn(
                    "text-[10px] font-bold transition-colors",
                    currentPage === pNum ? "text-primary" : "text-gray-400 group-hover:text-gray-600"
                  )}>
                    Page {pNum}
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
