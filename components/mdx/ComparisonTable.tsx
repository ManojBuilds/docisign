import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ComparisonTableRow {
  feature: string;
  us: string;
  them: string;
}

interface ComparisonTableProps {
  title: string;
  headers: string[];
  rows: ComparisonTableRow[];
}

export default function ComparisonTable({ title, headers, rows }: ComparisonTableProps) {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-semibold mb-12">{title}</h2>
        <div className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
          <Table className="text-left">
            <TableHeader>
              <TableRow>
                {headers.map((header, idx) => (
                  <TableHead key={idx} className={`font-semibold ${idx === 1 ? "text-blue-600" : idx > 1 ? "text-gray-500" : ""}`}>
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className="divide-gray-100">
              {rows.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>{row.feature}</TableCell>
                  <TableCell className="font-semibold text-green-600">{row.us}</TableCell>
                  <TableCell>{row.them}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}