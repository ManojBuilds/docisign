"use client";

import { useDocumentEditorStore } from "@/stores/document-editor-store";
import { lazy, memo, Suspense, useEffect, useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import { DrawingOverlay } from "./DrawingOverlay";

const SignatureField = lazy(() => import("@/components/signature-field").then(m => ({ default: m.default })));

interface PageOverlayProps {
  pageNumber: number;
  scale: number;
  onAddField: (fieldType: any, dimensions: any, page: number) => void;
  onUpdateField: (field: any) => void;
  onDeleteField: (id: string) => void;
  onSelectField: (id: string) => void;
  onSaveField: (field: any) => Promise<void>;
}

export const PageOverlay = memo(({
  pageNumber,
  scale,
  onAddField,
  onUpdateField,
  onDeleteField,
  onSelectField,
  onSaveField
}: PageOverlayProps) => {
  // Subscribe only to fields on THIS page
  const fields = useDocumentEditorStore(
    useShallow((state) =>
      state.signatureFields.filter(
        (f) => f.page === pageNumber
      )
    )
  );
  const selectedFieldId = useDocumentEditorStore((state) => state.selectedFieldId);
  const setSelectedFieldId = useDocumentEditorStore((state) => state.setSelectedFieldId);

  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Check if the click is on a portal (Radix UI dropdowns, etc.)
      const isPortal = !!target.closest('[data-radix-portal]') ||
        !!target.closest('[role="menu"]') ||
        !!target.closest('[role="listbox"]');

      // Check if the click is inside the signers sidebar
      const isSidebar = !!target.closest('#signers-sidebar');

      if (overlayRef.current && !overlayRef.current.contains(target) && !isPortal && !isSidebar) {
        // If the click is truly outside the overlay and not on a portal/sidebar, unselect the field
        setSelectedFieldId("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setSelectedFieldId]);

  return (
    <>
      <DrawingOverlay
        pageNumber={pageNumber}
        scale={scale}
        onAddField={onAddField}
      />

      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 z-20"
        onClick={() => {
          // Clicking on the overlay background should unselect the field
          if (selectedFieldId) {
            setSelectedFieldId("");
          }
        }}
      >
        <Suspense fallback={null}>
          {fields.map((field) => (
            <SignatureField
              key={field.id}
              field={field}
              isEditMode={true}
              isSelected={selectedFieldId === field.id}
              onUpdate={onUpdateField}
              onDelete={onDeleteField}
              onSelect={onSelectField}
              onSave={onSaveField}
            />
          ))}
        </Suspense>
      </div>
    </>
  );
});

PageOverlay.displayName = "PageOverlay";
