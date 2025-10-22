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
  CalendarDays,
  TextCursor,
  ALargeSmall
} from "lucide-react";
import { Button } from "@/components/ui/button";
import useMediaQuery from "@/hooks/use-media-query";
import { toast } from "sonner";
import { usePdfDimensions } from "./PdfDimensionsContext";
import { Id } from "@/convex/_generated/dataModel";
import { MobileFieldDrawer } from "./mobile-field-drawer";

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

// Helper functions to get field icon and color
const getFieldIcon = (fieldType: string) => {
  switch (fieldType) {
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

// Color palette for signers - allows up to 5 different signers to have distinct colors
const getSignerColor = (fieldType: string, assignedToEmail: string) => {
  if (!assignedToEmail) {
    // Unassigned fields use the default field type colors
    const defaultColors = {
      signature: "border-blue-500 bg-blue-200 text-blue-500",
      initial: "border-green-500 bg-green-200 text-blue-500",
      date: "border-yellow-500 bg-yellow-200 text-blue-500",
      text: "border-purple-500 bg-purple-200 text-blue-500",
    };
    return defaultColors[fieldType as keyof typeof defaultColors] || defaultColors.signature;
  }

  // Generate consistent color based on email hash
  const colors = [
    "border-pink-500 bg-pink-200 text-pink-900",
    "border-purple-500 bg-purple-200 text-purple-900",
    "border-indigo-500 bg-indigo-200 text-indigo-900",
    "border-green-500 bg-green-200 text-green-900",
    "border-yellow-500 bg-yellow-200 text-yellow-900",
    "border-red-500 bg-red-200 text-pink-900",
    "border-blue-500 bg-blue-200 text-blue-900",
    "border-teal-500 bg-teal-200 text-teal-900",
  ];

  // Calculate a hash from the email to get consistent color for each signer
  let hash = 0;
  for (let i = 0; i < assignedToEmail.length; i++) {
    hash = assignedToEmail.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

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

  const pixelX = localField.normalizedX * currentPageDimensions.width;
  const pixelY = localField.normalizedY * currentPageDimensions.height;
  const pixelWidth = localField.normalizedWidth * currentPageDimensions.width;
  const pixelHeight =
    localField.normalizedHeight * currentPageDimensions.height;

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
      className={`absolute select-none ${isDesktop ? "cursor-grab" : ""} ${isSelected ? "ring ring-blue-300 ring-opacity-50" : ""
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
        className={`w-full h-full border flex items-center justify-center relative group hover:bg-opacity-30 transition-all ${getSignerColor(localField.fieldType, localField.assignedToEmail)} ${!isDesktop ? "rounded-full" : ""}`}
      >

        {isDesktop ? (
          <div
            className="flex items-center capitalize text-sm w-full h-full justify-center"
            {...listeners}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(field.id);
            }}
          >
            {getFieldIcon(localField.fieldType)}
            <span className="ml-1 truncate">
              {localField.label || localField.fieldType}
            </span>
          </div>
        ) : (
          <>
            <div
              className="w-full h-full flex items-center justify-center cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(field.id);
                setIsDrawerOpen(true);
              }}
            >
              {getFieldIcon(localField.fieldType)}
            </div>
            <MobileFieldDrawer
              field={localField}
              isOpen={isDrawerOpen}
              onOpenChange={setIsDrawerOpen}
              onFieldUpdate={handleFieldUpdate}
              onSave={() => debouncedSave(localField)}
              onDelete={onDelete}
              onSelect={onSelect}
              isSaving={isSaving}
              // TODO: DO IT LATER
              signers={[]}
            />
          </>
        )}

        {isSelected && isDesktop && (
          <div
            className="absolute -top-8 left-0 flex space-x-1 z-10 pointer-events-auto"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <Button
              size="sm"
              variant="destructive"
              className="h-6 px-2"
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
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

    return (
      <div
        className={`absolute border-2 border-dashed border-opacity-50 bg-opacity-10 flex items-center justify-center text-xs ${getSignerColor(field.fieldType, field.assignedToEmail)}`}
        style={{
          left: pixelX,
          top: pixelY,
          width: pixelWidth,
          height: pixelHeight,
        }}
      >
        {getFieldIcon(field.fieldType)}
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
