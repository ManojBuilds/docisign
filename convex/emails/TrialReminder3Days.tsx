import { Button, Heading, Section, Text } from "@react-email/components";
import { EmailLayout } from "./components/EmailLayout";
import { EmailHeader } from "./components/EmailHeader";
import { EmailFooter } from "./components/EmailFooter";

interface TrialReminder3DaysProps {
  userName?: string;
  upgradeUrl?: string;
}

export const TrialReminder3Days = ({
  userName,
  upgradeUrl,
}: TrialReminder3DaysProps) => {
  return (
    <EmailLayout preview="3 days left in your Docisign trial">
      <EmailHeader />

      <Section className="p-8">
        <Heading className="text-2xl font-bold text-foreground mb-4">
          Your Docisign trial is ending soon!
        </Heading>

        <Text className="text-lg text-muted-foreground mb-6">
          Hi {userName},
        </Text>

        <Text className="text-base text-muted-foreground mb-4">
          Your Docisign trial expires in 3 days. Don't lose access to your
          documents and all the great features.
        </Text>

        <Section className="text-center my-8">
          <Button
            href={upgradeUrl}
            className="bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-sm text-base"
          >
            Upgrade Now
          </Button>
        </Section>

        <Text className="text-base text-muted-foreground mb-4">
          Upgrade to a paid plan today to continue enjoying seamless document
          signing.
        </Text>
      </Section>

      <EmailFooter />
    </EmailLayout>
  );
};

TrialReminder3Days.PreviewProps = {
  userName: "John Doe",
  upgradeUrl: "https://docisign.com/upgrade",
} as TrialReminder3DaysProps;

export default TrialReminder3Days;