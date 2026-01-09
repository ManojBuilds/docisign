"use node";

import { Button, Heading, Section, Text } from "@react-email/components";
import { EmailLayout } from "../layout";

interface SigningConfirmationProps {
  ownerName?: string;
  signerName?: string;
  documentTitle?: string;
  dashboardUrl?: string;
  signedAt?: string;
  remainingSigners?: number;
}

/**
 * Signing Confirmation Email
 * Adobe Sign-inspired minimal design
 */
export default function SigningConfirmation({
  ownerName = "User",
  signerName = "Signer",
  documentTitle = "Document",
  dashboardUrl = "#",
  signedAt = "Today",
  remainingSigners = 0,
}: SigningConfirmationProps) {
  const preview = `${signerName} signed "${documentTitle}"${remainingSigners > 0 ? ` — ${remainingSigners} more needed` : " — complete!"}`;

  return (
    <EmailLayout preview={preview}>
      <Section style={{ marginBottom: "32px" }}>
        <Heading style={{ fontSize: "24px", fontWeight: 600, color: "#0f172a", margin: "0 0 12px 0", lineHeight: "1.3" }}>
          Document signed
        </Heading>
        <Text style={{ fontSize: "16px", color: "#334155", margin: 0, lineHeight: "1.6" }}>
          Hi {ownerName}, {signerName} signed{" "}
          <strong style={{ color: "#0f172a", fontWeight: 600 }}>"{documentTitle}"</strong>
          {remainingSigners > 0
            ? ` — ${remainingSigners} more signature${remainingSigners > 1 ? "s" : ""} needed.`
            : " — all done!"}
        </Text>
      </Section>

      <Section style={{ marginBottom: "32px" }}>
        <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "20px", backgroundColor: "#f8fafc" }}>
          <Text style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a", margin: "0 0 12px 0" }}>
            Signing details
          </Text>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text style={{ fontSize: "14px", color: "#475569", margin: 0 }}>Signer</Text>
              <Text style={{ fontSize: "14px", color: "#0f172a", fontWeight: 500, margin: 0 }}>{signerName}</Text>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text style={{ fontSize: "14px", color: "#475569", margin: 0 }}>Signed at</Text>
              <Text style={{ fontSize: "14px", color: "#0f172a", margin: 0 }}>{signedAt}</Text>
            </div>
            {remainingSigners > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text style={{ fontSize: "14px", color: "#475569", margin: 0 }}>Remaining</Text>
                <Text style={{ fontSize: "14px", color: "#0f172a", margin: 0 }}>
                  {remainingSigners} signer{remainingSigners > 1 ? "s" : ""}
                </Text>
              </div>
            )}
          </div>
        </div>
      </Section>

      {remainingSigners > 0 ? (
        <Section style={{ marginBottom: "32px" }}>
          <div style={{ borderLeft: "4px solid #000000", paddingLeft: "16px", paddingTop: "8px", paddingBottom: "8px" }}>
            <Text style={{ fontSize: "14px", color: "#334155", margin: 0, lineHeight: "1.6" }}>
              We'll notify you as each person signs. Once complete, you'll receive the final document.
            </Text>
          </div>
        </Section>
      ) : (
        <Section style={{ marginBottom: "32px" }}>
          <div style={{ borderLeft: "4px solid #16a34a", paddingLeft: "16px", paddingTop: "8px", paddingBottom: "8px" }}>
            <Text style={{ fontSize: "14px", color: "#334155", margin: 0, lineHeight: "1.6" }}>
              Your document is complete. All parties have received their signed copy.
            </Text>
          </div>
        </Section>
      )}

      <Section style={{ textAlign: "center", marginBottom: "32px" }}>
        <Button
          href={dashboardUrl}
          style={{
            backgroundColor: "#000000",
            color: "#ffffff",
            padding: "16px 32px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "16px",
            display: "inline-block",
          }}
        >
          {remainingSigners > 0 ? "Track Progress" : "View Document"}
        </Button>
      </Section>
    </EmailLayout>
  );
}
