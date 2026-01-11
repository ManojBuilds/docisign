"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import useMediaQuery from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { useDocumentEditorStore } from "@/stores/document-editor-store";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useDraggable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  ALargeSmall,
  CalendarDays,
  TextCursor,
  X
} from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { MobileFieldDrawer } from "./mobile-field-drawer";
import { usePdfDimensions } from "./PdfDimensionsContext";
import { SignatureIcon } from "./SignatureIcon";

export interface SignatureFieldData {
  id: string;
  fieldType: "signature" | "initial" | "date" | "text";
  normalizedX: number;
  normalizedY: number;
  normalizedWidth: number;
  normalizedHeight: number;
  page: number;
  signerEmail: string;
  isRequired: boolean;
  label?: string;
  signerName?: string;
  status?: "pending" | "sent" | "viewed" | "signed" | "declined";
  isCompleted?: boolean;
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
      return <SignatureIcon />;
    case "initial":
      return <TextCursor size={16} strokeWidth={1.5} />;
    case "date":
      return <CalendarDays size={16} strokeWidth={1.5} />;
    case "text":
      return <ALargeSmall size={16} strokeWidth={1.5} />;
    default:
      return <SignatureIcon />;
  }
};

// Color palette for signers - allows up to 5 different signers to have distinct colors
const getSignerColor = (fieldType: string, signerEmail: string) => {
  if (!signerEmail) {
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
  for (let i = 0; i < signerEmail.length; i++) {
    hash = signerEmail.charCodeAt(i) + ((hash << 5) - hash);
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
  const [isEditingLabel, setIsEditingLabel] = useState(false);

  const localFieldRef = useRef<SignatureFieldData>(field);
  const isResizingRef = useRef(false);
  const resizeStartRef = useRef<{
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
  } | null>(null);


  const { selectedTool } = useDocumentEditorStore();

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: field.id,
      disabled: !isEditMode || isResizingRef.current || (!isDesktop && isDrawerOpen) || selectedTool !== "selection" || field.isCompleted,
    });


  // Sync localField with prop changes
  useEffect(() => {
    setLocalField(field);
    localFieldRef.current = field;
  }, [field]);

  const onResizePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();

    // Ensure the field is selected when resizing
    onSelect(field.id);

    isResizingRef.current = true;

    resizeStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startWidth: localField.normalizedWidth,
      startHeight: localField.normalizedHeight,
    };

    window.addEventListener("pointermove", onResizePointerMove);
    window.addEventListener("pointerup", onResizePointerUp);
  };

  const onResizePointerMove = (e: PointerEvent) => {
    if (!isResizingRef.current || !resizeStartRef.current) return;

    const dx = (e.clientX - resizeStartRef.current.startX) / pdfViewerScale;
    const dy = (e.clientY - resizeStartRef.current.startY) / pdfViewerScale;

    const deltaWidth = dx / currentPageDimensions.width;
    const deltaHeight = dy / currentPageDimensions.height;

    const newWidth = Math.max(
      40 / currentPageDimensions.width,
      resizeStartRef.current.startWidth + deltaWidth
    );

    const newHeight = Math.max(
      24 / currentPageDimensions.height,
      resizeStartRef.current.startHeight + deltaHeight
    );

    handleFieldUpdate({
      normalizedWidth: Math.min(newWidth, 1 - localField.normalizedX),
      normalizedHeight: Math.min(newHeight, 1 - localField.normalizedY),
    });
  };

  const onResizePointerUp = () => {
    isResizingRef.current = false;
    resizeStartRef.current = null;

    window.removeEventListener("pointermove", onResizePointerMove);
    window.removeEventListener("pointerup", onResizePointerUp);

    if (onSave) {
      debouncedSave(localFieldRef.current);
    }
  };


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
      className={cn(
        "absolute select-none",
        isDesktop && selectedTool === "selection" ? "cursor-grab" : "",
        isSelected ? "ring ring-blue-300 ring-opacity-50" : "",
        selectedTool !== "selection" ? "pointer-events-none" : "pointer-events-auto"
      )}
      style={{
        left: pixelX * pdfViewerScale,
        top: pixelY * pdfViewerScale,
        width: (isDesktop ? pixelWidth : 40) * pdfViewerScale,
        height: (isDesktop ? pixelHeight : 40) * pdfViewerScale,
        ...style,
      }}
    >
      {isEditMode && !localField.isCompleted && (
        <div
          onPointerDown={onResizePointerDown}
          className={`absolute bottom-[-3px] right-[-3px] w-3 h-3 bg-white border-2 border-gray-400 cursor-se-resize rounded-none z-20 ${pixelWidth < 30 || pixelHeight < 30 ? 'w-2 h-2' : 'w-3 h-3'}`}
          style={{ pointerEvents: 'auto' }}
        />
      )}
      <div
        className={cn(
          "w-full h-full border flex items-center justify-center relative group hover:bg-opacity-30 transition-all backdrop-blur-[1px] rounded-none",
          getSignerColor(localField.fieldType, localField.signerEmail)
        )}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
        }}
      >
        {isDesktop ? (
          <div
            className="flex flex-col w-full h-full"
            {...listeners}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(field.id);
            }}
          >
            {/* Top controls bar */}
            {isSelected && !localField.isCompleted && (
              <div
                className="absolute w-fit -top-8 left-0 flex items-center space-x-1.5 z-30 pointer-events-auto bg-gray-900 text-white rounded-lg p-1.5 shadow-xl animate-in fade-in zoom-in-95 duration-200 cursor-default"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Field type selector */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 p-1 m-0 hover:bg-white/10 text-white rounded-md"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      {getFieldIcon(localField.fieldType)}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent onMouseDown={(e) => e.stopPropagation()} align="start" className="w-32">
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFieldUpdate({ fieldType: "signature" });
                      }}
                      className="flex items-center gap-2 text-xs py-2"
                    >
                      <SignatureIcon className="w-3.5 h-3.5" />
                      Signature
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFieldUpdate({ fieldType: "initial" });
                      }}
                      className="flex items-center gap-2 text-xs py-2"
                    >
                      <TextCursor size={14} />
                      Initial
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFieldUpdate({ fieldType: "date" });
                      }}
                      className="flex items-center gap-2 text-xs py-2"
                    >
                      <CalendarDays size={14} />
                      Date
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFieldUpdate({ fieldType: "text" });
                      }}
                      className="flex items-center gap-2 text-xs py-2"
                    >
                      <ALargeSmall size={14} />
                      Text
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="w-[1px] h-3 bg-white/20 mx-0.5" />

                {/* Editable label */}
                <input
                  type="text"
                  value={localField.label || ""}
                  onChange={(e) => {
                    handleFieldUpdate({ label: e.target.value });
                  }}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                  }}
                  onKeyUp={(e) => {
                    e.stopPropagation();
                  }}
                  className="h-5 px-1.5 text-[10px] font-bold border-none focus:outline-none focus:ring-0 bg-white/10 rounded border border-white/5 hover:bg-white/15 transition-colors placeholder:text-white/30 text-white w-[80px]"
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    setIsEditingLabel(true);
                  }}
                  onBlur={() => setIsEditingLabel(false)}
                  placeholder="Field label"
                />

                <div className="w-[1px] h-3 bg-white/20 mx-0.5" />

                {/* Delete button - only show when not editing label */}
                {!isEditingLabel && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6 p-1 text-xs m-0 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-md"
                    onMouseDown={(e) => {
                      e.stopPropagation();
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(field.id);
                    }}
                  >
                    <X size={14} />
                  </Button>
                )}
              </div>
            )}

            {/* Main field content - icon and label */}
            <div className="flex items-center justify-center w-full h-full relative">
              {getFieldIcon(localField.fieldType)}
              {localField.isCompleted && (
                <div className="absolute inset-0 bg-green-500/10 flex items-center justify-center">
                  <div className="bg-green-500 text-white rounded-full p-0.5 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
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
      </div>
    </div>
  );
}

function SignatureField(props: SignatureFieldProps) {
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
        className={`absolute border-2 border-dashed border-opacity-50 flex items-center justify-center text-xs ${getSignerColor(field.fieldType, field.signerEmail)}`}
        style={{
          left: pixelX,
          top: pixelY,
          width: pixelWidth,
          height: pixelHeight,
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
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

export default React.memo(SignatureField);

