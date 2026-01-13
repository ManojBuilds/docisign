import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useState } from "react";

/**
 * Hook to manage document data and file URL loading
 */
export function useDocumentData(documentId: Id<"documents">) {
  const [fileUrl, setFileUrl] = useState<string>("");
  const document = useQuery(api.documents.getDocument, { documentId });

  return {
    document,
    fileUrl,
    setFileUrl,
  };
}
