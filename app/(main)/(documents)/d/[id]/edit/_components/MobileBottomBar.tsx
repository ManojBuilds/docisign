"use client";

import { Button } from "@/components/ui/button";
import { Plus, ZoomInIcon, ZoomOutIcon } from "lucide-react";
import { memo } from "react";

interface MobileBottomBarProps {
  currentPage: number;
  numPages: number;
  setCurrentPage: (page: number) => void;
  scale: number;
  setScale: (scale: number | ((s: number) => number)) => void;
  onOpenAddFieldSheet: () => void;
}

/**
 * Adobe Sign–style bottom bar: zoom + Add FAB. Minimal and rounded.
 * Apple Liquid Glass effect applied.
 */
export const MobileBottomBar = memo(({
  scale,
  setScale,
  onOpenAddFieldSheet,
}: MobileBottomBarProps) => {
  return (
    <div className="md:hidden fixed bottom-6 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto flex items-center p-2 bg-white/60 backdrop-blur-2xl backdrop-saturate-150 border border-white/50 shadow-[0_20px_40px_rgba(0,0,0,0.12)] rounded-full gap-3 transition-all duration-300">

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 pl-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full text-gray-500 hover:text-gray-900 hover:bg-black/5 transition-all active:scale-95"
            onClick={() => setScale((s) => Math.max(0.25, s - 0.25))}
          >
            <ZoomOutIcon className="h-4 w-4" />
          </Button>

          <span className="text-xs font-bold text-gray-900 w-10 text-center tabular-nums leading-none select-none">
            {Math.round(scale * 100)}%
          </span>

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full text-gray-500 hover:text-gray-900 hover:bg-black/5 transition-all active:scale-95"
            onClick={() => setScale((s) => Math.min(2, s + 0.25))}
          >
            <ZoomInIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="h-5 w-[1px] bg-gray-400/30" />

        {/* Add Field Button */}
        <Button
          onClick={onOpenAddFieldSheet}
          className="h-11 w-11 rounded-full shadow-lg shadow-black/10 bg-[#007AFF] text-white hover:bg-[#0071EB] active:scale-90 transition-all duration-200 flex items-center justify-center p-0"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
});

MobileBottomBar.displayName = "MobileBottomBar";
