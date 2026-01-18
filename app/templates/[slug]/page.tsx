import Faq from "@/components/faq";
import { MDXContent } from "@/components/mdx/MDXContent";
import { TemplatePageHeader } from "@/components/templates/TemplatePageHeader";
import { TemplateSidebar } from "@/components/templates/TemplateSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { allTemplates } from "content-collections";
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
  return allTemplates.map((template) => ({
    slug: template.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);

  if (!template) return {};

  return {
    title: template.seo?.title,
    description: template.seo?.description,
    keywords: template.seo?.keywords,
    alternates: {
      canonical: template.seo?.canonical,
    },
  };
}

function getTemplateBySlug(slug: string) {
  return allTemplates.find((p) => p.slug === slug);
}

export default async function TemplatePage({ params }: Props) {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);

  if (!template) {
    notFound();
  }

  const theme = (template.whyUse?.theme as 'indigo' | 'rose' | 'emerald' | 'amber' | 'blue' | 'slate') || 'indigo';

  const themeClasses: Record<string, string> = {
    indigo: "bg-indigo-50 border-indigo-100 text-indigo-900",
    rose: "bg-rose-50 border-rose-100 text-rose-900",
    emerald: "bg-emerald-50 border-emerald-100 text-emerald-900",
    amber: "bg-amber-50 border-amber-100 text-amber-900",
    blue: "bg-blue-50 border-blue-100 text-blue-900",
    slate: "bg-slate-50 border-slate-100 text-slate-900",
  };

  const textColorClasses: Record<string, string> = {
    indigo: "text-indigo-600",
    rose: "text-rose-600",
    emerald: "text-emerald-600",
    amber: "text-amber-600",
    blue: "text-blue-600",
    slate: "text-slate-600",
  };

  const selectedThemeClass = themeClasses[theme] || themeClasses.indigo;
  const selectedTextColorClass = textColorClasses[theme] || textColorClasses.indigo;

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
        title={template.title}
        subtitle={template.subtitle || ""}
        category={template.category}
        templateId={template.slug}
      />

      {/* Main Content Area */}
      <section className="py-16 md:py-24" id="preview">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

            {/* Template Breakdown */}
            <div className="lg:col-span-2 space-y-16">

              {/* What's Inside Section */}
              <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">{template.whatsInside?.title}</h2>
                  <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                    {template.whatsInside?.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {template.whatsInside?.features?.map((feature, idx) => (
                    <Card key={idx} className="bg-white border-slate-200 hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className={`size-12 rounded-xl flex items-center justify-center mb-4 ${idx % 4 === 0 ? "bg-indigo-100 text-indigo-600" :
                          idx % 4 === 1 ? "bg-emerald-100 text-emerald-600" :
                            idx % 4 === 2 ? "bg-amber-100 text-amber-600" :
                              "bg-rose-100 text-rose-600"
                          }`}>
                          <Icon name={feature.icon || "FileText"} className="size-6" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                        <p className="text-sm text-slate-500">{feature.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Why Use Section */}
              <div className={`rounded-3xl p-8 md:p-12 border ${selectedThemeClass} bg-gradient-to-br from-white to-transparent`}>
                <div className="text-center mb-8">
                  <h3 className="text-2xl md:text-3xl font-black mb-4">{template.whyUse?.title}</h3>
                  <p className="text-lg opacity-90 max-w-2xl mx-auto">
                    {template.whyUse?.description}
                  </p>
                </div>

                <div className="max-w-2xl mx-auto">
                  <ul className="space-y-4">
                    {template.whyUse?.benefits?.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white/50">
                        <div className={`size-10 rounded-full flex items-center justify-center flex-shrink-0 ${selectedTextColorClass} bg-white shadow-sm`}>
                          <Check className="size-5" />
                        </div>
                        <span className="pt-1" dangerouslySetInnerHTML={{ __html: benefit }} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* MDX Content */}
              <div className="prose prose-slate  max-w-none
                prose-headings:font-primary prose-headings:font-black prose-headings:tracking-tight
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-slate-900 prose-blockquote:border-l-blue-500 prose-blockquote:not-italic
                prose-img:rounded-3xl prose-img:ring-1 prose-img:ring-slate-100
                prose-h2:mt-16 prose-h2:mb-8 prose-h2:text-3xl
                prose-h3:mt-12 prose-h3:mb-6 prose-h3:text-xl
                prose-p:leading-relaxed prose-p:text-slate-700
                prose-ul:mb-6 prose-li:mb-2">
                <MDXContent code={template.mdx} />
              </div>
            </div>

            {/* Enhanced Sidebar CTA */}
            <div className="space-y-8 lg:sticky lg:top-24">
              <div className="bg-gradient-to-b from-white to-slate-50 rounded-3xl p-8 border border-slate-200 shadow-sm sticky top-24">
                <TemplateSidebar
                  title={template.sidebar?.title || ""}
                  subtitle={template.sidebar?.subtitle || ""}
                  buttonText="Start Signing Now"
                  templateId={template.slug}
                  templateTitle={template.title}
                  stats={template.sidebar?.stats}
                />
              </div>

              {/* Trust Section */}
              {template.testimonial && (
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                  <div className="flex gap-1 text-amber-400 mb-3">
                    {[...Array(template.testimonial.stars || 0)].map((_, i) => (
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
      <section className="bg-slate-900 text-slate-400 py-20 border-t border-slate-800">
        <div className="container max-w-6xl mx-auto px-4">
          <Faq heading="Common Questions" items={template.faqs} />
        </div>
      </section>
    </main>
  );
}
