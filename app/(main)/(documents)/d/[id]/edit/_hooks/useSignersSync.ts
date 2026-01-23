import { SignatureFieldData } from "@/components/signature-field";
import { useSignersStore } from "@/stores/signersStore";
import { useEffect, useMemo } from "react";

interface Signer {
    email: string;
    name?: string;
}

/**
 * Hook to sync signers from multiple sources (URL params, signature fields, manual additions)
 */
export function useSignersSync(
    signatureFields: SignatureFieldData[],
    setSigners: (signers: Signer[]) => void,
    currentSigners: Signer[]
) {
    const recipientSigners = useSignersStore((s) => s.signers);

    // Memoize unique signers map to prevent unnecessary recalculations
    const uniqueSignersMap = useMemo(() => {
        const map = new Map<string, Signer>();

        // 1. Start with signers from the store (populated from URL or manual add)
        recipientSigners.forEach((s) => {
            map.set(s.email, {
                email: s.email,
                name: s.name || "",
            });
        });

        // 2. Add/Sync from signature fields (official source of document state)
        signatureFields.forEach((field) => {
            if (field.signerEmail) {
                map.set(field.signerEmail, {
                    email: field.signerEmail,
                    name: field.signerName || "",
                });
            }
        });

        return Array.from(map.values()).sort((a, b) =>
            a.email.localeCompare(b.email)
        );
    }, [signatureFields, recipientSigners]);

    // Sync to both stores only when changed
    useEffect(() => {
        const sortedCurrent = [...(currentSigners || [])].sort((a, b) =>
            a.email.localeCompare(b.email)
        );

        if (JSON.stringify(uniqueSignersMap) !== JSON.stringify(sortedCurrent)) {
            setSigners(uniqueSignersMap);
        }

        // Also sync to the global signers store so ShareDialog can see them
        const currentGlobalSigners = [...recipientSigners].sort((a, b) =>
            a.email.localeCompare(b.email)
        );

        if (JSON.stringify(uniqueSignersMap) !== JSON.stringify(currentGlobalSigners)) {
            useSignersStore.getState().setSigners(uniqueSignersMap);
        }
    }, [uniqueSignersMap, currentSigners, setSigners, recipientSigners]);

    return uniqueSignersMap;
}
