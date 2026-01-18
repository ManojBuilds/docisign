import { SignatureFieldData } from "@/components/signature-field";
import { useDocumentEditorStore } from "@/stores/document-editor-store";
import { useSignersStore } from "@/stores/signersStore";
import { useCallback } from "react";

interface Signer {
  email: string;
  name?: string;
}

/**
 * Hook to handle field operations (add, update, delete, save)
 */
export function useFieldOperations(
  pageDimensions: Record<number, { width: number; height: number }>,
  currentPage: number,
  signers: Signer[],
  addFieldToStore: (field: SignatureFieldData) => void,
  updateSignatureFieldInStore: (field: SignatureFieldData) => void,
  deleteSignatureFieldInStore: (id: string) => void,
  setSelectedFieldId: (id: string) => void
) {
  const recipientSigners = useSignersStore((s) => s.signers);

  const handleAddSignatureField = useCallback(
    (
      fieldType: SignatureFieldData["fieldType"] = "text",
      dimensions?: { x: number; y: number; width: number; height: number },
      page: number = currentPage
    ) => {
      const dims = pageDimensions[page];
      if (!dims) return;

      const x = dimensions?.x ?? 100;
      const y = dimensions?.y ?? 100;
      const width = dimensions?.width ?? 150;
      const height = dimensions?.height ?? 40;

      const tempId = crypto.randomUUID();

      // Get the latest signature fields from the store to find a potential signer
      const currentFields = useDocumentEditorStore.getState().signatureFields;
      const firstFieldWithSigner = currentFields.find(f => f.signerEmail);

      let firstSignerEmail =
        signers[0]?.email ||
        recipientSigners[0]?.email ||
        firstFieldWithSigner?.signerEmail ||
        "";

      // Fallback: Check URL directly if stores haven't synced yet
      if (!firstSignerEmail) {
        const urlParams = new URLSearchParams(window.location.search);
        const clientEmailsParam = urlParams.get("clientEmails");
        if (clientEmailsParam) {
          firstSignerEmail = decodeURIComponent(
            clientEmailsParam.split(",")[0]
          );
        }
      }

      const newField: SignatureFieldData = {
        id: tempId,
        fieldType,
        page,
        signerEmail: firstSignerEmail,
        signerName: firstFieldWithSigner?.signerName || "",
        isRequired: true,
        label: "",
        normalizedX: x / dims.width,
        normalizedY: y / dims.height,
        normalizedWidth: width / dims.width,
        normalizedHeight: height / dims.height,
      };

      addFieldToStore(newField);
      setSelectedFieldId(tempId);
    },
    [
      pageDimensions,
      currentPage,
      addFieldToStore,
      setSelectedFieldId,
      signers,
      recipientSigners,
    ]
  );

  const handleUpdateFieldInStore = useCallback(
    (updatedField: SignatureFieldData) => {
      updateSignatureFieldInStore(updatedField);
    },
    [updateSignatureFieldInStore]
  );

  const handleSaveField = useCallback(
    async (fieldToSave: SignatureFieldData) => {
      updateSignatureFieldInStore(fieldToSave);
    },
    [updateSignatureFieldInStore]
  );

  const handleDeleteField = useCallback(
    (fieldId: string) => {
      deleteSignatureFieldInStore(fieldId);
      setSelectedFieldId("");
    },
    [deleteSignatureFieldInStore, setSelectedFieldId]
  );

  return {
    handleAddSignatureField,
    handleUpdateFieldInStore,
    handleSaveField,
    handleDeleteField,
  };
}
