import { Button } from "@/components/ui/button";
import {
  ResponsiveDialogClose,
  ResponsiveDialogTitle,
  ResponsiveDialogHeader,
  ResponsiveDialogFooter
} from "@/components/responsive-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Doc } from "@/convex/_generated/dataModel";
import { AlertCircle, CheckCircle2, Clock, Loader2, Send, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { AuditTrail } from "./AuditTrail";
import { RecipientsList } from "./RecipientsList";
import { CommonViewProps, Signer } from "./types";

interface StatusViewProps extends CommonViewProps {
  documentStatus: string;
  hasPendingFields?: boolean;
  hasCompletedFields?: boolean;
  signatureFields?: Doc<"signatureFields">[];
  signers: Signer[];
  forceShowConfig: boolean;
  setForceShowConfig: Dispatch<SetStateAction<boolean>>;
  onConfigureClick: () => void;
}

export const StatusView = ({
  documentStatus,
  hasPendingFields,
  hasCompletedFields,
  signatureFields,
  signers,
  onConfigureClick,
}: StatusViewProps) => {

  const getStatusDisplay = () => {
    switch (documentStatus.toLowerCase()) {
      case 'sent':
        return {
          icon: <Clock className="w-4 h-4 md:w-6 md:h-6 text-blue-600" />,
          title: 'Waiting for Signature',
          message: 'Document has been successfully sent. Tracking status is now active.',
          color: 'bg-blue-50 ring-1 ring-inset ring-blue-100 text-blue-700'
        };
      case 'in_progress':
        return {
          icon: <Loader2 className="w-4 h-4 md:w-6 md:h-6 text-amber-600 animate-spin" />,
          title: 'Signing in Progress',
          message: 'Signers are currently reviewing and signing the document.',
          color: 'bg-amber-50 ring-1 ring-inset ring-amber-100 text-amber-700'
        };
      case 'completed':
        return {
          icon: <CheckCircle2 className="w-4 h-4 md:w-6 md:h-6 text-green-600" />,
          title: 'Successfully Completed',
          message: 'All parties have signed. A final copy has been distributed.',
          color: 'bg-green-50 ring-1 ring-inset ring-green-100 text-green-700'
        };
      case 'cancelled':
        return {
          icon: <X className="w-4 h-4 md:w-6 md:h-6 text-red-600" />,
          title: 'Document Cancelled',
          message: 'The signing process has been terminated.',
          color: 'bg-red-50 ring-1 ring-inset ring-red-100 text-red-700'
        };
      case 'declined':
        return {
          icon: <AlertCircle className="w-4 h-4 md:w-6 md:h-6 text-red-600" />,
          title: 'Document Declined',
          message: 'One or more signers have declined to sign this document.',
          color: 'bg-red-50 ring-1 ring-inset ring-red-100 text-red-700'
        };
      case 'expired':
        return {
          icon: <Clock className="w-4 h-4 md:w-6 md:h-6 text-zinc-600" />,
          title: 'Link Expired',
          message: 'The secure signing link has expired.',
          color: 'bg-zinc-50 ring-1 ring-inset ring-zinc-100 text-zinc-700'
        };
      case 'draft':
      default:
        return null;
    }
  };

  const statusDisplay = getStatusDisplay();

  if (!statusDisplay) return null;

  // Only show "New Fields Added" if we have pending fields AND some fields are already sent/completed.
  const isHybridState = hasPendingFields && (hasCompletedFields || signatureFields?.some(f =>
    f.status === 'sent' || f.status === 'viewed' || f.status === 'signed'
  ));

  return (
    <div className="flex flex-col h-full">
      <ResponsiveDialogHeader className="p-6 border-b border-zinc-100 bg-zinc-50/50">
        <div className="flex items-center justify-between">
          <ResponsiveDialogTitle className="w-full font-semibold text-zinc-900 tracking-tight flex items-center justify-center md:justify-start gap-2">
            {isHybridState ? "New Fields Added" : statusDisplay.title}
          </ResponsiveDialogTitle>
        </div>
        <p className="text-sm text-zinc-500 font-medium">
          {isHybridState
            ? "You have added new fields to this document. Save and send the request to notify signers."
            : statusDisplay.message}
        </p>
      </ResponsiveDialogHeader>

      <ScrollArea className="flex-1 py-4 md:px-6 md:py-8">
        {/* Recipients List in Status View */}
        <div className="mb-6">
          <RecipientsList signers={signers} signatureFields={signatureFields} readonly />
        </div>

        {/* Action to re-send if new fields exist */}
        {hasPendingFields && (
          <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-lg italic text-sm text-blue-700 text-center mb-6">
            <Button
              variant="link"
              onClick={onConfigureClick}
              className="text-blue-600 font-semibold hover:text-blue-700 underline p-0 h-auto"
            >
              Click here to configure and send new requests
            </Button>
          </div>
        )}

        {/* Audit Trail for Documents with at least one signature */}
        {hasCompletedFields && signatureFields && (
          <AuditTrail variant="default" signatureFields={signatureFields} />
        )}
      </ScrollArea>

      <ResponsiveDialogFooter className="p-6 border-t border-zinc-100 bg-zinc-50 flex gap-3">
        <ResponsiveDialogClose asChild>
          <Button variant="secondary" className="flex-1 font-semibold bg-white shadow-none ring-1 ring-zinc-900/10 border-0 hover:bg-zinc-50 text-zinc-700">
            Close
          </Button>
        </ResponsiveDialogClose>
        {hasPendingFields && (
          <Button
            onClick={onConfigureClick}
            className="flex-1 font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-none ring-1 ring-blue-600 transition-all"
          >
            Configure & Send
          </Button>
        )}
      </ResponsiveDialogFooter>
    </div>
  );
};
