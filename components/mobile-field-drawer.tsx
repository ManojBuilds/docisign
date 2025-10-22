import { SignatureFieldData } from "./signature-field";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { SignatureFieldSettings } from "./signature-field-settings";

interface MobileFieldDrawerProps {
  field: SignatureFieldData;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onFieldUpdate: (updates: Partial<SignatureFieldData>) => void;
  onSave: () => void;
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
  isSaving: boolean;
}

export function MobileFieldDrawer({
  field,
  isOpen,
  onOpenChange,
  onFieldUpdate,
  onSave,
  onDelete,
  onSelect,
  isSaving,
}: MobileFieldDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="min-h-[70svh]">
        <DrawerHeader>
          <DrawerTitle>Field Settings</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 overflow-y-auto space-y-4">
          <SignatureFieldSettings field={field} onFieldUpdate={onFieldUpdate} />
        </div>
        <DrawerFooter>
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
          <Button
            variant="destructive"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(field.id);
            }}
          >
            Remove Field
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
