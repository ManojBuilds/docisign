import Logo from "@/components/Logo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { memo } from "react";

/**
 * Loading state component for the PDF viewer
 */
export const PdfLoadingState = memo(() => {
  return (
    <div className="flex-1 flex h-full w-full bg-gray-50/50 overflow-hidden relative">
      {/* Left Sidebar Placeholder */}
      <div className="w-52 border-r border-gray-200/60 bg-white flex flex-col animate-pulse hidden md:block z-10">
        <div className="p-6 border-b border-gray-100 h-[73px] flex items-center justify-between bg-gray-50/40">
          <div className="space-y-1.5">
            <div className="h-2.5 w-16 bg-gray-200 rounded-full" />
            <div className="h-2 w-10 bg-gray-100 rounded-full" />
          </div>
          <div className="h-5 w-8 bg-gray-100 rounded-full" />
        </div>
        <div className="p-6 space-y-8 flex flex-col items-center">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3 w-full flex flex-col items-center">
              <div className="aspect-[1/1.41] w-32 bg-gray-100 rounded-sm shadow-sm" />
              <div className="h-2 w-12 bg-gray-100 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Loading Area */}
      <ScrollArea className="flex-1">
        <div className="flex flex-col items-center justify-center p-8 md:p-12 relative bg-transparent min-h-full">
          {/* Mock PDF Page - Softened */}
          <div className="w-full max-w-[600px] aspect-[1/1.41] bg-white rounded-md shadow-sm border border-gray-100 flex flex-col items-center justify-center animate-pulse">
            <div className="flex flex-col items-center gap-6 opacity-60">
              <div className="scale-90 opacity-50 grayscale">
                <Logo />
              </div>
              <div className="h-1 w-32 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gray-300 w-1/2 animate-[shimmer_1.5s_infinite]" />
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
});

PdfLoadingState.displayName = "PdfLoadingState";
