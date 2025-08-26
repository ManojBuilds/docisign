import { Button, Heading, Link, Section, Text } from "@react-email/components";
import { EmailLayout } from "./components/EmailLayout";
import { EmailHeader } from "./components/EmailHeader";
import { EmailFooter } from "./components/EmailFooter";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

interface WelcomeProps {
  userName?: string;
  dashboardUrl?: string;
  tutorialUrl?: string;
}

export const Welcome = ({
  userName,
  dashboardUrl,
  tutorialUrl,
}: WelcomeProps) => {
  return (
    <EmailLayout preview="Welcome to Docisign! Get your first document signed in under 3 minutes.">
      <EmailHeader />

      <Section className="p-8">
        <div className="text-center mb-6">
          <span className="text-5xl">👋</span>
          <Heading className="text-3xl font-bold text-foreground mb-4 mt-2">
            Welcome to Docisign!
          </Heading>
        </div>

        <Text className="text-lg text-muted-foreground mb-6">
          Hi {userName},
        </Text>

        <Text className="text-base text-muted-foreground mb-4">
          Welcome to the simplest document signing platform! You're now ready to
          get documents signed in under 3 minutes with our streamlined process.
        </Text>

        <Section className="border border-border rounded-sm p-6 mb-6">
          <Text className="font-semibold text-secondary-foreground mb-3">
            🚀 Here's how easy it is:
          </Text>
          <div className="mt-2">
            <div className="flex items-start mb-2">
              <span className="bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-1 shrink-0">
                1
              </span>
              <Text className="text-sm text-secondary-foreground m-0 leading-snug">
                Upload your document (PDF, DOC, DOCX)
              </Text>
            </div>
            <div className="flex items-start mb-2">
              <span className="bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-1 shrink-0">
                2
              </span>
              <Text className="text-sm text-secondary-foreground m-0 leading-snug">
                Drag & drop signature fields where needed
              </Text>
            </div>
            <div className="flex items-start">
              <span className="bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-1 shrink-0">
                3
              </span>
              <Text className="text-sm text-secondary-foreground m-0 leading-snug">
                Add signer details and send
              </Text>
            </div>
          </div>
        </Section>

        <div className="flex gap-4 justify-center my-8 flex-wrap">
          <Button
            href={dashboardUrl}
            className="bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-sm text-base"
          >
            Start Signing
          </Button>
          <Button
            href={tutorialUrl}
            className="bg-secondary text-secondary-foreground font-semibold py-3 px-6 rounded-sm text-base"
          >
            Watch Tutorial
          </Button>
        </div>

        <Section className="mb-6">
          <div className="border border-border rounded-sm p-4">
            <Text className="text-secondary-foreground font-semibold text-sm mb-1">
              ✨ Your Free Plan Includes:
            </Text>
            <Text className="text-secondary-foreground text-sm m-0 leading-snug">
              • 5 documents per month
              <br />
              • Unlimited signers
              <br />
              • Mobile-optimized signing
              <br />• Email notifications
            </Text>
          </div>
        </Section>

        <Text className="text-muted-foreground text-sm text-center m-0">
          Questions? Check out our{" "}
          <Link href={`${baseUrl}/#faq`} className="underline">
            FAQ
          </Link>
          .
        </Text>
      </Section>

      <EmailFooter />
    </EmailLayout>
  );
};
          
