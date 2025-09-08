"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  PenTool,
  X,
  Settings,
  GripVertical,
  CalendarDays,
  TextCursor,
  ALargeSmall,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { usePdfDimensions } from "./PdfDimensionsContext";

export interface SignatureFieldData {
  id: string;
  fieldType: "signature" | "initial" | "date" | "text";
  normalizedX: number;
  normalizedY: number;
  normalizedWidth: number;
  normalizedHeight: number;
  page: number;
  assignedToEmail: string;
  isRequired: boolean;
  label?: string;
  assignedToName?: string; // Add this line
}

interface SignatureFieldProps {
  field: SignatureFieldData;
  isEditMode: boolean;
  isSelected: boolean;
  onUpdate: (field: SignatureFieldData) => void;
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
  onSave?: (field: SignatureFieldData) => Promise<void>;
}

export default function SignatureField({
  field,
  isEditMode,
  isSelected,
  onUpdate,
  onDelete,
  onSelect,
  onSave,
}: SignatureFieldProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [localField, setLocalField] = useState<SignatureFieldData>(field);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({
    x: 0,
    y: 0,
    width: 150,
    height: 40,
  });

  const fieldRef = useRef<HTMLDivElement>(null);
  const localFieldRef = useRef<SignatureFieldData>(field); // Add this ref

  const { pageDimensions, scale: pdfViewerScale } = usePdfDimensions();
  const currentPageDimensions = pageDimensions[field.page];

  // Update localFieldRef whenever localField changes
  useEffect(() => {
    localFieldRef.current = localField;
  }, [localField]);

  const debouncedSave = useCallback(
    async (updatedField: SignatureFieldData) => {
      if (!onSave) return;
      setIsSaving(true);
      try {
        await onSave(updatedField);
        setHasUnsavedChanges(false);
      } catch (error) {
        console.error(error);
        toast.error("Failed to save field changes");
      } finally {
        setIsSaving(false);
      }
    },
    [onSave],
  );

  const handleFieldUpdate = useCallback(
    (updates: Partial<SignatureFieldData>) => {
      const updatedField = { ...localFieldRef.current, ...updates };
      setLocalField(updatedField);
      onUpdate(updatedField);
      setHasUnsavedChanges(true);
    },
    [onUpdate],
  );

  useEffect(() => {
    // When a field has a width or height of 0, set it to a default value
    if (
      currentPageDimensions &&
      (localField.normalizedWidth === 0 || localField.normalizedHeight === 0)
    ) {
      const updates: Partial<SignatureFieldData> = {};
      if (localField.normalizedWidth === 0 && currentPageDimensions.width > 0) {
        updates.normalizedWidth = 150 / currentPageDimensions.width;
      }
      if (
        localField.normalizedHeight === 0 &&
        currentPageDimensions.height > 0
      ) {
        updates.normalizedHeight = 40 / currentPageDimensions.height;
      }
      if (Object.keys(updates).length > 0) {
        handleFieldUpdate(updates);
      }
    }
  }, [
    localField.normalizedWidth,
    localField.normalizedHeight,
    currentPageDimensions,
    handleFieldUpdate,
  ]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!currentPageDimensions) return;

      const currentLocalField = localFieldRef.current; // Use the ref here
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        e.preventDefault();
        const deltaX = clientX - dragStart.x;
        const deltaY = clientY - dragStart.y;

        const currentPixelX =
          currentLocalField.normalizedX * currentPageDimensions.width;
        const currentPixelY =
          currentLocalField.normalizedY * currentPageDimensions.height;
        const pixelWidth =
          currentLocalField.normalizedWidth * currentPageDimensions.width;
        const pixelHeight =
          currentLocalField.normalizedHeight * currentPageDimensions.height;

        const newPixelX = Math.max(
          0,
          Math.min(
            currentPixelX + deltaX,
            currentPageDimensions.width - pixelWidth,
          ),
        );
        const newPixelY = Math.max(
          0,
          Math.min(
            currentPixelY + deltaY,
            currentPageDimensions.height - pixelHeight,
          ),
        );

        const newNormalizedX = newPixelX / currentPageDimensions.width;
        const newNormalizedY = newPixelY / currentPageDimensions.height;

        handleFieldUpdate({
          normalizedX: newNormalizedX,
          normalizedY: newNormalizedY,
        });
        setDragStart({ x: clientX, y: clientY });
      }

      if (isResizing) {
        e.preventDefault();
        const deltaX = clientX - resizeStart.x;
        const deltaY = clientY - resizeStart.y;

        const newWidth = Math.max(
          50,
          Math.min(500, resizeStart.width + deltaX),
        );
        const newHeight = Math.max(
          20,
          Math.min(200, resizeStart.height + deltaY),
        );

        const newNormalizedWidth = newWidth / currentPageDimensions.width;
        const newNormalizedHeight = newHeight / currentPageDimensions.height;

        handleFieldUpdate({
          normalizedWidth: newNormalizedWidth,
          normalizedHeight: newNormalizedHeight,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      // Trigger save after dragging/resizing ends
      debouncedSave(localFieldRef.current);
    };

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleMouseMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleMouseMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [
    isDragging,
    isResizing,
    dragStart,
    resizeStart,
    currentPageDimensions,
    handleFieldUpdate,
    debouncedSave,
  ]);

  if (
    !currentPageDimensions ||
    currentPageDimensions.width === 0 ||
    currentPageDimensions.height === 0
  ) {
    return null;
  }

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    // Don't start dragging if clicking on interactive elements
    const target = e.target as HTMLElement;
    if (
      target.closest("button") ||
      target.closest('[role="dialog"]') ||
      target.closest(".popover-content")
    ) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX, y: clientY });
    onSelect(field.id);
  };

  const handleResizeStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    const pixelWidth = localField.normalizedWidth * currentPageDimensions.width;
    const pixelHeight =
      localField.normalizedHeight * currentPageDimensions.height;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    setResizeStart({
      x: clientX,
      y: clientY,
      width: pixelWidth,
      height: pixelHeight,
    });
  };

  const getFieldIcon = () => {
    switch (localField.fieldType) {
      case "signature":
        return <PenTool size={16} strokeWidth={1.5} />;
      case "initial":
        return <TextCursor size={16} strokeWidth={1.5} />;
      case "date":
        return <CalendarDays size={16} strokeWidth={1.5} />;
      case "text":
        return <ALargeSmall size={16} strokeWidth={1.5} />;
      default:
        return <PenTool size={16} strokeWidth={1.5} />;
    }
  };

  const getFieldColor = () => {
    const colors = {
      signature: "border-blue-500 bg-blue-200",
      initial: "border-green-500 bg-green-200",
      date: "border-yellow-500 bg-yellow-200",
      text: "border-purple-500 bg-purple-200",
    };
    return colors[localField.fieldType] || colors.signature;
  };

  const pixelX = localField.normalizedX * currentPageDimensions.width;
  const pixelY = localField.normalizedY * currentPageDimensions.height;
  const pixelWidth = localField.normalizedWidth * currentPageDimensions.width;
  const pixelHeight =
    localField.normalizedHeight * currentPageDimensions.height;

  if (!isEditMode) {
    return (
      <div
        className={`absolute border-2 border-dashed border-opacity-50 bg-opacity-10 flex items-center justify-center text-xs ${getFieldColor()}`}
        style={{
          left: pixelX,
          top: pixelY,
          width: pixelWidth,
          height: pixelHeight,
        }}
      >
        {getFieldIcon()}
        <span className="ml-1 text-gray-700 truncate">
          {localField.fieldType}
        </span>
      </div>
    );
  }

  return (
    <div
      ref={fieldRef}
      className={`absolute select-none ${
        isSelected ? "ring ring-blue-300 ring-opacity-50" : ""
      }`}
      style={{
        left: pixelX * pdfViewerScale,
        top: pixelY * pdfViewerScale,
        width: pixelWidth * pdfViewerScale,
        height: pixelHeight * pdfViewerScale,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(field.id);
      }}
    >
      <div
        className={`w-full h-full border border-opacity-70 bg-opacity-20 flex items-center justify-center relative group hover:bg-opacity-30 transition-all ${getFieldColor()}`}
        onMouseDown={isEditMode ? handleDragStart : undefined}
        onTouchStart={isEditMode ? handleDragStart : undefined}
      >
        {isSaving && (
          <div className="absolute -top-6 left-0 text-xs text-blue-600">
            Saving...
          </div>
        )}
        {hasUnsavedChanges && !isSaving && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full"></div>
        )}

        <div className="flex items-center pointer-events-none capitalize text-sm">
          {getFieldIcon()}
          <span className="ml-1 truncate max-w-[250px]">
            {localField.label || localField.fieldType}
          </span>
        </div>

        {isSelected && (
          <div
            className="absolute top-1 right-1 opacity-50 group-hover:opacity-100 cursor-grab"
            onMouseDown={(e) => {
              e.stopPropagation();
              handleDragStart(e);
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              handleDragStart(e);
            }}
          >
            <GripVertical className="w-3 h-3 text-gray-500" />
          </div>
        )}

        {/* Resize handle */}
        {isSelected && isEditMode && (
          <div
            className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 cursor-se-resize opacity-50 hover:opacity-100"
            onMouseDown={(e) => {
              e.stopPropagation();
              handleResizeStart(e);
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              handleResizeStart(e);
            }}
          />
        )}

        {isSelected && (
          <div className="absolute -top-8 left-0 flex space-x-1 z-10 pointer-events-auto">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-6 px-2"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Settings className="w-3 h-3" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-80 popover-content"
                side="top"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="fieldType">Field Type</Label>
                    <Select
                      value={localField.fieldType}
                      onValueChange={(value: any) =>
                        handleFieldUpdate({ fieldType: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="signature">Signature</SelectItem>
                        <SelectItem value="initial">Initial</SelectItem>
                        <SelectItem value="date">Date</SelectItem>
                        <SelectItem value="text">Text</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="assignedEmail">Assigned to Email</Label>
                    <Input
                      id="assignedEmail"
                      value={localField.assignedToEmail}
                      onChange={(e) =>
                        handleFieldUpdate({ assignedToEmail: e.target.value })
                      }
                      placeholder="signer@example.com"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="assignedName">
                      Assigned to Name (Optional)
                    </Label>
                    <Input
                      id="assignedName"
                      value={localField.assignedToName || ""}
                      onChange={(e) =>
                        handleFieldUpdate({ assignedToName: e.target.value })
                      }
                      placeholder="Signer's Name"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="label">Label (Optional)</Label>
                    <Input
                      id="label"
                      value={localField.label || ""}
                      onChange={(e) =>
                        handleFieldUpdate({ label: e.target.value })
                      }
                      placeholder="Field description"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="required"
                      checked={localField.isRequired}
                      onCheckedChange={(checked) =>
                        handleFieldUpdate({ isRequired: checked as boolean })
                      }
                    />
                    <Label htmlFor="required">Required</Label>
                  </div>
                  {/*<div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="width">Width (px)</Label>
                      <Input
                        id="width"
                        type="number"
                        min="50"
                        max="500"
                        value={Math.round(
                          localField.normalizedWidth *
                            currentPageDimensions.width,
                        )}
                        onChange={(e) =>
                          handleFieldUpdate({
                            normalizedWidth:
                              (parseInt(e.target.value) || 150) /
                              currentPageDimensions.width,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="height">Height (px)</Label>
                      <Input
                        id="height"
                        type="number"
                        min="20"
                        max="200"
                        value={Math.round(
                          localField.normalizedHeight *
                            currentPageDimensions.height,
                        )}
                        onChange={(e) =>
                          handleFieldUpdate({
                            normalizedHeight:
                              (parseInt(e.target.value) || 40) /
                              currentPageDimensions.height,
                          })
                        }
                      />
                    </div>
                  </div>*/}
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => debouncedSave(localField)}
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <Button
              size="sm"
              variant="destructive"
              className="h-6 px-2"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onDelete(field.id);
              }}
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
