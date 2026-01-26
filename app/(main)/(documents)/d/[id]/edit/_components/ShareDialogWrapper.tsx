import { SignatureFieldData } from "@/components/signature-field";
import { Id } from "@/convex/_generated/dataModel";
import { lazy, memo, Suspense } from "react";

const ShareDialog = lazy(() =>
    import("@/components/ShareDialog").then((m) => ({ default: m.ShareDialog }))
);

interface Signer {
    email: string;
    name?: string;
}

interface ShareDialogWrapperProps {
    isOpen: boolean;
    documentId: Id<"documents">;
    onSend: (signers: Signer[], customMessage?: string) => Promise<void>;
    onOpenChange: (open: boolean) => void;
    hasUnassignedFields: boolean;
    onSignerAdd: (signer: Signer) => void;
    signatureFields?: SignatureFieldData[];
    signers?: Signer[];
}

/**
 * Wrapper for ShareDialog with lazy loading
 */
export const ShareDialogWrapper = memo(
    ({
        isOpen,
        documentId,
        onSend,
        onOpenChange,
        hasUnassignedFields,
        onSignerAdd,
        signatureFields,
        signers,
    }: ShareDialogWrapperProps) => {
        if (!isOpen) return null;

        return (
            <Suspense fallback={null}>
                <ShareDialog
                    documentId={documentId}
                    onSend={onSend}
                    open={isOpen}
                    onOpenChange={onOpenChange}
                    hasUnassignedFields={hasUnassignedFields}
                    onSignerAdd={onSignerAdd}
                    skipSignerSync={true}
                    signatureFields={signatureFields}
                    signers={signers}
                />
            </Suspense>
        );
    }
);

ShareDialogWrapper.displayName = "ShareDialogWrapper";
