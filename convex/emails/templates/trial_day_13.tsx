"use node";

import { Button, Heading, Section, Text } from "@react-email/components";
import { EmailLayout } from "../layout";

interface TrialDay13Props {
    userName?: string;
    upgradeUrl?: string;
}

export default function TrialDay13({
    userName = "there",
    upgradeUrl = "#",
}: TrialDay13Props) {
    return (
        <EmailLayout preview="Upgrade tomorrow to keep your templates">
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
                Upgrade tomorrow to <strong>keep your templates</strong>
            </Heading>

            <Text className="text-[14px] text-black leading-[24px]">
                Hi {userName},
            </Text>

            <Text className="text-[14px] text-black leading-[24px]">
                Your trial expires tomorrow! ⏳
            </Text>

            <Text className="text-[14px] text-black leading-[24px]">
                To prevent your account from downgrading to the Basic Free plan (which has limited templates and signature requests),
                upgrade to <strong>Professional</strong> today.
            </Text>

            <Section className="my-[24px] p-[16px] bg-amber-50 rounded border border-amber-100 text-center">
                <Text className="m-0 text-[14px] font-semibold text-amber-800">
                    Don't lose your setup. Lock in your templates and branding now.
                </Text>
            </Section>

            <Section className="mt-[32px] mb-[32px] text-center">
                <Button
                    className="rounded bg-brand px-10 py-3 text-center text-[12px] font-semibold text-white no-underline"
                    href={upgradeUrl}
                >
                    Upgrade & Save My Setup
                </Button>
            </Section>
        </EmailLayout>
    );
}
