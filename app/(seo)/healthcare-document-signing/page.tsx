import StartTrialBtn from "@/components/StartTrialBtn";
import Cta from "@/components/cta";
import Faq from "@/components/faq";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CheckCircle, Clock, Heart, ShieldCheck, Smartphone, Stethoscope } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "eSignature for Healthcare | Secure Patient Consent & Forms",
  description:
    "Streamline patient onboarding and clinical workflows with BoopSign. Secure, legally binding eSignatures for patient consent forms, disclosures, and telemedicine – no patient account required.",
  keywords: [
    "healthcare document signing",
    "patient consent e-signature",
    "hipaa compliant e-signature alternative",
    "medical form signing",
    "telemedicine consent online",
    "boopsign",
    "healthcare paperwork digitizing"
  ],
  alternates: {
    canonical: "https://boopsign.com/healthcare-document-signing",
  },
};

const healthcareFaq = [
  {
    id: "hc-faq-1",
    question: "Is BoopSign HIPAA compliant?",
    answer:
      "BoopSign is designed with security as a priority. While we provide the technical safeguards necessary for HIPAA compliance—such as SSL encryption, secure audit trails, and encrypted storage—healthcare providers should ensure their specific workflows and BAAs are in place.",
  },
  {
    id: "hc-faq-2",
    question: "Do patients need to download an app to sign forms?",
    answer:
      "No. Patients can sign consent forms and medical history documents directly from their smartphone or tablet. They simply click a secure link in their email or SMS and sign instantly—no account creation or app download needed.",
  },
  {
    id: "hc-faq-3",
    question: "How long does it take for a patient to sign a consent form?",
    answer:
      "Most patients complete their forms in under 2 minutes. Because there's no login required, the friction is eliminated, leading to faster check-ins and reduced wait times.",
  },
  {
    id: "hc-faq-4",
    question: "Can I use BoopSign for telemedicine appointments?",
    answer:
      "Absolutely. You can send the necessary consent forms to patients before their remote session. They can sign on their mobile device or computer, ensuring all paperwork is completed before the call begins.",
  },
  {
    id: "hc-faq-5",
    question: "Is there an audit trail for medical signatures?",
    answer:
      "Yes. Every signed document includes a comprehensive audit trail with timestamps, IP addresses, and email verification, providing a secure and verifiable record for every signature.",
  },
];

export default function HealthcareDocumentSigningPage() {
  return (
    <div className="flex flex-col gap-16 md:gap-24 py-8 md:py-16">
      {/* Hero Section */}
      <section className="text-center px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="inline-flex items-center justify-center p-2 mb-6 bg-red-50 rounded-full text-red-600 text-sm font-medium animate-fade-in">
            <Badge variant="secondary" className="mr-2 bg-red-600 text-white hover:bg-red-700">Healthcare</Badge>
            Secure Patient Workflows for 2026
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight">
            Simplify <span className="text-red-600">Patient Care</span> with BoopSign
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
            Eliminate paper forms and reduce patient wait times. Secure, simple eSignatures for consent forms,
            telemedicine, and clinical intake—no patient accounts or app downloads required.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12 text-sm md:text-base">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              <Heart className="w-4 h-4 text-red-500" />
              <span>Patient Consent</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              <Activity className="w-4 h-4 text-blue-500" />
              <span>Clinical Intake</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              <Smartphone className="w-4 h-4 text-purple-500" />
              <span>Mobile Check-In</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-orange-500" />
              <span>Secure Audit Trail</span>
            </div>
          </div>

          <StartTrialBtn />

          <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-gray-500 italic">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 text-lg">★★★★★</span>
              <span>"Saved us 20 hours a week on intake"</span>
            </div>
            <div className="hidden md:block w-1 h-1 bg-gray-300 rounded-full"></div>
            <div>Trusted by Private Practices & Clinics</div>
          </div>
        </div>
      </section>

      {/* Why BoopSign for Healthcare */}
      <section className="bg-slate-50 border-y border-slate-100 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Modernizing the Patient Experience
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Focus on care, not paperwork. BoopSign removes the friction from patient onboarding.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-4">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <CardTitle>Remote Telemedicine</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Send consent forms before the virtual visit. Patients sign on their own phone or tablet instantly—ensuring you're ready to start the appointment on time.
              </CardContent>
            </Card>
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <CardTitle>Reduce Wait Times</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Forget the clipboard. Send forms to patients while they're in the waiting room—or even before they arrive—to streamline your front-office workflow.
              </CardContent>
            </Card>
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <CardTitle>Secure & Compliant</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Encrypted storage and detailed audit logs help you maintain the high standards required for medical record keeping and patient privacy.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Healthcare Use Cases */}
      <section className="px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                One Secure Link for Every Patient Form
              </h2>
              <ul className="space-y-4 text-lg text-gray-700">
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 w-6 h-6" />
                  <span>HIPAA-Sensitive Patient Consents</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 w-6 h-6" />
                  <span>Medical History & Intake Forms</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 w-6 h-6" />
                  <span>Policy & Privacy Disclosures</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 w-6 h-6" />
                  <span>Insurance & Billing Authorizations</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 w-6 h-6" />
                  <span>Referral & Laboratory Forms</span>
                </li>
              </ul>
              <div className="mt-8">
                <StartTrialBtn />
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="bg-red-600 p-8 rounded-2xl text-white flex flex-col justify-between aspect-square">
                <div className="text-4xl font-bold">10m</div>
                <div className="text-sm opacity-90">Avg time to get patient forms completed.</div>
              </div>
              <div className="bg-slate-800 p-8 rounded-2xl text-white flex flex-col justify-between aspect-square mt-8">
                <div className="text-4xl font-bold">$30</div>
                <div className="text-sm opacity-90">Estimated cost reduction per document processed.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-12">How BoopSign Compares for Healthcare</h2>
          <div className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="py-4 px-6 font-semibold">Requirement</th>
                  <th className="py-4 px-6 font-semibold text-red-600">BoopSign</th>
                  <th className="py-4 px-6 font-semibold text-gray-500">Other Vendors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-4 px-6">Patient Account Required</td>
                  <td className="py-4 px-6 font-bold text-green-600">No</td>
                  <td className="py-4 px-6">Yes (Standard)</td>
                </tr>
                <tr>
                  <td className="py-4 px-6">Ease for Elderly Patients</td>
                  <td className="py-4 px-6 font-bold text-green-600">High (1-Click)</td>
                  <td className="py-4 px-6 text-gray-500 text-sm italic">Lower (Multi-step)</td>
                </tr>
                <tr>
                  <td className="py-4 px-6">Mobile Check-In Native Feel</td>
                  <td className="py-4 px-6 font-bold text-green-600">Yes</td>
                  <td className="py-4 px-6">No (Web Only)</td>
                </tr>
                <tr>
                  <td className="py-4 px-6">Detailed Audit Logs</td>
                  <td className="py-4 px-6 font-bold text-green-600">Standardly Included</td>
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
          <Faq heading="Healthcare eSignatures: Frequently Asked Questions" items={healthcareFaq} />
        </div>
      </section>

      {/* Final CTA */}
      <Cta />
    </div>
  );
}
