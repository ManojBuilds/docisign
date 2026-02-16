import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import { ResponsiveDialogClose, ResponsiveDialogDescription, ResponsiveDialogFooter, ResponsiveDialogHeader, ResponsiveDialogTitle } from "@/components/responsive-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { AlertCircle, Loader2, Mail, Send } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { AuditTrail } from "./AuditTrail";
import { RecipientsList } from "./RecipientsList";
import { CommonViewProps, Signer } from "./types";
import Link from "next/link";

interface ConfigurationViewProps extends CommonViewProps {
  hasUnassignedFields?: boolean;
  customMessage: string;
  setCustomMessage: Dispatch<SetStateAction<string>>;
  signatureFields?: Doc<"signatureFields">[];
  signers: Signer[];
  isSending: boolean;
  onSend: () => void;
  onBulkAddSigners?: (signers: Signer[]) => void;
  onRemoveSigner?: (email: string) => void;
  maxRecipients?: number;
  isProfessionalPlan?: boolean;
  documentId?: Id<"documents">;
  document?: any;
  usageStats?: any;
}

const SharedConfigContent = ({
  hasUnassignedFields,
  signers,
  signatureFields,
  customMessage,
  setCustomMessage,
  onRemoveSigner,
  maxRecipients,
  isProfessionalPlan,
  usageStats,
}: Pick<ConfigurationViewProps, "hasUnassignedFields" | "signers" | "signatureFields" | "customMessage" | "setCustomMessage" | "onRemoveSigner" | "isSending" | "maxRecipients" | "isProfessionalPlan" | "usageStats">) => {
  const isLimitReached = usageStats?.plan === "trial" && usageStats.signatureRequests.used >= usageStats.signatureRequests.limit;
  return (
    <div className="space-y-6 p-4 sm:p-6">
      {hasUnassignedFields && (
        <Alert variant="destructive" className="bg-red-50 border-0 ring-1 ring-red-100 dark:bg-red-900/10">
          <AlertCircle className="h-4 w-4 stroke-red-800" />
          <AlertTitle className="text-red-800 font-semibold">Unassigned Fields</AlertTitle>
          <AlertDescription className="text-red-700 text-xs mt-1">
            There are signature fields without assigned signers. Please verify before sending.
          </AlertDescription>
        </Alert>
      )}

      {isLimitReached && (
        <Alert className="bg-amber-50 border-amber-200 ring-1 ring-amber-200 relative">
          <AlertCircle className="h-4 w-4 stroke-amber-800" />
          <AlertTitle className="text-amber-800 font-semibold">Limit Reached</AlertTitle>
          <AlertDescription className="text-amber-700 text-xs mt-1">
            <p>
              You have reached your limit of {usageStats?.signatureRequests.limit} signature request on the Trial plan.
              Please{" "}
              <Link href="/pricing" className="font-semibold underline underline-offset-2 hover:text-amber-900">
                Upgrade
              </Link>{" "}
              to the Professional plan to send more documents.
            </p>
          </AlertDescription>
        </Alert>
      )}


      {/* Recipients Section */}
      <RecipientsList signers={signers} signatureFields={signatureFields} onRemoveSigner={onRemoveSigner} />

      {/* Plan Limit Notice */}
      {maxRecipients !== undefined && maxRecipients < 5 && (
        <Alert className="bg-blue-50 border-blue-200">
          <AlertCircle className="h-4 w-4 stroke-blue-800" />
          <AlertTitle className="text-blue-800 font-semibold">Plan Limit</AlertTitle>
          <AlertDescription className="text-blue-700 text-xs mt-1">
            {isProfessionalPlan ? (
              <p>You can send to up to {maxRecipients} recipients at once. Professional plan allows up to 5.</p>
            ) : (
              <p>
                Your plan allows sending to {maxRecipients} recipient{maxRecipients > 1 ? "s" : ""} at once.{" "}
                <Link href="/pricing" className="font-semibold underline underline-offset-2 hover:text-blue-900">
                  Upgrade to Professional
                </Link>{" "}
                for bulk sending to up to 5 recipients.
              </p>
            )}
          </AlertDescription>
        </Alert>
      )}

      {/* Message Section */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-zinc-700 uppercase tracking-wider flex items-center gap-2">
          <Mail className="w-4 h-4 text-zinc-400" />
          Message to Recipients
        </Label>
        <div className="relative">
          <Textarea
            className="min-h-[120px] resize-none"
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
  onRemoveSigner,
  usageStats,
}: ConfigurationViewProps) => {

  return (
    <div className="flex flex-col h-full">
      <ResponsiveDialogHeader className="p-6 border-b border-zinc-100 bg-zinc-50/50 sticky top-0 z-10 backdrop-blur-sm">
        <ResponsiveDialogTitle>
          Send for Signature
        </ResponsiveDialogTitle>
        <ResponsiveDialogDescription>
          Configure recipients and send securely.
        </ResponsiveDialogDescription>
      </ResponsiveDialogHeader>

      <SharedConfigContent
        hasUnassignedFields={hasUnassignedFields}
        signers={signers}
        signatureFields={signatureFields}
        customMessage={customMessage}
        setCustomMessage={setCustomMessage}
        onRemoveSigner={onRemoveSigner}
        isSending={isSending}
        usageStats={usageStats}
      />

      <ResponsiveDialogFooter className="p-6 border-t border-zinc-100 bg-zinc-50 flex gap-3 sticky bottom-0 z-10 flex flex-col-reverse md:flex-row">
        <ResponsiveDialogClose asChild>
          <Button variant="secondary" className="flex-1 font-semibold bg-white shadow-none ring-1 ring-zinc-900/10 border-0 hover:bg-zinc-50 text-zinc-700">
            Cancel
          </Button>
        </ResponsiveDialogClose>
        <Button
          onClick={usageStats?.plan === "trial" && usageStats.signatureRequests.used >= usageStats.signatureRequests.limit ? () => window.location.href = "/pricing" : onSend}
          disabled={isSending || signers.length === 0}
          className="flex-1 font-semibold shadow-none ring-1 ring-blue-600 transition-all hover:ring-blue-700 bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isSending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Sending Request...
            </>
          ) : (usageStats?.plan === "trial" && usageStats.signatureRequests.used >= usageStats.signatureRequests.limit) ? (
            <>
              Upgrade Plan
            </>
          ) : (
            <>
              Send Request
              <Send className="w-4 h-4 ml-2 opacity-90" />
            </>
          )}
        </Button>
      </ResponsiveDialogFooter>
    </div>
  );

};
