import ConvexClientProvider from "@/components/ConvexClientProvider";
import { PostHogClientProvider } from "@/components/providers/posthog-provider";
import { PendingDocumentProcessor } from "@/components/PendingDocumentProcessor";
import { Toaster } from "@/components/ui/sonner";
import { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import NextTopLoader from 'nextjs-toploader';
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";


const beVietnamPro = DM_Sans({
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
        <link rel="preconnect" href="https://majestic-fox-274.convex.cloud" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://app.posthog.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://2d9wfb370a.ufs.sh" crossOrigin="anonymous" />
        <link rel="preload" href={`/_next/image?url=${encodeURIComponent("https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9Pgupj8r27wbAQC3TH6iZ98sKJ1Uvou4eYBdxWLO")}&w=384&q=50`} as="image" />
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
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: "Boopsign",
                image: "https://boopsign.com/android-chrome-192x192.png",
                applicationCategory: "BusinessApplication",
                operatingSystem: "Web, iOS, Android",
                softwareVersion: "2026.1",
                screenshot: "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9PguH6XLCcu9EJNUBXDqbifMz2VCdc7u8YS9Zvn5",
                offers: [
                  {
                    "@type": "Offer",
                    price: "15.00",
                    priceCurrency: "USD",
                    priceValidUntil: "2027-12-31",
                    availability: "https://schema.org/InStock",
                    shippingDetails: {
                      "@type": "OfferShippingDetails",
                      shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "USD" },
                      deliveryTime: {
                        "@type": "ShippingDeliveryTime",
                        handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 0, unitCode: "DAY" },
                        transitTime: { "@type": "ShippingDeliveryTime", minValue: 0, maxValue: 0, unitCode: "DAY" }
                      }
                    },
                    hasMerchantReturnPolicy: {
                      "@type": "MerchantReturnPolicy",
                      applicableCountry: "US",
                      returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnPeriod",
                      merchantReturnDays: 7,
                      returnMethod: "https://schema.org/ReturnByMail",
                      returnFees: "https://schema.org/FreeReturn"
                    },
                    url: "https://boopsign.com/pricing",
                    name: "Monthly Plan"
                  },
                  {
                    "@type": "Offer",
                    price: "12.00",
                    priceCurrency: "USD",
                    priceValidUntil: "2027-12-31",
                    availability: "https://schema.org/InStock",
                    shippingDetails: {
                      "@type": "OfferShippingDetails",
                      shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "USD" },
                      deliveryTime: {
                        "@type": "ShippingDeliveryTime",
                        handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 0, unitCode: "DAY" },
                        transitTime: { "@type": "ShippingDeliveryTime", minValue: 0, maxValue: 0, unitCode: "DAY" }
                      }
                    },
                    hasMerchantReturnPolicy: {
                      "@type": "MerchantReturnPolicy",
                      applicableCountry: "US",
                      returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnPeriod",
                      merchantReturnDays: 7,
                      returnMethod: "https://schema.org/ReturnByMail",
                      returnFees: "https://schema.org/FreeReturn"
                    },
                    url: "https://boopsign.com/pricing",
                    name: "Annual Plan (billed yearly)"
                  }
                ],
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: "5.0",
                  ratingCount: "125",
                  bestRating: "5",
                  worstRating: "1"
                },
                review: {
                  "@type": "Review",
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                    bestRating: "5"
                  },
                  author: {
                    "@type": "Person",
                    name: "Marcus Aurelius"
                  },
                  reviewBody: "A refreshingly simple tool that values the signer's time as much as the sender's. Highly recommended for any consultant."
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
                    url: "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9PguaOEZELMW5bk4q23iuyfFhwQdGBN7vjse1zp6"
                  }
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Boopsign",
                "url": "https://boopsign.com",
                "logo": "https://boopsign.com/android-chrome-192x192.png",
                "description": "Mobile-first electronic signature platform for freelancers.",
                "brand": {
                  "@type": "Brand",
                  "name": "Boopsign"
                },
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "US"
                }
              }
            ]),
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
      </body>
    </html>
  );
}
