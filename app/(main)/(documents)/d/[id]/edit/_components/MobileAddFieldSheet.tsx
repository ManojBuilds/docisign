"use client";

import { SignatureFieldData } from "@/components/signature-field";
import { FIELDS } from "@/components/fields/field-types";
import {
  ResponsiveDialog,
  ResponsiveDialogContent
} from "@/components/responsive-dialog";
import { cn } from "@/lib/utils";
import { memo } from "react";

interface MobileAddFieldSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectType: (type: SignatureFieldData["fieldType"]) => void;
}

/**
 * Adobe Sign–style bottom sheet: drag handle + large touch targets for field type.
 * Tap a type to add; sheet closes and user places field on the document.
 */
export const MobileAddFieldSheet = memo(
  ({ open, onOpenChange, onSelectType }: MobileAddFieldSheetProps) => {
    const handleSelect = (type: SignatureFieldData["fieldType"]) => {
      onSelectType(type);
      onOpenChange(false);
    };

    return (
      <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
        <ResponsiveDialogContent className="max-h-[85vh] rounded-t-[32px] border-t bg-white pb-6 shadow-2xl overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-2 gap-4 p-6 pt-8">
              {FIELDS.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleSelect(type.id)}
                  className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 transition-all duration-200 hover:border-gray-200 active:scale-95 active:bg-gray-50 shadow-sm"
                >
                  <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl transition-colors", type.bgColor, type.color)}>
                    <type.icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="px-6 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 border-t border-gray-100 bg-gray-50/50">
            <p className="text-center text-[10px] uppercase tracking-widest text-gray-400 font-bold">
              Select field to place on document
            </p>
          </div>
        </ResponsiveDialogContent>
      </ResponsiveDialog>
    );
  }
);

MobileAddFieldSheet.displayName = "MobileAddFieldSheet";
