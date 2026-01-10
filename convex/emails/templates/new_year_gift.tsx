"use node";

import { Button, Heading, Link, Section, Text } from "@react-email/components";
import { EmailLayout } from "../layout";

interface NewYearGiftProps {
  userName?: string;
  dashboardUrl?: string;
}

export default function NewYearGift({
  userName = "there",
  dashboardUrl = "https://boopsign.com/dashboard",
}: NewYearGiftProps) {
  return (
    <EmailLayout preview={`A New Year Gift for you, ${userName}! 🎁`}>
      <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
        Cheers to a <strong>Productive 2026</strong>
      </Heading>

      <Text className="text-[14px] text-black leading-[24px]">
        Hello {userName},
      </Text>

      <Text className="text-[14px] text-black leading-[24px]">
        Thank you for being one of the first to believe in Boopsign. As a token of our appreciation, we have a small gift to start your year off right.
      </Text>

      <Section className="my-[24px] rounded border border-solid border-border bg-black p-[32px] text-center">
        <Text className="m-0 text-[12px] font-bold uppercase tracking-wider text-white mb-2 opacity-70">
          New Year Gift
        </Text>
        <Heading className="m-0 text-[28px] font-bold text-white mb-4">
          1 Month Free Access
        </Heading>
        <Text className="m-0 text-[14px] text-white opacity-80 mb-6">
          We've automatically extended your trial for another 30 days. No action required on your part — just keep creating and signing.
        </Text>
        <Button
          className="rounded bg-white px-10 py-3 text-center text-[12px] font-semibold text-black no-underline"
          href={dashboardUrl}
        >
          Explore Your Dashboard
        </Button>
      </Section>

      <Text className="text-[14px] text-black leading-[24px]">
        Boopsign started with a simple goal: to make document signing effortless and accessible. We have big plans for this year and we're excited to have you along for the ride.
      </Text>

      <Section className="mt-[32px]">
        <Text className="m-0 text-[14px] font-bold text-black">
          Manoj Kumar
        </Text>
        <Text className="m-0 text-[12px] text-muted">
          Founder, <Link href="https://boopsign.com" className="text-muted no-underline">Boopsign.com</Link>
        </Text>
      </Section>
    </EmailLayout>
  );
}
