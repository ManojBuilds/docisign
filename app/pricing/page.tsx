import CompetitorComparisonTable from "@/components/ComparasionTable";
import Pricing from "@/components/Pricing";
import PricingFaq from "@/components/PricingFaq";
import TestimonialsSection from "@/components/testimonials";

export default function PricingPage() {

  return (
    <div className="min-h-screen bg-background">
      <Pricing />
      <TestimonialsSection />
      <CompetitorComparisonTable />
      <PricingFaq />
    </div>
  );
}
