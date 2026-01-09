"use node";

import { Button, Heading, Hr, Link, Section, Text } from "@react-email/components";
import { EmailLayout } from "../layout";

interface WelcomeProps {
  userName?: string;
  dashboardUrl?: string;
  tutorialUrl?: string;
}

/**
 * Welcome Email
 * Adobe Sign-inspired minimal design
 */
export default function Welcome({
  userName = "there",
  dashboardUrl = "#",
  tutorialUrl = "#",
}: WelcomeProps) {
  return (
    <EmailLayout preview={`Welcome to Boopsign, ${userName}`}>
      <Section style={{ marginBottom: "32px" }}>
        <Heading style={{ fontSize: "24px", fontWeight: 600, color: "#0f172a", margin: "0 0 12px 0", lineHeight: "1.3" }}>
          Welcome to Boopsign
        </Heading>
        <Text style={{ fontSize: "16px", color: "#334155", margin: 0, lineHeight: "1.6" }}>
          Hi {userName}, get documents signed in minutes — no printing, no scanning.
        </Text>
      </Section>

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
          Send Your First Document
        </Button>
      </Section>

      <Hr style={{ borderTop: "1px solid #e2e8f0", margin: "32px 0" }} />

      <Section style={{ marginBottom: "32px" }}>
        <Text style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a", margin: "0 0 16px 0" }}>
          How it works
        </Text>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <div style={{ width: "24px", height: "24px", backgroundColor: "#f1f5f9", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Text style={{ fontSize: "12px", fontWeight: 600, color: "#334155", margin: 0 }}>1</Text>
            </div>
            <Text style={{ fontSize: "14px", color: "#334155", margin: 0, lineHeight: "1.5" }}>
              Upload your document
            </Text>
          </div>

          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <div style={{ width: "24px", height: "24px", backgroundColor: "#f1f5f9", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Text style={{ fontSize: "12px", fontWeight: 600, color: "#334155", margin: 0 }}>2</Text>
            </div>
            <Text style={{ fontSize: "14px", color: "#334155", margin: 0, lineHeight: "1.5" }}>
              Place signature fields
            </Text>
          </div>

          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <div style={{ width: "24px", height: "24px", backgroundColor: "#f1f5f9", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Text style={{ fontSize: "12px", fontWeight: 600, color: "#334155", margin: 0 }}>3</Text>
            </div>
            <Text style={{ fontSize: "14px", color: "#334155", margin: 0, lineHeight: "1.5" }}>
              Send and track signatures
            </Text>
          </div>
        </div>
      </Section>

      <Section style={{ marginBottom: "32px" }}>
        <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "20px", backgroundColor: "#f8fafc" }}>
          <Text style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a", margin: "0 0 12px 0" }}>
            What's included
          </Text>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Text style={{ fontSize: "14px", color: "#334155", margin: 0 }}>• Unlimited documents during trial</Text>
            <Text style={{ fontSize: "14px", color: "#334155", margin: 0 }}>• Unlimited signers</Text>
            <Text style={{ fontSize: "14px", color: "#334155", margin: 0 }}>• Mobile-friendly signing</Text>
            <Text style={{ fontSize: "14px", color: "#334155", margin: 0 }}>• Real-time notifications</Text>
          </div>
        </div>
      </Section>

      <Section style={{ textAlign: "center" }}>
        <Text style={{ fontSize: "14px", color: "#475569", margin: 0 }}>
          Need help?{" "}
          <Link href={tutorialUrl} style={{ color: "#000000", textDecoration: "none", fontWeight: 500 }}>
            View tutorial
          </Link>
        </Text>
      </Section>
    </EmailLayout>
  );
}
