import Faq from "@/components/faq";
import { TemplatePageHeader } from "@/components/templates/TemplatePageHeader";
import { TemplateSidebar } from "@/components/templates/TemplateSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { templatesData } from "@/lib/templates-data";
import {
  AlertCircle,
  AlertTriangle,
  Calendar,
  Camera,
  Check,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  Heart,
  Home,
  Info,
  Layout,
  Shield,
  Smartphone,
  Sparkles,
  Star,
  Zap
} from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Dynamic Icon Component
const Icon = ({ name, className }: { name: string; className?: string }) => {
  const icons: Record<string, any> = {
    AlertCircle,
    AlertTriangle,
    Calendar,
    Camera,
    Check,
    CheckCircle,
    Clock,
    DollarSign,
    FileText,
    Heart,
    Home,
    Info,
    Layout,
    Shield,
    Smartphone,
    Sparkles,
    Zap,
    Star
  };

  const LucideIcon = icons[name] || FileText;
  return <LucideIcon className={className} />;
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.values(templatesData).map((template) => ({
    slug: template.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const template = templatesData[slug];

  if (!template) return {};

  return {
    title: template.seo.title,
    description: template.seo.description,
    keywords: template.seo.keywords,
    alternates: {
      canonical: template.seo.canonical,
    },
  };
}

export default async function TemplatePage({ params }: Props) {
  const { slug } = await params;
  const template = templatesData[slug];

  if (!template) {
    notFound();
  }

  const themeClasses = {
    indigo: "bg-indigo-50 border-indigo-100 text-indigo-900 icon-bg-indigo-100 icon-text-indigo-600",
    rose: "bg-rose-50 border-rose-100 text-rose-900 icon-bg-rose-100 icon-text-rose-600",
    emerald: "bg-emerald-50 border-emerald-100 text-emerald-900 icon-bg-emerald-100 icon-text-emerald-600",
    amber: "bg-amber-50 border-amber-100 text-amber-900 icon-bg-amber-100 icon-text-amber-600",
    blue: "bg-blue-50 border-blue-100 text-blue-900 icon-bg-blue-100 icon-text-blue-600",
    slate: "bg-slate-50 border-slate-100 text-slate-900 icon-bg-slate-100 icon-text-slate-600",
  }[template.whyUse.theme];

  return (
    <main className="min-h-screen bg-slate-50/50">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(template.schema),
        }}
      />

      <TemplatePageHeader
        title={template.name}
        subtitle={template.subtitle}
        category={template.category}
        templateId={template.id}
      />

      {/* Main Content Area */}
      <section className="py-24" id="preview">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

            {/* Template Breakdown */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">{template.whatsInside.title}</h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  {template.whatsInside.description}
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {template.whatsInside.features.map((feature, idx) => (
                    <Card key={idx} className="bg-white border-slate-200">
                      <CardContent className="p-6">
                        <div className={`size-10 rounded-lg flex items-center justify-center mb-4 ${idx % 4 === 0 ? "bg-indigo-100 text-indigo-600" :
                          idx % 4 === 1 ? "bg-emerald-100 text-emerald-600" :
                            idx % 4 === 2 ? "bg-amber-100 text-amber-600" :
                              "bg-rose-100 text-rose-600"
                          }`}>
                          <Icon name={feature.icon || "FileText"} className="size-5" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                        <p className="text-sm text-slate-500">{feature.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className={`rounded-3xl p-8 border ${themeClasses.split(' ').slice(0, 3).join(' ')}`}>
                <h3 className="text-xl font-bold mb-4">{template.whyUse.title}</h3>
                <p className="mb-6 opacity-90">
                  {template.whyUse.description}
                </p>
                <ul className="space-y-3">
                  {template.whyUse.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <Check className={`size-5 ${themeClasses.split(' ').pop()?.replace('text-', 'text-')}`} />
                      <span dangerouslySetInnerHTML={{ __html: benefit }} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar CTA */}
            <div className="space-y-8 lg:sticky lg:top-24">
              <TemplateSidebar
                title={template.sidebar.title}
                subtitle={template.sidebar.subtitle}
                buttonText="Start Signing Now"
                templateId={template.id}
                templateTitle={template.name}
                stats={template.sidebar.stats}
              />

              {/* Trust Section */}
              {template.testimonial && (
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                  <div className="flex gap-1 text-amber-400 mb-3">
                    {[...Array(template.testimonial.stars)].map((_, i) => (
                      <Star key={i} className="fill-current size-4" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 italic mb-4">{template.testimonial.quote}</p>
                  <div className="flex items-center gap-3">
                    <div className="size-8 bg-slate-200 rounded-full" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">{template.testimonial.author}</p>
                      <p className="text-[10px] text-slate-500">{template.testimonial.role}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <Faq heading="Common Questions" items={template.faqs} />
        </div>
      </section>
    </main>
  );
}
