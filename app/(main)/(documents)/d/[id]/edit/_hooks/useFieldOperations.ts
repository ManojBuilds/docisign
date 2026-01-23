import { SignatureFieldData } from "@/components/signature-field";
import { useDocumentEditorStore } from "@/stores/document-editor-store";
import { useSignersStore } from "@/stores/signersStore";
import { useCallback, useRef } from "react";

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
  const lastAssignedSignerIndex = useRef(-1);

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
        // If we have signers, use smart assignment logic
        if (lastAssignedSignerIndex.current === -1) {
          // First time: assign to the first signer
          lastAssignedSignerIndex.current = 0;
        }

        // Always use the current index (don't auto-cycle)
        // This means new fields will be assigned to the same signer as the last one
        assignedSignerEmail = allSignersArray[lastAssignedSignerIndex.current];

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
    ]
  );

  const handleUpdateFieldInStore = useCallback(
    (updatedField: SignatureFieldData) => {
      // Check if the signer assignment was manually changed
      const currentFields = useDocumentEditorStore.getState().signatureFields;
      const existingField = currentFields.find(f => f.id === updatedField.id);

      if (existingField && existingField.signerEmail !== updatedField.signerEmail) {
        // Signer was manually changed - update the lastAssignedSignerIndex
        // to continue cycling from this signer
        const allSignersSet = new Set<string>();

        // Collect all signers
        signers.forEach(signer => allSignersSet.add(signer.email));
        recipientSigners.forEach(signer => allSignersSet.add(signer.email));
        currentFields.forEach(field => {
          if (field.signerEmail) allSignersSet.add(field.signerEmail);
        });

        const allSignersArray = Array.from(allSignersSet);
        const newSignerIndex = allSignersArray.indexOf(updatedField.signerEmail);

        if (newSignerIndex !== -1) {
          lastAssignedSignerIndex.current = newSignerIndex;
        }
      }

      updateSignatureFieldInStore(updatedField);
    },
    [updateSignatureFieldInStore, signers, recipientSigners]
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
    lastAssignedSignerIndex.current = -1;
  }, []);

  return {
    handleAddSignatureField,
    handleUpdateFieldInStore,
    handleSaveField,
    handleDeleteField,
    resetAssignmentCycle,
  };
}
