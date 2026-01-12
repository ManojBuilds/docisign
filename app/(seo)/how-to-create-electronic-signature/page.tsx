import StartTrialBtn from "@/components/StartTrialBtn";
import Cta from "@/components/cta";
import Faq from "@/components/faq";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Download, FileText, Link as LinkIcon, Shield, Smartphone, Upload, User, XCircle, Zap } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Create Electronic Signatures: Complete Step-by-Step Guide 2026",
  description:
    "Learn how to create electronic signatures in 5 minutes. Step-by-step instructions for mobile, desktop, and PDF documents. Legally compliant with BoopSign.",
  keywords: [
    "how to create electronic signature",
    "create electronic signature",
    "how to make digital signature",
    "electronic signature creation guide",
    "create esignature online",
    "digital signature how to",
    "esignature step by step",
    "electronic signature tutorial",
    "create signature online",
    "boopsign",
    "electronic signature",
  ],
  alternates: {
    canonical: "https://boopsign.com/how-to-create-electronic-signature",
  },
};

const signatureCreationFaq = [
  {
    id: "faq-1",
    question: "How many ways are there to create an electronic signature?",
    answer:
      "There are several ways: typing your name, drawing with a mouse/touchscreen, uploading an image of your signature, or using a signature tool like BoopSign that provides legally compliant options with audit trails.",
  },
  {
    id: "faq-2",
    question: "Is an electronic signature legally binding?",
    answer:
      "Yes! E-signatures are legally binding in most countries under laws like the US ESIGN Act and EU eIDAS regulation. They have the same legal weight as handwritten signatures when they meet requirements for intent, consent, and association with the document.",
  },
  {
    id: "faq-3",
    question: "What documents can I sign electronically?",
    answer:
      "Most business and personal documents can be signed electronically, including contracts, agreements, NDAs, employment forms, proposals, and more. However, some documents like wills, divorce papers, and court orders may require traditional signatures in certain jurisdictions.",
  },
  {
    id: "faq-4",
    question: "How long does it take to create an electronic signature?",
    answer:
      "Creating your e-signature takes just seconds. With BoopSign, you can create and apply signatures in under 2 minutes, and recipients can sign in 60 seconds without creating accounts.",
  },
  {
    id: "faq-5",
    question: "Do I need special software to create electronic signatures?",
    answer:
      "Not necessarily. Simple e-signatures can be created in email or basic document tools, but for legally compliant signatures with audit trails and security features, we recommend using a dedicated platform like BoopSign.",
  },
  {
    id: "faq-6",
    question: "Can I create an electronic signature on my phone?",
    answer:
      "Yes! BoopSign works perfectly on mobile devices. You can create signatures by drawing with your finger on your phone screen, and recipients can sign from any device without downloading apps.",
  },
  {
    id: "faq-7",
    question: "How do I verify an electronic signature is authentic?",
    answer:
      "Most e-signature platforms provide audit trails showing when, where, and how the document was signed. BoopSign includes timestamps, IP addresses, and user verification data to ensure signature authenticity.",
  },
  {
    id: "faq-8",
    question: "Are there any costs associated with creating electronic signatures?",
    answer:
      "Basic signature creation is usually free, but for legally compliant solutions with audit trails and security features, platforms like BoopSign cost just $15/month for unlimited signatures.",
  },
];

export default function HowToCreateElectronicSignaturePage() {
  return (
    <div className="">
      {/* Hero Section */}
      <section className="text-center py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            How to Create <span className="text-blue-600">Electronic Signatures</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto mb-8">
            Complete step-by-step guide to creating legally compliant e-signatures in under 5 minutes.
            Mobile-friendly, secure, and accepted worldwide.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm md:text-base">
            <Badge
              variant="outline"
              className="bg-green-100 text-green-800 border-green-200"
            >
              Step-by-Step Guide
            </Badge>
            <Badge
              variant="outline"
              className="bg-blue-100 text-blue-800 border-blue-200"
            >
              Mobile Friendly
            </Badge>
            <Badge
              variant="outline"
              className="bg-purple-100 text-purple-800 border-purple-200"
            >
              Legally Compliant
            </Badge>
            <Badge
              variant="outline"
              className="bg-orange-100 text-orange-800 border-orange-200"
            >
              5-Minute Process
            </Badge>
          </div>

          <StartTrialBtn />

          <div className="mt-8 text-sm text-gray-600">
            Start creating e-signatures • No credit card required • 14-day free trial
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What You'll Learn in This Guide
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Create professional, legally compliant electronic signatures with confidence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-blue-700">
                  <FileText className="w-6 h-6" />
                  Complete Process
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Learn the entire process from signature creation to document completion,
                  including best practices and legal requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-purple-700">
                  <Smartphone className="w-6 h-6" />
                  Mobile & Desktop
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Instructions for creating signatures on any device - iPhone, Android,
                  computer, or tablet with your existing tools.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-white border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-green-700">
                  <Shield className="w-6 h-6" />
                  Legal Compliance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Ensure your electronic signatures meet legal requirements in the US,
                  EU, and other major jurisdictions worldwide.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Step-by-Step Guide */}
      <section className="py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Complete Step-by-Step Process
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Follow these simple steps to create and use electronic signatures professionally
            </p>
          </div>

          <div className="space-y-8">
            {/* Step 1 */}
            <Card className="bg-white border-l-4 border-blue-500 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  Choose Your Signature Type
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  There are three main types of electronic signatures you can create:
                </p>
                <ul className="space-y-3 ml-6">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span><strong>Typed Signature:</strong> Simply type your name at the end of a document</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span><strong>Drawn Signature:</strong> Draw your signature using a mouse, stylus, or finger</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span><strong>Uploaded Image:</strong> Scan or photograph your handwritten signature and upload it</span>
                  </li>
                </ul>
                <div className="bg-blue-50 p-4 rounded-lg mt-4">
                  <p className="text-blue-800 font-semibold">Pro Tip:</p>
                  <p className="text-blue-700">
                    For legal compliance and security, we recommend using a dedicated e-signature platform
                    like BoopSign that provides audit trails and verification, rather than simple image uploads.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="bg-white border-l-4 border-blue-500 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  Create Your Signature
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  The method you use depends on your device and preference:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Smartphone className="w-5 h-5" /> On Mobile Devices
                    </h4>
                    <ul className="space-y-2 text-gray-700 ml-6">
                      <li className="flex items-start">
                        <ArrowRight className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Open your document in a signature app (like BoopSign)</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Tap on the signature field</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Draw your signature with your finger on the screen</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <FileText className="w-5 h-5" /> On Computers
                    </h4>
                    <ul className="space-y-2 text-gray-700 ml-6">
                      <li className="flex items-start">
                        <ArrowRight className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Click on the signature field in your document</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Use your mouse or trackpad to draw your signature</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Or type your name and apply formatting</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="bg-white border-l-4 border-blue-500 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  Apply to Your Document
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Once your signature is created, it's time to apply it to your document:
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Download className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">PDF Documents</h4>
                    <p className="text-gray-700 text-sm">
                      Upload PDF to your e-signature platform and add signature fields
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FileText className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Word Documents</h4>
                    <p className="text-gray-700 text-sm">
                      Use built-in signature tools or convert to PDF for signing
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <LinkIcon className="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Online Platforms</h4>
                    <p className="text-gray-700 text-sm">
                      Use tools like BoopSign to send documents for remote signing
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 4 */}
            <Card className="bg-white border-l-4 border-blue-500 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  Send for Signature (if needed)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  If others need to sign your document:
                </p>
                <ul className="space-y-3 ml-6">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Indicate where each person should sign using signature fields</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Add email addresses for each signer in your e-signature platform</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Send the document - recipients get a secure link to sign</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Track progress and get notified when documents are signed</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Step 5 */}
            <Card className="bg-white border-l-4 border-blue-500 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                    5
                  </div>
                  Verify and Save
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Finalize the process to ensure legal compliance:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Verification Steps:</h4>
                    <ul className="space-y-2 text-gray-700 ml-6">
                      <li className="flex items-start">
                        <CheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Check that all signatures are present</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Review the audit trail (if using a platform like BoopSign)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Confirm document integrity hasn't been compromised</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Storage:</h4>
                    <ul className="space-y-2 text-gray-700 ml-6">
                      <li className="flex items-start">
                        <CheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Save a copy in a secure location</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Keep audit trail records for legal compliance</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Share with relevant parties as needed</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Methods to Create Signatures */}
      <section className="py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Different Methods to Create Electronic Signatures
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose the method that best suits your needs and technical requirements
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-blue-700">
                  <User className="w-6 h-6" />
                  Built-in Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Microsoft Word signature field</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Adobe Acrobat signature tool</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Google Docs signature suggestions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Apple Preview signature feature</span>
                  </li>
                </ul>
                <div className="mt-4">
                  <p className="text-sm text-gray-600"><strong>Best for:</strong> Simple documents and internal use</p>
                  <p className="text-sm text-gray-600 mt-1"><strong>Limitations:</strong> Limited legal compliance features</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-purple-700">
                  <Upload className="w-6 h-6" />
                  Image Upload
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Scan your handwritten signature</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Take a photo of your signature</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Use in any document editor</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Copy and paste as needed</span>
                  </li>
                </ul>
                <div className="mt-4">
                  <p className="text-sm text-gray-600"><strong>Best for:</strong> Quick, simple signatures</p>
                  <p className="text-sm text-gray-600 mt-1"><strong>Limitations:</strong> No audit trail or verification</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-white border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-green-700">
                  <Shield className="w-6 h-6" />
                  Professional Platforms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>BoopSign with audit trails</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Legal compliance features</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Identity verification</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Secure document storage</span>
                  </li>
                </ul>
                <div className="mt-4">
                  <p className="text-sm text-gray-600"><strong>Best for:</strong> Business contracts and legal documents</p>
                  <p className="text-sm text-gray-600 mt-1"><strong>Advantages:</strong> Full compliance and security</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mobile vs Desktop Comparison */}
      <section className="py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Creating Signatures: Mobile vs Desktop
            </h2>
            <p className="text-lg text-secondary-foreground max-w-3xl mx-auto">
              Choose the best approach based on your device and situation
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2">
                    <th className="py-4 px-6 text-gray-900 font-bold text-left">Method</th>
                    <th className="py-4 px-6 text-center text-blue-600 font-bold">Mobile</th>
                    <th className="py-4 px-6 text-center text-purple-600 font-bold">Desktop</th>
                  </tr>
                </thead>
                <tbody className="text-sm md:text-base">
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-6 font-semibold text-gray-900">Signature Creation</td>
                    <td className="py-4 px-6 text-center text-gray-700">
                      Draw with finger on touchscreen
                    </td>
                    <td className="py-4 px-6 text-center text-gray-700">
                      Draw with mouse/trackpad or type
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-6 font-semibold text-gray-900">Speed</td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex justify-center items-center gap-2 text-green-600">
                        <Zap className="w-5 h-5" /> Very Fast
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex justify-center items-center gap-2 text-green-600">
                        <Zap className="w-5 h-5" /> Fast
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-6 font-semibold text-gray-900">Accuracy</td>
                    <td className="py-4 px-6 text-center text-orange-600">
                      Moderate - depends on screen size
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex justify-center items-center gap-2 text-green-600">
                        <CheckCircle className="w-5 h-5" /> High
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-6 font-semibold text-gray-900">Convenience</td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex justify-center items-center gap-2 text-green-600">
                        <CheckCircle className="w-5 h-5" /> Always Available
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center text-gray-700">
                      Available when at computer
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-6 font-semibold text-gray-900">File Compatibility</td>
                    <td className="py-4 px-6 text-center text-gray-700">
                      Good for mobile-friendly formats
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex justify-center items-center gap-2 text-green-600">
                        <CheckCircle className="w-5 h-5" /> Universal
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-gray-900">Best Use Case</td>
                    <td className="py-4 px-6 text-center text-gray-700">
                      Quick signatures on the go
                    </td>
                    <td className="py-4 px-6 text-center text-gray-700">
                      Detailed documents, high precision
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose BoopSign */}
      <section className="py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why BoopSign Makes Creating Electronic Signatures Simple
            </h2>
            <p className="text-xl max-w-3xl mx-auto">
              Professional e-signature solution that's fast, secure, and legally compliant
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white backdrop-blur-sm rounded-xl p-6 border">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
              <p className="">
                Create and apply signatures in under 2 minutes. Clients sign in 60 seconds from any device.
              </p>
            </div>

            <div className="rounded-xl p-6 border">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Fully Compliant</h3>
              <p className="">
                ESIGN Act and eIDAS compliant with complete audit trails and encryption.
              </p>
            </div>

            <div className="rounded-xl p-6 border">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Mobile-First</h3>
              <p className="">
                Perfect on any device - no apps needed. Works on iOS, Android, and desktop.
              </p>
            </div>
          </div>

          <div className="p-8 bg-gray-50">
            <h3 className="text-2xl font-bold mb-4 text-center">Step-by-Step with BoopSign</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                  1
                </div>
                <p >Upload your document</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center  font-bold mx-auto mb-3">
                  2
                </div>
                <p >Add signature fields</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                  3
                </div>
                <p >Send or sign yourself</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center  font-bold mx-auto mb-3">
                  4
                </div>
                <p>Get notified when signed</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <StartTrialBtn />
            <p className="mt-4 text-secondary-foreground">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Common Mistakes to Avoid */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Common Mistakes to Avoid
            </h2>
            <p className="text-lg text-gray-600">
              Ensure your electronic signatures are legally valid and secure
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-red-200 bg-gradient-to-br from-red-50 to-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700 text-xl">
                  <XCircle className="w-6 h-6" /> Mistakes to Avoid
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start gap-3">
                    <XCircle className="text-red-500 mt-1 flex-shrink-0 w-5 h-5" />
                    <div>
                      <span className="font-semibold">Using simple image signatures for important documents</span>
                      <p className="text-sm text-gray-600">They lack legal compliance features</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="text-red-500 mt-1 flex-shrink-0 w-5 h-5" />
                    <div>
                      <span className="font-semibold">Not keeping proper records</span>
                      <p className="text-sm text-gray-600">Always save audit trails for legal compliance</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="text-red-500 mt-1 flex-shrink-0 w-5 h-5" />
                    <div>
                      <span className="font-semibold">Sharing signature images</span>
                      <p className="text-sm text-gray-600">This can compromise security and validity</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="text-red-500 mt-1 flex-shrink-0 w-5 h-5" />
                    <div>
                      <span className="font-semibold">Ignoring jurisdiction requirements</span>
                      <p className="text-sm text-gray-600">Some regions have specific rules for e-signatures</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700 text-xl">
                  <CheckCircle className="w-6 h-6" /> Best Practices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0 w-5 h-5" />
                    <div>
                      <span className="font-semibold">Use a compliant platform for important documents</span>
                      <p className="text-sm text-gray-600">BoopSign provides proper legal compliance</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0 w-5 h-5" />
                    <div>
                      <span className="font-semibold">Always verify the signer's identity</span>
                      <p className="text-sm text-gray-600">Use email verification or other methods</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0 w-5 h-5" />
                    <div>
                      <span className="font-semibold">Keep detailed records</span>
                      <p className="text-sm text-gray-600">Save audit trails and signing logs</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0 w-5 h-5" />
                    <div>
                      <span className="font-semibold">Educate signers about the process</span>
                      <p className="text-sm text-gray-600">Ensure they understand they're creating a legal signature</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <Faq
            heading="Electronic Signature Creation: Common Questions"
            items={signatureCreationFaq}
          />
        </div>
      </section>

      {/* Final CTA */}
      <Cta />
    </div>
  );
}