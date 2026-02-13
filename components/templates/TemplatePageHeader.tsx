import { ArrowLeft, CheckCircle, ChevronRight } from "lucide-react";
import Link from "next/link";

// import { TemplateActionButton } from "./TemplateActionButton";
import { TemplateDownloadButtons } from "./TemplateDownloadButtons";
import { getTemplateBySlug } from "@/lib/seo/all-templates";

interface TemplatePageHeaderProps {
  title: string;
  subtitle: string;
  category?: string;
  backgroundImage?: string;
  templateId?: string;
}

export function TemplatePageHeader({
  title,
  subtitle,
  category = "Contracts",
  backgroundImage = "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9Pgupj8r27wbAQC3TH6iZ98sKJ1Uvou4eYBdxWLO",
  templateId,
}: TemplatePageHeaderProps) {
  const template = templateId ? getTemplateBySlug(templateId) : null;
  const docUrl = template?.docUrl;
  const pdfUrl = template?.pdfUrl;

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
            href="/contracts"
            className="flex items-center hover:text-blue-600 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Contracts Library
          </Link>
          <ChevronRight className="w-4 h-4 mx-2 text-slate-300" />
          <span className="text-slate-500">{category}</span>
        </nav>

        {/* Hero Content */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-6 border border-blue-100 shadow-sm">
            <CheckCircle className="w-3 h-3" />
            LAWYER VETTED & FREE
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-slate-900 leading-[1.1]">
            {title}
          </h1>

          <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>

          <div className="flex flex-col items-center gap-6 mb-12">
            {templateId && (
              <TemplateDownloadButtons
                templateId={templateId}
                docUrl={docUrl}
                pdfUrl={pdfUrl}
              />
            )}
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
