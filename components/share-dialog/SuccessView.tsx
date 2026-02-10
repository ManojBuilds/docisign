import { Button } from "@/components/ui/button";
import {
  ResponsiveDialogClose,
  ResponsiveDialogTitle,
  ResponsiveDialogHeader,
  ResponsiveDialogFooter
} from "@/components/responsive-dialog";
import { CheckCircle2, Shield } from "lucide-react";
import { CommonViewProps } from "./types";

export const SuccessView = ({}: CommonViewProps) => {
  return (
    <div className="flex flex-col h-full bg-white">
      <ResponsiveDialogHeader className="p-6 border-b border-green-100 bg-green-50/50 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 ring-1 ring-green-200/50 ring-offset-4 ring-offset-green-50">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <ResponsiveDialogTitle className="text-xl font-bold text-green-900 mb-2 tracking-tight text-center">
          Your request is on its way!
        </ResponsiveDialogTitle>
        <p className="text-green-700 font-medium">
          Individual signing links have been emailed to all recipients.
        </p>
      </ResponsiveDialogHeader>

      <div className="p-6 space-y-4 flex-1">
        <div className="flex items-start gap-4 p-5 bg-white rounded-xl ring-1 ring-zinc-200 shadow-sm">
          <Shield className="w-6 h-6 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-bold text-zinc-900 text-base">What happens next?</h4>
            <p className="text-sm text-zinc-500 mt-2 leading-relaxed">
              Recipients can sign the document directly from their email inbox. You will get a notification the moment they open and sign the document.
            </p>
          </div>
        </div>
        
        <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100 italic text-sm text-zinc-500 text-center">
          "Check your dashboard to track signature status in real-time."
        </div>
      </div>

      <ResponsiveDialogFooter className="p-6 border-t border-zinc-100 bg-zinc-50">
        <ResponsiveDialogClose asChild>
          <Button className="w-full h-12 font-bold bg-zinc-900 text-white hover:bg-zinc-800 rounded-xl transition-all shadow-lg shadow-zinc-200">
            Got it
          </Button>
        </ResponsiveDialogClose>
      </ResponsiveDialogFooter>
    </div>
  );
};
