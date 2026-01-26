import { SignatureFieldData } from "@/components/signature-field";
import { useSignersStore } from "@/stores/signersStore";
import { useEffect } from "react";

interface Signer {
    email: string;
    name?: string;
}

/**
 * Hook to sync signers from multiple sources (URL params, signature fields, manual additions)
 */
export function useSignersSync(
    signatureFields: SignatureFieldData[], // Kept for API compatibility if needed, but unused for manual sync
    setManualSigners: (signers: Signer[]) => void,
    manualSigners: Signer[]
) {
    const recipientSigners = useSignersStore((s) => s.signers);

    // Sync from global store (New Document Dialog / URL) to local manual store
    useEffect(() => {
        // Only if local manual store is empty or we want to force sync initially?
        // Actually, we want to ensure manualSigners matches recipientSigners + maybe allow additional.
        // But `recipientSigners` comes from `signersStore` which is the "Handover" store.

        // Let's just sync one way: Global -> Local Manual.
        // If we modify Local Manual (Sidebar), we might update Global?

        // For now, let's just make sure "Manual Signers" starts with what's passed in.

        const sortedGlobal = [...recipientSigners].sort((a, b) => a.email.localeCompare(b.email));
        const sortedLocal = [...manualSigners].sort((a, b) => a.email.localeCompare(b.email));

        if (JSON.stringify(sortedGlobal) !== JSON.stringify(sortedLocal)) {
            setManualSigners(recipientSigners);
        }
    }, [recipientSigners, setManualSigners, manualSigners]);
}
