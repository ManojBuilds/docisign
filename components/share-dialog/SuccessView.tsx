import { Button } from "@/components/ui/button";
import { DialogClose, DialogTitle } from "@/components/ui/dialog";
import { DrawerClose, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { CheckCircle2, Shield } from "lucide-react";
import { CommonViewProps } from "./types";

export const SuccessView = ({ isDesktop = true }: CommonViewProps) => {
  if (isDesktop) {
    return (
      <div className="flex flex-col h-full bg-white">
        <div className="bg-green-50/50 p-8 text-center border-b border-green-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-green-200/50 ring-offset-4 ring-offset-green-50">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <DialogTitle className="text-2xl font-bold text-green-900 mb-2 tracking-tight text-center">Your request is on its way!</DialogTitle>
          <p className="text-green-700 font-medium">Individual signing links have been emailed to all recipients.</p>
        </div>

        <div className="p-8 space-y-6">
          <div className="flex items-start gap-4 p-5 bg-white rounded-xl ring-1 ring-zinc-200 shadow-sm">
            <Shield className="w-6 h-6 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-bold text-zinc-900 text-base">What happens next?</h4>
              <p className="text-sm text-zinc-500 mt-2 leading-relaxed">
                Recipients can sign the document directly from their email inbox. You will get a notification the moment they open and sign the document.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-zinc-50 border-t border-zinc-100 flex justify-center">
          <DialogClose asChild>
            <Button className="w-full h-12 font-bold bg-zinc-900 text-white hover:bg-zinc-800 rounded-xl transition-all shadow-lg shadow-zinc-200">
              Got it
            </Button>
          </DialogClose>
        </div>
      </div>
    );
  }

  // Mobile
  return (
    <div className="flex flex-col h-full bg-white">
      <DrawerHeader className="text-center border-b border-zinc-100 pb-8 pt-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 ring-1 ring-green-200/50 ring-offset-4 ring-offset-green-50">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <DrawerTitle className="text-xl font-bold text-green-900">Request Sent!</DrawerTitle>
        <p className="text-sm text-green-700 font-medium mt-1 px-4">Signing links have been sent directly to their email inboxes.</p>
      </DrawerHeader>
      <div className="p-6 space-y-4">
        <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100 italic text-sm text-zinc-500 text-center">
          "Check your dashboard to track signature status in real-time."
        </div>
      </div>
      <DrawerFooter className="border-t border-zinc-100 p-6">
        <DrawerClose asChild>
          <Button className="w-full h-12 font-bold bg-zinc-900 text-white rounded-xl" variant="default">Done</Button>
        </DrawerClose>
      </DrawerFooter>
    </div>
  );
};
