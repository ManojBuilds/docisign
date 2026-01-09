"use client";

import { Button } from "@/components/ui/button";
import { Maximize2, ZoomIn, ZoomOut } from "lucide-react";
import { memo } from "react";

interface SigningZoomControlsProps {
  scale: number;
  setScale: (scale: number | ((s: number) => number)) => void;
}

export const SigningZoomControls = memo(({
  scale,
  setScale,
}: SigningZoomControlsProps) => {
  return (
    <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-30 items-center gap-1 bg-white/90 backdrop-blur-md border border-gray-200 p-1.5 rounded-full shadow-2xl transition-all hover:bg-white active:scale-95 group/zoom">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100"
        onClick={() => setScale(Math.max(0.5, (scale as number) - 0.1))}
        disabled={scale <= 0.5}
      >
        <ZoomOut className="w-4 h-4" />
      </Button>
      <div className="px-3 min-w-[60px] text-center border-x border-gray-100">
        <span className="text-[10px] font-black text-gray-900 uppercase">{Math.round(scale * 100)}%</span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100"
        onClick={() => setScale(Math.min(2.0, (scale as number) + 0.1))}
        disabled={scale >= 2.0}
      >
        <ZoomIn className="w-4 h-4" />
      </Button>
      <div className="w-[1px] h-4 bg-gray-100 mx-1" />
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100"
        onClick={() => setScale(1.0)}
        title="Reset Zoom"
      >
        <Maximize2 className="w-3.5 h-3.5" />
      </Button>
    </div>
  );
});

SigningZoomControls.displayName = "SigningZoomControls";
