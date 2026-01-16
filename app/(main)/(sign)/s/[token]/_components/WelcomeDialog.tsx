"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle
} from "@/components/ui/dialog";
import { Check, ShieldCheck } from "lucide-react";
import Image from "next/image";

interface WelcomeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  documentTitle: string;
  senderEmail: string;
  brandName?: string;
  brandLogoUrl?: string;
}

export function WelcomeDialog({
  open,
  onOpenChange,
  onConfirm,
  documentTitle,
  senderEmail,
  brandName,
  brandLogoUrl,
}: WelcomeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="sm:max-w-[500px] p-0 overflow-hidden border-none shadow-2xl rounded-3xl bg-white focus-visible:outline-none"
      >
        <div className="bg-gray-900 p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            {brandLogoUrl ? (
              <Image
                src={brandLogoUrl}
                alt="Logo"
                width={128}
                height={128}
                className="size-32 rounded-xl object-cover"
                unoptimized
              />
            ) : (
              <ShieldCheck className="w-32 h-32" />
            )}
          </div>
          <div className="relative z-10 flex items-center gap-4">
            {brandLogoUrl && (
              <div className="size-12 bg-white rounded-xl flex items-center justify-center p-2 shrink-0 shadow-xl relative overflow-hidden">
                <Image
                  src={brandLogoUrl}
                  alt="Logo"
                  fill
                  className="object-contain p-2"
                  unoptimized
                />
              </div>
            )}
            <div className="space-y-1">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Review & Act</h3>
              <DialogTitle className="text-2xl font-black tracking-tight leading-tight uppercase">
                Ready to Sign?
              </DialogTitle>
            </div>
          </div>
          <p className="text-gray-400 text-sm font-medium mt-4">
            Document sent by <span className="text-white font-bold">{brandName || senderEmail}</span>
          </p>
        </div >

        <div className="p-8 space-y-8">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-blue-600 stroke-[3]" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-gray-900">Review the Document</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Carefully read through <span className="font-bold text-gray-700 italic">"{documentTitle}"</span> before proceeding with the digital signature.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-blue-600 stroke-[3]" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-gray-900">Electronic Consent</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  By clicking continue, you agree to conduct this transaction electronically and use electronic records and signatures.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-col gap-2 sm:flex-col sm:justify-center">
            <Button
              onClick={onConfirm}
              className="w-full bg-gray-900 hover:bg-black text-white h-12 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-gray-200 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              Continue
            </Button>
            <p className="text-[9px] text-gray-400 text-center font-medium leading-none">
              Your signature will be legally binding under the ESIGN Act.
            </p>
          </DialogFooter>
        </div>
      </DialogContent >
    </Dialog >
  );
}
