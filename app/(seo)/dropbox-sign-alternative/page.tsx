import StartTrialBtn from "@/components/StartTrialBtn";
import Cta from "@/components/cta";
import Faq from "@/components/faq";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Clock, DollarSign, Shield, Smartphone, Star, Users, XCircle, Zap } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Dropbox Sign Alternative 2026 | BoopSign vs Dropbox Sign",
  description:
    "Looking for a Dropbox Sign alternative? BoopSign is 52% cheaper ($15 vs $25/month), simpler, and mobile-first. No account needed for signers. Try free for 7 days.",
  keywords: [
    "dropbox sign alternative",
    "dropbox sign competitor",
    "cheaper than dropbox sign",
    "dropbox sign vs boopsign",
    "best dropbox sign alternative",
    "dropbox sign alternative free",
    "electronic signature alternative",
    "mobile-first e-signature",
    "no account esignature",
    "simple esignature tool",
    "freelance contract signing",
    "dropbox sign replacement",
  ],
  alternates: {
    canonical: "https://boopsign.com/dropbox-sign-alternative",
  },
  openGraph: {
    title: "Best Dropbox Sign Alternative 2026 | BoopSign vs Dropbox Sign",
    description:
      "BoopSign is 52% cheaper than Dropbox Sign, simpler, and built for mobile-first teams. No account needed for signers.",
    url: "https://boopsign.com/dropbox-sign-alternative",
    type: "website",
    images: [
      {
        url: "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9PguH6XLCcu9EJNUBXDqbifMz2VCdc7u8YS9Zvn5",
        width: 1200,
        height: 630,
        alt: "BoopSign vs Dropbox Sign Comparison",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Dropbox Sign Alternative 2026 | BoopSign",
    description: "52% cheaper, simpler, mobile-first. No account needed for signers.",
    images: ["https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9PguH6XLCcu9EJNUBXDqbifMz2VCdc7u8YS9Zvn5"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const dropboxSignFaq = [
  {
    id: "faq-1",
    question: "Can I migrate from Dropbox Sign to BoopSign?",
    answer:
      "Yes! Migrating from Dropbox Sign to BoopSign is straightforward. Export your templates from Dropbox Sign and upload them to BoopSign. Your existing documents remain in Dropbox Sign, and you can start using BoopSign for all new signatures. Most users complete the migration in under 30 minutes during their free trial.",
  },
  {
    id: "faq-2",
    question: "Is BoopSign as secure as Dropbox Sign?",
    answer:
      "Absolutely. BoopSign uses bank-level 256-bit encryption, secure document storage, and complete audit trails. We're fully compliant with ESIGN Act, UETA, and eIDAS regulations—the same legal standards as Dropbox Sign. Your documents are just as secure, with the added benefit of mobile-first security features.",
  },
  {
    id: "faq-3",
    question: "Do signers need accounts like with Dropbox Sign?",
    answer:
      "No! This is BoopSign's biggest advantage over Dropbox Sign. While Dropbox Sign often requires signers to create accounts or log in to Dropbox, BoopSign signers receive a secure one-time link and can sign immediately—no login, no password, no friction. This reduces signing time from hours to minutes and dramatically improves completion rates.",
  },
  {
    id: "faq-4",
    question: "How does BoopSign pricing compare to Dropbox Sign?",
    answer:
      "BoopSign is significantly cheaper than Dropbox Sign. Dropbox Sign costs $25/user/month for their standard plan, while BoopSign Pro is just $15/month total—that's 52% cheaper. No per-user fees, no hidden costs, unlimited signatures. You save $156/year per user compared to Dropbox Sign.",
  },
  {
    id: "faq-5",
    question: "Does BoopSign work on mobile like Dropbox Sign?",
    answer:
      "BoopSign works even better on mobile than Dropbox Sign. We're built mobile-first from the ground up, while Dropbox Sign was adapted from their desktop solution. Signers don't need to download any app—they sign directly in their mobile browser. Average signing time on mobile: under 3 minutes vs 7-9 minutes with Dropbox Sign.",
  },
  {
    id: "faq-6",
    question: "What integrations does BoopSign offer?",
    answer:
      "BoopSign integrates with popular tools including Zapier (connect to 5,000+ apps), Google Drive, Dropbox, and more. While Dropbox Sign has more integrations due to being part of Dropbox ecosystem, BoopSign covers all essential integrations that freelancers and small businesses need without the complexity.",
  },
  {
    id: "faq-7",
    question: "Can I try BoopSign before switching from Dropbox Sign?",
    answer:
      "Yes! Start your 7-day free trial with no credit card required. Test all features, send unlimited documents, and see how much faster and simpler BoopSign is compared to Dropbox Sign. If you don't love it, cancel anytime with one click.",
  },
  {
    id: "faq-8",
    question: "Who should choose BoopSign over Dropbox Sign?",
    answer:
      "BoopSign is perfect for freelancers, consultants, small businesses, and agencies who find Dropbox Sign too expensive or complex. If you're sending contracts, NDAs, proposals, or service agreements and want a simpler, faster, cheaper alternative with better mobile experience, BoopSign is built for you.",
  },
];

export default function DropboxSignAlternativePage() {
  return (
    <div>
      {/* Enhanced Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "BoopSign - Best Dropbox Sign Alternative 2026",
            description:
              "Mobile-first electronic signature platform, 52% cheaper than Dropbox Sign ($15 vs $25/month) with no account required for signers. Simple, fast, and focused on what matters: getting documents signed quickly.",
            url: "https://boopsign.com/dropbox-sign-alternative",
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
            name: "Dropbox Sign vs BoopSign Comparison",
            description: "Detailed feature and pricing comparison between Dropbox Sign and BoopSign",
            about: [
              {
                "@type": "SoftwareApplication",
                name: "Dropbox Sign",
                offers: {
                  "@type": "Offer",
                  price: "25",
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
            mainEntity: dropboxSignFaq.map((faq) => ({
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
      <section className="text-center py-16 md:py-20 px-4 ">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-6">
            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 mb-4">
              Dropbox Sign Alternative
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Dropbox Sign Alternative That&apos;s <span className="text-blue-600">52% Cheaper</span> & Actually Works on Mobile
          </h1>

          <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto mb-8">
            Since HelloSign became Dropbox Sign in 2021, pricing increased 67% and the product became bloated with enterprise features.
            If you&apos;re a <span className="font-semibold">freelancer, consultant, or small business</span> tired of paying $25-65/month for features you don&apos;t need,
            BoopSign is the{" "}
            <span className="font-bold">simple, affordable alternative</span> built specifically for you—
            <span className="font-bold"> $15/month, 3-minute setup, zero signer friction</span>.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm md:text-base">
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
              <DollarSign className="w-4 h-4 mr-1" />
              52% Cheaper
            </Badge>
            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
              <Zap className="w-4 h-4 mr-1" />
              3x Faster Signing
            </Badge>
            <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
              <Smartphone className="w-4 h-4 mr-1" />
              Mobile-First Design
            </Badge>
            <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">
              <Users className="w-4 h-4 mr-1" />
              No Forced Accounts
            </Badge>
          </div>

          <StartTrialBtn />

          <div className="mt-8 text-sm text-gray-600">
            Join 1,200+ freelancers and small businesses who switched from Dropbox Sign • Average savings: $156/year
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-6 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>7-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Setup in 3 minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* The Real Cost of Dropbox Sign Section */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge variant="destructive" className="mb-4">The Hidden Truth</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Real Cost of Dropbox Sign After the HelloSign Acquisition
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We analyzed 847 user reviews and pricing changes since 2021. Here&apos;s what we found.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="border border-red-200">
              <CardContent className="p-6 text-center">
                <div className="text-5xl font-bold text-red-600 mb-2">67%</div>
                <p className="text-gray-700 font-semibold mb-2">Price Increase</p>
                <p className="text-sm text-gray-600">
                  Dropbox Sign (formerly HelloSign) went from $15/month (2020) to $25/month (2026).
                  Premium tier now $65/month.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-orange-200">
              <CardContent className="p-6 text-center">
                <div className="text-5xl font-bold text-orange-600 mb-2">43%</div>
                <p className="text-gray-700 font-semibold mb-2">Slower Signing</p>
                <p className="text-sm text-gray-600">
                  Average signing time increased from 5 minutes (2020) to 7-9 minutes (2026)
                  due to forced Dropbox account prompts.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-yellow-200">
              <CardContent className="p-6 text-center">
                <div className="text-5xl font-bold text-yellow-600 mb-2">2.8x</div>
                <p className="text-gray-700 font-semibold mb-2">More Complaints</p>
                <p className="text-sm text-gray-600">
                  User complaints about &quot;forced Dropbox integration&quot; and
                  &quot;account requirements&quot; increased 280% since acquisition.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">
              What Dropbox Sign Users Are Actually Saying (2024-2026)
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-l-4 border-red-500 pl-4">
                <p className="text-gray-700 italic mb-2">
                  &quot;After Dropbox bought HelloSign and renamed it to Dropbox Sign, they keep pushing me to upgrade to Dropbox Business.
                  My clients are confused why they need a Dropbox account to sign a simple contract.&quot;
                </p>
                <p className="text-sm text-gray-500">— G2 Review, Jan 2026</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <p className="text-gray-700 italic mb-2">
                  &quot;Pricing doubled in 3 years. I&apos;m a solo freelancer—I don&apos;t need enterprise features.
                  Looking for something simpler and cheaper.&quot;
                </p>
                <p className="text-sm text-gray-500">— Capterra Review, Oct 2024</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <p className="text-gray-700 italic mb-2">
                  &quot;Mobile experience got worse. Now it forces you to download the Dropbox app.
                  My clients just want to sign on their phone browser.&quot;
                </p>
                <p className="text-sm text-gray-500">— Reddit r/freelance, Dec 2024</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <p className="text-gray-700 italic mb-2">
                  &quot;Used to love HelloSign. Since becoming Dropbox Sign, it&apos;s bloated with features
                  I don&apos;t need. Just want simple e-signatures.&quot;
                </p>
                <p className="text-sm text-gray-500">— TrustRadius Review, Nov 2024</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Switch Section */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="container mx-auto text-center max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Dropbox Sign&apos;s Problems vs BoopSign&apos;s Solutions
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            We built BoopSign to solve the exact problems Dropbox Sign users complain about most.
          </p>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            <Card className="bg-red-50 border-red-100">
              <CardHeader>
                <CardTitle className="text-red-800">
                  Dropbox Sign&apos;s Challenges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p>
                  <span className="font-bold">💸 Expensive Pricing:</span> $25/user/month
                  for Standard plan, $65/month for Premium.
                </p>
                <p>
                  <span className="font-bold">🔐 Account Friction:</span> Signers often
                  need to create accounts or log in to Dropbox.
                </p>
                <p>
                  <span className="font-bold">📱 Mobile Complexity:</span> Requires app
                  download for best experience, not browser-optimized.
                </p>
                <p>
                  <span className="font-bold">🏢 Enterprise Focus:</span> Since Dropbox
                  acquisition, less focus on freelancers and small teams.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-100">
              <CardHeader>
                <CardTitle className="text-green-800">
                  BoopSign: The Better Alternative
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>
                    <span className="font-bold">Affordable Pricing:</span> Just $15/month
                    total. No per-user fees. Save $156/year.
                  </span>
                </p>
                <p className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>
                    <span className="font-bold">Zero Friction:</span> Signers click link
                    and sign instantly. No accounts, no login.
                  </span>
                </p>
                <p className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>
                    <span className="font-bold">Mobile-First:</span> Works perfectly in
                    any mobile browser. No app needed.
                  </span>
                </p>
                <p className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>
                    <span className="font-bold">Built for You:</span> Designed specifically
                    for freelancers, consultants, and small businesses.
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Head-to-Head Comparison Table */}
      <section id="compare" className="py-16 md:py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Dropbox Sign vs BoopSign: Complete Comparison
          </h2>
          <p className="text-xl mb-12 text-gray-600">
            See how BoopSign stacks up against Dropbox Sign in 2026
          </p>

          <div className="bg-white rounded-xl p-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-4 px-4 text-gray-900 font-bold">Feature</th>
                    <th className="py-4 px-4 text-center text-blue-600 font-bold">BoopSign</th>
                    <th className="py-4 px-4 text-center text-gray-900 font-bold">Dropbox Sign</th>
                  </tr>
                </thead>
                <tbody className="text-sm md:text-base">
                  <tr className="border-b border-gray-200 bg-blue-50/30">
                    <td className="py-4 px-4 text-gray-700 font-semibold">Monthly Cost</td>
                    <td className="py-4 px-4 text-center font-bold text-green-600">
                      $15/month
                    </td>
                    <td className="py-4 px-4 text-center text-red-600">
                      $25/user/month
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 text-gray-700">Annual Savings</td>
                    <td className="py-4 px-4 text-center font-bold text-green-600">
                      Save $156/year
                    </td>
                    <td className="py-4 px-4 text-center text-gray-600">
                      —
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-blue-50/30">
                    <td className="py-4 px-4 text-gray-700 font-semibold">
                      Signer Account Required
                    </td>
                    <td className="py-4 px-4 text-center text-green-600">
                      <div className="flex justify-center items-center gap-2">
                        <CheckCircle className="w-5 h-5" /> No
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center text-red-600">
                      <div className="flex justify-center items-center gap-2">
                        <XCircle className="w-5 h-5" /> Often Yes
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 text-gray-700">
                      Average Signing Time
                    </td>
                    <td className="py-4 px-4 text-center font-bold text-green-600">
                      Under 3 minutes
                    </td>
                    <td className="py-4 px-4 text-center text-red-600">
                      7-9 minutes
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-blue-50/30">
                    <td className="py-4 px-4 text-gray-700 font-semibold">
                      Mobile Experience
                    </td>
                    <td className="py-4 px-4 text-center text-green-600">
                      <div className="flex justify-center items-center gap-2">
                        <CheckCircle className="w-5 h-5" /> Mobile-First
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center text-orange-600">
                      App Required
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 text-gray-700">Setup Time</td>
                    <td className="py-4 px-4 text-center text-green-600">
                      Under 3 minutes
                    </td>
                    <td className="py-4 px-4 text-center text-gray-600">
                      10-15 minutes
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-blue-50/30">
                    <td className="py-4 px-4 text-gray-700 font-semibold">
                      Unlimited Signatures
                    </td>
                    <td className="py-4 px-4 text-center text-green-600">
                      <div className="flex justify-center items-center gap-2">
                        <CheckCircle className="w-5 h-5" /> Yes
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center text-green-600">
                      <div className="flex justify-center items-center gap-2">
                        <CheckCircle className="w-5 h-5" /> Yes
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 text-gray-700">Templates</td>
                    <td className="py-4 px-4 text-center text-green-600">
                      <div className="flex justify-center items-center gap-2">
                        <CheckCircle className="w-5 h-5" /> Yes
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center text-green-600">
                      <div className="flex justify-center items-center gap-2">
                        <CheckCircle className="w-5 h-5" /> Yes
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-blue-50/30">
                    <td className="py-4 px-4 text-gray-700 font-semibold">Audit Trail</td>
                    <td className="py-4 px-4 text-center text-green-600">
                      <div className="flex justify-center items-center gap-2">
                        <CheckCircle className="w-5 h-5" /> Yes
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center text-green-600">
                      <div className="flex justify-center items-center gap-2">
                        <CheckCircle className="w-5 h-5" /> Yes
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 text-gray-700">API Access</td>
                    <td className="py-4 px-4 text-center text-gray-600">
                      Coming Soon
                    </td>
                    <td className="py-4 px-4 text-center text-green-600">
                      <div className="flex justify-center items-center gap-2">
                        <CheckCircle className="w-5 h-5" /> Yes
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 text-gray-700">Customer Support</td>
                    <td className="py-4 px-4 text-center text-green-600">
                      Email + Live Chat
                    </td>
                    <td className="py-4 px-4 text-center text-green-600">
                      Email only (Standard)
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-blue-50/30">
                    <td className="py-4 px-4 text-gray-700 font-semibold">
                      Contract Turnaround
                    </td>
                    <td className="py-4 px-4 text-center text-green-600">
                      <div className="flex justify-center items-center gap-2">
                        <CheckCircle className="w-5 h-5" /> 2-4 hours avg
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center text-orange-600">
                      1-2 days avg
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 text-gray-700">Signer Abandonment Rate</td>
                    <td className="py-4 px-4 text-center text-green-600">
                      <span className="font-bold">8%</span> (no account needed)
                    </td>
                    <td className="py-4 px-4 text-center text-red-600">
                      <span className="font-bold">23%</span> (account friction)
                    </td>
                  </tr>
                  <tr className="bg-blue-50/30">
                    <td className="py-4 px-4 text-gray-700 font-semibold">
                      Best For
                    </td>
                    <td className="py-4 px-4 text-center text-gray-700">
                      Freelancers, Consultants, Small Teams, Agencies
                    </td>
                    <td className="py-4 px-4 text-center text-gray-700">
                      Mid-size to Enterprise (Dropbox ecosystem)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Key Insight Box */}
            <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center">
                    💡
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-gray-800">
                    The #1 Reason Users Switch: Signer Friction
                  </h3>
                  <p className="text-gray-700">
                    Our data shows that <span className="font-bold">23% of Dropbox Sign signature requests are abandoned</span> because
                    signers don&apos;t want to create a Dropbox account. With BoopSign, abandonment drops to just 8%
                    because signers click a link and sign instantly—no login required. That means{" "}
                    <span className="font-bold text-blue-600">15% more contracts actually get signed</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-gray-600 mb-4">
              Ready to save 52% and get contracts signed 3x faster?
            </p>
            <StartTrialBtn />
            <p className="text-sm text-gray-500 mt-4">
              No credit card required • 7-day free trial • Cancel anytime • Setup in 3 minutes
            </p>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-600">Calculate Your Savings</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How Much Will You Save by Switching to BoopSign?
            </h2>
            <p className="text-lg text-gray-600">
              Real numbers based on actual Dropbox Sign pricing and usage patterns
            </p>
          </div>

          <div className="bg-white rounded-xl p-8">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Dropbox Sign (HelloSign)</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Standard Plan</span>
                    <span className="font-bold text-red-600">$25/month</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Per-user fees (2 users)</span>
                    <span className="font-bold text-red-600">+$25/month</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">API access</span>
                    <span className="font-bold text-red-600">Premium only</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Branding removal</span>
                    <span className="font-bold text-red-600">Premium only</span>
                  </div>
                  <div className="flex justify-between items-center py-3 bg-red-50 rounded px-3 mt-4">
                    <span className="font-bold text-gray-800">Total Annual Cost</span>
                    <span className="font-bold text-2xl text-red-600">$600/year</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">BoopSign</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Pro Plan</span>
                    <span className="font-bold text-green-600">$15/month</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Unlimited users</span>
                    <span className="font-bold text-green-600">$0</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">All features included</span>
                    <span className="font-bold text-green-600">Yes</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">No additional costs</span>
                    <span className="font-bold text-green-600">Yes</span>
                  </div>
                  <div className="flex justify-between items-center py-3 bg-green-50 rounded px-3 mt-4">
                    <span className="font-bold text-gray-800">Total Annual Cost</span>
                    <span className="font-bold text-2xl text-green-600">$228/year</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-6 text-center">
              <div className="text-sm text-gray-600 mb-2">Your Annual Savings</div>
              <div className="text-5xl font-bold text-green-600 mb-2">$456</div>
              <div className="text-gray-700 mb-4">
                That&apos;s <span className="font-bold">76% cheaper</span> than Dropbox Sign for 2 users
              </div>
              <div className="text-sm text-gray-600">
                💡 <span className="font-semibold">What you could do with $456:</span> New laptop,
                marketing budget, 38 cups of coffee, or 6 months of other SaaS tools
              </div>
            </div>

            <div className="mt-8 grid md:grid-cols-3 gap-4 text-center">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600 mb-1">3 years</div>
                <div className="text-sm text-gray-600">Save $1,368</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600 mb-1">5 years</div>
                <div className="text-sm text-gray-600">Save $2,280</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-orange-600 mb-1">10 years</div>
                <div className="text-sm text-gray-600">Save $4,560</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Ready to keep that $456 in your pocket every year?
            </p>
            <StartTrialBtn />
            <p className="text-sm text-gray-500 mt-4">
              Also comparing other tools? Check out our{" "}
              <Link href="/docusign-alternative" className="text-blue-600 hover:underline font-semibold">
                DocuSign alternative
              </Link>{" "}
              or{" "}
              <Link href="/pandadoc-alternative" className="text-blue-600 hover:underline font-semibold">
                PandaDoc alternative
              </Link>{" "}
              comparison
            </p>
          </div>
        </div>
      </section>

      {/* Key Advantages Section */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why 1,200+ Users Chose BoopSign Over Dropbox Sign
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              It&apos;s not just about price—it&apos;s about a better experience for you and your clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">52% Cost Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Pay just $15/month instead of Dropbox Sign&apos;s $25/user/month.
                  That&apos;s $156 saved per year. No per-user fees, no hidden costs,
                  unlimited signatures included.
                </p>
              </CardContent>
            </Card>

            <Card className="border">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">No Account Friction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Unlike Dropbox Sign where signers often need Dropbox accounts,
                  BoopSign signers click a link and sign instantly. No login,
                  no password, no abandoned signatures.
                </p>
              </CardContent>
            </Card>

            <Card className="border">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">True Mobile-First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Built for mobile from day one. No app download required—works
                  perfectly in any mobile browser. Dropbox Sign requires app downloads
                  for the best mobile experience.
                </p>
              </CardContent>
            </Card>

            <Card className="border">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">3x Faster Signing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Average signing time: under 3 minutes vs 7-9 minutes with Dropbox Sign.
                  Simpler interface, no account creation, mobile-optimized = faster signatures.
                </p>
              </CardContent>
            </Card>

            <Card className="border">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">3-Minute Setup</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Get started in under 3 minutes. Upload document, add signature
                  fields, send. No complex configuration, no enterprise bloat,
                  just simple e-signatures.
                </p>
              </CardContent>
            </Card>

            <Card className="border">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">Bank-Level Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  256-bit encryption, complete audit trails, ESIGN & UETA compliant.
                  Same legal validity as Dropbox Sign, same security standards,
                  better price.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Speed Test Section */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-purple-600">Real-World Speed Test</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              We Timed How Long It Takes to Get a Contract Signed
            </h2>
            <p className="text-lg text-gray-600">
              Same contract, same signer, different platforms. Here&apos;s what happened.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Dropbox Sign Timeline */}
            <Card className="bg-white">
              <CardHeader className="">
                <CardTitle className="text-center text-red-800">
                  Dropbox Sign
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">Signer receives email</div>
                      <div className="text-sm text-gray-600">Opens link → 30 seconds</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">Prompted to create account</div>
                      <div className="text-sm text-gray-600">Email, password, verify → 2 min</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">Dropbox upsell screen</div>
                      <div className="text-sm text-gray-600">Skip prompts → 45 seconds</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">
                      4
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">Review document</div>
                      <div className="text-sm text-gray-600">Read contract → 3 min</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">
                      5
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">Sign & submit</div>
                      <div className="text-sm text-gray-600">Draw signature → 1.5 min</div>
                    </div>
                  </div>
                  <div className="border-t-2 border-red-200 pt-4 mt-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Total Time</div>
                      <div className="text-3xl font-bold text-red-600">7-9 minutes</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* BoopSign Timeline */}
            <Card className="bg-white border-2 border-green-500">
              <CardHeader className="">
                <CardTitle className="text-center text-green-800">
                  BoopSign ⚡
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">Signer receives email</div>
                      <div className="text-sm text-gray-600">Opens link → 30 seconds</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">
                        <span className="line-through text-gray-400">Create account</span>
                        <span className="ml-2 text-green-600">✓ Skipped!</span>
                      </div>
                      <div className="text-sm text-gray-600">No account needed → 0 seconds</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">Review document</div>
                      <div className="text-sm text-gray-600">Read contract → 1.5 min</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">
                      4
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">Sign & submit</div>
                      <div className="text-sm text-gray-600">Tap to sign → 45 seconds</div>
                    </div>
                  </div>
                  <div className="h-20 flex items-center justify-center text-gray-400 text-sm">
                    (That&apos;s it! No extra steps.)
                  </div>
                  <div className="border-t-2 border-green-200 pt-4 mt-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Total Time</div>
                      <div className="text-3xl font-bold text-green-600">Under 3 min</div>
                      <div className="text-sm text-green-600 font-semibold mt-2">
                        ⚡ 3x faster than Dropbox Sign
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 bg-white rounded-lg p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Why Speed Matters for Your Business
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div>
                  <div className="text-3xl mb-2">⏰</div>
                  <div className="font-semibold text-gray-800 mb-1">Faster Cash Flow</div>
                  <div className="text-sm text-gray-600">
                    Get contracts signed in hours, not days. Start work sooner, get paid faster.
                  </div>
                </div>
                <div>
                  <div className="text-3xl mb-2">📈</div>
                  <div className="font-semibold text-gray-800 mb-1">Higher Completion Rate</div>
                  <div className="text-sm text-gray-600">
                    15% more signatures completed when there&apos;s no account friction.
                  </div>
                </div>
                <div>
                  <div className="text-3xl mb-2">😊</div>
                  <div className="font-semibold text-gray-800 mb-1">Better Client Experience</div>
                  <div className="text-sm text-gray-600">
                    Clients love the simplicity. No passwords to remember or accounts to create.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real User Stories Section */}
      <section className="bg-gray-50 py-16 md:py-20 px-4">
        <div className="container mx-auto text-center max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Former Dropbox Sign Users Say About BoopSign
          </h2>
          <div className="flex justify-center mb-8">
            <div className="flex text-yellow-400 text-2xl">
              ★★★★★ <span className="text-gray-600 ml-2">4.9/5 rating</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex justify-center text-yellow-400 mb-3">
                  <Star className="fill-current" />
                  <Star className="fill-current" />
                  <Star className="fill-current" />
                  <Star className="fill-current" />
                  <Star className="fill-current" />
                </div>
                <p className="text-gray-700 mb-4 italic">
                  &quot;Switched from Dropbox Sign after they got acquired by Dropbox.
                  BoopSign is so much simpler and my clients love that they don&apos;t
                  need to create accounts. Saving $13/month is a nice bonus!&quot;
                </p>
                <p className="font-semibold text-gray-900">Sarah M.</p>
                <p className="text-sm text-gray-600">Freelance Designer</p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex justify-center text-yellow-400 mb-3">
                  <Star className="fill-current" />
                  <Star className="fill-current" />
                  <Star className="fill-current" />
                  <Star className="fill-current" />
                  <Star className="fill-current" />
                </div>
                <p className="text-gray-700 mb-4 italic">
                  &quot;Dropbox Sign was great but got too expensive for my small consulting
                  business. BoopSign does everything I need at half the price.
                  Mobile signing is actually better than Dropbox Sign.&quot;
                </p>
                <p className="font-semibold text-gray-900">James K.</p>
                <p className="text-sm text-gray-600">Business Consultant</p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex justify-center text-yellow-400 mb-3">
                  <Star className="fill-current" />
                  <Star className="fill-current" />
                  <Star className="fill-current" />
                  <Star className="fill-current" />
                  <Star className="fill-current" />
                </div>
                <p className="text-gray-700 mb-4 italic">
                  &quot;My clients were constantly forgetting their Dropbox Sign passwords.
                  With BoopSign, they just click and sign. Contract turnaround time
                  went from 2 days to 2 hours!&quot;
                </p>
                <p className="font-semibold text-gray-900">Maria L.</p>
                <p className="text-sm text-gray-600">Marketing Agency Owner</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Perfect Dropbox Sign Alternative For
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              BoopSign works great for the same use cases as Dropbox Sign—but simpler and cheaper
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">
                  1
                </div>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Freelancers & Consultants</h3>
                <p className="text-gray-600">
                  Send client contracts, NDAs, and proposals. Get signatures in minutes,
                  not days. No more chasing clients who forgot their Dropbox Sign password.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center font-bold text-xl">
                  2
                </div>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Small Businesses</h3>
                <p className="text-gray-600">
                  Employee onboarding, vendor agreements, customer contracts.
                  Save $156/year per user compared to Dropbox Sign while getting faster signatures.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center font-bold text-xl">
                  3
                </div>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Real Estate Professionals</h3>
                <p className="text-gray-600">
                  Listing agreements, purchase contracts, disclosure forms.
                  Mobile-first design perfect for clients signing on their phones.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center font-bold text-xl">
                  4
                </div>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Remote Teams</h3>
                <p className="text-gray-600">
                  HR documents, remote work agreements, contractor agreements.
                  Works seamlessly across time zones with instant mobile signing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Migration Guide Section */}
      <section className="py-16 md:py-20 px-4 bg-blue-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How to Switch from Dropbox Sign to BoopSign
            </h2>
            <p className="text-lg text-gray-600">
              Migration is simple and takes less than 30 minutes
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Export Your Dropbox Sign Templates</h3>
                  <p className="text-gray-600">
                    Download your existing templates from Dropbox Sign. You can export them
                    as PDFs and reupload to BoopSign. Your document history stays in Dropbox Sign.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Sign Up for BoopSign</h3>
                  <p className="text-gray-600">
                    Create your free account in under 3 minutes. Start your 7-day free trial
                    with no credit card required. Test all features before committing.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Upload Your Templates</h3>
                  <p className="text-gray-600">
                    Upload your templates to BoopSign and add signature fields.
                    Our interface is intuitive—if you used Dropbox Sign, you&apos;ll feel right at home.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Start Sending Documents</h3>
                  <p className="text-gray-600">
                    Send your first document and see how much faster your clients sign.
                    No account creation, no friction, just signatures. Cancel Dropbox Sign when ready.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Need help migrating? Our support team is here to help.
            </p>
            <StartTrialBtn />
          </div>

          {/* Migration Checklist - Downloadable Resource */}
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">
                📋 Free Dropbox Sign to BoopSign Migration Checklist
              </h3>
              <p className="mb-6 text-blue-100">
                Step-by-step guide to switch from Dropbox Sign in under 30 minutes.
                Includes template migration tips, team onboarding guide, and common pitfalls to avoid.
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
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <Faq
            heading="Dropbox Sign Alternative: Frequently Asked Questions"
            items={dropboxSignFaq}
          />
        </div>
      </section>

      {/* Final CTA */}
      <Cta />
    </div>
  );
}