import StartTrialBtn from "@/components/StartTrialBtn";
import Cta from "@/components/cta";
import Faq from "@/components/faq";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Coffee, DollarSign, Smartphone, Zap } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "eSignature for Freelancers | Get Paid Faster with BoopSign",
  description:
    "The simplest e-signature solution built for freelancers. Get contracts, NDAs, and project proposals signed in minutes—no client account required.",
  keywords: [
    "esignature for freelancers",
    "freelance contract signing",
    "online signature for solopreneurs",
    "get paid faster freelancers",
    "simple e-signature tool",
    "boopsign",
    "no-account e-signature for clients"
  ],
  alternates: {
    canonical: "https://boopsign.com/esignature-for-freelancers",
  },
};

const freelancerFaq = [
  {
    id: "fl-faq-1",
    question: "How do I get my freelance contract signed?",
    answer:
      "Simply upload your contract as a PDF, add signature fields, and send a secure link to your client. They can sign in seconds from their phone or computer—no account required on their end.",
  },
  {
    id: "fl-faq-2",
    question: "Do my clients need a BoopSign account to sign?",
    answer:
      "No! This is our #1 feature for freelancers. Your clients never have to register, remember a password, or download an app. They just click, sign, and you're done.",
  },
  {
    id: "fl-faq-3",
    question: "Is it legally binding?",
    answer:
      "Yes. Every signature comes with a full audit trail including timestamps, IP addresses, and email verification, making it fully compliant with the ESIGN Act and UETA.",
  },
  {
    id: "fl-faq-4",
    question: "Can I use it for NDAs and proposals?",
    answer:
      "Absolutely. BoopSign is perfect for any document that needs a signature—from initial intake forms and NDAs to project proposals and final contracts.",
  },
  {
    id: "fl-faq-5",
    question: "What happens after the client signs?",
    answer:
      "Both you and your client automatically receive a final signed PDF via email. You can also download it anytime from your BoopSign dashboard.",
  },
];

export default function FreelancerDocumentSigningPage() {
  return (
    <div className="flex flex-col gap-16 md:gap-24 py-8 md:py-16">
      {/* Hero Section */}
      <section className="text-center px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="inline-flex items-center justify-center p-2 mb-6 bg-orange-50 rounded-full text-orange-600 text-sm font-medium animate-fade-in">
            <Badge variant="secondary" className="mr-2 bg-orange-600 text-white hover:bg-orange-700">Freelancers</Badge>
            Built for Solo Professionals in 2026
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight text-slate-900">
            Get Paid <span className="text-orange-600">3x Faster</span> with BoopSign
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
            Stop chasing signatures. The simplest way for freelancers to get contracts signed.
            No complex dashboards, no client accounts—just faster business.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12 text-sm md:text-base">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              <Coffee className="w-4 h-4 text-orange-500" />
              <span>Solo-Friendly</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              <Zap className="w-4 h-4 text-blue-500" />
              <span>Instant Setup</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              <DollarSign className="w-4 h-4 text-green-500" />
              <span>Affordable</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              <Smartphone className="w-4 h-4 text-purple-500" />
              <span>Mobile-First</span>
            </div>
          </div>

          <StartTrialBtn />

          <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-gray-500 italic">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 text-lg">★★★★★</span>
              <span>"The only tool that doesn't annoy my clients"</span>
            </div>
            <div className="hidden md:block w-1 h-1 bg-gray-300 rounded-full"></div>
            <div>Trusted by 3,000+ Freelancers globally</div>
          </div>
        </div>
      </section>

      {/* Why BoopSign for Freelancers */}
      <section className="bg-slate-50 border-y border-slate-100 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Finally, an eSignature Tool That Actually Helps You
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Most tools are built for "teams" and "enterprises." We built BoopSign specifically for you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <CardTitle>Sign in 60 Seconds</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Your clients can sign contracts as soon as they open the email. No "Enter your password" or "Create an account" blocks. Higher completion rates mean you start projects sooner.
              </CardContent>
            </Card>
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6" />
                </div>
                <CardTitle>Truly Mobile-First</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Clients can sign while standing in line for coffee. Our interface is designed for fingers and small screens, making sure your documents look professional everywhere.
              </CardContent>
            </Card>
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <CardTitle>Save 10+ Hours/Month</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Automated reminders and a dead-simple dashboard mean you spend less time managing paperwork and more time doing billable work.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Freelancer Use Cases */}
      <section className="px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Protect Your Business Without the Hassle
              </h2>
              <ul className="space-y-4 text-lg text-gray-700">
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 w-6 h-6" />
                  <span>Simple Service Agreements</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 w-6 h-6" />
                  <span>Non-Disclosure Agreements (NDAs)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 w-6 h-6" />
                  <span>Project Proposals & SOWs</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 w-6 h-6" />
                  <span>Intellectual Property Assignments</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 w-6 h-6" />
                  <span>Client Onboarding Questionnaires</span>
                </li>
              </ul>
              <div className="mt-8">
                <StartTrialBtn />
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="bg-orange-600 p-8 rounded-2xl text-white flex flex-col justify-between aspect-square">
                <div className="text-4xl font-bold">1/2</div>
                <div className="text-sm opacity-90">Cost of DocuSign. No per-document fees.</div>
              </div>
              <div className="bg-slate-800 p-8 rounded-2xl text-white flex flex-col justify-between aspect-square mt-8">
                <div className="text-4xl font-bold">100%</div>
                <div className="text-sm opacity-90">Legally binding in US, EU, UK, and beyond.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-12 text-slate-900">Built for Solopreneurs, not HR Teams</h2>
          <div className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="py-4 px-6 font-semibold">Requirement</th>
                  <th className="py-4 px-6 font-semibold text-orange-600">BoopSign</th>
                  <th className="py-4 px-6 font-semibold text-gray-500">The "Big" Guys</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-4 px-6">Client Account Required</td>
                  <td className="py-4 px-6 font-bold text-green-600">Never</td>
                  <td className="py-4 px-6">Often Forced</td>
                </tr>
                <tr>
                  <td className="py-4 px-6">Monthly Cost</td>
                  <td className="py-4 px-6 font-bold text-green-600">$15 (Everything included)</td>
                  <td className="py-4 px-6">$25 - $65 + "Add-ons"</td>
                </tr>
                <tr>
                  <td className="py-4 px-6">Signing Experience</td>
                  <td className="py-4 px-6 font-bold text-green-600">1-Click Sign</td>
                  <td className="py-4 px-6 text-gray-500">Multi-step Process</td>
                </tr>
                <tr>
                  <td className="py-4 px-6">Mobile App Needed</td>
                  <td className="py-4 px-6 font-bold text-green-600">No (Works in Browser)</td>
                  <td className="py-4 px-6 text-gray-500">Pushed heavily</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4">
        <div className="container mx-auto max-w-4xl">
          <Faq heading="Freelance eSignatures: Frequently Asked Questions" items={freelancerFaq} />
        </div>
      </section>

      {/* Final CTA */}
      <Cta />
    </div>
  );
}
