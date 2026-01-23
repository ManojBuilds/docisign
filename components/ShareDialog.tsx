"use client";

import { Button } from "@/components/ui/button";
import { Confetti } from "@/components/ui/confetti";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { api } from "@/convex/_generated/api";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useSignersStore } from "@/stores/signersStore";
import { useQuery } from "convex/react";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import posthog from "posthog-js";
import { ConfigurationView } from "./share-dialog/ConfigurationView";
import { StatusView } from "./share-dialog/StatusView";
import { SuccessView } from "./share-dialog/SuccessView";
import { ShareDialogProps } from "./share-dialog/types";

export function ShareDialog({
  documentId,
  onSend,
  open,
  onOpenChange,
  hasUnassignedFields,
  skipSignerSync = false,
}: ShareDialogProps & { skipSignerSync?: boolean }) {
  // Fetch document details including signers
  const document = useQuery(api.documents.getDocument, { documentId });
  const signatureFields = useQuery(api.signatureFields.getDocumentSignatureFields, { documentId });
  const { signers, setSigners } = useSignersStore();
  const [customMessage, setCustomMessage] = useState("");
  const [forceShowConfig, setForceShowConfig] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const hasPendingFields = signatureFields?.some(field => field.status === 'pending');
  const hasCompletedFields = signatureFields?.some(field => field.isCompleted);
  const isDesktop = useMediaQuery("(min-width: 640px)");
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

  useEffect(() => {
    if (skipSignerSync) return;

    if (document && document.signatureFields) {
      // Extract unique signers from the document's signature fields
      // Only include signers that are actually assigned to signature fields
      const uniqueSigners = new Map();

      document.signatureFields.forEach(field => {
        if (field.signerEmail) {
          if (!uniqueSigners.has(field.signerEmail)) {
            uniqueSigners.set(field.signerEmail, {
              email: field.signerEmail,
              name: field.signerName || undefined,
            });
          }
        }
      });

      const documentSigners = Array.from(uniqueSigners.values());
      setSigners(documentSigners);
    }
  }, [document, setSigners, skipSignerSync]);


  const handleSend = async () => {
    if (signers.length === 0) {
      toast.error("Please add at least one signer.");
      return;
    }

    setIsSending(true);
    try {
      await onSend(signers, customMessage);

      posthog.capture('document_sent', {
        document_id: documentId,
        signer_count: signers.length,
        has_custom_message: !!customMessage,
      });

      // Trigger confetti effect
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

  if (isDesktop) {
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
        <Dialog open={isActualOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto font-semibold shadow-sm cursor-pointer">
              <Send className="w-4 h-4 mr-2" />
              Request Signature
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-xl p-0 gap-0 overflow-hidden bg-white border-0 shadow-2xl rounded-2xl ring-1 ring-zinc-900/5">
            {showConfetti ? (
              <SuccessView isDesktop={true} onClose={handleClose} />
            ) : (!forceShowConfig && document?.status &&
              (document.status === 'sent' ||
                document.status === 'in_progress' ||
                document.status === 'completed' ||
                document.status === 'cancelled' ||
                document.status === 'declined' ||
                document.status === 'expired')) ? (
              <StatusView
                isDesktop={true}
                documentStatus={document.status}
                hasPendingFields={hasPendingFields}
                hasCompletedFields={hasCompletedFields}
                signatureFields={signatureFields}
                signers={signers}
                forceShowConfig={forceShowConfig}
                setForceShowConfig={setForceShowConfig}
                onClose={handleClose}
                onConfigureClick={handleConfigureClick}
              />
            ) : (
              <ConfigurationView
                isDesktop={true}
                hasUnassignedFields={hasUnassignedFields}
                customMessage={customMessage}
                setCustomMessage={setCustomMessage}
                signatureFields={signatureFields}
                signers={signers}
                isSending={isSending}
                onSend={handleSend}
                onClose={handleClose}
              />
            )}
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // Mobile Drawer Implementation
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
      <Drawer open={isActualOpen} onOpenChange={handleOpenChange}>
        <DrawerTrigger asChild>
          <Button className="w-full sm:w-auto font-semibold shadow-sm">
            <Send className="w-4 h-4 mr-2" />
            Request Signature
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[90vh]">
          {showConfetti ? (
            <SuccessView isDesktop={false} onClose={handleClose} />
          ) : (!forceShowConfig && document?.status &&
            (document.status === 'sent' ||
              document.status === 'in_progress' ||
              document.status === 'completed' ||
              document.status === 'cancelled' ||
              document.status === 'declined' ||
              document.status === 'expired')) ? (
            <StatusView
              isDesktop={false}
              documentStatus={document.status}
              hasPendingFields={hasPendingFields}
              hasCompletedFields={hasCompletedFields}
              signatureFields={signatureFields}
              signers={signers}
              forceShowConfig={forceShowConfig}
              setForceShowConfig={setForceShowConfig}
              onClose={handleClose}
              onConfigureClick={handleConfigureClick}
            />
          ) : (
            <ConfigurationView
              isDesktop={false}
              hasUnassignedFields={hasUnassignedFields}
              customMessage={customMessage}
              setCustomMessage={setCustomMessage}
              signatureFields={signatureFields}
              signers={signers}
              isSending={isSending}
              onSend={handleSend}
              onClose={handleClose}
            />
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
