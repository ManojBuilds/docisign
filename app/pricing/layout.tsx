import { ClientHeaderWrapper } from "@/components/ClientHeaderWrapper";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing for Solo Entrepreneurs | Boopsign - $19-39/month",
  description:
    "Simple pricing for solo entrepreneurs: Starter $19/month (20 signatures) or Professional $39/month (75 signatures). No hidden fees. 14-day free trial.",
  keywords: [
    "e-signature for solo entrepreneurs",
    "e-signature pricing",
    "simple esignature pricing",
    "docusign alternative for solos",
    "affordable esignature tool",
  ],
  openGraph: {
    title: "Simple Pricing for Solo Entrepreneurs | Boopsign",
    description:
      "Starter: $19/month (20 signatures). Professional: $39/month (75 signatures). No hidden fees. 14-day free trial.",
    url: "https://boopsign.com/pricing",
    images: [
      {
        url: "https://boopsign.com/images/og-pricing.jpg",
        width: 1200,
        height: 630,
        alt: "Boopsign Pricing for Solo Entrepreneurs",
      },
    ],
  },
  alternates: {
    canonical: "https://boopsign.com/pricing",
  },
};
export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              ratingCount: "20",
              bestRating: "5",
              worstRating: "1"
            },
            description: "E-signature tool built for solo entrepreneurs. No client accounts required. 92% completion rate.",
            featureList: [
              "No client account required",
              "92% completion rate",
              "Mobile-first signing",
              "Custom branding",
              "Template library",
              "Priority support"
            ]
          }),
        }}
      />
      <ClientHeaderWrapper />
      <main className="flex flex-grow flex-col">{children}</main>
      <Footer />
    </div>
  );
}
