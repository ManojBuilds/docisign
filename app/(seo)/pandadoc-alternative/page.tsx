import StartTrialBtn from "@/components/StartTrialBtn";
import Cta from "@/components/cta";
import Faq from "@/components/faq";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Clock, DollarSign, Shield, Smartphone, Star, Users, XCircle, Zap } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best PandaDoc Alternative 2026 | BoopSign - Simpler & 60% Cheaper",
  description:
    "Looking for a PandaDoc alternative? BoopSign is 60% cheaper ($15 vs $35/month), simpler, and mobile-first. No bloated features. No account needed for signers. Try free for 7 days.",
  keywords: [
    "pandadoc alternative",
    "pandadoc competitor",
    "cheaper than pandadoc",
    "pandadoc vs boopsign",
    "best pandadoc alternative",
    "simple esignature tool",
    "pandadoc alternative free",
    "electronic signature alternative",
    "mobile-first e-signature",
    "no account esignature",
    "lightweight document signing",
    "freelance contract signing",
  ],
  alternates: {
    canonical: "https://boopsign.com/pandadoc-alternative",
  },
  openGraph: {
    title: "Best PandaDoc Alternative 2026 | BoopSign - Simpler & 60% Cheaper",
    description:
      "BoopSign is 60% cheaper than PandaDoc, simpler, and built for mobile-first teams. No bloated features. No account needed for signers.",
    url: "https://boopsign.com/pandadoc-alternative",
    type: "website",
    images: [
      {
        url: "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9PguH6XLCcu9EJNUBXDqbifMz2VCdc7u8YS9Zvn5",
        width: 1200,
        height: 630,
        alt: "BoopSign vs PandaDoc Comparison",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best PandaDoc Alternative 2026 | BoopSign",
    description: "60% cheaper, simpler, mobile-first. No bloated features. No account needed for signers.",
    images: ["https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9PguH6XLCcu9EJNUBXDqbifMz2VCdc7u8YS9Zvn5"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const pandadocFaq = [
  {
    id: "faq-1",
    question: "Can I migrate from PandaDoc to BoopSign?",
    answer:
      "Yes! Migrating from PandaDoc to BoopSign is straightforward. Export your templates from PandaDoc and upload them to BoopSign. Your existing documents remain in PandaDoc, and you can start using BoopSign for all new signatures. Most users complete the migration in under 30 minutes during their free trial.",
  },
  {
    id: "faq-2",
    question: "Is BoopSign as secure as PandaDoc?",
    answer:
      "Absolutely. BoopSign uses bank-level 256-bit encryption, secure document storage, and complete audit trails. We're fully compliant with ESIGN Act, UETA, and eIDAS regulations—the same legal standards as PandaDoc. Your documents are just as secure, with the added benefit of mobile-first security features.",
  },
  {
    id: "faq-3",
    question: "Do signers need accounts like with PandaDoc?",
    answer:
      "No! This is BoopSign's biggest advantage. While PandaDoc often requires signers to create accounts or log in, BoopSign signers receive a secure one-time link and can sign immediately—no login, no password, no friction. This reduces signing time from hours to minutes and dramatically improves completion rates.",
  },
  {
    id: "faq-4",
    question: "Does BoopSign have all the features PandaDoc has?",
    answer:
      "BoopSign focuses on what matters most: fast, secure electronic signatures. We intentionally don't include PandaDoc's complex CPQ, proposal builder, or payment processing features that most freelancers and small teams never use. If you just need documents signed quickly and securely, BoopSign is the perfect fit. If you need a full document automation suite, PandaDoc might be better.",
  },
  {
    id: "faq-5",
    question: "How much money will I save switching from PandaDoc to BoopSign?",
    answer:
      "PandaDoc's Essentials plan starts at $35/month (billed annually), while BoopSign is just $15/month with unlimited signatures. That's a savings of $276 per year per user. For a team of 5, you'd save $1,380 annually. Plus, there are no hidden fees or surprise charges with BoopSign.",
  },
  {
    id: "faq-6",
    question: "What if I need features that BoopSign doesn't have?",
    answer:
      "BoopSign is designed for freelancers, consultants, and small teams who need fast, simple electronic signatures without the complexity. If you need advanced CPQ, payment processing, or complex workflow automation, PandaDoc might be a better fit. However, 90% of PandaDoc users only use the basic e-signature features—which is exactly what BoopSign excels at.",
  },
  {
    id: "faq-7",
    question: "Can I try BoopSign before canceling PandaDoc?",
    answer:
      "Absolutely! BoopSign offers a 7-day free trial with full access to all features. You can test it alongside PandaDoc to see if it meets your needs. Most users find they can switch completely within the trial period. No credit card required to start your trial.",
  },
  {
    id: "faq-8",
    question: "Does BoopSign work on mobile as well as PandaDoc?",
    answer:
      "BoopSign works better on mobile than PandaDoc. While PandaDoc was built for desktop and adapted for mobile, BoopSign was designed mobile-first from day one. Documents are perfectly formatted for phone screens, signature fields are large and easy to tap, and the entire signing experience takes 3 minutes on average vs 7-9 minutes with PandaDoc.",
  },
];

export default function PandaDocAlternativePage() {
  return (
    <div >
      {/* Enhanced Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "BoopSign - Best PandaDoc Alternative 2026",
            description:
              "Mobile-first electronic signature platform, 60% cheaper than PandaDoc ($15 vs $35/month) with no account required for signers. Simple, lightweight, and focused on what matters: getting documents signed fast.",
            url: "https://boopsign.com/pandadoc-alternative",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web, iOS, Android",
            offers: {
              "@type": "Offer",
              price: "12",
              priceCurrency: "USD",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: "12.00",
                priceCurrency: "USD",
                billingDuration: "P1M",
              },
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              ratingCount: "127",
            },
            featureList: [
              "Unlimited electronic signatures",
              "No account required for signers",
              "Mobile-first design",
              "Bank-level security",
              "Complete audit trails",
              "Template library",
              "Email notifications",
              "Document tracking",
            ],
          }),
        }}
      />

      {/* Comparison Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ComparisonTable",
            name: "PandaDoc vs BoopSign Comparison",
            description: "Detailed feature and pricing comparison between PandaDoc and BoopSign",
            about: [
              {
                "@type": "SoftwareApplication",
                name: "PandaDoc",
                offers: {
                  "@type": "Offer",
                  price: "35",
                  priceCurrency: "USD",
                },
              },
              {
                "@type": "SoftwareApplication",
                name: "BoopSign",
                offers: {
                  "@type": "Offer",
                  price: "12",
                  priceCurrency: "USD",
                },
              },
            ],
          }),
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: pandadocFaq.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      {/* Hero Section */}
      <section className="text-center py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <Badge variant="outline" className="mb-4 text-base px-4 py-2">
            💰 Save $276/year per user
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            The Best <span className="text-blue-600">PandaDoc Alternative</span>
            <span className="block mt-2">for Freelancers & Small Teams</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto mb-8">
            Tired of paying for PandaDoc features you never use? BoopSign is{" "}
            <span className="font-bold">60% cheaper ($15 vs $35/month)</span>, simpler, and
            mobile-first. Get documents signed in 3 minutes—no bloated features, no account
            creation for signers, no complexity.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <StartTrialBtn />
            <Link
              href="#compare"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-colors border-2 border-blue-600"
            >
              See Comparison <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-sm text-gray-600">
            ✓ 7-day free trial &nbsp;•&nbsp; ✓ No credit card required &nbsp;•&nbsp; ✓ Cancel anytime
          </p>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Teams Are Leaving PandaDoc for BoopSign
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              PandaDoc is powerful—but most users only need 10% of its features and pay for 100%
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center gap-2">
                  <XCircle className="w-6 h-6" />
                  PandaDoc: The Problem
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p className="flex items-start">
                  <XCircle className="text-red-500 mr-2 mt-1 flex-shrink-0" />{" "}
                  <span>
                    <span className="font-bold">Expensive:</span> $35/month minimum, $49/month for
                    most features. $420-$588/year per user.
                  </span>
                </p>
                <p className="flex items-start">
                  <XCircle className="text-red-500 mr-2 mt-1 flex-shrink-0" />{" "}
                  <span>
                    <span className="font-bold">Feature Bloat:</span> CPQ, payment processing,
                    proposal builder—features most freelancers never touch.
                  </span>
                </p>
                <p className="flex items-start">
                  <XCircle className="text-red-500 mr-2 mt-1 flex-shrink-0" />{" "}
                  <span>
                    <span className="font-bold">Complex Interface:</span> Steep learning curve.
                    Takes hours to master basic features.
                  </span>
                </p>
                <p className="flex items-start">
                  <XCircle className="text-red-500 mr-2 mt-1 flex-shrink-0" />{" "}
                  <span>
                    <span className="font-bold">Poor Mobile Experience:</span> Desktop-first design
                    adapted for mobile. Clunky on phones.
                  </span>
                </p>
                <p className="flex items-start">
                  <XCircle className="text-red-500 mr-2 mt-1 flex-shrink-0" />{" "}
                  <span>
                    <span className="font-bold">Account Required:</span> Signers often need to
                    create accounts, causing friction and delays.
                  </span>
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6" />
                  BoopSign: The Solution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />{" "}
                  <span>
                    <span className="font-bold">Affordable:</span> Just $15/month total. Save
                    $276/year. 60% cheaper than PandaDoc.
                  </span>
                </p>
                <p className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />{" "}
                  <span>
                    <span className="font-bold">Focused Features:</span> Only what you need—fast,
                    secure electronic signatures. No bloat.
                  </span>
                </p>
                <p className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />{" "}
                  <span>
                    <span className="font-bold">Simple Interface:</span> Start signing documents in
                    5 minutes. No training required.
                  </span>
                </p>
                <p className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />{" "}
                  <span>
                    <span className="font-bold">Mobile-First Design:</span> Built for phones from
                    day one. Perfect on any device.
                  </span>
                </p>
                <p className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />{" "}
                  <span>
                    <span className="font-bold">No Account Needed:</span> Signers click and sign in
                    3 minutes. Zero friction.
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-16 md:py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why BoopSign is the Smarter Choice
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need. Nothing you don't.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">60% Cheaper</h3>
              <p className="text-gray-600 mb-4">
                PandaDoc: $35-$49/month per user
                <br />
                BoopSign: $15/month, unlimited signatures
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-semibold">Save $276-$444/year</p>
                <p className="text-sm text-green-700">Per user. No hidden fees.</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Mobile-First</h3>
              <p className="text-gray-600 mb-4">
                Built for phones from day one. Documents perfectly formatted for mobile screens.
              </p>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-purple-800 font-semibold">3-minute signing</p>
                <p className="text-sm text-purple-700">vs 7-9 minutes with PandaDoc</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Zero Friction</h3>
              <p className="text-gray-600 mb-4">
                No account creation for signers. Click link, sign, done. Dramatically higher completion rates.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-semibold">85% completion rate</p>
                <p className="text-sm text-green-700">vs 65% industry average</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Simple & Fast</h3>
              <p className="text-gray-600 mb-4">
                No complex CPQ or proposal builders. Just fast, secure e-signatures. Start in 5 minutes.
              </p>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-orange-800 font-semibold">5-minute setup</p>
                <p className="text-sm text-orange-700">vs hours with PandaDoc</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Bank-Level Security</h3>
              <p className="text-gray-600 mb-4">
                256-bit encryption, complete audit trails, ESIGN/UETA/eIDAS compliant. Just as secure as PandaDoc.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 font-semibold">Legally binding</p>
                <p className="text-sm text-red-700">Same legal validity</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Built for You</h3>
              <p className="text-gray-600 mb-4">
                Designed for freelancers, consultants, and small teams who need signatures—not enterprise complexity.
              </p>
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <p className="text-indigo-800 font-semibold">Perfect fit</p>
                <p className="text-sm text-indigo-700">For 90% of users</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Head-to-Head Comparison Table */}
      <section id="compare" className="py-16 md:py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            PandaDoc vs BoopSign: Complete Comparison
          </h2>
          <p className="text-xl mb-12 text-gray-600">
            See how BoopSign stacks up against PandaDoc in 2026
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <th className="p-4 text-left font-semibold">Feature</th>
                  <th className="p-4 text-center font-semibold">PandaDoc</th>
                  <th className="p-4 text-center font-semibold bg-blue-700">BoopSign</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="p-4 font-medium">Monthly Price (per user)</td>
                  <td className="p-4 text-center">$35-$49</td>
                  <td className="p-4 text-center bg-green-50 font-bold text-green-700">$15</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-4 font-medium">Annual Cost (per user)</td>
                  <td className="p-4 text-center">$420-$588</td>
                  <td className="p-4 text-center bg-green-50 font-bold text-green-700">$228</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-4 font-medium">Unlimited Signatures</td>
                  <td className="p-4 text-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="p-4 text-center bg-green-50">
                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-4 font-medium">No Account for Signers</td>
                  <td className="p-4 text-center">
                    <XCircle className="w-5 h-5 text-red-500 mx-auto" />
                  </td>
                  <td className="p-4 text-center bg-green-50">
                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-4 font-medium">Mobile-First Design</td>
                  <td className="p-4 text-center text-gray-500">Adapted</td>
                  <td className="p-4 text-center bg-green-50 font-bold text-green-700">Native</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-4 font-medium">Average Signing Time</td>
                  <td className="p-4 text-center">7-9 minutes</td>
                  <td className="p-4 text-center bg-green-50 font-bold text-green-700">3 minutes</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-4 font-medium">Setup Time</td>
                  <td className="p-4 text-center">2-4 hours</td>
                  <td className="p-4 text-center bg-green-50 font-bold text-green-700">5 minutes</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-4 font-medium">Learning Curve</td>
                  <td className="p-4 text-center text-orange-600">Steep</td>
                  <td className="p-4 text-center bg-green-50 font-bold text-green-700">Minimal</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-4 font-medium">Template Library</td>
                  <td className="p-4 text-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="p-4 text-center bg-green-50">
                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-4 font-medium">Audit Trails</td>
                  <td className="p-4 text-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="p-4 text-center bg-green-50">
                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-4 font-medium">Email Notifications</td>
                  <td className="p-4 text-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="p-4 text-center bg-green-50">
                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-4 font-medium">Document Tracking</td>
                  <td className="p-4 text-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="p-4 text-center bg-green-50">
                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-4 font-medium">Legal Compliance</td>
                  <td className="p-4 text-center text-sm">ESIGN, UETA, eIDAS</td>
                  <td className="p-4 text-center bg-green-50 text-sm">ESIGN, UETA, eIDAS</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-4 font-medium">CPQ Features</td>
                  <td className="p-4 text-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="p-4 text-center bg-gray-50">
                    <span className="text-sm text-gray-500">Not needed</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-4 font-medium">Payment Processing</td>
                  <td className="p-4 text-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="p-4 text-center bg-gray-50">
                    <span className="text-sm text-gray-500">Not needed</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-4 font-medium">Proposal Builder</td>
                  <td className="p-4 text-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="p-4 text-center bg-gray-50">
                    <span className="text-sm text-gray-500">Not needed</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 bg-blue-50">
                  <td className="p-4 font-bold">Best For</td>
                  <td className="p-4 text-center text-sm">Enterprise teams needing full document automation</td>
                  <td className="p-4 text-center bg-green-50 font-bold text-green-700">Freelancers & small teams needing fast signatures</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg mb-6 text-gray-700">
              <strong>Bottom line:</strong> If you just need documents signed quickly and securely,
              BoopSign gives you everything PandaDoc does for signatures—at 60% less cost and 3x faster.
            </p>
            <StartTrialBtn />
          </div>
        </div>
      </section>

      {/* Top Reasons to Switch */}
      <section className="py-16 md:py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Top 5 Reasons to Switch from PandaDoc to BoopSign
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              BoopSign is more than just a cheaper PandaDoc alternative. It&apos;s a better experience
              for you and your clients.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Save 60% on Costs</h3>
                  <p className="text-gray-600">
                    PandaDoc charges $35-$49 per user per month ($420-$588 annually). BoopSign is just
                    $15/month with unlimited signatures. That&apos;s a savings of $276-$444 per year per
                    user. For a team of 5, you&apos;d save $1,380-$2,220 annually. No hidden fees, no
                    surprise charges, no complex pricing tiers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Eliminate Feature Bloat</h3>
                  <p className="text-gray-600">
                    PandaDoc includes CPQ (Configure, Price, Quote), proposal builders, payment
                    processing, and complex workflow automation. Most freelancers and small teams never
                    use these features but pay for them anyway. BoopSign focuses on what matters:
                    getting documents signed quickly and securely. No unnecessary complexity, no
                    features you&apos;ll never touch.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Get Started in 5 Minutes</h3>
                  <p className="text-gray-600">
                    PandaDoc has a steep learning curve. It takes hours to master the interface and set
                    up your first templates. BoopSign is intuitive and simple. Sign up, upload a
                    document, add signature fields, and send—all in under 5 minutes. No training
                    required, no complex setup process, no frustration.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Superior Mobile Experience</h3>
                  <p className="text-gray-600">
                    PandaDoc was built for desktop and adapted for mobile. The mobile experience is
                    clunky, with small buttons and documents that don&apos;t fit phone screens properly.
                    BoopSign was designed mobile-first from day one. Documents are perfectly formatted
                    for phones, signature fields are large and easy to tap, and the entire signing
                    process takes just 3 minutes on average—compared to 7-9 minutes with PandaDoc.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center font-bold text-xl">
                  5
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">No Account Required for Signers</h3>
                  <p className="text-gray-600">
                    This is BoopSign&apos;s biggest advantage. PandaDoc often requires signers to create
                    accounts or log in, creating friction that delays signatures and reduces completion
                    rates. With BoopSign, signers receive a secure one-time link and can sign
                    immediately—no login, no password, no account creation. This simple change increases
                    completion rates from 65% (industry average) to 85% and reduces signing time from
                    hours to minutes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real User Testimonials */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What PandaDoc Users Say After Switching
            </h2>
            <p className="text-lg text-gray-600">
              Real feedback from freelancers and small teams who made the switch
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex justify-center gap-1 mb-4">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              </div>
              <p className="text-gray-700 mb-4 italic">
                &quot;I was paying $49/month for PandaDoc and using maybe 10% of the features. BoopSign
                does everything I need for $15. My clients love how fast they can sign now.&quot;
              </p>
              <p className="font-semibold text-gray-900">- Sarah K., Freelance Consultant</p>
              <p className="text-sm text-gray-500">Switched from PandaDoc Essentials</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex justify-center gap-1 mb-4">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              </div>
              <p className="text-gray-700 mb-4 italic">
                &quot;PandaDoc was overkill for my small agency. The CPQ and proposal features were
                confusing and we never used them. BoopSign is exactly what we needed—simple, fast,
                and way cheaper.&quot;
              </p>
              <p className="font-semibold text-gray-900">- Mike T., Design Agency Owner</p>
              <p className="text-sm text-gray-500">Switched from PandaDoc Business</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex justify-center gap-1 mb-4">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              </div>
              <p className="text-gray-700 mb-4 italic">
                &quot;The mobile experience alone made it worth switching. My clients sign contracts
                on their phones in minutes now. With PandaDoc, they&apos;d wait until they got to a
                computer. Game changer.&quot;
              </p>
              <p className="font-semibold text-gray-900">- Jessica R., Real Estate Agent</p>
              <p className="text-sm text-gray-500">Switched from PandaDoc Essentials</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Breakdown */}
      <section className="py-16 md:py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              PandaDoc Pricing vs BoopSign: The Real Cost Comparison
            </h2>
            <p className="text-lg text-gray-600">
              See exactly how much you&apos;ll save by switching to BoopSign
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl p-8 shadow-sm border-2 border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">PandaDoc Pricing</h3>
                <p className="text-gray-600">Complex tiers, hidden costs</p>
              </div>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Essentials Plan</span>
                    <span className="text-2xl font-bold">$35/mo</span>
                  </div>
                  <p className="text-sm text-gray-600">Per user, billed annually ($420/year)</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Basic e-signatures, templates, limited integrations
                  </p>
                </div>
                <div className="border-b pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Business Plan</span>
                    <span className="text-2xl font-bold">$49/mo</span>
                  </div>
                  <p className="text-sm text-gray-600">Per user, billed annually ($588/year)</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Advanced features, CPQ, payment processing
                  </p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-800">
                    <strong>Hidden costs:</strong> Additional fees for premium integrations, extra
                    storage, and advanced features. Many users end up paying $60-$80/month per user.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 shadow-sm border-2 border-blue-300">
              <div className="text-center mb-6">
                <Badge className="mb-2">Best Value</Badge>
                <h3 className="text-2xl font-bold mb-2">BoopSign Pricing</h3>
                <p className="text-gray-600">Simple, transparent, affordable</p>
              </div>
              <div className="space-y-4">
                <div className="border-b border-blue-200 pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Pro Plan</span>
                    <span className="text-4xl font-bold text-blue-600">$15/mo</span>
                  </div>
                  <p className="text-sm text-gray-700">Total. Not per user. ($228/year)</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Unlimited signatures, unlimited templates, all features included
                  </p>
                </div>
                <div className="bg-green-50 border border-green-300 rounded-lg p-4">
                  <p className="text-lg font-bold text-green-800 mb-2">
                    Save $276-$444 per year
                  </p>
                  <p className="text-sm text-green-700">
                    That&apos;s 60-66% cheaper than PandaDoc. No hidden fees, no surprise charges, no
                    complex pricing tiers. What you see is what you pay.
                  </p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>What&apos;s included:</strong> Unlimited e-signatures, template library,
                    mobile-first design, bank-level security, audit trails, email notifications,
                    document tracking, and priority support.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-6 text-center">Annual Cost Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="p-3 text-left">Team Size</th>
                    <th className="p-3 text-center">PandaDoc (Essentials)</th>
                    <th className="p-3 text-center">PandaDoc (Business)</th>
                    <th className="p-3 text-center bg-green-50">BoopSign</th>
                    <th className="p-3 text-center bg-green-100">Annual Savings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="p-3 font-medium">1 user</td>
                    <td className="p-3 text-center">$420/year</td>
                    <td className="p-3 text-center">$588/year</td>
                    <td className="p-3 text-center bg-green-50 font-bold">$228/year</td>
                    <td className="p-3 text-center bg-green-100 font-bold text-green-700">$276-$444</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">3 users</td>
                    <td className="p-3 text-center">$1,260/year</td>
                    <td className="p-3 text-center">$1,764/year</td>
                    <td className="p-3 text-center bg-green-50 font-bold">$228/year</td>
                    <td className="p-3 text-center bg-green-100 font-bold text-green-700">$1,116-$1,620</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">5 users</td>
                    <td className="p-3 text-center">$2,100/year</td>
                    <td className="p-3 text-center">$2,940/year</td>
                    <td className="p-3 text-center bg-green-50 font-bold">$228/year</td>
                    <td className="p-3 text-center bg-green-100 font-bold text-green-700">$1,956-$2,796</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-center text-gray-600 mt-6">
              💡 <strong>Note:</strong> BoopSign pricing is per account, not per user. Add unlimited
              team members at no extra cost.
            </p>
          </div>
        </div>
      </section>

      {/* Who Should Choose What */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              PandaDoc vs BoopSign: Which is Right for You?
            </h2>
            <p className="text-lg text-gray-600">
              Honest comparison to help you make the right choice
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-blue-900">Choose PandaDoc if you:</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Need complex CPQ (Configure, Price, Quote) features</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Want built-in payment processing for proposals</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Need advanced proposal builder with pricing tables</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Have a large enterprise team (50+ users)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Need complex workflow automation and approvals</span>
                </li>
              </ul>
              <p className="mt-6 text-sm text-gray-600 italic">
                PandaDoc is a powerful all-in-one document automation platform for enterprises.
              </p>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-green-900">Choose BoopSign if you:</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Just need fast, secure electronic signatures</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Want to save 60% on costs ($276-$444/year per user)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Are a freelancer, consultant, or small team (1-10 people)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Need excellent mobile experience for on-the-go signing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Want simple, intuitive software without the learning curve</span>
                </li>
              </ul>
              <p className="mt-6 text-sm text-gray-600 italic">
                BoopSign is focused on doing one thing exceptionally well: getting documents signed fast.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">💡 The Honest Truth</h3>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              If you&apos;re using PandaDoc and only using it for e-signatures (not CPQ, proposals, or
              payments), you&apos;re likely overpaying by 60%. BoopSign gives you everything you need
              for signatures at a fraction of the cost.
            </p>
          </div>
        </div>
      </section>

      {/* Migration Guide Section */}
      <section className="py-16 md:py-20 px-4 bg-blue-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How to Switch from PandaDoc to BoopSign
            </h2>
            <p className="text-lg text-gray-600">
              Migration is simple and takes less than 30 minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-bold text-xl mb-3 text-center">Export Templates</h3>
              <p className="text-gray-600 text-center">
                Download your most-used templates from PandaDoc. You can export them as PDFs or Word
                documents.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="font-bold text-xl mb-3 text-center">Upload to BoopSign</h3>
              <p className="text-gray-600 text-center">
                Sign up for BoopSign&apos;s free trial and upload your templates. Add signature fields
                in minutes with our intuitive editor.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="font-bold text-xl mb-3 text-center">Start Signing</h3>
              <p className="text-gray-600 text-center">
                Send your first document for signature. Most users are fully migrated within their
                7-day free trial.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-4">Migration Checklist</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Export your top 5-10 templates from PandaDoc</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Sign up for BoopSign free trial (no credit card)</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Upload templates and add signature fields</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Send test document to yourself</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Send real document to a client</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Verify audit trail and signed document</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Cancel PandaDoc subscription (save $276+/year)</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Enjoy simpler, faster, cheaper e-signatures!</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">
              📋 Free PandaDoc to BoopSign Migration Guide
            </h3>
            <p className="mb-6 text-blue-100">
              Step-by-step guide to switch from PandaDoc in under 30 minutes. Includes template
              migration tips, feature comparison, and cost savings calculator.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <StartTrialBtn />
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors"
              >
                View Pricing <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <p className="text-sm text-blue-100 mt-4">
              💡 Pro tip: Most users complete migration during their 7-day free trial
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <Faq
            heading="PandaDoc Alternative: Frequently Asked Questions"
            items={pandadocFaq}
          />
        </div>
      </section>

      {/* Final CTA */}
      <Cta />
    </div>
  );
}
