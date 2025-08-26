import { Section } from "@react-email/components";
import Logo from "./Logo";

// Vercel URL is available when deployed, otherwise use localhost for development.
const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const EmailHeader = () => {
  return (
    <Section className="bg-background p-8 flex items-center justify-center">
      <Logo baseUrl={baseUrl} />
    </Section>
  );
};
