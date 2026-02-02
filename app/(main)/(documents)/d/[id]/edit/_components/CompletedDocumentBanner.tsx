import { AlertCircle } from "lucide-react";
import { memo } from "react";

interface CompletedDocumentBannerProps {
  isCompleted: boolean;
}

/**
 * Banner to show when document is already completed
 */
export const CompletedDocumentBanner = memo(
  ({ isCompleted }: CompletedDocumentBannerProps) => {
    if (!isCompleted) return null;

    return (
      <div className="bg-amber-50/80 backdrop-blur-sm border-b border-amber-200/50 px-4 py-1 flex items-center justify-center gap-3 text-amber-900 animate-in slide-in-from-top duration-500 shadow-sm relative z-40">
        <div className="p-1 rounded-full bg-amber-100/50 text-amber-600 ring-1 ring-amber-200/50">
          <AlertCircle className="w-2.5 h-2.5" />
        </div>
        <span className="text-[11px] font-bold tracking-wide">
          This document is completed. <span className="opacity-60 font-normal">Adding fields will reopen it.</span>
        </span>
      </div>
    );
  }
);

CompletedDocumentBanner.displayName = "CompletedDocumentBanner";
