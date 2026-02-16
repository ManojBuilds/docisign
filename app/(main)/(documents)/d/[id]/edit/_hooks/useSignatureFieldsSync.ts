import { SignatureFieldData } from "@/components/signature-field";
import { useDocumentEditorStore } from "@/stores/document-editor-store";
import { useEffect } from "react";

export interface SignatureField {
  _id: string;
  fieldType: SignatureFieldData["fieldType"];
  page: number;
  signerEmail: string;
  signerName?: string;
  rolePlaceholder?: string; // Add this
  isRequired: boolean;
  label?: string;
  status?: string;
  isCompleted?: boolean;
  auditTrail?: any;
  x: number;
  y: number;
  width: number;
  height: number;
  options?: string[];
  validation?: any;
  groupName?: string;
  checked?: boolean;
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
  const store = useDocumentEditorStore();
  const isLoaded = store.isLoaded;
  const signatureFields = store.signatureFields;
  const lastSavedFieldsJson = store.lastSavedFieldsJson;

  useEffect(() => {
    if (!documentFields) {
      return;
    }

    // Determine if we have unsaved changes
    // If we have unsaved changes, we should be careful about overwriting
    const hasUnsavedChanges = isLoaded && JSON.stringify(signatureFields) !== lastSavedFieldsJson;

    // We skip sync if:
    // 1. We are already loaded AND we have unsaved changes (to prevent losing work)
    // 2. BUT if we are NOT loaded, we MUST sync.
    if (isLoaded && hasUnsavedChanges) {
      return;
    }

    const validFields = documentFields.filter(
      (field): field is NonNullable<typeof field> => !!field
    );

    if (validFields.length === 0) {
      if (!isLoaded) {
        useDocumentEditorStore.setState({
          isLoaded: true,
          lastSavedFieldsJson: JSON.stringify([]),
        });
      }
      return;
    }

    const normalizedFields: SignatureFieldData[] = [];
    let allReady = true;

    // Use the first available page dimensions as a guess for unrendered pages
    const fallbackDims = Object.values(pageDimensions).find(d => d && d.width > 0) || { width: 595, height: 842 };

    for (const field of validFields) {
      const dims = pageDimensions[field.page] || fallbackDims;

      // We always push the field now, even if using fallback dims
      // This ensures recipients list is complete immediately
      normalizedFields.push({
        id: field._id,
        fieldType: field.fieldType,
        page: field.page,
        signerEmail: field.signerEmail,
        signerName: field.signerName || "",
        isRequired: field.isRequired,
        label: field.label,
        rolePlaceholder: field.rolePlaceholder,
        status: field.status as any,
        isCompleted: field.isCompleted,
        auditTrail: field.auditTrail,
        normalizedX: field.x / dims.width,
        normalizedY: field.y / dims.height,
        normalizedWidth: field.width / dims.width,
        normalizedHeight: field.height / dims.height,
        options: field.options,
        validation: field.validation,
        groupName: field.groupName,
        checked: field.checked,
      });

      if (!pageDimensions[field.page]) {
        allReady = false;
      }
    }

    // Update everything in one go if we are ready or have something to show
    if (normalizedFields.length > 0) {
      const currentFieldsJson = JSON.stringify(
        useDocumentEditorStore.getState().signatureFields
      );
      const nextFieldsJson = JSON.stringify(normalizedFields);

      // Only apply updates if the data actually changed
      if (currentFieldsJson !== nextFieldsJson) {
        useDocumentEditorStore.setState({
          isLoaded: allReady, // Only mark search as fully loaded if we have all dims
          signatureFields: normalizedFields,
          lastSavedFieldsJson: nextFieldsJson,
        });
      } else if (!isLoaded && allReady) {
        useDocumentEditorStore.setState({
          isLoaded: true,
          lastSavedFieldsJson: nextFieldsJson,
        });
      }
    } else if (normalizedFields.length > 0) {
      // Partially ready - just update fields via prop
      const currentFieldsJson = JSON.stringify(
        useDocumentEditorStore.getState().signatureFields
      );
      const nextFieldsJson = JSON.stringify(normalizedFields);

      if (currentFieldsJson !== nextFieldsJson) {
        setSignatureFields(normalizedFields);
      }
    }
  }, [documentFields, pageDimensions, isLoaded, signatureFields, lastSavedFieldsJson, setSignatureFields]);

  return {
    isLoaded,
    setIsLoaded: store.setIsLoaded,
    lastSavedFieldsJson,
    setLastSavedFieldsJson: store.setLastSavedFieldsJson,
  };
}
