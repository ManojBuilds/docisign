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
      <DrawerContent className="max-h-[85vh] rounded-t-[32px] border-t bg-white">
        <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-gray-200" />

        <DrawerHeader className="px-6 pt-6 pb-2">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-xl font-bold text-gray-900 capitalize">
              {field.fieldType} Settings
            </DrawerTitle>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs font-semibold text-red-500 hover:bg-red-50 hover:text-red-600 rounded-full px-3"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(field.id);
                onOpenChange(false);
              }}
            >
              Remove
            </Button>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-6 py-2">
          <div className="bg-gray-50/50 rounded-2xl border border-gray-100 p-4 mb-6">
            <SignatureFieldSettings field={field} onFieldUpdate={onFieldUpdate} signers={signers} />
          </div>
        </div>

        <DrawerFooter className="px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-2">
          <Button
            size="lg"
            className="w-full rounded-2xl h-12 text-sm font-bold shadow-lg shadow-primary/20 active:scale-[0.98] transition-all"
            onClick={(e) => {
              e.stopPropagation();
              onSave();
              onOpenChange(false);
            }}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Apply Changes"}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
