import { Button, Heading, Section, Text } from "@react-email/components";
import { EmailLayout } from "./components/EmailLayout";
import { EmailHeader } from "./components/EmailHeader";
import { EmailFooter } from "./components/EmailFooter";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

interface SigningConfirmationProps {
  ownerName?: string;
  signerName?: string;
  documentTitle?: string;
  dashboardUrl?: string;
  signedAt?: string;
  remainingSigners?: number;
}

export const SigningConfirmation = ({
  ownerName,
  signerName,
  documentTitle,
  dashboardUrl,
  signedAt,
  remainingSigners = 0,
}: SigningConfirmationProps) => {
  return (
    <EmailLayout
      preview={`${signerName} signed your document: ${documentTitle}`}
    >
      <EmailHeader />

      <Section className="p-8">
        <div className="text-center mb-6">
          <span className="text-5xl text-primary">✓</span>
          <Heading className="text-2xl font-bold text-foreground mb-4 mt-2">
            Document Signed!
          </Heading>
        </div>

        <Text className="text-lg text-muted-foreground mb-6">
          Hi {ownerName},
        </Text>

        <Text className="text-base text-muted-foreground mb-4">
          Great news! <strong>{signerName}</strong> has signed{" "}
          <strong>"{documentTitle}"</strong>.
        </Text>

        <Section className="border border-border rounded-sm p-4 mb-6">
          <Text className="text-sm font-semibold text-secondary-foreground mb-2">
            Signing Details:
          </Text>
          <Text className="text-secondary-foreground text-sm m-0 leading-snug">
            <strong>Signer:</strong> {signerName}
            <br />
            <strong>Signed at:</strong> {signedAt}
            <br />
            {remainingSigners > 0 && (
              <>
                <strong>Remaining signers:</strong> {remainingSigners}
              </>
            )}
          </Text>
        </Section>

        {remainingSigners > 0 ? (
          <Section className="border border-border rounded-sm p-4 mb-6">
            <Text className="font-semibold text-secondary-foreground mb-2">
              <strong>⏳ Next Steps:</strong>
            </Text>
            <Text className="text-secondary-foreground text-sm m-0 leading-snug">
              Your document is waiting for {remainingSigners} more signature
              {remainingSigners > 1 ? "s" : ""}. You'll be notified when
              everyone has signed.
            </Text>
          </Section>
        ) : (
          <Section className="border border-border rounded-sm p-4 mb-6">
            <Text className="font-semibold text-secondary-foreground mb-2">
              <strong>🎉 All Done!</strong>
            </Text>
            <Text className="text-secondary-foreground text-sm m-0 leading-snug">
              All signatures have been collected. Your fully executed document
              is ready for download.
            </Text>
          </Section>
        )}

        <Section className="text-center my-8">
          <Button
            href={dashboardUrl}
            className="bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-sm text-base"
          >
            View in Dashboard
          </Button>
        </Section>
      </Section>

      <EmailFooter />
    </EmailLayout>
  );
};

SigningConfirmation.PreviewProps = {
  ownerName: "Sarah Wilson",
  signerName: "John Doe",
  documentTitle: "Service Agreement - Q4 2025",
  dashboardUrl: `${baseUrl}/dashboard`,
  signedAt: "August 24, 2025 at 2:30 PM PST",
  remainingSigners: 2,
} as SigningConfirmationProps;

export default SigningConfirmation;
