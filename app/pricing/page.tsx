const Pricing = dynamic(() => import("@/components/Pricing"));
const PricingFaq = dynamic(() => import("@/components/PricingFaq"));
const TestimonialsSection = dynamic(() => import("@/components/testimonials"));
const CompetitorComparisonTable = dynamic(() => import("@/components/ComparasionTable"));
import dynamic from "next/dynamic";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Boopsign Pricing - $15/mo for Freelancers | No Per-User Fees",
  description: "Simple, transparent pricing for freelancers. $15/month for unlimited documents. No per-user fees, no hidden costs. Compare vs DocuSign and save 50%.",
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
            title: "For Freelancers",
            description: "Discover why 2,000+ freelancers choose Boopsign for their contracts.",
            href: "/esignature-for-freelancers",
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
