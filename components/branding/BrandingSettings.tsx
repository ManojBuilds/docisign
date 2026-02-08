"use client";

import {
  ResponsiveDialog as Dialog,
  ResponsiveDialogContent as DialogContent,
  ResponsiveDialogDescription as DialogDescription,
  ResponsiveDialogHeader as DialogHeader,
  ResponsiveDialogTitle as DialogTitle,
  ResponsiveDialogTrigger as DialogTrigger,
} from "@/components/responsive-dialog";
import { BrandingForm } from "./BrandingForm";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function BrandingSettings({
  triggerClassName,
  isOpen: controlledIsOpen,
  onOpenChange: controlledOnOpenChange,
  showTrigger = true
}: {
  triggerClassName?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  showTrigger?: boolean;
}) {
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : uncontrolledIsOpen;
  const setIsOpen = controlledOnOpenChange || setUncontrolledIsOpen;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {showTrigger && (
        <DialogTrigger asChild>
          <Button variant="secondary" className={cn("h-10 border-muted/50 gap-2", triggerClassName)}>
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Branding</span>
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden flex flex-col max-h-[90vh]">
        <DialogHeader className="p-6 pb-2 text-left shrink-0">
          <DialogTitle>Personal Branding</DialogTitle>
          <DialogDescription>
            Customize how your clients see your documents. This appearance will
            be used on the signing page and in emails.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 px-6 py-4">
          <BrandingForm />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
