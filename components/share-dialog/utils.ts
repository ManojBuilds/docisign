import { Doc } from "@/convex/_generated/dataModel";

export const getSignerStatus = (email: string, signatureFields?: Doc<"signatureFields">[]) => {
  if (!signatureFields) return "pending";
  const signerFields = signatureFields.filter(f => f.signerEmail === email);
  if (signerFields.length === 0) return "pending";
  const allCompleted = signerFields.every(f => f.isCompleted);
  const someCompleted = signerFields.some(f => f.isCompleted);
  if (allCompleted) return "signed";
  if (someCompleted) return "partially_signed";
  return "pending";
};
