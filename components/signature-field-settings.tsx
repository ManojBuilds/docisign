import { Button, buttonVariants } from "@/components/ui/button";
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
import { FIELDS } from "@/components/fields/field-types";
import { Plus, X } from "lucide-react";

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
          onValueChange={(value: any) => {
            const updates: Partial<SignatureFieldData> = { fieldType: value };
            // Initialize default options if switching to dropdown/radio and none exist
            if ((value === 'dropdown' || value === 'radio') && (!field.options || field.options.length === 0)) {
              updates.options = ["Option 1", "Option 2"];
            }
            // Initialize group name for radio if missing
            if (value === 'radio' && !field.groupName) {
              updates.groupName = `group-${field.id.slice(0, 8)}`;
            }
            onFieldUpdate(updates);
          }}
        >
          <SelectTrigger className="w-full h-9 rounded-lg border-gray-200 bg-white hover:bg-gray-50 transition-colors text-xs font-medium">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-lg shadow-xl border-gray-100">
            {FIELDS.map((f) => (
              <SelectItem key={f.id} value={f.id} className="text-xs font-medium focus:bg-gray-50 cursor-pointer">
                {f.label}
              </SelectItem>
            ))}
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
          className="h-9 rounded-lg border-gray-200 bg-white hover:border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-xs font-medium"
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
            className="h-9 rounded-lg border-gray-200 bg-white hover:border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-xs font-medium"
          />
          {localEmail && signers.length > 0 && !signers.find(s => s.email === localEmail) && (
            <div className="text-xs text-gray-400 hidden md:flex items-center gap-1 mt-1">
              <span className="text-xs text-gray-400">press</span>
              <kbd className={buttonVariants({ variant: "secondary", size: "icon", className: "h-5 cursor-none sm:rounded" })}>↵</kbd>
              <span>to add</span>
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

      {
        (field.fieldType === 'dropdown' || field.fieldType === 'radio') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">Options</Label>
            </div>
            <div className="space-y-2">
              {(field.options || []).map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...(field.options || [])];
                      newOptions[index] = e.target.value;
                      onFieldUpdate({ options: newOptions });
                    }}
                    className="h-9 rounded-lg border-gray-200 bg-white hover:border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-xs font-medium"
                    placeholder={`Option ${index + 1}`}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50"
                    onClick={() => {
                      const newOptions = (field.options || []).filter((_, i) => i !== index);
                      onFieldUpdate({ options: newOptions });
                    }}
                  >
                    <X className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="w-full h-9 text-[10px] border-dashed border-gray-200 text-gray-500 hover:text-primary hover:border-primary hover:bg-primary/5 rounded-lg uppercase font-bold tracking-wider"
                onClick={() => {
                  const newOptions = [...(field.options || []), ""];
                  onFieldUpdate({ options: newOptions });
                }}
              >
                <Plus className="w-3.5 h-3.5 mr-2" />
                Add Option
              </Button>
            </div>

            {field.fieldType === 'radio' && (
              <div className="space-y-3 pt-2">
                <Label htmlFor="groupName" className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">Group Name</Label>
                <Input
                  id="groupName"
                  placeholder="e.g. choice-group-1"
                  value={field.groupName || ""}
                  onChange={(e) => onFieldUpdate({ groupName: e.target.value })}
                  className="h-9 rounded-lg border-gray-200 bg-white hover:border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-xs font-medium"
                />
                <p className="text-[10px] text-gray-400 font-medium leading-relaxed italic">
                  Link multiple radio fields by giving them the same group name.
                </p>
              </div>
            )}
          </div>
        )
      }

      {
        (field.fieldType === 'text') && (
          <div className="space-y-3">
            <Label htmlFor="validationType" className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">Validation</Label>
            <Select
              value={field.validation?.type || "text"}
              onValueChange={(value: any) => onFieldUpdate({
                validation: { ...(field.validation || {}), type: value }
              })}
            >
              <SelectTrigger className="w-full h-9 rounded-lg border-gray-200 bg-white hover:bg-gray-50 transition-colors text-xs font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-lg shadow-xl border-gray-100">
                <SelectItem value="text" className="text-xs font-medium">None</SelectItem>
                <SelectItem value="number" className="text-xs font-medium">Number Only</SelectItem>
                <SelectItem value="regex" className="text-xs font-medium">Custom Pattern (Regex)</SelectItem>
              </SelectContent>
            </Select>

            {field.validation?.type === 'regex' && (
              <div className="space-y-2 pt-1">
                <Input
                  placeholder="Regex pattern (e.g. ^[0-9]{5}$)"
                  value={field.validation.pattern || ""}
                  onChange={(e) => {
                    if (field.validation) {
                      onFieldUpdate({
                        validation: { ...field.validation, pattern: e.target.value }
                      });
                    }
                  }}
                  className="h-9 rounded-lg border-gray-200 bg-white text-xs font-medium"
                />
                <Input
                  placeholder="Error message"
                  value={field.validation.message || ""}
                  onChange={(e) => {
                    if (field.validation) {
                      onFieldUpdate({
                        validation: { ...field.validation, message: e.target.value }
                      });
                    }
                  }}
                  className="h-9 rounded-lg border-gray-200 bg-white text-xs font-medium"
                />
              </div>
            )}
          </div>
        )
      }

      <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50 border border-gray-100/80 transition-all hover:bg-gray-50">
        <div className="space-y-0.5">
          <Label htmlFor="required" className="text-xs font-bold text-gray-700 cursor-pointer">Required Field</Label>
          <p className="text-[9px] text-gray-400 font-medium">Must be filled to complete</p>
        </div>
        <Switch
          id="required"
          checked={field.isRequired}
          onCheckedChange={(checked) =>
            onFieldUpdate({ isRequired: checked as boolean })
          }
          className="data-[state=checked]:bg-primary"
        />
      </div>
    </div >
  );
}
