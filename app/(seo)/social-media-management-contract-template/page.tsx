import Faq from "@/components/faq";
import { TemplateSidebar } from "@/components/templates/TemplateSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Check, FileText, Info, Layout, Shield, Zap } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Social Media Management Contract Template (2026) | Edit & Sign",
  description: "Download our free social media management contract template. Protect your agency or freelance business with clauses for payment, scope, and IP. Sign instantly with no account required.",
  keywords: [
    "social media management contract template free",
    "social media manager contract",
    "freelance social media contract",
    "social media agency agreement",
    "social media marketing contract template",
    "simple social media contract",
  ],
  alternates: {
    canonical: "https://boopsign.com/social-media-management-contract-template",
  },
};

const contractFaq = [
  {
    id: "faq-1",
    question: "Is this social media contract template legally binding?",
    answer: "Yes, once filled out and signed by both parties, this contract constitutes a legally binding agreement. Electronic signatures added via BoopSign particularily are fully compliant with the ESIGN Act and UETA.",
  },
  {
    id: "faq-2",
    question: "Do I need a lawyer to use this template?",
    answer: "While we always recommend consulting a lawyer for complex situations, this standard template covers the essential protections most freelance social media managers and agencies need to get started safely.",
  },
  {
    id: "faq-3",
    question: "Can I edit the clauses in this template?",
    answer: "Absolutely. The template is designed to be customizable. You can add specific deliverables, change payment terms, or include unique clauses like 'No ROI Guarantee' directly in the editor.",
  },
  {
    id: "faq-4",
    question: "Does the client need an account to sign?",
    answer: "No. With BoopSign, your client receives a secure link and can sign the contract on their phone or computer in seconds without creating an account or downloading an app.",
  },
];

import { TemplatePageHeader } from "@/components/templates/TemplatePageHeader";

export default function SocialMediaContractPage() {
  return (
    <main className="min-h-screen bg-slate-50/50">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Free Social Media Management Contract Template",
            image: "https://boopsign.com/images/og-social-media-contract.jpg",
            description: "A comprehensive, free contract template for social media managers and agencies. Includes clauses for scope, payment, and IP rights.",
            url: "https://boopsign.com/social-media-management-contract-template",
            brand: {
              "@type": "Brand",
              name: "BoopSign"
            },
            offers: {
              "@type": "Offer",
              url: "https://boopsign.com/social-media-management-contract-template",
              price: "0",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "420",
              bestRating: "5",
              worstRating: "1"
            },
          }),
        }}
      />

      <TemplatePageHeader
        title="Social Media Management Contract Template"
        subtitle="Stop scope creep and get paid on time. A professional contract template designed for SMM agencies and freelancers. Includes scope definitions and platform independence clauses."
        category="Agency & Freelance"
      />

      {/* Main Content Area */}
      <section className="py-24" id="preview">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

            {/* Template Breakdown */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">What's inside this template?</h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  Social media management is prone to "scope creep"—clients asking for just <i>one more post</i> or expecting 24/7 community management.
                  Our template protects you with specific clauses designed for SMM agencies and freelancers.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-white border-slate-200">
                    <CardContent className="p-6">
                      <div className="size-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
                        <Layout className="size-5" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">Scope of Work & Deliverables</h3>
                      <p className="text-sm text-slate-500">Clearly define platform accounts (IG, LinkedIn), number of posts per week, and community management hours to prevent burnout.</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border-slate-200">
                    <CardContent className="p-6">
                      <div className="size-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 mb-4">
                        <Shield className="size-5" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">Platform Independence</h3>
                      <p className="text-sm text-slate-500">Crucial clause that protects you if a platform (e.g., TikTok) changes its algorithm or goes down. You can't control the Zuck!</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border-slate-200">
                    <CardContent className="p-6">
                      <div className="size-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 mb-4">
                        <Info className="size-5" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">Content Approval Workflow</h3>
                      <p className="text-sm text-slate-500">Sets a deadline for clients to approve content (e.g., 48 hours). If they don't reply, it assumes approval to keep your schedule consistent.</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border-slate-200">
                    <CardContent className="p-6">
                      <div className="size-10 bg-rose-100 rounded-lg flex items-center justify-center text-rose-600 mb-4">
                        <FileText className="size-5" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">IP & Access Rights</h3>
                      <p className="text-sm text-slate-500">Defines who owns the content created and ensures you have legal access to their accounts without reliability for previous posts.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="bg-indigo-50 rounded-3xl p-8 border border-indigo-100">
                <h3 className="text-xl font-bold text-indigo-900 mb-4">Why use BoopSign for this contract?</h3>
                <p className="text-indigo-800 mb-6">
                  Most clients read contracts on their phone while between meetings. Sending a Word doc or PDF they have to print/scan is a deal-killer.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-indigo-900">
                    <Check className="size-5 text-indigo-600" /> <span><b>3-Minute Signing:</b> Clients click one link and sign with their finger.</span>
                  </li>
                  <li className="flex items-center gap-3 text-indigo-900">
                    <Check className="size-5 text-indigo-600" /> <span><b>No Account Required:</b> We explicitly do not force your clients to sign up.</span>
                  </li>
                  <li className="flex items-center gap-3 text-indigo-900">
                    <Check className="size-5 text-indigo-600" /> <span><b>Real-time Status:</b> See exactly when they view and sign the document.</span>
                  </li>
                </ul>
              </div>

              <div className="prose prose-slate max-w-none">
                <h3>Bonus: "No ROI Guarantee" Clause</h3>
                <p>
                  One of the most important parts of our template is the <b>Disclaimer of Results</b>. Social media is volatile.
                  This clause explicitly states that while you will perform your duties to the best of your ability,
                  specific results (viral posts, exact follower counts) cannot be legally guaranteed. This saves you from clients who expect
                  1M followers in month one.
                </p>
              </div>
            </div>

            {/* Sidebar CTA */}
            <div className="space-y-8 lg:sticky lg:top-24">
              <TemplateSidebar
                title="Get It Signed"
                subtitle="Free for your agency"
                buttonText="Start Signing Now"
                stats={[
                  { label: "Format", value: "Word / PDF / Editable" },
                  { label: "Pages", value: "4 (Standard)" },
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
                <p className="text-sm text-slate-600 italic mb-4">"The platform independence clause saved me when Instagram changed its reels algorithm. Essential template for any SMM."</p>
                <div className="flex items-center gap-3">
                  <div className="size-8 bg-slate-200 rounded-full" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Jessica Wong</p>
                    <p className="text-[10px] text-slate-500">Freelance Social Media Manager</p>
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
