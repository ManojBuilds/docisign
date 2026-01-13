import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

/**
 * Hook to manage signing session data
 * Fetches signing session and owner information
 */
export function useSigningSession(accessToken: string) {
  const signingSession = useQuery(api.signers.getSigningSession, {
    accessToken,
  });

  const ownerId = signingSession?.document?.ownerId;
  const owner = useQuery(
    api.users.getUserByClerkId,
    ownerId ? { clerkId: ownerId } : "skip",
  );

  const allDocumentFields = useQuery(
    api.signatureFields.getDocumentSignatureFields,
    signingSession?.document?._id ? { documentId: signingSession.document._id } : "skip"
  );

  return {
    signingSession,
    owner,
    allDocumentFields,
    isLoading: signingSession === undefined,
    hasError: signingSession?.error,
  };
}
