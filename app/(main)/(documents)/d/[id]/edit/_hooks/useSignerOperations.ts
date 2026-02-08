import { SignatureFieldData } from "@/components/signature-field";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useDocumentEditorStore } from "@/stores/document-editor-store";
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
    handleSaveField: (field: SignatureFieldData) => Promise<void>,
    handleSaveAllFields: () => Promise<void>,
    setIsLoaded: (isLoaded: boolean) => void
) {
    const sendForSigning = useMutation(api.signers.sendDocumentForSigning);

    const handleSignerAdd = useCallback(
        (signer: Signer) => {
            // Add to manual signers in document editor store
            useDocumentEditorStore.getState().addManualSigner(signer);

            const unassignedFields = signatureFields.filter(
                (field) => !field.signerEmail
            );
            if (unassignedFields.length === 0) {
                toast.info(`Added ${signer.email} to recipients.`);
                return;
            }

            unassignedFields.forEach((field) => {
                const updatedField = {
                    ...field,
                    signerEmail: signer.email,
                    signerName: signer.name,
                };
                updateSignatureFieldInStore(updatedField);
            });

            // Batch save all updated fields at once
            handleSaveAllFields();

            toast.success(
                `Assigned ${signer.email} to ${unassignedFields.length} field(s).`
            );
        },
        [signatureFields, updateSignatureFieldInStore, handleSaveAllFields]
    );

    const handleSendForSigning = useCallback(
        async (signers: Signer[], customMessage?: string) => {
            // Ensure all fields are saved to the database before sending.
            // This also ensures all assigned signers have their fields persisted.
            await handleSaveAllFields();

            // Notify the server to update document status and send emails.
            // Signers are derived on the server from the persisted signature fields.
            await sendForSigning({
                documentId,
                customMessage: customMessage || undefined,
            });

            // Force a re-fetch of signature fields from the database to get updated statuses
            setIsLoaded(false);
        },
        [documentId, sendForSigning, handleSaveAllFields, setIsLoaded]
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
