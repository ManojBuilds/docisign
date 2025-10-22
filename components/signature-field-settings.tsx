import { SignatureFieldData } from "./signature-field";
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
import { useDocumentEditorStore } from "@/store/document-editor-store";
import { cn } from "@/lib/utils";
import { Doc, Id } from "@/convex/_generated/dataModel";

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

const gradients = [
  'from-pink-500 to-yellow-500',
  'from-purple-500 to-indigo-500',
  'from-green-400 to-blue-500',
  'from-red-500 to-orange-500',
  'from-teal-400 to-cyan-600',
];

export function SignatureFieldSettings({
  field,
  onFieldUpdate,
  signers=[]
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
        <Label htmlFor="assignedTo">Assigned to</Label>
        <Select
          value={field.assignedToEmail || "unassigned"}
          onValueChange={(value) => {
            if (value === "unassigned") {
              onFieldUpdate({
                assignedToEmail: "",
                assignedToName: ""
              });
            } else {
              const signer = signers?.find(s => s.email === value);
              onFieldUpdate({
                assignedToEmail: value,
                assignedToName: signer?.name || ''
              });
            }
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a signer">
              {field.assignedToEmail ? (
                <div className="flex items-center">
                  <div className={cn(
                    'w-4 h-4 rounded-full mr-2 bg-gradient-to-bl',
                    gradients[signers?.findIndex(s => s.email === field.assignedToEmail) % gradients.length]
                  )}></div>
                  {field.assignedToName || field.assignedToEmail}
                </div>
              ) : (
                <span>Select a signer</span>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="unassigned">
              <div className="flex items-center">
                <div className={cn(
                  'w-4 h-4 rounded-full mr-2 bg-gradient-to-bl',
                  gradients[0]
                )}></div>
                Unassigned
              </div>
            </SelectItem>
            {signers.map((signer, index) => (
              <SelectItem key={signer.email} value={signer.email}>
                <div className="flex items-center">
                  <div className={cn(
                    'w-4 h-4 rounded-full mr-2 bg-gradient-to-bl',
                    gradients[index % gradients.length]
                  )}></div>
                  {signer.name || signer.email}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="required"
          checked={field.isRequired}
          onCheckedChange={(checked) =>
            onFieldUpdate({ isRequired: checked as boolean })
          }
        />
        <Label htmlFor="required">Required</Label>
      </div>
    </div>
  );
}
