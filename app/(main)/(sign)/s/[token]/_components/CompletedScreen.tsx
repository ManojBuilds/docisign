"use client";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";
import {
  Check,
  Download,
  FileText,
  Info,
  Loader2,
  ShieldCheck,
  User,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo } from "react";

interface CompletedScreenProps {
  signingSession: any;
  showConfetti: boolean;
  isCancelled: boolean;
  handleDownload: () => Promise<void>;
  isDownloading: boolean;
  allDocumentFields?: any[];
  isCompleted: boolean;
  isDeclined: boolean;
}

export function CompletedScreen({
  signingSession,
  isCancelled,
  handleDownload,
  isDownloading,
  allDocumentFields,
  isCompleted,
  isDeclined,
}: CompletedScreenProps) {
  const participants = useMemo(() => {
    if (!allDocumentFields) return [];

    const currentSignerEmail = signingSession?.signer?.email?.toLowerCase().trim();
    const uniqueSigners = new Map();

    allDocumentFields.forEach(field => {
      const email = field.signerEmail?.toLowerCase().trim();
      if (!email) return;

      let status = field.status;

      if (currentSignerEmail && email === currentSignerEmail) {
        const serverStatus = signingSession?.signer?.status;
        if (isDeclined || serverStatus === 'declined') {
          status = 'declined';
        } else if (isCompleted || serverStatus === 'signed') {
          status = 'signed';
        }
      }

      const statusRank = (s: string) => {
        if (s === 'signed') return 3;
        if (s === 'viewed') return 2;
        if (s === 'sent') return 1;
        return 0;
      };

      if (!uniqueSigners.has(email) || statusRank(status) > statusRank(uniqueSigners.get(email).status)) {
        uniqueSigners.set(email, {
          email: field.signerEmail,
          name: field.signerName,
          status: status,
          initial: (field.signerName || field.signerEmail || 'S').charAt(0).toUpperCase()
        });
      }
    });
    return Array.from(uniqueSigners.values());
  }, [allDocumentFields, isCompleted, isDeclined, signingSession?.signer?.email, signingSession?.signer?.status]);


  const handleFireworks = () => {
    const duration = 5 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)
  }

  useEffect(() => {
    if (!isCancelled) {
      handleFireworks()
    }
  }, [isCancelled])


  return (
    <>
      <div className="min-h-screen bg-white flex flex-col items-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.4]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(22.5deg, transparent, transparent 2px, rgba(75, 85, 99, 0.05) 2px, rgba(75, 85, 99, 0.05) 3px, transparent 3px, transparent 8px),
              repeating-linear-gradient(67.5deg, transparent, transparent 2px, rgba(107, 114, 128, 0.04) 2px, rgba(107, 114, 128, 0.04) 3px, transparent 3px, transparent 8px),
              repeating-linear-gradient(112.5deg, transparent, transparent 2px, rgba(55, 65, 81, 0.03) 2px, rgba(55, 65, 81, 0.03) 3px, transparent 3px, transparent 8px),
              repeating-linear-gradient(157.5deg, transparent, transparent 2px, rgba(31, 41, 55, 0.02) 2px, rgba(31, 41, 55, 0.02) 3px, transparent 3px, transparent 8px)
            `
          }}
        />

        {/* Minimal Header */}
        <div className="border-b w-full">
          <header className="w-full h-16 bg-white/80 backdrop-blur-md flex items-center px-4 justify-between relative z-10 sticky top-0 max-w-6xl mx-auto">
            <div className="flex items-center sm:gap-2">
              <div className="flex items-center justify-center overflow-hidden bg-gray-50 rounded-xl border border-gray-200/50 shadow-sm shrink-0">
                {signingSession.ownerBranding?.logoUrl ? (
                  <div className="size-6 sm:size-10">
                    <img
                      src={signingSession.ownerBranding.logoUrl}
                      alt={signingSession.ownerBranding.brandName || "Logo"}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                ) : (
                  <div className="scale-75 origin-center">
                    <Logo showText={false} />
                  </div>
                )}
              </div>
              <div className="h-4 w-[1px] bg-gray-200 hidden sm:block" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">
                  {signingSession.ownerBranding?.brandName || "Boopsign"}
                </span>
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest leading-none">powered by boopsign.com</span>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-6">
              <span className="text-[9px] sm:text-[10px] font-black text-emerald-600 uppercase tracking-[0.15em] sm:tracking-[0.2em] flex items-center gap-1 sm:gap-1.5 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                <ShieldCheck className="w-3 h-3" />
                <span className="hidden sm:block">Verified Transaction</span>
                <span className="sm:hidden">Verified</span>
              </span>
            </div>
          </header>
        </div>

        <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 sm:px-6 sm:py-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div
            className="contents lg:flex lg:flex-col lg:col-span-7 space-y-8"
          >
            <div className="order-1 space-y-6">
              {isCancelled ? (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100/50 text-red-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Voided</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100/50 text-emerald-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Completed</span>
                </div>
              )}

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[0.95] tracking-tight">
                {isCancelled ? (
                  <>
                    Agreement<br />
                    <span className="text-gray-300">Declined.</span>
                  </>
                ) : (
                  <>
                    All set!<br />
                    <span className="text-gray-300">Thanks for signing.</span>
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-gray-600 font-medium leading-relaxed max-w-xl">
                {isCancelled ? (
                  <>
                    You have declined <span className="text-gray-900 font-semibold">"{signingSession.document?.title}"</span>.
                    The sender has been notified and the document is now void.
                  </>
                ) : (
                  <>
                    <span className="text-gray-900 font-semibold">"{signingSession.document?.title}"</span> has been successfully signed.
                    A confirmation email is on its way.
                  </>
                )}
              </p>
            </div>

            <div className="order-3 space-y-6">
              {!isCancelled && (
                <div className="space-y-4">
                  {signingSession.document?.status === "completed" ? (
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        size={"lg"}
                        className="w-full sm:w-auto h-14 font-semibold text-sm uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 group cursor-pointer"
                      >
                        {isDownloading ? (
                          <>
                            Downloading
                            <Loader2 className="h-5 w-5 animate-spin ml-2" />
                          </>
                        ) : (
                          <>
                            Download PDF
                            <Download className="h-5 w-5 ml-2 group-hover:translate-y-0.5 transition-transform" />
                          </>
                        )}
                      </Button>
                    </div>
                  ) : (
                    <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                          <Loader2 className="w-5 h-5 animate-spin" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide mb-1">Finalizing Document</h4>
                          <p className="text-xs text-gray-600 leading-relaxed font-medium">
                            We're waiting for other parties to sign. You'll receive the final PDF via email once everyone has finished.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100/50 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default">
                  <div className="w-12 h-12 rounded-2xl bg-white text-blue-600 flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-500">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Audit Trail</h3>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    A tamper-proof record of every action taken, including timestamps, IP addresses, and verification events for complete legal accountability.
                  </p>
                </div>
                <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100/50 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default">
                  <div className="w-12 h-12 rounded-2xl bg-white text-emerald-600 flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-500">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Secure & Sealed</h3>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    Protected by AES-256 bank-level encryption and TLS 1.3, ensuring your sensitive data remains private and legally binding.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Details Column */}
          <div
            className="contents lg:flex lg:flex-col lg:col-span-5 space-y-6 lg:sticky lg:top-8"
          >
            <div className="order-2 w-full">
              <div className="bg-white border border-gray-200 rounded-[2.5rem] shadow-2xl p-6 sm:p-8 space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-[0.03] pointer-events-none">
                  <FileText className="w-48 h-48" />
                </div>

                <div className="space-y-6 relative">
                  <div>
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                      <Info className="w-3.5 h-3.5" />
                      Document Info
                    </h3>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100/50">
                      <div className="w-12 h-12 bg-white rounded-xl border border-gray-100 flex items-center justify-center shrink-0 shadow-sm">
                        <FileText className="w-6 h-6 text-gray-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 truncate text-sm mb-0.5">{signingSession.document?.title}</p>
                        <p className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">ID: {signingSession.document?._id.slice(-8)}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                      <User className="w-3.5 h-3.5" />
                      Signers
                    </h3>
                    <div className="space-y-3">
                      {participants.map((participant) => (
                        <div
                          key={participant.email}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black border transition-colors shrink-0",
                            participant.status === "signed"
                              ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                              : "bg-gray-100 text-gray-500 border-gray-200"
                          )}>
                            {participant.initial}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-gray-900 truncate">{participant.email}</p>
                            <p className="text-[10px] text-gray-500 truncate">
                              {participant.status === "signed" ? "Signed electronically" : "Pending signature"}
                            </p>
                          </div>
                          {participant.status === "signed" && (
                            <div className="bg-emerald-50 text-emerald-600 p-1 rounded-full">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 flex items-center justify-between relative">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Date</span>
                    <span className="text-xs font-semibold text-gray-900">{new Date().toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Security</span>
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                      <ShieldCheck className="w-3 h-3" />
                      Encrypted
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-4">
              <div className="bg-[#111] rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute -right-12 -bottom-12 opacity-5 scale-150 group-hover:scale-125 transition-transform duration-1000 rotate-12">
                  <Logo />
                </div>
                <div className="relative z-10">
                  <h3 className="font-semibold text-xl mb-2 leading-tight">Boopsign for you</h3>
                  <p className="text-gray-400 text-xs mb-6 font-medium leading-relaxed max-w-[280px]">
                    Secure, verified digital signatures for your documents. Get started for free today.
                  </p>
                  <Button asChild className="w-full h-12 font-black text-[10px] uppercase tracking-[0.2em] cursor-pointer transition-all">
                    <Link href={'/dashboard'}>
                      Create Free Account <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer Promotion */}
        <footer className="w-full py-16 border-t border-gray-100 bg-gray-50/50 relative z-10 mt-auto">
          <div className="container mx-auto px-4 flex flex-col items-center text-center">
            <div className="flex items-center gap-3 mb-6 opacity-30 hover:opacity-100 transition-opacity duration-700">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Powered by</span>
              <Logo showText={true} className="grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
            <p className="text-xs text-gray-400 font-medium max-w-md leading-relaxed mb-8">
              Boopsign is the simplest way to get documents signed.
              No accounts for signers. Bank-level security. Mobile-first design.
            </p>
            <div className="flex items-center gap-8">
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-gray-300" />
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Legally Binding</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <FileText className="w-4 h-4 text-gray-300" />
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Audit Trail</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-4 h-4 rounded-full border border-gray-200 flex items-center justify-center text-[8px] font-bold text-gray-300">256</div>
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Encrypted</span>
              </div>
            </div>
            <p className="mt-12 text-[10px] text-gray-300 font-medium">
              &copy; {new Date().getFullYear()} Boopsign. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

