import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check, FileSignature, Shield } from "lucide-react";
import Link from "next/link";

interface TemplateSidebarProps {
  title: string;
  subtitle: string;
  buttonText?: string;
  buttonLink?: string;
  features?: string[];
  stats?: { label: string; value: string }[];
  className?: string;
}

export function TemplateSidebar({
  title,
  subtitle,
  buttonText = "Use this Template",
  buttonLink = "/dashboard",
  features,
  stats,
  className,
}: TemplateSidebarProps) {
  return (
    <div className={cn("sticky top-24", className)}>
      {/* Adobe-Sign inspired Clean Card */}
      <Card className="relative bg-white rounded-xl border-0 ring-1 ring-slate-200 shadow-sm overflow-hidden">
        {/* Minimal Header */}
        <div className="px-8 pt-8 pb-6 text-center">
          <div className="mx-auto w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 border border-blue-100">
            <FileSignature className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-snug mb-2">
            {title}
          </h3>
          <p className="text-sm font-medium text-slate-500">
            {subtitle}
          </p>
        </div>

        <CardContent className="px-6 pb-8 pt-2">
          {/* Variant A: Features List (Checkmarks) */}
          {features && (
            <ul className="space-y-3 mb-8 bg-slate-50/50 p-4 rounded-lg border border-slate-100">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-600 font-medium leading-snug">{feature}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Variant B: Stats List (Rows) */}
          {stats && (
            <div className="space-y-0 mb-8 border-t border-slate-100">
              {stats.map((stat, i) => (
                <div key={i} className="flex justify-between items-center text-sm py-3 border-b border-slate-100 px-1">
                  <span className="text-slate-500 font-medium">{stat.label}</span>
                  <span className="font-semibold text-slate-900">{stat.value}</span>
                </div>
              ))}
            </div>
          )}

          <Button asChild className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-base shadow-none transition-all">
            <Link href={buttonLink}>
              {buttonText}
            </Link>
          </Button>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
            <Shield className="w-3 h-3" />
            <span>Secure & Enforceable</span>
          </div>
        </CardContent>
      </Card>

      {/* Trust Badge below */}
      <div className="mt-6 flex justify-center gap-6 grayscale opacity-60 hover:opacity-100 transition-opacity">
        {/* Placeholder for trust logos if needed, currently just empty or simple text */}
        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Trusted by 10,000+ Signers</span>
      </div>
    </div>
  );
}
