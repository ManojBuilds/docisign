import { Button, Heading, Section, Text } from "@react-email/components";
import { EmailLayout } from "./components/EmailLayout";
import { EmailHeader } from "./components/EmailHeader";
import { EmailFooter } from "./components/EmailFooter";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

interface DocumentCompleteProps {
  ownerName?: string;
  documentTitle?: string;
  dashboardUrl?: string;
  downloadUrl?: string;
  completedAt?: string;
  totalSigners?: number;
}

export const DocumentComplete = ({
  ownerName,
  documentTitle,
  dashboardUrl,
  downloadUrl,
  completedAt,
  totalSigners=1,
}: DocumentCompleteProps) => {
  return (
    <EmailLayout
      preview={`Your document "${documentTitle}" is fully executed and ready!`}
    >
      <EmailHeader />

      <Section className="p-8">
        <div className="text-center mb-6">
          <span className="text-5xl">🎉</span>
          <Heading className="text-3xl font-bold text-foreground mb-4 mt-2">
            Document Complete!
          </Heading>
        </div>

        <Text className="text-lg text-muted-foreground mb-6">
          Congratulations {ownerName}!
        </Text>

        <Text className="text-base text-muted-foreground mb-4">
          Your document <strong>"{documentTitle}"</strong> has been fully
          executed. All {totalSigners} signer
          {totalSigners > 1 ? "s have" : " has"} completed their signatures.
        </Text>

        <Section className="border border-border rounded-sm p-6 mb-6">
          <Text className="text-sm font-semibold text-secondary-foreground mb-2">
            📄 Document Summary:
          </Text>
          <Text className="text-secondary-foreground text-sm m-0 leading-snug">
            <strong>Document:</strong> {documentTitle}
            <br />
            <strong>Completed:</strong> {completedAt}
            <br />
            <strong>Total Signers:</strong> {totalSigners}
            <br />
            <strong>Status:</strong>{" "}
            <span className="text-primary font-semibold">
              Fully Executed
            </span>
          </Text>
        </Section>

        <div className="flex gap-4 justify-center my-8 flex-wrap">
          <Button
            href={downloadUrl || dashboardUrl}
            className="bg-secondary text-secondary-foreground font-semibold py-3 px-6 rounded-sm text-base"
          >
            Download Document
          </Button>
          <Button
            href={dashboardUrl}
            className="bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-sm text-base"
          >
            View Dashboard
          </Button>
        </div>

        <Section className="border border-border rounded-sm p-4 mb-6">
          <Text className="text-muted-foreground font-semibold text-sm mb-1">
            💡 Pro Tip:
          </Text>
          <Text className="text-muted-foreground text-sm m-0 leading-snug">
            Save the signed document to your secure storage and keep it for your
            records. All parties have been sent their copy automatically.
          </Text>
        </Section>
      </Section>

      <EmailFooter />
    </EmailLayout>
  );
};

DocumentComplete.PreviewProps = {
  ownerName: "Sarah Wilson",
  documentTitle: "Service Agreement - Q4 2025",
  dashboardUrl: `${baseUrl}/dashboard`,
  downloadUrl: `${baseUrl}/documents/doc123/download`,
  completedAt: "August 24, 2025 at 4:15 PM PST",
  totalSigners: 3,
} as DocumentCompleteProps;

export default DocumentComplete;
