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
  const preview = `Your Boopsign verification code is ${otp}`;
  const title = isSigner ? "Verify Your Identity to Sign" : "Verify Your Email";

  return (
    <EmailLayout preview={preview}>
      <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
        {title}
      </Heading>

      <Text className="text-[14px] text-black leading-[24px]">
        Hi there,
      </Text>

      <Text className="text-[14px] text-black leading-[24px]">
        {isSigner
          ? "To securely complete the document signing process, please use the verification code below."
          : "To finish setting up your account, please use the verification code below to confirm your email address."}
      </Text>

      <Section className="my-[32px] rounded border border-solid border-border bg-[#f9f9f9] p-[32px] text-center">
        <Text className="m-0 font-mono text-[36px] font-bold tracking-[0.2em] text-black">
          {otp}
        </Text>
      </Section>

      <Text className="text-[12px] text-muted leading-[24px]">
        For your security, this code will expire in 10 minutes. If you didn't
        request this, you can safely ignore this email.
      </Text>
    </EmailLayout>
  );
}
