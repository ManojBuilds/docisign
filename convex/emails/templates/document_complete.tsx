"use node";

import { Button, Heading, Hr, Link, Section, Text } from "@react-email/components";
import { EmailLayout } from "../layout";

interface DocumentCompleteProps {
  ownerName?: string;
  documentTitle?: string;
  dashboardUrl?: string;
  downloadUrl?: string;
  completedAt?: string;
  totalSigners?: number;
}

/**
 * Document Complete Email
 * Adobe Sign-inspired minimal design
 */
export default function DocumentComplete({
  ownerName = "User",
  documentTitle = "Document",
  dashboardUrl = "#",
  downloadUrl,
  completedAt = "Today",
  totalSigners = 1,
}: DocumentCompleteProps) {
  const preview = `"${documentTitle}" is fully executed`;

  return (
    <EmailLayout preview={preview}>
      <Section style={{ marginBottom: "32px" }}>
        <Heading style={{ fontSize: "24px", fontWeight: 600, color: "#0f172a", margin: "0 0 12px 0", lineHeight: "1.3" }}>
          Document complete
        </Heading>
        <Text style={{ fontSize: "16px", color: "#334155", margin: 0, lineHeight: "1.6" }}>
          Congratulations {ownerName} — your document is fully executed and ready.
        </Text>
      </Section>

      <Section style={{ marginBottom: "32px" }}>
        <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "24px", backgroundColor: "#f8fafc" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: "40px", height: "40px", backgroundColor: "#dcfce7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontSize: "20px", margin: 0 }}>✓</Text>
            </div>
            <div>
              <Text style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a", margin: "0 0 4px 0" }}>
                Fully executed
              </Text>
              <Text style={{ fontSize: "12px", color: "#475569", margin: 0 }}>
                Completed {completedAt}
              </Text>
            </div>
          </div>

          <Hr style={{ borderTop: "1px solid #e2e8f0", margin: "16px 0" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={{ fontSize: "14px", color: "#475569", margin: 0 }}>Document</Text>
              <Text style={{ fontSize: "14px", color: "#0f172a", fontWeight: 500, margin: 0 }}>{documentTitle}</Text>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={{ fontSize: "14px", color: "#475569", margin: 0 }}>Total signers</Text>
              <Text style={{ fontSize: "14px", color: "#0f172a", margin: 0 }}>{totalSigners}</Text>
            </div>
          </div>
        </div>
      </Section>

      <Section style={{ textAlign: "center", marginBottom: "32px" }}>
        <Button
          href={downloadUrl || dashboardUrl}
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
          {downloadUrl ? "Download Document" : "View Document"}
        </Button>
      </Section>

      <Hr style={{ borderTop: "1px solid #e2e8f0", margin: "32px 0" }} />

      <Section style={{ marginBottom: "32px" }}>
        <div style={{ borderLeft: "4px solid #000000", paddingLeft: "16px", paddingTop: "8px", paddingBottom: "8px" }}>
          <Text style={{ fontSize: "14px", color: "#334155", margin: 0, lineHeight: "1.6" }}>
            All signers have received a copy. Keep this for your records.
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
