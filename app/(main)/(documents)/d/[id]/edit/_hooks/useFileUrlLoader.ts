import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useEffect } from "react";

/**
 * Hook to load file URL from storage
 */
export function useFileUrlLoader(
  fileStorageId: string | undefined,
  setFileUrl: (url: string) => void
) {
  const getFileUrl = useMutation(api.documents.getFileUrl);

  useEffect(() => {
    const loadFileUrl = async () => {
      if (fileStorageId) {
        try {
          const url = await getFileUrl({ storageId: fileStorageId as any });
          if (url) setFileUrl(url);
        } catch (error) {
          console.error("Error loading file URL:", error);
        }
      }
    };

    loadFileUrl();
  }, [fileStorageId, getFileUrl, setFileUrl]);
}
