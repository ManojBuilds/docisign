import ConvexClientProvider from "@/components/ConvexClientProvider";
import { PdfDimensionsProvider } from "@/components/PdfDimensionsContext";
import { PendingDocumentProcessor } from "@/components/PendingDocumentProcessor";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import NextTopLoader from 'nextjs-toploader';
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://boopsign.com"),
  title: {
    default: "BoopSign - E-Signature Software Built for Freelancers & Consultants | $15/mo",
    template: "%s | BoopSign",
  },
  description:
    "The e-signature tool freelancers love. No client accounts required. Get contracts signed in 3 minutes, not 3 days. 52% cheaper than DocuSign. Try free for 7 days.",
  keywords: [
    "esignature for freelancers",
    "no account esignature",
    "docusign alternative for freelancers",
    "sign contracts without login",
    "mobile contract signing",
    "freelance contract signing",
    "simple esignature tool",
    "boopsign vs docusign",
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
    title: "BoopSign — Get Contracts Signed Without Client Accounts",
    description:
      "Upload a PDF, send a link, and get contracts signed in minutes. No login required for clients. Built for freelancers and consultants.",
    images: [
      {
        url: "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9PguH6XLCcu9EJNUBXDqbifMz2VCdc7u8YS9Zvn5",
        width: 1200,
        height: 630,
        alt: "BoopSign - Simple E-Signature for Freelancers & Consultants",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "No-Account E-Signatures for Freelancers | BoopSign",
    description:
      "The simplest DocuSign alternative. Get contracts signed in under 3 minutes. No account needed for signers. $15/month.",
    images: ["https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9PguH6XLCcu9EJNUBXDqbifMz2VCdc7u8YS9Zvn5"],
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

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
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
                price: "15",
                priceCurrency: "USD",
                priceValidUntil: "2026-12-31",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5",
                ratingCount: "10",
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
      <body className={`antialiased relative ${bricolage.variable} ${inter.variable}`}>
        <NextTopLoader
          color="#2563eb"
          height={3}
          showSpinner={false}
          speed={200}
          shadow="0 0 10px #2563eb,0 0 5px #2563eb"
          crawl={true}
          crawlSpeed={200}
        />
        <Suspense>
          <ClerkProvider>
            <ConvexClientProvider>
              <PendingDocumentProcessor />
              <PdfDimensionsProvider>{children}</PdfDimensionsProvider>
            </ConvexClientProvider>
          </ClerkProvider>
        </Suspense>
        <Toaster position="top-center" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
