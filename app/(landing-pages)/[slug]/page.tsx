import StartTrialBtn from "@/components/StartTrialBtn";
import Cta from "@/components/cta";
import Faq from "@/components/faq";
import { MDXContent } from "@/components/mdx/MDXContent";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { allLandingPages } from "content-collections";
import {
  Activity,
  ArrowRight,
  Briefcase,
  CheckCircle,
  Clock,
  Coffee,
  CreditCard,
  DollarSign,
  FileCheck,
  FileText,
  GraduationCap,
  Heart,
  Home,
  Key,
  Landmark,
  Send,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Star,
  Stethoscope,
  UserCheck,
  XCircle,
  Zap
} from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Dynamic Icon Component
const Icon = ({ name, className }: { name: string; className?: string }) => {
  const icons: Record<string, any> = {
    Activity,
    ArrowRight,
    Briefcase,
    CheckCircle,
    Clock,
    Coffee,
    CreditCard,
    DollarSign,
    FileCheck,
    FileText,
    GraduationCap,
    Heart,
    Home,
    Key,
    Landmark,
    Send,
    ShieldAlert,
    ShieldCheck,
    Smartphone,
    Star,
    Stethoscope,
    UserCheck,
    XCircle,
    Zap
  };

  const LucideIcon = icons[name] || FileText;
  return <LucideIcon className={className || "w-6 h-6"} />;
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return allLandingPages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = allLandingPages.find((p) => p.slug === slug);

  if (!page) return {};

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || page.description,
    keywords: page.seo?.keywords,
    alternates: {
      canonical: page.seo?.canonical,
    },
  };
}

export default async function LandingPageLayout({ params }: Props) {
  const { slug } = await params;
  const page = allLandingPages.find((p) => p.slug === slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-16 md:gap-24 py-8 md:py-16">
      {/* Hero Section */}
      <section className="text-center px-4">
        <div className="container mx-auto max-w-6xl">
          {page.hero?.badge && (
            <div className="inline-flex items-center justify-center p-2 mb-6 bg-slate-100 rounded-full text-slate-600 text-sm font-medium animate-fade-in">
              <Badge variant="secondary" className="mr-2 bg-slate-900 text-white">{page.hero.badge}</Badge>
              Professional Workflow for 2026
            </div>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight text-slate-900" dangerouslySetInnerHTML={{ __html: page.hero?.title || page.title }} />
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
            {page.hero?.subtitle || page.description}
          </p>

          {page.hero?.highlights && (
            <div className="flex flex-wrap justify-center gap-4 mb-12 text-sm md:text-base">
              {page.hero.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                  <Icon name={idx === 0 ? "Briefcase" : idx === 1 ? "ShieldCheck" : idx === 2 ? "UserCheck" : "Clock"} className="w-4 h-4 text-blue-500" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          )}

          <StartTrialBtn />

          {page.hero?.testimonial && (
            <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-gray-500 italic">
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 text-lg">★★★★★</span>
                <span>"{page.hero.testimonial}"</span>
              </div>
              <div className="hidden md:block w-1 h-1 bg-gray-300 rounded-full"></div>
              <div>Trusted by Professionals Worldwide</div>
            </div>
          )}
        </div>
      </section>

      {/* Why BoopSign Section */}
      {page.whyUse && (
        <section className="bg-slate-50 border-y border-slate-100 py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
                {page.whyUse.title}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {page.whyUse.description}
              </p>
            </div>

            {page.cardItems && (
              <div className="grid md:grid-cols-3 gap-8">
                {page.cardItems.map((item, idx) => (
                  <Card key={idx} className="border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${item.color === 'red' ? 'bg-red-100 text-red-600' :
                        item.color === 'green' ? 'bg-green-100 text-green-600' :
                          item.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                            'bg-blue-100 text-blue-600'
                        }`}>
                        <Icon name={item.icon || "FileText"} className="w-6 h-6" />
                      </div>
                      <CardTitle>{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-gray-600">
                      {item.description}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Use Cases Section */}
      {page.useCaseSection && (
        <section className="px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
                  {page.useCaseSection.title}
                </h2>
                <ul className="space-y-4 text-lg text-gray-700">
                  {page.useCaseSection.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle className="text-green-500 w-6 h-6" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <StartTrialBtn />
                </div>
              </div>
              {page.useCaseSection.stats && (
                <div className="flex-1 grid grid-cols-2 gap-4">
                  {page.useCaseSection.stats.map((stat, idx) => (
                    <div key={idx} className={`${idx % 2 === 0 ? "bg-slate-900" : "bg-blue-600"} p-8 rounded-2xl text-white flex flex-col justify-between aspect-square ${idx === 1 ? "mt-8" : ""}`}>
                      <div className="text-4xl font-bold">{stat.value}</div>
                      <div className="text-sm opacity-90">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Comparison Table Section */}
      {page.comparisonTable && (
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-12">{page.comparisonTable.title}</h2>
            <div className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50">
                  <tr>
                    {page.comparisonTable.headers.map((header, idx) => (
                      <th key={idx} className={`py-4 px-6 font-semibold ${idx === 1 ? "text-blue-600" : idx > 1 ? "text-gray-500" : ""}`}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {page.comparisonTable.rows.map((row, idx) => (
                    <tr key={idx}>
                      <td className="py-4 px-6">{row.feature}</td>
                      <td className="py-4 px-6 font-bold text-green-600">{row.us}</td>
                      <td className="py-4 px-6">{row.them}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* MDX Content */}
      <section className="px-4">
        <div className="container mx-auto max-w-4xl prose  prose-slate">
          <MDXContent code={page.mdx} />
        </div>
      </section>

      {/* FAQ Section */}
      {page.faqs && (
        <section className="px-4">
          <div className="container mx-auto max-w-4xl">
            <Faq heading={`${page.category || "General"} eSignatures: Frequently Asked Questions`} items={page.faqs} />
          </div>
        </section>
      )}

      {/* Final CTA */}
      <Cta />
    </div>
  );
}
