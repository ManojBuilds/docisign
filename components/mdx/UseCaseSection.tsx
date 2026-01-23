import StartTrialBtn from "@/components/StartTrialBtn";
import { CheckCircle } from "lucide-react";
import { Highlighter } from "../ui/highlighter";

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
    <section className="px-4 py-24 bg-slate-50/50">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          <div className="flex-1 w-full">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-slate-900 tracking-tight leading-tight">
              {title}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-lg text-slate-600 mb-10">
              {items.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle className="text-emerald-600 w-4 h-4" />
                  </div>
                  <span className="font-medium text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex justify-center lg:justify-start">
              <div className="scale-110">
                <StartTrialBtn />
              </div>
            </div>
          </div>
          {stats && stats.length > 0 && (
            <div className="flex-1 w-full grid grid-cols-2 gap-6">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className={`${idx % 2 === 0 ? "bg-slate-900 text-white" : "bg-white text-slate-900 border border-slate-200"} p-10 rounded-3xl flex flex-col justify-between aspect-square shadow-xl shadow-slate-200/50 transition-transform hover:-translate-y-2 duration-300 ${idx % 2 !== 0 ? "lg:mt-12" : ""}`}
                >
                  <div className="text-5xl md:text-6xl font-bold tracking-tighter">
                    <Highlighter action="highlight" color={idx % 2 === 0 ? "#1e293b" : "#dbeafe"} iterations={1}>
                      {stat.value}
                    </Highlighter>
                  </div>
                  <div className={`text-sm md:text-base font-medium ${idx % 2 === 0 ? "text-slate-400" : "text-slate-500"}`}>{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}