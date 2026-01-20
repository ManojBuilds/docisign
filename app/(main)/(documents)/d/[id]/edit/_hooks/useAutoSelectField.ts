import { useDocumentEditorStore } from "@/stores/document-editor-store";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Hook to auto-select the signature tool when clientEmails is in search params
 * This provides a better UX by allowing users to immediately start placing signature fields
 */
export function useAutoSelectField() {
    const searchParams = useSearchParams();
    const setSelectedTool = useDocumentEditorStore((s) => s.setSelectedTool);
    const hasAutoSelected = useRef(false);

    useEffect(() => {
        // Only auto-select once
        if (hasAutoSelected.current) return;

        const clientEmailsParam = searchParams.get("clientEmails");

        // Only auto-select tool if clientEmails is present in URL
        if (!clientEmailsParam) {
            hasAutoSelected.current = true;
            return;
        }

        // Auto-select the signature tool so user can start placing fields
        setSelectedTool("signature");
        hasAutoSelected.current = true;

        console.log("Auto-selected signature tool for placing fields");
    }, [searchParams, setSelectedTool]);
}
