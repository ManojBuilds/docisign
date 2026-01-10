"use node";

import { Button, Heading, Link, Section, Text } from "@react-email/components";
import { EmailLayout } from "../layout";

interface WelcomeProps {
  userName?: string;
  dashboardUrl?: string;
  tutorialUrl?: string;
}

export default function Welcome({
  userName = "there",
  dashboardUrl = "#",
  tutorialUrl = "#",
}: WelcomeProps) {
  return (
    <EmailLayout preview={`Welcome to Boopsign, ${userName}`}>
      <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
        Welcome to <strong>Boopsign</strong>
      </Heading>

      <Text className="text-[14px] text-black leading-[24px]">
        Hello {userName},
      </Text>

      <Text className="text-[14px] text-black leading-[24px]">
        Get documents signed in minutes — no printing, no scanning, just Boopsign. We're excited to help you streamline your signing workflows.
      </Text>

      <Section className="mt-[32px] mb-[32px] text-center">
        <Button
          className="rounded bg-brand px-10 py-3 text-center text-[12px] font-semibold text-white no-underline"
          href={dashboardUrl}
        >
          Send Your First Document
        </Button>
      </Section>

      <Section className="my-[24px] rounded border border-solid border-border bg-[#f9f9f9] p-[20px]">
        <Text className="m-0 text-[12px] font-bold uppercase tracking-wider text-muted mb-4 opacity-70">
          How it works
        </Text>
        <div className="flex flex-col gap-4">
          <Text className="m-0 text-[14px] text-black">
            <strong>1. Upload</strong> your document to the dashboard.
          </Text>
          <Text className="m-0 text-[14px] text-black">
            <strong>2. Place</strong> signature fields where needed.
          </Text>
          <Text className="m-0 text-[14px] text-black">
            <strong>3. Send</strong> and track signatures in real-time.
          </Text>
        </div>
      </Section>

      <Text className="text-[14px] text-black leading-[24px]">
        Need help getting started? Check out our <Link href={tutorialUrl} className="text-blue-600 no-underline">quick tutorial</Link> or reply to this email.
      </Text>
    </EmailLayout>
  );
}
