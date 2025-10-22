import PricingFaq from "@/components/PricingFaq";
import { Button } from "@/components/ui/button";
import CompetitorComparisonTable from "@/components/ComparasionTable";
import Link from "next/link";
import { Clock } from "lucide-react";
import Pricing from "@/components/Pricing";

export default function PricingPage() {

  return (
    <div className="min-h-screen bg-background">
      <Pricing />
      <CompetitorComparisonTable className="mt-8" />
      <div className="px-4">
        <PricingFaq />
      </div>

      {/* Final Call-To-Action Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to simplify your document signing?
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of freelancers, small businesses, and consultants who
          trust Boopsign as the best alternative to DocuSign.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" asChild>
            <Link href={"/sign-in"}>
              <Clock className="h-4 w-4 mr-2" />
              Start Your Free 7-Day Trial Today
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground">
            No credit card required • Setup in under 3 minutes
          </p>
        </div>
      </div>
    </div>
  );
}
