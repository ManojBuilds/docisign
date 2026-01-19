import type { SignatureFieldData as SigningFieldDataType } from "@/components/signing-field";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface UseDocumentSubmissionProps {
  accessToken: string;
  signingSession: any;
}

/**
 * Hook to handle document submission and decline logic
 */
export function useDocumentSubmission({ accessToken, signingSession }: UseDocumentSubmissionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const clientIPRef = useRef<string>("unknown");

  const batchCompleteFields = useMutation(api.signatureFields.batchCompleteSignatureFields);
  const declineDocumentMutation = useMutation(api.signers.declineDocument);


  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await fetch('https://api.ipify.org/?format=json');
        if (response.ok) {
          const data = await response.json();
          clientIPRef.current = data.ip;
        }
      } catch (error) {
        console.warn('Failed to pre-fetch client IP:', error);
      }
    };
    fetchIP();
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

  const handleSubmitDocument = useCallback(async (currentFields?: SigningFieldDataType[]) => {
    if (!signingSession || !currentFields) return;

    const requiredFields = currentFields.filter((f) => f.isRequired);
    const incompleteRequired = requiredFields.filter((f) => !f.isCompleted);

    if (incompleteRequired.length > 0) {
      toast.error(
        `Please complete all required fields (${incompleteRequired.length} remaining) to sign the contract`,
      );
      return {
        success: false,
        firstIncomplete: incompleteRequired[0],
        incompleteCount: incompleteRequired.length
      };
    }

    setIsSubmitting(true);
    try {
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
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            ip: clientIPRef.current
          }
        });
      }

      toast.success("Contract signed successfully!");
      setShowConfetti(true);
      setIsCompleted(true);
      return { success: true };
    } catch (error) {
      console.error(error);
      console.error(error);
      toast.error("Failed to finalize contract");
      return { success: false };
    } finally {
      setIsSubmitting(false);
    }
  }, [signingSession, batchCompleteFields]);

  return {
    isSubmitting,
    isCompleted,
    isDeclined,
    showConfetti,
    setShowConfetti,
    handleDecline,
    handleSubmitDocument,
  };
}
