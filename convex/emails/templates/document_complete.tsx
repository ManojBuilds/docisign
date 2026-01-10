"use node";

import { Button, Heading, Link, Section, Text } from "@react-email/components";
import { EmailLayout } from "../layout";

interface DocumentCompleteProps {
  ownerName?: string;
  documentTitle?: string;
  dashboardUrl?: string;
  downloadUrl?: string;
  completedAt?: string;
  totalSigners?: number;
}

export default function DocumentComplete({
  ownerName = "Manoj Kumar",
  documentTitle = "Boopsign_Sample_Freelance_Contract",
  dashboardUrl = "#",
  downloadUrl,
  completedAt = new Date().toString(),
  totalSigners = 1,
}: DocumentCompleteProps) {
  const preview = `"${documentTitle}" is fully executed`;

  return (
    <EmailLayout preview={preview}>
      <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
        Document <strong>Complete</strong>
      </Heading>

      <Text className="text-[14px] text-black leading-[24px]">
        Hello {ownerName},
      </Text>

      <Text className="text-[14px] text-black leading-[24px]">
        Great news! The document <strong>{documentTitle}</strong> has been fully executed by all <strong>{totalSigners}</strong> signers.
      </Text>

      <Section className="my-[24px] rounded border border-solid border-border bg-[#f9f9f9] p-[20px]">
        <Text className="m-0 text-[12px] font-bold uppercase tracking-wider text-muted text-center mb-4">
          Status: Fully Executed
        </Text>
        <Text className="m-0 text-[14px] text-black mb-1">
          <strong>Completed on:</strong> {new Date(completedAt).toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </Text>
        <Text className="m-0 text-[14px] text-black">
          <strong>Document:</strong> {documentTitle}
        </Text>
      </Section>

      <Section className="mt-[32px] mb-[32px] text-center">
        <Button
          className="rounded bg-brand px-10 py-3 text-center text-[12px] font-semibold text-white no-underline"
          href={downloadUrl || dashboardUrl}
        >
          {downloadUrl ? "Download Document" : "View Document"}
        </Button>
      </Section>

      <Text className="text-[14px] text-black leading-[24px]">
        A copy of the signed document has been sent to all participants for their records.
      </Text>

      {downloadUrl && (
        <Text className="text-[14px] text-black leading-[24px] mt-4">
          Direct link:{" "}
          <Link href={downloadUrl} className="text-blue-600 no-underline">
            {downloadUrl}
          </Link>
        </Text>
      )}
    </EmailLayout>
  );
}
