import { Badge } from "@/components/ui/badge";
import StartTrialBtn from "@/components/StartTrialBtn";
import { Briefcase, ShieldCheck, UserCheck, Clock } from "lucide-react";

interface HeroProps {
  badge?: string;
  title: string;
  subtitle: string;
  highlights?: string[];
  testimonial?: string;
}

const IconMap: Record<number, any> = {
  0: Briefcase,
  1: ShieldCheck,
  2: UserCheck,
  3: Clock,
};

export default function HeroSection({ badge, title, subtitle, highlights, testimonial }: HeroProps) {
  return (
    <section className="text-center px-4">
      <div className="container mx-auto max-w-6xl">
        {badge && (
          <div className="inline-flex items-center justify-center p-2 mb-6 bg-slate-100 rounded-full text-slate-600 text-sm font-medium animate-fade-in">
            <Badge variant="secondary" className="mr-2 bg-slate-900 text-white">{badge}</Badge>
            Professional Workflow for 2026
          </div>
        )}
        <h1
          className="text-4xl md:text-5xl lg:text-7xl font-semibold mb-6 tracking-tight text-slate-900"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
          {subtitle}
        </p>

        {highlights && highlights.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mb-12 text-sm md:text-base">
            {highlights.map((highlight, idx) => {
              const IconComponent = IconMap[idx] || Clock;
              return (
                <div key={idx} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                  <IconComponent className="w-4 h-4 text-blue-500" />
                  <span>{highlight}</span>
                </div>
              );
            })}
          </div>
        )}

        <StartTrialBtn />

        {testimonial && (
          <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-gray-500 italic">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 text-lg">★★★★★</span>
              <span>"{testimonial}"</span>
            </div>
            <div className="hidden md:block w-1 h-1 bg-gray-300 rounded-full"></div>
            <div>Trusted by Professionals Worldwide</div>
          </div>
        )}
      </div>
    </section>
  );
}