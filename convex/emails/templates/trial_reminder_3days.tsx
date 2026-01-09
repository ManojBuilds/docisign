"use node";

import { Button, Heading, Hr, Link, Section, Text } from "@react-email/components";
import { EmailLayout } from "../layout";

interface TrialReminder3DaysProps {
  userName?: string;
  upgradeUrl?: string;
  planPrice?: string;
  daysLeft?: number;
}

/**
 * Trial Reminder (3 Days) Email
 * Adobe Sign-inspired minimal design
 */
export default function TrialReminder3Days({
  userName = "User",
  upgradeUrl = "#",
  planPrice = "$12/month",
  daysLeft = 3,
}: TrialReminder3DaysProps) {
  const preview = `${daysLeft} days left in your trial, ${userName}`;

  return (
    <EmailLayout preview={preview}>
      <Section style={{ marginBottom: "32px" }}>
        <Heading style={{ fontSize: "24px", fontWeight: 600, color: "#0f172a", margin: "0 0 12px 0", lineHeight: "1.3" }}>
          Your trial ends in {daysLeft} days
        </Heading>
        <Text style={{ fontSize: "16px", color: "#334155", margin: 0, lineHeight: "1.6" }}>
          Hi {userName}, your free trial will end soon. Upgrade to keep all your documents and continue sending signature requests.
        </Text>
      </Section>

      <Section style={{ marginBottom: "32px" }}>
        <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "20px", backgroundColor: "#f8fafc" }}>
          <Text style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a", margin: "0 0 12px 0" }}>
            What you keep with an upgrade
          </Text>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <div style={{ width: "24px", height: "24px", backgroundColor: "#dcfce7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Text style={{ fontSize: "12px", fontWeight: 600, color: "#15803d", margin: 0 }}>✓</Text>
              </div>
              <Text style={{ fontSize: "14px", color: "#334155", margin: 0, lineHeight: "1.5" }}>
                All documents created during trial
              </Text>
            </div>
            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <div style={{ width: "24px", height: "24px", backgroundColor: "#dcfce7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Text style={{ fontSize: "12px", fontWeight: 600, color: "#15803d", margin: 0 }}>✓</Text>
              </div>
              <Text style={{ fontSize: "14px", color: "#334155", margin: 0, lineHeight: "1.5" }}>
                Unlimited signature requests
              </Text>
            </div>
            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <div style={{ width: "24px", height: "24px", backgroundColor: "#dcfce7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Text style={{ fontSize: "12px", fontWeight: 600, color: "#15803d", margin: 0 }}>✓</Text>
              </div>
              <Text style={{ fontSize: "14px", color: "#334155", margin: 0, lineHeight: "1.5" }}>
                Priority support and secure storage
              </Text>
            </div>
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
          Upgrade Now — {planPrice}
        </Button>
      </Section>

      <Hr style={{ borderTop: "1px solid #e2e8f0", margin: "32px 0" }} />

      <Section style={{ marginBottom: "32px" }}>
        <div style={{ borderLeft: "4px solid #fbbf24", paddingLeft: "16px", paddingTop: "8px", paddingBottom: "8px" }}>
          <Text style={{ fontSize: "14px", fontWeight: 500, color: "#0f172a", margin: "0 0 8px 0" }}>
            What happens when the trial ends
          </Text>
          <Text style={{ fontSize: "14px", color: "#334155", margin: 0, lineHeight: "1.6" }}>
            Without an upgrade, you won't be able to send new requests or access documents created during the trial. You can restore everything instantly by upgrading.
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
