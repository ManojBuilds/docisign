import { useDocumentEditorStore } from "@/stores/document-editor-store";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Hook to auto-select the signature tool when clientEmails is in search params
 * This provides a better UX by allowing users to immediately start placing signature fields
 */
export function useAutoSelectField() {
    const searchParams = useSearchParams();
    const setSelectedTool = useDocumentEditorStore((s) => s.setSelectedTool);


    useEffect(() => {
        const clientEmailsParam = searchParams.get("clientEmails");
        if (clientEmailsParam) {
            setSelectedTool("signature");
        }
    }, [searchParams, setSelectedTool]);
}
