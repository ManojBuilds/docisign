import { Button } from "@/components/ui/button";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from "@/components/responsive-dialog";
import { Kbd } from "@/components/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Sparkles, Zap } from "lucide-react";
import { memo, useEffect, useState } from "react";

// Custom event for opening shortcuts dialog
export const SHOW_SHORTCUTS_EVENT = "show-keyboard-shortcuts";

const STORAGE_KEY = "docisign-editor-first-visit";

/**
 * Keyboard shortcuts helper component
 * Displays a compact welcome guide for first-time users
 */
export const KeyboardShortcutsHelper = memo(() => {
  const [isOpen, setIsOpen] = useState(false);

  // Listen for custom event to open dialog
  useEffect(() => {
    const handleShowShortcuts = () => {
      setIsOpen(true);
    };

    window.addEventListener(SHOW_SHORTCUTS_EVENT, handleShowShortcuts);
    return () => {
      window.removeEventListener(SHOW_SHORTCUTS_EVENT, handleShowShortcuts);
    };
  }, []);

  // Show dialog on first visit
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasVisited = localStorage.getItem(STORAGE_KEY);
    if (!hasVisited) {
      // Small delay for better UX
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem(STORAGE_KEY, "true");
      }, 500);

      return () => clearTimeout(timer);
    }
  }, []);

  const essentialShortcuts = [
    { key: "V", description: "Selection Tool", icon: "🖱️" },
    { key: "S", description: "Signature Field", icon: "✍️" },
    { key: "T", description: "Text Field", icon: "📝" },
    { key: "D", description: "Date Field", icon: "📅" },
    { key: "Esc", description: "Deselect / Reset", icon: "↩️" },
  ];

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(true)}
            className="h-8 w-8 p-0"
          >
            <Kbd>?</Kbd>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex items-center gap-2">
            Keyboard Shortcuts
            <Kbd>?</Kbd>
          </div>
        </TooltipContent>
      </Tooltip>

      <ResponsiveDialog open={isOpen} onOpenChange={setIsOpen}>
        <ResponsiveDialogContent className="max-w-md">
          <ResponsiveDialogHeader>
            <ResponsiveDialogTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="h-5 w-5 text-blue-500" />
              Welcome to the Editor!
            </ResponsiveDialogTitle>
            <ResponsiveDialogDescription className="text-left">
              Here's everything you need to get started
            </ResponsiveDialogDescription>
          </ResponsiveDialogHeader>

          <div className="space-y-5 py-4">
            {/* Quick Start Guide */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
              <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Zap className="h-4 w-4 text-blue-600" />
                Quick Start
              </h3>
              <ol className="space-y-2 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span className="font-semibold text-blue-600 min-w-[20px]">1.</span>
                  <span>Select a field type from the <strong>right sidebar</strong></span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-blue-600 min-w-[20px]">2.</span>
                  <span>Draw on the document to place the field</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-blue-600 min-w-[20px]">3.</span>
                  <span>Select the field and assign it to a signer by entering their email in the <strong>right sidebar</strong></span>
                </li>
              </ol>
            </div>

            {/* Essential Shortcuts */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">
                Essential Shortcuts
              </h3>
              <div className="grid gap-2">
                {essentialShortcuts.map((shortcut) => (
                  <div
                    key={shortcut.key}
                    className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{shortcut.icon}</span>
                      <span className="text-sm text-gray-700">
                        {shortcut.description}
                      </span>
                    </div>
                    <Kbd className="bg-white shadow-sm border-gray-200 text-gray-900 min-w-[32px] justify-center">
                      {shortcut.key}
                    </Kbd>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro Tip */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-xs text-amber-900">
                <strong className="font-semibold">💡 Pro Tip:</strong> Press{" "}
                <Kbd className="mx-1 bg-white">?</Kbd> anytime to view all shortcuts
              </p>
            </div>
          </div>

          <div className="pt-3 border-t">
            <p className="text-xs text-gray-500 text-center">
              This guide appears only once • Happy editing! 🎉
            </p>
          </div>
        </ResponsiveDialogContent>
      </ResponsiveDialog>
    </>
  );
});

KeyboardShortcutsHelper.displayName = "KeyboardShortcutsHelper";
