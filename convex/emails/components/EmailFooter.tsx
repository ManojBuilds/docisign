import { Hr, Link, Section, Text } from "@react-email/components";

export const EmailFooter = () => {
  return (
    <>
      <Hr className="border-t border-border my-6" />
      <Section className="px-8 pb-8">
        <Text className="text-muted-foreground text-sm text-center m-0">
          This email was sent by Docisign. If you have any questions, please{" "}
          {/* TODO: ADD SUPPORT EMAIL */}
          <Link href="#" className="text-primary underline">
            contact our support team
          </Link>
          .
        </Text>
        <Text className="text-muted-foreground/70 text-xs text-center mt-4 m-0">
          © 2025 Docisign. All rights reserved.
        </Text>
      </Section>
    </>
  );
};
