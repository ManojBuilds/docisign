import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

/**
 * Hook to manage document data and file URL loading
 * Single query approach for optimal performance
 */
export function useDocumentData(documentId: Id<"documents">) {
  const documentData = useQuery(api.documents.getDocument, { documentId });

  // getDocument already returns fileUrl, no need for a second query
  const fileUrl = documentData?.fileUrl || "";

  return {
    document: documentData,
    fileUrl,
  };
}
