import { CheckCircle, XCircle, Star, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import StartTrialBtn from "@/components/StartTrialBtn";
import Faq from "@/components/faq";
import Cta from "@/components/cta";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export const metadata: Metadata = {
  title: "The Best DocuSign Alternative for Mobile-First Teams in 2025",
  description:
    "BoopSign is the DocuSign alternative that's 3x faster, 50% cheaper, and built for mobile-first teams. Join 2,847+ businesses who switched.",
  keywords: [
    "docusign alternative",
    "docusign competitor",
    "cheaper than docusign",
    "docusign vs boopsign",
    "electronic signature alternative",
    "mobile-first e-signature",
    "boopsign",
    "online signature",
  ],
  alternates: {
    canonical: "https://boopsign.com/docusign-alternative",
  },
};

const docusignFaq = [
  {
    id: "faq-1",
    question: "Can I import my DocuSign templates to BoopSign?",
    answer:
      "Yes! Export your DocuSign templates and upload them to BoopSign. Our team can help with the migration process.",
  },
  {
    id: "faq-2",
    question: "Is BoopSign as secure as DocuSign?",
    answer:
      "Absolutely. BoopSign uses industry-standard encryption and is fully compliant with e-signature laws. Your documents are just as secure, with better mobile security.",
  },
  {
    id: "faq-3",
    question: "Will my signers need to create accounts like with DocuSign?",
    answer:
      "No! This is one of BoopSign&apos;s biggest advantages. Signers receive a secure link and can sign immediately without creating accounts.",
  },
  {
    id: "faq-4",
    question: "What about integrations? DocuSign connects to everything.",
    answer:
      "BoopSign integrates with popular tools like Zapier, Google Drive, and Dropbox. We're constantly adding new integrations based on user requests.",
  },
  {
    id: "faq-5",
    question: "Can I try BoopSign before committing?",
    answer:
      "Yes! Start your 7-day free trial with no credit card required. See why thousands of businesses prefer BoopSign to DocuSign.",
  },
];

export default function DocusignAlternativePage() {
  return (
    <div className="">
      {/* Hero Section */}
      <section className="text-center py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            The #1 <span className="text-blue-600">DocuSign Alternative</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto mb-8">
            Looking for a DocuSign alternative that actually works on mobile?
            You&apos;ve found it. BoopSign delivers everything DocuSign promises –
            but <span className="font-bold">3x faster, 50% cheaper</span>, and
            built for the mobile-first world.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm md:text-base">
            <Badge
              variant="outline"
              className="border-green-200"
            >
              3x Faster Signing
            </Badge>
            <Badge
              variant="outline"
              className="border-blue-200"
            >
              50% Cheaper
            </Badge>
            <Badge
              variant="outline"
              className="border-purple-200"
            >
              Mobile-First Design
            </Badge>
            <Badge
              variant="outline"
              className="border-orange-200"
            >
              No Forced Accounts
            </Badge>
          </div>

          <StartTrialBtn />

          <div className="mt-8 text-sm text-gray-600">
            Join 2,847+ businesses who&apos;ve switched from DocuSign
          </div>
        </div>
      </section>

      {/* Why Switch Section */}
      <section className="py-16 md:py-20 px-4">
        <div className="container mx-auto text-center max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why 2,847+ Businesses Switched from DocuSign
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            Teams are tired of DocuSign&apos;s high costs, clunky mobile experience,
            and frustrating signer friction. BoopSign is the modern alternative
            that solves these problems.
          </p>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            <Card>
              <CardHeader>
                <CardTitle className="text-red-700">
                  DocuSign&apos;s Hidden Problems
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p>
                  <span className="font-bold">💸 Pricing Shock:</span> Plans
                  from $10-$65/user/month with hidden fees.
                </p>
                <p>
                  <span className="font-bold">📱 Mobile Nightmare:</span> Users
                  report apps not working and being unable to sign.
                </p>
                <p>
                  <span className="font-bold">🐌 Slow Process:</span> Average
                  signing time of 7-9 minutes.
                </p>
                <p>
                  <span className="font-bold">🔐 Forced Accounts:</span> Signers
                  must create accounts, creating friction.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-green-700">
                  BoopSign: The Solution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />{" "}
                  <span>
                    <span className="font-bold">Transparent Pricing:</span> Just
                    $12/month total. 50% cheaper.
                  </span>
                </p>
                <p className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />{" "}
                  <span>
                    <span className="font-bold">Mobile-First Design:</span>{" "}
                    Works perfectly on any phone or tablet.
                  </span>
                </p>
                <p className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />{" "}
                  <span>
                    <span className="font-bold">3-Minute Signing:</span> 3x
                    faster than DocuSign.
                  </span>
                </p>
                <p className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />{" "}
                  <span>
                    <span className="font-bold">No Forced Accounts:</span>{" "}
                    Signers click a link and sign instantly.
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Head-to-Head Comparison Table */}
      <section
        id="compare"
        className="py-16 md:py-20 px-4"
      >
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Head-to-Head: DocuSign vs BoopSign
          </h2>
          <p className="text-xl mb-12 opacity-90">
            A direct comparison for 2025.
          </p>

          <div className="rounded-xl p-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-4 px-4 text-gray-900">Feature</th>
                    <th className="py-4 px-4 text-center text-gray-900">BoopSign</th>
                    <th className="py-4 px-4 text-center text-gray-900">DocuSign</th>
                  </tr>
                </thead>
                <tbody className="text-sm md:text-base">
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 text-gray-700">Monthly Cost</td>
                    <td className="py-4 px-4 text-center font-bold text-green-600">
                      $12/month
                    </td>
                    <td className="py-4 px-4 text-center text-red-600">
                      $25/month (Standard)
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 text-gray-700">
                      Mobile Experience
                    </td>
                    <td className="py-4 px-4 text-center text-green-600">
                      <div className="flex justify-center items-center gap-2">
                        <CheckCircle /> Optimized
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center text-red-600">
                      <div className="flex justify-center items-center gap-2">
                        <XCircle /> App issues
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

      {/* Real User Stories Section */}
      <section className="py-16 md:py-20 px-4">
        <div className="container mx-auto text-center max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Real Stories from Former DocuSign Users
          </h2>
          <div className="flex justify-center mb-8">
            <div className="flex text-yellow-400 text-2xl">
              ★★★★★ <span className="text-gray-600 ml-2">4.9/5</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-center text-yellow-400 mb-3">
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </div>
                <p className="mb-4 italic">
                  &quot;DocuSign was costing us $200/month for our 8-person team.                  BoopSign does everything we need for $12. The mobile                  experience is night and day better.&quot;
                </p>
                <p className="font-semibold">- Sarah L., Real Estate Agent</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-center text-yellow-400 mb-3">
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </div>
                <p className="mb-4 italic">
                  &ldquo;Our clients kept saying they never got the DocuSign email or
                  couldn&apos;t sign on their phones. With BoopSign, they click and
                  sign in 30 seconds.&rdquo;        
                </p>
                <p className="font-semibold">
                  - Mike R., Creative Agency Founder
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-center text-yellow-400 mb-3">
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </div>
                <p className="mb-4 italic">
                 &ldquo; The best DocuSign competitor, period. The UI is clean, and
                  not forcing my clients to create an account is a
                  game-changer.&rdquo;
                </p>
                <p className="font-semibold">
                  - Jessica B., Freelance Consultant
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Top Reasons to Switch */}
      <section className="py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Top 5 Reasons to Choose BoopSign
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              BoopSign is more than just a cheaper DocuSign alternative. It&apos;s a
              better experience for you and your clients.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Save 50% on Costs</h3>
                  <p className="text-gray-700">
                    DocuSign&apos;s Standard plan costs $25/month per user. BoopSign
                    is just $12/month total. For a 5-person team, that&apos;s
                    $1,500/year in savings.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Fix Mobile Signing</h3>
                  <p className="text-gray-700">
                    While DocuSign users report mobile app issues, BoopSign is
                    built mobile-first. Sign on any device without downloading
                    apps.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">
                    3x Faster Document Signing
                  </h3>
                  <p className="text-gray-700">
                    BoopSign&apos;s streamlined process gets documents signed in 3
                    minutes, not 30.
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
                    Eliminate Signer Friction
                  </h3>
                  <p className="text-gray-700">
                    No more &ldquo;I can&apos;t remember my DocuSign password.&rdquo; Signers get
                    a link and sign immediately.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">
                  5
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">
                    Modern, Intuitive Interface
                  </h3>
                  <p className="text-gray-700">
                    Built in 2024 for modern teams, not a 2003 enterprise
                    platform trying to keep up.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Should Choose */}
      <section className="py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Is BoopSign the Right DocuSign Alternative for You?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <CheckCircle /> Choose BoopSign if...
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700 list-disc pl-5">
                  <li>You&apos;re a small to medium business (1-50 employees)</li>
                  <li>
                    You work in mobile-heavy industries (real estate, sales,
                    field services)
                  </li>
                  <li>
                    You&apos;re cost-conscious and want DocuSign features without the
                    price
                  </li>
                  <li>You need frictionless signing for your customers</li>
                  <li>You value speed and simplicity over complexity</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-700">
                  <ArrowRight /> Stick with DocuSign if...
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700 list-disc pl-5">
                  <li>
                    You&apos;re a large enterprise (1000+ employees) needing complex
                    workflows
                  </li>
                  <li>
                    You require advanced compliance features for highly
                    regulated industries
                  </li>
                  <li>
                    You have deep DocuSign integrations that are costly to
                    change
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Faq heading="DocuSign vs BoopSign: FAQs" items={docusignFaq} />
        </div>
      </section>

      {/* Final CTA */}
      <Cta />
    </div>
  );
}
