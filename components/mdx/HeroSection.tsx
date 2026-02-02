import { Badge } from "@/components/ui/badge";
import StartTrialBtn from "@/components/StartTrialBtn";
import { Briefcase, ShieldCheck, UserCheck, Clock } from "lucide-react";
import { WordRotate } from "../ui/word-rotate";
import { Highlighter } from "../ui/highlighter";

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
    <section className="text-center px-4 py-12 md:py-20">
      <div className="container mx-auto max-w-6xl">
        {badge && (
          <div className="inline-flex items-center justify-center p-1.5 mb-8 bg-primary/5 rounded-full text-primary text-sm font-medium animate-fade-in border border-primary/10">
            <Badge variant="secondary" className="mr-2 bg-primary text-white hover:bg-primary/90 border-none shadow-sm">{badge}</Badge>
            <WordRotate
              words={["Professional Workflow", "eSignatures Fast", "Legally Binding", "Built for 2026"]}
              className="text-primary font-semibold"
              duration={3000}
            />
          </div>
        )}

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight text-slate-900 leading-[1.1]">
          {title.includes("<span") ? (
            <div dangerouslySetInnerHTML={{ __html: title }} />
          ) : (
            <Highlighter action="underline" color="#dbeafe" iterations={1}>
              {title}
            </Highlighter>
          )}
        </h1>

        <p className="text-lg md:text-2xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed font-normal">
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