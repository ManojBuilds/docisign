"use client";

import { Button } from "@/components/ui/button";
import { Maximize2, ZoomInIcon, ZoomOutIcon } from "lucide-react";
import { memo } from "react";

interface ZoomControlsProps {
  scale: number;
  setScale: (scale: number) => void;
}

export const ZoomControls = memo(({ scale, setScale }: ZoomControlsProps) => {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 bg-white/90 backdrop-blur-md border border-gray-200/50 p-1.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all hover:bg-white hover:scale-105 active:scale-100 group/zoom ring-1 ring-black/5">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
        onClick={() => setScale(Math.max(0.5, scale - 0.1))}
        disabled={scale <= 0.5}
      >
        <ZoomOutIcon className="w-4 h-4" />
      </Button>

      <div className="px-3 min-w-[64px] text-center border-x border-gray-100 flex flex-col items-center justify-center">
        <span className="text-[11px] font-black text-gray-900 tabular-nums leading-none">
          {Math.round(scale * 100)}%
        </span>
        <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest leading-none mt-0.5">Scale</span>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
        onClick={() => setScale(Math.min(2.0, scale + 0.1))}
        disabled={scale >= 2.0}
      >
        <ZoomInIcon className="w-4 h-4" />
      </Button>

      <div className="w-[1px] h-4 bg-gray-100 mx-1" />

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors"
        onClick={() => setScale(1.0)}
        title="Reset Zoom"
      >
        <Maximize2 className="w-3.5 h-3.5" />
      </Button>
    </div>
  );
});

ZoomControls.displayName = "ZoomControls";
