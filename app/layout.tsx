import "./globals.css";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import { PdfDimensionsProvider } from "@/components/PdfDimensionsContext";
import { Metadata, Viewport } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://boopsign.com"),
  title: {
    default: "BoopSign — E-Signature for Freelancers & Consultants | No Account Required",
    template: "%s | BoopSign",
  },
  description:
    "The simplest DocuSign alternative built for speed. Send contracts, NDAs, and proposals in under 3 minutes. Your clients sign instantly—no login, no app download, no friction. $12/month for unlimited signing.",
  keywords: [
    "e-signature for freelancers",
    "e-signature for consultants",
    "docusign alternative",
    "simple docusign alternative",
    "no account e-signature",
    "e-signature no account needed",
    "freelance contract signing",
    "sign nda online",
    "consultant contract signing",
    "lightweight document signing",
    "simple e-signature tool",
    "hellosign alternative",
    "pandadoc alternative",
    "adobe sign alternative",
    "mobile e-signature",
    "fast contract signing",
    "cheap docusign alternative",
    "affordable e-signature",
    "sign documents online no account",
    "electronic signature for small business",
    "consulting agreement signing",
    "freelancer esignature",
    "no login document signing",
  ],
  authors: [{ name: "BoopSign Team" }],
  creator: "BoopSign",
  publisher: "BoopSign",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://boopsign.com",
    siteName: "BoopSign",
    title: "BoopSign — E-Signature for Freelancers & Consultants | No Account Required",
    description:
      "The simplest DocuSign alternative. Send contracts, NDAs, and proposals in under 3 minutes. No login required for signers. $12/month for unlimited signing.",
    images: [
      {
        url: "https://boopsign.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "BoopSign - Simple E-Signature for Freelancers & Consultants",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BoopSign — E-Signature for Freelancers & Consultants",
    description:
      "The simplest DocuSign alternative. Get contracts signed in under 3 minutes. No account needed for signers. $12/month.",
    images: ["https://boopsign.com/og-image.png"],
    creator: "@boopsign",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "It-5F-rGTphiGn4oyRrSntPBqgQWbUohNCFKsdQ922M",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="It-5F-rGTphiGn4oyRrSntPBqgQWbUohNCFKsdQ922M"
        />
        <link rel="canonical" href="https://boopsign.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "BoopSign",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web, iOS, Android",
              offers: {
                "@type": "Offer",
                price: "12",
                priceCurrency: "USD",
                priceValidUntil: "2025-12-31",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                ratingCount: "127",
              },
              description:
                "E-signature for freelancers and consultants. The simplest DocuSign alternative built for speed. No account required for signers. Sign contracts, NDAs, and proposals in under 3 minutes.",
              url: "https://boopsign.com",
              featureList: [
                "No account required for signers",
                "Mobile-optimized e-signatures",
                "Legally binding audit trail",
                "Unlimited document signing",
                "3-minute setup",
                "Bank-level security"
              ],
              audience: {
                "@type": "Audience",
                audienceType: "Freelancers, Consultants, Small Businesses"
              }
            }),
          }}
        />
      </head>
      <body className={`antialiased relative`}>
        <Suspense>
          <ClerkProvider
            signInUrl="/sign-in"
            signUpUrl="/sign-up"
            signUpForceRedirectUrl={"/callback"}
            signInForceRedirectUrl={"/dashboard"}
          >
            <ConvexClientProvider>
              <PdfDimensionsProvider>{children}</PdfDimensionsProvider>
            </ConvexClientProvider>
          </ClerkProvider>
        </Suspense>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
