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
  const completeSignature = useMutation(
    api.signatureFields.completeSignatureField,
  );
  const finalizeDocument = useMutation(api.signers.finalizeDocument);
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

  const participants = useMemo(() => {
    if (!allDocumentFields) return [];

    // Check if we have locally completed the document to optimistically update status
    // This prevents a race condition where the UI shows "Pending" while the query revalidates
    const currentSignerEmail = signingSession?.signer?.email;

    const uniqueSigners = new Map();
    allDocumentFields.forEach(field => {
      if (!uniqueSigners.has(field.signerEmail)) {
        let status = field.status;

        // Optimistic update for current user
        if (currentSignerEmail && field.signerEmail === currentSignerEmail) {
          if (isDeclined) {
            status = 'declined';
          } else if (isCompleted) {
            status = 'signed';
          }
        }

        uniqueSigners.set(field.signerEmail, {
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

  // Load and normalize signature fields
  useEffect(() => {
    if (signingSession?.signatureFields && pageDimensions) {
      const fields: SigningFieldDataType[] = signingSession.signatureFields
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

      if (JSON.stringify(signatureFields) !== JSON.stringify(fields)) {
        setSignatureFields(fields);

        if (!hasAutoNavigated) {
          const incompleteRequired = fields.filter(
            (f) => f.isRequired && !f.isCompleted,
          );
          if (incompleteRequired.length > 0) {
            setCurrentPage(incompleteRequired[0].page);
            setCurrentSignatureFieldIndex(0);
          }
          setHasAutoNavigated(true);
        }
      }
    }
  }, [signingSession?.signatureFields, pageDimensions, hasAutoNavigated, signatureFields]);

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

  const handleFieldComplete = useCallback(async (
    fieldId: string,
    signatureData: string,
  ) => {
    if (!signingSession) return;
    try {
      // Gather audit trail information
      const auditInfo = {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        // We'll get the IP through a server-side API call
      };

      // Get IP address from server endpoint
      let clientIP = null;
      try {
        const response = await fetch('/api/client-info');
        if (response.ok) {
          const data = await response.json();
          clientIP = data.ip;
        }
      } catch (error) {
        console.warn('Failed to get client IP:', error);
        clientIP = 'unknown';
      }

      // Check if this completion will satisfy all requirements BEFORE making any changes
      const requiredFields = signatureFields.filter((f) => f.isRequired);
      const incompleteRequired = requiredFields.filter(
        (f) => !f.isCompleted && f.id !== fieldId,
      );

      if (incompleteRequired.length === 0) {
        // All required fields will be completed, show success UI immediately
        setIsSubmitting(true);

        // Complete the signature with audit trail info and finalize in the background
        await completeSignature({
          fieldId: fieldId as any,
          signatureData,
          auditInfo: {
            ...auditInfo,
            ip: clientIP
          }
        });

        // Finalization is handled by the backend mutation automatically

        setIsCompleted(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
        setIsSubmitting(false);
        return; // Exit early
      }

      // If there are more fields to complete, proceed normally
      await completeSignature({
        fieldId: fieldId as any,
        signatureData,
        auditInfo: {
          ...auditInfo,
          ip: clientIP
        }
      });

      // Update local state
      const updatedSignatureFields = signatureFields.map((field) =>
        field.id === fieldId
          ? { ...field, isCompleted: true, signatureData }
          : field,
      );
      setSignatureFields(updatedSignatureFields);

      toast.success("Signature added to contract successfully!");

      // Re-evaluate incomplete required fields after update
      const remainingIncomplete = updatedSignatureFields.filter(
        (f) => f.isRequired && !f.isCompleted,
      );

      if (remainingIncomplete.length > 0) {
        // Find the next field to highlight
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
    } catch (error) {
      console.error(error)
      toast.error("Failed to save signature");
      setIsSubmitting(false);
    }
  }, [signingSession, signatureFields, currentPage, completeSignature]);

  const handleSubmitDocument = useCallback(async () => {
    if (!signingSession) return;
    const requiredFields = signatureFields.filter((f) => f.isRequired);
    const incompleteRequired = requiredFields.filter((f) => !f.isCompleted);

    if (incompleteRequired.length > 0) {
      toast.error(
        `Please complete all required fields (${incompleteRequired.length} remaining) to sign the contract`,
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
      toast.success("Contract signed successfully!");
      setShowConfetti(true);
      setIsCompleted(true);
      // Keep confetti for 5 seconds
      setTimeout(() => setShowConfetti(false), 5000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to finalize contract");
    } finally {
      setIsSubmitting(false);
    }
  }, [signingSession, signatureFields, incompleteRequiredFields, finalizeDocument]);

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

        <div className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
          <div className="mb-8 scale-110">
            <Logo />
          </div>

          <div className="flex flex-col items-center space-y-4">
            <div className="h-1.5 w-48 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-primary animate-indeterminate-progress rounded-full" />
            </div>
            <p className="text-sm font-medium text-gray-400 uppercase tracking-widest animate-pulse">
              Preparing Document...
            </p>
          </div>

          <div className="mt-12 flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100/50">
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
        <header className="w-full h-16 bg-white/80 backdrop-blur-md border-b flex items-center px-8 justify-between relative z-10">
          <div className="flex items-center gap-4">
            <Logo />
            <div className="h-4 w-[1px] bg-gray-200" />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">Access Denied</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.2em] flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3" />
              Security Alert
            </span>
          </div>
        </header>

        <main className="flex-1 w-full max-w-2xl mx-auto px-6 flex flex-col items-center justify-center relative z-10 text-center -mt-16">
          <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mb-8 border border-red-100 shadow-xl shadow-red-500/10">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>

          <h1 className="text-4xl font-black text-gray-900 leading-tight mb-4 tracking-tight">
            Invalid or Expired Link
          </h1>

          <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-lg mb-8">
            This secure document access link is no longer valid. It may have expired, been revoked, or already been used.
          </p>

          <div className="p-6 bg-gray-50 border border-gray-100 rounded-2xl w-full max-w-md">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2">What should I do?</h3>
            <p className="text-sm text-gray-500">
              Please check your email for a newer link or contact the sender directly to request a fresh signing invitation.
            </p>
          </div>
        </main>

        {/* Minimal Footer */}
        <footer className="w-full py-8 text-center relative z-10">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
            Secured & Verified by Boopsign.com
          </p>
        </footer>
      </div>
    );
  }


  const isCancelled = signingSession.document?.status === "cancelled" || signingSession.document?.status === "declined" || isDeclined;

  if (isCompleted || signingSession.document?.status === "completed" || isCancelled) {
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
          <header className="w-full h-16 bg-white/80 backdrop-blur-md border-b flex items-center px-8 justify-between relative z-10">
            <div className="flex items-center gap-4">
              <Logo />
              <div className="h-4 w-[1px] bg-gray-200" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">Agreement Management</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3" />
                Verified Transaction
              </span>
            </div>
          </header>

          <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-12 relative z-10 flex flex-col md:flex-row gap-12 items-start">
            {/* Left Column: Hero & Actions */}
            <div className="flex-1 space-y-10">
              <div className="space-y-4">
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

                <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-[1.1] tracking-tight">
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

                <p className="text-lg text-gray-600 font-medium leading-relaxed">
                  {isCancelled ? (
                    <>
                      You have chosen to decline
                      <span className="text-gray-900 font-bold mx-1.5">&ldquo;{signingSession.document?.title}&rdquo;</span>.
                      The sender has been notified and the document is now void.
                    </>
                  ) : (
                    <>
                      The document
                      <span className="text-gray-900 font-bold mx-1.5">&ldquo;{signingSession.document?.title}&rdquo;</span>
                      has been successfully signed and returned to the sender.
                    </>
                  )}
                </p>
              </div>

              {!isCancelled && (
                <div className="space-y-4 pt-4">
                  <Button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="w-full md:w-auto px-8 bg-gray-900 hover:bg-black text-white rounded-xl h-14 font-bold text-sm shadow-xl shadow-gray-200 uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 group"
                  >
                    {isDownloading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        <Download className="h-5 w-5 mr-3 group-hover:translate-y-0.5 transition-transform" />
                        Download Signed PDF
                      </>
                    )}
                  </Button>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em] ml-2">
                    A copy has been sent to your email
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">Audit Trail</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">View the complete certified activity trail for this agreement.</p>
                </div>
                <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">Verify Signature</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">Verify the authenticity and integrity of the digital signatures applied.</p>
                </div>
              </div>
            </div>

            {/* Right Column: Status Card */}
            <div className="w-full md:w-[360px] space-y-6">
              <div className="bg-white border border-gray-200 rounded-3xl shadow-2xl p-8 space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
                  <FileText className="w-24 h-24" />
                </div>

                <div className="space-y-4">
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Info className="w-3 h-3" />
                    Agreement Details
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center shrink-0">
                      <FileText className="w-6 h-6 text-gray-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-gray-900 truncate text-sm">{signingSession.document?.title}</p>
                      <p className="text-[10px] text-gray-500 font-mono truncate uppercase tracking-tight">ID: {signingSession.document?._id.slice(-8)}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <User className="w-3 h-3" />
                    Participants
                  </h3>
                  <div className="space-y-3">
                    {participants.map((participant) => (
                      <div key={participant.email} className="flex items-center gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border",
                          participant.status === "signed"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                            : "bg-gray-50 text-gray-400 border-gray-100"
                        )}>
                          {participant.initial}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-gray-900 truncate leading-none mb-0.5">{participant.email}</p>
                          <p className={cn(
                            "text-[9px] font-black uppercase tracking-widest flex items-center gap-1",
                            participant.status === "signed" ? "text-emerald-600" : "text-gray-400"
                          )}>
                            {participant.status === "signed" ? (
                              <>
                                <Check className="w-2 h-2" />
                                Signed
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

                <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Signed At</span>
                    <span className="text-xs font-bold text-gray-800">{new Date().toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Time</span>
                    <span className="text-xs font-bold text-gray-800">{new Date().toLocaleTimeString(undefined, { timeStyle: 'short' })}</span>
                  </div>
                </div>
              </div>

              {/* Account CTA */}
              <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-200 relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
                  <Logo />
                </div>
                <h3 className="font-bold text-lg mb-2 leading-tight">Need to send your own documents?</h3>
                <p className="text-blue-100 text-xs mb-6 font-medium leading-relaxed">
                  Join thousands of businesses using Boopsign for secure, verified digital signatures.
                </p>
                <Button asChild className="w-full bg-white text-blue-600 hover:bg-blue-50 h-10 rounded-xl font-black text-[10px] uppercase tracking-[0.2em]">
                  <Link href={'/sign-in'}>
                    Create Free Account
                  </Link>
                </Button>
              </div>
            </div>
          </main>

          {/* Minimal Footer */}
          <footer className="w-full py-8 text-center relative z-10">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              Secured & Verified by Boopsign.com
            </p>
          </footer>
        </div>
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
    <div className="h-dvh flex flex-col bg-gray-50/30">
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
