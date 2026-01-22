"use client"
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ValueWithHighlight {
  value: string | boolean;
  highlight?: boolean;
}

interface ComparisonItem {
  feature: string;
  Boopsign: ValueWithHighlight;
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
    Boopsign: { value: "$15/month", highlight: true },
    competitor: { value: `$${competitorPrice}/month`, highlight: false },
  },
  {
    feature: "App Download Required",
    Boopsign: { value: false, highlight: true },
    competitor: { value: true, highlight: false },
  },
  {
    feature: "Mobile Signing Time",
    Boopsign: { value: "Under 90 seconds", highlight: true },
    competitor: { value: "7-12 minutes", highlight: false },
  },
  {
    feature: "Mobile-First Design",
    Boopsign: { value: true, highlight: true },
    competitor: { value: false, highlight: false },
  },
  {
    feature: "Client account required",
    Boopsign: { value: false, highlight: true },
    competitor: { value: true, highlight: false },
  },
  {
    feature: "Document Setup Time",
    Boopsign: { value: "Instantly", highlight: true },
    competitor: { value: "5-8 minutes", highlight: false },
  },
  {
    feature: "Email Delivery Issues",
    Boopsign: { value: "Rare", highlight: true },
    competitor: { value: "Common", highlight: false },
  },
];

const SmallComparasionTable = ({ competitorName, competitorPrice, className }: ComparasionTableProps) => {
  const comparisonData = getComparisonData(competitorPrice);

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

  return (
    <div className={cn("border rounded-lg my-8 not-prose", className)}>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left font-semibold">
                Key Difference
              </TableHead>
              <TableHead className="text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full font-semibold">
                    Boopsign
                  </div>
                </div>
              </TableHead>
              <TableHead className="text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full font-semibold">
                    {competitorName}
                  </div>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comparisonData.map((item) => (
              <TableRow
                key={item.feature}
                className={cn(
                  item.feature === "Client account required" && "bg-primary/5 ring-1 ring-primary/20"
                )}
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className={'font-semibold'}>
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
  );
};

export default SmallComparasionTable;
