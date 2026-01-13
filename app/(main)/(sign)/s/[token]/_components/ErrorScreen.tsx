import Logo from "@/components/Logo";
import { AlertTriangle, ShieldCheck } from "lucide-react";

export function ErrorScreen() {
  return (
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
          <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest leading-none hidden sm:block">Access Denied</span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none sm:hidden">Access</span>
        </div>
        <div className="flex items-center gap-3 sm:gap-6">
          <span className="text-[9px] sm:text-[10px] font-black text-red-600 uppercase tracking-[0.15em] sm:tracking-[0.2em] flex items-center gap-1 sm:gap-1.5">
            <ShieldCheck className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
            <span className="hidden sm:block">Security Alert</span>
            <span className="sm:hidden">Alert</span>
          </span>
        </div>
      </header>

      <main className="flex-1 w-full max-w-2xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center relative z-10 text-center -mt-8 sm:-mt-16">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-50 rounded-3xl flex items-center justify-center mb-6 sm:mb-8 border border-red-100 shadow-xl shadow-red-500/10">
          <AlertTriangle className="w-8 sm:w-10 h-8 sm:h-10 text-red-600" />
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-3 sm:mb-4 tracking-tight">
          Invalid or Expired Link
        </h1>

        <p className="text-base sm:text-lg text-gray-500 font-medium leading-relaxed max-w-lg mb-6 sm:mb-8">
          This secure document access link is no longer valid. It may have expired, been revoked, or already been used.
        </p>

        <div className="p-5 sm:p-6 bg-gray-50 border border-gray-100 rounded-2xl w-full max-w-sm">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2">What should I do?</h3>
          <p className="text-sm text-gray-500">
            Please check your email for a newer link or contact the sender directly to request a fresh signing invitation.
          </p>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="w-full py-6 sm:py-8 text-center relative z-10">
        <p className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] sm:tracking-[0.2em]">
          Secured & Verified by Boopsign.com
        </p>
      </footer>
    </div>
  );
}
