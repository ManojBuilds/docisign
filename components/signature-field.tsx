"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { useDocumentEditorStore } from "@/stores/document-editor-store";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor, PointerSensor, useDraggable,
  useSensor,
  useSensors,
  TouchSensor
} from "@dnd-kit/core";
import { useQuery } from "convex/react";
import {
  ALargeSmall,
  CalendarDays,
  TextCursor,
  Trash2
} from "lucide-react";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { MobileFieldDrawer } from "./mobile-field-drawer";
import { usePdfDimensions } from "./PdfDimensionsContext";
import { SignatureIcon } from "./SignatureIcon";

import { FIELDS, FieldType } from "./fields/field-types";

export interface SignatureFieldData {
  id: string;
  fieldType: FieldType;
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
  signatureData?: string;
  rolePlaceholder?: string;
  // New properties for advanced fields
  options?: string[]; // For dropdown and radio
  validation?: {
    type: "email" | "text" | "number" | "date" | "regex";
    pattern?: string;
    message?: string;
  };
  groupName?: string; // For radio groups
  checked?: boolean; // For checkbox
  auditTrail?: {
    ip: string;
    timestamp: string;
    userAgent: string;
    signedAt: number;
  };
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
  const field = FIELDS.find(f => f.id === fieldType);
  if (field) {
    const Icon = field.icon;
    return <Icon className="w-full h-full" strokeWidth={1.5} />;
  }
  return <SignatureIcon />;
};

// Color palette for signers - allows up to 5 different signers to have distinct colors
const getSignerColor = (fieldType: string, signerEmail: string, rolePlaceholder?: string) => {
  if (rolePlaceholder && !signerEmail) {
    return {
      border: "border-amber-400",
      bg: "bg-amber-50/80",
      text: "text-amber-700",
      accent: "bg-amber-400",
      icon: "text-amber-500"
    };
  }

  if (!signerEmail) {
    const defaultThemes: Record<string, any> = {
      signature: { border: "border-blue-400", bg: "bg-blue-50/80", text: "text-blue-700", accent: "bg-blue-400", icon: "text-blue-500" },
      initial: { border: "border-emerald-400", bg: "bg-emerald-50/80", text: "text-emerald-700", accent: "bg-emerald-400", icon: "text-emerald-500" },
      date: { border: "border-orange-400", bg: "bg-orange-50/80", text: "text-orange-700", accent: "bg-orange-400", icon: "text-orange-500" },
      text: { border: "border-purple-400", bg: "bg-purple-50/80", text: "text-purple-700", accent: "bg-purple-400", icon: "text-purple-500" },
      email: { border: "border-rose-400", bg: "bg-rose-50/80", text: "text-rose-700", accent: "bg-rose-400", icon: "text-rose-500" },
      checkbox: { border: "border-cyan-400", bg: "bg-cyan-50/80", text: "text-cyan-700", accent: "bg-cyan-400", icon: "text-cyan-500" },
      dropdown: { border: "border-amber-400", bg: "bg-amber-50/80", text: "text-amber-700", accent: "bg-amber-400", icon: "text-amber-500" },
      radio: { border: "border-indigo-400", bg: "bg-indigo-50/80", text: "text-indigo-700", accent: "bg-indigo-400", icon: "text-indigo-500" },
    };
    return defaultThemes[fieldType] || defaultThemes.signature;
  }

  const themes = [
    { border: "border-rose-400", bg: "bg-rose-50/80", text: "text-rose-700", accent: "bg-rose-400", icon: "text-rose-500" },
    { border: "border-indigo-400", bg: "bg-indigo-50/80", text: "text-indigo-700", accent: "bg-indigo-400", icon: "text-indigo-500" },
    { border: "border-teal-400", bg: "bg-teal-50/80", text: "text-teal-700", accent: "bg-teal-400", icon: "text-teal-500" },
    { border: "border-amber-400", bg: "bg-amber-50/80", text: "text-amber-700", accent: "bg-amber-400", icon: "text-amber-500" },
    { border: "border-cyan-400", bg: "bg-cyan-50/80", text: "text-cyan-700", accent: "bg-cyan-400", icon: "text-cyan-500" },
    { border: "border-violet-400", bg: "bg-violet-50/80", text: "text-violet-700", accent: "bg-violet-400", icon: "text-violet-500" },
  ];

  let hash = 0;
  for (let i = 0; i < signerEmail.length; i++) {
    hash = signerEmail.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % themes.length;
  return themes[index];
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
  const isResizingRef = useRef(false);
  const resizeStartRef = useRef<{
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
  } | null>(null);


  const { selectedTool, signatureFields, manualSigners, documentId } = useDocumentEditorStore();
  const document = useQuery(api.documents.getDocument, documentId ? { documentId } : "skip");
  const theme = getSignerColor(localField.fieldType, localField.signerEmail, localField.rolePlaceholder);

  const signers = useMemo(() => {
    const uniqueSigners = new Map();
    manualSigners.forEach(s => uniqueSigners.set(s.email, {
      email: s.email,
      name: s.name,
      documentId: documentId as Id<"documents">,
      documentTitle: document?.title || "Document"
    }));
    signatureFields.forEach(f => {
      if (f.signerEmail && !uniqueSigners.has(f.signerEmail)) {
        uniqueSigners.set(f.signerEmail, {
          email: f.signerEmail,
          name: f.signerName || "",
          documentId: documentId as Id<"documents">,
          documentTitle: document?.title || "Document"
        });
      }
    });
    return Array.from(uniqueSigners.values()).sort((a, b) => a.email.localeCompare(b.email));
  }, [manualSigners, signatureFields, documentId, document?.title]);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: field.id,
      disabled: !isEditMode || isResizingRef.current || selectedTool !== "selection" || field.isCompleted,
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
    }, false); // don't sync to store yet
  };

  const onResizePointerUp = () => {
    isResizingRef.current = false;
    resizeStartRef.current = null;

    window.removeEventListener("pointermove", onResizePointerMove);
    window.removeEventListener("pointerup", onResizePointerUp);

    // Sync to store only on up to avoid lag
    onUpdate(localFieldRef.current);
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

  useEffect(() => {
    if (!isSelected || !isEditMode) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === "Backspace" || e.key === "Delete") {
        e.preventDefault();
        onDelete(field.id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSelected, isEditMode, onDelete, field.id]);

  const handleFieldUpdate = useCallback(
    (updates: Partial<SignatureFieldData>, syncToStore = true) => {
      const updatedField = { ...localFieldRef.current, ...updates };
      setLocalField(updatedField);
      localFieldRef.current = updatedField;
      if (syncToStore) {
        onUpdate(updatedField);
      }
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
        "absolute select-none transition-shadow",
        selectedTool === "selection" ? "cursor-grab active:cursor-grabbing" : "",
        isSelected ? "z-50" : "z-30",
        selectedTool !== "selection" ? "pointer-events-none" : "pointer-events-auto",
        !isResizingRef.current && "touch-none"
      )}
      style={{
        left: pixelX * pdfViewerScale,
        top: pixelY * pdfViewerScale,
        width: pixelWidth * pdfViewerScale,
        height: pixelHeight * pdfViewerScale,
        ...style,
      }}
    >
      {isEditMode && isSelected && !localField.isCompleted && (
        <>
          {/* Active selection frame - Subtle */}
          <div className="absolute inset-[-2px] border border-primary/40 ring-2 ring-primary/5 pointer-events-none" />

          {/* Resize Handles - Compact Corner */}
          <div
            onPointerDown={onResizePointerDown}
            className="absolute -bottom-1 -right-1 w-5 h-5 cursor-se-resize z-[100] flex items-end justify-end pointer-events-auto touch-none"
          >
            <div className="w-2.5 h-2.5 border-b-[3px] border-r-[3px] border-primary rounded-br-[1px]" />
          </div>

          {/* Deletion Tip - Purely Informational (Desktop Only) */}
          {isDesktop && (
            <div
              className="absolute -bottom-14 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-gray-950/95 text-white px-5 py-2.5 rounded-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 z-[120] transition-all cursor-default pointer-events-none whitespace-nowrap"
            >
              <div className="flex items-center gap-2 text-xs">
                <span className="font-medium text-gray-400">Use</span>
                <kbd className="bg-white/10 px-2 py-0.5 rounded-md border border-white/10 font-sans text-[10px] font-bold text-white shadow-sm ring-1 ring-white/5 uppercase tracking-tighter">Backspace</kbd>
                <span className="font-medium text-gray-400">to remove</span>
              </div>
            </div>
          )}
        </>
      )}
      <div
        className={cn(
          "w-full h-full border flex flex-col relative group transition-all backdrop-blur-[1px] rounded-none overflow-hidden",
          theme.border,
          theme.bg
        )}
      >
        {/* Adobe Sign Styled Accent Bar */}
        <div className={cn("absolute left-0 top-0 bottom-0 w-1 transition-colors", isSelected ? "bg-primary" : theme.accent)} />

        {/* Field Type Badge (Adobe style) */}
        <div className={cn("absolute top-0 left-1 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider transition-colors", isSelected ? "text-primary" : theme.text)}>
          {localField.fieldType}
        </div>

        <div
          className="flex flex-col w-full h-full relative cursor-grab"
          {...listeners}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(field.id);
            if (!isDesktop) {
              setIsDrawerOpen(true);
            }
          }}
        >
          {/* Main content - centered icon and label */}
          <div className="flex-1 flex items-center justify-center min-h-0 min-w-0 p-1">
            {isDesktop && (
              <div
                className={cn("shrink-0 transition-colors", isSelected ? "text-primary" : theme.icon)}
                style={{
                  width: `${Math.max(isDesktop ? 12 : 16, pixelHeight * pdfViewerScale * 0.45)}px`,
                  height: `${Math.max(isDesktop ? 12 : 16, pixelHeight * pdfViewerScale * 0.45)}px`
                }}
              >
                {getFieldIcon(localField.fieldType)}
              </div>
            )}
          </div>

          {/* Bottom Status / Signer Info */}
          <div
            className="px-2 bg-black/5 flex items-center justify-between overflow-hidden shrink-0"
            style={{ height: `${Math.max(isDesktop ? 8 : 12, pixelHeight * pdfViewerScale * 0.18)}px` }}
          >
            <span
              className="font-medium text-gray-400 uppercase tracking-tighter truncate max-w-[85%] select-none"
              style={{ fontSize: `${Math.max(isDesktop ? 6 : 8, pixelHeight * pdfViewerScale * 0.12)}px` }}
            >
              {localField.signerName || localField.signerEmail || localField.rolePlaceholder || "Unassigned"}
            </span>
            {localField.isRequired && (
              <span className="text-red-500 font-bold" style={{ fontSize: `${Math.max(8, pixelHeight * pdfViewerScale * 0.15)}px` }}>*</span>
            )}
          </div>

          {/* Desktop Control Bar */}
          {isDesktop && isSelected && !localField.isCompleted && (
            <div
              className="field-control-bar absolute w-fit -top-9 left-0 flex items-center space-x-1.5 z-30 pointer-events-auto bg-gray-900 text-white rounded-lg p-1.5 shadow-xl animate-in fade-in zoom-in-95 duration-200 cursor-default"
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
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    {getFieldIcon(localField.fieldType)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent onMouseDown={(e) => e.stopPropagation()} align="start" className="w-32">
                  {FIELDS.map((f) => {
                    const Icon = f.icon;
                    return (
                      <DropdownMenuItem
                        key={f.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFieldUpdate({ fieldType: f.id });
                        }}
                        className="flex items-center gap-2 text-xs py-2"
                      >
                        <Icon size={14} />
                        {f.label}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="w-[1px] h-3 bg-white/20 mx-0.5" />

              {/* Editable label */}
              <input
                type="text"
                value={localField.label || ""}
                onChange={(e) => handleFieldUpdate({ label: e.target.value })}
                onKeyDown={(e) => e.stopPropagation()}
                onKeyUp={(e) => e.stopPropagation()}
                className="h-5 px-1.5 text-[10px] font-semibold border-none focus:outline-none focus:ring-0 bg-white/10 rounded border border-white/5 hover:bg-white/15 transition-colors placeholder:text-white/30 text-white w-[80px]"
                placeholder="Field label"
              />
              <div className="w-[1px] h-3 bg-white/20 mx-0.5" />

              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 p-1 hover:bg-red-500/20 text-red-400 hover:text-red-500 rounded-md transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(field.id);
                }}
                title="Remove field"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Settings Drawer */}
        {!isDesktop && (
          <MobileFieldDrawer
            field={localField}
            isOpen={isDrawerOpen}
            onOpenChange={setIsDrawerOpen}
            onFieldUpdate={handleFieldUpdate}
            onSave={() => debouncedSave(localField)}
            onDelete={onDelete}
            onSelect={onSelect}
            isSaving={isSaving}
            // TODO: Pass actual signers here if needed
            signers={signers}
          />
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
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
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
        className={`absolute border-2 border-dashed border-opacity-50 flex items-center justify-center text-xs ${getSignerColor(field.fieldType, field.signerEmail, field.rolePlaceholder)}`}
        style={{
          left: pixelX,
          top: pixelY,
          width: pixelWidth,
          height: pixelHeight,
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
        }}
      >
        {getFieldIcon(field.fieldType)}
        <span className="ml-1 text-gray-700 truncate">
          {field.rolePlaceholder ? `[${field.rolePlaceholder}]` : field.fieldType}
        </span>
      </div>
    );
  }

  const handleDragStart = () => {
    props.onSelect(field.id);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
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

