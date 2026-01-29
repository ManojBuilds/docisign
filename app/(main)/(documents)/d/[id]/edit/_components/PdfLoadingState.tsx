import Logo from "@/components/Logo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { memo } from "react";

/**
 * Loading state component for the PDF viewer
 */
export const PdfLoadingState = memo(() => {
  return (
    <div className="flex-1 flex h-full w-full bg-gray-50/50 overflow-hidden">
      {/* Left Sidebar Placeholder */}
      <div className="w-48 border-r bg-white flex flex-col animate-pulse hidden md:block">
        <div className="p-4 border-b h-[53px] flex items-center justify-between">
          <div className="h-3 w-12 bg-gray-100 rounded" />
          <div className="h-4 w-6 bg-gray-100 rounded" />
        </div>
        <div className="p-4 space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className="aspect-[3/4] w-full bg-gray-50 rounded-sm border border-gray-100" />
              <div className="h-2 w-10 bg-gray-50 rounded mx-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Loading Area */}
      <ScrollArea className="flex-1">
        <div className="flex flex-col items-center justify-center p-8 md:p-12 relative bg-transparent">
          {/* Mock PDF Page - Softened */}
          <div className="w-full max-w-[600px] aspect-[1/1.41] bg-white rounded-md border border-gray-100 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-700">
            <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-6 scale-90 opacity-70">
                <Logo />
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="h-1 w-32 bg-gray-50 rounded-full overflow-hidden">
                  <div className="h-full bg-primary/40 animate-indeterminate-progress rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
});

PdfLoadingState.displayName = "PdfLoadingState";
