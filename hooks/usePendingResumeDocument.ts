"use client";

import { api } from "@/convex/_generated/api";
import { PENDING_DOC_KEY } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useRouter } from "nextjs-toploader/app";
import { useEffect } from "react";

export function useResumePendingDocument() {
  const { userId } = useAuth()
  const createDocument = useMutation(api.documents.createDocument);
  const router = useRouter();

  useEffect(() => {
    if (!userId) return;

    const raw = localStorage.getItem(PENDING_DOC_KEY);
    if (!raw) return;

    const pending = JSON.parse(raw);

    async function resume() {
      try {
        const documentId = await createDocument({
          title: pending.title,
          originalFileName: pending.originalFileName,
          fileStorageId: pending.storageId,
          fileType: pending.fileType,
          fileSizeBytes: pending.fileSizeBytes,
          ownerId: userId as string,
          pageCount: 1,
          documentHash: pending.documentHash,
        });

        localStorage.removeItem(PENDING_DOC_KEY);

        const emails = pending.signers
          .map(encodeURIComponent)
          .join(",");

        router.replace(
          `/d/${documentId}/edit?clientEmails=${emails}`
        );
      } catch (err) {
        console.error(err);
      }
    }

    resume();
  }, [userId]);
}
