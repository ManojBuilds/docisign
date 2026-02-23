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
  metadataBase: new URL("https://www.boopsign.com"),
  title: {
    default: "Best E-Signature Tool for Solo Entrepreneurs | Boopsign",
    template: "%s | Boopsign",
  },
  description:
    "Get contracts signed fast with no client account friction. Built for solo entrepreneurs. Pages load fast. From $19/month.",
  keywords: [
    "e-signature for solo entrepreneurs",
    "e-signature for freelancers",
    "e-signature for consultants",
    "simple e-signature tool",
    "no account e-signature",
    "mobile e-signature",
    "docusign alternative for solos",
    "cheap e-signature tool",
    "e-signature without client accounts",
    "fast e-signature tool",
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
    url: "https://www.boopsign.com",
    siteName: "Boopsign",
    title: "Best E-Signature Tool for Solo Entrepreneurs | Boopsign",
    description:
      "No client accounts. Built for solo entrepreneurs at $19-39/month.",
    images: [
      {
        url: "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9PguH6XLCcu9EJNUBXDqbifMz2VCdc7u8YS9Zvn5",
        width: 1200,
        height: 630,
        alt: "Boopsign - E-Signature for Solo Entrepreneurs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "E-Signature Tool for Solo Entrepreneurs",
    description:
      "No client accounts. $19-39/month.",
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
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Style+Script&family=Dancing+Script:wght@400..700&family=Great+Vibes&family=Alex+Brush&family=Satisfy&display=swap" rel="stylesheet" />
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
                applicationCategory: "BusinessApplication",
                operatingSystem: "Web, iOS, Android",
                offers: {
                  "@type": "AggregateOffer",
                  "lowPrice": "19",
                  "highPrice": "39",
                  "priceCurrency": "USD",
                  "priceValidUntil": "2026-12-31"
                },
                description: "E-signature tool built for solo entrepreneurs. No client accounts required.",
                featureList: [
                  "No client account required",
                  "Mobile-first signing",
                  "Custom branding",
                  "Template library",
                  "Priority support"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [{
                  "@type": "Question",
                  "name": "Do clients need accounts to sign?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No. Clients click a secure link and sign instantly. No account, no password, no friction."
                  }
                }, {
                  "@type": "Question",
                  "name": "How much does Boopsign cost?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Boopsign offers two plans: Starter at $19/month (20 signatures) and Professional at $39/month (75 signatures). Both include custom branding, mobile-optimized signing, and no client account requirements."
                  }
                }]
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Boopsign",
                "url": "https://www.boopsign.com",
                "logo": "https://www.boopsign.com/android-chrome-192x192.png",
                "description": "E-signature tool built for solo entrepreneurs. No client accounts required.",
                "brand": {
                  "@type": "Brand",
                  "name": "Boopsign"
                },
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "IN"
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
