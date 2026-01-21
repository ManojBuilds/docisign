
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogTitle } from "@/components/ui/dialog";
import { Doc } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Clock, FileCheck, Loader2, Mail, Send, X } from "lucide-react";
import { useState } from "react";

interface StatusViewProps {
  documentStatus?: string;
  hasPendingFields: boolean;
  hasCompletedFields: boolean;
  signatureFields?: Doc<"signatureFields">[];
  onForceConfig: () => void;
}

export function StatusView({
  documentStatus,
  hasPendingFields,
  hasCompletedFields,
  signatureFields,
  onForceConfig
}: StatusViewProps) {
  const [expandedSigners, setExpandedSigners] = useState<Set<string>>(new Set());

  const getStatusDisplay = () => {
    if (!documentStatus) return null;

    switch (documentStatus.toLowerCase()) {
      case 'sent':
        return {
          icon: <Send className="w-8 h-8 text-blue-600" />,
          title: 'Waiting for Signature',
          message: 'Document has been successfully sent. Tracking status is now active.',
          color: 'bg-blue-50 border-blue-100 text-blue-700'
        };
      case 'in_progress':
        return {
          icon: <Loader2 className="w-8 h-8 text-amber-600 animate-spin" />,
          title: 'Signing in Progress',
          message: 'Signers are currently reviewing and signing the document.',
          color: 'bg-amber-50 border-amber-100 text-amber-700'
        };
      case 'completed':
        return {
          icon: <CheckCircle2 className="w-8 h-8 text-green-600" />,
          title: 'Successfully Completed',
          message: 'All parties have signed. A final copy has been distributed.',
          color: 'bg-green-50 border-green-100 text-green-700'
        };
      case 'cancelled':
        return {
          icon: <X className="w-8 h-8 text-red-600" />,
          title: 'Document Cancelled',
          message: 'The signing process has been terminated.',
          color: 'bg-red-50 border-red-100 text-red-700'
        };
      case 'declined':
        return {
          icon: <AlertCircle className="w-8 h-8 text-red-600" />,
          title: 'Document Declined',
          message: 'One or more signers have declined to sign this document.',
          color: 'bg-red-50 border-red-100 text-red-700'
        };
      case 'expired':
        return {
          icon: <Clock className="w-8 h-8 text-gray-600" />,
          title: 'Link Expired',
          message: 'The secure signing link has expired.',
          color: 'bg-gray-50 border-gray-100 text-gray-700'
        };
      default:
        return null;
    }
  };

  const statusDisplay = getStatusDisplay();

  if (!statusDisplay) return null;

  return (
    <div className="flex flex-col h-full">
      <div className={cn("p-8 text-center border-b", statusDisplay.color)}>
        <div className="w-16 h-16 bg-white/50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm backdrop-blur-sm">
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
        {/* Action to re-send if new fields exist */}
        {hasPendingFields && (
          <div className="p-6 bg-blue-50/50 border-b border-blue-100 italic text-sm text-blue-700 text-center">
            <Button
              variant="link"
              onClick={onForceConfig}
              className="text-blue-600 font-semibold hover:text-blue-700 underline"
            >
              Click here to configure and send new requests
            </Button>
          </div>
        )}

        {/* Audit Trail for Documents with at least one signature */}
        {hasCompletedFields && signatureFields && (
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-2 mb-4 px-2">
              <FileCheck className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wider">Audit Trail</h3>
            </div>

            <div className="relative pl-4 border-l-2 border-blue-50 space-y-4">
              {Array.from(
                signatureFields
                  .filter(field => field.isCompleted && field.auditTrail)
                  .reduce((acc, field) => {
                    const existing = acc.get(field.signerEmail);
                    if (!existing || (field.auditTrail?.signedAt || 0) > (existing.auditTrail?.signedAt || 0)) {
                      acc.set(field.signerEmail, field);
                    }
                    return acc;
                  }, new Map<string, Doc<"signatureFields">>())
                  .values()
              ).map((field, index) => {
                const isExpanded = expandedSigners.has(field.signerEmail);
                return (
                  <div key={field._id} className="relative group/audit">
                    <div className={cn(
                      "absolute -left-[21px] top-6 w-3 h-3 rounded-full ring-4 ring-white transition-colors duration-300",
                      isExpanded ? "bg-blue-500" : "bg-gray-300"
                    )} />

                    <div
                      className={cn(
                        "bg-white border rounded-xl overflow-hidden transition-all duration-300 cursor-pointer",
                        isExpanded ? "ring-1 ring-blue-100 shadow-md border-blue-100" : "hover:border-gray-300 hover:bg-gray-50/50"
                      )}
                      onClick={() => {
                        const next = new Set(expandedSigners);
                        if (next.has(field.signerEmail)) next.delete(field.signerEmail);
                        else next.add(field.signerEmail);
                        setExpandedSigners(next);
                      }}
                    >
                      <div className="p-4 flex justify-between items-center group-hover:bg-gray-50/30 transition-colors">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 text-sm truncate">
                            {field.signerName && field.signerName !== field.signerEmail
                              ? field.signerName
                              : `Signer ${index + 1}`}
                          </h4>
                          <p className="text-[10px] text-gray-500 font-medium truncate flex items-center gap-1.5 mt-0.5">
                            <Mail className="w-2.5 h-2.5 opacity-60" />
                            {field.signerEmail}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100 text-[10px]">
                            Verified
                          </Badge>
                          <Clock className={cn("w-4 h-4 text-gray-300 transition-transform duration-300", isExpanded ? "rotate-180 text-blue-500" : "")} />
                        </div>
                      </div>

                      {isExpanded && field.auditTrail && (
                        <div className="px-4 pb-4 animate-in slide-in-from-top-2 duration-300">
                          <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs text-gray-600 bg-gray-50/50 rounded-lg p-3 ring-1 ring-gray-100/50">
                            <div>
                              <span className="text-gray-400 block text-[10px] uppercase tracking-wider mb-1">Time Signed</span>
                              <span className="font-semibold text-gray-900">{new Date(field.auditTrail.signedAt).toLocaleTimeString()}</span>
                            </div>
                            <div>
                              <span className="text-gray-400 block text-[10px] uppercase tracking-wider mb-1">Date Signed</span>
                              <span className="font-semibold text-gray-900">{new Date(field.auditTrail.signedAt).toLocaleDateString()}</span>
                            </div>
                            <div className="col-span-2">
                              <span className="text-gray-400 block text-[10px] uppercase tracking-wider mb-1">Security Footprint</span>
                              <div className="flex items-center gap-2">
                                <span className="font-mono bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-[10px] border border-blue-100/50">IP: {field.auditTrail.ip}</span>
                                <span className="text-[10px] text-gray-400">Browser Verified</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t bg-gray-50 flex gap-3">
        <DialogClose asChild>
          <Button variant="outline" className="flex-1 font-semibold bg-white shadow-sm">
            Close
          </Button>
        </DialogClose>
        {hasPendingFields && (
          <Button
            onClick={onForceConfig}
            className="flex-1 font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-md"
          >
            Configure & Send
          </Button>
        )}
      </div>
    </div>
  );
}
