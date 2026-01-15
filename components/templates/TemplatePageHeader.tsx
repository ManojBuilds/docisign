import StartTrialBtn from "@/components/StartTrialBtn";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, ChevronRight, Download } from "lucide-react";
import Link from "next/link";

interface TemplatePageHeaderProps {
  title: string;
  subtitle: string;
  category?: string;
  backgroundImage?: string;
}

export function TemplatePageHeader({
  title,
  subtitle,
  category = "Contracts",
  backgroundImage = "/noise.png",
}: TemplatePageHeaderProps) {
  return (
    <div className="relative pt-12 pb-12 md:pt-16 md:pb-16 overflow-hidden">
      {/* Background with noise and gradient similar to homepage */}
      <div className="absolute inset-0 z-0 bg-background">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: "repeat",
            backgroundSize: "100px",
          }}
        ></div>
        {/* Subtle gradient blob for premium feel */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-50/50 blur-[100px] rounded-full pointer-events-none"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 max-w-5xl">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center text-sm text-muted-foreground mb-8">
          <Link
            href="/templates"
            className="flex items-center hover:text-blue-600 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Template Library
          </Link>
          <ChevronRight className="w-4 h-4 mx-2 text-slate-300" />
          <span className="text-slate-500">{category}</span>
        </nav>

        {/* Hero Content */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-6 border border-blue-100 shadow-sm">
            <CheckCircle className="w-3 h-3" />
            LAWYER VETTED & FREE
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-slate-900 leading-[1.1]">
            {title}
          </h1>

          <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <StartTrialBtn />
            <Button variant="outline" size="lg" className="h-12 px-8 rounded-full border-slate-300 hover:bg-slate-50 hover:text-slate-900 w-full sm:w-auto">
              <Download className="mr-2 w-4 h-4" />
              Download PDF
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-3 text-sm text-slate-500 font-medium">
            <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1.5 text-blue-500" /> Free Forever</span>
            <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1.5 text-blue-500" /> No Account Needed</span>
            <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1.5 text-blue-500" /> Legally Binding</span>
          </div>
        </div>
      </div>
    </div>
  );
}
