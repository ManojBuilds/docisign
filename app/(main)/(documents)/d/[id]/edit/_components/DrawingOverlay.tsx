"use client";

import { SignatureFieldData } from "@/components/signature-field";
import { cn } from "@/lib/utils";
import { useDocumentEditorStore } from "@/stores/document-editor-store";
import { ALargeSmall, CalendarDays, PenTool, TextCursor } from "lucide-react";
import { memo, useEffect, useState } from "react";

interface DrawingOverlayProps {
  pageNumber: number;
  scale: number;
  onAddField: (fieldType: SignatureFieldData["fieldType"], dimensions: { x: number; y: number; width: number; height: number }, page: number) => void;
}

export const DrawingOverlay = memo(({ pageNumber, scale, onAddField }: DrawingOverlayProps) => {
  const selectedTool = useDocumentEditorStore((state) => state.selectedTool);
  const setSelectedFieldId = useDocumentEditorStore((state) => state.setSelectedFieldId);
  const currentPage = useDocumentEditorStore((state) => state.currentPage);

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [dragCurrent, setDragCurrent] = useState<{ x: number; y: number } | null>(null);
  const [dragRect, setDragRect] = useState<DOMRect | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (selectedTool === "selection") return;

    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;

    setIsDragging(true);
    setDragRect(rect);
    setDragStart({ x, y });
    setDragCurrent({ x, y });
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragRect) return;
      const x = (e.clientX - dragRect.left) / scale;
      const y = (e.clientY - dragRect.top) / scale;
      setDragCurrent({ x, y });
    };

    const handleMouseUp = () => {
      if (!dragStart || !dragCurrent) {
        setIsDragging(false);
        return;
      }

      const x = Math.min(dragStart.x, dragCurrent.x);
      const y = Math.min(dragStart.y, dragCurrent.y);
      const width = Math.abs(dragStart.x - dragCurrent.x);
      const height = Math.abs(dragStart.y - dragCurrent.y);

      if (width < 20 || height < 10) {
        onAddField(selectedTool as SignatureFieldData["fieldType"], {
          x: dragStart.x,
          y: dragStart.y,
          width: 150,
          height: 40,
        }, pageNumber);
      } else {
        onAddField(selectedTool as SignatureFieldData["fieldType"], {
          x,
          y,
          width,
          height,
        }, pageNumber);
      }

      setIsDragging(false);
      setDragStart(null);
      setDragCurrent(null);
      setDragRect(null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragStart, dragCurrent, dragRect, scale, selectedTool, onAddField, pageNumber]);

  return (
    <div
      className={cn(
        "absolute inset-0 z-10",
        selectedTool !== "selection" ? "cursor-crosshair bg-primary/[0.005]" : "pointer-events-none"
      )}
      onMouseDown={handleMouseDown}
      onClick={() => {
        if (selectedTool === "selection") {
          setSelectedFieldId("");
        }
      }}
    >
      {/* Compact Mode Indicator */}
      {selectedTool !== 'selection' && currentPage === pageNumber && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
          <div className="bg-gray-900/90 text-white backdrop-blur-md px-3 py-1.5 rounded-full shadow-2xl border border-white/10 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-2">
              {selectedTool === 'signature' && <PenTool className="w-3.5 h-3.5 text-blue-400" />}
              {selectedTool === 'initial' && <TextCursor className="w-3.5 h-3.5 text-purple-400" />}
              {selectedTool === 'date' && <CalendarDays className="w-3.5 h-3.5 text-emerald-400" />}
              {selectedTool === 'text' && <ALargeSmall className="w-3.5 h-3.5 text-orange-400" />}
              <span className="text-[11px] font-bold uppercase tracking-wider">
                {selectedTool} Mode
              </span>
            </div>
            <div className="h-3 w-[1px] bg-white/20" />
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-white/50">Press</span>
              <kbd className="bg-white/10 border border-white/20 px-1 rounded text-[9px] font-mono">V</kbd>
              <span className="text-[10px] text-white/50">to exit</span>
            </div>
          </div>
        </div>
      )}

      {isDragging && dragStart && dragCurrent && (
        <div
          className="absolute border-2 border-primary bg-primary/10 rounded-sm shadow-lg flex items-center justify-center overflow-hidden"
          style={{
            left: Math.min(dragStart.x, dragCurrent.x) * scale,
            top: Math.min(dragStart.y, dragCurrent.y) * scale,
            width: Math.abs(dragStart.x - dragCurrent.x) * scale,
            height: Math.abs(dragStart.y - dragCurrent.y) * scale,
            zIndex: 100,
          }}
        >
          <div className="bg-primary text-white text-[10px] px-1 py-0.5 rounded-br capitalize">
            {selectedTool}
          </div>
        </div>
      )}
    </div>
  );
});

DrawingOverlay.displayName = "DrawingOverlay";
