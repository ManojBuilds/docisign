import StartTrialBtn from "@/components/StartTrialBtn";
import Cta from "@/components/cta";
import Faq from "@/components/faq";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, CheckCircle, Clock, FileText, ShieldCheck, UserCheck } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "eSignature for Consultants | Close Projects Faster",
  description:
    "The e-signature solution built for independent consultants. Get NDAs, SOWs, and consulting agreements signed instantly with BoopSign—no client account required.",
  keywords: [
    "esignature for consultants",
    "consulting agreement online signature",
    "send NDAs online",
    "SOW electronic signature",
    "consultant contract tool",
    "boopsign",
    "online signature for advisors"
  ],
  alternates: {
    canonical: "https://boopsign.com/esignature-for-consultants",
  },
};

const consultantFaq = [
  {
    id: "co-faq-1",
    question: "Can I use BoopSign for master service agreements (MSA)?",
    answer:
      "Yes. BoopSign is perfect for MSAs, SOWs, and individual project contracts. You can upload any PDF and have your client sign it in minutes.",
  },
  {
    id: "co-faq-2",
    question: "How do I handle NDAs before a project starts?",
    answer:
      "You can send an NDA link as soon as you have your first discovery call. Since clients don't need to create an account, they can sign it immediately, allowing you to start sharing sensitive information sooner.",
  },
  {
    id: "co-faq-3",
    question: "Do my clients see my branding?",
    answer:
      "Yes, your clients will see a professional, clean interface that reflects well on your consulting business. We focus on a premium, frictionless signing experience.",
  },
  {
    id: "co-faq-4",
    question: "Is it secure for sensitive business strategies?",
    answer:
      "Absolutely. We use bank-level SSL encryption and secure storage. Your consulting agreements and client data are protected with industry-standard protocols.",
  },
  {
    id: "co-faq-5",
    question: "Can I add multiple signers to one agreement?",
    answer:
      "Yes! You can add multiple signers to a single document, which is perfect for consulting projects that require approval from both a Project Manager and a Finance Lead.",
  },
];

export default function ConsultantDocumentSigningPage() {
  return (
    <div className="flex flex-col gap-16 md:gap-24 py-8 md:py-16">
      {/* Hero Section */}
      <section className="text-center px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="inline-flex items-center justify-center p-2 mb-6 bg-slate-100 rounded-full text-slate-600 text-sm font-medium animate-fade-in">
            <Badge variant="secondary" className="mr-2 bg-slate-900 text-white">Consultants</Badge>
            Professional Workflow for 2026
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight text-slate-900">
            Close <span className="text-blue-600">High-Value Deals</span> Faster
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
            Eliminate friction in your consulting business. Get SOWs, NDAs, and agreements signed
            without forcing your clients to create an account.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12 text-sm md:text-base">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              <Briefcase className="w-4 h-4 text-blue-500" />
              <span>Premium Experience</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              <span>Secure & Enforceable</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              <UserCheck className="w-4 h-4 text-purple-500" />
              <span>Zero Client Login</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              <Clock className="w-4 h-4 text-orange-500" />
              <span>Minutes to Sign</span>
            </div>
          </div>

          <StartTrialBtn />

          <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-gray-500 italic">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 text-lg">★★★★★</span>
              <span>"The most professional way to send SOWs"</span>
            </div>
            <div className="hidden md:block w-1 h-1 bg-gray-300 rounded-full"></div>
            <div>Trusted by Independent Advisors & Boutique Agencies</div>
          </div>
        </div>
      </section>

      {/* Why BoopSign for Consultants */}
      <section className="bg-slate-50 border-y border-slate-100 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              Designed for Professional Excellence
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              In consulting, speed and professionalism are everything. BoopSign delivers both.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6" />
                </div>
                <CardTitle>Seamless NDAs</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Don't let legal hold up your discovery process. Send NDAs that can be signed instantly on any device, allowing your collaboration to start without delay.
              </CardContent>
            </Card>
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <CardTitle>Bank-Level Security</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Protect your intellectual property with secure storage and detailed audit trails. Every signature is verifiable and legally binding.
              </CardContent>
            </Card>
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <UserCheck className="w-6 h-6" />
                </div>
                <CardTitle>Zero Barrier to Entry</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Your clients are busy people. BoopSign respects their time by letting them sign your consulting agreements without forced account creation.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Consultant Use Cases */}
      <section className="px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
                One Platform for All Your Consulting Agreements
              </h2>
              <ul className="space-y-4 text-lg text-gray-700">
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 w-6 h-6" />
                  <span>Master Service Agreements (MSA)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 w-6 h-6" />
                  <span>Statements of Work (SOW)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 w-6 h-6" />
                  <span>Non-Disclosure Agreements (NDA)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 w-6 h-6" />
                  <span>Monthly Retainer Agreements</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 w-6 h-6" />
                  <span>Final Milestone Sign-offs</span>
                </li>
              </ul>
              <div className="mt-8">
                <StartTrialBtn />
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="bg-slate-900 p-8 rounded-2xl text-white flex flex-col justify-between aspect-square">
                <div className="text-4xl font-bold">3x</div>
                <div className="text-sm opacity-90">Faster project kick-off with instant signing.</div>
              </div>
              <div className="bg-blue-600 p-8 rounded-2xl text-white flex flex-col justify-between aspect-square mt-8">
                <div className="text-4xl font-bold">100%</div>
                <div className="text-sm opacity-90">Client satisfaction on the signing process.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4">
        <div className="container mx-auto max-w-4xl">
          <Faq heading="Consulting eSignatures: Frequently Asked Questions" items={consultantFaq} />
        </div>
      </section>

      {/* Final CTA */}
      <Cta />
    </div>
  );
}
