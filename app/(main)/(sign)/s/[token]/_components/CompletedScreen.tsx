"use client";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Check,
  Download,
  FileText,
  Info,
  Loader2,
  Mail,
  ShieldCheck,
  User
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import confetti from "canvas-confetti"

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
  showConfetti,
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
   handleFireworks() 
  }, [])


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
        <header className="w-full h-16 bg-white/80 backdrop-blur-md border-b flex items-center px-4 justify-between relative z-10">
          <div className="flex items-center gap-3 sm:gap-4">
            <Logo />
            <div className="h-4 w-[1px] bg-gray-200 hidden sm:block" />
            <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest leading-none hidden sm:block">Agreement Management</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none sm:hidden">Agreement</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-6">
            <span className="text-[9px] sm:text-[10px] font-black text-emerald-600 uppercase tracking-[0.15em] sm:tracking-[0.2em] flex items-center gap-1 sm:gap-1.5">
              <ShieldCheck className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
              <span className="hidden sm:block">Verified Transaction</span>
              <span className="sm:hidden">Verified</span>
            </span>
          </div>
        </header>

        <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6 sm:px-6 sm:py-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
          <div className="contents lg:flex lg:flex-col lg:col-span-7 space-y-8">
            <div className="order-1 space-y-4 sm:space-y-6 mb-2 sm:mb-0">
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

              <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-[1.1] tracking-tight">
                {isCancelled ? (
                  <>
                    Agreement Declined.<br />
                    <span className="text-gray-400">The process has been stopped.</span>
                  </>
                ) : (
                  <>
                    You're all set!<br />
                    <span className="text-gray-400">Thank you for using Boopsign.</span>
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-gray-600 font-medium leading-relaxed max-w-2xl break-words px-1">
                {isCancelled ? (
                  <>
                    You have chosen to decline{" "}
                    <span className="text-gray-900 font-bold inline-block break-all sm:break-normal">&ldquo;{signingSession.document?.title}&rdquo;</span>.{" "}
                    The sender has been notified and the document is now void.
                  </>
                ) : (
                  <>
                    The document{" "}
                    <span className="text-gray-900 font-bold inline-block break-all sm:break-normal">&ldquo;{signingSession.document?.title}&rdquo;</span>{" "}
                    has been successfully signed and returned to the sender.
                  </>
                )}
              </p>
            </div>

            <div className="order-3 space-y-2 sm:space-y-8">
              {!isCancelled && (
                <div className="space-y-4">
                  <Button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="w-full sm:w-auto px-8 sm:px-12 bg-gray-900 hover:bg-black text-white rounded-2xl h-14 sm:h-16 font-bold text-base shadow-2xl shadow-gray-200 uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 group cursor-pointer mt-4 sm:mt-6"
                  >
                    {isDownloading ? (
                      <>
                        Downloading
                        <Loader2 className="h-6 w-6 animate-spin" />
                      </>
                    ) : (
                      <>
                        <Download className="h-6 w-6 mr-3 group-hover:translate-y-0.5 transition-transform" />
                        Download Signed PDF
                      </>
                    )}
                  </Button>
                  <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em] ml-2">
                    <Mail className="w-3 h-3" />
                    <span>A copy has been sent to your email</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-300">
                <div className="p-6 bg-white border border-gray-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Audit Trail</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">View the complete certified activity trail for this agreement.</p>
                </div>
                <div className="p-6 bg-white border border-gray-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Security Hash</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">Verify the authenticity and integrity of the digital signatures applied.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contents lg:flex lg:flex-col lg:col-span-5 space-y-8 lg:sticky lg:top-8">
            <div className="order-2 w-full transition-all duration-300">
              <div className="bg-white border border-gray-200 rounded-[2.5rem] shadow-2xl p-6 sm:p-8 space-y-6 sm:space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-[0.03] pointer-events-none">
                  <FileText className="w-32 h-32" />
                </div>

                <div className="space-y-5">
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Info className="w-3.5 h-3.5" />
                    Agreement Details
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center shrink-0">
                      <FileText className="w-6 sm:w-7 h-6 sm:h-7 text-gray-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-gray-900 truncate text-base">{signingSession.document?.title}</p>
                      <p className="text-[10px] sm:text-xs text-gray-500 font-mono truncate uppercase tracking-tight opacity-70">ID: {signingSession.document?._id.slice(-12)}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <User className="w-3.5 h-3.5" />
                    Participants
                  </h3>
                  <div className="space-y-4">
                    {participants.map((participant) => (
                      <div key={participant.email} className="flex items-center gap-4">
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-black border transition-colors",
                          participant.status === "signed"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                            : "bg-gray-50 text-gray-400 border-gray-100"
                        )}>
                          {participant.initial}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-bold text-gray-900 truncate leading-none mb-1.5">{participant.email}</p>
                          <p className={cn(
                            "text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5",
                            participant.status === "signed" ? "text-emerald-600" :
                              participant.status === "viewed" ? "text-blue-500" : "text-gray-400"
                          )}>
                            {participant.status === "signed" ? (
                              <>
                                <Check className="w-3 h-3 stroke-[3]" />
                                Signed
                              </>
                            ) : participant.status === "viewed" ? (
                              <>
                                <Info className="w-3 h-3" />
                                Viewed
                              </>
                            ) : (
                              <>Pending</>
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 sm:pt-8 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Completed At</span>
                    <span className="text-xs sm:text-sm font-bold text-gray-800">{new Date().toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Status</span>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">Digital Certificate Issued</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-4">
              <div className="bg-blue-600 rounded-[2.5rem] p-6 sm:p-8 text-white shadow-2xl shadow-blue-200 relative overflow-hidden group">
                <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                  <Logo />
                </div>
                <div className="relative">
                  <h3 className="font-bold text-lg sm:text-xl mb-3 leading-tight">Need to send your own?</h3>
                  <p className="text-blue-100 text-[11px] mb-6 font-medium leading-relaxed opacity-90">
                    Join thousands of businesses using Boopsign for secure, verified digital signatures.
                  </p>
                  <Button asChild className="w-full bg-white text-blue-600 hover:bg-white/95 h-12 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl cursor-pointer">
                    <Link href={'/sign-in'}>
                      Create Account
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="w-full py-6 sm:py-8 text-center relative z-10">
          <p className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] sm:tracking-[0.2em]">
            Secured & Verified by Boopsign.com
          </p>
        </footer>
      </div>
    </>
  );
}
