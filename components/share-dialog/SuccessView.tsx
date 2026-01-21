import { Button } from "@/components/ui/button";
import { DialogClose, DialogTitle } from "@/components/ui/dialog";
import { DrawerClose, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { CheckCircle2, Shield } from "lucide-react";
import { CommonViewProps } from "./types";

export const SuccessView = ({ isDesktop = true }: CommonViewProps) => {
  if (isDesktop) {
    return (
      <div className="flex flex-col h-full bg-white">
        <div className="bg-green-50 p-8 text-center border-b border-green-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-green-200/50 ring-offset-4 ring-offset-green-50">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <DialogTitle className="text-2xl font-semibold text-green-900 mb-2 tracking-tight text-center">Sent Successfully!</DialogTitle>
          <p className="text-green-700 font-medium">Emails have been dispatched to all recipients.</p>
        </div>

        <div className="p-8 space-y-4">
          <div className="flex items-start gap-4 p-4 bg-zinc-50 rounded-xl ring-1 ring-zinc-900/5 ring-offset-2">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-zinc-900 text-sm">Secure Tracking Enabled</h4>
              <p className="text-sm text-zinc-500 mt-1 leading-relaxed">
                You will be notified instantly when each recipient views and signs the document. A final copy will be sent to everyone automatically.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-zinc-50 border-t border-zinc-100 flex justify-center">
          <DialogClose asChild>
            <Button className="w-full font-semibold bg-white text-zinc-900 ring-1 ring-zinc-900/10 hover:bg-zinc-50 shadow-none">
              Close
            </Button>
          </DialogClose>
        </div>
      </div>
    );
  }

  // Mobile
  return (
    <div className="flex flex-col h-full">
      <DrawerHeader className="text-center border-b border-zinc-100 pb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 ring-1 ring-green-200/50 ring-offset-4 ring-offset-green-50">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <DrawerTitle className="text-xl font-semibold text-green-900">Sent Successfully!</DrawerTitle>
      </DrawerHeader>
      <div className="p-6 space-y-4">
        <p className="text-center text-zinc-600">Emails have been dispatched securely.</p>
      </div>
      <DrawerFooter className="border-t border-zinc-100">
        <DrawerClose asChild>
          <Button className="w-full" variant="outline">Done</Button>
        </DrawerClose>
      </DrawerFooter>
    </div>
  );
};
