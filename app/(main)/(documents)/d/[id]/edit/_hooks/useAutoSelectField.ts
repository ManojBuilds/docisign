import { useDocumentEditorStore } from "@/stores/document-editor-store";
import { useEffect } from "react";

/**
 * Hook to auto-select the signature tool when clientEmails is in search params
 * This provides a better UX by allowing users to immediately start placing signature fields
 */
export function useAutoSelectField() {
    const setSelectedTool = useDocumentEditorStore((s) => s.setSelectedTool);

    useEffect(() => {
        setSelectedTool("signature");
    }, []);
}
