"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle
} from "@/components/ui/dialog";
import { Check, ShieldCheck, Mail, FileText } from "lucide-react";
import { motion } from "motion/react";

interface WelcomeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  documentTitle: string;
  senderEmail: string;
  brandName?: string;
  brandLogoUrl?: string;
  customMessage?: string;
}

export function WelcomeDialog({
  open,
  onOpenChange,
  onConfirm,
  documentTitle,
  senderEmail,
  brandName,
  brandLogoUrl,
  customMessage,
}: WelcomeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="max-w-[calc(100vw-32px)] sm:max-w-[480px] p-0 overflow-hidden border-none shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] rounded-[32px] bg-white focus-visible:outline-none focus:outline-none"
      >
        <div className="bg-gray-950 p-6 sm:p-10 text-white relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-600/5 rounded-full blur-3xl -ml-24 -mb-24" />

          <div className="relative z-10 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              {brandLogoUrl ? (
                <div className="md:size-14 size-10 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 border border-white/10 shadow-xl overflow-hidden group relative">
                  <img
                    src={brandLogoUrl}
                    alt="Logo"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              ) : (
                <div className="size-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 border border-white/10 shadow-xl">
                  <ShieldCheck className="w-7 h-7 text-blue-400" />
                </div>
              )}
              <div className="px-3 py-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Secure Review</span>
              </div>
            </div>

            <div className="space-y-2">
              <DialogTitle className="text-2xl sm:text-3xl font-black tracking-tight leading-tight uppercase italic flex flex-col">
                <span>Verification</span>
                <span className="text-blue-500">Required</span>
              </DialogTitle>
              <p className="text-gray-400 text-sm font-medium">
                Document sent for your review by <span className="text-white font-semibold">{brandName || senderEmail}</span>
              </p>
            </div>

            {customMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 mt-2"
              >
                <div className="flex gap-3">
                  <Mail className="size-4 text-blue-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-400/80">Personal Message</p>
                    <p className="text-sm text-gray-300 leading-relaxed italic">
                      "{customMessage}"
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div >

        <div className="p-6 sm:p-10 space-y-8">
          <div className="space-y-6">
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-start gap-5"
            >
              <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100/50">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div className="space-y-1 py-1">
                <p className="text-sm font-semibold text-gray-900">Review Terms</p>
                <p className="text-[13px] text-gray-500 leading-relaxed">
                  Please review <span className="font-semibold text-gray-900">"{documentTitle}"</span> carefully before signing.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-start gap-5"
            >
              <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100/50">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
              </div>
              <div className="space-y-1 py-1">
                <p className="text-sm font-semibold text-gray-900">Digital Consent</p>
                <p className="text-[13px] text-gray-500 leading-relaxed">
                  You agree to conduct this transaction electronically as per the ESIGN Act.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="space-y-4">
            <Button
              onClick={onConfirm}
              className="w-full h-14 font-black uppercase tracking-[0.2em] text-[11px]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Continue to Sign
                <Check className="size-4 stroke-[3]" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Button>
            <div className="flex flex-col items-center gap-2">
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest flex items-center gap-1.5 justify-center">
                <Mail className="size-3" />
                {senderEmail}
              </p>
            </div>
          </div>
        </div>
      </DialogContent >
    </Dialog >
  );
}
