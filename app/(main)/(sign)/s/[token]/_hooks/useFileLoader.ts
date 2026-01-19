import { api } from "@/convex/_generated/api";
import { useConvex, useMutation } from "convex/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface UseFileLoaderProps {
  accessToken: string;
  signingSession: any;
}

/**
 * Hook to handle file loading, viewing status, and downloads
 */
export function useFileLoader({ accessToken, signingSession }: UseFileLoaderProps) {
  const [fileUrl, setFileUrl] = useState<string>("");
  const [hasMarkedViewed, setHasMarkedViewed] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const convex = useConvex();
  const markAsViewed = useMutation(api.signers.markDocumentAsViewed);

  useEffect(() => {
    if (signingSession?.fileUrl) {
      setFileUrl(signingSession.fileUrl);
    }
  }, [signingSession?.fileUrl]);

  const markViewed = useCallback(async () => {
    if (signingSession && !hasMarkedViewed && signingSession.document) {
      try {
        await markAsViewed({ accessToken });
        setHasMarkedViewed(true);
      } catch (error) {
        console.error("Error marking as viewed:", error);
      }
    }
  }, [signingSession, hasMarkedViewed, markAsViewed, accessToken]);

  useEffect(() => {
    markViewed();
  }, [markViewed]);

  const handleDownload = useCallback(async () => {
    if (!signingSession?.document?.fileStorageId) return;

    setIsDownloading(true);
    try {
      const url = await convex.query(api.documents.getFileUrl, {
        storageId: signingSession.document.fileStorageId
      });
      if (url) {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = (signingSession.document.title || "document") + "-signed.pdf";
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        window.URL.revokeObjectURL(blobUrl);
      }
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error("Failed to download file");
    } finally {
      setIsDownloading(false);
    }
  }, [signingSession, convex]);

  return {
    fileUrl,
    isDownloading,
    handleDownload,
  };
}
