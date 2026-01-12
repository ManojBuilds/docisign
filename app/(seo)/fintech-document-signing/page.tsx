import StartTrialBtn from "@/components/StartTrialBtn";
import Cta from "@/components/cta";
import Faq from "@/components/faq";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, CreditCard, Landmark, ShieldAlert, ShieldCheck, Smartphone, Wallet } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "eSignature for Financial Services | Loan Approvals & Onboarding",
  description:
    "Accelerate client onboarding and loan approvals with BoopSign. Secure, compliant eSignatures for fintech and financial services – with zero client friction.",
  keywords: [
    "fintech document signing",
    "financial services e-signature",
    "loan application online signature",
    "secure financial contracts",
    "kyc document signing",
    "boopsign",
    "mortgage electronic signature"
  ],
  alternates: {
    canonical: "https://boopsign.com/fintech-document-signing",
  },
};

const fintechFaq = [
  {
    id: "ft-faq-1",
    question: "Is BoopSign secure enough for financial documents?",
    answer:
      "Yes. We use industry-standard SSL encryption and secure storage to protect your sensitive financial data. Every document includes a detailed audit trail (IP address, timestamps) to ensure legal enforceability.",
  },
  {
    id: "ft-faq-2",
    question: "Do clients need to create an account to sign bank forms?",
    answer:
      "No. This is why financial advisors and fintech teams choose BoopSign. Your clients receive a secure link and sign instantly from their mobile device. This eliminates the password frustration that slows down loan approvals.",
  },
  {
    id: "ft-faq-3",
    question: "Can I use BoopSign for loan applications and KYC?",
    answer:
      "Definitely. BoopSign is perfect for loan agreements, KYC disclosures, account opening forms, and investment disclosures. It simplifies the client experience while maintaining security standards.",
  },
  {
    id: "ft-faq-4",
    question: "How does this help with client onboarding?",
    answer:
      "By removing the login step, you reduce the 'drop-off' rate during onboarding. Clients are 3x more likely to complete a document when they can sign it immediately upon opening the email.",
  },
  {
    id: "ft-faq-5",
    question: "Is it compliant with financial regulations?",
    answer:
      "BoopSign is fully compliant with the ESIGN Act and UETA, providing legally binding signatures that are accepted for most financial transactions in the US and globally.",
  },
];

export default function FintechDocumentSigningPage() {
  return (
    <div className="flex flex-col gap-16 md:gap-24 py-8 md:py-16">
      {/* Hero Section */}
      <section className="text-center px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="inline-flex items-center justify-center p-2 mb-6 bg-emerald-50 rounded-full text-emerald-600 text-sm font-medium animate-fade-in">
            <Badge variant="secondary" className="mr-2 bg-emerald-600 text-white hover:bg-emerald-700">Financial Services</Badge>
            Secure Onboarding for 2026
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight text-slate-900">
            Automate <span className="text-emerald-600">Financial Deals</span> with BoopSign
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
            Eliminate document friction. Accelerate loan approvals, account openings, and KYC workflows with
            secure eSignatures. No client login required.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12 text-sm md:text-base">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              <Landmark className="w-4 h-4 text-emerald-500" />
              <span>Loan Applications</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              <Wallet className="w-4 h-4 text-blue-500" />
              <span>Account Onboarding</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              <CreditCard className="w-4 h-4 text-purple-500" />
              <span>KYC Disclosures</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-orange-500" />
              <span>Audit Trail Logs</span>
            </div>
          </div>

          <StartTrialBtn />

          <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-gray-500 italic">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 text-lg">★★★★★</span>
              <span>"Onboarding conversion increased by 40%"</span>
            </div>
            <div className="hidden md:block w-1 h-1 bg-gray-300 rounded-full"></div>
            <div>Trusted by Fintech Founders & Advisors</div>
          </div>
        </div>
      </section>

      {/* Why BoopSign for Fintech */}
      <section className="bg-slate-50 border-y border-slate-100 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for Modern Financial Workflows
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Close deals at the speed of the internet. BoopSign is the modern alternative for financial teams.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mb-4">
                  <CreditCard className="w-6 h-6" />
                </div>
                <CardTitle>Instant Onboarding</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Stop losing customers to complex portals. Clients sign onboarding documents instantly from their phone, drastically reducing your churn rate.
              </CardContent>
            </Card>
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6" />
                </div>
                <CardTitle>Mobile-First Loans</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Most financial transactions now happen on mobile. BoopSign provides a native-feel signing experience that works perfectly in any mobile browser.
              </CardContent>
            </Card>
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <CardTitle>Fraud Prevention</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Our detailed audit trails capture IP addresses, email verification, and precise timestamps, giving you the security you need for high-stakes deals.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Fintech Use Cases */}
      <section className="px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                One App for Every Financial Agreement
              </h2>
              <ul className="space-y-4 text-lg text-gray-700">
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 w-6 h-6" />
                  <span>Consumer & Business Loan Agreements</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 w-6 h-6" />
                  <span>Account Opening & KYC Forms</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 w-6 h-6" />
                  <span>Investment Advisory Contracts</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 w-6 h-6" />
                  <span>Asset Transfer Authorizations</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 w-6 h-6" />
                  <span>Service Professional Agreements</span>
                </li>
              </ul>
              <div className="mt-8">
                <StartTrialBtn />
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="bg-emerald-600 p-8 rounded-2xl text-white flex flex-col justify-between aspect-square">
                <div className="text-4xl font-bold">40%</div>
                <div className="text-sm opacity-90">Higher conversion on onboarding documents.</div>
              </div>
              <div className="bg-slate-800 p-8 rounded-2xl text-white flex flex-col justify-between aspect-square mt-8">
                <div className="text-4xl font-bold">SOC2</div>
                <div className="text-sm opacity-90">Designed for bank-level security and compliance.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-12 text-slate-900">How BoopSign Compares for Fintech</h2>
          <div className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="py-4 px-6 font-semibold">Requirement</th>
                  <th className="py-4 px-6 font-semibold text-emerald-600">BoopSign</th>
                  <th className="py-4 px-6 font-semibold text-gray-500">Other Vendors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-4 px-6">Client Portal Login</td>
                  <td className="py-4 px-6 font-bold text-green-600">Not Required</td>
                  <td className="py-4 px-6">Required (Often Friction-heavy)</td>
                </tr>
                <tr>
                  <td className="py-4 px-6">Signature Accuracy</td>
                  <td className="py-4 px-6 font-bold text-green-600">100% Reliable</td>
                  <td className="py-4 px-6 text-gray-500 text-sm">Consistent</td>
                </tr>
                <tr>
                  <td className="py-4 px-6">Mobile On-the-Go Signing</td>
                  <td className="py-4 px-6 font-bold text-green-600">Optimized</td>
                  <td className="py-4 px-6">Sub-optimal</td>
                </tr>
                <tr>
                  <td className="py-4 px-6">Monthly Cost</td>
                  <td className="py-4 px-6 font-bold text-green-600">$15/mo</td>
                  <td className="py-4 px-6">$25 - $100+ /mo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4">
        <div className="container mx-auto max-w-4xl">
          <Faq heading="Financial eSignatures: Frequently Asked Questions" items={fintechFaq} />
        </div>
      </section>

      {/* Final CTA */}
      <Cta />
    </div>
  );
}
