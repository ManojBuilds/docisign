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

export default function PricingPage() {

  return (
    <div className="min-h-screen bg-background">
      <Pricing />
      <TestimonialsSection />
      <CompetitorComparisonTable competitorName="Top Competitor" competitorPrice={30} />
      <PricingFaq />
    </div>
  );
}
