"use client"
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Check, X, Star, Users, Clock, Shield, Smartphone, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ComparisonFeature {
  category: string;
  feature: string;
  boopSign: {
    value: string | boolean;
    highlight?: boolean;
    tooltip?: string;
  };
  docuSign: {
    value: string | boolean;
    highlight?: boolean;
    tooltip?: string;
  };
  important?: boolean;
}

const comparisonData: ComparisonFeature[] = [
  // Pricing Category
  {
    category: "Pricing",
    feature: "Monthly Cost (Individual)",
    boopSign: { value: "$12/month", highlight: true },
    docuSign: { value: "$25/month", highlight: false },
    important: true
  },
  {
    category: "Pricing",
    feature: "Monthly Cost (3 users)",
    boopSign: { value: "$36/month", highlight: true },
    docuSign: { value: "$75/month", highlight: false },
    important: true
  },
  {
    category: "Pricing",
    feature: "Setup Fees",
    boopSign: { value: "$0", highlight: true },
    docuSign: { value: "$0" }
  },
  {
    category: "Pricing",
    feature: "Free Trial",
    boopSign: { value: "7 days", highlight: true },
    docuSign: { value: "30 days" }
  },
  // Mobile Experience
  {
    category: "Mobile Experience",
    feature: "App Download Required",
    boopSign: { value: false, highlight: true },
    docuSign: { value: true },
    important: true
  },
  {
    category: "Mobile Experience",
    feature: "Mobile Signing Time",
    boopSign: { value: "Under 3 minutes", highlight: true },
    docuSign: { value: "7-12 minutes" },
    important: true
  },
  {
    category: "Mobile Experience",
    feature: "Mobile-First Design",
    boopSign: { value: true, highlight: true },
    docuSign: { value: false },
    important: true
  },
  {
    category: "Mobile Experience",
    feature: "Touch-Optimized Interface",
    boopSign: { value: true, highlight: true },
    docuSign: { value: "Partial" }
  },
  // User Experience
  {
    category: "User Experience",
    feature: "Account Creation (Signers)",
    boopSign: { value: false, highlight: true },
    docuSign: { value: true },
    important: true
  },
  {
    category: "User Experience",
    feature: "Document Setup Time",
    boopSign: { value: "Under 2 minutes", highlight: true },
    docuSign: { value: "5-8 minutes" },
    important: true
  },
  {
    category: "User Experience",
    feature: "Learning Curve",
    boopSign: { value: "None", highlight: true },
    docuSign: { value: "Moderate" }
  },
  {
    category: "User Experience",
    feature: "Email Delivery Issues",
    boopSign: { value: "Rare", highlight: true },
    docuSign: { value: "Common" },
    important: true
  },
  // Features
  {
    category: "Features",
    feature: "Document Formats Supported",
    boopSign: { value: "PDF, DOC, DOCX" },
    docuSign: { value: "PDF, DOC, DOCX, PPT, XLS" }
  },
  {
    category: "Features",
    feature: "Templates",
    boopSign: { value: "Coming Soon" },
    docuSign: { value: true }
  },
  {
    category: "Features",
    feature: "Bulk Send",
    boopSign: { value: "Coming Soon" },
    docuSign: { value: true }
  },
  {
    category: "Features",
    feature: "API Access",
    boopSign: { value: "Coming Soon" },
    docuSign: { value: true }
  },
  // Security & Compliance
  {
    category: "Security & Compliance",
    feature: "ESIGN Act Compliant",
    boopSign: { value: true },
    docuSign: { value: true }
  },
  {
    category: "Security & Compliance",
    feature: "UETA Compliant",
    boopSign: { value: true },
    docuSign: { value: true }
  },
  {
    category: "Security & Compliance",
    feature: "SOC 2 Type II",
    boopSign: { value: "In Progress" },
    docuSign: { value: true }
  },
  {
    category: "Security & Compliance",
    feature: "Data Encryption",
    boopSign: { value: "AES-256" },
    docuSign: { value: "AES-256" }
  }
];

const categoryIcons = {
  "Pricing": CreditCard,
  "Mobile Experience": Smartphone,
  "User Experience": Users,
  "Features": Star,
  "Security & Compliance": Shield
};

const ComparasionTable = ({ className }: { className?: string }) => {
  const [activeCategory, setActiveCategory] = useState<string>("Pricing");
  const categories = Array.from(new Set(comparisonData.map(item => item.category)));
  
  const renderValue = (value: string | boolean, highlight?: boolean, isBoopSign?: boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className={`w-5 h-5 mx-auto ${highlight ? 'text-primary' : 'text-muted-foreground'}`} />
      ) : (
        <X className={`w-5 h-5 mx-auto ${highlight ? 'text-destructive' : 'text-muted-foreground'}`} />
      );
    }
    
    return (
      <span className={`${highlight ? (isBoopSign ? 'text-primary font-semibold' : 'text-foreground font-semibold') : 'text-muted-foreground'}`}>
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            BoopSign vs DocuSign
          </h2>
          <p className="text-xl md:text-2xl mb-4 text-muted-foreground">
            Why 1000+ businesses switched to BoopSign
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Built for mobile-first signing, 3x faster setup, 50% cheaper pricing
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
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="py-4 px-6 text-left font-semibold">
                    Features
                  </th>
                  <th className="py-4 px-6 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full font-semibold">
                        BoopSign
                      </div>
                      <span className="text-xs text-primary font-medium">3x Faster</span>
                    </div>
                  </th>
                  <th className="py-4 px-6 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full font-semibold">
                        DocuSign
                      </div>
                      <span className="text-xs text-muted-foreground">Industry Standard</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr 
                    key={`${item.category}-${item.feature}`} 
                    className={cn(
                      "border-b transition-colors hover:bg-muted/30",
                      item.important && "bg-accent/20"
                    )}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {item.important && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                        <span className={item.important ? 'font-semibold' : ''}>
                          {item.feature}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {renderValue(item.boopSign.value, item.boopSign.highlight, true)}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {renderValue(item.docuSign.value, item.docuSign.highlight, false)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Benefits Summary */}
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <Clock className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-semibold text-lg mb-2">3x Faster</h3>
            <p className="text-muted-foreground text-sm">
              Documents signed in under 3 minutes vs 7-12 minutes
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <CreditCard className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-semibold text-lg mb-2">50% Cheaper</h3>
            <p className="text-muted-foreground text-sm">
              $12/month vs DocuSign&apos;s $25/month starting price
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
          <h3 className="text-2xl font-bold mb-4">Ready to Switch?</h3>
          <p className="text-lg mb-6 text-muted-foreground">
            Join 1000+ businesses that made the switch to BoopSign
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
            * Pricing as of September 2025. DocuSign pricing may vary by plan and features.
            <br />
            Blue dots indicate key differentiating features.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ComparasionTable;
