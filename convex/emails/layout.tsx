import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
  pixelBasedPreset,
} from "@react-email/components";
import * as React from "react";

interface EmailLayoutProps {
  preview: string;
  children: React.ReactNode;
  baseUrl?: string;
  brandLogoUrl?: string;
  brandName?: string;
}

const baseUrlDefault = "https://Boopsign.com";

export function EmailLayout({
  preview,
  children,
  baseUrl = baseUrlDefault,
  brandLogoUrl,
  brandName,
}: EmailLayoutProps) {
  return (
    <Html>
      <Preview>{preview}</Preview>
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
          theme: {
            extend: {
              colors: {
                brand: "#000000",
                muted: "#666666",
                border: "#eaeaea",
              },
            },
          },
        }}
      >
        <Head />
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-border p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={brandLogoUrl || `${baseUrl}/logo.png`}
                width="60"
                height="60"
                alt={brandName || "Boopsign"}
                className="mx-auto my-0 rounded-lg bg-white object-cover"
              />
            </Section>

            {children}

            <Hr className="mx-0 my-[26px] w-full border border-solid border-border" />

            <Section className="text-center">
              <Text className="text-[12px] text-muted leading-[24px]">
                © {new Date().getFullYear()} {brandName || "Boopsign"}. All rights reserved.
              </Text>
              <Text className="text-[12px] text-muted leading-[20px] mt-2">
                <Link href={`${baseUrl}/`} className="text-brand font-semibold no-underline mr-3">Support</Link>
                <Link href={`${baseUrl}/privacy-policy`} className="text-muted no-underline mr-3">Privacy</Link>
                <Link href={`${baseUrl}/`} className="text-muted no-underline">Terms</Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
