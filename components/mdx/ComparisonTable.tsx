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
        <h2 className="text-3xl font-bold mb-12">{title}</h2>
        <div className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                {headers.map((header, idx) => (
                  <th key={idx} className={`py-4 px-6 font-semibold ${idx === 1 ? "text-blue-600" : idx > 1 ? "text-gray-500" : ""}`}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((row, idx) => (
                <tr key={idx}>
                  <td className="py-4 px-6">{row.feature}</td>
                  <td className="py-4 px-6 font-bold text-green-600">{row.us}</td>
                  <td className="py-4 px-6">{row.them}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}