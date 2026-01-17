import { allComparisons, type Comparison } from "content-collections";
import { compareDesc, format } from "date-fns";
import { ArrowRight, CheckCircle, Zap } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "BoopSign Alternatives & Comparisons | Better E-Signatures",
  description: "Compare BoopSign with leading e-signature tools. See why freelancers and small businesses are switching to a faster, more affordable, and mobile-first solution.",
};

function ComparisonCard({ comparison }: { comparison: Comparison }) {
  return (
    <Link
      href={comparison.url}
      className="group flex flex-col h-full bg-white border border-slate-200 rounded-3xl overflow-hidden hover:ring-1 hover:ring-blue-600/30 hover:border-blue-600/30 hover:bg-slate-50/10 transition-all duration-500"
    >
      <div className="p-8 md:p-10 flex flex-col h-full">
        <div className="flex items-center gap-3 text-xs font-bold tracking-widest text-blue-600 mb-6 uppercase">
          <span className="bg-blue-50 px-3 py-1 rounded-full flex items-center gap-1.5">
            <Zap className="size-3" /> Comparison
          </span>
          <span className="text-slate-300">•</span>
          <time dateTime={comparison.date.toString()}>
            {format(comparison.date, "MMM d, yyyy")}
          </time>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight font-primary">
          {comparison.title}
        </h2>

        <p className="text-slate-600 mb-8 flex-grow line-clamp-3 leading-relaxed text-lg">
          {comparison.description}
        </p>

        <div className="flex items-center text-blue-600 font-bold text-sm mt-auto group-hover:gap-3 transition-all">
          View Detailed Comparison <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

export default function AlternativesIndex() {
  const comparisons = allComparisons.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Hero Section */}
      <div className="bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-blue-50/50 to-transparent opacity-60" />
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10 text-center max-w-5xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-bold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <CheckCircle className="size-4" /> Why Switch to BoopSign?
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 mb-8 font-primary leading-[1.1]">
            BoopSign <span className="text-blue-600">vs. The Giants</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Tired of expensive, clunky, and complex e-signature tools? See how BoopSign compares with the leading platforms on the market.
          </p>
        </div>
      </div>

      {/* Grid of Comparisons */}
      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {comparisons.map((comparison, idx) => (
            <ComparisonCard key={idx} comparison={comparison} />
          ))}
        </div>
      </div>
    </div>
  );
}
