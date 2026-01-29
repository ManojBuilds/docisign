import { SignatureFieldData } from "./signature-field";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SignatureFieldSettings } from "./signature-field-settings";
import { Id } from "@/convex/_generated/dataModel";


interface MobileFieldDrawerProps {
  field: SignatureFieldData;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onFieldUpdate: (updates: Partial<SignatureFieldData>) => void;
  onSave: () => void;
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
  isSaving: boolean;
  signers: {
    email: string;
    name: string | undefined;
    documentId: Id<"documents">;
    documentTitle: string;
  }[];
}

export function MobileFieldDrawer({
  field,
  isOpen,
  onOpenChange,
  onFieldUpdate,
  onSave,
  onDelete,
  isSaving,
  signers = [],
}: MobileFieldDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="min-h-[70svh]">
        <DrawerHeader>
          <DrawerTitle>Field Settings</DrawerTitle>
        </DrawerHeader>
        <ScrollArea className="p-4 space-y-4">
          <SignatureFieldSettings field={field} onFieldUpdate={onFieldUpdate} signers={signers} />
        </ScrollArea>
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
