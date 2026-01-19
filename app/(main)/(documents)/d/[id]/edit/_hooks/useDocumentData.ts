import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

/**
 * Hook to manage document data and file URL loading
 */
export function useDocumentData(documentId: Id<"documents">) {
  const document = useQuery(api.documents.getDocument, { documentId });
  const fileUrl = document?.fileUrl || "";

  return {
    document,
    fileUrl,
  };
}
