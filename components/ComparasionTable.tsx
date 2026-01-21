"use client"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Clock, CreditCard, Shield, Smartphone, Star, Users, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useState } from "react";

interface ComparisonFeature {
  category: string;
  feature: string;
  Boopsign: {
    value: string | boolean;
    highlight?: boolean;
    tooltip?: string;
  };
  competitor: {
    value: string | boolean;
    highlight?: boolean;
    tooltip?: string;
  };
  important?: boolean;
}

interface ComparasionTableProps {
  competitorName: string;
  competitorPrice: string | number;
  className?: string;
}

const getComparisonData = (competitorPrice: string | number): ComparisonFeature[] => [
  // Pricing Category
  {
    category: "Pricing",
    feature: "Monthly Cost (Individual)",
    Boopsign: { value: "$20/month", highlight: true },
    competitor: { value: `$${competitorPrice}/month`, highlight: false },
    important: true
  },
  {
    category: "Pricing",
    feature: "Setup Fees",
    Boopsign: { value: "$0", highlight: true },
    competitor: { value: "$0" }
  },
  {
    category: "Pricing",
    feature: "Free Trial",
    Boopsign: { value: "7 days", highlight: true },
    competitor: { value: "30 days" }
  },
  // Mobile Experience
  {
    category: "Mobile Experience",
    feature: "App Download Required",
    Boopsign: { value: false, highlight: true },
    competitor: { value: true },
    important: true
  },
  {
    category: "Mobile Experience",
    feature: "Mobile Signing Time",
    Boopsign: { value: "Under 90 seconds", highlight: true },
    competitor: { value: "7-12 minutes" },
    important: true
  },
  {
    category: "Mobile Experience",
    feature: "Mobile-First Design",
    Boopsign: { value: true, highlight: true },
    competitor: { value: false },
    important: true
  },
  {
    category: "Mobile Experience",
    feature: "Touch-Optimized Interface",
    Boopsign: { value: true, highlight: true },
    competitor: { value: "Partial" }
  },
  // User Experience
  {
    category: "User Experience",
    feature: "Client account required",
    Boopsign: { value: false, highlight: true },
    competitor: { value: true },
    important: true
  },
  {
    category: "User Experience",
    feature: "Document Setup Time",
    Boopsign: { value: "Instantly", highlight: true },
    competitor: { value: "5-8 minutes" },
    important: true
  },
  {
    category: "User Experience",
    feature: "Learning Curve",
    Boopsign: { value: "None", highlight: true },
    competitor: { value: "Moderate" }
  },
  {
    category: "User Experience",
    feature: "Email Delivery Issues",
    Boopsign: { value: "Rare", highlight: true },
    competitor: { value: "Common" },
    important: true
  },
  // Features
  {
    category: "Features",
    feature: "Document Formats Supported",
    Boopsign: { value: "PDF, DOC, DOCX" },
    competitor: { value: "PDF, DOC, DOCX, PPT, XLS" }
  },
  {
    category: "Features",
    feature: "Templates",
    Boopsign: { value: true },
    competitor: { value: true }
  },
  // Security & Compliance
  {
    category: "Security & Compliance",
    feature: "ESIGN Act Compliant",
    Boopsign: { value: true },
    competitor: { value: true }
  },
  {
    category: "Security & Compliance",
    feature: "UETA Compliant",
    Boopsign: { value: true },
    competitor: { value: true }
  },
  {
    category: "Security & Compliance",
    feature: "SOC 2 Type II",
    Boopsign: { value: true },
    competitor: { value: true }
  },
  {
    category: "Security & Compliance",
    feature: "Data Encryption",
    Boopsign: { value: "AES-256" },
    competitor: { value: "AES-256" }
  }
];

const categoryIcons = {
  "Pricing": CreditCard,
  "Mobile Experience": Smartphone,
  "User Experience": Users,
  "Features": Star,
  "Security & Compliance": Shield
};

const ComparasionTable = ({ competitorName, competitorPrice, className }: ComparasionTableProps) => {
  const [activeCategory, setActiveCategory] = useState<string>("Pricing");
  const comparisonData = getComparisonData(competitorPrice);
  const categories = Array.from(new Set(comparisonData.map(item => item.category)));

  const renderValue = (value: string | boolean, highlight?: boolean, isBoopsign?: boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className={`w-5 h-5 mx-auto ${highlight ? 'text-primary' : 'text-muted-foreground'}`} />
      ) : (
        <X className={`w-5 h-5 mx-auto ${highlight ? 'text-destructive' : 'text-muted-foreground'}`} />
      );
    }

    return (
      <span className={`${highlight ? (isBoopsign ? 'text-primary font-semibold' : 'text-foreground font-semibold') : 'text-muted-foreground'}`}>
        {value}
      </span>
    );
  };

  const filteredData = comparisonData.filter(item => item.category === activeCategory);

  return (
    <section
      className={cn(
        "py-16 md:py-24 px-4",
        className,
      )}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6">
            Boopsign vs {competitorName}
          </h2>
          <p className="text-xl md:text-2xl mb-4 text-muted-foreground">
            Why 1000+ businesses switched to Boopsign
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Built for mobile-first signing, 12x faster setup, 50% cheaper pricing
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => {
            const Icon = categoryIcons[category as keyof typeof categoryIcons];
            return (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className="flex items-center gap-2"
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{category}</span>
              </Button>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div className="border rounded-lg">
          <div className="p-6 border-b">
            <h3 className="text-xl font-semibold">
              {activeCategory} Comparison
            </h3>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left font-semibold">
                    Features
                  </TableHead>
                  <TableHead className="text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full font-semibold">
                        Boopsign
                      </div>
                      <span className="text-xs text-primary font-medium">12x Faster</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full font-semibold">
                        {competitorName}
                      </div>
                      <span className="text-xs text-muted-foreground">Industry Standard</span>
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow
                    key={`${item.category}-${item.feature}`}
                    className={cn(
                      item.important && "bg-accent/20",
                      item.feature === "Client account required" && "bg-primary/5 ring-1 ring-primary/20"
                    )}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {item.important && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                        <span className={item.important ? 'font-semibold' : ''}>
                          {item.feature}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {renderValue(item.Boopsign.value, item.Boopsign.highlight, true)}
                    </TableCell>
                    <TableCell className="text-center">
                      {renderValue(item.competitor.value, item.competitor.highlight, false)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Key Benefits Summary */}
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <Clock className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-semibold text-lg mb-2">12x Faster</h3>
            <p className="text-muted-foreground text-sm">
              Documents signed in under 3 minutes vs 7-12 minutes
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <CreditCard className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-semibold text-lg mb-2">50% Cheaper</h3>
            <p className="text-muted-foreground text-sm">
              $20/month vs {competitorName}&apos;s ${competitorPrice}/month starting price
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Smartphone className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-semibold text-lg mb-2">Mobile-First</h3>
            <p className="text-muted-foreground text-sm">
              No app download required, works perfectly on phones
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 py-12 border-t">
          <h3 className="text-2xl font-semibold mb-4">Ready to Switch?</h3>
          <p className="text-lg mb-6 text-muted-foreground">
            Join 1000+ businesses that made the switch to Boopsign
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-in">
              <Button size="lg">
                Start 7-Day Free Trial
              </Button>
            </Link>
            {/* <Button variant="outline" size="lg">
              See Live Demo
            </Button> */}
          </div>
        </div>

        {/* Fine Print */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            * Pricing as of September 2026. {competitorName} pricing may vary by plan and features.
            <br />
            Blue dots indicate key differentiating features.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ComparasionTable;
