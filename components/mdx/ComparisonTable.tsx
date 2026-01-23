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
    <section className="py-24 md:py-32 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            {title}
          </h2>
        </div>
        <div className="rounded-[2rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden overflow-x-auto bg-white p-2">
          <Table className="text-left border-separate border-spacing-0">
            <TableHeader>
              <TableRow className="border-none hover:bg-transparent">
                {headers.map((header, idx) => (
                  <TableHead key={idx} className={`h-16 px-8 text-base font-bold tracking-tight ${idx === 1 ? "bg-primary text-white rounded-t-2xl" : "text-slate-500"}`}>
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, idx) => (
                <TableRow key={idx} className="border-b border-slate-50 last:border-none hover:bg-slate-50/50 transition-colors group">
                  <TableCell className="px-8 py-6 text-base font-medium text-slate-700">{row.feature}</TableCell>
                  <TableCell className={`px-8 py-6 text-base font-bold ${idx === rows.length - 1 ? "rounded-b-2xl" : ""} bg-primary/5 text-primary`}>
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px]">✓</span>
                      {row.us}
                    </div>
                  </TableCell>
                  <TableCell className="px-8 py-6 text-base text-slate-500">{row.them}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}