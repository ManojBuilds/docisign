import { Badge } from "@/components/ui/badge";
import { Doc } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { Clock, FileCheck, Mail, Shield } from "lucide-react";
import { useState } from "react";

interface AuditTrailProps {
  signatureFields: Doc<"signatureFields">[];
  variant?: "default" | "compact";
}

export const AuditTrail = ({ signatureFields, variant = "default" }: AuditTrailProps) => {
  const [expandedSigners, setExpandedSigners] = useState<Set<string>>(new Set());

  const auditItems = Array.from(
    signatureFields
      .filter((field): field is Doc<"signatureFields"> & { signerEmail: string } => !!(field.isCompleted && field.auditTrail && field.signerEmail))
      .reduce((acc, field) => {
        const existing = acc.get(field.signerEmail);
        if (!existing || (field.auditTrail?.signedAt || 0) > (existing.auditTrail?.signedAt || 0)) {
          acc.set(field.signerEmail, field);
        }
        return acc;
      }, new Map<string, Doc<"signatureFields"> & { signerEmail: string }>())
      .values()
  );

  if (auditItems.length === 0) return null;

  if (variant === "compact") {
    // Config View style (simplified)
    return (
      <div className="pt-4 border-t border-dashed border-zinc-200">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-4 h-4 text-blue-600" />
          <h3 className="font-semibold text-zinc-900 text-[10px] uppercase tracking-wider">Previous Audit Trail</h3>
        </div>
        <div className="space-y-2">
          {auditItems.map((field, index) => {
            const isExpanded = expandedSigners.has(field.signerEmail);
            return (
              <div key={field._id} className="bg-zinc-50 ring-1 ring-zinc-900/5 ring-offset-1 ring-offset-zinc-100 rounded-lg overflow-hidden transition-all">
                <button
                  onClick={() => {
                    const next = new Set(expandedSigners);
                    if (next.has(field.signerEmail)) next.delete(field.signerEmail);
                    else next.add(field.signerEmail);
                    setExpandedSigners(next);
                  }}
                  className="w-full text-left p-3 flex justify-between items-center hover:bg-white/50 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-xs text-zinc-900 truncate">{field.signerName || `Signer ${index + 1}`}</p>
                    <p className="text-[9px] text-zinc-500 truncate">{field.signerEmail}</p>
                  </div>
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-100 border-0 text-[9px]">Signed</Badge>
                </button>
                {isExpanded && field.auditTrail && (
                  <div className="px-3 pb-3 pt-1 animate-in slide-in-from-top-1 duration-200">
                    <div className="grid grid-cols-2 gap-2 text-[10px] text-zinc-600 bg-white/50 rounded p-2">
                      <div>
                        <span className="text-zinc-400 block text-[8px] uppercase tracking-wider">Date</span>
                        <span className="font-semibold text-zinc-900">{new Date(field.auditTrail.signedAt).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="text-zinc-400 block text-[8px] uppercase tracking-wider">IP</span>
                        <span className="font-mono text-zinc-900">{field.auditTrail.ip}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Default / Status View Style
  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold text-zinc-700 uppercase tracking-wider flex items-center gap-2">
        <FileCheck className="w-4 h-4 text-zinc-400" />
        <h3>Audit Trail</h3>
      </div>

      <div className="relative space-y-3">
        {auditItems.map((field, index) => {
          const isExpanded = expandedSigners.has(field.signerEmail);
          return (
            <div key={field.signerEmail} className="relative group/audit hover:bg-zinc-50">
              <div className={cn(
                "hidden md:block absolute -left-[21px] top-6 w-3 h-3 rounded-full ring-4 ring-zinc-900/5 transition-colors duration-300",
                isExpanded ? "bg-blue-500" : "bg-zinc-300"
              )} />

              <div
                className={cn(
                  "bg-white rounded-md overflow-hidden transition-all duration-300 cursor-pointer ring-offset-2",
                  "border hover:bg-zinc-50/50"
                )}
                onClick={() => {
                  const next = new Set(expandedSigners);
                  if (next.has(field.signerEmail)) next.delete(field.signerEmail);
                  else next.add(field.signerEmail);
                  setExpandedSigners(next);
                }}
              >
                <div className="p-4 flex justify-between items-center group-hover:bg-zinc-50/30 transition-colors">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-zinc-900 text-sm truncate capitalize">
                      {field.signerName && field.signerName !== field.signerEmail
                        ? field.signerName
                        : field.signerEmail.split('@')[0]}
                    </h4>
                    <p className="text-[10px] text-zinc-500 font-medium truncate flex items-center gap-1.5 mt-0.5">
                      <Mail className="w-2.5 h-2.5 opacity-60" />
                      {field.signerEmail}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-100 border-0 text-[10px]">
                      Verified
                    </Badge>
                    <Clock className={cn("w-4 h-4 text-zinc-300 transition-transform duration-300", isExpanded ? "rotate-180 text-blue-500" : "")} />
                  </div>
                </div>

                {isExpanded && field.auditTrail && (
                  <div className="p-4 animate-in slide-in-from-top-2 duration-300">
                    <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs text-zinc-600 bg-zinc-50/50 rounded-lg p-3 ring-1 ring-zinc-100/50">
                      <div>
                        <span className="text-zinc-400 block text-[10px] uppercase tracking-wider mb-1">Time Signed</span>
                        <span className="font-semibold text-zinc-900">{new Date(field.auditTrail.signedAt).toLocaleTimeString()}</span>
                      </div>
                      <div>
                        <span className="text-zinc-400 block text-[10px] uppercase tracking-wider mb-1">Date Signed</span>
                        <span className="font-semibold text-zinc-900">{new Date(field.auditTrail.signedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-zinc-400 block text-[10px] uppercase tracking-wider mb-1">Security Footprint</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-[10px] ring-1 ring-inset ring-blue-100/50">IP: {field.auditTrail.ip}</span>
                          <span className="text-[10px] text-zinc-400">Browser Verified</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
