"use client";

import Logo from "@/components/Logo";
import { usePdfDimensions } from "@/components/PdfDimensionsContext";
import type { SignatureFieldData as SigningFieldDataType } from "@/components/signing-field";
import { ThumbnailSidebar } from "@/components/ThumbnailSidebar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Confetti } from "@/components/ui/confetti";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import {
  AlertTriangle,
  Check,
  Download,
  FileCheck,
  FileText,
  Info,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  User
} from "lucide-react";
import { useParams } from "next/navigation";
import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

// Lazy load heavy components
const PdfViewerWrapper = lazy(() => import("@/components/pdf-viewer-wrapper"));

import Link from "next/link";
import { SigningBottomBar } from "./_components/SigningBottomBar";
import { SigningNavbar } from "./_components/SigningNavbar";
import { SigningPageOverlay } from "./_components/SigningPageOverlay";
import { SigningZoomControls } from "./_components/SigningZoomControls";

// SideContent removed - using Details Sheet instead

// const WelcomeScreen = ({
//   signingSession,
//   owner,
//   onProceed,
//   onGenerateOtp,
// }: {
//   signingSession: any;
//   owner: any;
//   onProceed: () => void;
//   onGenerateOtp: () => Promise<void>;
// }) => {
//   const ownerName = (owner as any)?.firstName
//     ? `${(owner as any).firstName} ${(owner as any).lastName || ""}`.trim()
//     : (owner as any)?.email || "Someone";
//   const signerName = signingSession.signer.name || signingSession.signer.email;

//   return (
//     <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center relative z-10">
//       <div
//         style={{
//           backgroundImage: "url('/noise.png')",
//         }}
//         className="pointer-events-none [z-index:-1] absolute inset-0 bg-[size:180px] bg-repeat opacity-[0.035]"
//       ></div>
//       {/* <Logo className="mb-6" /> */}
//       <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary mb-4 max-w-2xl">
//         Contract Signature Required: {signingSession.document.title}
//       </h1>
//       <div className="text-center mb-8 max-w-2xl">
//         {(owner as any)?.companyLogoUrl && (
//           <div className="mb-4">
//             <Image
//               src={(owner as any).companyLogoUrl}
//               alt={(owner as any).companyName || "Company Logo"}
//               width={48}
//               height={48}
//               className="w-auto mx-auto rounded-md"
//             />
//           </div>
//         )}
//         <p className="text-muted-foreground text-lg">
//           {(owner as any)?.companyName && !(owner as any)?.companyLogoUrl && (
//             <span className="text-sm block mb-1">From {(owner as any).companyName}</span>
//           )}
//           <span className="font-semibold">{ownerName}</span> has invited you to
//           sign the contract: <br />
//           <span className="font-semibold text-foreground">
//             {signingSession.document.title}
//           </span>
//         </p>
//       </div>

//       <div className="divide-y text-left max-w-2xl w-full">
//         <div className="py-4">
//           <h2 className="text-xl font-semibold mb-4 flex items-center">
//             <User className="mr-3 h-5 w-5" /> Client Information
//           </h2>
//           <div className="space-y-1 text-sm text-muted-foreground pl-8">
//             {signerName !== signingSession.signer.email && (
//               <p>
//                 <strong>Name:</strong> {signerName}
//               </p>
//             )}
//             <p>
//               <strong>Email:</strong> {signingSession.signer.email}
//             </p>
//           </div>
//         </div>

//         {signingSession.document.customMessage && (
//           <div className="py-4">
//             <h2 className="text-xl font-semibold mb-4 flex items-center">
//               <MessageCircle className="mr-3 h-5 w-5" /> Message from Freelancer/Agency
//             </h2>
//             <div className="pl-8">
//               <p className="italic text-sm text-muted-foreground">
//                 &ldquo;{signingSession.document.customMessage}&rdquo;
//               </p>
//             </div>
//           </div>
//         )}

//         <div className="py-4">
//           <h2 className="text-xl font-semibold mb-4 flex items-center">
//             <FileText className="mr-3 h-5 w-5" /> Contract Information
//           </h2>
//           <div className="space-y-1 text-sm text-muted-foreground pl-8">
//             <p>
//               <strong>File:</strong> {signingSession.document.originalFileName}
//             </p>
//             <p>
//               <strong>Sent:</strong>{" "}
//               {new Date(signingSession.document.createdAt).toLocaleDateString()}
//             </p>
//           </div>
//         </div>
//       </div>

//       <Button
//         size="lg"
//         className="mt-10 w-full max-w-xs"
//         onClick={() => {
//           onProceed();
//         }}
//       >
//         Review & Sign Contract
//       </Button>
//       <div className="flex items-center gap-2 text-sm text-muted-foreground mt-6">
//         <Lock className="h-4 w-4" />
//         <span>Secured by Boopsign.com</span>
//       </div>
//     </div>
//   );
// };

export default function SigningPage() {
  const params = useParams();

  const accessToken = params.token as string;

  // State
  // const [showWelcome, setShowWelcome] = useState(true);
  const [numPages, setNumPages] = useState<number>(0);
  // const [hasOtpSent, setHasOtpSent] = useState(false); // Track if OTP has been sent
  const [checkingVerification, setCheckingVerification] = useState(false); // Set to false since we're skipping verification

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
  const batchCompleteFields = useMutation(
    api.signatureFields.batchCompleteSignatureFields,
  );
  // const finalizeDocument = useMutation(api.signers.finalizeDocument);
  // const generateOtp = useMutation(api.otp.generateOTP);
  const declineDocumentMutation = useMutation(api.signers.declineDocument);

  const allDocumentFields = useQuery(
    api.signatureFields.getDocumentSignatureFields,
    signingSession?.document?._id ? { documentId: signingSession.document._id } : "skip"
  );

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
  const { pageDimensions, scale, setScale } = usePdfDimensions();
  const [isReady, setIsReady] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showDeclineDialog, setShowDeclineDialog] = useState(false);

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const participants = useMemo(() => {
    if (!allDocumentFields) return [];

    // Check if we have locally completed the document to optimistically update status
    // This prevents a race condition where the UI shows "Pending" while the query revalidates
    const currentSignerEmail = signingSession?.signer?.email?.toLowerCase().trim();

    const uniqueSigners = new Map();
    allDocumentFields.forEach(field => {
      const email = field.signerEmail?.toLowerCase().trim();
      if (!email) return;

      let status = field.status;

      // Optimistic update for current user
      if (currentSignerEmail && email === currentSignerEmail) {
        const serverStatus = signingSession?.signer?.status;
        if (isDeclined || serverStatus === 'declined') {
          status = 'declined';
        } else if (isCompleted || serverStatus === 'signed') {
          status = 'signed';
        }
      }

      // If we already saw this signer, only update if the new status is more "advanced"
      // Ranking: pending (0) < sent (1) < viewed (2) < signed (3)
      const statusRank = (s: string) => {
        if (s === 'signed') return 3;
        if (s === 'viewed') return 2;
        if (s === 'sent') return 1;
        return 0;
      };

      if (!uniqueSigners.has(email) || statusRank(status) > statusRank(uniqueSigners.get(email).status)) {
        uniqueSigners.set(email, {
          email: field.signerEmail,
          name: field.signerName,
          status: status,
          initial: (field.signerName || field.signerEmail || 'S').charAt(0).toUpperCase()
        });
      }
    });
    return Array.from(uniqueSigners.values());
  }, [allDocumentFields, isCompleted, isDeclined, signingSession?.signer?.email]);

  const handlePdfReady = useCallback(() => {
    setIsReady(true);
  }, []);

  const handleDecline = useCallback(async () => {
    try {
      setIsSubmitting(true);
      await declineDocumentMutation({ accessToken });
      toast.success("Document declined successfully.");
      setIsDeclined(true);
      setIsCompleted(true);
    } catch (error) {
      console.error("Error declining document:", error);
      toast.error("Failed to decline document.");
    } finally {
      setIsSubmitting(false);
    }
  }, [accessToken, declineDocumentMutation]);

  const handleDownload = useCallback(async () => {
    if (!signingSession?.document?.fileStorageId) return;

    setIsDownloading(true);
    try {
      const url = await getFileUrl({ storageId: signingSession.document.fileStorageId });
      if (url) {
        // Fetch the file as a blob to force download
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = (signingSession.document.title || "document") + "-signed.pdf";
        document.body.appendChild(a);
        a.click();

        // Cleanup
        document.body.removeChild(a);
        window.URL.revokeObjectURL(blobUrl);
      }
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error("Failed to download file");
    } finally {
      setIsDownloading(false);
    }
  }, [signingSession, getFileUrl]);

  // Load file URL and mark as viewed - Memoized callback
  const loadAndMarkViewed = useCallback(async () => {
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
  }, [signingSession, hasMarkedViewed, getFileUrl, markAsViewed, accessToken]);

  useEffect(() => {
    loadAndMarkViewed();
  }, [loadAndMarkViewed]);

  // Check verification status when signingSession and verificationStatus load
  // Since we're skipping OTP verification, we set it to verified immediately
  useEffect(() => {
    if (signingSession) {
      setCheckingVerification(false);
    }
  }, [signingSession]);

  // Load and normalize signature fields from server
  useEffect(() => {
    if (!signingSession?.signatureFields || !pageDimensions) return;

    const serverFields: SigningFieldDataType[] = signingSession.signatureFields
      .filter((f: any) => pageDimensions[f.page])
      .map((field: any) => {
        const dims = pageDimensions[field.page];
        return {
          id: field._id,
          fieldType: field.fieldType,
          page: field.page,
          signerEmail: field.signerEmail,
          isRequired: field.isRequired,
          label: field.label,
          isCompleted: field.isCompleted,
          signatureData: field.signatureData,
          normalizedX: field.x / dims.width,
          normalizedY: field.y / dims.height,
          normalizedWidth: field.width / dims.width,
          normalizedHeight: field.height / dims.height,
        };
      });

    setSignatureFields((prev) => {
      // If no local state, initialize with server data
      if (prev.length === 0) return serverFields;

      // Merge server updates, preserving local unsaved completions
      return serverFields.map((serverField) => {
        const localField = prev.find((f) => f.id === serverField.id);
        // If local has a signature but server doesn't, keep local
        if (localField?.isCompleted && !serverField.isCompleted) {
          return localField;
        }
        return serverField;
      });
    });

    if (!hasAutoNavigated) {
      const firstIncomplete = serverFields.find(f => f.isRequired && !f.isCompleted);
      if (firstIncomplete) {
        setCurrentPage(firstIncomplete.page);
        setCurrentSignatureFieldIndex(0);
      }
      setHasAutoNavigated(true);
    }
  }, [signingSession?.signatureFields, pageDimensions, hasAutoNavigated]);

  // ALL memoizations MUST be before early returns
  const incompleteRequiredFields = useMemo(() => {
    return signatureFields.filter((f) => f.isRequired && !f.isCompleted);
  }, [signatureFields]);

  const requiredFields = useMemo(() => {
    return signatureFields.filter((f) => f.isRequired);
  }, [signatureFields]);

  const completedFields = useMemo(() => {
    return signatureFields.filter((f) => f.isCompleted).length;
  }, [signatureFields]);

  const completedRequiredFields = useMemo(() => {
    return requiredFields.filter((f) => f.isCompleted).length;
  }, [requiredFields]);

  // const progressPercentage = useMemo(() => {
  //   const totalFields = signatureFields.length;
  //   return totalFields > 0 ? (completedFields / totalFields) * 100 : 0;
  // }, [completedFields, signatureFields.length]);

  const currentActiveField = useMemo(
    () => incompleteRequiredFields[currentSignatureFieldIndex],
    [incompleteRequiredFields, currentSignatureFieldIndex]
  );

  // const goToPreviousSignatureField = useCallback(() => {
  //   if (incompleteRequiredFields.length === 0) return;

  //   const newIndex =
  //     (currentSignatureFieldIndex - 1 + incompleteRequiredFields.length) %
  //     incompleteRequiredFields.length;
  //   setCurrentSignatureFieldIndex(newIndex);
  //   setCurrentPage(incompleteRequiredFields[newIndex].page);
  // }, [currentSignatureFieldIndex, incompleteRequiredFields]);

  const goToNextSignatureField = useCallback(() => {
    if (incompleteRequiredFields.length === 0) return;

    const newIndex =
      (currentSignatureFieldIndex + 1) % incompleteRequiredFields.length;
    setCurrentSignatureFieldIndex(newIndex);
    setCurrentPage(incompleteRequiredFields[newIndex].page);
  }, [currentSignatureFieldIndex, incompleteRequiredFields]);

  const handleSubmitDocument = useCallback(async (fieldsOverride?: SigningFieldDataType[]) => {
    if (!signingSession) return;

    // Explicitly use provided fields or current state to avoid staleness
    const currentFields = fieldsOverride || signatureFields;
    const requiredFields = currentFields.filter((f) => f.isRequired);
    const incompleteRequired = requiredFields.filter((f) => !f.isCompleted);

    if (incompleteRequired.length > 0) {
      toast.error(
        `Please complete all required fields (${incompleteRequired.length} remaining) to sign the contract`,
      );
      // Navigate to first incomplete field
      const firstIncomplete = incompleteRequired[0];
      if (firstIncomplete) {
        setCurrentPage(firstIncomplete.page);
        const index = currentFields
          .filter(f => f.isRequired && !f.isCompleted)
          .findIndex((f) => f.id === firstIncomplete.id);
        if (index !== -1) {
          setCurrentSignatureFieldIndex(index);
        }
      }
      return;
    }

    setIsSubmitting(true);
    toast.info("Finalizing your agreement...", { duration: 3000 });
    try {
      // Gather audit trail information
      const auditInfo = {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      };

      // Get IP address with a timeout to prevent hanging
      let clientIP = 'unknown';
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);

        const response = await fetch('/api/client-info', { signal: controller.signal });
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          clientIP = data.ip;
        }
      } catch (error) {
        console.warn('Failed to get client IP or timed out:', error);
      }

      // Collect all completed fields to save - using currentFields to avoid staleness
      const fieldsToComplete = currentFields
        .filter(f => f.isCompleted && f.signatureData)
        .map(f => ({
          fieldId: f.id as any,
          signatureData: f.signatureData!,
        }));

      if (fieldsToComplete.length > 0) {
        await batchCompleteFields({
          fields: fieldsToComplete,
          auditInfo: {
            ...auditInfo,
            ip: clientIP || 'unknown'
          }
        });
      }

      toast.success("Contract signed successfully!");
      setShowConfetti(true);
      setIsCompleted(true);
    } catch (error) {
      console.error(error);
      toast.error("Failed to finalize contract");
    } finally {
      setIsSubmitting(false);
    }
  }, [signingSession, signatureFields, incompleteRequiredFields, batchCompleteFields]);

  const handleFieldComplete = useCallback(async (
    fieldId: string,
    signatureData: string,
  ) => {
    if (!signingSession) return;

    // Update local state immediately
    const updatedSignatureFields = signatureFields.map((field) =>
      field.id === fieldId
        ? { ...field, isCompleted: true, signatureData }
        : field,
    );
    setSignatureFields(updatedSignatureFields);

    // Check if all required fields are now completed locally
    const requiredFields = updatedSignatureFields.filter((f) => f.isRequired);
    const incompleteRequired = requiredFields.filter((f) => !f.isCompleted);

    if (incompleteRequired.length === 0) {
      // All required fields completed locally, process the final submission
      // with the accurately updated fields list
      handleSubmitDocument(updatedSignatureFields);
      return;
    }

    toast.success("Signature added locally. Don't forget to click 'Finish' to complete.");

    // Find the next field to highlight
    const remainingIncomplete = updatedSignatureFields.filter(
      (f) => f.isRequired && !f.isCompleted,
    );

    if (remainingIncomplete.length > 0) {
      const nextField =
        remainingIncomplete.find(
          (f) => f.page >= currentPage && f.id !== fieldId,
        ) || remainingIncomplete[0];

      const newIndex = remainingIncomplete.findIndex(
        (f) => f.id === nextField.id,
      );

      setCurrentSignatureFieldIndex(newIndex);
      setCurrentPage(nextField.page);
    } else {
      setCurrentSignatureFieldIndex(0);
    }
  }, [signingSession, signatureFields, currentPage, handleSubmitDocument]);

  if (!signingSession || checkingVerification) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.3]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
              repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.01) 10px, rgba(0,0,0,0.01) 11px)
            `
          }}
        />

        <div className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in-95 duration-500 px-4">
          <div className="mb-6 sm:mb-8 scale-100 sm:scale-110">
            <Logo />
          </div>

          <div className="flex flex-col items-center space-y-4 w-full max-w-xs">
            <div className="h-1.5 w-full max-w-[280px] sm:w-48 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-primary animate-indeterminate-progress rounded-full" />
            </div>
            <p className="text-sm font-medium text-gray-400 uppercase tracking-widest animate-pulse">
              Preparing Document...
            </p>
          </div>

          <div className="mt-8 sm:mt-12 flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100/50">
            <Lock className="w-3 h-3 text-gray-400" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              End-to-End Encrypted Session
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (signingSession.error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.4]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(22.5deg, transparent, transparent 2px, rgba(75, 85, 99, 0.05) 2px, rgba(75, 85, 99, 0.05) 3px, transparent 3px, transparent 8px),
              repeating-linear-gradient(67.5deg, transparent, transparent 2px, rgba(107, 114, 128, 0.04) 2px, rgba(107, 114, 128, 0.04) 3px, transparent 3px, transparent 8px),
              repeating-linear-gradient(112.5deg, transparent, transparent 2px, rgba(55, 65, 81, 0.03) 2px, rgba(55, 65, 81, 0.03) 3px, transparent 3px, transparent 8px),
              repeating-linear-gradient(157.5deg, transparent, transparent 2px, rgba(31, 41, 55, 0.02) 2px, rgba(31, 41, 55, 0.02) 3px, transparent 3px, transparent 8px)
            `
          }}
        />

        {/* Minimal Header */}
        <header className="w-full h-16 bg-white/80 backdrop-blur-md border-b flex items-center px-4 justify-between relative z-10">
          <div className="flex items-center gap-3 sm:gap-4">
            <Logo />
            <div className="h-4 w-[1px] bg-gray-200 hidden sm:block" />
            <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest leading-none hidden sm:block">Access Denied</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none sm:hidden">Access</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-6">
            <span className="text-[9px] sm:text-[10px] font-black text-red-600 uppercase tracking-[0.15em] sm:tracking-[0.2em] flex items-center gap-1 sm:gap-1.5">
              <ShieldCheck className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
              <span className="hidden sm:block">Security Alert</span>
              <span className="sm:hidden">Alert</span>
            </span>
          </div>
        </header>

        <main className="flex-1 w-full max-w-2xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center relative z-10 text-center -mt-8 sm:-mt-16">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-50 rounded-3xl flex items-center justify-center mb-6 sm:mb-8 border border-red-100 shadow-xl shadow-red-500/10">
            <AlertTriangle className="w-8 sm:w-10 h-8 sm:h-10 text-red-600" />
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-3 sm:mb-4 tracking-tight">
            Invalid or Expired Link
          </h1>

          <p className="text-base sm:text-lg text-gray-500 font-medium leading-relaxed max-w-lg mb-6 sm:mb-8">
            This secure document access link is no longer valid. It may have expired, been revoked, or already been used.
          </p>

          <div className="p-5 sm:p-6 bg-gray-50 border border-gray-100 rounded-2xl w-full max-w-sm">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2">What should I do?</h3>
            <p className="text-sm text-gray-500">
              Please check your email for a newer link or contact the sender directly to request a fresh signing invitation.
            </p>
          </div>
        </main>

        {/* Minimal Footer */}
        <footer className="w-full py-6 sm:py-8 text-center relative z-10">
          <p className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] sm:tracking-[0.2em]">
            Secured & Verified by Boopsign.com
          </p>
        </footer>
      </div>
    );
  }


  const isCancelled = signingSession.document?.status === "cancelled" || signingSession.document?.status === "declined" || isDeclined;

  const isAlreadySigned = signingSession.signer?.status === "signed";

  if (isCompleted || signingSession.document?.status === "completed" || isAlreadySigned || isCancelled) {
    return (
      <>
        {showConfetti && (
          <div className="fixed inset-0 z-50 pointer-events-none">
            <Confetti
              className="w-full h-full"
              options={{
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
              }}
            />
          </div>
        )}

        <div className="min-h-screen bg-white flex flex-col items-center relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.4]"
            style={{
              backgroundImage: `
                repeating-linear-gradient(22.5deg, transparent, transparent 2px, rgba(75, 85, 99, 0.05) 2px, rgba(75, 85, 99, 0.05) 3px, transparent 3px, transparent 8px),
                repeating-linear-gradient(67.5deg, transparent, transparent 2px, rgba(107, 114, 128, 0.04) 2px, rgba(107, 114, 128, 0.04) 3px, transparent 3px, transparent 8px),
                repeating-linear-gradient(112.5deg, transparent, transparent 2px, rgba(55, 65, 81, 0.03) 2px, rgba(55, 65, 81, 0.03) 3px, transparent 3px, transparent 8px),
                repeating-linear-gradient(157.5deg, transparent, transparent 2px, rgba(31, 41, 55, 0.02) 2px, rgba(31, 41, 55, 0.02) 3px, transparent 3px, transparent 8px)
              `
            }}
          />

          {/* Minimal Header */}
          <header className="w-full h-16 bg-white/80 backdrop-blur-md border-b flex items-center px-4 justify-between relative z-10">
            <div className="flex items-center gap-3 sm:gap-4">
              <Logo />
              <div className="h-4 w-[1px] bg-gray-200 hidden sm:block" />
              <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest leading-none hidden sm:block">Agreement Management</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none sm:hidden">Agreement</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-6">
              <span className="text-[9px] sm:text-[10px] font-black text-emerald-600 uppercase tracking-[0.15em] sm:tracking-[0.2em] flex items-center gap-1 sm:gap-1.5">
                <ShieldCheck className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                <span className="hidden sm:block">Verified Transaction</span>
                <span className="sm:hidden">Verified</span>
              </span>
            </div>
          </header>

          <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6 sm:px-6 sm:py-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
            {/* Left Column Container: Hero & primary actions stack on desktop, but interleave on mobile via contents */}
            <div className="contents lg:flex lg:flex-col lg:col-span-7 space-y-8">
              {/* 1. Hero Text - Top on both */}
              <div className="order-1 space-y-4 sm:space-y-6 mb-2 sm:mb-0">
                {isCancelled ? (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100/50 text-red-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Voided</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100/50 text-emerald-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Completed</span>
                  </div>
                )}

                <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-[1.1] tracking-tight">
                  {isCancelled ? (
                    <>
                      Agreement Declined.<br />
                      <span className="text-gray-400">The process has been stopped.</span>
                    </>
                  ) : (
                    <>
                      You're all set!<br />
                      <span className="text-gray-400">Thank you for using Boopsign.</span>
                    </>
                  )}
                </h1>

                <p className="text-sm sm:text-base lg:text-lg text-gray-600 font-medium leading-relaxed max-w-2xl break-words px-1">
                  {isCancelled ? (
                    <>
                      You have chosen to decline{" "}
                      <span className="text-gray-900 font-bold inline-block break-all sm:break-normal">&ldquo;{signingSession.document?.title}&rdquo;</span>.{" "}
                      The sender has been notified and the document is now void.
                    </>
                  ) : (
                    <>
                      The document{" "}
                      <span className="text-gray-900 font-bold inline-block break-all sm:break-normal">&ldquo;{signingSession.document?.title}&rdquo;</span>{" "}
                      has been successfully signed and returned to the sender.
                    </>
                  )}
                </p>
              </div>

              {/* 3. Primary Actions (Download) - Row 2 Left on Desktop, Order 3 on Mobile */}
              <div className="order-3 space-y-2 sm:space-y-8">
                {!isCancelled && (
                  <div className="space-y-4">
                    <Button
                      onClick={handleDownload}
                      disabled={isDownloading}
                      className="w-full sm:w-auto px-8 sm:px-12 bg-gray-900 hover:bg-black text-white rounded-2xl h-14 sm:h-16 font-bold text-base shadow-2xl shadow-gray-200 uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 group cursor-pointer mt-4 sm:mt-6"
                    >
                      {isDownloading ? (
                        <>
                          Downloading
                          <Loader2 className="h-6 w-6 animate-spin" />
                        </>
                      ) : (
                        <>
                          <Download className="h-6 w-6 mr-3 group-hover:translate-y-0.5 transition-transform" />
                          Download Signed PDF
                        </>
                      )}
                    </Button>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em] ml-2">
                      <Mail className="w-3 h-3" />
                      <span>A copy has been sent to your email</span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-300">
                  <div className="p-6 bg-white border border-gray-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                      <Lock className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Audit Trail</h3>
                    <p className="text-xs text-gray-500 leading-relaxed font-medium">View the complete certified activity trail for this agreement.</p>
                  </div>
                  <div className="p-6 bg-white border border-gray-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Security Hash</h3>
                    <p className="text-xs text-gray-500 leading-relaxed font-medium">Verify the authenticity and integrity of the digital signatures applied.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column Container: Sidebar on desktop, interleaved on mobile */}
            <div className="contents lg:flex lg:flex-col lg:col-span-5 space-y-8 lg:sticky lg:top-8">
              {/* 2. Agreement Details - Order 2 on Mobile, Top Right on Desktop */}
              <div className="order-2 w-full transition-all duration-300">
                <div className="bg-white border border-gray-200 rounded-[2.5rem] shadow-2xl p-6 sm:p-8 space-y-6 sm:space-y-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-[0.03] pointer-events-none">
                    <FileText className="w-32 h-32" />
                  </div>

                  <div className="space-y-5">
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                      <Info className="w-3.5 h-3.5" />
                      Agreement Details
                    </h3>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center shrink-0">
                        <FileText className="w-6 sm:w-7 h-6 sm:h-7 text-gray-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900 truncate text-base">{signingSession.document?.title}</p>
                        <p className="text-[10px] sm:text-xs text-gray-500 font-mono truncate uppercase tracking-tight opacity-70">ID: {signingSession.document?._id.slice(-12)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                      <User className="w-3.5 h-3.5" />
                      Participants
                    </h3>
                    <div className="space-y-4">
                      {participants.map((participant) => (
                        <div key={participant.email} className="flex items-center gap-4">
                          <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-black border transition-colors",
                            participant.status === "signed"
                              ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                              : "bg-gray-50 text-gray-400 border-gray-100"
                          )}>
                            {participant.initial}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-bold text-gray-900 truncate leading-none mb-1.5">{participant.email}</p>
                            <p className={cn(
                              "text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5",
                              participant.status === "signed" ? "text-emerald-600" :
                                participant.status === "viewed" ? "text-blue-500" : "text-gray-400"
                            )}>
                              {participant.status === "signed" ? (
                                <>
                                  <Check className="w-3 h-3 stroke-[3]" />
                                  Signed
                                </>
                              ) : participant.status === "viewed" ? (
                                <>
                                  <Info className="w-3 h-3" />
                                  Viewed
                                </>
                              ) : (
                                <>Pending</>
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 sm:pt-8 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Completed At</span>
                      <span className="text-xs sm:text-sm font-bold text-gray-800">{new Date().toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Status</span>
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">Digital Certificate Issued</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Account CTA - Last on Mobile, Side on Desktop */}
              <div className="order-4">
                <div className="bg-blue-600 rounded-[2.5rem] p-6 sm:p-8 text-white shadow-2xl shadow-blue-200 relative overflow-hidden group">
                  <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                    <Logo />
                  </div>
                  <div className="relative">
                    <h3 className="font-bold text-lg sm:text-xl mb-3 leading-tight">Need to send your own?</h3>
                    <p className="text-blue-100 text-[11px] mb-6 font-medium leading-relaxed opacity-90">
                      Join thousands of businesses using Boopsign for secure, verified digital signatures.
                    </p>
                    <Button asChild className="w-full bg-white text-blue-600 hover:bg-white/95 h-12 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl cursor-pointer">
                      <Link href={'/sign-in'}>
                        Create Account
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Minimal Footer */}
          <footer className="w-full py-6 sm:py-8 text-center relative z-10">
            <p className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] sm:tracking-[0.2em]">
              Secured & Verified by Boopsign.com
            </p>
          </footer>
        </div >
      </>
    );
  }

  if (!signingSession?.document) return null;

  // Show welcome screen directly (skipping OTP verification)
  /*
  if (!showWelcome) {
    return (
      <WelcomeScreen
        signingSession={signingSession}
        owner={owner}
        onProceed={() => setShowWelcome(true)}
        onGenerateOtp={async () => {
          try {
            await generateOtp({
              email: signingSession.signer.email,
              purpose: "signer_verification",
            });
            toast.success("New OTP sent to your email. Please check your inbox.");
            setHasOtpSent(true);
          } catch (error) {
            console.error("Error sending OTP:", error);
            toast.error("Failed to send OTP. Please try again.");
          }
        }}
      />
    );
  }
  */

  const totalFields = signatureFields.length;

  // const sidebarProps = {
  //   signingSession,
  //   owner,
  //   completedFields,
  //   totalFields,
  //   progressPercentage,
  //   requiredFields,
  //   completedRequiredFields,
  //   handleSubmitDocument,
  //   isSubmitting,
  // };

  return (
    <div className="h-dvh flex flex-col bg-gray-50/30 relative">
      {/* Adobe Sign Inspired Submitting Overlay */}
      {(isSubmitting) && (
        <div
          className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center animate-in fade-in duration-700"
        >
          <div className="flex flex-col items-center max-w-sm w-full space-y-12">
            {/* Custom Adobe-style Spinning Circle */}
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-gray-100 rounded-full" />
              <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <FileCheck className="w-8 h-8 text-blue-600 animate-pulse" />
              </div>
            </div>

            <div className="text-center space-y-4 px-6">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Finalizing Agreement</h2>
              <div className="space-y-2">
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                  We're securing your signatures and generating the final certified document.
                </p>
                <div className="flex items-center justify-center gap-2 pt-4">
                  <div className="px-3 py-1 bg-blue-50 rounded-full border border-blue-100/50 flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-700">AES-256 Encrypted</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="w-48 h-1 bg-gray-50 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 animate-indeterminate-progress rounded-full scale-x-75 origin-left" />
            </div>

            <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] animate-pulse">
              Please do not refresh the page
            </p>
          </div>
        </div>
      )}

      <SigningNavbar
        signingSession={signingSession}
        owner={owner}
        completedFields={completedFields}
        totalFields={totalFields}
        handleSubmitDocument={handleSubmitDocument}
        isSubmitting={isSubmitting}
        isReady={isReady}
        signatureFields={signatureFields}
        completedRequiredFields={completedRequiredFields}
        requiredFields={requiredFields}
        onDecline={() => setShowDeclineDialog(true)}
      />

      <div className="flex-1 flex overflow-hidden relative">
        {/* Thumbnail Sidebar - Hidden on Mobile */}
        <div className="hidden md:flex h-full z-20">
          <ThumbnailSidebar
            fileUrl={fileUrl}
            numPages={numPages}
            currentPage={currentPage}
            onPageClick={setCurrentPage}
          />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 relative flex flex-col bg-gray-100 overflow-hidden">
          <div
            className="absolute inset-0 z-0 pointer-events-none opacity-[0.4]"
            style={{
              backgroundImage: `
                repeating-linear-gradient(22.5deg, transparent, transparent 2px, rgba(75, 85, 99, 0.05) 2px, rgba(75, 85, 99, 0.05) 3px, transparent 3px, transparent 8px),
                repeating-linear-gradient(67.5deg, transparent, transparent 2px, rgba(107, 114, 128, 0.04) 2px, rgba(107, 114, 128, 0.04) 3px, transparent 3px, transparent 8px),
                repeating-linear-gradient(112.5deg, transparent, transparent 2px, rgba(55, 65, 81, 0.03) 2px, rgba(55, 65, 81, 0.03) 3px, transparent 3px, transparent 8px),
                repeating-linear-gradient(157.5deg, transparent, transparent 2px, rgba(31, 41, 55, 0.02) 2px, rgba(31, 41, 55, 0.02) 3px, transparent 3px, transparent 8px)
              `,
            }}
          />

          <div className={cn("flex-1 z-10 h-full transition-all duration-700 bg-transparent pb-[80px] md:pb-0", (!fileUrl || !isReady) ? "opacity-0 scale-[0.99] translate-y-1 pointer-events-none" : "opacity-100 scale-100 translate-y-0")}>
            {fileUrl && (
              <Suspense fallback={
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              }>
                <PdfViewerWrapper
                  fileUrl={fileUrl}
                  pageNumber={currentPage}
                  onPageChange={setCurrentPage}
                  onNumPagesChange={setNumPages}
                  onScaleChange={setScale}
                  showControls={false}
                  onReady={handlePdfReady}
                >
                  {(pNum: number) => (
                    <SigningPageOverlay
                      pNum={pNum}
                      signatureFields={signatureFields}
                      currentActiveFieldId={currentActiveField?.id}
                      handleFieldComplete={handleFieldComplete}
                    />
                  )}
                </PdfViewerWrapper>
              </Suspense>
            )}
          </div>

          <SigningZoomControls scale={scale} setScale={setScale} />
        </main>
      </div>

      <SigningBottomBar
        incompleteRequiredFields={incompleteRequiredFields}
        isSubmitting={isSubmitting}
        onNext={goToNextSignatureField}
        onSubmit={handleSubmitDocument}
      />

      {/* AlertDialog for Declining Document */}
      <AlertDialog open={showDeclineDialog} onOpenChange={setShowDeclineDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Document Decline</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to decline signing this document? This will void the agreement for all parties.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDecline}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes, Decline Document
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
