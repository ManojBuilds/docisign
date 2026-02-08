import { ClientHeaderWrapper } from "@/components/ClientHeaderWrapper";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing - $16/Month | No Hidden Fees | Boopsign",
  description:
    "Simple pricing: Starter plan $19/month (20 signature requests) and Professional plan $39/month (75 signature requests). 14-day free trial. No per-user fees, no hidden costs. Compare vs DocuSign and save.",
  keywords: [
    "Boopsign pricing",
    "docusign alternative pricing",
    "electronic signature pricing",
    "cheap esignature software",
    "affordable document signing",
  ],
  openGraph: {
    title: "Boopsign Pricing - Starter $19/Month vs Professional $39/Month",
    description:
      "Simple, transparent pricing: Starter ($19/month) includes 20 signature requests, Professional ($39/month) includes 75 requests. Compare vs DocuSign with better mobile experience.",
    url: "https://boopsign.com/pricing",
    images: [
      {
        url: "https://boopsign.com/images/og-pricing.jpg",
        width: 1200,
        height: 630,
        alt: "Boopsign vs DocuSign Pricing Comparison",
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
            name: "Boopsign Electronic Signature Software",
            image: "https://boopsign.com/icon-192x192.png", // Using app icon as product image
            description: "Mobile-first electronic signature platform",
            brand: {
              "@type": "Brand",
              name: "Boopsign"
            },
            offers: [{
              "@type": "Offer",
              url: "https://boopsign.com/pricing",
              price: "19.00",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              priceValidUntil: "2026-12-31",
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
              seller: {
                "@type": "Organization",
                name: "Boopsign"
              },
              name: "Starter Monthly Plan (20 signature requests)"
            }, {
              "@type": "Offer",
              url: "https://boopsign.com/pricing",
              price: "16.00",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              priceValidUntil: "2026-12-31",
              seller: {
                "@type": "Organization",
                name: "Boopsign"
              },
              name: "Starter Annual Plan (billed yearly, 20 signature requests)"
            }, {
              "@type": "Offer",
              url: "https://boopsign.com/pricing",
              price: "39.00",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              priceValidUntil: "2026-12-31",
              seller: {
                "@type": "Organization",
                name: "Boopsign"
              },
              name: "Professional Monthly Plan (75 signature requests)"
            }, {
              "@type": "Offer",
              url: "https://boopsign.com/pricing",
              price: "32.00",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              priceValidUntil: "2026-12-31",
              seller: {
                "@type": "Organization",
                name: "Boopsign"
              },
              name: "Professional Annual Plan (billed yearly, 75 signature requests)"
            }],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "24",
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
                name: "Alex Rivera"
              },
              reviewBody: "The best e-signature tool for freelancers. Simple, fast, and affordable."
            }
          }),
        }}
      />
      <ClientHeaderWrapper />
      <main className="flex flex-grow flex-col">{children}</main>
      <Footer />
    </div>
  );
}
