"use node";

import { Button, Heading, Link, Section, Text } from "@react-email/components";
import { EmailLayout } from "../layout";

interface SignerCopyProps {
  signerName?: string;
  documentTitle?: string;
  downloadUrl?: string;
  signedAt?: string;
  senderName?: string;
}

export default function SignerCopy({
  signerName = "User",
  documentTitle = "Document",
  downloadUrl = "#",
  signedAt = "Today",
  senderName = "Someone",
}: SignerCopyProps) {
  const preview = `Your signed copy of "${documentTitle}" is ready`;

  return (
    <EmailLayout preview={preview}>
      <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
        Your <strong>Signed Copy</strong>
      </Heading>

      <Text className="text-[14px] text-black leading-[24px]">
        Hello {signerName},
      </Text>

      <Text className="text-[14px] text-black leading-[24px]">
        Thank you for signing <strong>{documentTitle}</strong>. Your fully signed copy is now ready for download.
      </Text>

      <Section className="my-[24px] rounded border border-solid border-border bg-[#f9f9f9] p-[20px]">
        <Text className="m-0 text-[12px] font-bold uppercase tracking-wider text-muted mb-4 opacity-70 text-center">
          Signing Summary
        </Text>
        <div className="flex flex-col gap-2">
          <Text className="m-0 text-[14px] text-black">
            <strong>Document:</strong> {documentTitle}
          </Text>
          <Text className="m-0 text-[14px] text-black">
            <strong>Signed on:</strong> {new Date(signedAt).toLocaleString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </Text>
          <Text className="m-0 text-[14px] text-black">
            <strong>Requested by:</strong> {senderName}
          </Text>
        </div>
      </Section>

      <Section className="mt-[32px] mb-[32px] text-center">
        <Button
          className="rounded bg-brand px-10 py-3 text-center text-[12px] font-semibold text-white no-underline"
          href={downloadUrl}
        >
          Download Signed PDF
        </Button>
      </Section>

      <Text className="text-[14px] text-black leading-[24px]">
        Please keep this copy for your records. {senderName} has also received a copy of the completed agreement.
      </Text>

      <Text className="text-[14px] text-black leading-[24px] mt-4">
        Direct link:{" "}
        <Link href={downloadUrl} className="text-blue-600 no-underline">
          {downloadUrl}
        </Link>
      </Text>
    </EmailLayout>
  );
}
