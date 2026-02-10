import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Data Protection for Solo Entrepreneurs",
  description:
    "Boopsign privacy policy: How we protect your data as a solo entrepreneur. Secure, GDPR compliant electronic signature platform for solo entrepreneurs.",
  keywords: [
    "privacy policy for solo entrepreneurs",
    "data protection for solo entrepreneurs",
    "gdpr compliance",
    "document security for solo entrepreneurs",
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://boopsign.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-20 lg:max-w-4xl">
      <h1 className="mb-6 text-3xl font-semibold">Privacy Policy</h1>
      <p className="text-muted-foreground mb-8 text-sm">
        Last Updated: September 06, 2025
      </p>

      <section className="mb-8 space-y-4">
        <h2 className="text-xl font-semibold">1. Introduction</h2>
        <p className="text-muted-foreground">
          Welcome to Boopsign. We are committed to protecting your personal
          information and your right to privacy. If you have any questions or
          concerns about our policy, or our practices with regards to your
          personal information, please contact us at support@boopsign.com.
        </p>
      </section>

      <section className="mb-8 space-y-4">
        <h2 className="text-xl font-semibold">2. Information We Collect</h2>
        <p className="text-muted-foreground">
          We collect personal information that you voluntarily provide to us
          when you register on the website, express an interest in obtaining
          information about us or our products and services, when you
          participate in activities on the website or otherwise when you contact
          us.
        </p>
        <p className="text-muted-foreground">
          The personal information that we collect depends on the context of
          your interactions with us and the website, the choices you make and
          the products and features you use. The personal information we collect
          may include the following:
        </p>
        <ul className="text-muted-foreground list-inside list-disc space-y-2 pl-4">
          <li>
            <strong>Personal Information Provided by You.</strong> We collect
            names; email addresses; contact preferences; contact or
            authentication data; and other similar information.
          </li>
          <li>
            <strong>Payment Data.</strong> We may collect data necessary to
            process your payment if you make purchases, such as your payment
            instrument number (such as a credit card number), and the security
            code associated with your payment instrument. All payment data is
            stored by our payment processor and you should review its privacy
            policies and contact the payment processor directly to respond to
            your questions.
          </li>
        </ul>
      </section>

      <section className="mb-8 space-y-4">
        <h2 className="text-xl font-semibold">
          3. How We Use Your Information
        </h2>
        <p className="text-muted-foreground">
          We use personal information collected via our website for a variety of
          business purposes described below. We process your personal
          information for these purposes in reliance on our legitimate business
          interests, in order to enter into or perform a contract with you, with
          your consent, and/or for compliance with our legal obligations.
        </p>
        <ul className="text-muted-foreground list-inside list-disc space-y-2 pl-4">
          <li>To facilitate account creation and logon process.</li>
          <li>To post testimonials.</li>
          <li>Request feedback.</li>
          <li>To enable user-to-user communications.</li>
          <li>To manage user accounts.</li>
          <li>To send administrative information to you.</li>
          <li>To protect our Services.</li>
          <li>
            To enforce our terms, conditions and policies for business purposes,
            to comply with legal and regulatory requirements or in connection
            with our contract.
          </li>
          <li>To respond to legal requests and prevent harm.</li>
          <li>Fulfill and manage your orders.</li>
          <li>To deliver and facilitate delivery of services to the user.</li>
          <li>To respond to user inquiries/offer support to users.</li>
          <li>To send you marketing and promotional communications.</li>
          <li>Deliver targeted advertising to you.</li>
        </ul>
      </section>

      <section className="mb-8 space-y-4">
        <h2 className="text-xl font-semibold">
          4. Will Your Information Be Shared with Anyone?
        </h2>
        <p className="text-muted-foreground">
          We only share information with your consent, to comply with laws, to
          provide you with services, to protect your rights, or to fulfill
          business obligations.
        </p>
      </section>

      <section className="mb-8 space-y-4">
        <h2 className="text-xl font-semibold">
          5. Do We Use Cookies and Other Tracking Technologies?
        </h2>
        <p className="text-muted-foreground">
          We may use cookies and similar tracking technologies (like web beacons
          and pixels) to access or store information. Specific information about
          how we use such technologies and how you can refuse certain cookies is
          set out in our Cookie Policy.
        </p>
      </section>

      <section className="mb-8 space-y-4">
        <h2 className="text-xl font-semibold">
          6. How Long Do We Keep Your Information?
        </h2>
        <p className="text-muted-foreground">
          We will only keep your personal information for as long as it is
          necessary for the purposes set out in this privacy policy, unless a
          longer retention period is required or permitted by law (such as tax,
          accounting or other legal requirements).
        </p>
      </section>

      <section className="mb-8 space-y-4">
        <h2 className="text-xl font-semibold">
          7. How Do We Keep Your Information Safe?
        </h2>
        <p className="text-muted-foreground">
          We have implemented appropriate technical and organizational security
          measures designed to protect the security of any personal information
          we process. However, despite our safeguards and efforts to secure your
          information, no electronic transmission over the Internet or
          information storage technology can be guaranteed to be 100% secure, so
          we cannot promise or guarantee that hackers, cybercriminals, or other
          unauthorized third parties will not be able to defeat our security,
          and improperly collect, access, steal, or modify your information.
        </p>
      </section>

      <section className="mb-8 space-y-4">
        <h2 className="text-xl font-semibold">
          8. What Are Your Privacy Rights?
        </h2>
        <p className="text-muted-foreground">
          In some regions (like the European Economic Area and the United
          Kingdom), you have certain rights under applicable data protection
          laws. These may include the right (i) to request access and obtain a
          copy of your personal information, (ii) to request rectification or
          erasure; (iii) to restrict the processing of your personal
          information; and (iv) if applicable, to data portability. In certain
          circumstances, you may also have the right to object to the processing
          of your personal information. To make such a request, please use the
          contact details provided below. We will consider and act upon any
          request in accordance with applicable data protection laws.
        </p>
      </section>

      <section className="mb-8 space-y-4">
        <h2 className="text-xl font-semibold">
          9. Controls for Do-Not-Track Features
        </h2>
        <p className="text-muted-foreground">
          Most web browsers and some mobile operating systems and mobile
          applications include a Do-Not-Track (“DNT”) feature or setting you can
          activate to signal your privacy preference not to have data about your
          online browsing activities monitored and collected. At this stage no
          uniform technology standard for recognizing and implementing DNT
          signals has been finalized. As such, we do not currently respond to
          DNT browser signals or any other mechanism that automatically
          communicates your choice not to be tracked online.
        </p>
      </section>

      <section className="mb-8 space-y-4">
        <h2 className="text-xl font-semibold">
          10. Do We Make Updates to This Policy?
        </h2>
        <p className="text-muted-foreground">
          We may update this privacy policy from time to time. The updated
          version will be indicated by an updated “Revised” date and the updated
          version will be effective as soon as it is accessible. We encourage
          you to review this privacy policy frequently to be informed of how we
          are protecting your information.
        </p>
      </section>
    </div>
  );
}