import { SignatureFieldData } from "./signature-field";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Settings } from "lucide-react";
import { SignatureFieldSettings } from "./signature-field-settings";

interface DesktopFieldPopoverProps {
  field: SignatureFieldData;
  onFieldUpdate: (updates: Partial<SignatureFieldData>) => void;
  onSave: () => void;
  isSaving: boolean;
}

export function DesktopFieldPopover({
  field,
  onFieldUpdate,
  onSave,
  isSaving,
}: DesktopFieldPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          size="sm" 
          variant="outline" 
          className="h-6 px-2"
        >
          <Settings className="w-3 h-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 popover-content" 
        side="top"
        onClick={(e) => e.stopPropagation()}
      >
        <div 
          className="space-y-4"
          onClick={(e) => e.stopPropagation()}
        >
          <SignatureFieldSettings field={field} onFieldUpdate={onFieldUpdate} />
          <Button
            size="sm"
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              onSave();
            }}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
