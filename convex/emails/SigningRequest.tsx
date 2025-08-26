import { Button, Heading, Link, Section, Text } from "@react-email/components";
import { EmailLayout } from "./components/EmailLayout";
import { EmailHeader } from "./components/EmailHeader";
import { EmailFooter } from "./components/EmailFooter";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

interface SigningRequestProps {
  signerName?: string;
  senderName?: string;
  documentTitle?: string;
  signingUrl?: string;
  customMessage?: string;
}

export const SigningRequest = ({
  signerName,
  senderName,
  documentTitle,
  signingUrl,
  customMessage,
}: SigningRequestProps) => {
  return (
    <EmailLayout
      preview={`${senderName} has sent you a document to sign: ${documentTitle}`}
    >
      <EmailHeader />

      <Section className="p-8">
        <Heading className="text-2xl font-bold text-foreground mb-4">
          You have a document to sign
        </Heading>

        <Text className="text-lg text-muted-foreground mb-6">
          Hi {signerName},
        </Text>

        <Text className="text-base text-muted-foreground mb-4">
          <strong>{senderName}</strong> has sent you{" "}
          <strong>"{documentTitle}"</strong> to review and sign.
        </Text>

        {customMessage && (
          <Section className="border border-border rounded-sm p-4 mb-6">
            <Text className="text-sm font-semibold text-secondary-foreground mb-2">
              Message from {senderName}:
            </Text>
            <Text className="text-secondary-foreground italic m-0">
              "{customMessage}"
            </Text>
          </Section>
        )}

        <Section className="text-center my-8">
          <Button
            href={signingUrl}
            className="bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-sm text-base"
          >
            Review & Sign Document
          </Button>
        </Section>

        <Section className="border border-border rounded-sm p-4 mb-6">
          <Text className="font-semibold text-secondary-foreground mb-2">
            <strong>📋 What happens next?</strong>
          </Text>
          <Text className="text-secondary-foreground text-sm m-0 leading-snug">
            • Click the button above to review the document
            <br />
            • Add your signature where indicated
            <br />• You'll receive a signed copy once completed
          </Text>
        </Section>

        <Text className="text-sm text-muted-foreground mt-2">
          Can't click the button? Copy and paste this link into your browser:
          <br />
          <Link href={signingUrl} className="text-primary break-all">
            {signingUrl}
          </Link>
        </Text>
      </Section>

      <EmailFooter />
    </EmailLayout>
  );
};

SigningRequest.PreviewProps = {
  signerName: "John Doe",
  senderName: "Sarah Wilson",
  documentTitle: "Service Agreement - Q4 2025",
  signingUrl: `${baseUrl}/sign/doc123?email=john@example.com`,
  customMessage:
    "Hi John, please review and sign this service agreement for our upcoming project. Let me know if you have any questions!",
  expirationDate: "September 24, 2025",
} as SigningRequestProps;

export default SigningRequest;
