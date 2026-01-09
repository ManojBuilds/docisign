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

  return (
    <div className="space-y-4 px-1">
      <div className="space-y-2">
        <Label htmlFor="fieldType">Field Type</Label>
        <Select
          value={field.fieldType}
          onValueChange={(value: any) => onFieldUpdate({ fieldType: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="signature">Signature</SelectItem>
            <SelectItem value="initial">Initial</SelectItem>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="text">Text</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="label">Field Label</Label>
        <Input
          id="label"
          placeholder="e.g. Sign here"
          value={field.label || ""}
          onChange={(e) => onFieldUpdate({ label: e.target.value })}
          className="h-8 text-xs"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="signer">Assigned to (Email)</Label>
        <div className="space-y-2">
          <Input
            id="signer"
            type="email"
            placeholder="signer@example.com"
            value={field.signerEmail || ""}
            onChange={(e) => {
              const email = e.target.value;
              const signer = signers?.find(s => s.email === email);
              onFieldUpdate({
                signerEmail: email,
                signerName: signer?.name || ""
              });
            }}
            className="h-8 text-xs"
          />
          {signers.length > 0 && !signers.find(s => s.email === field.signerEmail) && field.signerEmail && (
            <p className="text-[10px] text-blue-600 font-medium">New signer will be added automatically</p>
          )}
        </div>

        {signers.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {signers.map((signer) => (
              <button
                key={signer.email}
                type="button"
                onClick={() => onFieldUpdate({
                  signerEmail: signer.email,
                  signerName: signer.name || ""
                })}
                className={cn(
                  "text-[10px] px-2 py-1 rounded-full border transition-colors",
                  field.signerEmail === signer.email
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300"
                )}
              >
                {signer.name || signer.email}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2 pt-2">
        <Switch
          id="required"
          checked={field.isRequired}
          onCheckedChange={(checked) =>
            onFieldUpdate({ isRequired: checked as boolean })
          }
        />
        <Label htmlFor="required" className="text-xs">Required Field</Label>
      </div>
    </div>
  );
}
