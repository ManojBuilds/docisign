import Logo from "@/components/Logo";
import { Lock } from "lucide-react";

export function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.3]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
            repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.01) 10px, rgba(0,0,0,0.01) 11px)
          `
        }}
      />

      <div className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in-95 duration-500 px-4">
        <div className="mb-6 sm:mb-8 scale-100 sm:scale-110">
          <Logo />
        </div>

        <div className="flex flex-col items-center space-y-4 w-full max-w-xs">
          <div className="h-1.5 w-full max-w-[280px] sm:w-48 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-primary animate-indeterminate-progress rounded-full" />
          </div>
          <p className="text-sm font-medium text-gray-400 uppercase tracking-widest animate-pulse">
            Preparing Document...
          </p>
        </div>

        <div className="mt-8 sm:mt-12 flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100/50">
          <Lock className="w-3 h-3 text-gray-400" />
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            End-to-End Encrypted Session
          </span>
        </div>
      </div>
    </div>
  );
}
