import { Id } from "@/convex/_generated/dataModel";

export interface Signer {
  email: string;
  name?: string;
  status?: "pending" | "sent" | "completed" | "declined";
}

export interface ShareDialogProps {
  documentId: Id<"documents">;
  onSend: (signers: Signer[], customMessage?: string) => Promise<void>;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  hasUnassignedFields?: boolean;
  onSignerAdd?: (signer: Signer) => void;
}

export interface CommonViewProps {
  onClose: () => void;
  isDesktop?: boolean;
}
