import { SignatureFieldData } from "@/components/signature-field";
import { useEffect } from "react";
import { SHOW_SHORTCUTS_EVENT } from "../_components/KeyboardShortcutsHelper";

/**
 * Hook to handle keyboard shortcuts for tool selection
 */
export function useKeyboardShortcuts(
  setSelectedTool: (tool: SignatureFieldData["fieldType"] | "selection") => void,
  setSelectedFieldId: (id: string) => void
) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Handle "?" key for shortcuts help (Shift + /)
      if (e.key === "?") {
        e.preventDefault();
        window.dispatchEvent(new Event(SHOW_SHORTCUTS_EVENT));
        return;
      }

      switch (e.key.toLowerCase()) {
        case "v":
          e.preventDefault();
          setSelectedTool("selection");
          break;
        case "s":
          e.preventDefault();
          setSelectedTool("signature");
          break;
        case "i":
          e.preventDefault();
          setSelectedTool("initial");
          break;
        case "d":
          e.preventDefault();
          setSelectedTool("date");
          break;
        case "t":
          e.preventDefault();
          setSelectedTool("text");
          break;
        case "e":
          e.preventDefault();
          setSelectedTool("email");
          break;
        case "r":
          e.preventDefault();
          setSelectedTool("dropdown");
          break;
        case "o":
          e.preventDefault();
          setSelectedTool("radio");
          break;
        case "escape":
          setSelectedTool("selection");
          setSelectedFieldId("");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setSelectedTool, setSelectedFieldId]);
}
