import Logo from "@/components/Logo";
import { memo } from "react";

/**
 * Loading state component for the PDF viewer
 */
export const PdfLoadingState = memo(() => {
  return (
    <div className="flex-1 flex items-center justify-center h-full w-full bg-gray-50/50">
      <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-300">
        <div className="mb-6 scale-90 opacity-80">
          <Logo />
        </div>
        <div className="h-1 w-32 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-primary animate-indeterminate-progress rounded-full" />
        </div>
      </div>
    </div>
  );
});

PdfLoadingState.displayName = "PdfLoadingState";
