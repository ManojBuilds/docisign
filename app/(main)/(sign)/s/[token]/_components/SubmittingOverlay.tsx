import { FileCheck, ShieldCheck, CheckCircle } from "lucide-react";

export function SubmittingOverlay() {
  return (
    <div
      className="fixed inset-0 z-[100] bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-700"
    >
      <div className="flex flex-col items-center max-w-sm w-full space-y-8">
        {/* Animated checkmark with spinning circle */}
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
              Your document is being securely processed and finalized.
            </p>
            
            {/* Steps indicator */}
            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-xs text-gray-600">Saving your signatures</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
                <span className="text-xs text-gray-600">Generating signed document</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
                <span className="text-xs text-gray-600">Sending notifications</span>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2 pt-2">
              <div className="px-3 py-1 bg-blue-50 rounded-full border border-blue-100/50 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-700">AES-256 Encrypted</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] animate-pulse">
          Please do not refresh the page
        </p>
      </div>
    </div>
  );
}
