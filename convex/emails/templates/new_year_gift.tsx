"use node";

import { Button, Column, Heading, Hr, Link, Row, Section, Text } from "@react-email/components";
import { EmailLayout } from "../layout";

interface NewYearGiftProps {
  userName?: string;
  dashboardUrl?: string;
}

/**
 * New Year Gift Email
 * Notifying early users about a 1-month trial extension
 */
export default function NewYearGift({
  userName = "there",
  dashboardUrl = "https://boopsign.com/dashboard",
}: NewYearGiftProps) {
  return (
    <EmailLayout preview={`A New Year Gift for you, ${userName}! 🎁`}>
      {/* Hero Section */}
      <Section style={{ marginBottom: "40px" }}>
        <Heading style={{
          fontSize: "32px",
          fontWeight: 700,
          color: "#0f172a",
          margin: "0 0 16px 0",
          lineHeight: "1.2",
          letterSpacing: "-0.02em"
        }}>
          Cheers to a productive 2026.
        </Heading>
        <Text style={{ fontSize: "18px", color: "#475569", margin: "0 0 24px 0", lineHeight: "1.6" }}>
          Hi {userName}, thank you for being one of the first to believe in Boopsign.
        </Text>
      </Section>

      {/* Gift Card Section */}
      <Section style={{
        backgroundColor: "#f8fafc",
        borderRadius: "16px",
        padding: "40px",
        border: "1px solid #e2e8f0",
        marginBottom: "40px",
        textAlign: "center" as const
      }}>
        <Text style={{
          fontSize: "14px",
          fontWeight: 700,
          textTransform: "uppercase" as const,
          color: "#6366f1",
          letterSpacing: "0.1em",
          margin: "0 0 12px 0"
        }}>
          New Year Gift
        </Text>
        <Heading style={{
          fontSize: "28px",
          fontWeight: 600,
          color: "#0f172a",
          margin: "0 0 16px 0"
        }}>
          1 Month Free Access
        </Heading>
        <Text style={{
          fontSize: "16px",
          color: "#64748b",
          margin: "0 0 32px 0",
          lineHeight: "1.6"
        }}>
          We've automatically extended your trial for another 30 days. No action required on your part — just keep creating and signing.
        </Text>
        <Button
          href={dashboardUrl}
          style={{
            backgroundColor: "#0f172a",
            color: "#ffffff",
            padding: "16px 32px",
            borderRadius: "12px",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "16px",
            display: "inline-block",
          }}
        >
          Explore Your Dashboard
        </Button>
      </Section>

      <Section style={{ marginBottom: "40px" }}>
        <Text style={{ fontSize: "16px", color: "#334155", margin: "0 0 20px 0", lineHeight: "1.7" }}>
          Boopsign started with a simple goal: to make document signing effortless and accessible. As an early adopter, your presence means the world to us.
        </Text>
        <Text style={{ fontSize: "16px", color: "#334155", margin: "0", lineHeight: "1.7" }}>
          We have big plans for this year — more powerful features, faster workflows, and even smoother signing experiences. We're excited to have you along for the ride.
        </Text>
      </Section>

      <Hr style={{ borderTop: "1px solid #e2e8f0", margin: "40px 0" }} />

      <Section>
        <Row>
          <Column>
            <Text style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", margin: "0" }}>
              <Link href="https://x.com/ManojBuilds" style={{ color: "#0f172a", textDecoration: "none" }}>
                Manoj Kumar
              </Link>
            </Text>
            <Text style={{ fontSize: "14px", color: "#64748b", margin: "4px 0 0 0" }}>
              Founder, Boopsign.com
            </Text>
          </Column>
        </Row>
      </Section>
    </EmailLayout>
  );
}
