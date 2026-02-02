import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { SignatureFieldData } from "./signature-field";

interface SignatureFieldSettingsProps {
  field: SignatureFieldData;
  onFieldUpdate: (updates: Partial<SignatureFieldData>) => void;
  signers: {
    email: string;
    name: string | undefined;
    documentId: Id<"documents">;
    documentTitle: string;
  }[]
}


export function SignatureFieldSettings({
  field,
  onFieldUpdate,
  signers = []
}: SignatureFieldSettingsProps) {
  // Local state for email input to prevent creating signers for every keystroke
  const [localEmail, setLocalEmail] = useState(field.signerEmail || "");

  useEffect(() => {
    setLocalEmail(field.signerEmail || "");
  }, [field.signerEmail]);

  // Get the index of the current signer in the signers array
  const currentSignerIndex = signers.findIndex(s => s.email === field.signerEmail);

  // Calculate the next signer in the sequence
  const getNextSigner = () => {
    if (signers.length <= 1) return null;
    const nextIndex = (currentSignerIndex + 1) % signers.length;
    return signers[nextIndex];
  };

  const handleCycleSigner = () => {
    const nextSigner = getNextSigner();
    if (nextSigner) {
      onFieldUpdate({
        signerEmail: nextSigner.email,
        signerName: nextSigner.name || nextSigner.email
      });
    }
  };

  return (
    <div className="space-y-6 px-1">
      <div className="space-y-3">
        <Label htmlFor="fieldType" className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">Field Type</Label>
        <Select
          value={field.fieldType}
          onValueChange={(value: any) => onFieldUpdate({ fieldType: value })}
        >
          <SelectTrigger className="w-full h-9 rounded-xl border-gray-200 bg-white hover:bg-gray-50 transition-colors text-xs font-medium">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-xl shadow-xl border-gray-100">
            <SelectItem value="signature" className="text-xs font-medium focus:bg-gray-50 cursor-pointer">Signature</SelectItem>
            <SelectItem value="initial" className="text-xs font-medium focus:bg-gray-50 cursor-pointer">Initial</SelectItem>
            <SelectItem value="date" className="text-xs font-medium focus:bg-gray-50 cursor-pointer">Date</SelectItem>
            <SelectItem value="text" className="text-xs font-medium focus:bg-gray-50 cursor-pointer">Text</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label htmlFor="label" className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">Label</Label>
        <Input
          id="label"
          placeholder="e.g. Sign here"
          value={field.label || ""}
          onChange={(e) => onFieldUpdate({ label: e.target.value })}
          className="h-9 rounded-xl border-gray-200 bg-white hover:border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-xs font-medium"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="signer" className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">Assigned To</Label>
          {signers.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-5 px-2 text-[10px] font-bold text-primary hover:bg-primary/5 hover:text-primary rounded-md uppercase tracking-wide"
              onClick={handleCycleSigner}
            >
              Cycle
            </Button>
          )}
        </div>

        <div className="space-y-3">
          <Input
            id="signer"
            type="email"
            placeholder="signer@example.com"
            value={localEmail}
            onChange={(e) => setLocalEmail(e.target.value)}
            onBlur={() => {
              if (localEmail !== field.signerEmail) {
                const signer = signers?.find(s => s.email === localEmail);
                onFieldUpdate({
                  signerEmail: localEmail,
                  signerName: signer?.name || ""
                });
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.currentTarget.blur();
              }
            }}
            className="h-9 rounded-xl border-gray-200 bg-white hover:border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-xs font-medium"
          />
          {localEmail && signers.length > 0 && !signers.find(s => s.email === localEmail) && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-50/50 border border-blue-100">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              <p className="text-[10px] text-blue-600 font-bold">New signer</p>
            </div>
          )}
        </div>

        {signers.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {signers.map((signer) => (
              <button
                key={signer.email}
                type="button"
                onClick={() => onFieldUpdate({
                  signerEmail: signer.email,
                  signerName: signer.name || ""
                })}
                className={cn(
                  "text-[10px] px-2.5 py-1 rounded-full border transition-all font-bold",
                  field.signerEmail === signer.email
                    ? "bg-primary text-primary-foreground border-primary shadow-sm scale-105"
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-900"
                )}
              >
                {signer.name || signer.email}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
        <Label htmlFor="required" className="text-xs font-bold text-gray-700 cursor-pointer">Required Field</Label>
        <Switch
          id="required"
          checked={field.isRequired}
          onCheckedChange={(checked) =>
            onFieldUpdate({ isRequired: checked as boolean })
          }
          className="data-[state=checked]:bg-primary"
        />
      </div>
    </div>
  );
}
