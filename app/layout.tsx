import ConvexClientProvider from "@/components/ConvexClientProvider";
import { PostHogClientProvider } from "@/components/providers/posthog-provider";
import { PendingDocumentProcessor } from "@/components/PendingDocumentProcessor";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import NextTopLoader from 'nextjs-toploader';
import { Suspense } from "react";
import "./globals.css";


const beVietnamPro = Be_Vietnam_Pro({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});



export const metadata: Metadata = {
  metadataBase: new URL("https://boopsign.com"),
  title: {
    default: "Boopsign - E-Signature Software Built for Freelancers & Consultants | $15/mo",
    template: "%s | Boopsign",
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
    "Boopsign vs docusign",
  ],
  authors: [{ name: "Boopsign Team" }],
  creator: "Boopsign",
  publisher: "Boopsign",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://boopsign.com",
    siteName: "Boopsign",
    title: "Boopsign — Get Contracts Signed Without Client Accounts",
    description:
      "Upload a PDF, send a link, and get contracts signed in minutes. No login required for clients. Built for freelancers and consultants.",
    images: [
      {
        url: "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9PguH6XLCcu9EJNUBXDqbifMz2VCdc7u8YS9Zvn5",
        width: 1200,
        height: 630,
        alt: "Boopsign - Simple E-Signature for Freelancers & Consultants",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "No-Account E-Signatures for Freelancers | Boopsign",
    description:
      "The simplest DocuSign alternative. Get contracts signed in under 3 minutes. No account needed for signers. $15/month.",
    images: ["https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9PguH6XLCcu9EJNUBXDqbifMz2VCdc7u8YS9Zvn5"],
    creator: "@Boopsign",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link rel="preconnect" href="https://majestic-fox-274.convex.cloud" />
        <link rel="preload" href="/optimized-images/noise.webp" as="image" />
        <link rel="canonical" href="https://boopsign.com" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="application-name" content="Boopsign" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta property="og:site_name" content="Boopsign" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:site" content="@Boopsign" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Boopsign",
              image: "https://boopsign.com/android-chrome-192x192.png",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web, iOS, Android",
              offers: [{
                "@type": "Offer",
                price: "15.00",
                priceCurrency: "USD",
                priceValidUntil: "2026-12-31",
                availability: "https://schema.org/InStock",
                url: "https://boopsign.com/pricing",
                name: "Monthly Plan"
              }, {
                "@type": "Offer",
                price: "12.00",
                priceCurrency: "USD",
                priceValidUntil: "2026-12-31",
                availability: "https://schema.org/InStock",
                url: "https://boopsign.com/pricing",
                name: "Annual Plan (billed yearly)"
              }],
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
              },
              publisher: {
                "@type": "Organization",
                name: "Boopsign",
                logo: {
                  "@type": "ImageObject",
                  url: "https://boopsign.com/logo.png"
                }
              }
            }),
          }}
        />
      </head>
      <body className={`${beVietnamPro.className} antialiased relative`}>
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
          <ConvexClientProvider>
            <PostHogClientProvider>
              <PendingDocumentProcessor />
              {children}
            </PostHogClientProvider>
          </ConvexClientProvider>
        </Suspense>
        <Toaster position="top-center" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
