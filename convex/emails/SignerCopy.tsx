import { Button, Heading, Section, Text } from "@react-email/components";
import { EmailLayout } from "./components/EmailLayout";
import { EmailHeader } from "./components/EmailHeader";
import { EmailFooter } from "./components/EmailFooter";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

interface SignerCopyProps {
  signerName?: string;
  documentTitle?: string;
  downloadUrl?: string;
  signedAt?: string;
  senderName?: string;
}

export const SignerCopy = ({
  signerName,
  documentTitle,
  downloadUrl,
  signedAt,
  senderName,
}: SignerCopyProps) => {
  return (
    <EmailLayout
      preview={`Your signed copy of "${documentTitle}" is ready for download`}
    >
      <EmailHeader />

      <Section className="p-8">
        <div className="text-center mb-6">
          <span className="text-5xl">📄</span>
          <Heading className="text-2xl font-bold text-foreground mb-4 mt-2">
            Your Signed Document
          </Heading>
        </div>

        <Text className="text-lg text-muted-foreground mb-6">
          Hi {signerName},
        </Text>

        <Text className="text-base text-muted-foreground mb-4">
          Thank you for signing <strong>"{documentTitle}"</strong>. Your signed
          copy is now ready for download.
        </Text>

        <Section className="border border-border rounded-sm p-4 mb-6">
          <Text className="text-sm font-semibold text-secondary-foreground mb-2">
            Signing Summary:
          </Text>
          <Text className="text-secondary-foreground text-sm m-0 leading-snug">
            <strong>Document:</strong> {documentTitle}
            <br />
            <strong>Signed by:</strong> {signerName}
            <br />
            <strong>Signed on:</strong> {signedAt}
            <br />
            <strong>Requested by:</strong> {senderName}
          </Text>
        </Section>

        <Section className="text-center my-8">
          <Button
            href={downloadUrl}
            className="bg-primary text-primary-foreground font-semibold py-4 px-8 rounded-lg text-lg"
          >
            Download Your Copy
          </Button>
        </Section>

        <Section className="border border-border rounded-sm p-4 mb-6">
          <Text className="text-secondary-foreground text-sm m-0 leading-snug">
            <strong>📁 Keep for Your Records:</strong>
            <br />
            This is your personal copy of the signed document. We recommend
            saving it to your secure storage for future reference.
          </Text>
        </Section>
      </Section>

      <EmailFooter />
    </EmailLayout>
  );
};

SignerCopy.PreviewProps = {
  signerName: "John Doe",
  documentTitle: "Service Agreement - Q4 2025",
  downloadUrl: `${baseUrl}/documents/doc123/download`,
  signedAt: "August 24, 2025 at 2:30 PM PST",
  senderName: "Sarah Wilson",
} as SignerCopyProps;

export default SignerCopy;
