"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { components } from "./_generated/api";
import { Resend } from "@convex-dev/resend";
import { render } from "@react-email/render";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { ReactNode } from "react";

const domain = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

interface LogoProps {
  showText?: boolean;
  baseUrl?: string;
}

interface EmailLayoutProps {
  preview: string;
  children: ReactNode;
}

export function Logo({ showText = true, baseUrl = "" }: LogoProps) {
  return (
    <Link href={baseUrl} style={linkStyle}>
      <Img
        src={`https://boopsign.com/logo.png`}
        alt="Boopsign Logo"
        width="40"
        height="40"
      />
      {showText && <span style={textStyle}>Boopsign.com</span>}
    </Link>
  );
}

const linkStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  textDecoration: "none",
};

const textStyle = {
  fontSize: "20px",
  fontWeight: "600",
};

export const EmailFooter = () => {
  return (
    <>
      <Hr style={{ borderTop: "1px solid #ddd", margin: "24px 0" }} />
      <Section style={{ padding: "0 32px 32px" }}>
        <Text
          style={{
            color: "#555",
            fontSize: "12px",
            textAlign: "center",
            margin: 0,
          }}
        >
          This email was sent by Boopsign. If you have any questions, please{" "}
          <Link
            href="#"
            style={{ color: "#007bff", textDecoration: "underline" }}
          >
            contact our support team
          </Link>
          .
        </Text>
        <Text
          style={{
            color: "#888",
            fontSize: "10px",
            textAlign: "center",
            marginTop: "16px",
            margin: 0,
          }}
        >
          © 2025 Boopsign. All rights reserved.
        </Text>
      </Section>
    </>
  );
};

export const EmailHeader = () => {
  return (
    <Section
      style={{
        backgroundColor: "#fff",
        padding: "32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Logo baseUrl={baseUrl} />
    </Section>
  );
};

export const EmailLayout = ({ preview, children }: EmailLayoutProps) => {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body
        style={{
          backgroundColor: "#fcfcfc",
          color: "#000",
          fontFamily: "sans-serif",
          margin: 0,
          padding: 0,
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            padding: "8px",
            margin: "0 auto",
          }}
        >
          {children}
        </Container>
      </Body>
    </Html>
  );
};

interface WelcomeProps {
  userName?: string;
  dashboardUrl?: string;
  tutorialUrl?: string;
}

export const Welcome = ({
  userName = "there",
  dashboardUrl = "#",
  tutorialUrl = "#",
}: WelcomeProps) => {
  return (
    <EmailLayout
      preview={`Welcome to Boopsign, ${userName}! Get your first document signed in under 3 minutes.`}
    >
      <EmailHeader />
      <Section>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <Img
            src="https://imgproxy.attic.sh/insecure/f:webp/q:90/w:750/plain/https://attic.sh/1pyfbfyxeshzkenyuk0ym2ohm18z"
            width="96"
            height="96"
            style={{ display: "block", margin: "0 auto 16px auto" }}
          />
          <Heading
            style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "#1a1a1a",
              marginBottom: "16px",
              marginTop: "8px",
            }}
          >
            Welcome to Boopsign!
          </Heading>
        </div>
        <Text style={{ fontSize: "18px", color: "#555", marginBottom: "24px" }}>
          Hey {userName},
        </Text>
        <Text style={{ fontSize: "16px", color: "#555", marginBottom: "16px" }}>
          You just joined thousands of people who've ditched the printing,
          scanning, and mailing. With Boopsign, you can get any document signed
          in under 3 minutes - seriously, we've timed it!
        </Text>

        <Section
          style={{
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "24px",
          }}
        >
          <Text
            style={{ fontWeight: "600", color: "#333", marginBottom: "12px" }}
          >
            Here's how ridiculously simple it is:
          </Text>
          <div style={{ marginTop: "8px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                marginBottom: "8px",
              }}
            >
              <span
                style={{
                  backgroundColor: "#f0f0f0",
                  color: "#333",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: "600",
                  marginRight: "12px",
                  marginTop: "2px",
                  flexShrink: 0,
                }}
              >
                1
              </span>
              <Text
                style={{
                  fontSize: "14px",
                  color: "#333",
                  margin: 0,
                  lineHeight: "1.5",
                }}
              >
                Drop your document in (PDF, Word, whatever you've got)
              </Text>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                marginBottom: "8px",
              }}
            >
              <span
                style={{
                  backgroundColor: "#f0f0f0",
                  color: "#333",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: "600",
                  marginRight: "12px",
                  marginTop: "2px",
                  flexShrink: 0,
                }}
              >
                2
              </span>
              <Text
                style={{
                  fontSize: "14px",
                  color: "#333",
                  margin: 0,
                  lineHeight: "1.5",
                }}
              >
                Drag signature fields exactly where you need them
              </Text>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <span
                style={{
                  backgroundColor: "#f0f0f0",
                  color: "#333",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: "600",
                  marginRight: "12px",
                  marginTop: "2px",
                  flexShrink: 0,
                }}
              >
                3
              </span>
              <Text
                style={{
                  fontSize: "14px",
                  color: "#333",
                  margin: 0,
                  lineHeight: "1.5",
                }}
              >
                Hit send and watch the signatures roll in
              </Text>
            </div>
          </div>
        </Section>

        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            margin: "32px 0",
            flexWrap: "wrap",
          }}
        >
          <Button
            href={dashboardUrl}
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              fontWeight: "600",
              padding: "12px 24px",
              borderRadius: "8px",
              fontSize: "16px",
            }}
          >
            Send My First Document
          </Button>
        </div>

        <Section style={{ marginBottom: "24px" }}>
          <div
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              padding: "16px",
            }}
          >
            <Text
              style={{
                color: "#333",
                fontWeight: "600",
                fontSize: "14px",
                marginBottom: "8px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              💡 What you get free:
            </Text>
            <Text
              style={{
                color: "#666",
                fontSize: "14px",
                margin: 0,
                lineHeight: "1.5",
              }}
            >
              • Unlimited documents in trial period (perfect for getting
              started)
              <br />
              • Unlimited signers on each document
              <br />
              • Mobile-friendly signing for everyone
              <br />• Real-time email updates when people sign
            </Text>
          </div>
        </Section>

        <Text
          style={{
            color: "#999",
            fontSize: "13px",
            textAlign: "center",
            margin: 0,
          }}
        >
          Questions? We're here to help! Check our{" "}
          <Link
            href={`${baseUrl}/#faq`}
            style={{ color: "#007bff", textDecoration: "none" }}
          >
            FAQ
          </Link>{" "}
          or just reply to this email.
        </Text>
      </Section>
      <EmailFooter />
    </EmailLayout>
  );
};

interface TrialReminder1DayProps {
  userName?: string;
  upgradeUrl?: string;
}

export const TrialReminder1Day = ({
  userName = "User",
  upgradeUrl = "#",
}: TrialReminder1DayProps) => {
  return (
    <EmailLayout
      preview={`Last chance ${userName}! Your Boopsign trial expires tomorrow - don't lose your progress`}
    >
      <EmailHeader />
      <Section>
        <Heading
          style={{
            fontSize: "24px",
            fontWeight: "600",
            color: "#dc3545",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          ⏰ Final Hours: Save Your Documents!
        </Heading>
        <Text style={{ fontSize: "18px", color: "#555", marginBottom: "24px" }}>
          {userName}, your trial ends tomorrow!
        </Text>
        <Text style={{ fontSize: "16px", color: "#555", marginBottom: "16px" }}>
          Your Boopsign trial ends tomorrow at midnight. After that, you'll lose
          access to all your saved documents and won't be able to send anything
          new for signing.
        </Text>

        <Section
          style={{
            border: "2px solid #dc3545",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "24px",
            backgroundColor: "#fff5f5",
          }}
        >
          <Text
            style={{
              color: "#dc3545",
              fontWeight: "600",
              fontSize: "14px",
              marginBottom: "8px",
            }}
          >
            ⚠️ What happens if you don't upgrade:
          </Text>
          <Text
            style={{
              color: "#721c24",
              fontSize: "14px",
              margin: 0,
              lineHeight: "1.5",
            }}
          >
            <br />
            • No more signature requests can be sent
            <br />• Your account gets locked until you upgrade
          </Text>
        </Section>

        <Section style={{ textAlign: "center", margin: "32px 0" }}>
          <Button
            href={upgradeUrl}
            style={{
              backgroundColor: "#dc3545",
              color: "#fff",
              fontWeight: "600",
              padding: "18px 36px",
              borderRadius: "8px",
              fontSize: "18px",
              boxShadow: "0 4px 12px rgba(220, 53, 69, 0.3)",
            }}
          >
            Save My Documents - Upgrade Now
          </Button>
        </Section>

        <Text
          style={{
            fontSize: "16px",
            color: "#555",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          Don't let your progress disappear! Upgrade now and keep everything
          you've built for just $12/month.
        </Text>

        <Section
          style={{
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "24px",
          }}
        >
          <Text
            style={{
              color: "#333",
              fontWeight: "600",
              fontSize: "14px",
              marginBottom: "8px",
            }}
          >
            ✅ What you'll keep with a paid plan:
          </Text>
          <Text
            style={{
              color: "#666",
              fontSize: "14px",
              margin: 0,
              lineHeight: "1.5",
            }}
          >
            • All your existing documents stay safe
            <br />
            • Send unlimited documents every month
            <br />
            • Get help whenever you need it
            <br />• Use advanced features like custom templates
          </Text>
        </Section>

        <Text style={{ fontSize: "13px", color: "#999", textAlign: "center" }}>
          Questions before you upgrade? Just reply to this email - we're here to
          help!
        </Text>
      </Section>
      <EmailFooter />
    </EmailLayout>
  );
};

interface TrialReminder3DaysProps {
  userName?: string;
  upgradeUrl?: string;
}

export const TrialReminder3Days = ({
  userName = "User",
  upgradeUrl = "#",
}: TrialReminder3DaysProps) => {
  return (
    <EmailLayout
      preview={`Don't lose your progress, ${userName}! 3 days left in your Boopsign trial`}
    >
      <EmailHeader />
      <Section>
        <Heading
          style={{
            fontSize: "24px",
            fontWeight: "600",
            color: "#1a1a1a",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          ⏳ 3 Days Left - Secure Your Documents
        </Heading>
        <Text style={{ fontSize: "18px", color: "#555", marginBottom: "24px" }}>
          Hey {userName},
        </Text>
        <Text style={{ fontSize: "16px", color: "#555", marginBottom: "16px" }}>
          Your Boopsign trial wraps up in just 3 days. After that, you'll lose
          access to your saved documents and won't be able to send new ones for
          signing.
        </Text>

        <Section
          style={{
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "24px",
          }}
        >
          <Text
            style={{
              color: "#333",
              fontWeight: "600",
              fontSize: "14px",
              marginBottom: "8px",
            }}
          >
            ✅ What you'll keep with a paid plan:
          </Text>
          <Text
            style={{
              color: "#666",
              fontSize: "14px",
              margin: 0,
              lineHeight: "1.5",
            }}
          >
            • All your existing documents and signatures
            <br />
            • Unlimited documents per month
            <br />• Priority support when you need help
          </Text>
        </Section>

        <Section style={{ textAlign: "center", margin: "32px 0" }}>
          <Button
            href={upgradeUrl}
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              fontWeight: "600",
              padding: "16px 32px",
              borderRadius: "8px",
              fontSize: "18px",
            }}
          >
            Keep My Documents - Upgrade Now
          </Button>
        </Section>

        <Text
          style={{
            fontSize: "16px",
            color: "#555",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          Plans start at just $12/month - less than what you'd spend on coffee
          and donuts, but way more useful for your business!
        </Text>

        <Text style={{ fontSize: "13px", color: "#999", textAlign: "center" }}>
          Questions about pricing or features? Just reply to this email - we're
          here to help!
        </Text>
      </Section>
      <EmailFooter />
    </EmailLayout>
  );
};

interface SigningRequestProps {
  signerName?: string;
  senderName?: string;
  documentTitle?: string;
  signingUrl?: string;
  customMessage?: string;
}

export const SigningRequest = ({
  signerName = "there",
  senderName = "Someone",
  documentTitle = "Document",
  signingUrl = "#",
  customMessage,
}: SigningRequestProps) => {
  return (
    <EmailLayout
      preview={`${senderName} sent you "${documentTitle}" to sign - takes just 30 seconds!`}
    >
      <EmailHeader />
      <Section>
        <Heading
          style={{
            fontSize: "24px",
            fontWeight: "600",
            color: "#1a1a1a",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          📝 Document Ready to Sign
        </Heading>
        <Text style={{ fontSize: "18px", color: "#555", marginBottom: "24px" }}>
          Hi {signerName},
        </Text>
        <Text style={{ fontSize: "16px", color: "#555", marginBottom: "16px" }}>
          {senderName} sent you <strong>"{documentTitle}"</strong> to review and
          sign. The whole process takes about 30 seconds - no printing or
          scanning required!
        </Text>

        {customMessage && (
          <Section
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "24px",
            }}
          >
            <Text
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#333",
                marginBottom: "8px",
              }}
            >
              Message from {senderName}:
            </Text>
            <Text
              style={{
                color: "#666",
                fontStyle: "italic",
                margin: 0,
                lineHeight: "1.5",
              }}
            >
              "{customMessage}"
            </Text>
          </Section>
        )}

        <Section style={{ textAlign: "center", margin: "32px 0" }}>
          <Button
            href={signingUrl}
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              fontWeight: "600",
              padding: "16px 32px",
              borderRadius: "8px",
              fontSize: "18px",
            }}
          >
            Review & Sign Now
          </Button>
        </Section>

        <Section
          style={{
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "24px",
          }}
        >
          <Text
            style={{ fontWeight: "600", color: "#333", marginBottom: "8px" }}
          >
            ✅ Simple 3-step process:
          </Text>
          <Text
            style={{
              color: "#666",
              fontSize: "14px",
              margin: 0,
              lineHeight: "1.5",
            }}
          >
            • Click the button above to open your document
            <br />
            • Review it and add your signature where marked
            <br />• You'll get a signed copy sent to your email automatically
          </Text>
        </Section>

        <Text
          style={{
            fontSize: "13px",
            color: "#999",
            marginTop: "24px",
            textAlign: "center",
          }}
        >
          Can't click the button? Copy and paste this link:
          <br />
          <Link
            href={signingUrl}
            style={{ color: "#007bff", wordBreak: "break-all" }}
          >
            {signingUrl}
          </Link>
        </Text>
      </Section>
      <EmailFooter />
    </EmailLayout>
  );
};

interface SigningConfirmationProps {
  ownerName?: string;
  signerName?: string;
  documentTitle?: string;
  dashboardUrl?: string;
  signedAt?: string;
  remainingSigners?: number;
}

export const SigningConfirmation = ({
  ownerName = "User",
  signerName = "Signer",
  documentTitle = "Document",
  dashboardUrl = "#",
  signedAt = "Today",
  remainingSigners = 0,
}: SigningConfirmationProps) => {
  return (
    <EmailLayout
      preview={`${signerName} just signed "${documentTitle}" - ${remainingSigners > 0 ? `${remainingSigners} more signature${remainingSigners > 1 ? "s" : ""} needed` : "all done!"}`}
    >
      <EmailHeader />
      <Section>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <Img
            src="https://imgproxy.attic.sh/insecure/f:webp/q:90/w:828/plain/https://attic.sh/z0l79aojhwg5m0sr1i42kz6l43ce"
            width="96"
            height="96"
            style={{ display: "block", margin: "0 auto 16px auto" }}
          />
          <Heading
            style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "#1a1a1a",
              marginBottom: "16px",
              marginTop: "8px",
            }}
          >
            🎉 Document Signed!
          </Heading>
        </div>
        <Text style={{ fontSize: "18px", color: "#555", marginBottom: "24px" }}>
          Hey {ownerName},
        </Text>
        <Text style={{ fontSize: "16px", color: "#555", marginBottom: "16px" }}>
          Great news! {signerName} just signed your{" "}
          <strong>"{documentTitle}"</strong>.{" "}
          {remainingSigners > 0
            ? `You're getting closer - just ${remainingSigners} more signature${remainingSigners > 1 ? "s" : ""} to go!`
            : "That's everyone - your document is complete!"}
        </Text>

        <Section
          style={{
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "24px",
          }}
        >
          <Text
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#333",
              marginBottom: "8px",
            }}
          >
            📋 Signing Details:
          </Text>
          <Text
            style={{
              color: "#333",
              fontSize: "14px",
              margin: 0,
              lineHeight: "1.5",
            }}
          >
            <strong>Signer:</strong> {signerName}
            <br />
            <strong>Signed at:</strong> {signedAt}
            <br />
            {remainingSigners > 0 && (
              <>
                <strong>Still waiting on:</strong> {remainingSigners} signer
                {remainingSigners > 1 ? "s" : ""}
              </>
            )}
          </Text>
        </Section>

        {remainingSigners > 0 ? (
          <Section
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "24px",
            }}
          >
            <Text
              style={{ fontWeight: "600", color: "#333", marginBottom: "8px" }}
            >
              🔜 What's Next:
            </Text>
            <Text
              style={{
                color: "#666",
                fontSize: "14px",
                margin: 0,
                lineHeight: "1.5",
              }}
            >
              We'll keep you updated as each person signs. Once everyone's done,
              you'll get your completed document automatically. No need to chase
              anyone down!
            </Text>
          </Section>
        ) : (
          <Section
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "24px",
            }}
          >
            <Text
              style={{ fontWeight: "600", color: "#333", marginBottom: "8px" }}
            >
              🎁 All Done!
            </Text>
            <Text
              style={{
                color: "#666",
                fontSize: "14px",
                margin: 0,
                lineHeight: "1.5",
              }}
            >
              Your fully executed document is ready for download. Everyone
              involved has received their signed copy automatically.
            </Text>
          </Section>
        )}

        <Section style={{ textAlign: "center", margin: "32px 0" }}>
          <Button
            href={dashboardUrl}
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              fontWeight: "600",
              padding: "12px 24px",
              borderRadius: "8px",
              fontSize: "16px",
            }}
          >
            {remainingSigners > 0 ? "Track Progress" : "Download Document"}
          </Button>
        </Section>
      </Section>
      <EmailFooter />
    </EmailLayout>
  );
};

interface SignerCopyProps {
  signerName?: string;
  documentTitle?: string;
  downloadUrl?: string;
  signedAt?: string;
  senderName?: string;
}

export const SignerCopy = ({
  signerName = "User",
  documentTitle = "Document",
  downloadUrl = "#",
  signedAt = "Today",
  senderName = "Someone",
}: SignerCopyProps) => {
  return (
    <EmailLayout
      preview={`Your signed copy of "${documentTitle}" is ready for download`}
    >
      <EmailHeader />
      <Section>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <Img
            src="https://imgproxy.attic.sh/insecure/f:webp/q:90/w:828/plain/https://attic.sh/z0l79aojhwg5m0sr1i42kz6l43ce"
            width="96"
            height="96"
            style={{ display: "block", margin: "0 auto 16px auto" }}
          />
          <Heading
            style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "#1a1a1a",
              marginBottom: "16px",
              marginTop: "8px",
            }}
          >
            📄 Your Signed Document
          </Heading>
        </div>

        <Text style={{ fontSize: "18px", color: "#555", marginBottom: "24px" }}>
          Hi {signerName},
        </Text>
        <Text style={{ fontSize: "16px", color: "#555", marginBottom: "16px" }}>
          Thanks for signing <strong>"{documentTitle}"</strong>! Your signed
          copy is ready for download. We've also sent a copy to {senderName} so
          everyone's on the same page.
        </Text>

        <Section
          style={{
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "24px",
          }}
        >
          <Text
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#333",
              marginBottom: "8px",
            }}
          >
            📋 Signing Summary:
          </Text>
          <Text
            style={{
              color: "#333",
              fontSize: "14px",
              margin: 0,
              lineHeight: "1.5",
            }}
          >
            <strong>Document:</strong> {documentTitle}
            <br />
            <strong>Signed by:</strong> {signerName}
            <br />
            <strong>Signed on:</strong> {signedAt}
            <br />
            <strong>Requested by:</strong> {senderName}
          </Text>
        </Section>

        <Section style={{ textAlign: "center", margin: "32px 0" }}>
          <Button
            href={downloadUrl}
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              fontWeight: "600",
              padding: "16px 32px",
              borderRadius: "8px",
              fontSize: "18px",
            }}
          >
            Download Your Copy
          </Button>
        </Section>

        <Section
          style={{
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "24px",
          }}
        >
          <Text
            style={{
              color: "#333",
              fontWeight: "600",
              fontSize: "14px",
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            💡 Keep for Your Records:
          </Text>
          <Text
            style={{
              color: "#666",
              fontSize: "14px",
              margin: 0,
              lineHeight: "1.5",
            }}
          >
            This is your personal copy of the signed document. Save it somewhere
            safe - you never know when you might need it!
          </Text>
        </Section>
      </Section>
      <EmailFooter />
    </EmailLayout>
  );
};

interface DocumentCompleteProps {
  ownerName?: string;
  documentTitle?: string;
  dashboardUrl?: string;
  downloadUrl?: string;
  completedAt?: string;
  totalSigners?: number;
}

export const DocumentComplete = ({
  ownerName = "User",
  documentTitle = "Document",
  dashboardUrl = "#",
  downloadUrl,
  completedAt = "Today",
  totalSigners = 1,
}: DocumentCompleteProps) => {
  return (
    <EmailLayout
      preview={`Your document "${documentTitle}" is fully executed and ready for download!`}
    >
      <EmailHeader />

      {/* Hero Section */}
      <Section style={{ textAlign: "center" }}>
        <Img
          src="https://imgproxy.attic.sh/insecure/f:webp/q:90/w:750/plain/https://attic.sh/vp8h0i7mk3jkjn2omvsm6vl14c7g"
          alt="🎉"
          width="90"
          height="90"
          style={{ display: "block", margin: "0 auto 16px auto" }}
        />

        <Heading
          style={{
            fontSize: "24px",
            fontWeight: "600",
            color: "#1a1a1a",
            margin: "0 0 8px 0",
          }}
        >
          🎉 Document Complete!
        </Heading>

        <Text
          style={{
            fontSize: "16px",
            color: "#666",
            margin: "0",
          }}
        >
          Congratulations {ownerName}!
        </Text>
      </Section>

      {/* Main Content */}
      <Section style={{ margin: "24px 0" }}>
        <Text
          style={{
            fontSize: "16px",
            color: "#333",
            lineHeight: "1.5",
            margin: "0 0 24px 0",
            textAlign: "center",
          }}
        >
          Your document <strong>"{documentTitle}"</strong> has been fully
          executed. All {totalSigners} signer
          {totalSigners > 1 ? "s have" : " has"} completed their signatures.
        </Text>

        {/* Document Summary Card */}
        <Section
          style={{
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            padding: "20px",
            margin: "0 0 24px 0",
          }}
        >
          <Text
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#333",
              margin: "0 0 16px 0",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            📋 Document Summary
          </Text>

          <div style={{ display: "grid", gap: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text style={{ margin: "0", fontSize: "14px", color: "#666" }}>
                Document:
              </Text>
              <Text
                style={{
                  margin: "0",
                  fontSize: "14px",
                  color: "#333",
                  fontWeight: "500",
                }}
              >
                {documentTitle}
              </Text>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text style={{ margin: "0", fontSize: "14px", color: "#666" }}>
                Completed:
              </Text>
              <Text
                style={{
                  margin: "0",
                  fontSize: "14px",
                  color: "#333",
                  fontWeight: "500",
                }}
              >
                {completedAt}
              </Text>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text style={{ margin: "0", fontSize: "14px", color: "#666" }}>
                Total Signers:
              </Text>
              <Text
                style={{
                  margin: "0",
                  fontSize: "14px",
                  color: "#333",
                  fontWeight: "500",
                }}
              >
                {totalSigners}
              </Text>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text style={{ margin: "0", fontSize: "14px", color: "#666" }}>
                Status:
              </Text>
              <Text
                style={{
                  margin: "0",
                  fontSize: "14px",
                  color: "#007bff",
                  fontWeight: "600",
                }}
              >
                ✅ Fully Executed
              </Text>
            </div>
          </div>
        </Section>

        {/* Action Buttons */}
        <Section style={{ textAlign: "center", margin: "24px 0" }}>
          <Button
            href={downloadUrl || dashboardUrl}
            style={{
              backgroundColor: "#f8f9fa",
              color: "#333",
              border: "1px solid #e0e0e0",
              fontWeight: "500",
              padding: "12px 24px",
              borderRadius: "6px",
              fontSize: "14px",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              marginRight: "12px",
            }}
          >
            📥 Download Document
          </Button>

          <Button
            href={dashboardUrl}
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              fontWeight: "500",
              padding: "12px 24px",
              borderRadius: "6px",
              fontSize: "14px",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            📊 View Dashboard
          </Button>
        </Section>

        {/* Pro Tip */}
        <Section
          style={{
            border: "1px solid #e0e0e0",
            borderRadius: "6px",
            padding: "16px",
            margin: "24px 0",
          }}
        >
          <Text
            style={{
              color: "#333",
              fontWeight: "500",
              fontSize: "14px",
              margin: "0 0 8px 0",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            💡 Pro Tip
          </Text>
          <Text
            style={{
              color: "#666",
              fontSize: "14px",
              margin: "0",
              lineHeight: "1.4",
            }}
          >
            Save the signed document to your secure storage. All parties have
            been sent their copy automatically.
          </Text>
        </Section>

        {/* Help */}
        <Section style={{ textAlign: "center", margin: "24px 0 0 0" }}>
          <Text
            style={{
              fontSize: "13px",
              color: "#999",
              margin: "0",
            }}
          >
            Questions about your document? We're here to help! Visit our{" "}
            <Link
              href="#"
              style={{
                color: "#007bff",
                textDecoration: "none",
              }}
            >
              Help Center
            </Link>{" "}
            or just reply to this email, {ownerName}.
          </Text>
        </Section>
      </Section>

      <EmailFooter />
    </EmailLayout>
  );
};
