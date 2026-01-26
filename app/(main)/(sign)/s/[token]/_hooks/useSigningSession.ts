import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

/**
 * Hook to manage signing session data
 * Fetches signing session and owner information
 */
export function useSigningSession(accessToken: string, initialData?: any) {
  const signingSession = useQuery(api.signers.getSigningSession, {
    accessToken,
  });

  const sessionData = signingSession ?? initialData;

  return {
    signingSession: sessionData,
    owner: sessionData?.owner,
    allDocumentFields: sessionData?.allDocumentFields,
    isLoading: sessionData === undefined,
    hasError: sessionData?.error,
  };
}
