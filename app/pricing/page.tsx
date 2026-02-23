const Pricing = dynamic(() => import("@/components/Pricing"));
const PricingFaq = dynamic(() => import("@/components/PricingFaq"));
const TestimonialsSection = dynamic(() => import("@/components/testimonials"));
const CompetitorComparisonTable = dynamic(() => import("@/components/ComparasionTable"));
import dynamic from "next/dynamic";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing for Solo Entrepreneurs | Boopsign - $19-39/month",
  description: "Simple pricing for solo entrepreneurs: Starter $19/month (20 signatures) or Professional $39/month (75 signatures). No client accounts. 7-day free trial.",
  alternates: {
    canonical: "https://boopsign.com/pricing",
  },
};

import { RelatedPages } from "@/components/RelatedPages";

export default function PricingPage() {

  return (
    <div className="min-h-screen bg-background">
      <Pricing />
      <TestimonialsSection />
      <CompetitorComparisonTable competitorName="Top Competitor" competitorPrice={30} />
      <PricingFaq />
      <RelatedPages
        pages={[
          {
            title: "For Solo Entrepreneurs",
            description: "Discover why solo entrepreneurs choose Boopsign for their contracts.",
            href: "/for-solo-entrepreneurs",
            icon: "users"
          },
          {
            title: "DocuSign Alternative",
            description: "See how we compare to DocuSign in features and pricing.",
            href: "/alternatives/docusign-alternative",
            icon: "page"
          },
          {
            title: "Free Contract Templates",
            description: "Access our library of 300+ free contract templates for every niche.",
            href: "/contracts",
            icon: "document"
          }
        ]}
      />
    </div>
  );
}
