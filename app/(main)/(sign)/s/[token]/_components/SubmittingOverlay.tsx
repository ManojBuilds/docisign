import { FileCheck, ShieldCheck } from "lucide-react";

export function SubmittingOverlay() {
  return (
    <div
      className="fixed inset-0 z-[100] bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-700"
    >
      <div className="flex flex-col items-center max-w-sm w-full space-y-12">
        {/* Custom Adobe-style Spinning Circle */}
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-gray-100 rounded-full" />
          <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <FileCheck className="w-8 h-8 text-blue-600 animate-pulse" />
          </div>
        </div>

        <div className="text-center space-y-4 px-6">
          <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">Finalizing Agreement</h2>
          <div className="space-y-2">
            <p className="text-sm text-gray-500 font-medium leading-relaxed">
              We're securing your signatures and generating the final certified document.
            </p>
            <div className="flex items-center justify-center gap-2 pt-4">
              <div className="px-3 py-1 bg-blue-50 rounded-full border border-blue-100/50 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-700">AES-256 Encrypted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="w-48 h-1 bg-gray-50 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 animate-indeterminate-progress rounded-full scale-x-75 origin-left" />
        </div>

        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] animate-pulse">
          Please do not refresh the page
        </p>
      </div>
    </div>
  );
}
