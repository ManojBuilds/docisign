"use client";

import {
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface PdfControlsProps {
  pageNumber: number;
  numPages: number;
  scale: number;
  onPageChange: (page: number) => void;
  onScaleChange: (scale: number) => void;
  onSignatureFieldClick?: () => void;
  onDateSignatureFieldClick?: () => void;
}

export default function PdfControls({
  pageNumber,
  numPages,
  scale,
  onPageChange,
  onScaleChange,
}: PdfControlsProps) {
  const goToPrevPage = () => {
    if (pageNumber > 1) {
      onPageChange(pageNumber - 1);
    }
  };

  const goToNextPage = () => {
    if (pageNumber < numPages) {
      onPageChange(pageNumber + 1);
    }
  };

  const zoomIn = () => {
    onScaleChange(Math.min(scale + 0.2, 2.0));
  };

  const zoomOut = () => {
    onScaleChange(Math.max(scale - 0.2, 0.5));
  };

  const resetZoom = () => {
    onScaleChange(1.0);
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {/*{onSignatureClick && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onSignatureClick}>
                <PenTool className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Signature Field</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}*/}
      {/*{onDateClick && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onDateClick}>
                <CalendarDays className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Date Field</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}*/}
      {/* Page Navigation */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={goToPrevPage}
          disabled={pageNumber <= 1}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <span className="text-sm text-muted-foreground font-medium">
          {pageNumber} /{numPages}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={goToNextPage}
          disabled={pageNumber >= numPages}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Zoom Controls */}
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={zoomOut}
          disabled={scale <= 0.5}
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button variant="ghost" onClick={resetZoom} className="text-sm">
          {Math.round(scale * 100)}%
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={zoomIn}
          disabled={scale >= 2.0}
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
