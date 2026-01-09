"use client"
import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { Confetti } from '@/components/ui/confetti'
import { api } from '@/convex/_generated/api'
import { cn } from '@/lib/utils'
import { useMutation, useQuery } from 'convex/react'
import {
  Check,
  Download,
  FileText,
  Info,
  Loader2,
  Lock,
  Mail,
  ShieldCheck, User
} from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'

function SigningComplete() {
  const searchParams = useSearchParams()
  const accessToken = searchParams.get('token')

  const signingSession = useQuery(
    api.signers.getSigningSession,
    accessToken ? { accessToken } : "skip"
  )

  const [isDownloading, setIsDownloading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const getFileUrl = useMutation(api.documents.getFileUrl);

  const isCancelled = signingSession?.document?.status === "cancelled" || signingSession?.document?.status === "declined";

  // Show confetti when component mounts and document is successfully signed
  useEffect(() => {
    if (signingSession && !signingSession.error && !isCancelled) {
      setShowConfetti(true);
      // Hide confetti after animation completes
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [signingSession]);

  const handleDownload = async () => {
    if (!signingSession?.document?.fileStorageId) return;

    setIsDownloading(true);
    try {
      const url = await getFileUrl({ storageId: signingSession.document.fileStorageId });
      if (url) {
        const a = document.createElement("a");
        a.href = url;
        a.download = signingSession.document.title + "-signed.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (signingSession === undefined && accessToken) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!signingSession || signingSession.error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4 p-8">
          <div className="h-12 w-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
            <Mail className="h-6 w-6 text-destructive" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-semibold">Invalid Session</h1>
            <p className="text-muted-foreground">This signing session could not be found.</p>
          </div>
        </div>
      </div>
    )
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
        <header className="w-full h-16 bg-white/80 backdrop-blur-md border-b flex items-center px-8 justify-between relative z-10">
          <div className="flex items-center gap-4">
            <Logo />
            <div className="h-4 w-[1px] bg-gray-200" />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">Agreement Management</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3" />
              Verified Transaction
            </span>
          </div>
        </header>

        <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-12 relative z-10 flex flex-col md:flex-row gap-12 items-start">
          {/* Left Column: Hero & Actions */}
          <div className="flex-1 space-y-10">
            <div className="space-y-4">
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

              <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-[1.1] tracking-tight">
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

              <p className="text-lg text-gray-600 font-medium leading-relaxed">
                {isCancelled ? (
                  <>
                    You have chosen to decline
                    <span className="text-gray-900 font-bold mx-1.5">&ldquo;{signingSession.document?.title}&rdquo;</span>.
                    The sender has been notified and the document is now void.
                  </>
                ) : (
                  <>
                    The document
                    <span className="text-gray-900 font-bold mx-1.5">&ldquo;{signingSession.document?.title}&rdquo;</span>
                    has been successfully signed and returned to the sender.
                  </>
                )}
              </p>
            </div>

            {!isCancelled && (
              <div className="space-y-4 pt-4">
                <Button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="w-full md:w-auto px-8 bg-gray-900 hover:bg-black text-white rounded-xl h-14 font-bold text-sm shadow-xl shadow-gray-200 uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 group"
                >
                  {isDownloading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <Download className="h-5 w-5 mr-3 group-hover:translate-y-0.5 transition-transform" />
                      Download Signed PDF
                    </>
                  )}
                </Button>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em] ml-2">
                  A copy has been sent to your email
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Audit Trail</h3>
                <p className="text-xs text-gray-500 leading-relaxed">View the complete certified activity trail for this agreement.</p>
              </div>
              <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Verify Signature</h3>
                <p className="text-xs text-gray-500 leading-relaxed">Verify the authenticity and integrity of the digital signatures applied.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Status Card */}
          <div className="w-full md:w-[360px] space-y-6">
            <div className="bg-white border border-gray-200 rounded-3xl shadow-2xl p-8 space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
                <FileText className="w-24 h-24" />
              </div>

              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Info className="w-3 h-3" />
                  Agreement Details
                </h3>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-gray-900 truncate text-sm">{signingSession.document?.title}</p>
                    <p className="text-[10px] text-gray-500 font-mono truncate uppercase tracking-tight">ID: {signingSession.document?._id.slice(-8)}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <User className="w-3 h-3" />
                  Participants
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-[10px] font-bold border border-emerald-100">
                      {(signingSession.signer?.email || 'S').charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-gray-900 truncate leading-none mb-0.5">{signingSession.signer?.email}</p>
                      <p className={cn(
                        "text-[9px] font-black uppercase tracking-widest flex items-center gap-1",
                        isCancelled ? "text-red-600" : "text-emerald-600"
                      )}>
                        {isCancelled ? (
                          <>Declined</>
                        ) : (
                          <>
                            <Check className="w-2 h-2" />
                            Signed
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  {/* We could list other signers here if the API provided them */}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Signed At</span>
                  <span className="text-xs font-bold text-gray-800">{new Date().toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Time</span>
                  <span className="text-xs font-bold text-gray-800">{new Date().toLocaleTimeString(undefined, { timeStyle: 'short' })}</span>
                </div>
              </div>
            </div>

            {/* Account CTA */}
            <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-200 relative overflow-hidden group cursor-pointer">
              <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
                <Logo />
              </div>
              <h3 className="font-bold text-lg mb-2 leading-tight">Need to send your own documents?</h3>
              <p className="text-blue-100 text-xs mb-6 font-medium leading-relaxed">
                Join thousands of businesses using Boopsign for secure, verified digital signatures.
              </p>
              <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 h-10 rounded-xl font-black text-[10px] uppercase tracking-[0.2em]">
                Create Free Account
              </Button>
            </div>
          </div>
        </main>

        {/* Minimal Footer */}
        <footer className="w-full py-8 text-center relative z-10">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
            Secured & Verified by Boopsign.com
          </p>
        </footer>
      </div>
    </>
  )
}

export default function SigningCompletePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    }>
      <SigningComplete />
    </Suspense>
  )
}
