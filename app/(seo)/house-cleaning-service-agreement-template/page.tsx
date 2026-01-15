import Faq from "@/components/faq";
import { TemplateSidebar } from "@/components/templates/TemplateSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Check, Clock, Home, Sparkles, Zap } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free House Cleaning Service Agreement Template (2026)",
  description: "Download our free house cleaning service agreement. Protect your cleaning business with clauses for access, cancellations, and supplies. Simple and professional.",
  keywords: [
    "house cleaning service agreement free",
    "cleaning contract template",
    "residential cleaning agreement",
    "maid service contract",
    "cleaning business forms",
  ],
  alternates: {
    canonical: "https://boopsign.com/house-cleaning-service-agreement-template",
  },
};

const contractFaq = [
  {
    id: "faq-1",
    question: "Do I need a contract for residential cleaning?",
    answer: "Yes. Even for small jobs, a contract protects you from liability (e.g., broken items) and ensures you get paid for last-minute cancellations.",
  },
  {
    id: "faq-2",
    question: "Who provides the vacuum and supplies?",
    answer: "Our template includes a 'Supplies' clause where you can specify if the client provides the vacuum/liquids or if you bring your own pro-grade equipment.",
  },
  {
    id: "faq-3",
    question: "Can I charge a lockout fee?",
    answer: "Yes. The 'Access & Lockout' clause allows you to charge a fee (e.g., 50% of the service) if you arrive and cannot get inside the home.",
  },
  {
    id: "faq-4",
    question: "Is this suitable for commercial cleaning?",
    answer: "This template is optimized for residential homes. For offices, we recommend editing the 'Scope of Work' to include commercial-specific tasks like trash removal from desks.",
  },
];

import { TemplatePageHeader } from "@/components/templates/TemplatePageHeader";

export default function HouseCleaningContractPage() {
  return (
    <main className="min-h-screen bg-slate-50/50">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Free House Cleaning Service Agreement",
            image: "https://boopsign.com/images/og-cleaning-contract.jpg",
            description: "A simple, professional service agreement for house cleaners and maid services. Includes liability and cancellation clauses.",
            url: "https://boopsign.com/house-cleaning-service-agreement-template",
            brand: {
              "@type": "Brand",
              name: "BoopSign"
            },
            offers: {
              "@type": "Offer",
              url: "https://boopsign.com/house-cleaning-service-agreement-template",
              price: "0",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              reviewCount: "645",
              bestRating: "5",
              worstRating: "1"
            },
          }),
        }}
      />

      <TemplatePageHeader
        title="House Cleaning Service Agreement Template"
        subtitle="Protect your cleaning business with a professional service agreement. Defines scope of work, access policies, liability limits, and cancellations."
        category="Service Business"
      />

      {/* Main Content Area */}
      <section className="py-24" id="preview">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

            {/* Template Breakdown */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Protect Your Cleaning Business</h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  Ambiguity causes refunds. Our agreement template clarifies exactly what is included (and excluded) in your standard clean, so customers don't expect a deep clean for a standard price.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-white border-slate-200">
                    <CardContent className="p-6">
                      <div className="size-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 mb-4">
                        <Home className="size-5" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">Scope of Services</h3>
                      <p className="text-sm text-slate-500">Definitively list standard tasks (vacuuming, dusting) vs. extra services (inside oven, windows) to avoid scope creep.</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border-slate-200">
                    <CardContent className="p-6">
                      <div className="size-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                        <Sparkles className="size-5" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">Supplies & Equipment</h3>
                      <p className="text-sm text-slate-500">Prevent damage claims by specifying if you use the client's vacuum or your own supplies. </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border-slate-200">
                    <CardContent className="p-6">
                      <div className="size-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 mb-4">
                        <Clock className="size-5" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">Access & Lockouts</h3>
                      <p className="text-sm text-slate-500">If you show up and the key isn't there, you still get paid. This clause enables entry fees and lockout charges.</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border-slate-200">
                    <CardContent className="p-6">
                      <div className="size-10 bg-rose-100 rounded-lg flex items-center justify-center text-rose-600 mb-4">
                        <AlertTriangle className="size-5" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">Liability Limit</h3>
                      <p className="text-sm text-slate-500">Accidents happen. This limits your liability for breakage to a specific amount or to replacement value only.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-100 text-emerald-900">
                <h3 className="text-xl font-bold mb-4">Why Digital Contracts?</h3>
                <p className="mb-6">
                  Leaving a paper contract on the counter is unprofessional. Sending a digital link before you even arrive sets the tone for a premium service.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <Check className="size-5 text-emerald-600" /> <span><b>Reduce Cancellations:</b> Clients take you seriously when they sign a formal agreement.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="size-5 text-emerald-600" /> <span><b>Recurring Service:</b> Set up the terms for weekly or bi-weekly visits once.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="size-5 text-emerald-600" /> <span><b>Easy on Mobile:</b> Clients can sign from their smartphone instantly.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Sidebar CTA */}
            <div className="space-y-8 lg:sticky lg:top-24">
              <TemplateSidebar
                title="Professionalize Your Biz"
                subtitle="Free for your business"
                buttonText="Start Signing Now"
                stats={[
                  { label: "Format", value: "Word / PDF / Editable" },
                  { label: "Pages", value: "3 (Compact)" },
                  { label: "Compliance", value: "ESIGN / UETA" }
                ]}
              />

              {/* Trust Section */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <div className="flex gap-1 text-amber-400 mb-3">
                  <Zap className="fill-current size-4" />
                  <Zap className="fill-current size-4" />
                  <Zap className="fill-current size-4" />
                  <Zap className="fill-current size-4" />
                  <Zap className="fill-current size-4" />
                </div>
                <p className="text-sm text-slate-600 italic mb-4">"It used to be awkward asking for contracts. Now I just text the BoopSign link. It's so easy and clients love it."</p>
                <div className="flex items-center gap-3">
                  <div className="size-8 bg-slate-200 rounded-full" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Maria R.</p>
                    <p className="text-[10px] text-slate-500">Owner, Sparkle Clean Services</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <Faq heading="Common Questions" items={contractFaq} />
        </div>
      </section>
    </main>
  );
}
