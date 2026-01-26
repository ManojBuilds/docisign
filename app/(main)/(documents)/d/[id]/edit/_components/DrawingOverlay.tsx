"use client";

import { SignatureFieldData } from "@/components/signature-field";
import { cn } from "@/lib/utils";
import { useDocumentEditorStore } from "@/stores/document-editor-store";
import { memo, useEffect, useState } from "react";

interface DrawingOverlayProps {
  pageNumber: number;
  scale: number;
  onAddField: (fieldType: SignatureFieldData["fieldType"], dimensions: { x: number; y: number; width: number; height: number }, page: number) => void;
}

export const DrawingOverlay = memo(({ pageNumber, scale, onAddField }: DrawingOverlayProps) => {
  const selectedTool = useDocumentEditorStore((state) => state.selectedTool);
  const setSelectedFieldId = useDocumentEditorStore((state) => state.setSelectedFieldId);

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [dragCurrent, setDragCurrent] = useState<{ x: number; y: number } | null>(null);
  const [dragRect, setDragRect] = useState<DOMRect | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (selectedTool === "selection") return;

    // Prevent default browser behavior (text selection, image drag, etc.)
    e.preventDefault();

    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;

    setIsDragging(true);
    setDragRect(rect);
    setDragStart({ x, y });
    setDragCurrent({ x, y });
  };

  useEffect(() => {
    if (!isDragging || !dragRect || !dragStart) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - dragRect.left) / scale;
      const y = (e.clientY - dragRect.top) / scale;
      setDragCurrent({ x, y });
    };

    const handleMouseUp = (e: MouseEvent) => {
      const currentX = (e.clientX - dragRect.left) / scale;
      const currentY = (e.clientY - dragRect.top) / scale;

      const x = Math.min(dragStart.x, currentX);
      const y = Math.min(dragStart.y, currentY);
      const width = Math.abs(dragStart.x - currentX);
      const height = Math.abs(dragStart.y - currentY);

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
  }, [isDragging, dragRect, dragStart, scale, selectedTool, onAddField, pageNumber]);

  return (
    <div
      className={cn(
        "absolute inset-0 z-10 select-none",
        selectedTool !== "selection" ? cn(
          "cursor-crosshair",
          selectedTool === 'signature' && "bg-blue-500/[0.01]",
          selectedTool === 'initial' && "bg-emerald-500/[0.01]",
          selectedTool === 'date' && "bg-amber-500/[0.01]",
          selectedTool === 'text' && "bg-purple-500/[0.01]"
        ) : "pointer-events-auto"
      )}
      onMouseDown={handleMouseDown}
      onClick={() => {
        if (selectedTool === "selection") {
          setSelectedFieldId("");
        }
      }}
    >

      {isDragging && dragStart && dragCurrent && (
        <div
          className={cn(
            "absolute border-2 shadow-xl flex items-center justify-center overflow-hidden rounded-none",
            selectedTool === 'signature' && "border-blue-500 bg-blue-500/10",
            selectedTool === 'initial' && "border-emerald-500 bg-emerald-500/10",
            selectedTool === 'date' && "border-amber-500 bg-amber-500/10",
            selectedTool === 'text' && "border-purple-500 bg-purple-500/10"
          )}
          style={{
            left: Math.min(dragStart.x, dragCurrent.x) * scale,
            top: Math.min(dragStart.y, dragCurrent.y) * scale,
            width: Math.abs(dragStart.x - dragCurrent.x) * scale,
            height: Math.abs(dragStart.y - dragCurrent.y) * scale,
            zIndex: 100,
          }}
        >
          <div className={cn(
            "absolute top-0 left-0 text-white text-[9px] font-semibold px-1.5 py-0.5 uppercase tracking-tighter rounded-none",
            selectedTool === 'signature' && "bg-blue-500",
            selectedTool === 'initial' && "bg-emerald-500",
            selectedTool === 'date' && "bg-amber-500",
            selectedTool === 'text' && "bg-purple-500"
          )}>
            {selectedTool}
          </div>
        </div>
      )}
    </div>
  );
});

DrawingOverlay.displayName = "DrawingOverlay";
