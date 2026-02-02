"use client";

import { SignatureFieldData } from "@/components/signature-field";
import {
  Drawer,
  DrawerContent
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { ALargeSmall, CalendarDays, PenTool, TextCursor } from "lucide-react";
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

    const fieldTypes = [
      { id: 'signature', label: 'Signature', icon: PenTool, color: 'text-blue-600', bg: 'bg-blue-50' },
      { id: 'initial', label: 'Initial', icon: TextCursor, color: 'text-emerald-600', bg: 'bg-emerald-50' },
      { id: 'date', label: 'Date', icon: CalendarDays, color: 'text-amber-600', bg: 'bg-amber-50' },
      { id: 'text', label: 'Text Field', icon: ALargeSmall, color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[40vh] rounded-t-[32px] border-t bg-white pb-6 shadow-2xl">
          <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-gray-200" />

          <div className="grid grid-cols-2 gap-4 p-6 pt-8">
            {fieldTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handleSelect(type.id as SignatureFieldData["fieldType"])}
                className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 transition-all duration-200 hover:border-gray-200 active:scale-95 active:bg-gray-50 shadow-sm"
              >
                <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl transition-colors", type.bg, type.color)}>
                  <type.icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-semibold text-gray-700">{type.label}</span>
              </button>
            ))}
          </div>

          <div className="px-6 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <p className="text-center text-[10px] uppercase tracking-widest text-gray-400 font-bold">
              Select field to place on document
            </p>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }
);

MobileAddFieldSheet.displayName = "MobileAddFieldSheet";
