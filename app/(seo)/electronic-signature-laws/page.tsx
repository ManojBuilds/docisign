import StartTrialBtn from "@/components/StartTrialBtn";
import Cta from "@/components/cta";
import Faq from "@/components/faq";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, CheckCircle, FileText, Globe, Shield, Star, Users } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Complete Guide to Electronic Signature Laws & Regulations in 2026",
  description:
    "Everything you need to know about e-signature legality worldwide. ESIGN Act, eIDAS, UETA and more. Informational guide for compliance.",
  keywords: [
    "electronic signature laws",
    "esign legal compliance",
    "esign act regulations",
    "e signature legality",
    "electronic signature legal requirements",
    "esign vs handwritten signature",
    "esignature law compliance",
    "digital signature laws",
    "e signature legal framework",
    "boopsign",
    "electronic signature",
  ],
  alternates: {
    canonical: "https://boopsign.com/electronic-signature-laws",
  },
};

const eSignatureLawsFaq = [
  {
    id: "faq-1",
    question: "Are electronic signatures legally binding?",
    answer:
      "Yes! Electronic signatures are legally binding in most countries under laws like the U.S. ESIGN Act, the EU's eIDAS regulation, and other international frameworks. They have the same legal weight as handwritten signatures when implemented properly and meet all legal requirements.",
  },
  {
    id: "faq-2",
    question: "What is the difference between electronic and digital signatures?",
    answer:
      "Electronic signatures (e-signatures) are legally binding agreements expressed in electronic form. Digital signatures are a type of e-signature that uses encryption technology and certificates from trusted authorities to provide enhanced security and authentication.",
  },
  {
    id: "faq-3",
    question: "Which countries recognize electronic signatures?",
    answer:
      "Most countries worldwide recognize electronic signatures, including the U.S., Canada, EU countries, Australia, Japan, and many others. However, specific requirements and levels of acceptance vary by jurisdiction. Always check local regulations for specific use cases.",
  },
  {
    id: "faq-4",
    question: "What types of documents can be signed electronically?",
    answer:
      "Most business and personal documents can be signed electronically, including contracts, agreements, NDAs, employment forms, and more. However, certain documents like wills, divorce papers, court orders, and some government forms may require traditional signatures in some jurisdictions.",
  },
  {
    id: "faq-5",
    question: "Do electronic signatures need to be witnessed?",
    answer:
      "Generally no, unless specifically required by local law for certain document types. However, the e-signature process should include authentication measures to verify signers' identities and intentions.",
  },
  {
    id: "faq-6",
    question: "How long is an electronic signature legally valid?",
    answer:
      "An electronic signature is legally valid as long as the underlying agreement is valid. The signature itself doesn't expire, but the document terms may have expiration dates or renewal requirements. Proper record-keeping is essential for long-term validity.",
  },
  {
    id: "faq-7",
    question: "What proof is required to verify an electronic signature?",
    answer:
      "Electronic signature platforms should provide audit trails that include timestamp, IP address, authentication methods used, and the signing process. These logs serve as proof of signature authenticity and intent. The strength of evidence depends on the authentication and security measures used.",
  },
];

export default function ElectronicSignatureLawsPage() {
  return (
    <div >
      {/* Hero Section */}
      <section className="text-center py-16 md:py-20 px-4 ">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-6">
            <Badge
              variant="outline"
              className="bg-blue-100 text-blue-800 border-blue-200"
            >
              Informational Guide
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Complete Guide to <span className="text-blue-600">Electronic Signature Laws</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto mb-8">
            Understand e-signature legality worldwide. Learn about ESIGN Act, eIDAS, UETA and compliance requirements for legally binding digital agreements.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm md:text-base">
            <Badge
              variant="outline"
              className="bg-green-100 text-green-800 border-green-200"
            >
              Legally Compliant
            </Badge>
            <Badge
              variant="outline"
              className="bg-blue-100 text-blue-800 border-blue-200"
            >
              Global Coverage
            </Badge>
            <Badge
              variant="outline"
              className="bg-purple-100 text-purple-800 border-purple-200"
            >
              ESIGN Act Compliant
            </Badge>
            <Badge
              variant="outline"
              className="bg-orange-100 text-orange-800 border-orange-200"
            >
              eIDAS Compliant
            </Badge>
          </div>

          <StartTrialBtn />

          <div className="mt-8 text-sm text-gray-600">
            Join businesses using legally compliant e-signatures
          </div>
        </div>
      </section>

      {/* Why E-Signature Laws Matter */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="container mx-auto text-center max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Understanding Electronic Signature Legality
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            Electronic signatures are legally recognized in most jurisdictions worldwide, but understanding the legal framework is crucial for ensuring your agreements are enforceable.
          </p>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            <Card className="bg-red-50 border-red-100">
              <CardHeader>
                <CardTitle className="text-red-800">
                  When E-Signatures Aren't Valid
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p>
                  <span className="font-bold">Wills & Testament:</span> Many jurisdictions require physical signatures for estate planning documents.
                </p>
                <p>
                  <span className="font-bold">Divorce Papers:</span> Family law documents often have special requirements for traditional signatures.
                </p>
                <p>
                  <span className="font-bold">Court Orders:</span> Legal proceedings typically require wet-ink signatures.
                </p>
                <p>
                  <span className="font-bold">Adoption Papers:</span> Special legal requirements may apply to adoption documentation.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-green-100">
              <CardHeader>
                <CardTitle className="text-green-800">
                  When E-Signatures Are Valid
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />{" "}
                  <span>
                    <span className="font-bold">Business Contracts:</span> Commercial agreements can typically be signed electronically.
                  </span>
                </p>
                <p className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />{" "}
                  <span>
                    <span className="font-bold">Employment Agreements:</span> Most HR documents are eligible for e-signature.
                  </span>
                </p>
                <p className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />{" "}
                  <span>
                    <span className="font-bold">Financial Documents:</span> Many banking and finance docs can be e-signed.
                  </span>
                </p>
                <p className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />{" "}
                  <span>
                    <span className="font-bold">NDAs & Licenses:</span> Standard business agreements are e-signature eligible.
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Legislation */}
      <section className="py-16 md:py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Key Electronic Signature Laws Worldwide
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Major legal frameworks that govern electronic signatures across different jurisdictions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">U.S. ESIGN Act (2000)</h3>
                  <p className="text-gray-700">
                    The Electronic Signatures in Global and National Commerce Act establishes that electronic records and signatures carry the same weight as traditional paper documents and handwritten signatures.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">EU eIDAS Regulation (2016)</h3>
                  <p className="text-gray-700">
                    The Electronic Identification, Authentication and Trust Services regulation provides a uniform legal framework for electronic identification and trust services in the EU.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">UETA (Uniform Electronic Transactions Act)</h3>
                  <p className="text-gray-700">
                    Adopted by most U.S. states, UETA provides the legal framework for electronic transactions and signatures at the state level.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Canada's PIPEDA</h3>
                  <p className="text-gray-700">
                    Personal Information Protection and Electronic Documents Act governs electronic commerce. Note: Canada's e-signature regulations are primarily covered under federal and provincial electronic documents legislation.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Australia's ETA</h3>
                  <p className="text-gray-700">
                    Electronic Transactions Act (Cth) enables the use of electronic signatures in Australia. The Australian Communications and Media Authority provides guidance on compliance.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">GDPR Impact</h3>
                  <p className="text-gray-700">
                    While not directly about e-signatures, GDPR affects how personal data in signed documents is processed and stored.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Head-to-Head Comparison Table */}
      <section
        id="compare"
        className="py-16 md:py-20 px-4 bg-white text-gray-800"
      >
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            E-Signature Legal Framework Comparison
          </h2>
          <p className="text-xl mb-12 opacity-90">
            How key e-signature laws compare across different regions.
          </p>

          <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-4 px-4 text-gray-900">Aspect</th>
                    <th className="py-4 px-4 text-center text-gray-900">ESIGN Act (US)</th>
                    <th className="py-4 px-4 text-center text-gray-900">eIDAS (EU)</th>
                    <th className="py-4 px-4 text-center text-gray-900">UETA (US States)</th>
                  </tr>
                </thead>
                <tbody className="text-sm md:text-base">
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 text-gray-700">Legal Validity</td>
                    <td className="py-4 px-4 text-center font-bold text-green-600">
                      <div className="flex justify-center items-center gap-2">
                        <CheckCircle /> Legally Equivalent
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center font-bold text-green-600">
                      <div className="flex justify-center items-center gap-2">
                        <CheckCircle /> Full Legal Effect
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center font-bold text-green-600">
                      <div className="flex justify-center items-center gap-2">
                        <CheckCircle /> Legal Equivalence
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 text-gray-700">
                      Consent Required
                    </td>
                    <td className="py-4 px-4 text-center text-green-600">
                      <div className="flex justify-center items-center gap-2">
                        <CheckCircle /> Yes
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center text-green-600">
                      <div className="flex justify-center items-center gap-2">
                        <CheckCircle /> Yes
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center text-green-600">
                      <div className="flex justify-center items-center gap-2">
                        <CheckCircle /> Yes
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 text-gray-700">
                      Record Retention
                    </td>
                    <td className="py-4 px-4 text-center font-bold text-green-600">
                      Required
                    </td>
                    <td className="py-4 px-4 text-center font-bold text-green-600">
                      Required
                    </td>
                    <td className="py-4 px-4 text-center font-bold text-green-600">
                      Required
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 text-gray-700">
                      International Recognition
                    </td>
                    <td className="py-4 px-4 text-center text-green-600">
                      High
                    </td>
                    <td className="py-4 px-4 text-center text-green-600">
                      Highest
                    </td>
                    <td className="py-4 px-4 text-center text-green-600">
                      High
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-700">
                      Strong Authentication
                    </td>
                    <td className="py-4 px-4 text-center text-green-600">Optional</td>
                    <td className="py-4 px-4 text-center text-green-600">Required for QES</td>
                    <td className="py-4 px-4 text-center text-green-600">Optional</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Electronic Signatures */}
      <section className="bg-white py-16 md:py-20 px-4">
        <div className="container mx-auto text-center max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Types of Electronic Signatures
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Understanding different levels of e-signature security and legal weight.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-50">
              <CardHeader>
                <h3 className="font-bold text-xl">Simple Electronic Signature</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <p className="text-gray-700">
                  Basic e-signature captured through a click, typed name, or drawn signature.
                  Legally binding with proper consent and intent verification.
                </p>
                <ul className="text-left text-gray-700 space-y-2 pl-4">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Most commonly used type</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Sufficient for most business documents</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Lower security requirements</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-50">
              <CardHeader>
                <h3 className="font-bold text-xl">Advanced Electronic Signature</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                    <Shield className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
                <p className="text-gray-700">
                  E-signature linked to a verified signer's identity with enhanced security measures.
                  Uniquely linked to the signatory and capable of identifying them.
                </p>
                <ul className="text-left text-gray-700 space-y-2 pl-4">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Identity verification required</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Protected against tampering</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Higher legal weight</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-50">
              <CardHeader>
                <h3 className="font-bold text-xl">Qualified Electronic Signature</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Star className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <p className="text-gray-700">
                  Most secure type of e-signature requiring a qualified certificate from a trusted provider.
                  Legal equivalent of a handwritten signature under EU law.
                </p>
                <ul className="text-left text-gray-700 space-y-2 pl-4">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Highest level of security</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Qualified certificate required</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Presumed valid in court</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Compliance Requirements */}
      <section className="py-16 md:py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              E-Signature Compliance Requirements
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Key elements that ensure your electronic signatures meet legal standards.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-bold mb-6">Essential Requirements</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold">Signer Consent</h4>
                    <p className="text-gray-600 text-sm">Clear consent to conduct transactions electronically</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold">Intent to Sign</h4>
                    <p className="text-gray-600 text-sm">Evidence that the signer intended to sign the document</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold">Identity Verification</h4>
                    <p className="text-gray-600 text-sm">Reasonable assurance of the signer's identity</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold">Record Retention</h4>
                    <p className="text-gray-600 text-sm">Ability to retain and reproduce the signed document</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold">Audit Trail</h4>
                    <p className="text-gray-600 text-sm">Complete record of the signing process and timestamp</p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">Best Practices</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Shield className="text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold">Secure Storage</h4>
                    <p className="text-gray-600 text-sm">Store signed documents securely with integrity protection</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold">Access Control</h4>
                    <p className="text-gray-600 text-sm">Control who can access and modify signed documents</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold">Authentication</h4>
                    <p className="text-gray-600 text-sm">Use multiple authentication factors when needed</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold">Verification Options</h4>
                    <p className="text-gray-600 text-sm">Provide options for signature verification by third parties</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold">Regular Auditing</h4>
                    <p className="text-gray-600 text-sm">Periodically review and audit your e-signature process</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Top Reasons for Legal Use */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Businesses Choose E-Signatures Legally
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Electronic signatures provide legal compliance while improving efficiency and security.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Legal Equivalence</h3>
                  <p className="text-gray-700">
                    E-signatures have the same legal weight as handwritten signatures when compliant with applicable laws like ESIGN and eIDAS.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Enhanced Security</h3>
                  <p className="text-gray-700">
                    Digital audit trails provide better evidence of signing than traditional paper documents, including timestamps and identity verification.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">
                    Improved Compliance Tracking
                  </h3>
                  <p className="text-gray-700">
                    Automated records of consent, access, and execution help meet regulatory requirements more effectively.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">
                    Cost Reduction
                  </h3>
                  <p className="text-gray-700">
                    Reducing paper, printing, shipping, and storage costs while accelerating contract lifecycle management.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">
                  5
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">
                    Faster Execution
                  </h3>
                  <p className="text-gray-700">
                    Complete agreements faster with remote signing capabilities, reducing time-to-contract significantly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Should Use */}
      <section className="py-16 md:py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Is Electronic Signature Legal Compliance Right for You?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <CheckCircle /> Perfect for you if...
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700 list-disc pl-5">
                  <li>You need legally binding digital agreements</li>
                  <li>You want to comply with ESIGN Act, eIDAS, or other regulations</li>
                  <li>You require audit trails for document execution</li>
                  <li>You want to streamline document workflows</li>
                  <li>You need secure evidence of signing for potential disputes</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-700">
                  <ArrowRight /> Consider carefully if...
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700 list-disc pl-5">
                  <li>You need to sign documents requiring notarization</li>
                  <li>Your industry has specific paper-document requirements</li>
                  <li>You're in a jurisdiction where e-signatures are restricted</li>
                  <li>You need government-specific authentication levels</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <Faq heading="Electronic Signature Laws: Common Legal Questions" items={eSignatureLawsFaq} />
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="py-8 px-4 bg-white/50">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <FileText className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Disclaimer:</strong> This guide is for informational purposes only and does not constitute legal advice. E-signature regulations vary by jurisdiction and change over time. Consult with a qualified attorney for advice regarding your specific situation and compliance requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <Cta />
    </div>
  );
}