import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Loader } from "../../loader";

export const metadata: Metadata = {
  title: "Sign Up for Boopsign - 7-Day Free Trial | Electronic Signatures",
  description:
    "Create your Boopsign account and start signing documents 3x faster than DocuSign. 7-day free trial, $15/month, no hidden fees. Mobile-first design.",
  keywords: [
    "Boopsign signup",
    "electronic signature free trial",
    "docusign alternative signup",
    "esignature software trial",
    "document signing account",
  ],
  openGraph: {
    title: "Sign Up for Boopsign - 7-Day Free Trial",
    description:
      "Join 2,847+ businesses who switched from DocuSign. Start your free trial today.",
    url: "https://boopsign.com/sign-up",
    images: [
      {
        url: "/images/og-signup.jpg",
        width: 1200,
        height: 630,
        alt: "Boopsign Free Trial Signup",
      },
    ],
  },
  twitter: {
    title: "Sign Up for Boopsign - Free 7-Day Trial",
    description:
      "Electronic signatures that actually work on mobile. No credit card required.",
    images: ["/images/twitter-signup.jpg"],
  },
  alternates: {
    canonical: "https://boopsign.com/sign-up",
  },
  robots: {
    index: true, // Index signup page for organic traffic
    follow: true,
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Sign Up for Boopsign",
            description: "Create account for electronic signature software",
            url: "https://boopsign.com/sign-up",
            mainEntity: {
              "@type": "SoftwareApplication",
              name: "Boopsign",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                priceValidUntil: "2026-12-31",
                description: "7-day free trial",
              },
            },
          }),
        }}
      />
      <ClerkLoading>
        <Loader />
      </ClerkLoading>
      <ClerkLoaded>
        <SignUp />
      </ClerkLoaded>
    </>
  );
}

