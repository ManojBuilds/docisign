import StartTrialBtn from "@/components/StartTrialBtn";
import Cta from "@/components/cta";
import Faq from "@/components/faq";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, FileCheck, Home, Key, Landmark, ShieldCheck, Smartphone } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate eSignature Software | Sign Property Contracts Online",
  description:
    "Streamline real estate transactions with BoopSign. The fastest way to sign lease agreements, purchase contracts, and disclosures on mobile – no client accounts required.",
  keywords: [
    "real estate document signing",
    "property contract signing",
    "electronic real estate forms",
    "digital property transactions",
    "boopsign",
    "real estate paperwork",
    "esignature for real estate agents",
    "lease agreement electronic signature"
  ],
  alternates: {
    canonical: "https://boopsign.com/real-estate-document-signing",
  },
};

const realEstateFaq = [
  {
    id: "re-faq-1",
    question: "Is BoopSign legally binding for real estate contracts?",
    answer:
      "Yes. BoopSign is fully compliant with the ESIGN Act and UETA, making your electronically signed real estate documents legally binding in the United States and many other jurisdictions.",
  },
  {
    id: "re-faq-2",
    question: "Do my clients need to create an account to sign?",
    answer:
      "No. This is why real estate agents love BoopSign. Your clients receive a secure link and can sign immediately from their phone or computer without any registration or app downloads.",
  },
  {
    id: "re-faq-3",
    question: "Can I use BoopSign for lease agreements and disclosures?",
    answer:
      "Absolutely. BoopSign is perfect for leases, rental applications, lead-based paint disclosures, and purchase agreements. Any PDF can be turned into a signable document in seconds.",
  },
  {
    id: "re-faq-4",
    question: "How secure are my property documents?",
    answer:
      "We use industry-standard SSL encryption and secure storage to ensure all your real estate contracts and client data are protected at all times.",
  },
  {
    id: "re-faq-5",
    question: "Does it work on mobile for on-site signings?",
    answer:
      "Yes! BoopSign is built mobile-first. You can send a document while at a showing and have your client sign it right then and there on their own device.",
  },
];

export default function RealEstateDocumentSigningPage() {
  return (
    <div className="flex flex-col gap-16 md:gap-24 py-8 md:py-16">
      {/* Hero Section */}
      <section className="text-center px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="inline-flex items-center justify-center p-2 mb-6 bg-blue-50 rounded-full text-blue-600 text-sm font-medium animate-fade-in">
            <Badge variant="secondary" className="mr-2 bg-blue-600 text-white hover:bg-blue-700">New</Badge>
            Real Estate Solutions for 2026
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight">
            Simplify <span className="text-blue-600">Real Estate Deals</span> with BoopSign
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
            Enhance your property workflows—from lease applications to purchase agreements.
            Provide a premium client experience with instant mobile signing. No account required.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12 text-sm md:text-base">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              <FileCheck className="w-4 h-4 text-green-500" />
              <span>Lease Agreements</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              <Landmark className="w-4 h-4 text-blue-500" />
              <span>Purchase Contracts</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              <Smartphone className="w-4 h-4 text-purple-500" />
              <span>Mobile-First</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-orange-500" />
              <span>Legally Binding</span>
            </div>
          </div>

          <StartTrialBtn />

          <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-gray-500 italic">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 text-lg">★★★★★</span>
              <span>"Best tool for quick lease signings"</span>
            </div>
            <div className="hidden md:block w-1 h-1 bg-gray-300 rounded-full"></div>
            <div>Trusted by 500+ Property Managers</div>
          </div>
        </div>
      </section>

      {/* Why BoopSign for Real Estate */}
      <section className="bg-slate-50 border-y border-slate-100 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Designed for the Fast-Paced Real Estate Market
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Don't let clunky software slow down your closings. BoopSign is built for speed and simplicity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Home className="w-6 h-6" />
                </div>
                <CardTitle>Sign On-Site</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Send a document while at a property showing. Your clients can sign immediately on their phone—no need to wait until they get home to their computer.
              </CardContent>
            </Card>
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                  <Key className="w-6 h-6" />
                </div>
                <CardTitle>Zero Friction</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Stop losing deals to "I can't log in." Your signers click a secure link and sign. Simple, fast, and professional.
              </CardContent>
            </Card>
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <CardTitle>Full Compliance</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Every signature comes with a detailed audit trail. Fully compliant with ESIGN and UETA for peace of mind in every transaction.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Real Estate Use Cases */}
      <section className="px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                One Platform for All Your Property Paperwork
              </h2>
              <ul className="space-y-4 text-lg text-gray-700">
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 w-6 h-6" />
                  <span>Residential & Commercial Leases</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 w-6 h-6" />
                  <span>Purchase & Sale Agreements</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 w-6 h-6" />
                  <span>Lead-Based Paint Disclosures</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 w-6 h-6" />
                  <span>Rental Applications & Screening Forms</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 w-6 h-6" />
                  <span>Property Management Agreements</span>
                </li>
              </ul>
              <div className="mt-8">
                <StartTrialBtn />
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="bg-blue-600 p-8 rounded-2xl text-white flex flex-col justify-between aspect-square">
                <div className="text-4xl font-bold">3x</div>
                <div className="text-sm opacity-90">Faster document completion than email or physical paper.</div>
              </div>
              <div className="bg-slate-800 p-8 rounded-2xl text-white flex flex-col justify-between aspect-square mt-8">
                <div className="text-4xl font-bold">0</div>
                <div className="text-sm opacity-90">Client accounts required. Higher completion rates.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section (Simplified) */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-12">How BoopSign Compares for Real Estate</h2>
          <div className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="py-4 px-6 font-semibold">Requirement</th>
                  <th className="py-4 px-6 font-semibold text-blue-600">BoopSign</th>
                  <th className="py-4 px-6 font-semibold text-gray-500">Other Vendors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-4 px-6">Signer Account Required</td>
                  <td className="py-4 px-6 font-bold text-green-600">No</td>
                  <td className="py-4 px-6">Yes</td>
                </tr>
                <tr>
                  <td className="py-4 px-6">Mobile Signing Experience</td>
                  <td className="py-4 px-6 font-bold text-green-600">Native Feel</td>
                  <td className="py-4 px-6 text-gray-500 text-sm italic">"Desktop-on-Mobile"</td>
                </tr>
                <tr>
                  <td className="py-4 px-6">Monthly Cost</td>
                  <td className="py-4 px-6 font-bold text-green-600">$15/mo</td>
                  <td className="py-4 px-6">$25+ /mo</td>
                </tr>
                <tr>
                  <td className="py-4 px-6">Legally Binding Audit Trail</td>
                  <td className="py-4 px-6 font-bold text-green-600">Included</td>
                  <td className="py-4 px-6">Included</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4">
        <div className="container mx-auto max-w-4xl">
          <Faq heading="Real Estate eSignatures: Frequently Asked Questions" items={realEstateFaq} />
        </div>
      </section>

      {/* Final CTA */}
      <Cta />
    </div>
  );
}