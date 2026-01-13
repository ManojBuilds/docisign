"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Confetti } from "@/components/ui/confetti";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import useMediaQuery from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { useSignersStore } from "@/stores/signersStore";
import { useQuery } from "convex/react";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  FileCheck,
  Loader2,
  Mail,
  Send,
  Shield,
  UserPlus,
  X
} from "lucide-react";
import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";

interface Signer {
  email: string;
  name?: string;
}

interface ShareDialogProps {
  documentId: Id<"documents">;
  onSend: (signers: Signer[], customMessage?: string) => Promise<void>;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  hasUnassignedFields?: boolean;
  onSignerAdd?: (signer: Signer) => void;
}


// Helper function to parse user agent and return readable format with emojis
// const parseUserAgent = (userAgent: string) => {
//   if (!userAgent) return 'Unknown';

//   // Extract browser info
//   let browser = '🌐 Browser';
//   if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
//     browser = '🟢 Chrome';
//   } else if (userAgent.includes('Firefox')) {
//     browser = '🦊 Firefox';
//   } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
//     browser = '📱 Safari';
//   } else if (userAgent.includes('Edg')) {
//     browser = '🔵 Edge';
//   } else if (userAgent.includes('Opera') || userAgent.includes('OPR')) {
//     browser = '🟣 Opera';
//   } else if (userAgent.includes('MSIE') || userAgent.includes('Trident')) {
//     browser = '🔵 IE';
//   }

//   // Extract OS info
//   let os = '🖥️ OS';
//   if (userAgent.includes('Win')) {
//     os = '🔵 Windows';
//   } else if (userAgent.includes('Mac')) {
//     os = '🍎 macOS';
//   } else if (userAgent.includes('Linux')) {
//     os = '🐧 Linux';
//   } else if (userAgent.includes('Android')) {
//     os = '🤖 Android';
//   } else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
//     os = '🍎 iOS';
//   } else if (userAgent.includes('Mobile')) {
//     os = '📱 Mobile';
//   }

//   return `${browser} on ${os}`;
// };

interface DialogContentSharedProps {
  hasUnassignedFields?: boolean;
  customMessage: string;
  setCustomMessage: Dispatch<SetStateAction<string>>;
  documentStatus?: string;
  signatureFields?: Doc<"signatureFields">[];
}

const DialogContentShared: FC<DialogContentSharedProps> = ({
  hasUnassignedFields,
  customMessage,
  setCustomMessage,
  signatureFields,
}) => {
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

      {/* Recipients Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-gray-400" />
            Recipients
          </Label>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {signers.length} {signers.length === 1 ? 'Recipient' : 'Recipients'}
          </Badge>
        </div>

        <div className="bg-white border rounded-xl shadow-sm divide-y">
          {signers.length > 0 ? (
            signers.map((signer, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors"
              >
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold bg-gradient-to-br shadow-inner ring-2 ring-white",
                  (index % 5 === 0) ? 'from-blue-500 to-indigo-600' :
                    (index % 5 === 1) ? 'from-violet-500 to-purple-600' :
                      (index % 5 === 2) ? 'from-fuchsia-500 to-pink-600' :
                        (index % 5 === 3) ? 'from-rose-500 to-red-600' :
                          'from-orange-500 to-amber-600'
                )}>
                  {(signer.name?.charAt(0) || signer.email.charAt(0)).toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-sm text-gray-900 truncate">
                      {signer.name && signer.name !== signer.email
                        ? signer.name
                        : `Signer ${index + 1}`}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 truncate flex items-center gap-1.5 mt-0.5">
                    <Mail className="w-3 h-3 text-gray-400" />
                    {signer.email}
                  </p>
                </div>

                <div className="text-right">
                  {(() => {
                    const status = getSignerStatus(signer.email);
                    if (status === "signed") {
                      return (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Signed
                        </span>
                      );
                    }
                    if (status === "partially_signed") {
                      return (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                          <FileCheck className="w-3 h-3 mr-1" />
                          Partial
                        </span>
                      );
                    }
                    return (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-200">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </span>
                    );
                  })()}
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center bg-gray-50/30">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <UserPlus className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-sm font-medium text-gray-900">No recipients added</p>
              <p className="text-xs text-gray-500 mt-1">Add signers from the sidebar to continue.</p>
            </div>
          )}
        </div>
      </div>

      {/* Message Section */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-2">
          <Mail className="w-4 h-4 text-gray-400" />
          Message to Recipients
        </Label>
        <div className="relative">
          <Textarea
            className="min-h-[120px] p-4 bg-gray-50 border-gray-200 focus:bg-white transition-all text-sm resize-none rounded-xl"
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            placeholder="Enter a custom message (optional)..."
            maxLength={500}
          />
          <div className="absolute bottom-3 right-3 text-[10px] text-gray-400 font-medium bg-white/80 px-2 py-1 rounded border shadow-sm">
            {customMessage.length}/500
          </div>
        </div>
      </div>

      {/* Audit Trail in Config (New) */}
      {signatureFields?.some(f => f.isCompleted) && (
        <div className="pt-4 border-t border-dashed">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-4 h-4 text-blue-600" />
            <h3 className="font-bold text-gray-900 text-[10px] uppercase tracking-wider">Previous Audit Trail</h3>
          </div>
          <div className="space-y-2">
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
                <div key={field._id} className="bg-gray-50 border border-gray-100 rounded-lg overflow-hidden transition-all">
                  <button
                    onClick={() => {
                      const next = new Set(expandedSigners);
                      if (next.has(field.signerEmail)) next.delete(field.signerEmail);
                      else next.add(field.signerEmail);
                      setExpandedSigners(next);
                    }}
                    className="w-full text-left p-3 flex justify-between items-center hover:bg-white/50 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-xs text-gray-900 truncate">{field.signerName || `Signer ${index + 1}`}</p>
                      <p className="text-[9px] text-gray-500 truncate">{field.signerEmail}</p>
                    </div>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100 text-[9px]">Signed</Badge>
                  </button>
                  {isExpanded && field.auditTrail && (
                    <div className="px-3 pb-3 pt-1 animate-in slide-in-from-top-1 duration-200">
                      <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-600 bg-white/50 rounded p-2">
                        <div>
                          <span className="text-gray-400 block text-[8px] uppercase tracking-wider">Date</span>
                          <span className="font-bold text-gray-900">{new Date(field.auditTrail.signedAt).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[8px] uppercase tracking-wider">IP</span>
                          <span className="font-mono text-gray-900">{field.auditTrail.ip}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export function ShareDialog({
  documentId,
  onSend,
  open,
  onOpenChange,
  hasUnassignedFields,
}: ShareDialogProps) {
  // Fetch document details including signers
  const document = useQuery(api.documents.getDocument, { documentId });
  const signatureFields = useQuery(api.signatureFields.getDocumentSignatureFields, { documentId });
  const { signers, setSigners } = useSignersStore();
  const [customMessage, setCustomMessage] = useState("");
  const [forceShowConfig, setForceShowConfig] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [expandedSigners, setExpandedSigners] = useState<Set<string>>(new Set());
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
  }, [document, setSigners]);


  const handleSend = async () => {
    if (signers.length === 0) {
      toast.error("Please add at least one signer.");
      return;
    }

    setIsSending(true);
    try {
      await onSend(signers, customMessage);

      // Trigger confetti effect
      setShowConfetti(true);

    } catch (error) {
      console.error(error);
      toast.error("Failed to send document.");
    } finally {
      setIsSending(false);
    }
  };

  const content = (
    <DialogContentShared
      hasUnassignedFields={hasUnassignedFields}
      customMessage={customMessage}
      setCustomMessage={setCustomMessage}
      documentStatus={document?.status}
      signatureFields={signatureFields}
    />
  );

  // Helper to get status display info
  const getStatusDisplay = () => {
    if (!document?.status) return null;

    switch (document.status.toLowerCase()) {
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
      case 'draft':
        return null;
      default:
        return null;
    }
  };

  const statusDisplay = getStatusDisplay();


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
          <DialogContent className="sm:max-w-xl p-0 gap-0 overflow-hidden bg-white border-0 shadow-2xl rounded-2xl">
            {showConfetti ? (
              <div className="flex flex-col h-full bg-white">
                <div className="bg-green-50 p-8 text-center border-b border-green-100">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm ring-4 ring-green-50">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <DialogTitle className="text-2xl font-bold text-green-900 mb-2 tracking-tight text-center">Sent Successfully!</DialogTitle>
                  <p className="text-green-700 font-medium">Emails have been dispatched to all recipients.</p>
                </div>

                <div className="p-8 space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Secure Tracking Enabled</h4>
                      <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                        You will be notified instantly when each recipient views and signs the document. A final copy will be sent to everyone automatically.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gray-50 border-t flex justify-center">
                  <DialogClose asChild>
                    <Button className="w-full font-semibold bg-white text-gray-900 border hover:bg-gray-50 shadow-sm">
                      Close
                    </Button>
                  </DialogClose>
                </div>
              </div>
            ) : (statusDisplay && !forceShowConfig) ? (
              <div className="flex flex-col h-full">
                <div className={cn("p-8 text-center border-b", statusDisplay.color)}>
                  <div className="w-16 h-16 bg-white/50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm backdrop-blur-sm">
                    {statusDisplay.icon}
                  </div>
                  <DialogTitle className="text-xl font-bold mb-2 tracking-tight text-center">
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
                        onClick={() => {
                          // This is a bit of a hack to force showing the config UI
                          // by making statusDisplay effectively null for the main render
                          setForceShowConfig(true);
                        }}
                        className="text-blue-600 font-bold hover:text-blue-700 underline"
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
                        <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Audit Trail</h3>
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
                                    <h4 className="font-bold text-gray-900 text-sm truncate">
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
                                        <span className="font-bold text-gray-900">{new Date(field.auditTrail.signedAt).toLocaleTimeString()}</span>
                                      </div>
                                      <div>
                                        <span className="text-gray-400 block text-[10px] uppercase tracking-wider mb-1">Date Signed</span>
                                        <span className="font-bold text-gray-900">{new Date(field.auditTrail.signedAt).toLocaleDateString()}</span>
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
                      onClick={() => setForceShowConfig(true)}
                      className="flex-1 font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                    >
                      Configure & Send
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <DialogHeader className="p-6 border-b bg-gray-50/50 sticky top-0 z-10 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <DialogTitle className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                      <Send className="w-5 h-5 text-blue-600" />
                      Send for Signature
                    </DialogTitle>
                    <DialogClose asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-gray-200/50">
                        <X className="w-4 h-4" />
                      </Button>
                    </DialogClose>
                  </div>
                  <p className="text-sm text-gray-500 font-medium">Configure recipients and send securely.</p>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 py-8">
                  {content}
                </div>

                <DialogFooter className="p-6 border-t bg-gray-50 flex gap-3 sticky bottom-0 z-10">
                  <DialogClose asChild>
                    <Button variant="outline" className="flex-1 font-semibold bg-white shadow-sm hover:bg-gray-50 border-gray-200 text-gray-700">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    onClick={handleSend}
                    disabled={isSending || signers.length === 0}
                    className="flex-1 font-semibold shadow-md transition-all hover:shadow-lg bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isSending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Sending Request...
                      </>
                    ) : (
                      <>
                        Send Request
                        <Send className="w-4 h-4 ml-2 opacity-90" />
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </div>
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
          {/* Mobile layout mirrors desktop but adapted for Drawer */}
          {/* Note: In a real refactor, components would be extracted to reduce duplication */}
          {/* For this specific task, I am focusing on the visual update within the scope */}
          {showConfetti ? (
            <div className="flex flex-col h-full">
              <DrawerHeader className="text-center border-b pb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm ring-4 ring-green-50">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <DrawerTitle className="text-xl font-bold text-green-900">Sent Successfully!</DrawerTitle>
              </DrawerHeader>
              <div className="p-6 space-y-4">
                <p className="text-center text-gray-600">Emails have been dispatched securely.</p>
              </div>
              <DrawerFooter className="border-t">
                <DrawerClose asChild>
                  <Button className="w-full" variant="outline">Done</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          ) : (statusDisplay && !forceShowConfig) ? (
            <div className="flex flex-col h-full">
              <DrawerHeader className="border-b">
                <DrawerTitle className="flex items-center gap-2">
                  {statusDisplay.icon}
                  {hasPendingFields ? "New Fields Added" : statusDisplay.title}
                </DrawerTitle>
              </DrawerHeader>
              <div className="p-4 overflow-y-auto">
                <p className="text-gray-600 mb-6 font-medium text-sm">
                  {hasPendingFields
                    ? "You have added new fields to this document. Save and send the request to notify signers."
                    : statusDisplay.message}
                </p>

                {hasPendingFields && (
                  <Button
                    variant="outline"
                    onClick={() => setForceShowConfig(true)}
                    className="w-full mb-6 py-6 border-blue-200 text-blue-700 bg-blue-50/50 font-bold"
                  >
                    Configure & Send New Requests
                  </Button>
                )}

                {/* Simplified Audit for Mobile */}
                {hasCompletedFields && signatureFields && (
                  <div className="p-4 space-y-4">
                    <h4 className="font-bold text-xs uppercase text-gray-400 tracking-widest flex items-center gap-2 mb-2">
                      <Shield className="w-3 h-3" />
                      Digital Audit Log
                    </h4>
                    {Array.from(
                      signatureFields
                        .filter(f => f.isCompleted && f.auditTrail)
                        .reduce((acc, field) => {
                          const existing = acc.get(field.signerEmail);
                          if (!existing || (field.auditTrail?.signedAt || 0) > (existing.auditTrail?.signedAt || 0)) {
                            acc.set(field.signerEmail, field);
                          }
                          return acc;
                        }, new Map<string, Doc<"signatureFields">>())
                        .values()
                    ).map((f, index) => {
                      const isExpanded = expandedSigners.has(f.signerEmail);
                      return (
                        <div key={f._id} className="border rounded-xl overflow-hidden bg-white">
                          <button
                            onClick={() => {
                              const next = new Set(expandedSigners);
                              if (next.has(f.signerEmail)) next.delete(f.signerEmail);
                              else next.add(f.signerEmail);
                              setExpandedSigners(next);
                            }}
                            className="w-full text-left p-4 flex justify-between items-center active:bg-gray-50"
                          >
                            <div className="min-w-0 flex-1">
                              <p className="font-bold text-sm text-gray-900 truncate">
                                {f.signerName && f.signerName !== f.signerEmail ? f.signerName : `Signer ${index + 1}`}
                              </p>
                              <p className="text-[10px] text-gray-500 truncate mt-0.5">{f.signerEmail}</p>
                            </div>
                            <Clock className={cn("w-4 h-4 text-gray-300 transition-transform", isExpanded ? "rotate-180 text-blue-500" : "")} />
                          </button>
                          {isExpanded && f.auditTrail && (
                            <div className="px-4 pb-4 animate-in slide-in-from-top-1">
                              <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-lg text-[11px]">
                                <div>
                                  <span className="text-gray-400 block uppercase text-[9px] mb-1">Time</span>
                                  <span className="font-bold text-gray-700">{new Date(f.auditTrail.signedAt).toLocaleTimeString()}</span>
                                </div>
                                <div>
                                  <span className="text-gray-400 block uppercase text-[9px] mb-1">Date</span>
                                  <span className="font-bold text-gray-700">{new Date(f.auditTrail.signedAt).toLocaleDateString()}</span>
                                </div>
                                <div className="col-span-2">
                                  <span className="text-gray-400 block uppercase text-[9px] mb-1">IP Verification</span>
                                  <span className="font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100/50">{f.auditTrail.ip}</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <DrawerHeader className="border-b">
                <DrawerTitle>Send for Signature</DrawerTitle>
              </DrawerHeader>
              <div className="p-4 overflow-y-auto">
                {content}
              </div>
              <DrawerFooter className="border-t">
                <Button
                  onClick={handleSend}
                  disabled={isSending || signers.length === 0}
                  className="w-full"
                >
                  {isSending ? "Sending..." : "Send Request"}
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
