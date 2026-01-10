"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { memo } from "react";

interface SigningBottomBarProps {
  incompleteRequiredFields: any[];
  isSubmitting: boolean;
  onNext: () => void;
  onSubmit: () => void;
}

export const SigningBottomBar = memo(({
  incompleteRequiredFields,
  isSubmitting,
  onNext,
  onSubmit,
}: SigningBottomBarProps) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom duration-300">
      <div className="bg-white/80 backdrop-blur-xl border-t border-gray-100 shadow-[0_-8px_30px_rgba(0,0,0,0.05)] pb-[calc(env(safe-area-inset-bottom))]">
        <div className="p-3">
          <Button
            size="lg"
            className={cn(
              "w-full h-14 rounded-full font-black uppercase tracking-widest text-sm transition-all shadow-xl active:scale-[0.98] cursor-pointer",
              incompleteRequiredFields.length === 0
                ? "bg-green-600 hover:bg-green-700 text-white shadow-green-600/30"
                : "bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/30"
            )}
            onClick={incompleteRequiredFields.length > 0 ? onNext : onSubmit}
            disabled={isSubmitting}
          >
            {incompleteRequiredFields.length > 0 ? (
              <div className="flex items-center gap-2">
                <span>Next</span>
                <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] font-bold">{incompleteRequiredFields.length}</span>
              </div>
            ) : (
              <span className="flex items-center gap-2">Click to Sign <Check className="w-5 h-5" /></span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
});

SigningBottomBar.displayName = "SigningBottomBar";
