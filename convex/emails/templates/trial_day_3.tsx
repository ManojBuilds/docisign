"use node";

import { Button, Heading, Section, Text } from "@react-email/components";
import { EmailLayout } from "../layout";

interface TrialDay3Props {
    userName?: string;
    createTemplateUrl?: string;
}

export default function TrialDay3({
    userName = "there",
    createTemplateUrl = "#",
}: TrialDay3Props) {
    return (
        <EmailLayout preview="Save time with templates">
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
                Quick Tip: <strong>Save Contracts as Templates</strong>
            </Heading>

            <Text className="text-[14px] text-black leading-[24px]">
                Hi {userName},
            </Text>

            <Text className="text-[14px] text-black leading-[24px]">
                You've sent your first few documents—great start!
            </Text>

            <Text className="text-[14px] text-black leading-[24px]">
                Did you know you can save your most-used contracts as <strong>Templates</strong>?
                Stop uploading the same PDF over and over. Set it up once, pre-place your signature fields,
                and send it in seconds next time.
            </Text>

            <Section className="mt-[32px] mb-[32px] text-center">
                <Button
                    className="rounded bg-brand px-10 py-3 text-center text-[12px] font-semibold text-white no-underline"
                    href={createTemplateUrl}
                >
                    Create Your First Template
                </Button>
            </Section>
        </EmailLayout>
    );
}
