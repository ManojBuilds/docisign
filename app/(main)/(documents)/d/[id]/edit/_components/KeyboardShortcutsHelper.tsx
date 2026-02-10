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
import { Keyboard } from "lucide-react";
import { memo, useEffect, useState } from "react";

// Custom event for opening shortcuts dialog
export const SHOW_SHORTCUTS_EVENT = "show-keyboard-shortcuts";

/**
 * Keyboard shortcuts helper component
 * Displays available keyboard shortcuts for the document editor
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

  const shortcuts = [
    {
      category: "Tools",
      items: [
        { key: "V", description: "Selection Tool" },
        { key: "S", description: "Signature Field" },
        { key: "I", description: "Initial Field" },
        { key: "D", description: "Date Field" },
        { key: "T", description: "Text Field" },
      ],
    },
    {
      category: "Actions",
      items: [
        { key: "Esc", description: "Deselect Field / Reset Tool" },
        { key: "?", description: "Show Keyboard Shortcuts" },
      ],
    },
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
            <Keyboard className="h-4 w-4" />
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
            <ResponsiveDialogTitle className="flex items-center gap-2">
              <Keyboard className="h-5 w-5" />
              Keyboard Shortcuts
            </ResponsiveDialogTitle>
            <ResponsiveDialogDescription>
              Use these keyboard shortcuts to work faster
            </ResponsiveDialogDescription>
          </ResponsiveDialogHeader>

          <div className="space-y-6 py-2">
            {shortcuts.map((section) => (
              <div key={section.category}>
                <h3 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">
                  {section.category}
                </h3>
                <div className="space-y-2">
                  {section.items.map((shortcut) => (
                    <div
                      key={shortcut.key}
                      className="flex items-center justify-between py-2 px-3 rounded-xl bg-gray-50/50 border border-transparent hover:border-gray-200 hover:bg-gray-100/50 transition-all select-none"
                    >
                      <span className="text-xs font-medium text-gray-700">
                        {shortcut.description}
                      </span>
                      <Kbd className="bg-white shadow-[0_2px_0_rgba(0,0,0,0.05)] border-gray-200 text-gray-900 min-w-[24px] justify-center">{shortcut.key}</Kbd>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t">
            <p className="text-xs text-gray-500 text-center">
              Press <Kbd>?</Kbd> anytime to view shortcuts
            </p>
          </div>
        </ResponsiveDialogContent>
      </ResponsiveDialog>
    </>
  );
});

KeyboardShortcutsHelper.displayName = "KeyboardShortcutsHelper";
