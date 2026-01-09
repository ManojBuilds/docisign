"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, Plus, ZoomInIcon, ZoomOutIcon } from "lucide-react";
import { memo } from "react";

interface MobileBottomBarProps {
  currentPage: number;
  numPages: number;
  setCurrentPage: (page: number) => void;
  scale: number;
  setScale: (scale: number | ((s: number) => number)) => void;
  onAddTextField: () => void;
}

export const MobileBottomBar = memo(({
  currentPage,
  numPages,
  setCurrentPage,
  scale,
  setScale,
  onAddTextField
}: MobileBottomBarProps) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg">
      <div className="flex items-center justify-between p-3">
        {/* Page Navigation */}
        <div className="flex items-center space-x-3">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage <= 1}
          >
            <ChevronLeftIcon />
          </Button>
          <div className="text-xs font-medium min-w-[2rem] text-center">
            {currentPage}/{numPages}
          </div>
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setCurrentPage(Math.min(numPages, currentPage + 1))}
            disabled={currentPage >= numPages}
            className="px-3"
          >
            <ChevronRightIcon />
          </Button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setScale(Math.max(0.25, (scale as number) - 0.25))}
          >
            <ZoomOutIcon />
          </Button>
          <div className="text-xs font-medium min-w-[3rem] text-center">
            {Math.round(scale * 100)}%
          </div>
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setScale(Math.min(5, (scale as number) + 0.25))}
          >
            <ZoomInIcon />
          </Button>
        </div>

        {/* Add Fields Button */}
        <Button
          onClick={onAddTextField}
          className="px-3 fixed bottom-16 right-4 w-12 h-12 rounded-full aspect-square"
          size="lg"
        >
          <Plus className="w-8 h-8" />
        </Button>
      </div>
    </div>
  );
});

MobileBottomBar.displayName = "MobileBottomBar";
