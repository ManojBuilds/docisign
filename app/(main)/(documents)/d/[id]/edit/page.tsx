"use client";
import Logo from "@/components/Logo";
import { usePdfDimensions } from "@/components/PdfDimensionsContext";
import type { SignatureFieldData } from "@/components/signature-field";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMobile } from "@/hooks/useMobile";
import { useDocumentEditorStore } from "@/stores/document-editor-store";
import { useSignersStore } from "@/stores/signersStore";
import { useMutation, useQuery } from "convex/react";
import {
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import DocumentEditorLoading from "./loading";

// Lazy load heavy components
const ShareDialog = lazy(() => import("@/components/ShareDialog").then(m => ({ default: m.ShareDialog })));
const SignersSidebar = lazy(() => import("@/components/SignersSidebar").then(m => ({ default: m.SignersSidebar })));
const PdfViewerWrapper = lazy(() => import("@/components/pdf-viewer-wrapper"));
const ThumbnailSidebar = lazy(() => import("@/components/ThumbnailSidebar").then(m => ({ default: m.ThumbnailSidebar })));

// New Sub-components
import { EditorNavbar } from "./_components/EditorNavbar";
import { MobileBottomBar } from "./_components/MobileBottomBar";
import { MobileNavbar } from "./_components/MobileNavbar";
import { PageOverlay } from "./_components/PageOverlay";
import { ZoomControls } from "./_components/ZoomControls";

interface Signer {
  email: string;
  name?: string;
}

export default function DocumentEditor() {
  const params = useParams();
  const { pageDimensions, scale, setScale } = usePdfDimensions();
  const isMobile = useMobile();
  const documentId = params.id as Id<"documents">;

  // Granular store subscriptions
  const signatureFields = useDocumentEditorStore((s) => s.signatureFields);
  const setSignatureFields = useDocumentEditorStore((s) => s.setSignatureFields);
  const addFieldToStore = useDocumentEditorStore((s) => s.addSignatureField);
  const updateSignatureFieldInStore = useDocumentEditorStore((s) => s.updateSignatureFieldInStore);
  const deleteSignatureFieldInStore = useDocumentEditorStore((s) => s.deleteSignatureFieldInStore);
  const setSelectedFieldId = useDocumentEditorStore((s) => s.setSelectedFieldId);
  const currentPage = useDocumentEditorStore((s) => s.currentPage);
  const setCurrentPage = useDocumentEditorStore((s) => s.setCurrentPage);
  const signers = useDocumentEditorStore((s) => s.signers);
  const setSigners = useDocumentEditorStore((s) => s.setSigners);
  const setDocumentId = useDocumentEditorStore((s) => s.setDocumentId);
  const setSelectedTool = useDocumentEditorStore((s) => s.setSelectedTool);

  // Mutations
  const addSigner = useMutation(api.signers.addSigner);
  const sendForSigning = useMutation(api.signers.sendDocumentForSigning);
  const getFileUrl = useMutation(api.documents.getFileUrl);
  const saveSignatureFieldsMutation = useMutation(api.signatureFields.saveSignatureFields);

  // Queries
  const document = useQuery(api.documents.getDocument, { documentId });

  // Component State
  const [fileUrl, setFileUrl] = useState<string>("");
  const [numPages, setNumPages] = useState<number>(0);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lastSavedFieldsJson, setLastSavedFieldsJson] = useState<string>("");


  // Load file URL when document is loaded
  useEffect(() => {
    const loadFileUrl = async () => {
      if (document?.fileStorageId) {
        try {
          const url = await getFileUrl({ storageId: document.fileStorageId });
          if (url) setFileUrl(url);
        } catch (error) {
          console.error("Error loading file URL:", error);
        }
      }
    };

    loadFileUrl();
  }, [document?.fileStorageId, getFileUrl]);

  // Set the current document ID in the store.
  useEffect(() => {
    setDocumentId(documentId);
  }, [documentId, setDocumentId]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case 'v':
          setSelectedTool('selection');
          break;
        case 's':
          setSelectedTool('signature');
          break;
        case 'i':
          setSelectedTool('initial');
          break;
        case 'd':
          setSelectedTool('date');
          break;
        case 't':
          setSelectedTool('text');
          break;
        case 'escape':
          setSelectedTool('selection');
          setSelectedFieldId("");
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedTool, setSelectedFieldId]);

  useEffect(() => {
    if (!document?.signatureFields || isLoaded) {
      return;
    }

    // Identify which fields we can normalize right now
    const documentFields = document.signatureFields.filter((field): field is NonNullable<typeof field> => !!field);

    if (documentFields.length === 0) {
      setIsLoaded(true);
      setLastSavedFieldsJson(JSON.stringify([]));
      return;
    }

    const normalizedFields: SignatureFieldData[] = [];
    let allReady = true;

    for (const field of documentFields) {
      const dims = pageDimensions[field.page];
      if (dims && dims.width > 0 && dims.height > 0) {
        normalizedFields.push({
          id: field._id,
          fieldType: field.fieldType,
          page: field.page,
          signerEmail: field.signerEmail,
          signerName: field.signerName || "",
          isRequired: field.isRequired,
          label: field.label,
          status: field.status,
          isCompleted: field.isCompleted,
          normalizedX: field.x / dims.width,
          normalizedY: field.y / dims.height,
          normalizedWidth: field.width / dims.width,
          normalizedHeight: field.height / dims.height,
        });
      } else {
        allReady = false;
      }
    }

    // Only update the store when we have normalized some fields.
    // To prevent infinite loops, we check if the content is actually different.
    if (normalizedFields.length > 0) {
      const currentFieldsJson = JSON.stringify(useDocumentEditorStore.getState().signatureFields);
      const nextFieldsJson = JSON.stringify(normalizedFields);

      if (currentFieldsJson !== nextFieldsJson) {
        setSignatureFields(normalizedFields);
      }
    }

    if (allReady) {
      setIsLoaded(true);
      setLastSavedFieldsJson(JSON.stringify(normalizedFields));
    }
  }, [document?.signatureFields, pageDimensions, isLoaded, setSignatureFields]);

  const hasUnsavedChanges = useMemo(() => {
    return JSON.stringify(signatureFields) !== lastSavedFieldsJson;
  }, [signatureFields, lastSavedFieldsJson]);

  // Reset isLoaded when documentId changes
  useEffect(() => {
    setIsLoaded(false);
  }, [documentId]);

  // Get signers from the recipients store (URL/Manual additions)
  const recipientSigners = useSignersStore((s) => s.signers);

  // Sync signers list from both signature fields and the recipient store - Memoized for performance
  const uniqueSignersMap = useMemo(() => {
    const map = new Map<string, Signer>();

    // 1. Start with signers from the store (populated from URL or manual add)
    recipientSigners.forEach(s => {
      map.set(s.email, {
        email: s.email,
        name: s.name || "",
      });
    });

    // 2. Add/Sync from signature fields (official source of document state)
    signatureFields.forEach((field) => {
      if (field.signerEmail) {
        map.set(field.signerEmail, {
          email: field.signerEmail,
          name: field.signerName || "",
        });
      }
    });
    return Array.from(map.values()).sort((a, b) => a.email.localeCompare(b.email));
  }, [signatureFields, recipientSigners]);

  useEffect(() => {
    const sortedCurrent = [...(signers || [])].sort((a, b) =>
      a.email.localeCompare(b.email),
    );

    if (JSON.stringify(uniqueSignersMap) !== JSON.stringify(sortedCurrent)) {
      setSigners(uniqueSignersMap);
    }
  }, [uniqueSignersMap, signers, setSigners]);

  // Auto-place signature fields for client emails from query parameters
  const [autoPlaced, setAutoPlaced] = useState(false);

  useEffect(() => {
    if (autoPlaced) return;

    const urlParams = new URLSearchParams(window.location.search);
    const clientEmailsParam = urlParams.get('clientEmails');

    if (clientEmailsParam) {
      const clientEmails = clientEmailsParam.split(',').map(decodeURIComponent);

      // Add these emails to the signers store so they are available for assignment
      clientEmails.forEach(email => {
        useSignersStore.getState().addSigner({ email, name: "" });
      });

      console.log("Registered signers from URL:", clientEmails);
      setAutoPlaced(true);
    } else {
      setAutoPlaced(true);
    }
  }, [autoPlaced]);

  const handleSaveAllFields = useCallback(async () => {
    if (!isLoaded || Object.keys(pageDimensions).length === 0) {
      toast.error("Document is still loading");
      return;
    }

    // Check if any field missing dimensions for its page
    const fieldsMissingDims = signatureFields.filter(f => !pageDimensions[f.page] || pageDimensions[f.page].width === 0);
    if (fieldsMissingDims.length > 0) {
      toast.error(`Please wait while document pages load (Page ${fieldsMissingDims[0].page})`);
      return;
    }

    setIsSaving(true);
    try {
      const seen = new Set();
      const fieldsToSave = signatureFields
        .filter(field => {
          const key = `${field.fieldType}-${field.page}-${field.signerEmail || 'unassigned'}-${field.normalizedX.toFixed(4)}-${field.normalizedY.toFixed(4)}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        })
        .map(field => {
          const dims = pageDimensions[field.page] || { width: 0, height: 0 };
          // Convert normalized coordinates back to absolute for the DB
          return {
            id: field.id, // Include the ID
            fieldType: field.fieldType,
            page: field.page,
            x: field.normalizedX * dims.width,
            y: field.normalizedY * dims.height,
            width: field.normalizedWidth * dims.width,
            height: field.normalizedHeight * dims.height,
            signerEmail: field.signerEmail || "",
            signerName: field.signerName || "",
            isRequired: field.isRequired,
            label: field.label || "",
          };
        });

      await saveSignatureFieldsMutation({
        documentId,
        fields: fieldsToSave,
      });
      setIsLoaded(false); // Trigger re-sync to get official DB IDs
      setLastSavedFieldsJson(JSON.stringify(signatureFields));
      toast.success("All changes saved successfully");
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  }, [signatureFields, documentId, pageDimensions, saveSignatureFieldsMutation, isLoaded]);

  const handleAddSignatureField = useCallback(
    (
      fieldType: SignatureFieldData["fieldType"] = "text",
      dimensions?: { x: number; y: number; width: number; height: number },
      page: number = currentPage
    ) => {
      const dims = pageDimensions[page];
      if (!dims) return;

      const x = dimensions?.x ?? 100;
      const y = dimensions?.y ?? 100;
      const width = dimensions?.width ?? 150;
      const height = dimensions?.height ?? 40;

      const tempId = crypto.randomUUID();
      let firstSignerEmail = signers[0]?.email || recipientSigners[0]?.email || "";

      // Fallback: Check URL directly if stores haven't synced yet
      if (!firstSignerEmail) {
        const urlParams = new URLSearchParams(window.location.search);
        const clientEmailsParam = urlParams.get('clientEmails');
        if (clientEmailsParam) {
          firstSignerEmail = decodeURIComponent(clientEmailsParam.split(',')[0]);
        }
      }

      const newField: SignatureFieldData = {
        id: tempId,
        fieldType,
        page,
        signerEmail: firstSignerEmail,
        signerName: "", // We don't have the name in the URL fallback
        isRequired: true,
        label: "",
        normalizedX: x / dims.width,
        normalizedY: y / dims.height,
        normalizedWidth: width / dims.width,
        normalizedHeight: height / dims.height,
      };

      addFieldToStore(newField);
      setSelectedFieldId(tempId);
    },
    [pageDimensions, currentPage, addFieldToStore, setSelectedFieldId, signers, recipientSigners],
  );

  const handleUpdateFieldInStore = useCallback((updatedField: SignatureFieldData) => {
    updateSignatureFieldInStore(updatedField);
  }, [updateSignatureFieldInStore]);

  const handleSaveField = useCallback(
    async (fieldToSave: SignatureFieldData) => {
      updateSignatureFieldInStore(fieldToSave);
    },
    [updateSignatureFieldInStore],
  );


  const handleDeleteField = useCallback(
    (fieldId: string) => {
      deleteSignatureFieldInStore(fieldId);
      setSelectedFieldId("");
    },
    [deleteSignatureFieldInStore, setSelectedFieldId],
  );

  const handleSignerAdd = useCallback(
    (signer: Signer) => {
      const unassignedFields = signatureFields.filter(
        (field) => !field.signerEmail,
      );
      if (unassignedFields.length === 0) return;

      unassignedFields.forEach((field) => {
        const updatedField = {
          ...field,
          signerEmail: signer.email,
          signerName: signer.name,
        };
        updateSignatureFieldInStore(updatedField);
        handleSaveField(updatedField);
      });

      toast.success(
        `Assigned ${signer.email} to ${unassignedFields.length} field(s).`,
      );
    },
    [signatureFields, updateSignatureFieldInStore, handleSaveField],
  );

  const handleSendForSigning = useCallback(
    async (signers: Signer[], customMessage?: string) => {
      for (const signer of signers) {
        await addSigner({
          documentId,
          email: signer.email,
          name: signer.name,
        });
      }

      await sendForSigning({
        documentId,
        customMessage: customMessage || undefined,
      });
    },
    [addSigner, documentId, sendForSigning],
  );

  const hasUnassignedFields = useMemo(
    () => signatureFields.some((field) => !field.signerEmail),
    [signatureFields]
  );


  if (!document) {
    return <DocumentEditorLoading />;
  }

  if (isMobile) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
          <div className="mx-auto bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Desktop Recommended</h2>
          <p className="text-gray-600 mb-4">
            The document editor works best on a laptop or desktop for optimal experience.
            Please continue on a larger screen for the best editing experience.
          </p>
          <Link
            href="/dashboard"
            className={buttonVariants({ variant: "outline" })}
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <EditorNavbar
        documentId={documentId}
        onSave={handleSaveAllFields}
        isSaving={isSaving}
        hasUnsavedChanges={hasUnsavedChanges}
        onSendForSigning={handleSendForSigning}
        onSignerAdd={handleSignerAdd}
        hasUnassignedFields={hasUnassignedFields}
      />

      <MobileNavbar
        documentId={documentId}
        setIsShareDialogOpen={setIsShareDialogOpen}
        onAddField={(type) => handleAddSignatureField(type)}
      />

      {document?.status === "completed" && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center justify-center gap-2 text-amber-800 text-sm font-medium animate-in slide-in-from-top duration-300">
          <AlertCircle className="w-4 h-4 text-amber-500" />
          <span>This document is already completed. Adding new fields will re-open it for signature.</span>
        </div>
      )}

      {/* Main Content Area with 3 Columns */}
      <div className="flex-1 flex min-h-0 bg-transparent">

        {/* PDF Viewer Container - Center */}
        <div className="flex-1 min-h-0 relative overflow-hidden flex flex-col">
          <div
            className="absolute inset-0 -z-10 pointer-events-none"
            style={{
              backgroundImage: `
                           repeating-linear-gradient(22.5deg, transparent, transparent 2px, rgba(75, 85, 99, 0.06) 2px, rgba(75, 85, 99, 0.06) 3px, transparent 3px, transparent 8px),
                           repeating-linear-gradient(67.5deg, transparent, transparent 2px, rgba(107, 114, 128, 0.05) 2px, rgba(107, 114, 128, 0.05) 3px, transparent 3px, transparent 8px),
                           repeating-linear-gradient(112.5deg, transparent, transparent 2px, rgba(55, 65, 81, 0.04) 2px, rgba(55, 65, 81, 0.04) 3px, transparent 3px, transparent 8px),
                           repeating-linear-gradient(157.5deg, transparent, transparent 2px, rgba(31, 41, 55, 0.03) 2px, rgba(31, 41, 55, 0.03) 3px, transparent 3px, transparent 8px)
                         `,
            }}
          />
          <div className="flex-1 h-full w-full relative">
            {!fileUrl ? (
              <div className="flex-1 flex items-center justify-center h-full w-full bg-gray-50/50">
                <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-300">
                  <div className="mb-6 scale-90 opacity-80">
                    <Logo />
                  </div>
                  <div className="h-1 w-32 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary animate-indeterminate-progress rounded-full" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 h-full w-full flex">
                <ThumbnailSidebar
                  fileUrl={fileUrl}
                  numPages={numPages}
                  currentPage={currentPage}
                  onPageClick={setCurrentPage}
                />
                <div className="flex-1 relative h-full">
                  <Suspense fallback={
                    <div className="flex-1 flex items-center justify-center h-full w-full bg-gray-50/50">
                      <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-300">
                        <div className="mb-6 scale-90 opacity-80">
                          <Logo />
                        </div>
                        <div className="h-1 w-32 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-primary animate-indeterminate-progress rounded-full" />
                        </div>
                      </div>
                    </div>
                  }>
                    <PdfViewerWrapper
                      fileUrl={fileUrl}
                      pageNumber={currentPage}
                      onPageChange={setCurrentPage}
                      onScaleChange={setScale}
                      onNumPagesChange={setNumPages}
                      showControls={false}
                      className="h-full w-full"
                    >
                      {(pNum: number) => (
                        <PageOverlay
                          pageNumber={pNum}
                          scale={scale}
                          onAddField={handleAddSignatureField}
                          onUpdateField={handleUpdateFieldInStore}
                          onDeleteField={handleDeleteField}
                          onSelectField={setSelectedFieldId}
                          onSaveField={handleSaveField}
                        />
                      )}
                    </PdfViewerWrapper>
                  </Suspense>

                  <ZoomControls scale={scale} setScale={setScale} />
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right Sidebar - Signers */}
        <Suspense fallback={
          <aside className="w-[300px] bg-white border-l p-6 h-full flex flex-col space-y-6">
            <Skeleton className="h-20 w-full rounded-2xl" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-full rounded-xl" />
              <Skeleton className="h-10 w-full rounded-xl" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
          </aside>
        }>
          <SignersSidebar documentId={documentId} />
        </Suspense>
      </div>

      {/* Mobile Share Dialog */}
      {isShareDialogOpen && (
        <Suspense fallback={null}>
          <ShareDialog
            documentId={documentId}
            onSend={handleSendForSigning}
            open={isShareDialogOpen}
            onOpenChange={setIsShareDialogOpen}
            hasUnassignedFields={hasUnassignedFields}
            onSignerAdd={handleSignerAdd}
          />
        </Suspense>
      )}
      <MobileBottomBar
        currentPage={currentPage}
        numPages={numPages}
        setCurrentPage={setCurrentPage}
        scale={scale}
        setScale={setScale}
        onAddTextField={() => handleAddSignatureField("text")}
      />
    </div>
  );
}
