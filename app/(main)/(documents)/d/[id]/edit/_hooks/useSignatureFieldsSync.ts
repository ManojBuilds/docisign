import { SignatureFieldData } from "@/components/signature-field";
import { useDocumentEditorStore } from "@/stores/document-editor-store";
import { useEffect } from "react";

interface SignatureField {
  _id: string;
  fieldType: SignatureFieldData["fieldType"];
  page: number;
  signerEmail: string;
  signerName?: string;
  isRequired: boolean;
  label?: string;
  status?: string;
  isCompleted?: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Hook to sync signature fields from the database to the store
 * Handles normalization of coordinates based on page dimensions
 */
export function useSignatureFieldsSync(
  documentFields: SignatureField[] | undefined,
  pageDimensions: Record<number, { width: number; height: number }>,
  setSignatureFields: (fields: SignatureFieldData[]) => void
) {
  const isLoaded = useDocumentEditorStore((s) => s.isLoaded);
  const setIsLoaded = useDocumentEditorStore((s) => s.setIsLoaded);
  const lastSavedFieldsJson = useDocumentEditorStore((s) => s.lastSavedFieldsJson);
  const setLastSavedFieldsJson = useDocumentEditorStore((s) => s.setLastSavedFieldsJson);

  useEffect(() => {
    if (!documentFields || isLoaded) {
      return;
    }

    const validFields = documentFields.filter(
      (field): field is NonNullable<typeof field> => !!field
    );

    if (validFields.length === 0) {
      useDocumentEditorStore.setState({
        isLoaded: true,
        lastSavedFieldsJson: JSON.stringify([]),
      });
      return;
    }

    const normalizedFields: SignatureFieldData[] = [];
    let allReady = true;

    for (const field of validFields) {
      const dims = pageDimensions[field.page];
      if (dims && dims.width > 0 && dims.height > 0) {
        normalizedFields.push({
          id: field._id,
          fieldType: field.fieldType,
          page: field.page,
          signerEmail: field.signerEmail,
          signerName: field.signerName || "",
          isRequired: field.isRequired,
          label: field.label,
          status: field.status as any,
          isCompleted: field.isCompleted,
          normalizedX: field.x / dims.width,
          normalizedY: field.y / dims.height,
          normalizedWidth: field.width / dims.width,
          normalizedHeight: field.height / dims.height,
        });
      } else {
        allReady = false;
      }
    }

    // Update everything in one go if we are ready
    if (allReady && normalizedFields.length > 0) {
      const currentFieldsJson = JSON.stringify(
        useDocumentEditorStore.getState().signatureFields
      );
      const nextFieldsJson = JSON.stringify(normalizedFields);

      const updates: Partial<any> = {
        isLoaded: true,
        lastSavedFieldsJson: nextFieldsJson,
      };

      if (currentFieldsJson !== nextFieldsJson) {
        updates.signatureFields = normalizedFields;
      }

      useDocumentEditorStore.setState(updates);
    } else if (normalizedFields.length > 0) {
      // Partially ready - just update fields
      const currentFieldsJson = JSON.stringify(
        useDocumentEditorStore.getState().signatureFields
      );
      const nextFieldsJson = JSON.stringify(normalizedFields);

      if (currentFieldsJson !== nextFieldsJson) {
        setSignatureFields(normalizedFields);
      }
    }
  }, [documentFields, pageDimensions, isLoaded, setSignatureFields]);

  return {
    isLoaded,
    setIsLoaded,
    lastSavedFieldsJson,
    setLastSavedFieldsJson,
  };
}
