"use client";

import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2, Send, UserPlus, X } from "lucide-react";
import { Textarea } from "./ui/textarea";
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
import useMediaQuery from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Confetti } from "@/components/ui/confetti";

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

const gradients = [
  'from-pink-500 to-yellow-500',
  'from-purple-500 to-indigo-500',
  'from-green-400 to-blue-500',
  'from-red-500 to-orange-500',
  'from-teal-400 to-cyan-600',
];

// Helper function to parse user agent and return readable format with emojis
const parseUserAgent = (userAgent: string) => {
  if (!userAgent) return 'Unknown';

  // Extract browser info
  let browser = '🌐 Browser';
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
    browser = '🟢 Chrome';
  } else if (userAgent.includes('Firefox')) {
    browser = '🦊 Firefox';
  } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    browser = '📱 Safari';
  } else if (userAgent.includes('Edg')) {
    browser = '🔵 Edge';
  } else if (userAgent.includes('Opera') || userAgent.includes('OPR')) {
    browser = '🟣 Opera';
  } else if (userAgent.includes('MSIE') || userAgent.includes('Trident')) {
    browser = '🔵 IE';
  }

  // Extract OS info
  let os = '🖥️ OS';
  if (userAgent.includes('Win')) {
    os = '🔵 Windows';
  } else if (userAgent.includes('Mac')) {
    os = '🍎 macOS';
  } else if (userAgent.includes('Linux')) {
    os = '🐧 Linux';
  } else if (userAgent.includes('Android')) {
    os = '🤖 Android';
  } else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
    os = '🍎 iOS';
  } else if (userAgent.includes('Mobile')) {
    os = '📱 Mobile';
  }

  return `${browser} on ${os}`;
};

interface DialogContentSharedProps {
  hasUnassignedFields?: boolean;
  signers: Signer[];
  setSigners: Dispatch<SetStateAction<Signer[]>>;
  removeSigner: (email: string) => void;
  customMessage: string;
  setCustomMessage: Dispatch<SetStateAction<string>>;
  documentStatus?: string;
}

const DialogContentShared: FC<DialogContentSharedProps> = ({
  hasUnassignedFields,
  signers,
  setSigners,
  removeSigner,
  customMessage,
  setCustomMessage,
  documentStatus,
}) => {
  // Get status icon and text based on document status
  const getStatusInfo = () => {
    if (!documentStatus) return null;

    switch (documentStatus.toLowerCase()) {
      case 'draft':
        return { icon: <AlertCircle className="w-4 h-4 text-yellow-500" />, text: 'Draft', color: 'text-yellow-600 bg-yellow-100' };
      case 'sent':
        return { icon: <Send className="w-4 h-4 text-blue-500" />, text: 'Sent', color: 'text-blue-600 bg-blue-100' };
      case 'in_progress':
        return { icon: <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />, text: 'In Progress', color: 'text-blue-600 bg-blue-100' };
      case 'completed':
        return { icon: <Send className="w-4 h-4 text-green-500" />, text: 'Completed', color: 'text-green-600 bg-green-100' };
      case 'expired':
        return { icon: <AlertCircle className="w-4 h-4 text-red-500" />, text: 'Expired', color: 'text-red-600 bg-red-100' };
      case 'cancelled':
        return { icon: <X className="w-4 h-4 text-red-500" />, text: 'Cancelled', color: 'text-red-600 bg-red-100' };
      default:
        return { icon: <Send className="w-4 h-4 text-gray-500" />, text: documentStatus, color: 'text-gray-600 bg-gray-100' };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="space-y-4">


      {hasUnassignedFields && (
        <Alert variant="default">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Unassigned Signature Fields</AlertTitle>
          <AlertDescription>
            This document has signature fields that are not assigned to any
            signer. Adding a signer will automatically assign them.
          </AlertDescription>
        </Alert>
      )}

      {/* Current Signers Section */}
      <div className="space-y-1">
        <Label className="text-base font-semibold">
          Signers ({signers.length})
        </Label>

        <div className="space-y-2">
          {signers.length > 0 ? (
            signers.map((signer, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 border rounded-md p-3"
              >
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium bg-gradient-to-bl',
                  gradients[index % gradients.length]
                )}>
                  {signer.name?.charAt(0) || signer.email.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {signer.name || signer.email}
                  </p>
                  <p className="text-gray-600 text-sm truncate">{signer.email}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-20 text-center">
              <div>
                <UserPlus className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">No signers added yet</p>
                <p className="text-xs text-gray-400">
                  Add an email address to get started
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom Message Section */}
      <div className="space-y-1">
        <Label className="text-base font-semibold">
          Custom Message (Optional)
        </Label>
        <Textarea
          className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={3}
          value={customMessage}
          onChange={(e) => setCustomMessage(e.target.value)}
          placeholder="Add a personal message to the signers..."
          maxLength={500}
        />
        <p className="text-xs text-gray-500 text-right">
          {customMessage.length}/500 characters
        </p>
      </div>
    </div>
  );
};

export function ShareDialog({
  documentId,
  onSend,
  open,
  onOpenChange,
  hasUnassignedFields,
  onSignerAdd,
}: ShareDialogProps) {
  // Fetch document details including signers
  const document = useQuery(api.documents.getDocument, { documentId });
  const signatureFields = useQuery(api.signatureFields.getDocumentSignatureFields, { documentId });
  const [signers, setSigners] = useState<Signer[]>([]);
  const [customMessage, setCustomMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 640px)");

  useEffect(() => {
    if (document && document.signatureFields) {
      // Extract unique signers from the document's signature fields
      // Only include signers that are actually assigned to signature fields
      const uniqueSigners = new Map();

      document.signatureFields.forEach(field => {
        if (field.assignedToEmail) {
          if (!uniqueSigners.has(field.assignedToEmail)) {
            uniqueSigners.set(field.assignedToEmail, {
              email: field.assignedToEmail,
              name: field.assignedToName || undefined,
            });
          }
        }
      });

      const documentSigners = Array.from(uniqueSigners.values());
      setSigners(documentSigners);
    }
  }, [document]);

  const removeSigner = (email: string) => {
    setSigners(signers.filter((s) => s.email !== email));
    toast.success("Signer removed");
  };

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
      signers={signers}
      setSigners={setSigners}
      removeSigner={removeSigner}
      customMessage={customMessage}
      setCustomMessage={setCustomMessage}
      documentStatus={document?.status}
    />
  );

  // Helper to get status display info
  const getStatusDisplay = () => {
    if (!document?.status) return null;

    switch (document.status.toLowerCase()) {
      case 'sent':
        return {
          icon: <Send className="w-8 h-8 text-blue-500" />,
          title: 'Waiting for Signature',
          message: 'An email has been sent to the signers. You will be notified once the document is signed.',
          color: 'border-blue-200 bg-blue-50'
        };
      case 'in_progress':
        return {
          icon: <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />,
          title: 'Document in Progress',
          message: 'The document is currently being signed. You will be notified once the document is completed.',
          color: 'border-blue-200 bg-blue-50'
        };
      case 'completed':
        return {
          icon: <Send className="w-8 h-8 text-green-500" />,
          title: 'Document Completed',
          message: 'All signers have completed signing the document.',
          color: 'border-green-200 bg-green-50'
        };
      case 'cancelled':
        return {
          icon: <X className="w-8 h-8 text-red-500" />,
          title: 'Document Cancelled',
          message: 'This document has been cancelled and is no longer active.',
          color: 'border-red-200 bg-red-50'
        };
      case 'expired':
        return {
          icon: <AlertCircle className="w-8 h-8 text-red-500" />,
          title: 'Document Expired',
          message: 'This document has expired and is no longer active.',
          color: 'border-red-200 bg-red-50'
        };
      case 'draft':
        return null; // Show normal form for draft
      default:
        return null; // Show normal form for other cases
    }
  };

  const statusDisplay = getStatusDisplay();

  if (isDesktop) {
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
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Send className="w-4 h-4" />
              Request Signature
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl p-0 flex flex-col max-h-[90vh]">
            {showConfetti ? (
              <>
                <DialogHeader className="p-6 pb-4 border-b">
                  <DialogTitle>Success!</DialogTitle>
                </DialogHeader>
                <div className="flex-1 overflow-y-auto px-6 flex items-center justify-center">
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Document Sent!</h3>
                    <p className="text-gray-600">
                      Your client can sign using secure link and an email has been sent to their email id.
                    </p>
                  </div>
                </div>
                <DialogFooter className="p-6 pt-4 gap-2 flex-col-reverse sm:flex-row border-t">
                  <DialogClose asChild>
                    <Button variant="outline" className="w-full sm:w-auto">
                      Done
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </>
            ) : statusDisplay ? (
              // Display status-specific content
              <>
                <DialogHeader className="p-6 pb-4 border-b">
                  <DialogTitle>{statusDisplay.title}</DialogTitle>
                </DialogHeader>
                <div className={`flex-1 overflow-y-auto px-6 border-x`}>
                  <div className="text-center py-6">
                    <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-opacity-10 bg-current", statusDisplay.color)}>
                      {statusDisplay.icon}
                    </div>
                    <p className="text-gray-600 max-w-md mx-auto mb-6">
                      {statusDisplay.message}
                    </p>
                  </div>

                  {/* Audit Trail for Completed Documents */}
                  {document?.status === 'completed' && signatureFields && (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Signature Audit Trail</h3>
                      <div className="space-y-3">
                        {signatureFields
                          .filter(field => field.isCompleted && field.auditTrail) // Only show completed fields with audit info
                          .map((field, index) => (
                            <div key={field._id} className="border rounded-lg p-4 bg-gray-50">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{field.assignedToName || field.assignedToEmail}</h4>
                                  <p className="text-sm text-muted-foreground">{field.assignedToEmail}</p>
                                </div>
                                <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-800 rounded">
                                  {field.fieldType}
                                </span>
                              </div>

                              {field.auditTrail && (
                                <div className="mt-3 pt-3 border-t text-sm space-y-1">
                                  <div className="flex">
                                    <span className="w-24 text-gray-500">IP Address:</span>
                                    <span className="font-medium">{field.auditTrail.ip}</span>
                                  </div>
                                  <div className="flex">
                                    <span className="w-24 text-gray-500">Signed:</span>
                                    <span className="font-medium">{new Date(field.auditTrail.signedAt).toLocaleString()}</span>
                                  </div>
                                  <div className="flex">
                                    <span className="w-24 text-gray-500">User Agent:</span>
                                    <span className="font-medium text-xs break-words">
                                      {parseUserAgent(field.auditTrail.userAgent)}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))
                        }
                      </div>

                      {signatureFields.filter(field => field.isCompleted && field.auditTrail).length === 0 && (
                        <p className="text-center text-gray-500 py-4">No audit trail information available</p>
                      )}
                    </div>
                  )}
                </div>
                <DialogFooter className="p-6 pt-4 gap-2 flex-col-reverse sm:flex-row border-t">
                  <DialogClose asChild>
                    <Button variant="outline" className="w-full sm:w-auto">
                      Done
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </>
            ) : (
              // Normal form for draft or other statuses
              <>
                <DialogHeader className="p-6 pb-4 border-b">
                  <DialogTitle>Request Signature</DialogTitle>
                </DialogHeader>
                <div className="flex-1 overflow-y-auto px-6">{content}</div>
                <DialogFooter className="p-6 pt-4 gap-2 flex-col-reverse sm:flex-row border-t">
                  <DialogClose asChild>
                    <Button variant="outline" className="w-full sm:w-auto">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    onClick={handleSend}
                    disabled={isSending || signers.length === 0}
                    className="w-full sm:w-auto"
                  >
                    {isSending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send for Signing ({signers.length})
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </>
    );
  }

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
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerTrigger asChild>
          <Button className="w-full sm:w-auto">
            <Send className="w-4 h-4" />
            Request Signature
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          {showConfetti ? (
            <>
              <DrawerHeader className="text-left border-b">
                <DrawerTitle>Success!</DrawerTitle>
              </DrawerHeader>
              <div className="p-4 flex-1 overflow-y-auto flex items-center justify-center">
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Document Sent!</h3>
                  <p className="text-gray-600">
                    Your client can sign using secure link and an email has been sent to their email id.
                  </p>
                </div>
              </div>
              <DrawerFooter className="pt-2 border-t">
                <DrawerClose asChild>
                  <Button variant="outline" className="w-full">
                    Done
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </>
          ) : statusDisplay ? (
            // Display status-specific content for mobile
            <>
              <DrawerHeader className="text-left border-b">
                <DrawerTitle>{statusDisplay.title}</DrawerTitle>
              </DrawerHeader>
              <div className={`flex-1 overflow-y-auto p-4 ${statusDisplay.color}`}>
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-opacity-10 bg-current">
                    {statusDisplay.icon}
                  </div>
                  <p className="text-gray-600 max-w-md mx-auto mb-6">
                    {statusDisplay.message}
                  </p>
                </div>

                {/* Audit Trail for Completed Documents */}
                {document?.status === 'completed' && signatureFields && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Signature Audit Trail</h3>
                    <div className="space-y-3">
                      {signatureFields
                        .filter(field => field.isCompleted && field.auditTrail) // Only show completed fields with audit info
                        .map((field, index) => (
                          <div key={field._id} className="border rounded-lg p-4 bg-gray-50">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium capitalize">{field.assignedToName || field.assignedToEmail}</h4>
                                <p className="text-sm text-gray-600">{field.assignedToEmail}</p>
                              </div>
                              <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-800 rounded">
                                {field.fieldType}
                              </span>
                            </div>

                            {field.auditTrail && (
                              <div className="mt-3 pt-3 border-t text-sm space-y-1">
                                <div className="flex">
                                  <span className="w-24 text-gray-500">IP Address:</span>
                                  <span className="font-medium">{field.auditTrail.ip}</span>
                                </div>
                                <div className="flex">
                                  <span className="w-24 text-gray-500">Signed:</span>
                                  <span className="font-medium">{new Date(field.auditTrail.signedAt).toLocaleString()}</span>
                                </div>
                                <div className="flex">
                                  <span className="w-24 text-gray-500">User Agent:</span>
                                  <span className="font-medium text-xs break-words">{field.auditTrail.userAgent}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        ))
                      }
                    </div>

                    {signatureFields.filter(field => field.isCompleted && field.auditTrail).length === 0 && (
                      <p className="text-center text-gray-500 py-4">No audit trail information available</p>
                    )}
                  </div>
                )}
              </div>
              <DrawerFooter className="pt-2 border-t">
                <DrawerClose asChild>
                  <Button variant="outline" className="w-full">
                    Close
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </>
          ) : (
            // Normal form for draft or other statuses
            <>
              <DrawerHeader className="text-left border-b">
                <DrawerTitle>Request Signature</DrawerTitle>
              </DrawerHeader>
              <div className="p-4 flex-1 overflow-y-auto">{content}</div>
              <DrawerFooter className="pt-2 border-t">
                <Button
                  onClick={handleSend}
                  disabled={isSending || signers.length === 0}
                  className="w-full"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send for Signing ({signers.length})
                    </>
                  )}
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline" className="w-full">
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
