import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Doc } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, FileCheck, Mail, UserPlus } from "lucide-react";
import { Signer } from "./types";
import { getSignerStatus } from "./utils";

interface RecipientsListProps {
  signers: Signer[];
  signatureFields?: Doc<"signatureFields">[];
  readonly?: boolean;
}

export const RecipientsList = ({ signers, signatureFields, readonly = false }: RecipientsListProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-semibold text-zinc-700 uppercase tracking-wider flex items-center gap-2">
          <UserPlus className="w-4 h-4 text-zinc-400" />
          Recipients
        </Label>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          {signers.length} {signers.length === 1 ? 'Recipient' : 'Recipients'}
        </Badge>
      </div>

      <ScrollArea className="bg-white rounded-xl ring-1 ring-zinc-900/5 ring-offset-2 ring-offset-zinc-50 divide-y divide-zinc-100 max-h-[200px]">
        {signers.length > 0 ? (
          signers.map((signer, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 hover:bg-zinc-50 transition-colors"
            >
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold bg-gradient-to-br shadow-inner ring-2 ring-white",
                (index % 5 === 0) ? 'from-blue-500 to-indigo-600' :
                  (index % 5 === 1) ? 'from-violet-500 to-purple-600' :
                    (index % 5 === 2) ? 'from-fuchsia-500 to-pink-600' :
                      (index % 5 === 3) ? 'from-rose-500 to-red-600' :
                        'from-orange-500 to-amber-600'
              )}>
                {(signer.name?.charAt(0) || signer.email.charAt(0)).toUpperCase()}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-sm text-zinc-900 truncate">
                    {signer.name && signer.name !== signer.email
                      ? signer.name
                      : `Signer ${index + 1}`}
                  </p>
                </div>
                <p className="text-xs text-zinc-500 truncate flex items-center gap-1.5 mt-0.5">
                  <Mail className="w-3 h-3 text-zinc-400" />
                  {signer.email}
                </p>
              </div>

              <div className="text-right">
                {(() => {
                  const status = getSignerStatus(signer.email, signatureFields);
                  if (status === "signed") {
                    return (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Signed
                      </span>
                    );
                  }
                  if (status === "partially_signed") {
                    return (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200">
                        <FileCheck className="w-3 h-3 mr-1" />
                        Partial
                      </span>
                    );
                  }
                  if (status === "sent") {
                    return (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-200">
                        <Clock className="w-3 h-3 mr-1" />
                        Waiting
                      </span>
                    );
                  }
                  return (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-200">
                      <Clock className="w-3 h-3 mr-1" />
                      Pending
                    </span>
                  );
                })()}
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center bg-zinc-50/50">
            <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <UserPlus className="w-6 h-6 text-zinc-400" />
            </div>
            <p className="text-sm font-medium text-zinc-900">No recipients added</p>
            {!readonly && <p className="text-xs text-zinc-500 mt-1">Add signers from the sidebar to continue.</p>}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
