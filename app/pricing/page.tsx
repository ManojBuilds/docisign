import CompetitorComparisonTable from "@/components/ComparasionTable";
import Pricing from "@/components/Pricing";
import PricingFaq from "@/components/PricingFaq";
import TestimonialsSection from "@/components/testimonials";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Boopsign Pricing - $20/mo for Freelancers | No Per-User Fees",
  description: "Simple, transparent pricing for freelancers. $20/month for unlimited documents. No per-user fees, no hidden costs. Compare vs DocuSign and save 50%.",
  alternates: {
    canonical: "https://Boopsign.com/pricing",
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
