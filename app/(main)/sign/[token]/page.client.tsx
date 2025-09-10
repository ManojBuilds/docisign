"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Check,
  FileText,
  User,
  Mail,
  Calendar,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Lock,
  MessageCircle,
} from "lucide-react";
import { toast } from "sonner";
import SigningField, {
  SignatureFieldData as SigningFieldDataType,
} from "@/components/signing-field";
import { usePdfDimensions } from "@/components/PdfDimensionsContext";
import Logo from "@/components/Logo";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import PdfViewerWrapper from "@/components/pdf-viewer-wrapper";

const SidebarContent = ({
  signingSession,
  owner,
  completedFields,
  totalFields,
  progressPercentage,
  requiredFields,
  completedRequiredFields,
  handleSubmitDocument,
  isSubmitting,
}: {
  signingSession: any;
  owner: any;
  completedFields: number;
  totalFields: number;
  progressPercentage: number;
  requiredFields: any[];
  completedRequiredFields: number;
  handleSubmitDocument: () => void;
  isSubmitting: boolean;
}) => (
  <>
    {/* Header */}
    <div className="flex items-center gap-3">
      {owner?.companyLogoUrl ? (
        <Image
          src={owner.companyLogoUrl}
          alt={owner.companyName || "Logo"}
          width={32}
          height={32}
          className="rounded-md object-contain"
        />
      ) : (
        <Logo />
      )}
      <div>
        {owner?.companyName && (
          <p className="text-xs text-muted-foreground">
            from {owner.companyName}
          </p>
        )}
      </div>
    </div>
    <div>
      {" "}
      <h1 className="text-lg font-semibold">{signingSession.document.title}</h1>
      <p className="text-sm text-muted-foreground">
        Please review and complete all signature fields.
      </p>
    </div>

    <Separator />

    {/* Progress */}
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">
          Progress
        </h2>
        <div className="text-xs px-2 py-1 bg-secondary rounded-sm">
          {completedFields}/{totalFields}
        </div>
      </div>

      <div className="space-y-3">
        <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-primary h-1.5 transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {requiredFields.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>
              Required fields: {completedRequiredFields}/{requiredFields.length}
            </span>
          </div>
        )}
      </div>
    </div>

    <Separator />

    <Accordion
      type="multiple"
      className="w-full space-y-1"
      defaultValue={["doc-details"]}
    >
      {/* Document Details */}
      <AccordionItem value="doc-details" className="border-none">
        <AccordionTrigger className="font-medium text-sm uppercase tracking-wide text-muted-foreground hover:no-underline py-2">
          Document Details
        </AccordionTrigger>
        <AccordionContent className="space-y-3 pt-2">
          <div className="flex items-center gap-3 text-sm">
            <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="md:truncate">
              {signingSession.document.originalFileName}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="truncate">
              {signingSession.signer.name || signingSession.signer.email}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="truncate">{signingSession.signer.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span>
              Sent{" "}
              {new Date(signingSession.document.createdAt).toLocaleDateString()}
            </span>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Custom Message */}
      {signingSession.document.customMessage && (
        <AccordionItem value="message" className="border-none">
          <AccordionTrigger className="font-medium text-sm uppercase tracking-wide text-muted-foreground hover:no-underline py-2">
            Message from Sender
          </AccordionTrigger>
          <AccordionContent className="pt-2">
            <p className="text-sm leading-relaxed">
              {signingSession.document.customMessage}
            </p>
          </AccordionContent>
        </AccordionItem>
      )}
    </Accordion>

    <div className="flex-1" />

    {/* Actions */}
    <div className="space-y-4 pt-4">
      <Button
        onClick={handleSubmitDocument}
        disabled={
          isSubmitting || completedRequiredFields < requiredFields.length
        }
        className={cn("w-full transition-all", {
          "bg-green-500 hover:bg-green-600 text-white animate-pulse":
            completedRequiredFields >= requiredFields.length && !isSubmitting,
        })}
        size="lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Finalizing...
          </>
        ) : (
          <>
            <Check className="h-4 w-4 mr-2" />
            Complete Signing
          </>
        )}
      </Button>

      {completedRequiredFields < requiredFields.length && (
        <div className="flex items-start gap-2 p-3 border border-border bg-muted/30 rounded-md">
          <AlertTriangle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground">
            Please complete all required signature fields before submitting the
            document.
          </p>
        </div>
      )}
    </div>
  </>
);

const WelcomeScreen = ({
  signingSession,
  owner,
  onProceed,
}: {
  signingSession: any;
  owner: any;
  onProceed: () => void;
}) => {
  const ownerName = owner?.firstName
    ? `${owner.firstName} ${owner.lastName || ""}`.trim()
    : owner?.email || "Someone";
  const signerName = signingSession.signer.name || signingSession.signer.email;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center relative z-10">
      <div
        style={{
          backgroundImage: "url('/noise.png')",
        }}
        className="pointer-events-none [z-index:-1] absolute inset-0 bg-[size:180px] bg-repeat opacity-[0.035]"
      ></div>
      <Logo className="mb-6" />
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary mb-4 max-w-2xl">
        Signature Required: {signingSession.document.title}
      </h1>
      <div className="text-center mb-8 max-w-2xl">
        {owner?.companyLogoUrl && (
          <div className="mb-4">
            <Image
              src={owner.companyLogoUrl}
              alt={owner.companyName || "Company Logo"}
              width={48}
              height={48}
              className="w-auto mx-auto rounded-md"
            />
          </div>
        )}
        <p className="text-muted-foreground text-lg">
          {owner?.companyName && !owner?.companyLogoUrl && (
            <span className="text-sm block mb-1">From {owner.companyName}</span>
          )}
          <span className="font-semibold">{ownerName}</span> has invited you to
          sign the document: <br />
          <span className="font-semibold text-foreground">
            {signingSession.document.title}
          </span>
        </p>
      </div>

      <div className="divide-y text-left max-w-2xl w-full">
        <div className="py-4">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <User className="mr-3 h-5 w-5" /> Signer Information
          </h2>
          <div className="space-y-1 text-sm text-muted-foreground pl-8">
            <p>
              <strong>Name:</strong> {signerName}
            </p>
            <p>
              <strong>Email:</strong> {signingSession.signer.email}
            </p>
          </div>
        </div>

        {signingSession.document.customMessage && (
          <div className="py-4">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <MessageCircle className="mr-3 h-5 w-5" /> Message from Sender
            </h2>
            <div className="pl-8">
              <p className="italic text-sm text-muted-foreground">
                &ldquo;{signingSession.document.customMessage}&rdquo;
              </p>
            </div>
          </div>
        )}

        <div className="py-4">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FileText className="mr-3 h-5 w-5" /> Document Information
          </h2>
          <div className="space-y-1 text-sm text-muted-foreground pl-8">
            <p>
              <strong>File:</strong> {signingSession.document.originalFileName}
            </p>
            <p>
              <strong>Sent:</strong>{" "}
              {new Date(signingSession.document.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <Button size="lg" className="mt-10 w-full max-w-xs" onClick={onProceed}>
        Review & Sign
      </Button>
      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-6">
        <Lock className="h-4 w-4" />
        <span>Secured by Boopsign.com</span>
      </div>
    </div>
  );
};

export default function SigningPage() {
  const params = useParams();
  const router = useRouter();

  const accessToken = params.token as string;

  // State
  const [showWelcome, setShowWelcome] = useState(true);

  // Queries
  const signingSession = useQuery(api.signers.getSigningSession, {
    accessToken,
  });
  const ownerId = signingSession?.document?.ownerId;
  const owner = useQuery(
    api.users.getUserByClerkId,
    ownerId ? { clerkId: ownerId } : "skip",
  );
  const getFileUrl = useMutation(api.documents.getFileUrl);

  // Mutations
  const markAsViewed = useMutation(api.signers.markDocumentAsViewed);
  const completeSignature = useMutation(
    api.signatureFields.completeSignatureField,
  );
  const finalizeDocument = useMutation(api.signers.finalizeDocument);

  // State
  const [fileUrl, setFileUrl] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [signatureFields, setSignatureFields] = useState<
    SigningFieldDataType[]
  >([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasMarkedViewed, setHasMarkedViewed] = useState(false);
  const [hasAutoNavigated, setHasAutoNavigated] = useState(false); // Add this flag
  const [currentSignatureFieldIndex, setCurrentSignatureFieldIndex] =
    useState<number>(0);
  const { pageDimensions, setScale } = usePdfDimensions();

  // Load file URL and mark as viewed
  useEffect(() => {
    const loadAndMarkViewed = async () => {
      if (signingSession && !hasMarkedViewed && signingSession.document) {
        try {
          const url = await getFileUrl({
            storageId: signingSession.document.fileStorageId,
          });
          if (url) setFileUrl(url);

          await markAsViewed({ accessToken });
          setHasMarkedViewed(true);
        } catch (error) {
          console.error("Error loading signing session:", error);
        }
      }
    };

    loadAndMarkViewed();
  }, [signingSession, getFileUrl, markAsViewed, accessToken, hasMarkedViewed]);

  // Load and normalize signature fields
  useEffect(() => {
    if (signingSession?.signatureFields && pageDimensions) {
      const fields: SigningFieldDataType[] = signingSession.signatureFields.map(
        (field: any) => {
          const dims = pageDimensions[field.page];
          return {
            id: field._id,
            fieldType: field.fieldType,
            page: field.page,
            assignedToEmail: field.assignedToEmail,
            isRequired: field.isRequired,
            label: field.label,
            isCompleted: field.isCompleted,
            signatureData: field.signatureData,
            normalizedX: dims ? field.x / dims.width : 0,
            normalizedY: dims ? field.y / dims.height : 0,
            normalizedWidth: dims ? field.width / dims.width : 0,
            normalizedHeight: dims ? field.height / dims.height : 0,
          };
        },
      );
      setSignatureFields(fields);

      if (!hasAutoNavigated) {
        const incompleteRequired = fields.filter(
          (f) => f.isRequired && !f.isCompleted,
        );
        if (incompleteRequired.length > 0) {
          setCurrentPage(incompleteRequired[0].page);
          setCurrentSignatureFieldIndex(0); // Set initial index
        }
        setHasAutoNavigated(true);
      }
    }
  }, [signingSession?.signatureFields, pageDimensions, hasAutoNavigated]);

  const incompleteRequiredFields = useMemo(() => {
    return signatureFields.filter((f) => f.isRequired && !f.isCompleted);
  }, [signatureFields]);

  const goToPreviousSignatureField = () => {
    if (incompleteRequiredFields.length === 0) return;

    const newIndex =
      (currentSignatureFieldIndex - 1 + incompleteRequiredFields.length) %
      incompleteRequiredFields.length;
    setCurrentSignatureFieldIndex(newIndex);
    setCurrentPage(incompleteRequiredFields[newIndex].page);
  };

  const goToNextSignatureField = () => {
    if (incompleteRequiredFields.length === 0) return;

    const newIndex =
      (currentSignatureFieldIndex + 1) % incompleteRequiredFields.length;
    setCurrentSignatureFieldIndex(newIndex);
    setCurrentPage(incompleteRequiredFields[newIndex].page);
  };

  const handleFieldComplete = async (
    fieldId: string,
    signatureData: string,
  ) => {
    if (!signingSession) return;
    try {
      // Check if this completion will satisfy all requirements BEFORE making any changes
      const requiredFields = signatureFields.filter((f) => f.isRequired);
      const incompleteRequired = requiredFields.filter(
        (f) => !f.isCompleted && f.id !== fieldId,
      );

      if (incompleteRequired.length === 0) {
        // All required fields will be completed, navigate immediately to prevent UI flash
        setIsSubmitting(true);
        router.push(`/sign/complete?token=${accessToken}`);

        // Complete the signature and finalize in the background
        await completeSignature({ fieldId: fieldId as any, signatureData });
        if (signingSession.document && signingSession.signer) {
          await finalizeDocument({
            documentId: signingSession.document._id,
            signerEmail: signingSession.signer.email,
          });
        }

        return; // Exit early
      }

      // If there are more fields to complete, proceed normally
      await completeSignature({ fieldId: fieldId as any, signatureData });

      // Update local state
      const updatedSignatureFields = signatureFields.map((field) =>
        field.id === fieldId
          ? { ...field, isCompleted: true, signatureData }
          : field,
      );
      setSignatureFields(updatedSignatureFields);

      toast.success("Signature added successfully!");

      // Re-evaluate incomplete required fields after update
      const remainingIncomplete = updatedSignatureFields.filter(
        (f) => f.isRequired && !f.isCompleted,
      );

      if (remainingIncomplete.length > 0) {
        // Find the index of the next field to highlight.
        // Try to find one on the same page or later pages first.
        const nextFieldToHighlight =
          remainingIncomplete.find(
            (f) => f.page >= currentPage && f.id !== fieldId, // Try to stay on current page or go forward
          ) || remainingIncomplete[0]; // Fallback to the first remaining incomplete field

        const newIndex = remainingIncomplete.findIndex(
          (f) => f.id === nextFieldToHighlight.id,
        );
        setCurrentSignatureFieldIndex(newIndex);
        setCurrentPage(nextFieldToHighlight.page);
      } else {
        // All required fields completed, disable navigation buttons
        setCurrentSignatureFieldIndex(0); // Reset index
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save signature");
      setIsSubmitting(false);
    }
  };

  const handleSubmitDocument = async () => {
    if (!signingSession) return;
    const requiredFields = signatureFields.filter((f) => f.isRequired);
    const incompleteRequired = requiredFields.filter((f) => !f.isCompleted);

    if (incompleteRequired.length > 0) {
      toast.error(
        `Please complete all required fields (${incompleteRequired.length} remaining)`,
      );
      // Navigate to first incomplete field
      const firstIncomplete = incompleteRequired[0];
      if (firstIncomplete) {
        setCurrentPage(firstIncomplete.page);
        const index = incompleteRequiredFields.findIndex(
          (f) => f.id === firstIncomplete.id,
        );
        if (index !== -1) {
          setCurrentSignatureFieldIndex(index);
        }
      }
      return;
    }

    setIsSubmitting(true);
    try {
      if (signingSession.document && signingSession.signer) {
        await finalizeDocument({
          documentId: signingSession.document._id,
          signerEmail: signingSession.signer.email,
        });
      }
      toast.success("Document signed successfully!");
      router.push(`/sign/complete?token=${accessToken}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to finalize document");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!signingSession) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (signingSession.error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4 p-8">
          <AlertTriangle className="h-16 w-16 mx-auto text-destructive" />
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">Invalid Link</h1>
            <p className="text-muted-foreground">
              This signing link is invalid or has expired.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (signingSession.document?.status === "completed") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4 p-8">
          <CheckCircle2 className="h-16 w-16 mx-auto text-primary" />
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">Already Completed</h1>
            <p className="text-muted-foreground">
              This document has already been signed and completed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!signingSession?.document) return null;

  if (showWelcome) {
    return (
      <WelcomeScreen
        signingSession={signingSession}
        owner={owner}
        onProceed={() => setShowWelcome(false)}
      />
    );
  }

  const completedFields = signatureFields.filter((f) => f.isCompleted).length;
  const totalFields = signatureFields.length;
  const requiredFields = signatureFields.filter((f) => f.isRequired);
  const completedRequiredFields = requiredFields.filter(
    (f) => f.isCompleted,
  ).length;
  const progressPercentage =
    totalFields > 0 ? (completedFields / totalFields) * 100 : 0;

  const currentActiveField =
    incompleteRequiredFields[currentSignatureFieldIndex];

  const sidebarProps = {
    signingSession,
    owner,
    completedFields,
    totalFields,
    progressPercentage,
    requiredFields,
    completedRequiredFields,
    handleSubmitDocument,
    isSubmitting,
  };

  return (
    <div className="min-h-dvh flex flex-col lg:flex-row bg-background">
      {/* Desktop Sidebar */}
      <div className="w-full lg:w-80 border-r p-6 flex-col space-y-6 overflow-y-auto hidden lg:block">
        <SidebarContent {...sidebarProps} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
              repeating-linear-gradient(22.5deg, transparent, transparent 2px, rgba(75, 85, 99, 0.06) 2px, rgba(75, 85, 99, 0.06) 3px, transparent 3px, transparent 8px),
              repeating-linear-gradient(67.5deg, transparent, transparent 2px, rgba(107, 114, 128, 0.05) 2px, rgba(107, 114, 128, 0.05) 3px, transparent 3px, transparent 8px),
              repeating-linear-gradient(112.5deg, transparent, transparent 2px, rgba(55, 65, 81, 0.04) 2px, rgba(55, 65, 81, 0.04) 3px, transparent 3px, transparent 8px),
              repeating-linear-gradient(157.5deg, transparent, transparent 2px, rgba(31, 41, 55, 0.03) 2px, rgba(31, 41, 55, 0.03) 3px, transparent 3px, transparent 8px)
            `,
          }}
        />
        {/* PDF Viewer */}
        <div className="flex-1 z-10 min-h-full">
          {fileUrl && (
            <PdfViewerWrapper
              fileUrl={fileUrl}
              pageNumber={currentPage}
              onPageChange={setCurrentPage}
              onScaleChange={setScale}
              onPreviousSignatureField={goToPreviousSignatureField}
              onNextSignatureField={goToNextSignatureField}
              hasMultipleIncompleteFields={incompleteRequiredFields.length > 1}
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className="pointer-events-auto">
                  {signatureFields
                    .filter((field) => field.page === currentPage)
                    .map((field) => (
                      <SigningField
                        key={field.id}
                        field={field}
                        isEditMode={false}
                        onComplete={handleFieldComplete}
                      />
                    ))}
                </div>
                {currentActiveField &&
                  currentActiveField.page === currentPage && (
                    <div
                      className="absolute animate-pulse rounded-md ring-2 ring-blue-500 ring-offset-2 pointer-events-none"
                      style={{
                        left: `${currentActiveField.normalizedX * 100}%`,
                        top: `${currentActiveField.normalizedY * 100}%`,
                        width: `${currentActiveField.normalizedWidth * 100}%`,
                        height: `${currentActiveField.normalizedHeight * 100}%`,
                      }}
                    />
                  )}
              </div>
            </PdfViewerWrapper>
          )}{" "}
        </div>

        {/* Mobile Drawer Trigger */}
        <div className="lg:hidden p-4 border-t bg-background z-10">
          <Drawer>
            <DrawerTrigger asChild>
              <Button className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                View Document Details
              </Button>
            </DrawerTrigger>
            <DrawerContent className="min-h-[90vh]">
              <DrawerHeader>
                <DrawerTitle className="sr-only">Document Details</DrawerTitle>
              </DrawerHeader>
              <div className="px-6 pb-6 space-y-6 overflow-y-auto flex flex-col">
                <SidebarContent {...sidebarProps} />
              </div>
            </DrawerContent>
          </Drawer>
        </div>

        <div className="flex sm:hidden items-center justify-center z-20 gap-2 px-3 py-2 bg-background">
          <Lock className="h-3.5 w-3.5" />
          <span className="text-xs font-medium text-muted-foreground">
            Secured by Boopsign
          </span>
        </div>

        {/* Secured by Badge */}
        <div className="absolute hidden bottom-4 sm:right-4 z-20 sm:flex items-center gap-2 rounded-full px-3 py-2 bg-background border shadow-sm">
          <Lock className="h-3.5 w-3.5" />
          <span className="text-xs font-medium text-muted-foreground">
            Secured by Boopsign
          </span>
        </div>
      </div>
    </div>
  );
}
