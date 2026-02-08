import { SignatureFieldData } from "@/components/signature-field";
import { Id } from "@/convex/_generated/dataModel";

export interface Signer {
  email: string;
  name: string;
  status?: "pending" | "sent" | "completed" | "declined";
}

export interface ShareDialogProps {
  documentId: Id<"documents">;
  document?: any; // Optional document prop to avoid duplicate queries
  onSend: (signers: Signer[], customMessage?: string) => Promise<void>;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  hasUnassignedFields?: boolean;
  onSignerAdd?: (signer: Signer) => void;
  signatureFields?: SignatureFieldData[];
  signers?: Signer[];
  children?: React.ReactNode;
}

export interface CommonViewProps {
  onClose: () => void;
  isDesktop?: boolean;
}
