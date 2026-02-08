"use node";

import { Button, Heading, Section, Text } from "@react-email/components";
import { EmailLayout } from "../layout";

interface TrialDay10Props {
    userName?: string;
    upgradeUrl?: string;
}

export default function TrialDay10({
    userName = "there",
    upgradeUrl = "#",
}: TrialDay10Props) {
    return (
        <EmailLayout preview="3 days left in your trial">
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
                <strong>3 days left</strong> in your trial
            </Heading>

            <Text className="text-[14px] text-black leading-[24px]">
                Hi {userName},
            </Text>

            <Text className="text-[14px] text-black leading-[24px]">
                Just a friendly heads-up that your Boopsign Free Trial is ending in 3 days.
            </Text>

            <Text className="text-[14px] text-black leading-[24px]">
                Do you have any questions about the features you've been testing?
                Whether it's about custom branding, audit trails, or team seats, we're here to help.
            </Text>

            <Text className="text-[14px] text-black leading-[24px]">
                If you're ready to secure your workflow, you can upgrade now to ensure zero interruption.
            </Text>

            <Section className="mt-[32px] mb-[32px] text-center">
                <Button
                    className="rounded bg-brand px-10 py-3 text-center text-[12px] font-semibold text-white no-underline"
                    href={upgradeUrl}
                >
                    Upgrade Now
                </Button>
            </Section>
        </EmailLayout>
    );
}
