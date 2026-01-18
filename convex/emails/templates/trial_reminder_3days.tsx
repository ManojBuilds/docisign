"use node";

import { Button, Heading, Section, Text } from "@react-email/components";
import { EmailLayout } from "../layout";

interface TrialReminder3DaysProps {
  userName?: string;
  upgradeUrl?: string;
  planPrice?: string;
  daysLeft?: number;
}

export default function TrialReminder3Days({
  userName = "User",
  upgradeUrl = "#",
  planPrice = "$20/month",
  daysLeft = 3,
}: TrialReminder3DaysProps) {
  const preview = `Your Boopsign trial ends in ${daysLeft} days`;

  return (
    <EmailLayout preview={preview}>
      <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
        Your Trial Ends in <strong>{daysLeft} Days</strong>
      </Heading>

      <Text className="text-[14px] text-black leading-[24px]">
        Hi {userName},
      </Text>

      <Text className="text-[14px] text-black leading-[24px]">
        Just a friendly heads-up that your Boopsign free trial is ending in{" "}
        {daysLeft} days. We hope you've enjoyed the seamless signing
        experience! Upgrade now to ensure uninterrupted access.
      </Text>

      <Section className="my-[24px] rounded border border-solid border-border bg-[#f9f9f9] p-[20px]">
        <Text className="m-0 text-[12px] font-bold uppercase tracking-wider text-muted mb-4 opacity-70">
          By upgrading, you'll keep:
        </Text>
        <div className="flex flex-col gap-2">
          <Text className="m-0 text-[13px] text-black">
            ✓ Seamlessly send unlimited signature requests
          </Text>
          <Text className="m-0 text-[13px] text-black">
            ✓ Access all documents created during your trial
          </Text>
          <Text className="m-0 text-[13px] text-black">
            ✓ Enjoy priority support and secure cloud storage
          </Text>
        </div>
      </Section>

      <Section className="mt-[32px] mb-[32px] text-center">
        <Button
          className="rounded bg-brand px-10 py-3 text-center text-[12px] font-semibold text-white no-underline"
          href={upgradeUrl}
        >
          Keep My Features — {planPrice}
        </Button>
      </Section>

      <Text className="text-[14px] text-black leading-[24px]">
        After the trial, you won't be able to send new signature requests, but
        you can always upgrade later to restore full access.
      </Text>
    </EmailLayout>
  );
}
