
"use client";

import { useClerk } from "@clerk/nextjs";
import { useAction, useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import { api } from "@/convex/_generated/api";
import { computeFileHash } from "@/lib/crypto";
import { replaceVariablesInDocx } from "@/lib/process-template";
import { PENDING_DOC_KEY } from "@/lib/utils";
import { allContracts as allTemplates } from "content-collections";

interface UseTemplateUploadProps {
  templateId: string;
  templateTitle: string;
}

export function useTemplateUpload({
  templateId,
  templateTitle,
}: UseTemplateUploadProps) {
  const { user, redirectToSignIn } = useClerk();
  const router = useRouter();

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [showVariableDialog, setShowVariableDialog] = useState(false);

  const createDocumentFromTemplate = useMutation(
    api.templates.createDocumentFromTemplate
  );

  // Check if template has variables defined
  const template = allTemplates.find((t) => t.slug === templateId);
  const hasVariables = !!(template?.variables && (template.variables as any[]).length > 0);
  const downloadUrl = template?.docUrl;

  const docToPdf = useAction(api.conversion.docToPdfConversion);

  const handleTemplateUpload = useCallback(async (variables?: Record<string, string>) => {
    setIsUploading(true);
    setUploadProgress(0);
    setStatusMessage("Loading template...");

    try {
      // Step 1: Fetch the template file
      setUploadProgress(10);

      const fetchUrl = downloadUrl;
      const response = await fetch(fetchUrl!);

      if (!response.ok) {
        throw new Error("Failed to load template");
      }

      let blob = await response.blob();
      setUploadProgress(20);

      // Step 2: If variables provided, process the template
      let fileType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      if (variables) {
        const arrayBuffer = await blob.arrayBuffer();
        setUploadProgress(30);

        const processedBuffer = await replaceVariablesInDocx(arrayBuffer, variables);
        blob = new Blob([processedBuffer], {
          type: fileType,
        });
        setUploadProgress(40);
      } else {
        setUploadProgress(30);
      }

      const file = new File([blob], `${templateId}.docx`, {
        type: fileType,
      });

      setUploadProgress(50);

      // Step 3: Convert DOCX to PDF via Convex Action
      setStatusMessage("Converting to PDF...");
      const fileData = await blob.arrayBuffer();
      const { storageId: pdfStorageId, size: pdfSize } = await docToPdf({ fileData });
      setUploadProgress(85);

      setStatusMessage("Finalizing...");

      // Calculate hash for the processed document
      const documentHash = await computeFileHash(blob);

      if (!user) {
        setStatusMessage("Saving locally...");
        localStorage.setItem(
          PENDING_DOC_KEY,
          JSON.stringify({
            storageId: pdfStorageId,
            originalFileName: `${templateId}.docx`,
            fileSizeBytes: pdfSize,
            fileType: "pdf",
            title: templateTitle,
            documentHash,
            signers: [],
            createdAt: Date.now(),
          })
        );
        setUploadProgress(100);
        redirectToSignIn();
        return;
      }

      // Step 4: Create document record
      const documentId = await createDocumentFromTemplate({
        templateId,
        title: templateTitle,
        fileStorageId: pdfStorageId,
        fileSizeBytes: pdfSize,
        ownerId: user.id,
        originalFileName: `${templateId}.docx`,
        fileType: "pdf",
        pageCount: 1,
        documentHash,
      });

      setUploadProgress(100);
      setStatusMessage("Done!");
      toast.success("Template ready! Add signature fields and send.");

      // Step 7: Redirect to document editor
      router.push(`/d/${documentId}/edit`);
    } catch (error) {
      console.error("Template upload error:", error);
      toast.error("Failed to load template. Please try again.");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      setStatusMessage("");
    }
  }, [
    user,
    redirectToSignIn,
    templateId,
    templateTitle,
    downloadUrl,
    createDocumentFromTemplate,
    docToPdf,
    router,
  ]);


  const handleQuickStart = useCallback(() => {
    // If template has variables, show dialog
    if (hasVariables) {
      setShowVariableDialog(true);
    } else {
      // Otherwise upload directly
      handleTemplateUpload();
    }
  }, [hasVariables, handleTemplateUpload]);

  const handleVariableSubmit = useCallback(
    async (variables: Record<string, string>) => {
      setShowVariableDialog(false);
      await handleTemplateUpload(variables);
    },
    [handleTemplateUpload]
  );

  return {
    isUploading,
    uploadProgress,
    handleQuickStart,
    showVariableDialog,
    setShowVariableDialog,
    handleVariableSubmit,
    hasVariables,
    statusMessage,
  };
}
