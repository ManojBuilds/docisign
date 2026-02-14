"use client";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { FileText, Info, Loader2, Mail, Menu, User } from "lucide-react";
import { memo, useMemo } from "react";

interface SigningNavbarProps {
  signingSession: any;
  owner: any;
  handleSubmitDocument: () => void;
  isSubmitting: boolean;
  signatureFields: any[];
  completedRequiredFields: number;
  requiredFields: any[];
  onDecline: () => void;
  hasStarted: boolean;
  handleStartSigning: () => void;
  goToNextSignatureField: () => void;
}

// Extracted components for reusability
const DocumentDetailsContent = memo(({
  signingSession,
  owner,
  onDecline
}: {
  signingSession: any;
  owner: any;
  onDecline: () => void;
}) => {
  const formattedDate = useMemo(
    () => new Date(signingSession.document.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' }),
    [signingSession.document.createdAt]
  );

  const ownerEmail = owner?.email || 'Unknown';
  const ownerInitial = ownerEmail.charAt(0).toUpperCase();

  return (
    <div className="space-y-6">
      {/* Status */}
      <div className="space-y-2">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
          Agreement Status
        </span>
        <div className="flex items-center gap-2.5">
          <div className="size-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
          <span className="text-base font-semibold text-gray-900">Awaiting your signature</span>
        </div>
      </div>

      {/* Sender Info */}
      <div className=" py-2 sm:p-6 bg-gray-50/50 rounded md:rounded-2xl border border-gray-100 flex items-center gap-4">
        <div className="size-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm overflow-hidden shrink-0">
          {signingSession.ownerBranding?.logoUrl ? (
            <img
              src={signingSession.ownerBranding.logoUrl}
              alt="Logo"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-semibold text-gray-400">{ownerInitial}</span>
          )}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
            Sender
          </span>
          <span className="text-sm font-semibold text-gray-900 truncate">{ownerEmail}</span>
        </div>
      </div>

      {/* Sent Date */}
      <div className="flex items-center justify-between text-sm py-4 border-y border-gray-100">
        <span className="text-gray-500 font-medium">Sent on</span>
        <span className="text-gray-900 font-semibold">{formattedDate}</span>
      </div>

      {/* Custom Message */}
      {signingSession.document.customMessage && (
        <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100/50 space-y-3">
          <div className="flex items-center gap-2">
            <Mail className="size-4 text-blue-600" />
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
              Message from Sender
            </span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed italic font-medium">
            "{signingSession.document.customMessage}"
          </p>
        </div>
      )}

      {/* Decline Button */}
      <div className="pt-4">
        <Button
          variant="destructive"
          className="w-full h-12 md:h-14"
          onClick={onDecline}
        >
          Decline to Sign
        </Button>
        <p className="mt-3 text-[10px] text-gray-400 text-center font-medium leading-relaxed px-4">
          Declining will immediately void this agreement. The sender will be notified.
        </p>
      </div>
    </div>
  );
});

DocumentDetailsContent.displayName = "DocumentDetailsContent";

const DesktopDetailsContent = memo(({
  signingSession,
  owner,
  onDecline
}: {
  signingSession: any;
  owner: any;
  onDecline: () => void;
}) => {
  const formattedDateLong = useMemo(
    () => new Date(signingSession.document.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' }),
    [signingSession.document.createdAt]
  );

  const ownerEmail = owner?.email || 'Unknown';
  const ownerInitial = ownerEmail.charAt(0).toUpperCase();
  const brandName = signingSession.ownerBranding?.brandName;

  return (
    <div className="space-y-8">
      {/* Agreement Information */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
          <Info className="w-3 h-3" />
          Agreement Information
        </h3>
        <div className="space-y-4 bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
              Status
            </span>
            <span className="text-xs font-black text-blue-600 uppercase tracking-widest">
              Awaiting Signature
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
              Issued On
            </span>
            <span className="text-xs font-semibold text-gray-900">{formattedDateLong}</span>
          </div>
        </div>
      </div>

      {/* Sender */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
          <User className="w-3 h-3" />
          Sender
        </h3>
        <div className="flex items-center gap-3 py-4 px-2 bg-white border border-gray-100 rounded sm:rounded-2xl">
          <div className="size-10 rounded-full bg-gray-50 overflow-hidden border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
            {signingSession.ownerBranding?.logoUrl ? (
              <img
                src={signingSession.ownerBranding.logoUrl}
                alt="Logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="font-semibold text-gray-400">{ownerInitial}</span>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {brandName || ownerEmail}
            </p>
            <p className="text-[10px] text-gray-500 font-medium">Agreement Owner</p>
          </div>
        </div>
      </div>

      {/* Custom Message */}
      {signingSession.document.customMessage && (
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
            <Mail className="w-3 h-3" />
            Message from Sender
          </h3>
          <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100/50">
            <p className="text-sm text-gray-700 leading-relaxed italic font-medium">
              "{signingSession.document.customMessage}"
            </p>
          </div>
        </div>
      )}

      {/* Decline Button */}
      <div className="pt-4">
        <Button
          variant="destructive"
          className="w-full h-12 text-[10px] font-black uppercase tracking-[0.2em]"
          onClick={onDecline}
        >
          Decline to Sign
        </Button>
        <p className="mt-3 text-[9px] text-gray-400 font-medium text-center leading-relaxed">
          Declining will void this agreement for all parties. The sender will be notified of your decision.
        </p>
      </div>
    </div>
  );
});

DesktopDetailsContent.displayName = "DesktopDetailsContent";

export const SigningNavbar = memo(({
  signingSession,
  owner,
  handleSubmitDocument,
  isSubmitting,
  signatureFields,
  completedRequiredFields,
  requiredFields,
  onDecline,
  hasStarted,
  handleStartSigning,
  goToNextSignatureField,
}: SigningNavbarProps) => {
  const progressPercentage = useMemo(() => {
    const total = requiredFields.length || 1;
    return (completedRequiredFields / total) * 100;
  }, [completedRequiredFields, requiredFields.length]);

  const remainingFields = useMemo(
    () => requiredFields.length - completedRequiredFields,
    [requiredFields.length, completedRequiredFields]
  );

  const isComplete = completedRequiredFields >= requiredFields.length;
  const brandName = signingSession.ownerBranding?.brandName || "Boopsign";
  const logoUrl = signingSession.ownerBranding?.logoUrl;

  const getButtonConfig = () => {
    if (isSubmitting) {
      return {
        label: <Loader2 className="h-4 w-4 animate-spin" />,
        disabled: true,
      };
    }

    if (isComplete) {
      return {
        label: "Finish Signature",
        disabled: false,
      };
    }

    if (!hasStarted) {
      return {
        label: "Ready to Sign",
        disabled: signatureFields.length === 0,
      };
    }

    return {
      label: (
        <div className="flex items-center gap-2">
          <span>Next Field</span>
          <span className="bg-white/20 px-1.5 py-0.5 rounded text-[8px] font-semibold">
            {remainingFields} Left
          </span>
        </div>
      ),
      disabled: false,
    };
  };

  const buttonConfig = getButtonConfig();

  const handleButtonClick = () => {
    if (isComplete) {
      handleSubmitDocument();
    } else if (!hasStarted) {
      handleStartSigning();
    } else {
      goToNextSignatureField();
    }
  };

  return (
    <>
      {/* Mobile Header with Drawer */}
      <header className="md:hidden sticky top-0 h-16 flex flex-col bg-white/90 backdrop-blur-xl border-b border-gray-100 z-30">
        <div className="flex-1 flex items-center justify-between px-4">
          {/* Logo and Title */}
          <div className="flex items-center gap-3 overflow-hidden flex-1 min-w-0">
            <div className="flex items-center justify-center overflow-hidden bg-gray-50 rounded border border-gray-200/50 shadow-sm shrink-0">
              {logoUrl ? (
                <div className="size-6">
                  <img
                    src={logoUrl}
                    alt={brandName}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              ) : (
                <div className="scale-75 origin-center">
                  <Logo showText={false} />
                </div>
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <h1 className="text-[13px] font-semibold truncate leading-none tracking-tight text-gray-900 mb-1">
                {signingSession.document.title}
              </h1>
              <p className="text-[10px] text-gray-500 truncate font-medium">
                from <span className="text-gray-900 font-semibold">{brandName}</span>
              </p>
            </div>
          </div>

          {/* Menu Drawer */}
          <Drawer>
            <DrawerTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 h-10 w-10 rounded-xl shrink-0"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-[85vh] rounded-t-3xl p-0">
              <DrawerHeader className="p-6 pb-4 border-b border-gray-100">
                <DrawerTitle className="text-left text-xl font-black text-gray-900 tracking-tight">
                  Document Details
                </DrawerTitle>
              </DrawerHeader>
              <ScrollArea className="flex-1 p-6">
                <DocumentDetailsContent
                  signingSession={signingSession}
                  owner={owner}
                  onDecline={onDecline}
                />
              </ScrollArea>
            </DrawerContent>
          </Drawer>
        </div>

        {/* Progress Bar */}
        <div className="h-[3px] w-full bg-gray-100 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-700 ease-out shadow-[0_0_8px_rgba(37,99,235,0.4)]"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </header>

      {/* Desktop Header with Sheet */}
      <header className="hidden md:flex h-16 items-center justify-between px-6 bg-white border-b z-30 shrink-0">
        <div className="flex items-center gap-6">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            {logoUrl ? (
              <div className="size-8 relative shrink-0">
                <img
                  src={logoUrl}
                  alt={brandName}
                  className="object-cover rounded-xl w-full h-full"
                />
              </div>
            ) : (
              <Logo showStatus={false} />
            )}
            <div className="h-4 w-[1px] bg-gray-200 mx-1" />
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
                {brandName}
              </span>
              <h1 className="text-sm font-semibold truncate max-w-[200px] text-gray-900 tracking-tight leading-none">
                {signingSession.document.title}
              </h1>
            </div>
          </div>

          {/* Details Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-gray-900 px-4"
              >
                <FileText className="w-4 h-4 mr-2" />
                Details
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[400px] border-l border-gray-100 p-0 flex flex-col">
              <SheetHeader className="p-6 border-b border-gray-100">
                <SheetTitle className="text-sm font-black uppercase tracking-[0.2em] text-gray-900">
                  Contract Details
                </SheetTitle>
              </SheetHeader>
              <ScrollArea className="flex-1 p-6">
                <DesktopDetailsContent
                  signingSession={signingSession}
                  owner={owner}
                  onDecline={onDecline}
                />
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>

        {/* Action Button */}
        <Button
          onClick={handleButtonClick}
          disabled={buttonConfig.disabled}
          size="lg"
          className="font-black uppercase tracking-widest text-[10px]"
        >
          {buttonConfig.label}
        </Button>
      </header>
    </>
  );
});

SigningNavbar.displayName = "SigningNavbar";