import Faq from "@/components/faq";
import { TemplateSidebar } from "@/components/templates/TemplateSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Calendar, Camera, Check, Heart, Zap } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Wedding Photography Contract Template (2026) | Edit & Sign",
  description: "Download our free wedding photography contract template. Protect your business with clauses for meals, harassment, and model releases. Sign instantly with e-signature.",
  keywords: [
    "wedding photography contract template free",
    "wedding photographer agreement",
    "simple wedding photography contract",
    "photography contract with model release",
    "wedding photo contract pdf",
  ],
  alternates: {
    canonical: "https://boopsign.com/wedding-photography-contract-template",
  },
};

const contractFaq = [
  {
    id: "faq-1",
    question: "Does this contract include a Model Release?",
    answer: "Yes, our template includes a standard Model Release clause that allows you to use the images for your portfolio, website, and social media marketing.",
  },
  {
    id: "faq-2",
    question: "What happens if the client cancels?",
    answer: "The template includes a Cancellation & Retainer clause. Typically, the retainer is non-refundable, and cancellations within 30 days of the wedding may require full payment. You can adjust these terms in the editor.",
  },
  {
    id: "faq-3",
    question: "Is there a 'Safe Working Environment' clause?",
    answer: "Absolutely. We include a harassment clause that protects you and your team from inappropriate behavior by guests, giving you the right to leave if the situation becomes unsafe.",
  },
  {
    id: "faq-4",
    question: "Can I add my own logo?",
    answer: "Yes. When you use BoopSign to send this contract, you can upload your logo to the signing page for a professional brand experience.",
  },
];

import { TemplatePageHeader } from "@/components/templates/TemplatePageHeader";

export default function WeddingPhotographyContractPage() {
  return (
    <main className="min-h-screen bg-slate-50/50">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Free Wedding Photography Contract Template",
            image: "https://boopsign.com/images/og-wedding-contract.jpg",
            description: "Professional wedding photography contract template with clauses for model release, meals, and cancellation.",
            url: "https://boopsign.com/wedding-photography-contract-template",
            brand: {
              "@type": "Brand",
              name: "BoopSign"
            },
            offers: {
              "@type": "Offer",
              url: "https://boopsign.com/wedding-photography-contract-template",
              price: "0",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "892",
              bestRating: "5",
              worstRating: "1"
            },
          }),
        }}
      />

      <TemplatePageHeader
        title="Wedding Photography Contract Template"
        subtitle="Secure your dates and protect your images with a professional agreement designed for modern wedding photographers. Includes model releases, meal clauses, and cancellation policies."
        category="Photography"
      />

      {/* Main Content Area */}
      <section className="py-24" id="preview">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

            {/* Template Breakdown */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Essential Clauses Included</h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  Wedding photography is high-stakes. Our template includes specific protections that generic contracts miss, ensuring you get fed, paid, and respected.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-white border-slate-200">
                    <CardContent className="p-6">
                      <div className="size-10 bg-rose-100 rounded-lg flex items-center justify-center text-rose-600 mb-4">
                        <Camera className="size-5" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">Model Release</h3>
                      <p className="text-sm text-slate-500">Grants you the explicit right to use the wedding photos for your portfolio, Instagram, and website marketing.</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border-slate-200">
                    <CardContent className="p-6">
                      <div className="size-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 mb-4">
                        <Calendar className="size-5" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">Retainer & Cancellation</h3>
                      <p className="text-sm text-slate-500">Protects your calendar. Clarifies that the booking fee is non-refundable if the couple cancels specifically for this date.</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border-slate-200">
                    <CardContent className="p-6">
                      <div className="size-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 mb-4">
                        <Heart className="size-5" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">Meals & Breaks</h3>
                      <p className="text-sm text-slate-500">It's a long day. This clause ensures you and your second shooter are provided a hot meal at the reception.</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border-slate-200">
                    <CardContent className="p-6">
                      <div className="size-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
                        <AlertCircle className="size-5" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">Harassment Policy</h3>
                      <p className="text-sm text-slate-500">Empowers you to stop coverage or leave if you or your staff are threatened or sexually harassed by guests.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="bg-rose-50 rounded-3xl p-8 border border-rose-100 text-rose-900">
                <h3 className="text-xl font-bold mb-4">Why Speed Matters</h3>
                <p className="mb-6">
                  Couples inquire with 5-10 photographers. The first one to get a signed contract often wins the date.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <Check className="size-5 text-rose-600" /> <span><b>Send via Link:</b> Text the contract link directly to the bride or groom.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="size-5 text-rose-600" /> <span><b>Mobile Optimized:</b> They can sign on their phone during their lunch break.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="size-5 text-rose-600" /> <span><b>Instant Copy:</b> Everyone gets a PDF copy instantly upon signing.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Sidebar CTA */}
            <div className="space-y-8 lg:sticky lg:top-24">
              <TemplateSidebar
                title="Secure The Date"
                subtitle="Free for your business"
                buttonText="Start Signing Now"
                stats={[
                  { label: "Format", value: "Word / PDF / Editable" },
                  { label: "Pages", value: "5 (Standard)" },
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
                <p className="text-sm text-slate-600 italic mb-4">"I used to lose bookings because my PDF contract was a pain to print. BoopSign fixed that. My booking rate is up 30%."</p>
                <div className="flex items-center gap-3">
                  <div className="size-8 bg-slate-200 rounded-full" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Sarah Jenkins</p>
                    <p className="text-[10px] text-slate-500">Wedding Photographer, Austin TX</p>
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
