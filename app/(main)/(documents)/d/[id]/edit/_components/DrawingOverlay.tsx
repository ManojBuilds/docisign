"use client";

import { SignatureFieldData } from "@/components/signature-field";
import { cn } from "@/lib/utils";
import { useDocumentEditorStore } from "@/stores/document-editor-store";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { FIELDS } from "@/components/fields/field-types";
import { memo, useEffect, useState, useCallback } from "react";

interface DrawingOverlayProps {
  pageNumber: number;
  scale: number;
  onAddField: (fieldType: SignatureFieldData["fieldType"], dimensions: { x: number; y: number; width: number; height: number }, page: number) => void;
}

export const DrawingOverlay = memo(({ pageNumber, scale, onAddField }: DrawingOverlayProps) => {
  const selectedTool = useDocumentEditorStore((state) => state.selectedTool);
  const setSelectedFieldId = useDocumentEditorStore((state) => state.setSelectedFieldId);
  const setSelectedTool = useDocumentEditorStore((state) => state.setSelectedTool);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [dragCurrent, setDragCurrent] = useState<{ x: number; y: number } | null>(null);
  const [dragRect, setDragRect] = useState<DOMRect | null>(null);
  const [startTime, setStartTime] = useState<number>(0);

  // Get the field configuration for the selected tool
  const fieldConfig = FIELDS.find(field => field.id === selectedTool);

  // Map field types to their Tailwind classes (must be complete strings for Tailwind to detect)
  const getFieldColors = (fieldType: string) => {
    switch (fieldType) {
      case 'signature':
        return {
          border: 'border-blue-500',
          bg: 'bg-blue-500/20',
          bgSolid: 'bg-blue-500'
        };
      case 'initials':
        return {
          border: 'border-purple-500',
          bg: 'bg-purple-500/20',
          bgSolid: 'bg-purple-500'
        };
      case 'date':
        return {
          border: 'border-green-500',
          bg: 'bg-green-500/20',
          bgSolid: 'bg-green-500'
        };
      case 'text':
        return {
          border: 'border-amber-500',
          bg: 'bg-amber-500/20',
          bgSolid: 'bg-amber-500'
        };
      case 'checkbox':
        return {
          border: 'border-pink-500',
          bg: 'bg-pink-500/20',
          bgSolid: 'bg-pink-500'
        };
      default:
        return {
          border: 'border-blue-500',
          bg: 'bg-blue-500/20',
          bgSolid: 'bg-blue-500'
        };
    }
  };

  const colors = selectedTool ? getFieldColors(selectedTool) : null;

  const handleStart = useCallback((clientX: number, clientY: number, rect: DOMRect) => {
    if (selectedTool === "selection") return;

    const x = (clientX - rect.left) / scale;
    const y = (clientY - rect.top) / scale;

    setIsDragging(true);
    setDragRect(rect);
    setDragStart({ x, y });
    setDragCurrent({ x, y });
    setStartTime(Date.now());
  }, [selectedTool, scale]);

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!isDragging || !dragRect || !dragStart) return;
    const x = (clientX - dragRect.left) / scale;
    const y = (clientY - dragRect.top) / scale;
    setDragCurrent({ x, y });
  }, [isDragging, dragRect, dragStart, scale]);

  const handleEnd = useCallback((clientX: number, clientY: number) => {
    if (!isDragging || !dragRect || !dragStart) return;

    const currentX = (clientX - dragRect.left) / scale;
    const currentY = (clientY - dragRect.top) / scale;

    const x = Math.min(dragStart.x, currentX);
    const y = Math.min(dragStart.y, currentY);
    const width = Math.abs(dragStart.x - currentX);
    const height = Math.abs(dragStart.y - currentY);

    const duration = Date.now() - startTime;
    const isTap = duration < 250 && width < 10 && height < 10;

    if (isTap) {
      // Small tap: place default size centered at tap
      const defaultWidth = isDesktop ? 140 : 100;
      const defaultHeight = isDesktop ? 36 : 32;
      onAddField(selectedTool as SignatureFieldData["fieldType"], {
        x: dragStart.x - (defaultWidth / 2),
        y: dragStart.y - (defaultHeight / 2),
        width: defaultWidth,
        height: defaultHeight,
      }, pageNumber);
    } else {
      // Drag: place with drawn dimensions
      if (width < 20 || height < 10) {
        onAddField(selectedTool as SignatureFieldData["fieldType"], {
          x: dragStart.x,
          y: dragStart.y,
          width: isDesktop ? 150 : 110,
          height: isDesktop ? 40 : 36,
        }, pageNumber);
      } else {
        onAddField(selectedTool as SignatureFieldData["fieldType"], {
          x,
          y,
          width,
          height,
        }, pageNumber);
      }
    }

    setIsDragging(false);
    setDragStart(null);
    setDragCurrent(null);
    setDragRect(null);
    setSelectedTool("selection"); // Reset to selection tool after placing
  }, [isDragging, dragRect, dragStart, scale, startTime, selectedTool, isDesktop, onAddField, pageNumber, setSelectedTool]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    handleStart(e.clientX, e.clientY, (e.currentTarget as HTMLDivElement).getBoundingClientRect());
  }, [handleStart]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (selectedTool === "selection") return;
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY, (e.currentTarget as HTMLDivElement).getBoundingClientRect());
  }, [selectedTool, handleStart]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const handleMouseUp = (e: MouseEvent) => handleEnd(e.clientX, e.clientY);

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      handleEnd(touch.clientX, touch.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, handleMove, handleEnd]);

  if (!fieldConfig || !colors) return null;

  return (
    <div
      className={cn(
        "absolute inset-0 z-20 select-none",
        selectedTool !== "selection" ? cn(
          "touch-none cursor-crosshair animate-in fade-in duration-300",
          colors.border
        ) : "pointer-events-auto"
      )}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onClick={() => {
        if (selectedTool === "selection") {
          setSelectedFieldId("");
        }
      }}
    >
      {!isDesktop && selectedTool !== "selection" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-black/60 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-sm font-medium animate-pulse">
            Tap to place {fieldConfig.label.toLowerCase()}
          </div>
        </div>
      )}

      {isDragging && dragStart && dragCurrent && (
        <div
          className={cn(
            "absolute border-2 shadow-2xl flex items-center justify-center overflow-hidden rounded-none z-[100]",
            colors.border,
            colors.bg
          )}
          style={{
            left: Math.min(dragStart.x, dragCurrent.x) * scale,
            top: Math.min(dragStart.y, dragCurrent.y) * scale,
            width: Math.abs(dragStart.x - dragCurrent.x) * scale,
            height: Math.abs(dragStart.y - dragCurrent.y) * scale,
          }}
        >
          <div className={cn(
            "absolute top-0 left-0 text-white text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-wider rounded-none shrink-0",
            colors.bgSolid
          )}>
            {fieldConfig.label}
          </div>
        </div>
      )}
    </div>
  );
});

DrawingOverlay.displayName = "DrawingOverlay";
