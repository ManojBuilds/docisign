"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import SignatureField, {
  SignatureFieldData,
} from "@/components/signature-field";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Plus,
  Share,
  ChevronLeftIcon,
  ChevronRightIcon,
  ZoomOutIcon,
  ZoomInIcon,
  PenTool,
  CalendarDays,
  TextCursor,
  ALargeSmall,
  ArrowLeft
} from "lucide-react";
import { toast } from "sonner";
import { usePdfDimensions } from "@/components/PdfDimensionsContext";
import { ShareDialog } from "@/components/ShareDialog";
import PdfControls from "@/components/PdfControls";
import { UserButton } from "@clerk/clerk-react";
import Logo from "@/components/Logo";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { useDocumentEditorStore } from "@/store/document-editor-store";
import { DocumentEditorSidebar } from "@/components/DocumentEditorSidebar";
import { SignersSidebar } from "@/components/SignersSidebar";
import { useMobile } from "@/hooks/useMobile";
import PdfViewerWrapper from "@/components/pdf-viewer-wrapper";
import Link from "next/link";

interface Signer {
  email: string;
  name?: string;
}

export default function DocumentEditor() {
  const params = useParams();
  const { pageDimensions, scale, setScale } = usePdfDimensions();
  const isMobile = useMobile();
  const documentId = params.id as Id<"documents">;

  const {
    signatureFields,
    setSignatureFields,
    addSignatureField: addFieldToStore,
    updateSignatureFieldInStore,
    deleteSignatureFieldInStore,
    selectedFieldId,
    setSelectedFieldId,
    currentPage,
    setCurrentPage,
    signers,
    setSigners,
    setDocumentId,
  } = useDocumentEditorStore();

  // Queries
  const document = useQuery(api.documents.getDocument, { documentId });
  const getFileUrl = useMutation(api.documents.getFileUrl);

  // Mutations
  const addSignatureFieldMutation = useMutation(
    api.signatureFields.addSignatureField,
  );
  const updateSignatureFieldMutation = useMutation(
    api.signatureFields.updateSignatureField,
  );
  const deleteSignatureFieldMutation = useMutation(
    api.signatureFields.deleteSignatureField,
  );
  const addSigner = useMutation(api.signers.addSigner);
  const sendForSigning = useMutation(api.signers.sendDocumentForSigning);

  // State
  const [fileUrl, setFileUrl] = useState<string>("");
  const [numPages, setNumPages] = useState<number>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

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

  useEffect(() => {
    if (
      !document?.signatureFields ||
      Object.keys(pageDimensions).length === 0
    ) {
      return;
    }

    const initialFields: SignatureFieldData[] = document.signatureFields
      .filter((field): field is NonNullable<typeof field> => !!field)
      .reduce<SignatureFieldData[]>((acc, field) => {
        const dims = pageDimensions[field.page];
        if (!dims || dims.width === 0 || dims.height === 0) {
          // Skip fields where dimensions are not ready yet
          return acc;
        }

        const normalizedField: SignatureFieldData = {
          id: field._id,
          fieldType: field.fieldType,
          page: field.page,
          assignedToEmail: field.assignedToEmail,
          assignedToName: field.assignedToName || "",
          isRequired: field.isRequired,
          label: field.label,
          normalizedX: Math.max(0, Math.min(1, field.x / dims.width)),
          normalizedY: Math.max(0, Math.min(1, field.y / dims.height)),
          normalizedWidth: Math.max(
            0.01,
            Math.min(1, field.width / dims.width),
          ),
          normalizedHeight: Math.max(
            0.01,
            Math.min(1, field.height / dims.height),
          ),
        };

        return [...acc, normalizedField];
      }, []);

    // Update the store, but be careful not to overwrite fields on other pages
    // that might not have their dimensions ready yet.
    setSignatureFields(initialFields);
  }, [document, pageDimensions, setSignatureFields]);

  // Sync signers list from signature fields
  useEffect(() => {
    const uniqueSigners = new Map<string, Signer>();

    signatureFields.forEach((field) => {
      if (field.assignedToEmail && !uniqueSigners.has(field.assignedToEmail)) {
        uniqueSigners.set(field.assignedToEmail, {
          email: field.assignedToEmail,
          name: field.assignedToName || "",
        });
      }
    });

    const newSigners = Array.from(uniqueSigners.values());

    // Sort for stable comparison
    const sortedNew = [...newSigners].sort((a, b) =>
      a.email.localeCompare(b.email),
    );
    const sortedCurrent = [...(signers || [])].sort((a, b) =>
      a.email.localeCompare(b.email),
    );

    if (JSON.stringify(sortedNew) !== JSON.stringify(sortedCurrent)) {
      setSigners(newSigners);
    }
  }, [signatureFields, signers, setSigners]);

  const handleAddSignatureField = useCallback(
    async (fieldType: SignatureFieldData["fieldType"]) => {
      const dims = pageDimensions[currentPage];
      if (!dims) return;

      try {
        const x = 100;
        const y = 100;
        const width = 150;
        const height = 40;

        const fieldId = await addSignatureFieldMutation({
          documentId,
          fieldType,
          page: currentPage,
          x,
          y,
          width,
          height,
          assignedToEmail: "",
          assignedToName: "",
          isRequired: true,
        });

        const newField: SignatureFieldData = {
          id: fieldId,
          fieldType,
          page: currentPage,
          assignedToEmail: "",
          isRequired: true,
          label: "",
          normalizedX: x / dims.width,
          normalizedY: y / dims.height,
          normalizedWidth: width / dims.width,
          normalizedHeight: height / dims.height,
        };

        addFieldToStore(newField);
        setSelectedFieldId(fieldId);
        setIsMobileMenuOpen(false);
      } catch (error) {
        console.error(error);
        toast.error("Failed to add signature field");
      }
    },
    [
      pageDimensions,
      currentPage,
      addSignatureFieldMutation,
      documentId,
      addFieldToStore,
      setSelectedFieldId,
    ],
  );

  const handleUpdateFieldInStore = (updatedField: SignatureFieldData) => {
    updateSignatureFieldInStore(updatedField);
  };

  const handleSaveField = useCallback(
    async (fieldToSave: SignatureFieldData) => {
      const dims = pageDimensions[fieldToSave.page];
      if (!dims) return;

      try {
        await updateSignatureFieldMutation({
          fieldId: fieldToSave.id as Id<"signatureFields">,
          x: fieldToSave.normalizedX * dims.width,
          y: fieldToSave.normalizedY * dims.height,
          width: fieldToSave.normalizedWidth * dims.width,
          height: fieldToSave.normalizedHeight * dims.height,
          assignedToEmail: fieldToSave.assignedToEmail,
          assignedToName: fieldToSave.assignedToName,
          label: fieldToSave.label,
          isRequired: fieldToSave.isRequired,
        });
      } catch (error) {
        console.error("Error updating field:", error);
        toast.error("Failed to save field changes");
      }
    },
    [pageDimensions, updateSignatureFieldMutation],
  );


  const handleDeleteField = useCallback(
    async (fieldId: string) => {
      try {
        await deleteSignatureFieldMutation({
          fieldId: fieldId as Id<"signatureFields">,
        });

        deleteSignatureFieldInStore(fieldId);
        setSelectedFieldId("");
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete signature field");
      }
    },
    [
      deleteSignatureFieldMutation,
      deleteSignatureFieldInStore,
      setSelectedFieldId,
    ],
  );

  const handleSignerAdd = useCallback(
    (signer: Signer) => {
      const unassignedFields = signatureFields.filter(
        (field) => !field.assignedToEmail,
      );
      if (unassignedFields.length === 0) return;

      unassignedFields.forEach((field) => {
        const updatedField = {
          ...field,
          assignedToEmail: signer.email,
          assignedToName: signer.name,
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

  const hasUnassignedFields = signatureFields.some(
    (field) => !field.assignedToEmail,
  );

  if (!document) {
    return null;
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Desktop Navbar */}
      <div className="hidden md:flex justify-between items-center px-4 py-2.5 border-b bg-white">
        <div className="flex items-center space-x-4">
          <Link href={'/dashboard'} className={buttonVariants({ variant: "secondary" })}>
            <ArrowLeft />
            Back
          </Link>
          <span className="font-semibold text-lg truncate max-w-[8rem] md:max-w-xs">
            {document.title}
          </span>
          {/* <Logo href="/dashboard" /> */}
        </div>

        <div className="flex items-center space-x-4 flex-1">
          <div className="flex items-center justify-center space-x-4 flex-1">

            <PdfControls
              pageNumber={currentPage}
              numPages={numPages}
              scale={scale}
              onPageChange={setCurrentPage}
              onScaleChange={setScale}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          {" "}
          {/* <Button
            variant={"ghost"}
            className="border border-primary text-primary"
            onClick={handleSaveDraft}
            disabled={isSavingDraft}
          >
            {isSavingDraft ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Plus className="mr-2 h-4 w-4" />
            )}
            {isSavingDraft ? "Saving..." : "Save Draft"}
          </Button> */}

          <ShareDialog
            documentId={documentId}
            onSend={handleSendForSigning}
            hasUnassignedFields={hasUnassignedFields}
            onSignerAdd={handleSignerAdd}
          />
          <UserButton />
        </div>
      </div>

      {/* MobileNavbar */}
      <div className="md:hidden flex justify-between items-center p-3 border-b bg-white shadow-sm">
        <div className="flex items-center space-x-2">
          <Logo showText={false} href="/dashboard" />
        </div>

        <span className="font-medium text-sm truncate max-w-[10rem] inline-block">
          {document.title}
        </span>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="p-1"
            onClick={() => setIsShareDialogOpen(true)}
          >
            <Share className="w-4 h-4" />
          </Button>
          <Drawer open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <DrawerContent className="min-h-[40vh] rounded-t-lg">
              <DrawerTitle className="sr-only">Add fields</DrawerTitle>
              <div className="flex flex-col space-y-4 p-4">
                <h3 className="font-semibold text-lg">Add Fields</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => handleAddSignatureField("signature")}
                    className="flex flex-col items-center justify-center h-20 space-y-2"
                    variant="secondary"
                  >
                    <PenTool className="w-6 h-6" />
                    <span className="text-sm text-muted-foreground">
                      Signature
                    </span>
                  </Button>
                  <Button
                    onClick={() => handleAddSignatureField("initial")}
                    className="flex flex-col items-center justify-center h-20 space-y-2"
                    variant="secondary"
                  >
                    <TextCursor className="w-6 h-6" />
                    <span className="text-sm text-muted-foreground">
                      Initial
                    </span>
                  </Button>
                  <Button
                    onClick={() => handleAddSignatureField("date")}
                    className="flex flex-col items-center justify-center h-20 space-y-2"
                    variant="secondary"
                  >
                    <CalendarDays className="w-6 h-6" />
                    <span className="text-sm text-muted-foreground">Date</span>
                  </Button>
                  <Button
                    onClick={() => handleAddSignatureField("text")}
                    className="flex flex-col items-center justify-center h-20 space-y-2"
                    variant="secondary"
                  >
                    <ALargeSmall className="w-6 h-6" />
                    <span className="text-sm text-muted-foreground">Text</span>
                  </Button>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
          <UserButton />
        </div>
      </div>

      {/* Main Content Area with 3 Columns */}
      <div className="flex-1 flex min-h-0">
        {/* Left Sidebar - Tools */}
        <DocumentEditorSidebar onAddField={handleAddSignatureField} />

        {/* PDF Viewer Container - Center */}
        <div className="flex-1 min-h-0 relative overflow-hidden">
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
          {fileUrl && (
            <div className="h-full w-full ">
              <PdfViewerWrapper
                fileUrl={fileUrl}
                pageNumber={currentPage}
                onPageChange={setCurrentPage}
                onScaleChange={setScale}
                onNumPagesChange={setNumPages}
                showControls={false}
                className="h-full w-full"
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  onClick={() => setSelectedFieldId("")}
                  style={{
                    paddingBottom: isMobile ? "4rem" : "0",
                  }}
                >
                  <div className="pointer-events-auto">
                    {signatureFields
                      .filter((field) => field.page === currentPage)
                      .map((field) => (
                        <SignatureField
                          key={field.id}
                          field={field}
                          isEditMode={true}
                          isSelected={selectedFieldId === field.id}
                          onUpdate={handleUpdateFieldInStore}
                          onDelete={handleDeleteField}
                          onSelect={setSelectedFieldId}
                          onSave={handleSaveField}
                        />
                      ))}
                  </div>
                </div>
              </PdfViewerWrapper>
            </div>
          )}
        </div>

        {/* Right Sidebar - Signers */}
        <SignersSidebar documentId={documentId} />
      </div>

      {/* Mobile Share Dialog */}
      {isShareDialogOpen && (
        <ShareDialog
          documentId={documentId}
          onSend={handleSendForSigning}
          open={isShareDialogOpen}
          onOpenChange={setIsShareDialogOpen}
          hasUnassignedFields={hasUnassignedFields}
          onSignerAdd={handleSignerAdd}
        />
      )}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg">
        <div className="flex items-center justify-between p-3">
          {/* Page Navigation */}
          <div className="flex items-center space-x-3">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage <= 1}
            >
              <ChevronLeftIcon />
            </Button>
            <div className="text-xs font-medium min-w-[2rem] text-center">
              {currentPage}/{numPages}
            </div>
            <Button
              variant="secondary"
              size="icon"
              onClick={() =>
                setCurrentPage(Math.min(numPages, currentPage + 1))
              }
              disabled={currentPage >= numPages}
              className="px-3"
            >
              <ChevronRightIcon />
            </Button>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setScale(Math.max(0.25, scale - 0.25))}
            >
              <ZoomOutIcon />
            </Button>
            <div className="text-xs font-medium min-w-[3rem] text-center">
              {Math.round(scale * 100)}%
            </div>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setScale(Math.min(5, scale + 0.25))}
            >
              <ZoomInIcon />
            </Button>
          </div>

          {/* Add Fields Button */}
          <Button
            onClick={() => setIsMobileMenuOpen(true)}
            className="px-3 fixed bottom-16 right-4 w-12 h-12 rounded-full aspect-square"
            size="lg"
          >
            <Plus className="w-8 h-8" />
          </Button>
        </div>
      </div>
    </div>
  );
}
