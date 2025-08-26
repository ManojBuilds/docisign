import {
  Body,
  Container,
  Head,
  Html,
  pixelBasedPreset,
  Preview,
  Section,
  Tailwind,
} from "@react-email/components";
import { ReactNode } from "react";

interface EmailLayoutProps {
  preview: string;
  children: ReactNode;
}

export const EmailLayout = ({ preview, children }: EmailLayoutProps) => {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
          theme: {
            extend: {
              colors: {
                background: "#fcfcfc",
                foreground: "#000",
                card: "#fcfcfc",
                "card-foreground": "#000",
                popover: "#fbfbfb",
                "popover-foreground": "#000",
                primary: "#5d5fef",
                "primary-foreground": "#fff",
                secondary: "#f2f2f8",
                "secondary-foreground": "#222",
                muted: "#f7f7f7",
                "muted-foreground": "#6f6f6f",
                accent: "#e9e9ff",
                "accent-foreground": "#6056d7",
                destructive: "#d95f43",
                "destructive-foreground": "#fff",
                border: "#ebebff",
                input: "#f0f0f0",
                ring: "#2f2f2f",
              },
              borderRadius: {
                lg: "0.75rem",
                md: "calc(0.75rem - 2px)",
                sm: "calc(0.75rem - 4px)",
              },
            },
          },
        }}
      >
        <Body className="bg-background text-foreground font-sans m-0 p-0">
          <Container className="max-w-xl p-8 mx-auto my-0">
            {children}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
