import {
    Body,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import * as React from "react";

interface LogoProps {
  baseUrl?: string;
  showText?: boolean;
  logoSrc?: string;
}

export function Logo({ baseUrl = "", showText = true, logoSrc }: LogoProps) {
  const src = logoSrc || `${baseUrl.replace(/\/$/, "")}/logo.png`;

  return (
    <Link
      href={baseUrl || "#"}
      style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}
    >
      <Img
        src={src}
        alt="Boopsign"
        width={32}
        height={32}
        style={{ display: "block", borderRadius: "6px" }}
      />
      {showText && (
        <Text style={{ fontSize: "18px", fontWeight: "bold", color: "#0f172a", margin: 0, letterSpacing: "-0.025em" }}>
          Boopsign
        </Text>
      )}
    </Link>
  );
}

interface EmailHeaderProps {
  baseUrl?: string;
  logoSrc?: string;
}

export function EmailHeader({ baseUrl = "", logoSrc }: EmailHeaderProps) {
  return (
    <Section style={{ textAlign: "left", paddingTop: "24px", paddingBottom: "24px", marginBottom: "8px" }}>
      <Logo baseUrl={baseUrl} logoSrc={logoSrc} />
    </Section>
  );
}

export function EmailFooter({ baseUrl = "" }: { baseUrl?: string }) {
  const year = new Date().getFullYear();
  return (
    <Section style={{ marginTop: "48px", paddingTop: "32px", paddingBottom: "24px" }}>
      <Hr style={{ borderTop: "1px solid #e2e8f0", marginBottom: "24px" }} />

      <Text style={{ fontSize: "14px", color: "#475569", lineHeight: "1.6", margin: "0 0 16px 0" }}>
        <Link
          href={`${baseUrl || "#"}/support`}
          style={{ color: "#0f172a", textDecoration: "none", fontWeight: 500 }}
        >
          Support
        </Link>
        {" • "}
        <Link
          href={`${baseUrl || "#"}/privacy`}
          style={{ color: "#475569", textDecoration: "none" }}
        >
          Privacy
        </Link>
        {" • "}
        <Link
          href={`${baseUrl || "#"}/terms`}
          style={{ color: "#475569", textDecoration: "none" }}
        >
          Terms
        </Link>
      </Text>

      <Text style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>
        © {year} Boopsign. All rights reserved.
      </Text>
    </Section>
  );
}

interface EmailLayoutProps {
  preview: string;
  children: React.ReactNode;
  baseUrl?: string;
  logoSrc?: string;
}

/**
 * Minimal, Premium Email Layout
 *
 * Design Principles (Adobe Sign-inspired):
 * - Ultra-clean, minimal design
 * - High contrast typography
 * - Generous white space
 * - Subtle borders, no heavy shadows
 * - Professional color palette
 */
export function EmailLayout({
  preview,
  children,
  baseUrl = "",
  logoSrc,
}: EmailLayoutProps) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>

      <Body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#ffffff",
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          color: "#0f172a",
        }}
      >
        <Container
          style={{ maxWidth: "600px", margin: "0 auto", padding: "24px 32px" }}
        >
          <EmailHeader baseUrl={baseUrl} logoSrc={logoSrc} />

          {/* Content Section */}
          <Section style={{ backgroundColor: "#ffffff", padding: "16px 0" }}>
            {children}
          </Section>

          <EmailFooter baseUrl={baseUrl} />
        </Container>
      </Body>
    </Html>
  );
}
