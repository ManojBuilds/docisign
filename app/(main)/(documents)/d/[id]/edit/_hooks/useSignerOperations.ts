import { SignatureFieldData } from "@/components/signature-field";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useCallback, useMemo } from "react";
import { toast } from "sonner";

interface Signer {
  email: string;
  name?: string;
}

/**
 * Hook to handle signer-related operations
 */
export function useSignerOperations(
  documentId: Id<"documents">,
  signatureFields: SignatureFieldData[],
  updateSignatureFieldInStore: (field: SignatureFieldData) => void,
  handleSaveField: (field: SignatureFieldData) => Promise<void>
) {
  const addSigner = useMutation(api.signers.addSigner);
  const sendForSigning = useMutation(api.signers.sendDocumentForSigning);

  const handleSignerAdd = useCallback(
    (signer: Signer) => {
      const unassignedFields = signatureFields.filter(
        (field) => !field.signerEmail
      );
      if (unassignedFields.length === 0) return;

      unassignedFields.forEach((field) => {
        const updatedField = {
          ...field,
          signerEmail: signer.email,
          signerName: signer.name,
        };
        updateSignatureFieldInStore(updatedField);
        handleSaveField(updatedField);
      });

      toast.success(
        `Assigned ${signer.email} to ${unassignedFields.length} field(s).`
      );
    },
    [signatureFields, updateSignatureFieldInStore, handleSaveField]
  );

  const handleSendForSigning = useCallback(
    async (signers: Signer[], customMessage?: string) => {
      for (const signer of signers) {
        await addSigner({
          documentId,
          email: signer.email,
          name: signer.name,
        });
      }

      await sendForSigning({
        documentId,
        customMessage: customMessage || undefined,
      });
    },
    [addSigner, documentId, sendForSigning]
  );

  const hasUnassignedFields = useMemo(
    () => signatureFields.some((field) => !field.signerEmail),
    [signatureFields]
  );

  return {
    handleSignerAdd,
    handleSendForSigning,
    hasUnassignedFields,
  };
}
