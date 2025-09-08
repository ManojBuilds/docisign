import Footer from "@/components/Footer";
import { ClientHeaderWrapper } from "@/components/ClientHeaderWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing - $12/Month | No Hidden Fees | BoopSign",
  description:
    "Simple pricing: $12/month for unlimited documents. 7-day free trial. No per-user fees, no hidden costs. 50% cheaper than DocuSign's $25/month plan.",
  keywords: [
    "boopsign pricing",
    "docusign alternative pricing",
    "electronic signature pricing",
    "cheap esignature software",
    "affordable document signing",
  ],
  openGraph: {
    title: "BoopSign Pricing - $12/Month vs DocuSign's $25+",
    description:
      "Simple, transparent pricing. 50% cheaper than DocuSign with better mobile experience.",
    url: "https://boopsign.com/pricing",
    images: [
      {
        url: "https://boopsign.com/images/og-pricing.jpg",
        width: 1200,
        height: 630,
        alt: "BoopSign vs DocuSign Pricing Comparison",
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
            "@type": "Product",
            name: "BoopSign Electronic Signature Software",
            description: "Mobile-first electronic signature platform",
            offers: {
              "@type": "Offer",
              price: "12.00",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              priceValidUntil: "2025-12-31",
            },
          }),
        }}
      />
      <ClientHeaderWrapper />
      <main className="flex flex-grow flex-col">{children}</main>
      <Footer />
    </div>
  );
}
