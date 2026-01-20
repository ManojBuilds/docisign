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
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-1 flex items-center justify-center gap-2 text-amber-800 text-xs animate-in slide-in-from-top duration-300">
        <AlertCircle className="w-4 h-4 text-amber-500" />
        <span>
          This document is already completed. Adding new fields will re-open it
          for signature.
        </span>
      </div>
    );
  }
);

CompletedDocumentBanner.displayName = "CompletedDocumentBanner";
