"use client";

import { useDocumentEditorStore } from "@/stores/document-editor-store";
import { lazy, memo, Suspense } from "react";
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
        (f) => f.page === pageNumber && f.status !== "signed" && !f.isCompleted
      )
    )
  );
  const selectedFieldId = useDocumentEditorStore((state) => state.selectedFieldId);

  return (
    <>
      <DrawingOverlay
        pageNumber={pageNumber}
        scale={scale}
        onAddField={onAddField}
      />

      <div className="pointer-events-auto absolute inset-0">
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
