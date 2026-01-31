import { Loader2 } from "lucide-react";

export const Loader = () => (
  <div className="w-full max-w-[420px] p-8 bg-white rounded-2xl border border-slate-200/60 shadow-xl overflow-hidden relative">
    {/* Header Skeleton */}
    <div className="flex flex-col items-center mb-8">
      <div className="w-12 h-12 bg-slate-100 rounded-xl mb-4 animate-pulse" />
      <div className="h-6 w-48 bg-slate-100 rounded-lg mb-2 animate-pulse" />
      <div className="h-4 w-32 bg-slate-50 rounded-lg animate-pulse" />
    </div>

    {/* Social Buttons Skeleton */}
    <div className="space-y-3 mb-8">
      <div className="h-11 w-full bg-slate-50 rounded-xl border border-slate-100 animate-pulse" />
      <div className="h-11 w-full bg-slate-50 rounded-xl border border-slate-100 animate-pulse" />
    </div>

    {/* Divider */}
    <div className="flex items-center gap-4 mb-8">
      <div className="h-px flex-1 bg-slate-100" />
      <div className="h-3 w-8 bg-slate-50 rounded animate-pulse" />
      <div className="h-px flex-1 bg-slate-100" />
    </div>

    {/* Form Skeleton */}
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="h-4 w-20 bg-slate-100 rounded animate-pulse" />
        <div className="h-11 w-full bg-slate-50 rounded-xl border border-slate-100 animate-pulse" />
      </div>
      <div className="h-11 w-full bg-blue-600/10 rounded-xl animate-pulse" />
    </div>

    {/* Footer Skeleton */}
    <div className="mt-8 pt-6 border-t border-slate-50 flex justify-center">
      <div className="h-4 w-40 bg-slate-50 rounded animate-pulse" />
    </div>

    {/* Centered Spinner */}
    <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[1px] z-10 transition-opacity">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" strokeWidth={2} />
        <span className="text-xs font-medium text-slate-400">Loading secure portal...</span>
      </div>
    </div>
  </div>
);
