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
    feature: "Starting Price",
    Boopsign: { value: "$19/month", highlight: true },
    competitor: { value: `$${competitorPrice}/month`, highlight: false },
  },
  {
    feature: "Client Account Required",
    Boopsign: { value: false, highlight: true },
    competitor: { value: true, highlight: false },
  },
  {
    feature: "Page Load Speed",
    Boopsign: { value: "< 2 seconds", highlight: true },
    competitor: { value: "12-15 seconds", highlight: false },
  },
  {
    feature: "Mobile-Optimized",
    Boopsign: { value: true, highlight: true },
    competitor: { value: false, highlight: false },
  },
  {
    feature: "Signature Completion Rate",
    Boopsign: { value: "92%", highlight: true },
    competitor: { value: "63-68%", highlight: false },
  },
  {
    feature: "Average Signing Time",
    Boopsign: { value: "90 seconds", highlight: true },
    competitor: { value: "4+ days", highlight: false },
  },
  {
    feature: "Custom Branding",
    Boopsign: { value: "Included", highlight: true },
    competitor: { value: "Paid add-on", highlight: false },
  },
];

const SmallComparasionTable = ({ competitorName, competitorPrice, className }: ComparasionTableProps) => {
  const comparisonData = getComparisonData(competitorPrice);

  const renderValue = (value: string | boolean, highlight?: boolean, isBoopsign?: boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className={`w-5 h-5 mx-auto ${highlight ? 'text-emerald-600' : 'text-muted-foreground'}`} />
      ) : (
        <X className={`w-5 h-5 mx-auto ${highlight ? 'text-red-500' : 'text-muted-foreground'}`} />
      );
    }

    return (
      <span className={`${highlight ? (isBoopsign ? 'text-blue-600 font-bold' : 'text-foreground font-semibold') : 'text-muted-foreground font-medium'}`}>
        {value}
      </span>
    );
  };

  return (
    <div className={cn("border-2 border-slate-200 rounded-xl my-8 not-prose overflow-hidden shadow-sm", className)}>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-slate-50 to-blue-50/30 border-b-2 border-slate-200">
              <TableHead className="text-left font-bold text-slate-900 text-base py-4">
                Feature
              </TableHead>
              <TableHead className="text-center py-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1.5 rounded-full font-bold text-sm shadow-sm">
                    Boopsign
                  </div>
                </div>
              </TableHead>
              <TableHead className="text-center py-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-slate-200 text-slate-700 px-4 py-1.5 rounded-full font-semibold text-sm">
                    {competitorName}
                  </div>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comparisonData.map((item, index) => (
              <TableRow
                key={item.feature}
                className={cn(
                  "hover:bg-slate-50/50 transition-colors",
                  item.feature === "Client Account Required" && "bg-blue-50/30 ring-1 ring-blue-200/50",
                  index % 2 === 0 && "bg-white",
                  index % 2 === 1 && "bg-slate-50/30"
                )}
              >
                <TableCell className="py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 text-sm">
                      {item.feature}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-center py-4">
                  {renderValue(item.Boopsign.value, item.Boopsign.highlight, true)}
                </TableCell>
                <TableCell className="text-center py-4">
                  {renderValue(item.competitor.value, item.competitor.highlight, false)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer note */}
      <div className="bg-slate-50 border-t border-slate-200 px-4 py-3 text-center">
        <p className="text-xs text-slate-600 font-medium">
          Comparison based on publicly available pricing and industry benchmarks
        </p>
      </div>
    </div>
  );
};

export default SmallComparasionTable;