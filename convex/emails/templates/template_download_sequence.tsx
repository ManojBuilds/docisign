"use node";

import { Button, Heading, Section, Text } from "@react-email/components";
import { EmailLayout } from "../layout";

interface TemplateEmailProps {
    userName?: string;
    templateName?: string;
    downloadUrl?: string; // Kept for backward compatibility
    docDownloadUrl?: string;
    pdfDownloadUrl?: string;
    dashboardUrl?: string;
    couponCode?: string;
}

export function TemplateDownloadEmail1({
    userName = "there",
    templateName = "Contract Template",
    docDownloadUrl="#",
    pdfDownloadUrl="#",
    dashboardUrl = "https://boopsign.com/dashboard",
}: TemplateEmailProps) {
    return (
        <EmailLayout preview={`Your ${templateName} is ready to download 📄`}>
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
                Your <strong>{templateName}</strong> is ready! 🎉
            </Heading>

            <Text className="text-[14px] text-black leading-[24px]">
                Hi {userName},
            </Text>

            <Text className="text-[14px] text-black leading-[24px]">
                Thanks for choosing Boopsign! Your {templateName} is ready to download and customize for your needs. We've provided both Word and PDF formats for your convenience.
            </Text>

            <Section className="mt-[32px] mb-[32px] text-center">
                {docDownloadUrl && (
                    <Button
                        className="rounded bg-brand px-6 py-3 text-center text-[12px] font-semibold text-white no-underline"
                        href={docDownloadUrl}
                    >
                        Download Word (.docx)
                    </Button>
                )}
                {pdfDownloadUrl && (
                    <Button
                        className="rounded mt-3 bg-brand px-6 py-3 text-center text-[12px] font-semibold text-white no-underline"
                        href={pdfDownloadUrl}
                    >
                        Download PDF (.pdf)
                    </Button>
                )}
            </Section>

            <Text className="text-[14px] text-black leading-[24px]">
                <strong>Ready to get it signed?</strong><br />
                Once you've customized your template, skip the hassle of printing, scanning, and emailing back and forth.
                With Boopsign, you can send it for signature in seconds—it's free to start, legally binding, and works on any device.
            </Text>

            <Section className="mt-[16px] text-center">
                <Button
                    className="rounded border border-solid border-gray-300 bg-transparent px-8 py-2 text-center text-[12px] font-semibold text-gray-700 no-underline"
                    href={dashboardUrl}
                >
                    Try Boopsign Free
                </Button>
            </Section>

            <Text className="text-[12px] text-gray-500 leading-[20px] mt-[24px]">
                P.S. No credit card required to get started. Send your first document in under 2 minutes.
            </Text>
        </EmailLayout>
    );
}

export function TemplateDownloadEmail2({
    userName = "there",
    templateName = "Contract Template",
    dashboardUrl = "https://boopsign.com/dashboard",
}: TemplateEmailProps) {
    return (
        <EmailLayout preview={`The fastest way to get your ${templateName} signed ✍️`}>
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
                Stop chasing signatures ✋
            </Heading>

            <Text className="text-[14px] text-black leading-[24px]">
                Hi {userName},
            </Text>

            <Text className="text-[14px] text-black leading-[24px]">
                Hope you're finding the {templateName} useful! Quick question: are you still emailing documents back and forth, waiting days for signatures?
            </Text>

            <Text className="text-[14px] text-black leading-[24px]">
                There's a better way. With Boopsign, your clients can sign in seconds—right from their phone, no account needed.
            </Text>

            <Section className="my-[24px] rounded border border-solid border-border bg-[#f9f9f9] p-[20px]">
                <Text className="m-0 mb-2 text-[14px] font-semibold">
                    ✨ Why freelancers love Boopsign:
                </Text>
                <ul className="m-0 pl-4 text-[14px] text-black">
                    <li className="mb-1"><strong>Mobile-friendly:</strong> Clients sign on any device—no app download required</li>
                    <li className="mb-1"><strong>Legally binding:</strong> Complete audit trail and compliance built-in</li>
                    <li className="mb-1"><strong>Professional:</strong> Custom branding makes you look like the pro you are</li>
                    <li className="mb-1"><strong>Fast:</strong> Get signatures in minutes, not days</li>
                </ul>
            </Section>

            <Section className="mt-[32px] mb-[32px] text-center">
                <Button
                    className="rounded bg-brand px-10 py-3 text-center text-[12px] font-semibold text-white no-underline"
                    href={dashboardUrl}
                >
                    Send Your First Document
                </Button>
            </Section>

            <Text className="text-[12px] text-gray-500 leading-[20px] mt-[24px]">
                Join thousands of freelancers who've ditched the print-sign-scan routine. Start free today.
            </Text>
        </EmailLayout>
    );
}

export function TemplateDownloadEmail3({
    userName = "there",
    dashboardUrl = "https://boopsign.com/pricing",
    couponCode = "TEMPLATE20",
}: TemplateEmailProps) {
    return (
        <EmailLayout preview="🎁 Exclusive offer: 20% off Boopsign Pro">
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
                A special thank you gift 🎁
            </Heading>

            <Text className="text-[14px] text-black leading-[24px]">
                Hi {userName},
            </Text>

            <Text className="text-[14px] text-black leading-[24px]">
                Thanks for downloading our template! We hope it's been helpful for your business.
            </Text>

            <Text className="text-[14px] text-black leading-[24px]">
                As a thank you, we'd like to offer you an <strong>exclusive 20% discount</strong> on Boopsign Professional—our plan built specifically for freelancers and small businesses who need generous signature request limits without enterprise pricing.
            </Text>

            <Section className="my-[24px] rounded border-2 border-solid border-brand bg-[#fff9f0] p-[24px] text-center">
                <Text className="m-0 text-[14px] text-gray-600">
                    Your Exclusive Coupon Code
                </Text>
                <Text className="m-0 mt-2 text-[28px] font-bold text-brand tracking-wider">
                    {couponCode}
                </Text>
                <Text className="m-0 mt-3 text-[14px] text-black">
                    <strong>20% off your first 3 months</strong> of Boopsign Professional
                </Text>
                <Text className="m-0 mt-1 text-[12px] text-gray-500">
                    Just $31.20/month (normally $39/month)
                </Text>
            </Section>

            <Section className="my-[20px] rounded border border-solid border-border bg-[#f9f9f9] p-[20px]">
                <Text className="m-0 mb-2 text-[14px] font-semibold">
                    🚀 What you get with Pro:
                </Text>
                <ul className="m-0 pl-4 text-[14px] text-black">
                    <li className="mb-1"><strong>Generous signature limits</strong> – 75 requests per month on Professional</li>
                    <li className="mb-1"><strong>Custom branding</strong> – add your logo and colors</li>
                    <li className="mb-1"><strong>Advanced templates</strong> – save time with reusable templates</li>
                    <li className="mb-1"><strong>Priority support</strong> – get help when you need it</li>
                </ul>
            </Section>

            <Section className="mt-[32px] mb-[32px] text-center">
                <Button
                    className="rounded bg-brand px-10 py-3 text-center text-[12px] font-semibold text-white no-underline"
                    href={dashboardUrl}
                >
                    Claim Your 20% Discount
                </Button>
            </Section>

            <Text className="text-[12px] text-gray-500 leading-[20px] mt-[24px] text-center">
                This offer is exclusive to template downloaders. Use code <strong>{couponCode}</strong> at checkout.<br />
                Offer valid for 7 days from receipt of this email.
            </Text>
        </EmailLayout>
    );
}