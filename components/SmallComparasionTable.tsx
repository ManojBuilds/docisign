"use client"
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

interface ValueWithHighlight {
  value: string | boolean;
  highlight?: boolean;
}

interface ComparisonItem {
  feature: string;
  boopSign: ValueWithHighlight;
  competitor: ValueWithHighlight;
}

interface ComparasionTableProps {
  competitorName: string;
  competitorPrice: string | number;
  className?: string;
}

const getComparisonData = (competitorPrice: string | number): ComparisonItem[] => [
  {
    feature: "Monthly Cost (Individual)",
    boopSign: { value: "$15/month", highlight: true },
    competitor: { value: `$${competitorPrice}/month`, highlight: false },
  },
  {
    feature: "App Download Required",
    boopSign: { value: false, highlight: true },
    competitor: { value: true, highlight: false },
  },
  {
    feature: "Mobile Signing Time",
    boopSign: { value: "Under 90 seconds", highlight: true },
    competitor: { value: "7-12 minutes", highlight: false },
  },
  {
    feature: "Mobile-First Design",
    boopSign: { value: true, highlight: true },
    competitor: { value: false, highlight: false },
  },
  {
    feature: "Client account required",
    boopSign: { value: false, highlight: true },
    competitor: { value: true, highlight: false },
  },
  {
    feature: "Document Setup Time",
    boopSign: { value: "Instantly", highlight: true },
    competitor: { value: "5-8 minutes", highlight: false },
  },
  {
    feature: "Email Delivery Issues",
    boopSign: { value: "Rare", highlight: true },
    competitor: { value: "Common", highlight: false },
  },
];

const SmallComparasionTable = ({ competitorName, competitorPrice, className }: ComparasionTableProps) => {
  const comparisonData = getComparisonData(competitorPrice);

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

  return (
    <div className={cn("border rounded-lg my-8", className)}>
        <div className="overflow-x-auto">
        <table className="w-full">
            <thead>
            <tr className="border-b bg-muted/30">
                <th className="py-4 px-6 text-left font-semibold">
                Key Difference
                </th>
                <th className="py-4 px-6 text-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full font-semibold">
                    BoopSign
                    </div>
                </div>
                </th>
                <th className="py-4 px-6 text-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full font-semibold">
                    {competitorName}
                    </div>
                </div>
                </th>
            </tr>
            </thead>
            <tbody>
            {comparisonData.map((item) => (
                <tr
                key={item.feature}
                className={cn(
                    "border-b transition-colors hover:bg-muted/30",
                    item.feature === "Client account required" && "bg-primary/5 ring-1 ring-primary/20"
                )}
                >
                <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                    <span className={'font-semibold'}>
                        {item.feature}
                    </span>
                    </div>
                </td>
                <td className="py-4 px-6 text-center">
                    {renderValue(item.boopSign.value, item.boopSign.highlight, true)}
                </td>
                <td className="py-4 px-6 text-center">
                    {renderValue(item.competitor.value, item.competitor.highlight, false)}
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </div>
  );
};

export default SmallComparasionTable;
