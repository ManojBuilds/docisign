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
  const preview = `It's official: "${documentTitle}" is complete!`;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://boopsign.com";
  const proxiedDownloadUrl = (downloadUrl || dashboardUrl) && (downloadUrl || dashboardUrl) !== "#"
    ? `${appUrl}/api/download?url=${encodeURIComponent(downloadUrl || dashboardUrl)}&filename=${encodeURIComponent(documentTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase())}_completed.pdf`
    : (downloadUrl || dashboardUrl);

  return (
    <EmailLayout preview={preview}>
      <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
        It's Official! <strong>Your Document is Complete</strong>
      </Heading>

      <Text className="text-[14px] text-black leading-[24px]">
        Hi {ownerName},
      </Text>

      <Text className="text-[14px] text-black leading-[24px]">
        Excellent news! The document <strong>{documentTitle}</strong> has now been
        signed by all <strong>{totalSigners}</strong> participants.
      </Text>

      <Section className="my-[24px] rounded border border-solid border-border bg-[#f9f9f9] p-[20px]">
        <Text className="m-0 text-[12px] font-semibold uppercase tracking-wider text-muted text-center mb-6">
          Document Details
        </Text>

        <div className="mt-4">
          <div className="mb-4">
            <Text className="m-0 text-[11px] font-semibold uppercase tracking-wider text-muted mb-1">
              Status
            </Text>
            <Text className="m-0 text-[14px] text-black font-medium">
              Signed & Completed
            </Text>
          </div>

          <div className="mb-4">
            <Text className="m-0 text-[11px] font-semibold uppercase tracking-wider text-muted mb-1">
              Completed on
            </Text>
            <Text className="m-0 text-[14px] text-black font-medium">
              {new Date(completedAt).toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </Text>
          </div>

          <div>
            <Text className="m-0 text-[11px] font-semibold uppercase tracking-wider text-muted mb-1">
              Document
            </Text>
            <Text className="m-0 text-[14px] text-black font-medium">
              {documentTitle}
            </Text>
          </div>
        </div>
      </Section>

      <Section className="mt-[32px] mb-[32px] text-center">
        <Button
          className="rounded bg-brand px-10 py-3 text-center text-[12px] font-semibold text-white no-underline"
          href={proxiedDownloadUrl}
        >
          {downloadUrl ? "Download Completed PDF" : "View Completed Document"}
        </Button>
      </Section>

      <Text className="text-[14px] text-black leading-[24px]">
        For everyone's convenience, a final copy has also been sent to all
        participants.
      </Text>

      {downloadUrl && (
        <Text className="text-[14px] text-black leading-[24px] mt-4">
          Direct link:{" "}
          <Link
            href={proxiedDownloadUrl}
            className="text-blue-600 no-underline break-all"
          >
            {proxiedDownloadUrl}
          </Link>
        </Text>
      )}
    </EmailLayout>
  );
}
