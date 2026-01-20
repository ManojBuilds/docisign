"use client";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { FileText, Info, Loader2, User } from "lucide-react";
import Image from "next/image";
import { memo } from "react";

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
  return (
    <>
      {/* Mobile-Specific Header */}
      <header className="md:hidden sticky top-0 h-16 flex flex-col bg-white/90 backdrop-blur-xl border-b border-gray-100 z-30 transition-all duration-300">
        <div className="flex-1 flex items-center justify-between px-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex items-center justify-center p-1.5 bg-gray-50 rounded-xl border border-gray-200/50 shadow-sm">
              {signingSession.ownerBranding?.logoUrl ? (
                <div className="size-6 relative">
                  <Image
                    src={signingSession.ownerBranding.logoUrl}
                    alt={signingSession.ownerBranding.brandName || "Logo"}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="scale-75 origin-center">
                  <Logo showText={false} />
                </div>
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <h1 className="text-[13px] font-bold truncate leading-none tracking-tight text-gray-900 mb-1">
                {signingSession.document.title}
              </h1>
              <p className="text-[10px] text-gray-500 truncate font-medium">
                from <span className="text-gray-900 font-bold">{signingSession.ownerBranding?.brandName || "Boopsign"}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 h-10 w-10 cursor-pointer rounded-xl transition-all">
                  <div className="flex flex-col gap-[3px] items-end pr-1">
                    <div className="w-5 h-[2px] rounded-full bg-current opacity-80" />
                    <div className="w-3 h-[2px] rounded-full bg-current opacity-80" />
                    <div className="w-4 h-[2px] rounded-full bg-current opacity-80" />
                  </div>
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh] rounded-t-[32px] p-0 border-t-0 bg-white overflow-hidden shadow-2xl">
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-200 rounded-full" />
                <SheetHeader className="p-8 pt-10 border-b border-gray-50">
                  <SheetTitle className="text-left text-2xl font-black text-gray-900 tracking-tight uppercase">Document Details</SheetTitle>
                </SheetHeader>
                <div className="p-8 space-y-8 overflow-y-auto max-h-[calc(80vh-120px)] pb-12">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <span className="text-[10px] font-black text-gray-400 theme-text-muted uppercase tracking-[0.2em]">Agreement Status</span>
                      <div className="flex items-center gap-2.5">
                        <div className="size-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                        <span className="text-base font-bold text-gray-900">Awaiting your signature</span>
                      </div>
                    </div>

                    <div className="p-6 bg-gray-50/50 rounded-2xl border border-gray-100 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm overflow-hidden">
                        {signingSession.ownerBranding?.logoUrl ? (
                          <Image src={signingSession.ownerBranding.logoUrl} alt="Logo" width={48} height={48} className="object-contain p-2" />
                        ) : (
                          <span className="font-bold text-gray-400">{((owner as any)?.email || 'S').charAt(0).toUpperCase()}</span>
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Sender</span>
                        <span className="text-sm font-bold text-gray-900 truncate">{(owner as any)?.email}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm py-4 border-y border-gray-50">
                      <span className="text-gray-500 font-medium">Sent on</span>
                      <span className="text-gray-900 font-bold">{new Date(signingSession.document.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      variant="outline"
                      className="w-full text-red-600 border-red-100 bg-red-50/50 hover:bg-red-100 hover:text-red-700 h-14 rounded-2xl font-bold text-sm transition-all"
                      onClick={onDecline}
                    >
                      Decline to Sign
                    </Button>
                    <p className="mt-3 text-[10px] text-gray-400 text-center font-medium leading-relaxed px-4">
                      Declining will immediately void this agreement.
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Improved Progress Bar */}
        <div className="h-[3px] w-full bg-gray-100 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-700 ease-in-out shadow-[0_0_8px_rgba(37,99,235,0.4)]"
            style={{
              width: `${(completedRequiredFields / (requiredFields.length || 1)) * 100}%`
            }}
          />
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden md:flex h-16 items-center justify-between px-6 bg-white border-b z-30 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            {signingSession.ownerBranding?.logoUrl ? (
              <div className="size-8 relative">
                <Image
                  src={signingSession.ownerBranding.logoUrl}
                  alt={signingSession.ownerBranding.brandName || "Logo"}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <Logo showStatus={false} />
            )}
            <div className="h-4 w-[1px] bg-gray-200 mx-1" />
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
                {signingSession.ownerBranding?.brandName || "Boopsign"}
              </span>
              <h1 className="text-sm font-bold truncate max-w-[200px] text-gray-900 tracking-tight leading-none">
                {signingSession.document.title}
              </h1>
            </div>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-gray-900 px-2 md:px-4 cursor-pointer">
                <FileText className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Details</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[400px] border-l border-gray-100 p-0 flex flex-col">
              <SheetHeader className="p-6 border-b border-gray-100">
                <SheetTitle className="text-sm font-black uppercase tracking-[0.2em] text-gray-900">Contract Details</SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Info className="w-3 h-3" />
                    Agreement Information
                  </h3>
                  <div className="space-y-4 bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
                    <div className="flex justify-between">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</span>
                      <span className="text-xs font-black text-blue-600 uppercase tracking-widest">Awaiting Signature</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Issued On</span>
                      <span className="text-xs font-bold text-gray-900">{new Date(signingSession.document.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <User className="w-3 h-3" />
                    Sender
                  </h3>
                  <div className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-2xl">
                    <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden">
                      {signingSession.ownerBranding?.logoUrl ? (
                        <Image
                          src={signingSession.ownerBranding.logoUrl}
                          alt="Logo"
                          width={40}
                          height={40}
                          className="object-contain p-1"
                        />
                      ) : (
                        <span className="font-bold text-slate-400">
                          {((owner as any)?.email || 'S').charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">
                        {signingSession.ownerBranding?.brandName || (owner as any)?.email}
                      </p>
                      <p className="text-[10px] text-gray-500 font-medium">Agreement Owner</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    variant="outline"
                    className="w-full text-red-600 border-red-100 bg-red-50 hover:bg-red-100 hover:text-red-700 h-12 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all"
                    onClick={onDecline}
                  >
                    Decline to Sign
                  </Button>
                  <p className="mt-3 text-[9px] text-gray-400 font-medium text-center leading-relaxed">
                    Declining will void this agreement for all parties. The sender will be notified of your decision.
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <Button
          onClick={
            completedRequiredFields >= requiredFields.length
              ? handleSubmitDocument
              : !hasStarted
                ? handleStartSigning
                : goToNextSignatureField
          }
          disabled={isSubmitting || signatureFields.length === 0}
          className={cn("px-8 font-black uppercase tracking-widest text-[10px] h-10 rounded-lg transition-all shadow-none border-none", {
            "bg-blue-600 hover:bg-blue-700 text-white": !hasStarted && signatureFields.length > 0 && completedRequiredFields < requiredFields.length,
            "bg-primary hover:bg-primary/90 text-primary-foreground": hasStarted && completedRequiredFields < requiredFields.length,
            "bg-green-600 hover:bg-green-700 text-white": completedRequiredFields >= requiredFields.length && signatureFields.length > 0 && !isSubmitting,
            "bg-gray-100 text-gray-400 font-bold": signatureFields.length === 0
          })}
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : completedRequiredFields >= requiredFields.length ? (
            "Finish Signature"
          ) : !hasStarted ? (
            "Ready to Sign"
          ) : (
            <div className="flex items-center gap-2">
              <span>Next Field</span>
              <span className="bg-white/20 px-1.5 py-0.5 rounded text-[8px] font-bold">
                {requiredFields.length - completedRequiredFields} Left
              </span>
            </div>
          )}
        </Button>

      </header>
    </>
  );
});

SigningNavbar.displayName = "SigningNavbar";
