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
    <EmailLayout preview={`Welcome to Boopsign, ${userName}!`}>
      <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
        Welcome to <strong>Boopsign</strong>
      </Heading>

      <Text className="text-[14px] text-black leading-[24px]">
        Hi {userName},
      </Text>

      <Text className="text-[14px] text-black leading-[24px]">
        We're thrilled to have you on board! With Boopsign, you can get
        documents signed in minutes—no printing, no scanning, just simple,
        secure e-signatures. Let's get your first document out the door.
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
        <Text className="m-0 text-[12px] font-semibold uppercase tracking-wider text-muted mb-4 opacity-70">
          Getting Started is Easy:
        </Text>
        <div>
          <Text className="m-0 mb-4 text-[14px] text-black">
            <strong>1. Upload:</strong> Drag and drop any document.
          </Text>
          <Text className="m-0 mb-4 text-[14px] text-black">
            <strong>2. Place Fields:</strong> Add signature and text fields for
            your signers.
          </Text>
          <Text className="m-0 text-[14px] text-black">
            <strong>3. Send & Track:</strong> Invite signers and monitor
            progress in real-time.
          </Text>
        </div>
      </Section>

      <Text className="text-[14px] text-black leading-[24px]">
        Have questions or need a hand getting started? Feel free to reply
        directly to this email. We're here to help!
      </Text>
    </EmailLayout>
  );
}
