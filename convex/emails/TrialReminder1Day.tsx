import { Button, Heading, Section, Text } from "@react-email/components";
import { EmailLayout } from "./components/EmailLayout";
import { EmailHeader } from "./components/EmailHeader";
import { EmailFooter } from "./components/EmailFooter";

interface TrialReminder1DayProps {
  userName?: string;
  upgradeUrl?: string;
}

export const TrialReminder1Day = ({
  userName,
  upgradeUrl,
}: TrialReminder1DayProps) => {
  return (
    <EmailLayout preview="Your Docisign trial expires tomorrow">
      <EmailHeader />

      <Section className="p-8">
        <Heading className="text-2xl font-bold text-foreground mb-4">
          Action Required: Your Docisign trial expires tomorrow!
        </Heading>

        <Text className="text-lg text-muted-foreground mb-6">
          Hi {userName},
        </Text>

        <Text className="text-base text-muted-foreground mb-4">
          This is your final reminder – your Docisign trial expires tomorrow.
          Upgrade now to keep your documents and continue using Docisign without
          interruption.
        </Text>

        <Section className="text-center my-8">
          <Button
            href={upgradeUrl}
            className="bg-destructive text-primary-foreground font-semibold py-3 px-6 rounded-sm text-base"
          >
            Upgrade Now
          </Button>
        </Section>

        <Text className="text-base text-muted-foreground mb-4">
          Don't miss out on your saved documents and the convenience of Docisign.
        </Text>
      </Section>

      <EmailFooter />
    </EmailLayout>
  );
};

TrialReminder1Day.PreviewProps = {
  userName: "John Doe",
  upgradeUrl: "https://docisign.com/upgrade",
} as TrialReminder1DayProps;

export default TrialReminder1Day;