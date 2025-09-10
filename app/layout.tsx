import "./globals.css";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { PdfDimensionsProvider } from "@/components/PdfDimensionsContext";
import { Metadata, Viewport } from "next";
import { Suspense } from "react";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://boopsign.com"),
  title: {
    default:
      "BoopSign - DocuSign Alternative | 3x Faster Electronic Signatures",
    template: "%s | BoopSign",
  },
  description:
    "Electronic signature software that's 3x faster and 50% cheaper than DocuSign. No login required for signers. Mobile-first design. Start free 7-day trial.",
  keywords: [
    "docusign alternative",
    "electronic signature software",
    "esignature platform",
    "mobile document signing",
    "online signature tool",
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
    title: "BoopSign - The DocuSign Alternative That Actually Works on Mobile",
    description:
      "Sign documents in 3 minutes, not 30. Mobile-first electronic signatures with no login required for signers.",
    images: [
      {
        url: "https://boopsign.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "BoopSign - Fast Mobile Electronic Signatures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BoopSign - 3x Faster and 50 % Cheaper Than DocuSign",
    description:
      "Electronic signatures that actually work on mobile. No login required for signers.",
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
                "Electronic signature software that's 3x faster than DocuSign with mobile-first design",
              url: "https://boopsign.com",
            }),
          }}
        />
      </head>
      <body className={`${plusJakartaSans.variable} antialiased relative`}>
        <Suspense>
          <ClerkProvider>
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
