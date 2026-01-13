import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Keyboard className="h-5 w-5" />
              Keyboard Shortcuts
            </DialogTitle>
            <DialogDescription>
              Use these keyboard shortcuts to work faster
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {shortcuts.map((section) => (
              <div key={section.category}>
                <h3 className="text-sm font-semibold mb-3 text-gray-900">
                  {section.category}
                </h3>
                <div className="space-y-2">
                  {section.items.map((shortcut) => (
                    <div
                      key={shortcut.key}
                      className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-sm text-gray-600">
                        {shortcut.description}
                      </span>
                      <Kbd>{shortcut.key}</Kbd>
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
        </DialogContent>
      </Dialog>
    </>
  );
});

KeyboardShortcutsHelper.displayName = "KeyboardShortcutsHelper";
