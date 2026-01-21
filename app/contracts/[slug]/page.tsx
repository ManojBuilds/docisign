import { MDXContent } from "@/components/mdx/MDXContent";
import { TemplatePageHeader } from "@/components/templates/TemplatePageHeader";
import { TemplateSidebar } from "@/components/templates/TemplateSidebar";
import { Card, CardContent } from "@/components/ui/card";
import Faq from "@/components/faq";
import { PdfDimensionsProvider } from "@/components/PdfDimensionsContext";
import { allContracts } from "content-collections";
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
import { Badge } from "@/components/ui/badge";

import { WordViewer } from "@/components/word-viewer";
import Link from "next/link";

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
  return allContracts.map((contract: any) => ({
    slug: contract.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const contract = getContractBySlug(slug);

  if (!contract) return {};

  return {
    title: contract.seo?.title,
    description: contract.seo?.description,
    keywords: contract.seo?.keywords,
    alternates: {
      canonical: contract.seo?.canonical,
    },
  };
}

function getContractBySlug(slug: string) {
  return allContracts.find((p: any) => p.slug === slug);
}

export default async function ContractPage({ params }: Props) {
  const { slug } = await params;
  const contract = getContractBySlug(slug);

  if (!contract) {
    notFound();
  }

  const theme = (contract.whyUse?.theme as 'indigo' | 'rose' | 'emerald' | 'amber' | 'blue' | 'slate') || 'indigo';

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
    <PdfDimensionsProvider>
      <main className="min-h-screen bg-white">
        {/* Schema Markup */}
        {contract.schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(contract.schema),
            }}
          />
        )}

        <TemplatePageHeader
          title={contract.title}
          subtitle={contract.subtitle || ""}
          category={contract.category}
          templateId={contract.slug}
        />

        {/* Main Content Area */}
        <section className="py-16 md:py-24" id="preview">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

              {/* Template Breakdown */}
              <div className="lg:col-span-2 space-y-24">

                {/* What's Inside Section */}
                <div className="">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">{contract.whatsInside?.title}</h2>
                    <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                      {contract.whatsInside?.description}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {contract.whatsInside?.features?.map((feature: any, idx: number) => (
                      <Card key={idx} className="bg-white border-slate-200 hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className={`size-12 rounded-xl flex items-center justify-center mb-4 ${idx % 4 === 0 ? "bg-indigo-100 text-indigo-600" :
                            idx % 4 === 1 ? "bg-emerald-100 text-emerald-600" :
                              idx % 4 === 2 ? "bg-amber-100 text-amber-600" :
                                "bg-rose-100 text-rose-600"
                            }`}>
                            <Icon name={feature.icon || "FileText"} className="size-6" />
                          </div>
                          <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                          <p className="text-sm text-slate-500">{feature.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Why Use Section */}
                <div className={`rounded-3xl p-8 md:p-12 border ${selectedThemeClass} bg-gradient-to-br from-white to-transparent`}>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl md:text-3xl font-black mb-4">{contract.whyUse?.title}</h3>
                    <p className="text-lg opacity-90 max-w-2xl mx-auto">
                      {contract.whyUse?.description}
                    </p>
                  </div>

                  <div className="max-w-2xl mx-auto">
                    <ul className="space-y-4">
                      {contract.whyUse?.benefits?.map((benefit: string, idx: number) => (
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

                {/* Trust Section */}
                {contract.testimonial && (
                  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                    <div className="flex gap-1 text-amber-400 mb-3">
                      {[...Array(contract.testimonial.stars || 0)].map((_, i) => (
                        <Star key={i} className="fill-current size-4" />
                      ))}
                    </div>
                    <p className="text-sm text-slate-600 italic mb-4">{contract.testimonial.quote}</p>
                    <div className="flex items-center gap-3">
                      <div className="size-8 bg-slate-200 rounded-full" />
                      <div>
                        <p className="text-xs font-semibold text-slate-900">{contract.testimonial.author}</p>
                        <p className="text-[10px] text-slate-500">{contract.testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Document Preview Section */}
                {(contract.docUrl) && (
                  <div className="space-y-6" id="preview">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100">
                        Document Preview
                      </Badge>
                    </div>

                    {contract.docUrl && (
                      <WordViewer fileUrl={contract.docUrl} />
                    )}
                  </div>
                )}

                {/* MDX Content */}
                <div className="prose prose-slate max-w-none
                prose-headings:font-primary prose-headings:font-black prose-headings:tracking-tight
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-slate-900 prose-blockquote:border-l-blue-500 prose-blockquote:not-italic
                prose-img:rounded-3xl prose-img:ring-1 prose-img:ring-slate-100
                prose-h2:mt-16 prose-h2:mb-8 prose-h2:text-3xl
                prose-h3:mt-12 prose-h3:mb-6 prose-h3:text-xl
                prose-p:leading-relaxed prose-p:text-slate-700
                prose-ul:mb-6 prose-li:mb-2">
                  <MDXContent code={contract.mdx} />
                </div>

                {/* Informative Extra: How to Sign Section */}
                <div className="bg-blue-50 rounded-3xl p-8 md:p-12 border border-blue-100">
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">How to sign this {contract.title}</h2>
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="flex gap-4">
                      <div className="size-10 rounded-full bg-white text-blue-500 flex items-center justify-center font-bold flex-shrink-0 shadow-sm transition-transform hover:scale-110">1</div>
                      <p className="text-sm text-slate-600 leading-relaxed">Customize the contract by filling in the placeholder variables in our secure editor.</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="size-10 rounded-full bg-white text-blue-500 flex items-center justify-center font-bold flex-shrink-0 shadow-sm transition-transform hover:scale-110">2</div>
                      <p className="text-sm text-slate-600 leading-relaxed">Send a secure link to your client via email—no account required for them to sign.</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="size-10 rounded-full bg-white text-blue-500 flex items-center justify-center font-bold flex-shrink-0 shadow-sm transition-transform hover:scale-110">3</div>
                      <p className="text-sm text-slate-600 leading-relaxed">Both parties sign instantly on any device and receive a final, sealed PDF copy.</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="size-10 rounded-full bg-white text-blue-500 flex items-center justify-center font-bold flex-shrink-0 shadow-sm transition-transform hover:scale-110">4</div>
                      <p className="text-sm text-slate-600 leading-relaxed">Your document is securely stored with a full tamper-proof audit trail for legal protection.</p>
                    </div>
                  </div>
                </div>

                {/* Legal Framework Section */}
                <div className="border-t border-slate-100 pt-16">
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">A Trusted Legal Framework</h2>
                  <p className="text-slate-600 mb-8 leading-relaxed">
                    Every signature collected through Boopsign for this {contract.title} is legally binding and admissible in court. We adhere to the highest international standards, ensuring your business agreements are bulletproof.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "ESIGN Act", icon: Shield },
                      { label: "UETA Compliant", icon: Shield },
                      { label: "eIDAS Ready", icon: Shield },
                      { label: "256-bit SSL", icon: Shield }
                    ].map((badge, idx) => (
                      <div key={idx} className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <badge.icon className="size-5 text-blue-500 mb-2" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{badge.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enhanced Sidebar CTA */}
              <div className="space-y-8 lg:sticky lg:top-24">
                <TemplateSidebar
                  title={contract.sidebar?.title || ""}
                  subtitle={contract.sidebar?.subtitle || ""}
                  buttonText="Customize & Sign Document"
                  templateId={contract.slug}
                  templateTitle={contract.title}
                  stats={contract.sidebar?.stats}
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        {contract.faqs && contract.faqs.length > 0 && (
          <section className="border-t border-slate-100">
            <Faq heading="Contract Questions" items={contract.faqs} />
          </section>
        )}

        {/* Final Light CTA */}
        <section className="py-24 bg-white border-t border-slate-100">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="p-8 md:p-16 bg-sky-50 rounded-[2.5rem] text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-black mb-6 text-slate-900">Secure your agreement today</h2>
                <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
                  Join thousands of businesses that trust Boopsign for their professional contract management.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/dashboard" className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-slate-50 transition-colors shadow-lg border border-blue-100">
                    Get Started for Free
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PdfDimensionsProvider>
  );
}
