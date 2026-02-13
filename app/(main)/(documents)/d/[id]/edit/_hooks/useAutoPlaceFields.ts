import { useSignersStore } from "@/stores/signersStore";
import { useEffect, useState } from "react";

/**
 * Hook to auto-place signature fields for client emails from query parameters
 */
export function useAutoPlaceFields() {
  const [autoPlaced, setAutoPlaced] = useState(false);

  useEffect(() => {
    if (autoPlaced) return;

    const urlParams = new URLSearchParams(window.location.search);
    const clientEmailsParam = urlParams.get("clientEmails");

    if (clientEmailsParam) {
      const clientEmails = clientEmailsParam
        .split(",")
        .map(decodeURIComponent)
        .filter((email) => email.trim() !== "");

      // Add these emails to the signers store so they are available for assignment
      clientEmails.forEach((email) => {
        useSignersStore.getState().addSigner({ email, name: "" });
      });

      console.log("Registered signers from URL:", clientEmails);
      setAutoPlaced(true);
    } else {
      setAutoPlaced(true);
    }
  }, [autoPlaced]);

  return autoPlaced;
}
