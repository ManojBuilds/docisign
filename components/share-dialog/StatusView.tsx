import { Button } from "@/components/ui/button";
import { DialogClose, DialogTitle } from "@/components/ui/dialog";
import { DrawerClose, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Doc } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
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
  isDesktop = true,
}: StatusViewProps) => {

  const getStatusDisplay = () => {
    switch (documentStatus.toLowerCase()) {
      case 'sent':
        return {
          icon: <Send className="w-8 h-8 text-blue-600" />,
          title: 'Waiting for Signature',
          message: 'Document has been successfully sent. Tracking status is now active.',
          color: 'bg-blue-50 ring-1 ring-inset ring-blue-100 text-blue-700'
        };
      case 'in_progress':
        return {
          icon: <Loader2 className="w-8 h-8 text-amber-600 animate-spin" />,
          title: 'Signing in Progress',
          message: 'Signers are currently reviewing and signing the document.',
          color: 'bg-amber-50 ring-1 ring-inset ring-amber-100 text-amber-700'
        };
      case 'completed':
        return {
          icon: <CheckCircle2 className="w-8 h-8 text-green-600" />,
          title: 'Successfully Completed',
          message: 'All parties have signed. A final copy has been distributed.',
          color: 'bg-green-50 ring-1 ring-inset ring-green-100 text-green-700'
        };
      case 'cancelled':
        return {
          icon: <X className="w-8 h-8 text-red-600" />,
          title: 'Document Cancelled',
          message: 'The signing process has been terminated.',
          color: 'bg-red-50 ring-1 ring-inset ring-red-100 text-red-700'
        };
      case 'declined':
        return {
          icon: <AlertCircle className="w-8 h-8 text-red-600" />,
          title: 'Document Declined',
          message: 'One or more signers have declined to sign this document.',
          color: 'bg-red-50 ring-1 ring-inset ring-red-100 text-red-700'
        };
      case 'expired':
        return {
          icon: <Clock className="w-8 h-8 text-zinc-600" />,
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

  if (isDesktop) {
    return (
      <div className="flex flex-col h-full">
        <div className={cn("p-8 text-center border-b border-transparent", statusDisplay.color)}>
          <div className="w-16 h-16 bg-white/50 rounded-full flex items-center justify-center mx-auto mb-4 ring-1 ring-black/5 backdrop-blur-sm">
            {statusDisplay.icon}
          </div>
          <DialogTitle className="text-xl font-semibold mb-2 tracking-tight text-center">
            {hasPendingFields ? "New Fields Added" : statusDisplay.title}
          </DialogTitle>
          <p className="text-sm opacity-90 max-w-sm mx-auto font-medium">
            {hasPendingFields
              ? "You have added new fields to this document. Save and send the request to notify signers."
              : statusDisplay.message}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto max-h-[60vh]">
          {/* Recipients List in Status View */}
          <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/30">
            <RecipientsList signers={signers} signatureFields={signatureFields} readonly />
          </div>

          {/* Action to re-send if new fields exist */}
          {hasPendingFields && (
            <div className="p-6 bg-blue-50/50 border-b border-blue-100 italic text-sm text-blue-700 text-center">
              <Button
                variant="link"
                onClick={onConfigureClick}
                className="text-blue-600 font-semibold hover:text-blue-700 underline"
              >
                Click here to configure and send new requests
              </Button>
            </div>
          )}

          {/* Audit Trail for Documents with at least one signature */}
          {hasCompletedFields && signatureFields && (
            <AuditTrail signatureFields={signatureFields} />
          )}
        </div>

        <div className="p-6 border-t border-zinc-100 bg-zinc-50 flex gap-3">
          <DialogClose asChild>
            <Button variant="outline" className="flex-1 font-semibold bg-white ring-1 ring-zinc-200 shadow-none border-0 hover:bg-zinc-50">
              Close
            </Button>
          </DialogClose>
          {hasPendingFields && (
            <Button
              onClick={onConfigureClick}
              className="flex-1 font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-none ring-1 ring-transparent transition-all"
            >
              Configure & Send
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Mobile
  return (
    <div className="flex flex-col h-full">
      <DrawerHeader className="border-b border-zinc-100">
        <DrawerTitle className="flex items-center gap-2">
          {statusDisplay.icon}
          {hasPendingFields ? "New Fields Added" : statusDisplay.title}
        </DrawerTitle>
      </DrawerHeader>
      <div className="p-4 overflow-y-auto">
        <p className="text-zinc-600 mb-6 font-medium text-sm">
          {hasPendingFields
            ? "You have added new fields to this document. Save and send the request to notify signers."
            : statusDisplay.message}
        </p>

        {hasPendingFields && (
          <Button
            variant="outline"
            onClick={onConfigureClick}
            className="w-full mb-6 py-6 ring-1 ring-blue-200 text-blue-700 bg-blue-50/50 font-semibold border-0"
          >
            Configure & Send New Requests
          </Button>
        )}

        {/* Simplified Audit for Mobile */}
        {hasCompletedFields && signatureFields && (
          <AuditTrail signatureFields={signatureFields} />
        )}
      </div>
      <DrawerFooter>
        <DrawerClose asChild>
          <Button variant="outline">Close</Button>
        </DrawerClose>
      </DrawerFooter>
    </div>
  );
};
