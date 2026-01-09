"use client";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { FileText, Info, Loader2, User } from "lucide-react";
import Image from "next/image";
import { memo } from "react";

interface SigningNavbarProps {
  signingSession: any;
  owner: any;
  completedFields: number;
  totalFields: number;
  handleSubmitDocument: () => void;
  isSubmitting: boolean;
  isReady: boolean;
  signatureFields: any[];
  completedRequiredFields: number;
  requiredFields: any[];
  onDecline: () => void;
}

export const SigningNavbar = memo(({
  signingSession,
  owner,
  completedFields,
  totalFields,
  handleSubmitDocument,
  isSubmitting,
  isReady,
  signatureFields,
  completedRequiredFields,
  requiredFields,
  onDecline,
}: SigningNavbarProps) => {
  return (
    <>
      {/* Mobile-Specific Header */}
      <header className="md:hidden h-14 flex items-center justify-between px-4 bg-white/80 backdrop-blur-xl shrink-0 border-b border-gray-100 z-30">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="scale-75 origin-left">
            <Logo showText={false} />
          </div>
          <h1 className="text-sm font-semibold truncate leading-none tracking-tight text-gray-900">
            {signingSession.document.title}
          </h1>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 h-9 w-9">
              <span className="sr-only">Details</span>
              <div className="flex flex-col gap-[3px]">
                <div className="w-1 h-1 rounded-full bg-current" />
                <div className="w-1 h-1 rounded-full bg-current" />
                <div className="w-1 h-1 rounded-full bg-current" />
              </div>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85vh] rounded-t-[20px]">
            <SheetHeader className="border-b pb-4 mb-4">
              <SheetTitle className="text-left text-lg font-bold text-slate-900">Agreement Details</SheetTitle>
            </SheetHeader>
            <div className="space-y-6 overflow-y-auto max-h-[70vh] pb-8">
              <div className="space-y-4 px-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Status</span>
                  <span className="text-sm font-bold text-slate-900">Pending Signature</span>
                </div>
                <Separator />
                <div>
                  <span className="text-xs text-slate-500 uppercase font-bold tracking-wider block mb-2">Sender</span>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">
                      {((owner as any)?.email || 'S').charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900 line-clamp-1">{(owner as any)?.email}</span>
                      <span className="text-xs text-slate-500">{new Date(signingSession.document.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <Button
                  variant="outline"
                  className="w-full text-red-600 border-red-100 bg-red-50 hover:bg-red-100 hover:text-red-700 h-12"
                  onClick={onDecline}
                >
                  Decline to Sign
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* Desktop Header */}
      <header className="hidden md:flex h-16 items-center justify-between px-6 bg-white border-b z-30 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            {(owner as any)?.companyLogoUrl ? (
              <Image
                src={(owner as any).companyLogoUrl}
                alt={(owner as any).companyName || "Logo"}
                width={32}
                height={32}
                className="rounded-md object-contain"
              />
            ) : (
              <Logo />
            )}
            <div className="h-4 w-[1px] bg-gray-200" />
            <h1 className="text-sm font-bold truncate max-w-[200px] text-gray-900 uppercase tracking-tight">
              {signingSession.document.title}
            </h1>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-gray-900 px-2 md:px-4">
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
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-400">
                      {((owner as any)?.email || 'S').charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">{(owner as any)?.email}</p>
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

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end mr-2">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Progress</span>
            <span className="text-xs font-bold text-gray-900 font-mono tracking-tighter">
              {completedFields} / {totalFields} Fields
            </span>
          </div>

          <Button
            onClick={handleSubmitDocument}
            disabled={isSubmitting || !isReady || signatureFields.length === 0 || completedRequiredFields < requiredFields.length}
            className={cn("px-8 font-black uppercase tracking-widest text-[10px] h-10 rounded-lg transition-all shadow-none border-none", {
              "bg-green-600 hover:bg-green-700 text-white": isReady && signatureFields.length > 0 && completedRequiredFields >= requiredFields.length && !isSubmitting,
              "bg-gray-100 text-gray-400 font-bold": !isReady || signatureFields.length === 0 || completedRequiredFields < requiredFields.length
            })}
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Finish Signature"
            )}
          </Button>
        </div>
      </header>
    </>
  );
});

SigningNavbar.displayName = "SigningNavbar";
