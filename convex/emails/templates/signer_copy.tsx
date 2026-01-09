"use node";

import { Button, Heading, Hr, Link, Section, Text } from "@react-email/components";
import { EmailLayout } from "../layout";

interface SignerCopyProps {
  signerName?: string;
  documentTitle?: string;
  downloadUrl?: string;
  signedAt?: string;
  senderName?: string;
}

/**
 * Signer Copy Email
 * Adobe Sign-inspired minimal design
 */
export default function SignerCopy({
  signerName = "User",
  documentTitle = "Document",
  downloadUrl = "#",
  signedAt = "Today",
  senderName = "Someone",
}: SignerCopyProps) {
  const preview = `Your signed copy of "${documentTitle}" is ready`;

  return (
    <EmailLayout preview={preview}>
      <Section style={{ marginBottom: "32px" }}>
        <Heading style={{ fontSize: "24px", fontWeight: 600, color: "#0f172a", margin: "0 0 12px 0", lineHeight: "1.3" }}>
          Your signed document
        </Heading>
        <Text style={{ fontSize: "16px", color: "#334155", margin: 0, lineHeight: "1.6" }}>
          Hi {signerName}, thanks for signing{" "}
          <strong style={{ color: "#0f172a", fontWeight: 600 }}>"{documentTitle}"</strong>. Your signed copy is ready.
        </Text>
      </Section>

      <Section style={{ marginBottom: "32px" }}>
        <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "20px", backgroundColor: "#f8fafc" }}>
          <Text style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a", margin: "0 0 12px 0" }}>
            Signing summary
          </Text>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text style={{ fontSize: "14px", color: "#475569", margin: 0 }}>Document</Text>
              <Text style={{ fontSize: "14px", color: "#0f172a", fontWeight: 500, margin: 0 }}>{documentTitle}</Text>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text style={{ fontSize: "14px", color: "#475569", margin: 0 }}>Signed by</Text>
              <Text style={{ fontSize: "14px", color: "#0f172a", margin: 0 }}>{signerName}</Text>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text style={{ fontSize: "14px", color: "#475569", margin: 0 }}>Signed on</Text>
              <Text style={{ fontSize: "14px", color: "#0f172a", margin: 0 }}>{signedAt}</Text>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text style={{ fontSize: "14px", color: "#475569", margin: 0 }}>Requested by</Text>
              <Text style={{ fontSize: "14px", color: "#0f172a", margin: 0 }}>{senderName}</Text>
            </div>
          </div>
        </div>
      </Section>

      <Section style={{ textAlign: "center", marginBottom: "32px" }}>
        <Button
          href={downloadUrl}
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
          Download Your Copy
        </Button>
      </Section>

      <Hr style={{ borderTop: "1px solid #e2e8f0", margin: "32px 0" }} />

      <Section style={{ marginBottom: "32px" }}>
        <div style={{ borderLeft: "4px solid #000000", paddingLeft: "16px", paddingTop: "8px", paddingBottom: "8px" }}>
          <Text style={{ fontSize: "14px", color: "#334155", margin: 0, lineHeight: "1.6" }}>
            Keep this for your records. {senderName} has also received a copy.
          </Text>
        </div>
      </Section>

      <Section style={{ textAlign: "center" }}>
        <Text style={{ fontSize: "14px", color: "#475569", margin: 0 }}>
          Questions?{" "}
          <Link href="#" style={{ color: "#000000", textDecoration: "none", fontWeight: 500 }}>
            Contact Support
          </Link>
        </Text>
      </Section>
    </EmailLayout>
  );
}
