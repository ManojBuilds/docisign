"use node";

import { Button, Heading, Section, Text } from "@react-email/components";
import { EmailLayout } from "../layout";

interface SigningConfirmationProps {
  ownerName?: string;
  signerName?: string;
  documentTitle?: string;
  dashboardUrl?: string;
  signedAt?: string;
  remainingSigners?: number;
}

export default function SigningConfirmation({
  ownerName = "Manoj Kumar",
  signerName = "mkumar.react@gmail.com",
  documentTitle = "Boopsign_Sample_Freelance_Contract",
  dashboardUrl = "#",
  signedAt = new Date().toString(),
  remainingSigners = 0,
}: SigningConfirmationProps) {
  const isComplete = remainingSigners === 0;
  const preview = `Update on "${documentTitle}": ${signerName} just signed!`;

  return (
    <EmailLayout preview={preview}>
      <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
        Update on Your Document: <strong>{isComplete ? "It's Complete!" : "Signed"}</strong>
      </Heading>

      <Text className="text-[14px] text-black leading-[24px]">
        Hi {ownerName},
      </Text>

      <Text className="text-[14px] text-black leading-[24px]">
        Just letting you know that <strong>{signerName}</strong> has signed{" "}
        <strong>{documentTitle}</strong>.
        {isComplete
          ? " That was the final signature! The document is now fully executed."
          : ` We're getting closer—there ${remainingSigners > 1 ? "are" : "is"} still ${remainingSigners} signature${remainingSigners > 1 ? "s" : ""} pending.`}
      </Text>

      <Section className="my-[24px] rounded border border-solid border-border bg-[#f9f9f9] p-[20px]">
        <Text className="m-0 text-[12px] font-semibold uppercase tracking-wider text-muted mb-6 opacity-70 text-center">
          Signing Details
        </Text>

        <div className="mt-4">
          <div className="mb-4">
            <Text className="m-0 text-[11px] font-semibold uppercase tracking-wider text-muted mb-1">
              Signer
            </Text>
            <Text className="m-0 text-[14px] text-black font-medium">
              {signerName}
            </Text>
          </div>

          <div className="mb-4">
            <Text className="m-0 text-[11px] font-semibold uppercase tracking-wider text-muted mb-1">
              Time
            </Text>
            <Text className="m-0 text-[14px] text-black font-medium">
              {new Date(signedAt).toLocaleString("en-US", {
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
              Status
            </Text>
            <Text className="m-0 text-[14px] text-black font-medium">
              {isComplete
                ? "Signed & Completed"
                : `${remainingSigners} signature(s) pending`}
            </Text>
          </div>
        </div>
      </Section>

      <Section className="mt-[32px] mb-[32px] text-center">
        <Button
          className="rounded bg-brand px-10 py-3 text-center text-[12px] font-semibold text-white no-underline"
          href={dashboardUrl}
        >
          {isComplete ? "View Final Document" : "Track Progress in Dashboard"}
        </Button>
      </Section>

      <Text className="text-[14px] text-black leading-[24px]">
        {isComplete
          ? "The final, fully executed document is now available for download from your dashboard."
          : "We'll keep you updated as soon as the other participants have signed."}
      </Text>
    </EmailLayout>
  );
}
