"use client";

import { usePdfDimensions } from "@/components/PdfDimensionsContext";
import { useParams } from "next/navigation";
import { useCallback, useState } from "react";

import dynamic from "next/dynamic";
import {
  ErrorScreen,
  LoadingScreen,
  MainSigningView,
  WelcomeDialog
} from "./_components";

const CompletedScreen = dynamic(() => import("./_components/CompletedScreen").then(m => m.CompletedScreen));
const DeclineDialog = dynamic(() => import("./_components/DeclineDialog").then(m => m.DeclineDialog));
const SubmittingOverlay = dynamic(() => import("./_components/SubmittingOverlay").then(m => m.SubmittingOverlay));

import {
  useDocumentSubmission,
  useFieldNavigation,
  useFileLoader,
  useSignatureFields,
  useSigningSession
} from "./_hooks";

export default function SigningPage({ initialSigningSession }: { initialSigningSession?: any }) {
  const params = useParams();
  const accessToken = params.token as string;
  const { pageDimensions, scale, setScale } = usePdfDimensions();

  // Custom Hooks
  const { signingSession, owner, allDocumentFields, isLoading, hasError } = useSigningSession(accessToken, initialSigningSession);
  const {
    signatureFields,
    setSignatureFields,
    requiredFields,
    incompleteRequiredFields,
    completedRequiredFieldsCount,
  } = useSignatureFields({ signingSession, pageDimensions });

  const {
    currentPage,
    setCurrentPage,
    numPages,
    setNumPages,
    setCurrentSignatureFieldIndex,
    goToNextSignatureField,
    currentActiveField
  } = useFieldNavigation({ incompleteRequiredFields });

  const {
    isSubmitting,
    isCompleted,
    isDeclined,
    showConfetti,
    handleDecline,
    handleSubmitDocument,
  } = useDocumentSubmission({ accessToken, signingSession });

  const { fileUrl, isDownloading, handleDownload } = useFileLoader({ accessToken, signingSession });

  // Local State for UI
  const [isReady, setIsReady] = useState(false);
  const [showDeclineDialog, setShowDeclineDialog] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const handleStartSigning = useCallback(() => {
    setHasStarted(true);
    if (incompleteRequiredFields.length > 0) {
      // Find the first incomplete field that is on or after the current page
      const nextField = incompleteRequiredFields.find((f) => f.page >= currentPage) || incompleteRequiredFields[0];

      const newIndex = incompleteRequiredFields.findIndex((f) => f.id === nextField.id);
      setCurrentPage(nextField.page);
      setCurrentSignatureFieldIndex(newIndex !== -1 ? newIndex : 0);
    }
  }, [incompleteRequiredFields, currentPage, setCurrentPage, setCurrentSignatureFieldIndex]);

  // Field Completion Logic
  const handleFieldComplete = useCallback(async (
    fieldId: string,
    signatureData: string,
  ) => {
    if (!signingSession) return;

    // Transition to signing phase if not already there
    if (!hasStarted) setHasStarted(true);

    // Update local state immediately
    const updatedFields = signatureFields.map((field) =>
      field.id === fieldId
        ? { ...field, isCompleted: true, signatureData }
        : field,
    );
    setSignatureFields(updatedFields);

    // Check if all required fields are now completed locally
    const reqFields = updatedFields.filter((f) => f.isRequired);
    const incRequired = reqFields.filter((f) => !f.isCompleted);

    if (incRequired.length === 0) {
      // All required fields completed locally, process the final submission
      await handleSubmitDocument(updatedFields);
      return;
    }

    // Find the next field to highlight
    if (incRequired.length > 0) {
      const nextField = incRequired.find(
        (f) => f.page >= currentPage && f.id !== fieldId,
      ) || incRequired[0];

      const newIndex = incRequired.findIndex((f) => f.id === nextField.id);
      setCurrentSignatureFieldIndex(newIndex);
      setCurrentPage(nextField.page);
    } else {
      setCurrentSignatureFieldIndex(0);
    }
  }, [signingSession, signatureFields, currentPage, handleSubmitDocument, setSignatureFields, setCurrentSignatureFieldIndex, setCurrentPage, hasStarted]);

  // Loading State
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Error State
  if (hasError || !signingSession) {
    return <ErrorScreen />;
  }

  // Completed or Declined State
  const isCancelled = signingSession.document?.status === "cancelled" ||
    signingSession.document?.status === "declined" ||
    isDeclined;
  const isAlreadySigned = signingSession.signer?.status === "signed";
  const isFinalized = isCompleted || signingSession.document?.status === "completed" || isAlreadySigned || isCancelled;

  if (isFinalized && signingSession.document) {
    return (
      <CompletedScreen
        signingSession={signingSession}
        showConfetti={showConfetti}
        isCancelled={isCancelled}
        handleDownload={handleDownload}
        isDownloading={isDownloading}
        allDocumentFields={allDocumentFields}
        isCompleted={isCompleted}
        isDeclined={isDeclined}
      />
    );
  }

  if (!signingSession.document) return null;

  return (
    <>

      {isSubmitting && <SubmittingOverlay />}

      <MainSigningView
        signingSession={signingSession}
        owner={owner}
        handleSubmitDocument={handleSubmitDocument}
        isSubmitting={isSubmitting}
        isReady={isReady}
        setIsReady={setIsReady}
        signatureFields={signatureFields}
        completedRequiredFieldsCount={completedRequiredFieldsCount}
        requiredFields={requiredFields}
        setShowDeclineDialog={setShowDeclineDialog}
        fileUrl={fileUrl}
        numPages={numPages}
        setNumPages={setNumPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        scale={scale}
        setScale={setScale}
        incompleteRequiredFields={incompleteRequiredFields}
        goToNextSignatureField={goToNextSignatureField}
        currentActiveField={hasStarted ? currentActiveField : undefined}
        handleFieldComplete={handleFieldComplete}
        hasStarted={hasStarted}
        handleStartSigning={handleStartSigning}
      />

      <WelcomeDialog
        open={showWelcome}
        onOpenChange={setShowWelcome}
        onConfirm={() => {
          setShowWelcome(false);
        }}
        documentTitle={signingSession.document?.title || "Document"}
        senderEmail={owner?.email || "the sender"}
        brandName={signingSession.ownerBranding?.brandName}
        brandLogoUrl={signingSession.ownerBranding?.logoUrl ?? undefined}
        customMessage={signingSession.document?.customMessage}
      />

      <DeclineDialog
        open={showDeclineDialog}
        onOpenChange={setShowDeclineDialog}
        onConfirm={handleDecline}
        customMessage={signingSession.document?.customMessage}
      />
    </>
  );
}
