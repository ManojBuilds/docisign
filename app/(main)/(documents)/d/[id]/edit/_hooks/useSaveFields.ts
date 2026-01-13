import { SignatureFieldData } from "@/components/signature-field";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

/**
 * Hook to handle saving signature fields to the database
 */
export function useSaveFields(
  documentId: Id<"documents">,
  signatureFields: SignatureFieldData[],
  pageDimensions: Record<number, { width: number; height: number }>,
  isLoaded: boolean,
  lastSavedFieldsJson: string,
  setIsLoaded: (loaded: boolean) => void,
  setLastSavedFieldsJson: (json: string) => void
) {
  const [isSaving, setIsSaving] = useState(false);
  const saveSignatureFieldsMutation = useMutation(
    api.signatureFields.saveSignatureFields
  );

  const hasUnsavedChanges = useMemo(() => {
    return JSON.stringify(signatureFields) !== lastSavedFieldsJson;
  }, [signatureFields, lastSavedFieldsJson]);

  const handleSaveAllFields = useCallback(async () => {
    if (!isLoaded || Object.keys(pageDimensions).length === 0) {
      toast.error("Document is still loading");
      return;
    }

    // Check if any field missing dimensions for its page
    const fieldsMissingDims = signatureFields.filter(
      (f) => !pageDimensions[f.page] || pageDimensions[f.page].width === 0
    );
    if (fieldsMissingDims.length > 0) {
      toast.error(
        `Please wait while document pages load (Page ${fieldsMissingDims[0].page})`
      );
      return;
    }

    setIsSaving(true);
    try {
      const seen = new Set();
      const fieldsToSave = signatureFields
        .filter((field) => {
          const key = `${field.fieldType}-${field.page}-${field.signerEmail || "unassigned"}-${field.normalizedX.toFixed(4)}-${field.normalizedY.toFixed(4)}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        })
        .map((field) => {
          const dims = pageDimensions[field.page] || { width: 0, height: 0 };
          // Convert normalized coordinates back to absolute for the DB
          return {
            id: field.id, // Include the ID
            fieldType: field.fieldType,
            page: field.page,
            x: field.normalizedX * dims.width,
            y: field.normalizedY * dims.height,
            width: field.normalizedWidth * dims.width,
            height: field.normalizedHeight * dims.height,
            signerEmail: field.signerEmail || "",
            signerName: field.signerName || "",
            isRequired: field.isRequired,
            label: field.label || "",
          };
        });

      await saveSignatureFieldsMutation({
        documentId,
        fields: fieldsToSave,
      });
      setIsLoaded(false); // Trigger re-sync to get official DB IDs
      setLastSavedFieldsJson(JSON.stringify(signatureFields));
      toast.success("All changes saved successfully");
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  }, [
    signatureFields,
    documentId,
    pageDimensions,
    saveSignatureFieldsMutation,
    isLoaded,
    setIsLoaded,
    setLastSavedFieldsJson,
  ]);

  return {
    isSaving,
    hasUnsavedChanges,
    handleSaveAllFields,
  };
}
