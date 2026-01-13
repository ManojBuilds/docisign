
import { Badge } from "@/components/ui/badge";
import { Doc } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { Clock, Shield } from "lucide-react";

interface AuditTrailProps {
  signatureFields: Doc<"signatureFields">[];
  expandedSigners: Set<string>;
  setExpandedSigners: (signers: Set<string>) => void;
  title?: string;
}

export function AuditTrail({ signatureFields, expandedSigners, setExpandedSigners, title = "Previous Audit Trail" }: AuditTrailProps) {
  const completedFields = signatureFields.filter(field => field.isCompleted && field.auditTrail);

  if (completedFields.length === 0) return null;

  return (
    <div className="pt-4 border-t border-dashed">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-4 h-4 text-blue-600" />
        <h3 className="font-bold text-gray-900 text-[10px] uppercase tracking-wider">{title}</h3>
      </div>
      <div className="space-y-2">
        {Array.from(
          completedFields
            .reduce((acc, field) => {
              const existing = acc.get(field.signerEmail);
              if (!existing || (field.auditTrail?.signedAt || 0) > (existing.auditTrail?.signedAt || 0)) {
                acc.set(field.signerEmail, field);
              }
              return acc;
            }, new Map<string, Doc<"signatureFields">>())
            .values()
        ).map((field, index) => {
          const isExpanded = expandedSigners.has(field.signerEmail);
          return (
            <div key={field._id} className="bg-gray-50 border border-gray-100 rounded-lg overflow-hidden transition-all">
              <button
                onClick={() => {
                  const next = new Set(expandedSigners);
                  if (next.has(field.signerEmail)) next.delete(field.signerEmail);
                  else next.add(field.signerEmail);
                  setExpandedSigners(next);
                }}
                className="w-full text-left p-3 flex justify-between items-center hover:bg-white/50 transition-colors"
                type="button"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-xs text-gray-900 truncate">{field.signerName || `Signer ${index + 1}`}</p>
                  <p className="text-[9px] text-gray-500 truncate">{field.signerEmail}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100 text-[9px]">Signed</Badge>
                  <Clock className={cn("w-3 h-3 text-gray-400 transition-transform", isExpanded ? "rotate-180" : "")} />
                </div>
              </button>
              {isExpanded && field.auditTrail && (
                <div className="px-3 pb-3 pt-1 animate-in slide-in-from-top-1 duration-200">
                  <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-600 bg-white/50 rounded p-2">
                    <div>
                      <span className="text-gray-400 block text-[8px] uppercase tracking-wider">Date</span>
                      <span className="font-bold text-gray-900">{new Date(field.auditTrail.signedAt).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[8px] uppercase tracking-wider">IP</span>
                      <span className="font-mono text-gray-900">{field.auditTrail.ip}</span>
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
