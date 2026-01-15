import { TemplateSidebar } from "@/components/templates/TemplateSidebar";
import { Button } from "@/components/ui/button";
import { FileText, Layout, Shield } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free NDA Template for Freelancers | Download & E-Sign",
  description: "Protect your ideas with our free Non-Disclosure Agreement (NDA) template. Download as PDF and sign legally in minutes with BoopSign.",
  keywords: [
    "free NDA template",
    "freelance nda",
    "non-disclosure agreement free",
    "esignature for nda",
    "legal templates for consultants",
  ],
  alternates: {
    canonical: "https://boopsign.com/nda-template-free",
  },
};

import { TemplatePageHeader } from "@/components/templates/TemplatePageHeader";

export default function NdaTemplatePage() {
  return (
    <main className="min-h-screen bg-slate-50/50">
      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Free NDA Template for Freelancers",
            image: "https://boopsign.com/images/og-nda-template.jpg",
            description:
              "Protect your ideas with our free Non-Disclosure Agreement (NDA) template. Download as PDF and sign legally in minutes with BoopSign.",
            url: "https://boopsign.com/nda-template-free",
            brand: {
              "@type": "Brand",
              name: "BoopSign"
            },
            offers: {
              "@type": "Offer",
              url: "https://boopsign.com/nda-template-free",
              price: "0",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "920",
              bestRating: "5",
              worstRating: "1"
            },
          }),
        }}
      />

      <TemplatePageHeader
        title="Free Non-Disclosure Agreement (NDA) Template"
        subtitle="Protect your proprietary information and client lists. Download our lawyer-vetted NDA template and get it signed legally in minutes."
        category="Legal & General"
      />

      {/* Main Content Area */}
      <section className="py-24" id="template">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Template Preview (Sticky) */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-100 p-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                      <FileText className="size-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Standard NDA v2026</h3>
                      <p className="text-xs text-slate-500">Mutual Non-Disclosure Agreement</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 px-2 py-1 rounded">Vetted</span>
                </div>
                <div className="p-8 md:p-12 space-y-6 text-slate-400 select-none grayscale opacity-60">
                  <div className="h-4 bg-slate-100 rounded w-1/3" />
                  <div className="space-y-3">
                    <div className="h-3 bg-slate-50 rounded w-full" />
                    <div className="h-3 bg-slate-50 rounded w-full" />
                    <div className="h-3 bg-slate-50 rounded w-3/4" />
                  </div>
                  <div className="h-3 bg-slate-100 rounded w-1/4 mt-8" />
                  <div className="space-y-3">
                    <div className="h-3 bg-slate-50 rounded w-full" />
                    <div className="h-3 bg-slate-50 rounded w-full" />
                    <div className="h-3 bg-slate-50 rounded w-full" />
                    <div className="h-3 bg-slate-50 rounded w-5/6" />
                  </div>
                  <div className="h-3 bg-slate-100 rounded w-1/3 mt-8" />
                  <div className="space-y-3">
                    <div className="h-3 bg-slate-50 rounded w-full" />
                    <div className="h-3 bg-slate-50 rounded w-full" />
                  </div>
                </div>
                <div className="p-8 bg-slate-50 border-t border-slate-100 text-center">
                  <p className="text-sm text-slate-500 mb-6 font-medium">Ready to customize this document?</p>
                  <Button asChild className="bg-slate-900 hover:bg-slate-800 text-white px-8 h-12 rounded-xl">
                    <Link href="/dashboard">
                      Open in BoopSign Editor — Free
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="prose prose-slate max-w-none">
                <h2 className="text-3xl font-bold text-slate-900">Why use this NDA?</h2>
                <p>
                  This Non-Disclosure Agreement is designed specifically for freelancers, consultants, and solo professionals. It protects your proprietary information, client lists, and technical know-how during discovery calls or project onboarding.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <Shield className="size-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold mb-1">Mutual Protection</h4>
                      <p className="text-xs text-slate-500 m-0">Protects both you and your client equally.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <Layout className="size-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold mb-1">Easy to Edit</h4>
                      <p className="text-xs text-slate-500 m-0">Simple language that doesn't need a lawyer to translate.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* Sidebar CTA */}
            <TemplateSidebar
              title="Speed Matters"
              subtitle="Sign in 60 seconds"
              buttonText="Use this Template"
              features={[
                "No Account for Signers",
                "Full Audit Trail",
                "Mobile-Optimized",
                "Legally Binding"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <blockquote className="text-2xl font-medium text-slate-900 leading-relaxed italic">
            &quot;Using the BoopSign NDA template was a game-changer. I sent the link during a discovery call and had it signed before we off the Zoom.&quot;
          </blockquote>
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="size-12 bg-slate-200 rounded-full" />
            <div className="text-left">
              <p className="font-bold text-slate-900 m-0">Jamie L.</p>
              <p className="text-sm text-slate-500 m-0">Independent Consultant</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}