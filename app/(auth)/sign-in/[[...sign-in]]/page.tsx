import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Loader } from "../../loader";

export const metadata: Metadata = {
  title: "Sign In to Boopsign - Access Your Documents",
  description:
    "Sign in to your Boopsign account to manage documents, track signatures, and send new documents for electronic signing.",
  keywords: [
    "Boopsign login",
    "Boopsign sign in",
    "electronic signature login",
    "document signing account",
  ],
  robots: {
    index: true, // Index login page for branded searches
    follow: true,
  },
  alternates: {
    canonical: "https://boopsign.com/sign-in",
  },
  // No OpenGraph needed for login page
};

export default function Page() {
  return (
    <div className="flex items-center justify-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Sign In for Boopsign",
            description: "Sign In to account for electronic signature software",
            url: "https://boopsign.com/sign-in",
            mainEntity: {
              "@type": "SoftwareApplication",
              name: "Boopsign",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
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
        <SignIn />
      </ClerkLoaded>
    </div>
  );
}
