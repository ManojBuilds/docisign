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
  const preview = `Last day of your trial, ${userName}`;

  return (
    <EmailLayout preview={preview}>
      <Section className="my-[24px]">
        <div className="bg-black rounded-lg py-2 px-4 text-center">
          <Text className="m-0 text-[12px] font-bold text-white uppercase tracking-wider">
            Trial expires tomorrow
          </Text>
        </div>
      </Section>

      <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
        Don't lose your <strong>Documents</strong>
      </Heading>

      <Text className="text-[14px] text-black leading-[24px]">
        Hello {userName},
      </Text>

      <Text className="text-[14px] text-black leading-[24px]">
        Your free trial ends in 24 hours. Upgrade now to keep all your documents, templates, and settings.
      </Text>

      <Section className="my-[24px] rounded border border-solid border-red-100 bg-red-50 p-[20px]">
        <Text className="m-0 text-[12px] font-bold uppercase tracking-wider text-red-600 mb-4 opacity-70">
          What happens next?
        </Text>
        <div className="flex flex-col gap-2">
          <Text className="m-0 text-[13px] text-red-800">
            • You can't send new signature requests
          </Text>
          <Text className="m-0 text-[13px] text-red-800">
            • Your saved documents become inaccessible
          </Text>
          <Text className="m-0 text-[13px] text-red-800">
            • You lose access to premium trial tools
          </Text>
        </div>
      </Section>

      <Section className="mt-[32px] mb-[32px] text-center">
        <Button
          className="rounded bg-brand px-10 py-3 text-center text-[12px] font-semibold text-white no-underline"
          href={upgradeUrl}
        >
          Save My Documents — {planPrice}
        </Button>
      </Section>

      <Text className="text-[12px] text-muted leading-[24px] text-center italic">
        "One of the best decisions for our workflow." — Early Adopter
      </Text>
    </EmailLayout>
  );
}
