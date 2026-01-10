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
  const preview = `${signerName} signed "${documentTitle}"${!isComplete ? ` — ${remainingSigners} more needed` : " — complete!"}`;

  return (
    <EmailLayout preview={preview}>
      <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
        Document <strong>{isComplete ? "Complete" : "Signed"}</strong>
      </Heading>

      <Text className="text-[14px] text-black leading-[24px]">
        Hello {ownerName},
      </Text>

      <Text className="text-[14px] text-black leading-[24px]">
        <strong>{signerName}</strong> has signed <strong>{documentTitle}</strong>.
        {isComplete
          ? " All signatures have been collected and the agreement is now fully executed."
          : ` There are still ${remainingSigners} more signature${remainingSigners > 1 ? "s" : ""} needed to complete the process.`}
      </Text>

      <Section className="my-[24px] rounded border border-solid border-border bg-[#f9f9f9] p-[20px]">
        <Text className="m-0 text-[12px] font-bold uppercase tracking-wider text-muted mb-4 opacity-70 text-center">
          Signing Details
        </Text>
        <div className="flex flex-col gap-2">
          <Text className="m-0 text-[14px] text-black">
            <strong>Signer:</strong> {signerName}
          </Text>
          <Text className="m-0 text-[14px] text-black">
            <strong>Time:</strong> {new Date(signedAt).toLocaleString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </Text>
          <Text className="m-0 text-[14px] text-black">
            <strong>Status:</strong> {isComplete ? "Fully Executed" : `${remainingSigners} signing(s) pending`}
          </Text>
        </div>
      </Section>

      <Section className="mt-[32px] mb-[32px] text-center">
        <Button
          className="rounded bg-brand px-10 py-3 text-center text-[12px] font-semibold text-white no-underline"
          href={dashboardUrl}
        >
          {isComplete ? "View Final Document" : "Track Progress"}
        </Button>
      </Section>

      <Text className="text-[14px] text-black leading-[24px]">
        {isComplete
          ? "You can now download the fully executed document from your dashboard."
          : "We'll notify you as soon as the remaining participants have signed."}
      </Text>
    </EmailLayout>
  );
}
