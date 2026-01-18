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

  return {
    signingSession,
    owner: signingSession?.owner,
    allDocumentFields: signingSession?.allDocumentFields,
    isLoading: signingSession === undefined,
    hasError: signingSession?.error,
  };
}
