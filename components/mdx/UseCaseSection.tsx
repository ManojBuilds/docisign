import StartTrialBtn from "@/components/StartTrialBtn";
import { CheckCircle } from "lucide-react";

interface UseCaseItem {
  label: string;
  value: string;
}

interface UseCaseSectionProps {
  title: string;
  items: string[];
  stats?: UseCaseItem[];
}

export default function UseCaseSection({ title, items, stats }: UseCaseSectionProps) {
  return (
    <section className="px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
              {title}
            </h2>
            <ul className="space-y-4 text-lg text-gray-700">
              {items.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 w-6 h-6" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <StartTrialBtn />
            </div>
          </div>
          {stats && stats.length > 0 && (
            <div className="flex-1 grid grid-cols-2 gap-4">
              {stats.map((stat, idx) => (
                <div 
                  key={idx} 
                  className={`${idx % 2 === 0 ? "bg-slate-900" : "bg-blue-600"} p-8 rounded-2xl text-white flex flex-col justify-between aspect-square ${idx === 1 ? "mt-8" : ""}`}
                >
                  <div className="text-4xl font-bold">{stat.value}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}