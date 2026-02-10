"use client";

import { Button } from "@/components/ui/button";
import { Confetti } from "@/components/ui/confetti";
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { Send } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import posthog from "posthog-js";
import { ConfigurationView } from "./share-dialog/ConfigurationView";
import { StatusView } from "./share-dialog/StatusView";
import { SuccessView } from "./share-dialog/SuccessView";
import { ShareDialogProps, Signer } from "@/components/share-dialog/types";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogTrigger,
} from "@/components/responsive-dialog";
import { useTrialStatus } from "@/hooks/useTrialStatus";

export function ShareDialog({
  documentId,
  document: propDocument,
  onSend,
  open,
  onOpenChange,
  hasUnassignedFields,
  signatureFields: propSignatureFields,
  signers: propSigners,
  children,
}: ShareDialogProps & { skipSignerSync?: boolean; children?: React.ReactNode }) {
  // Fetch document details only if not provided as prop
  const queriedDocument = useQuery(
    api.documents.getDocument,
    propDocument ? "skip" : { documentId }
  );
  const document = propDocument || queriedDocument;
  const dbSignatureFields = useQuery(api.signatureFields.getDocumentSignatureFields, { documentId });
  const { plan, isPaidUser } = useTrialStatus();
  const removeSignerMutation = useMutation(api.signers.removeSigner);

  // Determine max recipients based on plan
  const isProfessionalPlan = plan === "professional" || (isPaidUser && plan !== "starter");
  const maxRecipients = isProfessionalPlan ? 5 : 1;

  // Source of truth priority: Props (Editor Store) > DB (Saved state)
  const signatureFields = (propSignatureFields || dbSignatureFields) as any[];

  const [customMessage, setCustomMessage] = useState("");
  const [forceShowConfig, setForceShowConfig] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const hasPendingFields = signatureFields?.some(field => field.status === 'pending' || !field.status);
  const hasCompletedFields = signatureFields?.some(field => field.isCompleted);
  const [internalOpen, setInternalOpen] = useState(false);
  const isActualOpen = open !== undefined ? open : internalOpen;
  const isOpenRef = useRef(isActualOpen);
  isOpenRef.current = isActualOpen;

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  // Merge signers for the dialog.
  const mergedSigners = useMemo<Signer[]>(() => {
    if (propSigners && propSigners.length > 0) {
      return propSigners;
    }

    const uniqueSignersMap = new Map<string, Signer>();

    if (signatureFields) {
      signatureFields.forEach(field => {
        if (field.signerEmail && !uniqueSignersMap.has(field.signerEmail)) {
          uniqueSignersMap.set(field.signerEmail, {
            email: field.signerEmail,
            name: field.signerName || undefined,
          });
        }
      });
    }

    return Array.from(uniqueSignersMap.values());
  }, [signatureFields, propSigners]);


  // Handle removing a signer
  const handleRemoveSigner = useCallback(async (email: string) => {
    try {
      await removeSignerMutation({
        documentId,
        signerEmail: email,
      });
      toast.success(`Removed ${email}`);
    } catch (error: any) {
      toast.error(error.message || "Failed to remove recipient");
    }
  }, [documentId, removeSignerMutation]);


  const usageStats = useQuery(api.users.getUsageStats, document?.ownerId ? { clerkId: document.ownerId } : "skip");

  const handleSend = async () => {
    if (mergedSigners.length === 0) {
      toast.error("Please add at least one signer by assigning them to a field.");
      return;
    }

    // Check if user is on trial and has reached signature request limit
    if (plan === "trial" && usageStats) {
      const sigReq = usageStats.signatureRequests;
      if (sigReq.used >= sigReq.limit) {
        toast.error("You've reached your limit of 1 signature request during the trial. Please upgrade to send more documents.");
        return;
      }
    }

    setIsSending(true);
    try {
      await onSend(mergedSigners, customMessage);

      posthog.capture('document_sent', {
        document_id: documentId,
        signer_count: mergedSigners.length,
        has_custom_message: !!customMessage,
      });

      setShowConfetti(true);
    } catch (error) {
      console.error(error);
      toast.error("Failed to send document.");
    } finally {
      setIsSending(false);
    }
  };

  const handleOpenChange = (val: boolean) => {
    if (!val) {
      setForceShowConfig(false);
      setShowConfetti(false);
    }
    if (open !== undefined) {
      onOpenChange?.(val);
    } else {
      setInternalOpen(val);
    }
  };

  // Helper for closing layout
  const handleClose = () => handleOpenChange(false);
  const handleConfigureClick = () => setForceShowConfig(true);


  return (
    <>
      {showConfetti && (
        <div className="fixed inset-0 z-[999] pointer-events-none">
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
      <ResponsiveDialog open={isActualOpen} onOpenChange={handleOpenChange}>
        <ResponsiveDialogTrigger asChild>
          {children || (
            <Button className="w-full sm:w-auto font-semibold shadow-sm cursor-pointer">
              <Send className="w-4 h-4 mr-2" />
              Request Signature
            </Button>
          )}
        </ResponsiveDialogTrigger>
        <ResponsiveDialogContent className="sm:max-w-xl p-0 gap-0 overflow-hidden bg-white border-0 shadow-2xl rounded-2xl ring-1 ring-zinc-900/5 max-h-[90vh]">
          {showConfetti ? (
            <SuccessView onClose={handleClose} />
          ) : (!forceShowConfig && document?.status &&
            (document.status === 'sent' ||
              document.status === 'in_progress' ||
              document.status === 'completed' ||
              document.status === 'cancelled' ||
              document.status === 'declined' ||
              document.status === 'expired')) ? (
            <StatusView
              documentStatus={document.status}
              hasPendingFields={hasPendingFields}
              hasCompletedFields={hasCompletedFields}
              signatureFields={signatureFields}
              signers={mergedSigners}
              forceShowConfig={forceShowConfig}
              setForceShowConfig={setForceShowConfig}
              onClose={handleClose}
              onConfigureClick={handleConfigureClick}
            />
          ) : (
            <ConfigurationView
              documentId={documentId}
              document={document}
              hasUnassignedFields={hasUnassignedFields}
              customMessage={customMessage}
              setCustomMessage={setCustomMessage}
              signatureFields={signatureFields}
              signers={mergedSigners}
              isSending={isSending}
              onSend={handleSend}
              onClose={handleClose}
              onRemoveSigner={document?.status === "draft" ? handleRemoveSigner : undefined}
              maxRecipients={maxRecipients}
              isProfessionalPlan={isProfessionalPlan}
              usageStats={usageStats}
            />
          )}
        </ResponsiveDialogContent>
      </ResponsiveDialog>
    </>
  );
}
