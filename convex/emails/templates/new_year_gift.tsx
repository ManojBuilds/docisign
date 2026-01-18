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
        Hi {userName},
      </Text>

      <Text className="text-[14px] text-black leading-[24px]">
        As we step into the new year, we want to thank you for being one of the
        first to believe in Boopsign. To show our appreciation and help you
        kickstart 2026, we've got a little gift for you.
      </Text>

      <Section className="my-[24px] rounded border border-solid border-border bg-black p-[32px] text-center">
        <Text className="m-0 text-[12px] font-bold uppercase tracking-wider text-white mb-2 opacity-70">
          Your New Year Gift
        </Text>
        <Heading className="m-0 text-[28px] font-bold text-white mb-4">
          1 Month Free Access
        </Heading>
        <Text className="m-0 text-[14px] text-white opacity-80 mb-6">
          We've automatically added an extra 30 days to your trial,
          completely free. There's nothing you need to do—just keep enjoying
          unlimited signing and creating.
        </Text>
        <Button
          className="rounded bg-white px-10 py-3 text-center text-[12px] font-semibold text-black no-underline"
          href={dashboardUrl}
        >
          Explore Your Dashboard
        </Button>
      </Section>

      <Text className="text-[14px] text-black leading-[24px]">
        Our goal with Boopsign has always been to make document signing simple
        and accessible for everyone. We have some exciting things planned for
        this year, and we're thrilled to have you with us.
      </Text>

      <Section className="mt-[32px]">
        <Text className="m-0 text-[14px] font-bold text-black">
          Manoj Kumar
        </Text>
        <Text className="m-0 text-[12px] text-muted">
          Founder,{" "}
          <Link href="https://boopsign.com" className="text-muted no-underline">
            Boopsign.com
          </Link>
        </Text>
      </Section>
    </EmailLayout>
  );
}
