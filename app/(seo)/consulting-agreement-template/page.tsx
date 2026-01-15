import { TemplateSidebar } from "@/components/templates/TemplateSidebar";
import { Card } from "@/components/ui/card";
import { Check, FileText } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Consulting Agreement Template | Download & E-Sign",
  description: "Formalize your consulting relationships with our professional agreement template. Customisable, legal, and ready for e-signature with BoopSign.",
  keywords: [
    "consulting agreement template",
    "freelance consulting contract",
    "professional services agreement",
    "esignature for consultants",
    "legal contract template",
  ],
  alternates: {
    canonical: "https://boopsign.com/consulting-agreement-template",
  },
};

import { TemplatePageHeader } from "@/components/templates/TemplatePageHeader";

export default function ConsultingAgreementPage() {
  return (
    <main className="min-h-screen bg-white">
      <TemplatePageHeader
        title="Consulting Agreement Template for 2026"
        subtitle="Formalize your consulting relationships. Clear terms, professional structure, and mobile-ready signing. Everything you need to close the deal and start billable work."
        category="Freelance & Consulting"
      />

      {/* Main Content Area */}
      <section className="py-24" id="preview">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
            {/* Template Side */}
            <div className="lg:col-span-3 space-y-12">
              <div className="bg-white rounded-[2rem] border border-slate-200 shadow-2xl overflow-hidden ring-8 ring-slate-100/50">
                <div className="bg-slate-900 p-8 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <FileText className="size-8 text-blue-400" />
                    <span className="text-white font-bold tracking-tight">Consulting_Agreement.pdf</span>
                  </div>
                  <span className="text-xs font-bold text-slate-400">PDF PREVIEW</span>
                </div>
                <div className="p-12 space-y-10">
                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">1. Engagement of Services</h4>
                    <div className="h-3 bg-slate-100 rounded w-full" />
                    <div className="h-3 bg-slate-100 rounded w-full" />
                    <div className="h-3 bg-slate-100 rounded w-4/5" />
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">2. Compensation & Payment</h4>
                    <div className="h-3 bg-slate-100 rounded w-full" />
                    <div className="h-3 bg-slate-100 rounded w-full" />
                    <div className="h-3 bg-slate-100 rounded w-3/4" />
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">3. Intellectual Property</h4>
                    <div className="h-3 bg-slate-100 rounded w-full" />
                    <div className="h-3 bg-slate-100 rounded w-5/6" />
                  </div>
                  <div className="pt-12 border-t border-slate-100 flex justify-between items-end">
                    <div className="space-y-4">
                      <p className="text-[10px] font-bold text-slate-400 mb-8 uppercase">Consultant Signature</p>
                      <div className="h-10 w-48 bg-slate-50 border-b-2 border-slate-200" />
                    </div>
                    <div className="space-y-4">
                      <p className="text-[10px] font-bold text-slate-400 mb-8 uppercase text-right">Client Signature</p>
                      <div className="h-10 w-48 bg-slate-50 border-b-2 border-slate-200" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="prose prose-slate max-w-none">
                <h2 className="text-4xl font-black text-slate-900 tracking-tight">What's inside this template?</h2>
                <p className="text-lg text-slate-600">
                  This agreement has been refined through years of consulting feedback. It covers the essential legal bases without the "lawyer-speak" that scares off clients.
                </p>
                <ul className="grid md:grid-cols-2 gap-x-12 gap-y-6 list-none pl-0 mt-12">
                  <li className="flex items-start gap-4">
                    <div className="size-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="size-3 text-blue-600" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Clear Scope of Work</span>
                      <span className="text-sm text-slate-500">Includes placeholders for milestones and deliverables.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="size-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="size-3 text-blue-600" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Payment Terms</span>
                      <span className="text-sm text-slate-500">Strict clauses for net-terms and late payment penalties.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="size-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="size-3 text-blue-600" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">IP Retention</span>
                      <span className="text-sm text-slate-500">Ensures you keep your methods while client gets the work.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="size-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="size-3 text-blue-600" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Termination Clauses</span>
                      <span className="text-sm text-slate-500">Protect your time if a project goes off the rails.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA Side */}
            <div className="lg:col-span-2 space-y-8 sticky top-24">
              <TemplateSidebar
                title="Seal the Deal"
                subtitle="Formal & Professional"
                buttonText="Sign This Contract Free"
                className="mt-0"
                features={[
                  "100% Legally Binding",
                  "No Client Accounts Required",
                  "Real-time Tracking",
                  "PDF Audit Trail"
                ]}
              />

              <Card className="rounded-[2rem] border-slate-100 shadow-sm bg-slate-50/50 p-8">
                <h4 className="font-bold text-slate-900 mb-4">Pro Tip for Consultants</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Always append a clear "Exhibit A" for your scope of work in the editor. It prevents scope-creep and ensures everyone knows exactly what is being signed for.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final Mini FAQ */}
      <section className="py-24 bg-slate-50/50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-12 text-left">
            <div>
              <h4 className="font-bold mb-2">Can I edit this template?</h4>
              <p className="text-sm text-slate-500">Yes! Once you upload it to BoopSign, you can add fields, text, and dates anywhere on the document.</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">Is it legally binding?</h4>
              <p className="text-sm text-slate-500">Absolutely. BoopSign agreements are compliant with ESIGN and UETA standards.</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">What if my client is on mobile?</h4>
              <p className="text-sm text-slate-500">That's where BoopSign shines. They can sign in seconds on their phone with zero friction.</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">How much does it cost?</h4>
              <p className="text-sm text-slate-500">$15/month for unlimited documents. No hidden per-signer fees.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}