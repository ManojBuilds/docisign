"use node";

import { Button, Heading, Hr, Link, Section, Text } from "@react-email/components";
import { EmailLayout } from "../layout";

interface SigningRequestProps {
  signerName?: string;
  senderName?: string;
  documentTitle?: string;
  signingUrl?: string;
  customMessage?: string;
}

/**
 * Signing Request Email
 * Adobe Sign-inspired minimal design
 */
export default function SigningRequest({
  signerName = "there",
  senderName = "Someone",
  documentTitle = "Document",
  signingUrl = "#",
  customMessage,
}: SigningRequestProps) {
  return (
    <EmailLayout preview={`${senderName} sent you "${documentTitle}" to sign`}>
      <Section style={{ marginBottom: "32px" }}>
        <Heading style={{ fontSize: "24px", fontWeight: 600, color: "#0f172a", margin: "0 0 12px 0", lineHeight: "1.3" }}>
          Document to sign
        </Heading>
        <Text style={{ fontSize: "16px", color: "#334155", margin: 0, lineHeight: "1.6" }}>
          Hi {signerName}, {senderName} has requested your signature on{" "}
          <strong style={{ color: "#0f172a", fontWeight: 600 }}>"{documentTitle}"</strong>.
        </Text>
      </Section>

      {customMessage && (
        <Section style={{ marginBottom: "32px" }}>
          <div style={{ borderLeft: "4px solid #000000", paddingLeft: "16px", paddingTop: "8px", paddingBottom: "8px" }}>
            <Text style={{ fontSize: "14px", fontWeight: 500, color: "#1e293b", margin: "0 0 8px 0" }}>
              Message from {senderName}:
            </Text>
            <Text style={{ fontSize: "14px", color: "#334155", margin: 0, lineHeight: "1.5" }}>
              "{customMessage}"
            </Text>
          </div>
        </Section>
      )}

      <Section style={{ textAlign: "center", margin: "32px 0" }}>
        <Button
          href={signingUrl}
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
          Review & Sign
        </Button>
      </Section>

      <Hr style={{ borderTop: "1px solid #e2e8f0", margin: "32px 0" }} />

      <Section style={{ marginBottom: "32px" }}>
        <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "20px", backgroundColor: "#f8fafc" }}>
          <Text style={{ fontSize: "11px", color: "#475569", margin: "0 0 8px 0", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Document
          </Text>
          <Text style={{ fontSize: "16px", color: "#0f172a", fontWeight: 600, margin: "0 0 8px 0" }}>
            {documentTitle}
          </Text>
          <Text style={{ fontSize: "14px", color: "#475569", margin: 0 }}>
            Requested by {senderName}
          </Text>
        </div>
      </Section>

      <Section style={{ textAlign: "center" }}>
        <Text style={{ fontSize: "14px", color: "#475569", margin: 0 }}>
          Need help?{" "}
          <Link href="#" style={{ color: "#000000", textDecoration: "none", fontWeight: 500 }}>
            Visit Help Center
          </Link>
        </Text>
      </Section>
    </EmailLayout>
  );
}
