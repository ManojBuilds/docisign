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
    default: "BoopSign — Sign Documents Online Instantly (No Account Needed)",
    template: "%s | BoopSign",
  },
  description:
    "Send and sign documents online without creating an account. Perfect for freelancers and small teams. Upload, share, and get secure e-signatures instantly.",
  keywords: [
    "sign documents online",
    "no account",
    "quick e-sign tool",
    "send contract for signature instantly",
    "digital signature app for freelancers",
    "document signing for freelancers",
    "business e-signature tool",
    "secure e-signature",
    "instant document signing",
    "free document signing",
    "simple e-signature pricing",
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
    title: "BoopSign — Fast, No-Login Document Signing",
    description:
      "A simpler way to sign PDFs online. Secure, verified, and fast.",
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
    title: "BoopSign — Fast, No-Login Document Signing",
    description:
      "A simpler way to sign PDFs online. Secure, verified, and fast.",
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
