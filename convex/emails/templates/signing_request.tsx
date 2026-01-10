"use node";

import { Button, Heading, Link, Section, Text } from "@react-email/components";
import { EmailLayout } from "../layout";

interface SigningRequestProps {
  signerName?: string;
  senderName?: string;
  documentTitle?: string;
  signingUrl?: string;
  customMessage?: string;
}

export default function SigningRequest({
  signerName = "mkumar.react@gmail.com",
  senderName = "Manoj Kumar",
  documentTitle = "Boopsign_Sample_Freelance_Contract",
  signingUrl = "#",
  customMessage = "Please sign ",
}: SigningRequestProps) {
  return (
    <EmailLayout preview={`${senderName} sent you "${documentTitle}" to sign`}>
      <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
        Signature requested
      </Heading>

      <Text className="text-[14px] text-black leading-[24px]">
        Hello {signerName},
      </Text>

      <Text className="text-[14px] text-black leading-[24px]">
        <strong>{senderName}</strong> has invited you to sign the document <strong>{documentTitle}</strong> using Boopsign.
      </Text>

      {customMessage && (
        <Section className="my-[24px] rounded border border-solid border-border bg-[#f9f9f9] p-[20px]">
          <Text className="m-0 text-[12px] font-bold uppercase tracking-wider text-muted">
            Message from {senderName}
          </Text>
          <Text className="mt-[8px] italic text-[14px] text-black leading-[24px]">
            "{customMessage}"
          </Text>
        </Section>
      )}

      <Section className="mt-[32px] mb-[32px] text-center">
        <Button
          className="rounded bg-brand px-10 py-3 text-center text-[12px] font-semibold text-white no-underline"
          href={signingUrl}
        >
          Review & Sign
        </Button>
      </Section>

      <Text className="text-[14px] text-black leading-[24px]">
        or copy and paste this URL into your browser:{" "}
        <Link href={signingUrl} className="text-blue-600 no-underline">
          {signingUrl}
        </Link>
      </Text>
    </EmailLayout>
  );
}
