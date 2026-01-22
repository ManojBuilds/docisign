"use node";

import { Button, Heading, Link, Section, Text } from "@react-email/components";
import { EmailLayout } from "../layout";

interface SigningRequestProps {
  signerName?: string;
  senderName?: string;
  documentTitle?: string;
  signingUrl?: string;
  customMessage?: string;
  brandLogoUrl?: string;
  brandName?: string;
}

export default function SigningRequest({
  signerName = "mkumar.react@gmail.com",
  senderName = "Manoj Kumar",
  documentTitle = "Boopsign_Sample_Freelance_Contract",
  signingUrl = "https://boopsign.com/s/sometokenjibrisgarbage",
  customMessage = "Please sign ",
  brandLogoUrl = "https://majestic-fox-274.convex.cloud/api/storage/d1e44629-e1d2-4298-bb4d-d5e89b0b59e0",
  brandName = "Acme Design Studios",
}: SigningRequestProps) {
  return (
    <EmailLayout
      preview={`${senderName} sent you "${documentTitle}" to sign`}
      brandLogoUrl={brandLogoUrl}
      brandName={brandName}
    >
      <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
        You're invited to sign
      </Heading>

      <Text className="text-[14px] text-black leading-[24px]">
        Hi {signerName},
      </Text>

      <Text className="text-[14px] text-black leading-[24px]">
        Great news! <strong>{senderName}</strong> has sent you{" "}
        <strong>{documentTitle}</strong> to sign using{" "}
        {brandName || "Boopsign"}. It's time to make it official!
      </Text>

      {customMessage && (
        <Section className="my-[24px] rounded border border-solid border-border bg-[#f9f9f9] p-[20px]">
          <Text className="m-0 text-[12px] font-semibold uppercase tracking-wider text-muted">
            A personal note from {senderName}
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
        Having trouble with the button? You can also copy and paste this link
        into your browser:{" "}
        <Link
          href={signingUrl}
          className="text-blue-600 no-underline break-all"
        >
          {signingUrl}
        </Link>
      </Text>
    </EmailLayout>
  );
}
