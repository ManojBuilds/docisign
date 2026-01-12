import StartTrialBtn from "@/components/StartTrialBtn";
import Cta from "@/components/cta";
import Faq from "@/components/faq";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, DollarSign, FileText, Send, Smartphone, Star, XCircle, Zap } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Proposal Signing Software for Freelancers & Small Businesses in 2026",
  description:
    "BoopSign is the proposal signing software that gets documents signed 3x faster with no account required. Perfect for freelancers and consultants.",
  keywords: [
    "proposal signing software",
    "proposal signing tool",
    "proposal signature software",
    "free proposal signing",
    "esignature for proposals",
    "proposal approval software",
    "proposal workflow software",
    "proposal management tool",
    "online proposal signing",
    "mobile proposal signing",
    "freelance proposal software",
    "boopsign",
    "proposal software",
  ],
  alternates: {
    canonical: "https://boopsign.com/proposal-signing-software",
  },
};

const proposalSigningFaq = [
  {
    id: "faq-1",
    question: "How do I create professional proposals with BoopSign?",
    answer:
      "BoopSign makes it simple - start with our professional templates or upload your existing proposal format. Add your branding, pricing tables, and signature fields with our intuitive editor.",
  },
  {
    id: "faq-2",
    question: "Can clients review and sign proposals on their mobile devices?",
    answer:
      "Absolutely! BoopSign is built mobile-first, so your clients can review your entire proposal and sign in just 3 minutes on any device - no app downloads required.",
  },
  {
    id: "faq-3",
    question: "Do my clients need to create accounts to view or sign my proposals?",
    answer:
      "No! This is one of BoopSign's biggest advantages. Clients receive a secure link to your proposal and can review and sign immediately without creating accounts.",
  },
  {
    id: "faq-4",
    question: "Can I track if clients are actually reading my proposals?",
    answer:
      "Yes! Get real-time notifications when prospects open your proposals, which sections they view, and when they sign. Track engagement to follow up at the right time.",
  },
  {
    id: "faq-5",
    question: "Is my proposal content and client data secure with BoopSign?",
    answer:
      "Absolutely. BoopSign uses bank-level encryption and is fully compliant with e-signature laws. Your proposal content and client information are secure with better mobile security.",
  },
  {
    id: "faq-6",
    question: "Can I send proposals to multiple stakeholders for approval?",
    answer:
      "Yes! BoopSign allows you to send proposals to multiple recipients and collect signatures in sequence or in parallel, perfect for complex business deals.",
  },
  {
    id: "faq-7",
    question: "How do I customize proposals for different clients?",
    answer:
      "Use our template system to create proposal variations for different client types, and leverage merge fields to automatically personalize content for each recipient.",
  },
];

export default function ProposalSigningSoftwarePage() {
  return (
    <div >
      {/* Hero Section */}
      <section className="text-center py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            The Best <span className="text-blue-600">Proposal Signing Software</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto mb-8">
            Get your proposals signed 3x faster with BoopSign. No account required for signers,
            mobile-first design, and built specifically for freelancers and consultants.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm md:text-base">
            <Badge
              variant="outline"
              className="bg-green-100 text-green-800 border-green-200"
            >
              3x Faster Signing
            </Badge>
            <Badge
              variant="outline"
              className="bg-blue-100 text-blue-800 border-blue-200"
            >
              No Account Required
            </Badge>
            <Badge
              variant="outline"
              className="bg-purple-100 text-purple-800 border-purple-200"
            >
              Mobile-First Design
            </Badge>
            <Badge
              variant="outline"
              className="bg-orange-100 text-orange-800 border-orange-200"
            >
              50% Cheaper Than Competitors
            </Badge>
          </div>

          <StartTrialBtn />

          <div className="mt-8 text-sm text-gray-600">
            Join 2,847+ businesses who've switched from complex tools
          </div>
        </div>
      </section>

      {/* Why Proposal Signing Software Matters */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="container mx-auto text-center max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Fast Proposal Signing is Critical for Your Business
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            Research shows that 52% of proposals are signed within 24 hours when using mobile-optimized
            signing tools. BoopSign's streamlined process helps you close deals 3x faster than traditional tools.
          </p>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            <Card className="bg-red-50 border-red-100">
              <CardHeader>
                <CardTitle className="text-red-800">
                  The Problem with Traditional Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p>
                  <span className="font-bold">📱 Mobile Incompatibility:</span> Many
                  traditional tools don't work well on mobile devices.
                </p>
                <p>
                  <span className="font-bold">🔐 Account Requirements:</span> Forcing
                  clients to create accounts creates friction and delays.
                </p>
                <p>
                  <span className="font-bold">⏰ Slow Processing:</span> Average
                  proposal signing takes 7-9 minutes with complex tools.
                </p>
                <p>
                  <span className="font-bold">💸 Expensive Overkill:</span> Paying for
                  enterprise features you'll never use.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-green-100">
              <CardHeader>
                <CardTitle className="text-green-800">
                  BoopSign: The Solution for Proposals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />{" "}
                  <span>
                    <span className="font-bold">Mobile-First Design:</span> Optimized
                    for signing on any device with touch interfaces.
                  </span>
                </p>
                <p className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />{" "}
                  <span>
                    <span className="font-bold">No Account Required:</span> Clients
                    click a link and sign instantly.
                  </span>
                </p>
                <p className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />{" "}
                  <span>
                    <span className="font-bold">3-Minute Signing:</span> 3x faster
                    than traditional tools.
                  </span>
                </p>
                <p className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />{" "}
                  <span>
                    <span className="font-bold">Simple & Affordable:</span> Just
                    $15/month total, not per user or document.
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features for Proposal Signing */}
      <section className="py-16 md:py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Essential Features for Proposal Signing
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              BoopSign has everything you need to create, send, and get your proposals signed quickly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Proposal Templates & Customization</h3>
                  <p className="text-gray-700">
                    Start with professional proposal templates or upload your existing ones.
                    Add your branding, pricing tables, and signature fields for a polished presentation.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Mobile-Optimized Proposal Experience</h3>
                  <p className="text-gray-700">
                    Clients can review your proposals and sign seamlessly on smartphones,
                    tablets, or desktops without any app downloads. Perfect for on-the-go decision makers.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Real-Time Proposal Tracking</h3>
                  <p className="text-gray-700">
                    Know exactly when clients open, view specific sections of, and sign your proposals.
                    Follow up strategically with engagement data to close deals faster.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                  <Send className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Instant Proposal Delivery</h3>
                  <p className="text-gray-700">
                    Send professionally branded proposals directly to clients via email or secure link.
                    Include auto-reminders to ensure your proposals don't get lost in crowded inboxes.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Legally Binding Signatures</h3>
                  <p className="text-gray-700">
                    Electronic signatures are legally compliant with ESIGN Act
                    and eIDAS regulations with audit trails for full legal validity.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Proposal-Specific Pricing</h3>
                  <p className="text-gray-700">
                    No per-proposal charges or per-signer fees. Just one flat rate
                    that scales with your business, perfect for high-volume proposers.
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
            Proposal Signing Software Comparison
          </h2>
          <p className="text-xl mb-12 opacity-90">
            How BoopSign compares to traditional tools for proposal signing.
          </p>

          <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-4 px-4 text-gray-900">Feature</th>
                    <th className="py-4 px-4 text-center text-gray-900">BoopSign</th>
                    <th className="py-4 px-4 text-center text-gray-900">Traditional Tools</th>
                  </tr>
                </thead>
                <tbody className="text-sm md:text-base">
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 text-gray-700">Mobile Experience</td>
                    <td className="py-4 px-4 text-center font-bold text-green-600">
                      <div className="flex justify-center items-center gap-2">
                        <CheckCircle /> Optimized
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center text-red-600">
                      <div className="flex justify-center items-center gap-2">
                        <XCircle /> Issues
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 text-gray-700">
                      Signer Account Required
                    </td>
                    <td className="py-4 px-4 text-center text-green-600">
                      <div className="flex justify-center items-center gap-2">
                        <CheckCircle /> No
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center text-red-600">
                      <div className="flex justify-center items-center gap-2">
                        <XCircle /> Yes
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 text-gray-700">
                      Average Signing Time
                    </td>
                    <td className="py-4 px-4 text-center font-bold text-green-600">
                      3 minutes
                    </td>
                    <td className="py-4 px-4 text-center text-red-600">
                      7-9 minutes
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 text-gray-700">
                      Monthly Cost
                    </td>
                    <td className="py-4 px-4 text-center font-bold text-green-600">
                      $15/month
                    </td>
                    <td className="py-4 px-4 text-center text-red-600">
                      $25+/month per user
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-700">
                      Setup Complexity
                    </td>
                    <td className="py-4 px-4 text-center text-green-600">Simple</td>
                    <td className="py-4 px-4 text-center text-red-600">Complex</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits for Different Audiences */}
      <section className="bg-white py-16 md:py-20 px-4">
        <div className="container mx-auto text-center max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Perfect for All Types of Professionals
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Whether you're a freelancer, consultant, or small business owner, BoopSign
            streamlines your proposal workflow.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-50">
              <CardHeader>
                <h3 className="font-bold text-xl">Freelancers</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Send className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <p className="text-gray-700">
                  Send proposals and get them signed without the complexity of enterprise tools.
                  Close deals faster and focus on your work.
                </p>
                <ul className="text-left text-gray-700 space-y-2 pl-4">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Simple interface</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Mobile-friendly for clients</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Affordable pricing</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-50">
              <CardHeader>
                <h3 className="font-bold text-xl">Consultants</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                    <FileText className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
                <p className="text-gray-700">
                  Professional proposal templates with seamless signature collection.
                  Impress clients with a polished, efficient process. See how our {" "} <Link href="/mobile-electronic-signature" className="text-blue-600 hover:underline mr-1">mobile-first approach</Link>
                  benefits consultants specifically.
                </p>
                <ul className="text-left text-gray-700 space-y-2 pl-4">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Brand consistency</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Real-time tracking</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Client-friendly process</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-50">
              <CardHeader>
                <h3 className="font-bold text-xl">Small Businesses</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Zap className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <p className="text-gray-700">
                  Streamline your sales process with fast, efficient proposal signing.
                  Reduce friction and accelerate your revenue cycle.
                </p>
                <ul className="text-left text-gray-700 space-y-2 pl-4">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Cost-effective</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Quick setup</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Improved close rates</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Real User Stories */}
      <section className="py-16 md:py-20 px-4 bg-gray-50">
        <div className="container mx-auto text-center max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Success Stories from Proposal Signing Users
          </h2>
          <div className="flex justify-center mb-8">
            <div className="flex text-yellow-400 text-2xl">
              ★★★★★ <span className="text-gray-600 ml-2">4.9/5</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-gray-50">
              <CardContent className="p-6">
                <div className="flex justify-center text-yellow-400 mb-3">
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </div>
                <p className="mb-4 italic">
                  "As a freelance designer, my clients were always complaining about signing
                  complex documents. BoopSign has made it so easy - they get the link,
                  sign on their phone in seconds, and I get paid faster."
                </p>
                <p className="font-semibold">- Emma S., Freelance Designer</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-50">
              <CardContent className="p-6">
                <div className="flex justify-center text-yellow-400 mb-3">
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </div>
                <p className="mb-4 italic">
                  "My consulting proposals were getting stuck in email chains. Since switching
                  to BoopSign, signing time dropped from days to hours. The mobile experience
                  made all the difference for my clients."
                </p>
                <p className="font-semibold">
                  - David K., Business Consultant
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-50">
              <CardContent className="p-6">
                <div className="flex justify-center text-yellow-400 mb-3">
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </div>
                <p className="mb-4 italic">
                  "We switched from a complex enterprise tool to BoopSign and reduced our
                  proposal-to-payment cycle by 60%. The no-account requirement is a game-changer
                  for getting client signatures."
                </p>
                <p className="font-semibold">
                  - Jennifer T., Small Marketing Agency
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Top Reasons to Choose */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Top 5 Reasons for Proposal Signing Success
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              BoopSign is more than just a proposal signing tool. It's a complete
              solution for closing deals faster.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Accelerate Your Sales Cycle</h3>
                  <p className="text-gray-700">
                    Get proposals signed in 3 minutes instead of days. Remove friction
                    that's costing you deals and accelerate your revenue cycle.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Mobile-First Experience</h3>
                  <p className="text-gray-700">
                    Most of your clients will sign on mobile devices. BoopSign is optimized
                    for touch interfaces and provides the best mobile signing experience.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">
                    Eliminate Signer Friction
                  </h3>
                  <p className="text-gray-700">
                    No more "I can't remember my account password" or "I didn't get your email."
                    Signers get a direct link and can sign immediately. Our <Link href="/no-account-esignature" className="text-blue-600 hover:underline">no-account approach</Link>
                    removes all friction from the signing process.
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
                    Proposal-to-Payment Workflow
                  </h3>
                  <p className="text-gray-700">
                    Streamline your entire process from proposal creation to signature collection
                    to payment requests in one seamless workflow.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">
                  5
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">
                    Professional Presentation
                  </h3>
                  <p className="text-gray-700">
                    Create polished, branded proposals that reflect your business quality
                    and build client confidence in your service offering.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Should Choose */}
      <section className="py-16 md:py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Is BoopSign the Right Proposal Signing Software for You?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <CheckCircle /> Choose BoopSign if...
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700 list-disc pl-5">
                  <li>You're a freelancer, consultant, or small business owner</li>
                  <li>Your clients often sign on mobile devices</li>
                  <li>You want to reduce proposal-to-payment time</li>
                  <li>You value simplicity over complex features you don't need</li>
                  <li>You're cost-conscious and want quality without enterprise pricing</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-700">
                  <ArrowRight /> Consider alternatives if...
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700 list-disc pl-5">
                  <li>You're a large enterprise needing complex approval workflows</li>
                  <li>You require specialized compliance for highly regulated industries</li>
                  <li>You need specific integrations that BoopSign doesn't support yet</li>
                  <li>You're already heavily invested in another platform</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <Faq heading="Proposal Signing Software: Common Questions" items={proposalSigningFaq} />
        </div>
      </section>

      {/* Final CTA */}
      <Cta />
    </div>
  );
}