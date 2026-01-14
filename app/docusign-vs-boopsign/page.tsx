import ComparasionTable from "@/components/ComparasionTable";
import Cta from "@/components/cta";
import Faq from "@/components/faq";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Info, Shield, Zap } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DocuSign vs BoopSign: The Best Choice for Freelancers & Small Teams",
  description: "Comparing DocuSign and BoopSign for freelancers and small teams. Learn why BoopSign is 3x faster and 50% cheaper with zero signer friction.",
  keywords: ["docusign vs boopsign", "boopsign vs docusign", "best docusign alternative freelancers", "esignature comparison"],
};

const comparisonFaq = [
  {
    id: "comp-1",
    question: "Is BoopSign really as secure as DocuSign?",
    answer: "Yes. We use industry-standard AES-256 encryption and provide a full, legally-binding audit trail with every signed document. Our infrastructure is built on modern, secure foundations."
  },
  {
    id: "comp-2",
    question: "Do my clients need to pay or sign up?",
    answer: "Never. Your clients simply click a link and sign. No accounts, no credit cards, no apps. This is where we differ most from DocuSign's 'Force account' model."
  },
  {
    id: "comp-3",
    question: "Can I switch from DocuSign easily?",
    answer: "Absolutely. You can upload any PDF directly to BoopSign. Our interface is so intuitive that most users are sending their first document within 60 seconds of signing up."
  }
];

export default function ComparisonPage() {
  return (
    <div className="flex flex-col gap-12 md:gap-24 py-12 md:py-24">
      {/* Hero / Positioning */}
      <section className="container mx-auto px-4 text-center max-w-5xl">
        <Badge variant="outline" className="mb-6 border-blue-200 text-blue-700 bg-blue-50 py-1.5 px-4 font-semibold rounded-full">
          2026 Comparison Guide
        </Badge>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight">
          BoopSign or DocuSign? <br />
          <span className="text-blue-600">The Honest Truth for Freelancers</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10">
          DocuSign is built for the Fortune 500. BoopSign is built for you.
          If you need complex enterprise workflows, choose DocuSign.
          If you want <span className="text-slate-900 font-bold italic">contracts signed in 60 seconds</span> without client friction, choose BoopSign.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
            <Zap className="size-6 text-blue-600" />
            <span className="font-bold text-slate-900 uppercase tracking-tighter text-sm">3x Faster Signing</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
            <CheckCircle className="size-6 text-blue-600" />
            <span className="font-bold text-slate-900 uppercase tracking-tighter text-sm">Zero Client Signups</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
            <Shield className="size-6 text-blue-600" />
            <span className="font-bold text-slate-900 uppercase tracking-tighter text-sm">Legally Binding</span>
          </div>
        </div>
      </section>

      {/* Main Table */}
      <ComparasionTable className="bg-slate-50/50 py-24" />

      {/* Decision Guide */}
      <section className="container mx-auto px-4 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="p-10 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Info className="size-32" />
            </div>
            <h3 className="text-2xl font-bold mb-6 text-slate-900">Choose DocuSign if...</h3>
            <ul className="space-y-4 text-slate-600">
              <li className="flex gap-3">
                <CheckCircle className="size-5 text-slate-300 mt-1 flex-shrink-0" />
                <span>You have 500+ employees and need Enterprise HR workflows.</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="size-5 text-slate-300 mt-1 flex-shrink-0" />
                <span>You require deep integration with SAP or Oracle.</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="size-5 text-slate-300 mt-1 flex-shrink-0" />
                <span>You have a massive legal department that mandates industry-standard tools.</span>
              </li>
            </ul>
          </div>

          <div className="p-10 bg-blue-600 rounded-[2.5rem] shadow-xl shadow-blue-200 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap className="size-32" />
            </div>
            <h3 className="text-2xl font-bold mb-6">Choose BoopSign if...</h3>
            <ul className="space-y-4 text-blue-50">
              <li className="flex gap-3">
                <CheckCircle className="size-5 text-blue-300 mt-1 flex-shrink-0" />
                <span>You are a <span className="font-bold text-white underline decoration-white/30">Freelancer or Consultant</span> who values speed.</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="size-5 text-blue-300 mt-1 flex-shrink-0" />
                <span>You want to avoid clients asking "Do I need an account?".</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="size-5 text-blue-300 mt-1 flex-shrink-0" />
                <span>You want a simple $15/month price for unlimited everything.</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="size-5 text-blue-300 mt-1 flex-shrink-0" />
                <span>You need your documents signed mostly on mobile.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 max-w-4xl">
        <Faq heading="Common Questions" items={comparisonFaq} />
      </section>

      {/* Final Call */}
      <Cta />
    </div>
  );
}
