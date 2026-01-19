import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { memo } from "react";

interface SigningBottomBarProps {
  incompleteRequiredFields: any[];
  isSubmitting: boolean;
  onNext: () => void;
  onSubmit: () => void;
  hasStarted: boolean;
  handleStartSigning: () => void;
}

export const SigningBottomBar = memo(({
  incompleteRequiredFields,
  isSubmitting,
  onNext,
  onSubmit,
  hasStarted,
  handleStartSigning,
}: SigningBottomBarProps) => {
  const handleClick = () => {
    if (incompleteRequiredFields.length === 0) {
      onSubmit();
    } else if (!hasStarted) {
      handleStartSigning();
    } else {
      onNext();
    }
  };

  const isFinished = incompleteRequiredFields.length === 0;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-white/90 backdrop-blur-2xl border-t border-gray-100/50 shadow-[0_-12px_40px_rgba(0,0,0,0.08)] pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3 px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          <Button
            size="lg"
            className={cn(
              "w-full h-14 rounded-2xl font-black uppercase tracking-[0.15em] text-[11px] transition-all relative overflow-hidden group shadow-2xl shadow-blue-500/10",
              isFinished
                ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20"
                : !hasStarted
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20"
                  : "bg-gray-900 border border-gray-800 text-white shadow-gray-900/20"
            )}
            onClick={handleClick}
            disabled={isSubmitting}
          >
            <AnimatePresence mode="wait">
              {isSubmitting ? (
                <motion.div
                  key="submitting"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2"
                >
                  <span className="animate-pulse">Processing...</span>
                </motion.div>
              ) : isFinished ? (
                <motion.div
                  key="finished"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-sm">Click to Sign</span>
                  <Check className="w-5 h-5 stroke-[3]" />
                </motion.div>
              ) : !hasStarted ? (
                <motion.div
                  key="start"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-sm">Ready to Sign</span>
                  <Check className="w-5 h-5 stroke-[3]" />
                </motion.div>
              ) : (
                <motion.div
                  key="next"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  className="flex items-center justify-between w-full px-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center size-6 rounded-full bg-white/20 text-[10px] font-black">
                      {incompleteRequiredFields.length}
                    </span>
                    <span className="text-xs font-bold opacity-80 uppercase tracking-widest">Fields Left</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm">Next Field</span>
                    <ChevronRight className="w-5 h-5 opacity-50 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Glossy overlay effect */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-white/20" />
            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-black/10" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
});

SigningBottomBar.displayName = "SigningBottomBar";
