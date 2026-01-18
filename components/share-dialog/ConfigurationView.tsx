import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DrawerClose, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Doc } from "@/convex/_generated/dataModel";
import { AlertCircle, Loader2, Mail, Send, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { AuditTrail } from "./AuditTrail";
import { RecipientsList } from "./RecipientsList";
import { CommonViewProps, Signer } from "./types";

interface ConfigurationViewProps extends CommonViewProps {
  hasUnassignedFields?: boolean;
  customMessage: string;
  setCustomMessage: Dispatch<SetStateAction<string>>;
  signatureFields?: Doc<"signatureFields">[];
  signers: Signer[];
  isSending: boolean;
  onSend: () => void;
}

const SharedConfigContent = ({
  hasUnassignedFields,
  signers,
  signatureFields,
  customMessage,
  setCustomMessage
}: Pick<ConfigurationViewProps, "hasUnassignedFields" | "signers" | "signatureFields" | "customMessage" | "setCustomMessage">) => {
  return (
    <div className="space-y-6">
      {hasUnassignedFields && (
        <Alert variant="destructive" className="bg-red-50 border-0 ring-1 ring-red-100 dark:bg-red-900/10">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-800 font-semibold">Unassigned Fields</AlertTitle>
          <AlertDescription className="text-red-700 text-xs mt-1">
            There are signature fields without assigned signers. Please verify before sending.
          </AlertDescription>
        </Alert>
      )}

      {/* Recipients Section */}
      <RecipientsList signers={signers} signatureFields={signatureFields} />

      {/* Message Section */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-zinc-700 uppercase tracking-wider flex items-center gap-2">
          <Mail className="w-4 h-4 text-zinc-400" />
          Message to Recipients
        </Label>
        <div className="relative">
          <Textarea
            className="min-h-[120px] p-4 bg-zinc-50 border-0 ring-1 ring-zinc-900/5 ring-offset-2 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm resize-none rounded-xl"
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            placeholder="Enter a custom message (optional)..."
            maxLength={500}
          />
          <div className="absolute bottom-3 right-3 text-[10px] text-zinc-400 font-medium bg-white/80 px-2 py-1 rounded ring-1 ring-zinc-100 shadow-sm">
            {customMessage.length}/500
          </div>
        </div>
      </div>

      {/* Audit Trail in Config */}
      {signatureFields?.some(f => f.isCompleted) && (
        <AuditTrail signatureFields={signatureFields} variant="compact" />
      )}
    </div>
  );
};

export const ConfigurationView = ({
  isDesktop = true,
  hasUnassignedFields,
  customMessage,
  setCustomMessage,
  signatureFields,
  signers,
  isSending,
  onSend,
}: ConfigurationViewProps) => {

  if (isDesktop) {
    return (
      <div className="flex flex-col h-full">
        <DialogHeader className="p-6 border-b border-zinc-100 bg-zinc-50/50 sticky top-0 z-10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-zinc-900 tracking-tight flex items-center gap-2">
              <Send className="w-5 h-5 text-blue-600" />
              Send for Signature
            </DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-zinc-200/50">
                <X className="w-4 h-4" />
              </Button>
            </DialogClose>
          </div>
          <p className="text-sm text-zinc-500 font-medium">Configure recipients and send securely.</p>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-8">
          <SharedConfigContent
            hasUnassignedFields={hasUnassignedFields}
            signers={signers}
            signatureFields={signatureFields}
            customMessage={customMessage}
            setCustomMessage={setCustomMessage}
          />
        </div>

        <DialogFooter className="p-6 border-t border-zinc-100 bg-zinc-50 flex gap-3 sticky bottom-0 z-10">
          <DialogClose asChild>
            <Button variant="outline" className="flex-1 font-semibold bg-white shadow-none ring-1 ring-zinc-900/10 border-0 hover:bg-zinc-50 text-zinc-700">
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={onSend}
            disabled={isSending || signers.length === 0}
            className="flex-1 font-semibold shadow-none ring-1 ring-blue-600 transition-all hover:ring-blue-700 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isSending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Sending Request...
              </>
            ) : (
              <>
                Send Request
                <Send className="w-4 h-4 ml-2 opacity-90" />
              </>
            )}
          </Button>
        </DialogFooter>
      </div>
    );
  }

  // Mobile
  return (
    <div className="flex flex-col h-full">
      <DrawerHeader className="border-b border-zinc-100">
        <DrawerTitle>Send for Signature</DrawerTitle>
      </DrawerHeader>
      <div className="p-4 overflow-y-auto">
        <SharedConfigContent
          hasUnassignedFields={hasUnassignedFields}
          signers={signers}
          signatureFields={signatureFields}
          customMessage={customMessage}
          setCustomMessage={setCustomMessage}
        />
      </div>
      <DrawerFooter className="border-t border-zinc-100">
        <Button
          onClick={onSend}
          disabled={isSending || signers.length === 0}
          className="w-full"
        >
          {isSending ? "Sending..." : "Send Request"}
        </Button>
        <DrawerClose asChild>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </div>
  );
};
