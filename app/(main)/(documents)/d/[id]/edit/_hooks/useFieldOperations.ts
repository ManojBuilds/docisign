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

  // Track the last assigned signer to enable cycling through signers
  const lastAssignedSignerEmail = useDocumentEditorStore((s) => s.lastAssignedSignerEmail);
  const setLastAssignedSignerEmail = useDocumentEditorStore((s) => s.setLastAssignedSignerEmail);

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

      // Get all unique signers (from props, store, and existing fields)
      const allSignersSet = new Set<string>();

      // Add signers from props
      signers.forEach(signer => allSignersSet.add(signer.email));

      // Add signers from store
      recipientSigners.forEach(signer => allSignersSet.add(signer.email));

      // Add signers from existing fields
      const currentFields = useDocumentEditorStore.getState().signatureFields;
      currentFields.forEach(field => {
        if (field.signerEmail) allSignersSet.add(field.signerEmail);
      });

      // Fallback: Check URL directly if stores haven't synced yet
      const urlParams = new URLSearchParams(window.location.search);
      const clientEmailsParam = urlParams.get("clientEmails");
      if (clientEmailsParam) {
        const emails = decodeURIComponent(clientEmailsParam).split(",");
        emails.forEach(email => allSignersSet.add(email.trim()));
      }

      const allSignersArray = Array.from(allSignersSet);

      let assignedSignerEmail = "";
      let assignedSignerName = "";

      if (allSignersArray.length > 0) {
        // Decide which signer to use
        // 1. Try to use the last assigned signer if they are still in the list
        if (lastAssignedSignerEmail && allSignersSet.has(lastAssignedSignerEmail)) {
          assignedSignerEmail = lastAssignedSignerEmail;
        } else {
          // 2. Default to the first signer
          assignedSignerEmail = allSignersArray[0];
          // Set this as the last assigned for next time
          setLastAssignedSignerEmail(assignedSignerEmail);
        }

        // Find the full signer object to get the name
        const fullSigner = [...signers, ...recipientSigners].find(s => s.email === assignedSignerEmail);
        assignedSignerName = fullSigner?.name || assignedSignerEmail;
      }

      const newField: SignatureFieldData = {
        id: tempId,
        fieldType,
        page,
        signerEmail: assignedSignerEmail,
        signerName: assignedSignerName,
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
      lastAssignedSignerEmail,
      setLastAssignedSignerEmail
    ]
  );

  const handleUpdateFieldInStore = useCallback(
    (updatedField: SignatureFieldData) => {
      // The store's updateSignatureFieldInStore now handles updating lastAssignedSignerEmail automatically
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

  // Function to reset the assignment cycle (useful when all fields are cleared)
  const resetAssignmentCycle = useCallback(() => {
    setLastAssignedSignerEmail(null);
  }, [setLastAssignedSignerEmail]);

  return {
    handleAddSignatureField,
    handleUpdateFieldInStore,
    handleSaveField,
    handleDeleteField,
    resetAssignmentCycle,
  };
}
