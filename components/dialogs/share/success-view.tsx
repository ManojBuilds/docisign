
import { Button } from "@/components/ui/button";
import { DialogClose, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle2, Shield } from "lucide-react";

export function SuccessView() {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="bg-green-50 p-8 text-center border-b border-green-100">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm ring-4 ring-green-50">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <DialogTitle className="text-2xl font-semibold text-green-900 mb-2 tracking-tight text-center">Sent Successfully!</DialogTitle>
        <p className="text-green-700 font-medium">Emails have been dispatched to all recipients.</p>
      </div>

      <div className="p-8 space-y-4">
        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-gray-900 text-sm">Secure Tracking Enabled</h4>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              You will be notified instantly when each recipient views and signs the document. A final copy will be sent to everyone automatically.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gray-50 border-t flex justify-center">
        <DialogClose asChild>
          <Button className="w-full font-semibold bg-white text-gray-900 border hover:bg-gray-50 shadow-sm">
            Close
          </Button>
        </DialogClose>
      </div>
    </div>
  );
}
