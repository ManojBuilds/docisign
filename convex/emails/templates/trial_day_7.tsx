"use node";

import { Button, Heading, Section, Text, Hr } from "@react-email/components";
import { EmailLayout } from "../layout";

interface TrialDay7Props {
    userName?: string;
    upgradeUrl?: string;
}

export default function TrialDay7({
    userName = "there",
    upgradeUrl = "#",
}: TrialDay7Props) {
    return (
        <EmailLayout preview="See how Sarah saved 6 hours/week">
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
                How Sarah saved <strong>6 hours/week</strong>
            </Heading>

            <Text className="text-[14px] text-black leading-[24px]">
                Hi {userName},
            </Text>

            <Text className="text-[14px] text-black leading-[24px]">
                Meet Sarah, a freelance graphic designer who used to spend her Friday afternoons chasing clients for signatures.
            </Text>

            <Section className="my-[20px] p-[20px] bg-gray-50 rounded italic border-l-4 border-brand">
                <Text className="m-0 text-[14px] text-gray-700 leading-[24px]">
                    "I didn't realize how much time I was losing on admin work until I switched to Boopsign.
                    Now my contracts are signed in minutes, not days, and the automated reminders do the chasing for me."
                </Text>
            </Section>

            <Text className="text-[14px] text-black leading-[24px]">
                With features like <strong>Bulk Send</strong> and <strong>Smart Reminders</strong> (available on the Professional plan),
                Sarah now focuses on designing, not paperwork.
            </Text>

            <Section className="mt-[32px] mb-[32px] text-center">
                <Button
                    className="rounded bg-brand px-10 py-3 text-center text-[12px] font-semibold text-white no-underline"
                    href={upgradeUrl}
                >
                    See Professional Plan Features
                </Button>
            </Section>
        </EmailLayout>
    );
}
