
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Doc } from "@/convex/_generated/dataModel";
import { useSignersStore } from "@/stores/signersStore";
import { AlertCircle } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { AuditTrail } from "./audit-trail";
import { MessageSection } from "./message-section";
import { RecipientsList } from "./recipients-list";

interface ShareDialogContentProps {
  hasUnassignedFields?: boolean;
  customMessage: string;
  setCustomMessage: Dispatch<SetStateAction<string>>;
  documentStatus?: string;
  signatureFields?: Doc<"signatureFields">[];
}

export function ShareDialogContent({
  hasUnassignedFields,
  customMessage,
  setCustomMessage,
  signatureFields,
}: ShareDialogContentProps) {
  const { signers } = useSignersStore();
  const [expandedSigners, setExpandedSigners] = useState<Set<string>>(new Set());

  const getSignerStatus = (email: string) => {
    if (!signatureFields) return "pending";
    const signerFields = signatureFields.filter(f => f.signerEmail === email);
    if (signerFields.length === 0) return "pending";
    const allCompleted = signerFields.every(f => f.isCompleted);
    const someCompleted = signerFields.some(f => f.isCompleted);
    if (allCompleted) return "signed";
    if (someCompleted) return "partially_signed";
    return "pending";
  };

  return (
    <div className="space-y-6">
      {hasUnassignedFields && (
        <Alert variant="destructive" className="bg-red-50 border-red-100 dark:bg-red-900/10">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-800 font-semibold">Unassigned Fields</AlertTitle>
          <AlertDescription className="text-red-700 text-xs mt-1">
            There are signature fields without assigned signers. Please verify before sending.
          </AlertDescription>
        </Alert>
      )}

      <RecipientsList
        signers={signers}
        getSignerStatus={getSignerStatus}
      />

      <MessageSection
        customMessage={customMessage}
        setCustomMessage={setCustomMessage}
      />

      {signatureFields && signatureFields.some(f => f.isCompleted) && (
        <AuditTrail
          signatureFields={signatureFields}
          expandedSigners={expandedSigners}
          setExpandedSigners={setExpandedSigners}
        />
      )}
    </div>
  );
}
