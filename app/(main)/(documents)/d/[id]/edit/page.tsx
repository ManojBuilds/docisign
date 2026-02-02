"use client";

import { usePdfDimensions } from "@/components/PdfDimensionsContext";
import { Id } from "@/convex/_generated/dataModel";
import { useMobile } from "@/hooks/useMobile";
import { useDocumentEditorStore } from "@/stores/document-editor-store";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

// Components
const CompletedDocumentBanner = dynamic(
    () =>
        import("./_components/CompletedDocumentBanner").then(
            (mod) => mod.CompletedDocumentBanner
        ),
    { ssr: false }
);
const EditorNavbar = dynamic(
    () => import("./_components/EditorNavbar").then((mod) => mod.EditorNavbar),
    {
        ssr: false,
        loading: () => (
            <div className="h-[65px] w-full border-b bg-white flex items-center justify-between px-4 animate-pulse">
                <div className="flex items-center gap-4">
                    <div className="h-9 w-24 bg-gray-100 rounded-lg" />
                    <div className="h-6 w-48 bg-gray-100 rounded-md" />
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-9 w-32 bg-gray-100 rounded-lg" />
                    <div className="h-9 w-32 bg-gray-100 rounded-lg" />
                    <div className="h-8 w-8 bg-gray-100 rounded-full" />
                </div>
            </div>
        )
    }
);
const MainContentArea = dynamic(
    () => import("./_components/MainContentArea").then((mod) => mod.MainContentArea),
    {
        ssr: false,
        loading: () => (
            <div className="flex-1 flex min-h-0 bg-gray-50/50">
                {/* Thumbnail Sidebar Skeleton */}
                <div className="w-48 border-r bg-white h-full flex flex-col animate-pulse">
                    <div className="p-4 border-b h-[53px] flex items-center justify-between">
                        <div className="h-3 w-12 bg-gray-100 rounded" />
                        <div className="h-4 w-6 bg-gray-100 rounded" />
                    </div>
                    <div className="p-4 space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="space-y-2">
                                <div className="aspect-[3/4] w-full bg-gray-50 rounded-sm border border-gray-100" />
                                <div className="h-2 w-10 bg-gray-50 rounded mx-auto" />
                            </div>
                        ))}
                    </div>
                </div>
                {/* PDF Area Skeleton */}
                <div className="flex-1 flex items-center justify-center p-8">
                    <div className="w-[600px] aspect-[1/1.41] bg-white rounded-md shadow-sm border border-gray-100 animate-pulse" />
                </div>
            </div>
        )
    }
);
const MobileBottomBar = dynamic(
    () => import("./_components/MobileBottomBar").then((mod) => mod.MobileBottomBar),
    { ssr: false }
);
const MobileNavbar = dynamic(
    () => import("./_components/MobileNavbar").then((mod) => mod.MobileNavbar),
    { ssr: false }
);
const MobileAddFieldSheet = dynamic(
    () =>
        import("./_components/MobileAddFieldSheet").then(
            (mod) => mod.MobileAddFieldSheet
        ),
    { ssr: false }
);
const MobileFieldsDrawer = dynamic(
    () =>
        import("./_components/MobileFieldsDrawer").then(
            (mod) => mod.MobileFieldsDrawer
        ),
    { ssr: false }
);
const ShareDialogWrapper = dynamic(
    () =>
        import("./_components/ShareDialogWrapper").then(
            (mod) => mod.ShareDialogWrapper
        ),
    { ssr: false }
);
const SignersSidebarWrapper = dynamic(
    () =>
        import("./_components/SignersSidebarWrapper").then(
            (mod) => mod.SignersSidebarWrapper
        ),
    {
        ssr: false,
        loading: () => (
            <div className="w-[300px] border-l bg-white h-full flex flex-col animate-pulse">
                <div className="p-6 space-y-6">
                    <div className="flex flex-col gap-2">
                        <div className="h-4 w-20 bg-gray-100 rounded" />
                        <div className="h-20 w-full bg-gray-50 rounded-2xl border border-gray-100" />
                    </div>
                    <div className="space-y-4 pt-4">
                        <div className="h-10 w-full bg-gray-50 rounded-xl border border-gray-100" />
                        <div className="h-10 w-full bg-gray-50 rounded-xl border border-gray-100" />
                        <div className="h-10 w-full bg-gray-50 rounded-xl border border-gray-100" />
                    </div>
                </div>
            </div>
        )
    }
);

// Hooks
import { useAutoPlaceFields } from "./_hooks/useAutoPlaceFields";
import { useDocumentData } from "./_hooks/useDocumentData";
import { useFieldOperations } from "./_hooks/useFieldOperations";
import { useKeyboardShortcuts } from "./_hooks/useKeyboardShortcuts";
import { useSaveFields } from "./_hooks/useSaveFields";
import { SignatureField, useSignatureFieldsSync } from "./_hooks/useSignatureFieldsSync";
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
    const manualSigners = useDocumentEditorStore((s) => s.manualSigners);
    const setManualSigners = useDocumentEditorStore((s) => s.setManualSigners);
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

    const activeSigners = useMemo(() => {
        const uniqueSigners = new Map();
        manualSigners.forEach(s => uniqueSigners.set(s.email, s));
        signatureFields.forEach(f => {
            if (f.signerEmail && !uniqueSigners.has(f.signerEmail)) {
                uniqueSigners.set(f.signerEmail, {
                    email: f.signerEmail,
                    name: f.signerName || "",
                });
            }
        });
        return Array.from(uniqueSigners.values()).sort((a, b) => a.email.localeCompare(b.email));
    }, [manualSigners, signatureFields]);

    // Only signers who are assigned to signature fields (for sending purposes)
    const signersAssignedToFields = useMemo(() => {
        const uniqueSigners = new Map();
        signatureFields.forEach(f => {
            if (f.signerEmail && !uniqueSigners.has(f.signerEmail)) {
                uniqueSigners.set(f.signerEmail, {
                    email: f.signerEmail,
                    name: f.signerName || "",
                });
            }
        });
        return Array.from(uniqueSigners.values()).sort((a, b) => a.email.localeCompare(b.email));
    }, [signatureFields]);

    useKeyboardShortcuts(setSelectedTool, setSelectedFieldId);

    useSignatureFieldsSync(
        document?.signatureFields as SignatureField[],
        pageDimensions,
        setSignatureFields
    );

    useSignersSync(signatureFields, setManualSigners, manualSigners);

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
        activeSigners,
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
            handleSaveField,
            handleSaveAllFields,
            setIsLoaded
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

    const [isFieldsDrawerOpen, setIsFieldsDrawerOpen] = useState(false);
    const [isAddFieldSheetOpen, setIsAddFieldSheetOpen] = useState(false);

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
                signatureFields={signatureFields}
                signers={signersAssignedToFields}
            />

            <MobileNavbar
                documentId={documentId}
                setIsShareDialogOpen={setIsShareDialogOpen}
                onOpenAddFieldSheet={() => setIsAddFieldSheetOpen(true)}
                onOpenFieldsDrawer={() => setIsFieldsDrawerOpen(true)}
                onSave={handleSaveAllFields}
                isSaving={isSaving}
                hasUnsavedChanges={hasUnsavedChanges}
                signatureFields={signatureFields}
            />

            {memoizedBanner}

            {/* Main Content Area: full width on mobile, PDF + sidebar on desktop */}
            <div className="flex-1 flex min-h-0 bg-transparent md:pb-0">
                {/* PDF Viewer Container - full width on mobile, flex-1 on desktop */}
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

                {/* Right Sidebar - Signers (desktop only; mobile uses Fields drawer) */}
                <div className="hidden md:block shrink-0 w-[300px]">
                    <SignersSidebarWrapper documentId={documentId} />
                </div>
            </div>

            {/* Mobile: Add field sheet (Adobe Sign style) */}
            {isMobile && (
                <MobileAddFieldSheet
                    open={isAddFieldSheetOpen}
                    onOpenChange={setIsAddFieldSheetOpen}
                    onSelectType={(type) => setSelectedTool(type)}
                />
            )}
            {/* Mobile: Fields & signers drawer */}
            {isMobile && (
                <MobileFieldsDrawer
                    documentId={documentId}
                    open={isFieldsDrawerOpen}
                    onOpenChange={setIsFieldsDrawerOpen}
                />
            )}

            {/* Mobile Share Dialog */}
            <ShareDialogWrapper
                isOpen={isShareDialogOpen}
                documentId={documentId}
                onSend={handleSendForSigning}
                onOpenChange={setIsShareDialogOpen}
                hasUnassignedFields={hasUnassignedFields}
                onSignerAdd={handleSignerAdd}
                signatureFields={signatureFields}
                signers={signersAssignedToFields}
            />

            <MobileBottomBar
                currentPage={currentPage}
                numPages={numPages}
                setCurrentPage={setCurrentPage}
                scale={scale}
                setScale={setScale}
                onOpenAddFieldSheet={() => setIsAddFieldSheetOpen(true)}
            />
        </div>
    );
}
