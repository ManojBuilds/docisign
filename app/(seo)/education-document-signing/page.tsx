import StartTrialBtn from "@/components/StartTrialBtn";
import Cta from "@/components/cta";
import Faq from "@/components/faq";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, CheckCircle, Clock, GraduationCap, ShieldCheck, Smartphone, Users } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "eSignature for Education | Streamline Enrollment & Forms",
  description:
    "Speed up administrative paperwork at schools and universities with BoopSign. Modern eSignatures for enrollment, parental consent, and staff hiring – with zero student friction.",
  keywords: [
    "education document signing",
    "school enrollment e-signature",
    "parental consent forms online",
    "digitize university paperwork",
    "staff hiring e-signature",
    "boopsign",
    "student registration online"
  ],
  alternates: {
    canonical: "https://boopsign.com/education-document-signing",
  },
};

const educationFaq = [
  {
    id: "ed-faq-1",
    question: "Do parents/students need an account to sign forms?",
    answer:
      "No. This is the biggest advantage for schools. Parents can sign field trip forms, enrollment documents, and consent forms directly from their phones without any login or registration. This leads to much higher completion rates.",
  },
  {
    id: "ed-faq-2",
    question: "Is BoopSign secure for student records?",
    answer:
      "Yes. We prioritize security with SSL encryption and secure data storage. Every signature includes an audit trail with timestamps and IP addresses to ensure compliance with institutional record-keeping requirements.",
  },
  {
    id: "ed-faq-3",
    question: "How can I use BoopSign for staff hiring?",
    answer:
      "You can upload offer letters, employment contracts, and policy handbooks as PDFs. Send them to new faculty and staff, and they can sign from any device in minutes, accelerating your hiring process.",
  },
  {
    id: "ed-faq-4",
    question: "Can I manage field trip forms with this?",
    answer:
      "Absolutely. You can send a link to parents via email or SMS. They can sign on their mobile device instantly—eliminating the 'lost in backpack' paper form problem.",
  },
  {
    id: "ed-faq-5",
    question: "Is there a limit on how many forms I can send?",
    answer:
      "With BoopSign Pro, you get unlimited document signing for one low monthly price. No per-document fees, making it very cost-effective for schools with high volume needs.",
  },
];

export default function EducationDocumentSigningPage() {
  return (
    <div className="flex flex-col gap-16 md:gap-24 py-8 md:py-16">
      {/* Hero Section */}
      <section className="text-center px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="inline-flex items-center justify-center p-2 mb-6 bg-indigo-50 rounded-full text-indigo-600 text-sm font-medium animate-fade-in">
            <Badge variant="secondary" className="mr-2 bg-indigo-600 text-white hover:bg-indigo-700">Education</Badge>
            Streamline Campus Paperwork for 2026
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight text-slate-900">
            Digitize <span className="text-indigo-600">Educational Forms</span> with BoopSign
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
            Eliminate administrative delays. Speed up enrollment, parental consent, and staff hiring with
            modern eSignatures. No student or parent accounts required.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12 text-sm md:text-base">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              <GraduationCap className="w-4 h-4 text-indigo-500" />
              <span>Student Enrollment</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              <Users className="w-4 h-4 text-blue-500" />
              <span>Parental Consent</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              <BookOpen className="w-4 h-4 text-purple-500" />
              <span>Staff Contracts</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-orange-500" />
              <span>Audit Trail Security</span>
            </div>
          </div>

          <StartTrialBtn />

          <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-gray-500 italic">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 text-lg">★★★★★</span>
              <span>"Cut our registration time in half"</span>
            </div>
            <div className="hidden md:block w-1 h-1 bg-gray-300 rounded-full"></div>
            <div>Trusted by Schools & Professional Institutes</div>
          </div>
        </div>
      </section>

      {/* Why BoopSign for Education */}
      <section className="bg-slate-50 border-y border-slate-100 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Modernizing the Admin Workflow
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Focus on teaching, not tracking down papers. BoopSign is the simple solution for education admins.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <CardTitle>Seamless Enrollment</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Send registration and financial aid forms to students. They sign on their own phone or tablet instantly—ensuring your classes are filled on schedule.
              </CardContent>
            </Card>
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6" />
                </div>
                <CardTitle>Parent-Friendly Signing</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Stop waiting for papers lost in backpacks. Parents receive a link and sign from their mobile device in seconds—perfect for field trips and consent forms.
              </CardContent>
            </Card>
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <CardTitle>Faster Faculty Hiring</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Professionalize your hiring process. Deliver contracts and handbooks digitally, getting faculty and staff on board faster than ever before.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Education Use Cases */}
      <section className="px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                One Platform for All Campus Paperwork
              </h2>
              <ul className="space-y-4 text-lg text-gray-700">
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 w-6 h-6" />
                  <span>Student Registration & Financial Aid</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 w-6 h-6" />
                  <span>Parental Consent for Field Trips</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 w-6 h-6" />
                  <span>Faculty Employment Contracts</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 w-6 h-6" />
                  <span>FERPA Policy Disclosures</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 w-6 h-6" />
                  <span>Medical & Extracurricular Authorizations</span>
                </li>
              </ul>
              <div className="mt-8">
                <StartTrialBtn />
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="bg-indigo-600 p-8 rounded-2xl text-white flex flex-col justify-between aspect-square">
                <div className="text-4xl font-bold">50%</div>
                <div className="text-sm opacity-90">Reduction in administrative processing time.</div>
              </div>
              <div className="bg-slate-800 p-8 rounded-2xl text-white flex flex-col justify-between aspect-square mt-8">
                <div className="text-4xl font-bold">0LB</div>
                <div className="text-sm opacity-90">Significant paper waste reduction for sustainability.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-12 text-slate-900">How BoopSign Compares for Education</h2>
          <div className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="py-4 px-6 font-semibold">Requirement</th>
                  <th className="py-4 px-6 font-semibold text-indigo-600">BoopSign</th>
                  <th className="py-4 px-6 font-semibold text-gray-500">Other Vendors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-4 px-6">Parent/Student Login</td>
                  <td className="py-4 px-6 font-bold text-green-600">Not Required</td>
                  <td className="py-4 px-6">Always Required</td>
                </tr>
                <tr>
                  <td className="py-4 px-6">Mobile Support</td>
                  <td className="py-4 px-6 font-bold text-green-600">Exceptional</td>
                  <td className="py-4 px-6">Varies (Often Clunky)</td>
                </tr>
                <tr>
                  <td className="py-4 px-6">Unlimited Signing</td>
                  <td className="py-4 px-6 font-bold text-green-600">Pro Feature</td>
                  <td className="py-4 px-6 text-gray-500">Usually Per-Doc Fee</td>
                </tr>
                <tr>
                  <td className="py-4 px-6">Audit Trail Compliance</td>
                  <td className="py-4 px-6 font-bold text-green-600">Standard</td>
                  <td className="py-4 px-6">Standard</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4">
        <div className="container mx-auto max-w-4xl">
          <Faq heading="Education eSignatures: Frequently Asked Questions" items={educationFaq} />
        </div>
      </section>

      {/* Final CTA */}
      <Cta />
    </div>
  );
}
