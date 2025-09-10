"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import { useDraggable } from "@dnd-kit/core";
import {
  PenTool,
  X,
  Settings,
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
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import useMediaQuery from "@/hooks/use-media-query";
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
import { Id } from "@/convex/_generated/dataModel";

export interface SignatureFieldData {
  id: Id<"signatureFields">;
  fieldType: "signature" | "initial" | "date" | "text";
  normalizedX: number;
  normalizedY: number;
  normalizedWidth: number;
  normalizedHeight: number;
  page: number;
  assignedToEmail: string;
  isRequired: boolean;
  label?: string;
  assignedToName?: string;
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

// Draggable Field Component
function DraggableSignatureField({
  field,
  isEditMode,
  isSelected,
  onUpdate,
  onDelete,
  onSelect,
  onSave,
  currentPageDimensions,
  pdfViewerScale,
}: SignatureFieldProps & {
  currentPageDimensions: any;
  pdfViewerScale: number;
}) {
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [localField, setLocalField] = useState<SignatureFieldData>(field);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const localFieldRef = useRef<SignatureFieldData>(field);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: field.id,
      disabled: !isEditMode || (!isDesktop && isDrawerOpen),
    });

  // Sync localField with prop changes
  useEffect(() => {
    setLocalField(field);
    localFieldRef.current = field;
  }, [field]);

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

  const settingsContent = (
    <>
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
        <Label htmlFor="assignedName">Assigned to Name (Optional)</Label>
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
          onChange={(e) => handleFieldUpdate({ label: e.target.value })}
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
    </>
  );

  const saveButton = (
    <Button
      size="sm"
      className="w-full"
      onClick={() => debouncedSave(localField)}
      disabled={isSaving}
    >
      {isSaving ? "Saving..." : "Save"}
    </Button>
  );

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: isDragging ? 1000 : "auto",
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`absolute select-none ${isDesktop ? "cursor-grab" : ""} ${
        isSelected ? "ring ring-blue-300 ring-opacity-50" : ""
      }`}
      style={{
        left: pixelX * pdfViewerScale,
        top: pixelY * pdfViewerScale,
        width: (isDesktop ? pixelWidth : 40) * pdfViewerScale,
        height: (isDesktop ? pixelHeight : 40) * pdfViewerScale,
        ...style,
      }}
    >
      <div
        className={`w-full h-full border border-opacity-70 bg-opacity-20 flex items-center justify-center relative group hover:bg-opacity-30 transition-all ${getFieldColor()} ${
          !isDesktop ? "rounded-full" : ""
        }`}
      >
        {hasUnsavedChanges && !isSaving && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full"></div>
        )}

        {isDesktop ? (
          <div
            className="flex items-center capitalize text-sm w-full h-full justify-center"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(field.id);
            }}
          >
            {getFieldIcon()}
            <span className="ml-1 truncate">
              {localField.label || localField.fieldType}
            </span>
          </div>
        ) : (
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger
              asChild
              onClick={(e) => {
                e.stopPropagation();
                onSelect(field.id);
              }}
            >
              <div className="w-full h-full flex items-center justify-center cursor-pointer">
                {getFieldIcon()}
              </div>
            </DrawerTrigger>
            <DrawerContent className="min-h-[70svh]">
              <DrawerHeader>
                <DrawerTitle>Field Settings</DrawerTitle>
              </DrawerHeader>
              <div className="p-4 overflow-y-auto space-y-4">
                {settingsContent}
              </div>
              <DrawerFooter>
                {saveButton}
                <Button
                  variant="destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(field.id);
                  }}
                >
                  Remove Field
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}

        {isSelected && (
          <div
            className="absolute -top-8 left-0 flex space-x-1 z-10 pointer-events-auto"
            onMouseDown={(e) => e.stopPropagation()}
          >
            {isDesktop ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button size="sm" variant="outline" className="h-6 px-2">
                    <Settings className="w-3 h-3" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 popover-content" side="top">
                  <div className="space-y-4">
                    {settingsContent}
                    {saveButton}
                  </div>
                </PopoverContent>
              </Popover>
            ) : null}
            {isDesktop && (
              <Button
                size="sm"
                variant="destructive"
                className="h-6 px-2"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(field.id);
                }}
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SignatureField(props: SignatureFieldProps) {
  const { field, isEditMode } = props;
  const { pageDimensions, scale: pdfViewerScale } = usePdfDimensions();
  const currentPageDimensions = pageDimensions[field.page];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      // For mouse users
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor),
  );

  if (
    !currentPageDimensions ||
    currentPageDimensions.width === 0 ||
    currentPageDimensions.height === 0
  ) {
    return null;
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { delta } = event;

    if (delta.x === 0 && delta.y === 0) return;

    const pixelWidth = field.normalizedWidth * currentPageDimensions.width;
    const pixelHeight = field.normalizedHeight * currentPageDimensions.height;
    const currentPixelX = field.normalizedX * currentPageDimensions.width;
    const currentPixelY = field.normalizedY * currentPageDimensions.height;

    // Calculate new position with bounds checking
    const newPixelX = Math.max(
      0,
      Math.min(
        currentPixelX + delta.x / pdfViewerScale,
        currentPageDimensions.width - pixelWidth,
      ),
    );
    const newPixelY = Math.max(
      0,
      Math.min(
        currentPixelY + delta.y / pdfViewerScale,
        currentPageDimensions.height - pixelHeight,
      ),
    );

    const newNormalizedX = newPixelX / currentPageDimensions.width;
    const newNormalizedY = newPixelY / currentPageDimensions.height;

    const updatedField = {
      ...field,
      normalizedX: newNormalizedX,
      normalizedY: newNormalizedY,
    };

    // Update immediately
    props.onUpdate(updatedField);

    // Save the changes
    if (props.onSave) {
      props.onSave(updatedField);
    }
  };

  const restrictToParentModifier = ({ transform }: any) => {
    const scaledPixelX =
      field.normalizedX * currentPageDimensions.width * pdfViewerScale;
    const scaledPixelY =
      field.normalizedY * currentPageDimensions.height * pdfViewerScale;
    const scaledPixelWidth =
      field.normalizedWidth * currentPageDimensions.width * pdfViewerScale;
    const scaledPixelHeight =
      field.normalizedHeight * currentPageDimensions.height * pdfViewerScale;

    const parentWidth = currentPageDimensions.width * pdfViewerScale;
    const parentHeight = currentPageDimensions.height * pdfViewerScale;

    const minX = -scaledPixelX;
    const maxX = parentWidth - scaledPixelWidth - scaledPixelX;
    const minY = -scaledPixelY;
    const maxY = parentHeight - scaledPixelHeight - scaledPixelY;

    return {
      ...transform,
      x: Math.max(minX, Math.min(transform.x, maxX)),
      y: Math.max(minY, Math.min(transform.y, maxY)),
    };
  };

  if (!isEditMode) {
    const pixelX = field.normalizedX * currentPageDimensions.width;
    const pixelY = field.normalizedY * currentPageDimensions.height;
    const pixelWidth = field.normalizedWidth * currentPageDimensions.width;
    const pixelHeight = field.normalizedHeight * currentPageDimensions.height;

    const getFieldIcon = () => {
      switch (field.fieldType) {
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
      return colors[field.fieldType] || colors.signature;
    };

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
        <span className="ml-1 text-gray-700 truncate">{field.fieldType}</span>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToParentModifier]}
    >
      <DraggableSignatureField
        {...props}
        currentPageDimensions={currentPageDimensions}
        pdfViewerScale={pdfViewerScale}
      />
    </DndContext>
  );
}
