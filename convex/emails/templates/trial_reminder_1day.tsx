"use node";

import { Button, Heading, Hr, Link, Section, Text } from "@react-email/components";
import { EmailLayout } from "../layout";

interface TrialReminder1DayProps {
  userName?: string;
  upgradeUrl?: string;
  planPrice?: string;
}

/**
 * Trial Reminder (1 Day) Email
 * Adobe Sign-inspired minimal design
 */
export default function TrialReminder1Day({
  userName = "User",
  upgradeUrl = "#",
  planPrice = "$12/month",
}: TrialReminder1DayProps) {
  const preview = `Last day of your trial, ${userName}`;

  return (
    <EmailLayout preview={preview}>
      <Section style={{ marginBottom: "24px" }}>
        <div style={{ backgroundColor: "#000000", color: "#ffffff", borderRadius: "8px", padding: "16px 20px", textAlign: "center" }}>
          <Text style={{ fontSize: "16px", fontWeight: 600, margin: 0 }}>
            Your trial expires tomorrow
          </Text>
        </div>
      </Section>

      <Section style={{ marginBottom: "32px" }}>
        <Heading style={{ fontSize: "24px", fontWeight: 600, color: "#0f172a", margin: "0 0 12px 0", lineHeight: "1.3" }}>
          Don't lose your documents
        </Heading>
        <Text style={{ fontSize: "16px", color: "#334155", margin: 0, lineHeight: "1.6" }}>
          Hi {userName}, your free trial ends in 24 hours. Upgrade now to keep all your documents, templates, and settings.
        </Text>
      </Section>

      <Section style={{ marginBottom: "32px" }}>
        <div style={{ border: "1px solid #fecaca", borderRadius: "8px", padding: "20px", backgroundColor: "#fef2f2" }}>
          <Text style={{ fontSize: "14px", fontWeight: 600, color: "#7f1d1d", margin: "0 0 12px 0" }}>
            What happens without upgrade
          </Text>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Text style={{ fontSize: "14px", color: "#991b1b", margin: 0 }}>• You can't send new signature requests</Text>
            <Text style={{ fontSize: "14px", color: "#991b1b", margin: 0 }}>• Your saved documents become inaccessible</Text>
            <Text style={{ fontSize: "14px", color: "#991b1b", margin: 0 }}>• You lose access to trial features</Text>
          </div>
        </div>
      </Section>

      <Section style={{ textAlign: "center", marginBottom: "32px" }}>
        <Button
          href={upgradeUrl}
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
          Save My Documents — {planPrice}
        </Button>
      </Section>

      <Hr style={{ borderTop: "1px solid #e2e8f0", margin: "32px 0" }} />

      <Section style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <div style={{ width: "24px", height: "24px", backgroundColor: "#dcfce7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Text style={{ fontSize: "12px", fontWeight: 600, color: "#15803d", margin: 0 }}>✓</Text>
            </div>
            <Text style={{ fontSize: "14px", color: "#334155", margin: 0 }}>
              Keep all documents and templates
            </Text>
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <div style={{ width: "24px", height: "24px", backgroundColor: "#dcfce7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Text style={{ fontSize: "12px", fontWeight: 600, color: "#15803d", margin: 0 }}>✓</Text>
            </div>
            <Text style={{ fontSize: "14px", color: "#334155", margin: 0 }}>
              Send unlimited signature requests
            </Text>
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <div style={{ width: "24px", height: "24px", backgroundColor: "#dcfce7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Text style={{ fontSize: "12px", fontWeight: 600, color: "#15803d", margin: 0 }}>✓</Text>
            </div>
            <Text style={{ fontSize: "14px", color: "#334155", margin: 0 }}>
              Priority support and secure storage
            </Text>
          </div>
        </div>
      </Section>

      <Section style={{ textAlign: "center" }}>
        <Text style={{ fontSize: "14px", color: "#475569", margin: "0 0 12px 0" }}>
          Need help?{" "}
          <Link href="#" style={{ color: "#000000", textDecoration: "none", fontWeight: 500 }}>
            Contact Support
          </Link>
        </Text>
        <Text style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>
          You can restore access anytime by upgrading later.
        </Text>
      </Section>
    </EmailLayout>
  );
}
