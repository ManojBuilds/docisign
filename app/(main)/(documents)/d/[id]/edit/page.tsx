"use client";

import { usePdfDimensions } from "@/components/PdfDimensionsContext";
import { Id } from "@/convex/_generated/dataModel";
import { useMobile } from "@/hooks/useMobile";
import { useDocumentEditorStore } from "@/stores/document-editor-store";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

// Components
import { CompletedDocumentBanner } from "./_components/CompletedDocumentBanner";
import { EditorNavbar } from "./_components/EditorNavbar";
import { MainContentArea } from "./_components/MainContentArea";
import { MobileBottomBar } from "./_components/MobileBottomBar";
import { MobileNavbar } from "./_components/MobileNavbar";
import { MobileRestrictionScreen } from "./_components/MobileRestrictionScreen";
import { ShareDialogWrapper } from "./_components/ShareDialogWrapper";
import { SignersSidebarWrapper } from "./_components/SignersSidebarWrapper";

// Hooks
import { useAutoPlaceFields } from "./_hooks/useAutoPlaceFields";
import { useDocumentData } from "./_hooks/useDocumentData";
import { useFieldOperations } from "./_hooks/useFieldOperations";
import { useKeyboardShortcuts } from "./_hooks/useKeyboardShortcuts";
import { useSaveFields } from "./_hooks/useSaveFields";
import { useSignatureFieldsSync } from "./_hooks/useSignatureFieldsSync";
import { useSignerOperations } from "./_hooks/useSignerOperations";
import { useSignersSync } from "./_hooks/useSignersSync";
import { useAutoSelectField } from "./_hooks/useAutoSelectField";

export default function DocumentEditor() {
  const params = useParams();
  const { pageDimensions, scale, setScale } = usePdfDimensions();
  const isMobile = useMobile();
  const documentId = params.id as Id<"documents">;

  // Local state
  const [numPages, setNumPages] = useState<number>(0);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  // Store selectors - granular subscriptions to prevent re-renders
  const signatureFields = useDocumentEditorStore((s) => s.signatureFields);
  const setSignatureFields = useDocumentEditorStore(
    (s) => s.setSignatureFields
  );
  const addFieldToStore = useDocumentEditorStore((s) => s.addSignatureField);
  const updateSignatureFieldInStore = useDocumentEditorStore(
    (s) => s.updateSignatureFieldInStore
  );
  const deleteSignatureFieldInStore = useDocumentEditorStore(
    (s) => s.deleteSignatureFieldInStore
  );
  const setSelectedFieldId = useDocumentEditorStore(
    (s) => s.setSelectedFieldId
  );
  const currentPage = useDocumentEditorStore((s) => s.currentPage);
  const setCurrentPage = useDocumentEditorStore((s) => s.setCurrentPage);
  const signers = useDocumentEditorStore((s) => s.signers);
  const setSigners = useDocumentEditorStore((s) => s.setSigners);
  const setDocumentId = useDocumentEditorStore((s) => s.setDocumentId);
  const setSelectedTool = useDocumentEditorStore((s) => s.setSelectedTool);

  // Custom hooks
  const { document, fileUrl } = useDocumentData(documentId);

  // Store state for sync and loading
  const isLoaded = useDocumentEditorStore((s) => s.isLoaded);
  const setIsLoaded = useDocumentEditorStore((s) => s.setIsLoaded);
  const lastSavedFieldsJson = useDocumentEditorStore(
    (s) => s.lastSavedFieldsJson
  );
  const setLastSavedFieldsJson = useDocumentEditorStore(
    (s) => s.setLastSavedFieldsJson
  );

  useKeyboardShortcuts(setSelectedTool, setSelectedFieldId);

  useSignatureFieldsSync(
    document?.signatureFields,
    pageDimensions,
    setSignatureFields
  );

  useSignersSync(signatureFields, setSigners, signers);

  useAutoPlaceFields();
  useAutoSelectField();

  const {
    handleAddSignatureField,
    handleUpdateFieldInStore,
    handleSaveField,
    handleDeleteField,
    resetAssignmentCycle,
  } = useFieldOperations(
    pageDimensions,
    currentPage,
    signers,
    addFieldToStore,
    updateSignatureFieldInStore,
    deleteSignatureFieldInStore,
    setSelectedFieldId
  );

  const { isSaving, hasUnsavedChanges, handleSaveAllFields } = useSaveFields(
    documentId,
    signatureFields,
    pageDimensions,
    isLoaded,
    lastSavedFieldsJson,
    setIsLoaded,
    setLastSavedFieldsJson
  );

  const { handleSignerAdd, handleSendForSigning, hasUnassignedFields } =
    useSignerOperations(
      documentId,
      signatureFields,
      updateSignatureFieldInStore,
      handleSaveField
    );

  // Set the current document ID in the store
  useEffect(() => {
    setDocumentId(documentId);
  }, [documentId, setDocumentId]);

  // Reset isLoaded and assignment cycle when documentId changes
  useEffect(() => {
    setIsLoaded(false);
    resetAssignmentCycle(); // Reset the assignment cycle when changing documents
  }, [documentId, setIsLoaded, resetAssignmentCycle]);

  // Memoized Banner to prevent double re-renders of the page
  const isCompleted = document?.status === "completed";
  const memoizedBanner = useMemo(() => {
    return <CompletedDocumentBanner isCompleted={isCompleted} />;
  }, [isCompleted]);

  // Mobile restriction
  if (isMobile) {
    return <MobileRestrictionScreen />;
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

      {memoizedBanner}

      {/* Main Content Area with 3 Columns */}
      <div className="flex-1 flex min-h-0 bg-transparent">
        {/* PDF Viewer Container - Center */}
        <MainContentArea
          fileUrl={fileUrl}
          numPages={numPages}
          currentPage={currentPage}
          scale={scale}
          onPageClick={setCurrentPage}
          onPageChange={setCurrentPage}
          onScaleChange={setScale}
          onNumPagesChange={setNumPages}
          onAddField={handleAddSignatureField}
          onUpdateField={handleUpdateFieldInStore}
          onDeleteField={handleDeleteField}
          onSelectField={setSelectedFieldId}
          onSaveField={handleSaveField}
        />

        {/* Right Sidebar - Signers */}
        <SignersSidebarWrapper documentId={documentId} />
      </div>

      {/* Mobile Share Dialog */}
      <ShareDialogWrapper
        isOpen={isShareDialogOpen}
        documentId={documentId}
        onSend={handleSendForSigning}
        onOpenChange={setIsShareDialogOpen}
        hasUnassignedFields={hasUnassignedFields}
        onSignerAdd={handleSignerAdd}
      />

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
