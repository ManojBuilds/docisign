"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const competitors = [
  { name: "Docisign", price: "$12", limit: "Unlimited", users: "1 user (No team support)" },
  { name: "DocuSign", price: "$66", limit: "100 documents/month", users: "1 user (Team plans available)" },
  { name: "PandaDoc", price: "$49", limit: "Unlimited", users: "1 user (Team plans available)" },
  { name: "HelloSign", price: "$15", limit: "Unlimited", users: "1 user (Team plans available)" },
];

export default function CompetitorComparisonTable() {
  const yearlySavings = 66 * 12 - 12 * 12; // DocuSign annual minus Docisign annual approx.

  return (
    <div className="overflow-x-auto bg-muted/30 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Compare Docisign vs DocuSign, PandaDoc & HelloSign
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
          Docisign offers a fast, simple, and affordable e-signature platform with unlimited document signing but currently does not support team accounts.
        </p>
        <Table className="min-w-[600px]">
          <TableHeader>
            <TableRow className="border-b border-gray-300">
              <TableHead className="text-left">Platform</TableHead>
              <TableHead className="text-left">Monthly Price</TableHead>
              <TableHead className="text-left">Document Limit</TableHead>
              <TableHead className="text-left">Users Included</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {competitors.map((competitor) => (
              <TableRow
                key={competitor.name}
                className={competitor.name === "Docisign" ? "bg-primary/10 border border-primary" : undefined}
              >
                <TableCell className="font-medium flex items-center gap-2">
                  {competitor.name}
                  {competitor.name === "Docisign" && (
                    <span className="bg-primary text-white px-2 py-0.5 rounded text-xs font-semibold">
                      Our Product
                    </span>
                  )}
                </TableCell>
                <TableCell>{competitor.price}/month</TableCell>
                <TableCell>{competitor.limit}</TableCell>
                <TableCell>{competitor.users}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-8 text-lg font-semibold text-green-600">
          Save approximately <span className="text-xl">${yearlySavings}</span> per year compared to DocuSign.
        </div>
      </div>
    </div>
  );
}
