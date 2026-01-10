"use node";

import { Heading, Section, Text } from "@react-email/components";
import { EmailLayout } from "../layout";

interface OtpProps {
  otp: string;
  purpose: "signer_verification" | "email_verification";
}

export default function Otp({
  otp = "000000",
  purpose = "email_verification",
}: OtpProps) {
  const isSigner = purpose === "signer_verification";
  const preview = `Your verification code: ${otp}`;
  const title = isSigner ? "Verify your identity" : "Verify your email";

  return (
    <EmailLayout preview={preview}>
      <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
        {title}
      </Heading>

      <Text className="text-[14px] text-black leading-[24px]">
        {isSigner
          ? "Use the verification code below to complete your document signing process."
          : "Use the verification code below to verify your email address."}
      </Text>

      <Section className="my-[32px] rounded border border-solid border-border bg-[#f9f9f9] p-[32px] text-center">
        <Text className="m-0 font-mono text-[36px] font-bold tracking-[0.2em] text-black">
          {otp}
        </Text>
      </Section>

      <Text className="text-[12px] text-muted leading-[24px]">
        This code will expire in 24 hours for your security. If you didn't request this code, you can safely ignore this email.
      </Text>
    </EmailLayout>
  );
}
