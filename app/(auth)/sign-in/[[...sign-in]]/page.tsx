import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Loader } from "../../loader";

export const metadata: Metadata = {
  title: "Sign In to Boopsign - Access Your Documents",
  description:
    "Sign in to your Boopsign account to manage documents, track signatures, and send new documents for electronic signing.",
  keywords: [
    "Boopsign login",
    "Boopsign sign in",
    "electronic signature login",
    "document signing account",
  ],
  robots: {
    index: true, // Index login page for branded searches
    follow: true,
  },
  alternates: {
    canonical: "https://boopsign.com/sign-in",
  },
  // No OpenGraph needed for login page
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Sign In for Boopsign",
            description: "Sign In to account for electronic signature software",
            url: "https://boopsign.com/sign-in",
            mainEntity: {
              "@type": "SoftwareApplication",
              name: "Boopsign",
              image: "https://boopsign.com/android-chrome-192x192.png",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                priceValidUntil: "2026-12-31",
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
                description: "7-day free trial",
              },
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
            },
          }),
        }}
      />
      <ClerkLoading>
        <Loader />
      </ClerkLoading>
      <ClerkLoaded>
        <SignIn />
      </ClerkLoaded>
    </>
  );
}

