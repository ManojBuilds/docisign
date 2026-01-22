"use node";

import { Button, Heading, Section, Text } from "@react-email/components";
import { EmailLayout } from "../layout";

interface TrialReminder1DayProps {
  userName?: string;
  upgradeUrl?: string;
  planPrice?: string;
}

export default function TrialReminder1Day({
  userName = "User",
  upgradeUrl = "#",
  planPrice = "$15/month",
}: TrialReminder1DayProps) {
  const preview = `Final reminder: Your Boopsign trial expires tomorrow`;

  return (
    <EmailLayout preview={preview}>
      <Section className="my-[24px]">
        <div className="bg-black rounded-lg py-2 px-4 text-center">
          <Text className="m-0 text-[12px] font-semibold text-white uppercase tracking-wider">
            Trial Expires Tomorrow
          </Text>
        </div>
      </Section>

      <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
        Don't Lose Access to Your <strong>Work</strong>
      </Heading>

      <Text className="text-[14px] text-black leading-[24px]">
        Hi {userName},
      </Text>

      <Text className="text-[14px] text-black leading-[24px]">
        This is a final reminder that your free trial ends in 24 hours. To
        continue using Boopsign without interruption, upgrade your account now.
      </Text>

      <Section className="my-[24px] rounded border border-solid border-red-100 bg-red-50 p-[20px]">
        <Text className="m-0 text-[12px] font-semibold uppercase tracking-wider text-red-600 mb-4 opacity-70">
          After your trial ends:
        </Text>
        <div className="flex flex-col gap-2">
          <Text className="m-0 text-[13px] text-red-800">
            • You won't be able to send new signature requests.
          </Text>
          <Text className="m-0 text-[13px] text-red-800">
            • Access to your saved documents will be paused.
          </Text>
          <Text className="m-0 text-[13px] text-red-800">
            • You'll lose access to your templates and premium tools.
          </Text>
        </div>
      </Section>

      <Section className="mt-[32px] mb-[32px] text-center">
        <Button
          className="rounded bg-brand px-10 py-3 text-center text-[12px] font-semibold text-white no-underline"
          href={upgradeUrl}
        >
          Upgrade to Keep Everything — {planPrice}
        </Button>
      </Section>

      <Text className="text-[12px] text-muted leading-[24px] text-center italic">
        "...a game-changer for our document workflow." — Happy Customer
      </Text>
    </EmailLayout>
  );
}
