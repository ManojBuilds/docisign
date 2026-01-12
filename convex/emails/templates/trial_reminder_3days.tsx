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
  planPrice = "$15/month",
  daysLeft = 3,
}: TrialReminder3DaysProps) {
  const preview = `${daysLeft} days left in your trial, ${userName}`;

  return (
    <EmailLayout preview={preview}>
      <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
        Trial ends in <strong>{daysLeft} days</strong>
      </Heading>

      <Text className="text-[14px] text-black leading-[24px]">
        Hello {userName},
      </Text>

      <Text className="text-[14px] text-black leading-[24px]">
        Your free trial of Boopsign will end soon. Upgrade now to ensure uninterrupted access to your documents and signature requests.
      </Text>

      <Section className="my-[24px] rounded border border-solid border-border bg-[#f9f9f9] p-[20px]">
        <Text className="m-0 text-[12px] font-bold uppercase tracking-wider text-muted mb-4 opacity-70">
          Upgrade to keep:
        </Text>
        <div className="flex flex-col gap-2">
          <Text className="m-0 text-[13px] text-black">
            ✓ All documents created during trial
          </Text>
          <Text className="m-0 text-[13px] text-black">
            ✓ Unlimited signature requests
          </Text>
          <Text className="m-0 text-[13px] text-black">
            ✓ Priority support and secure storage
          </Text>
        </div>
      </Section>

      <Section className="mt-[32px] mb-[32px] text-center">
        <Button
          className="rounded bg-brand px-10 py-3 text-center text-[12px] font-semibold text-white no-underline"
          href={upgradeUrl}
        >
          Upgrade Now — {planPrice}
        </Button>
      </Section>

      <Text className="text-[14px] text-black leading-[24px]">
        Without an upgrade, you won't be able to send new requests once the trial expires. You can restore access anytime by upgrading later.
      </Text>
    </EmailLayout>
  );
}
