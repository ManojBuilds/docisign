import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useEffect } from "react";

/**
 * Hook to manage document data and file URL loading
 * Optimized to fetch fileUrl in parallel for faster loading
 */
export function useDocumentData(documentId: Id<"documents">) {
  const documentData = useQuery(api.documents.getDocument, { documentId });

  // Fetch fileUrl separately and in parallel for faster initial load
  const fileUrlDirect = useQuery(
    api.documents.getFileUrl,
    documentData?.fileStorageId ? { storageId: documentData.fileStorageId } : "skip"
  );

  // Use the direct fileUrl if available, otherwise fall back to documentData.fileUrl
  const fileUrl = fileUrlDirect || documentData?.fileUrl || "";

  // Preload the PDF file as soon as we have the URL
  useEffect(() => {
    if (fileUrl && typeof window !== 'undefined') {
      // Create a link element to trigger browser preload
      const link = window.document.createElement('link');
      link.rel = 'preload';
      link.as = 'fetch';
      link.href = fileUrl;
      link.crossOrigin = 'anonymous';
      window.document.head.appendChild(link);

      // Also start fetching in the background
      fetch(fileUrl, {
        method: 'HEAD',
        mode: 'cors',
        credentials: 'omit'
      }).catch(() => {
        // Ignore errors, this is just for preloading
      });

      return () => {
        if (link.parentNode) {
          window.document.head.removeChild(link);
        }
      };
    }
  }, [fileUrl]);

  return {
    document: documentData,
    fileUrl,
  };
}
