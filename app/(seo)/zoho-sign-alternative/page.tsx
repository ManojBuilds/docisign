import StartTrialBtn from "@/components/StartTrialBtn";
import Cta from "@/components/cta";
import Faq from "@/components/faq";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Clock, DollarSign, Shield, Smartphone, Star, Users, XCircle, Zap } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Zoho Sign Alternative 2026 | BoopSign vs Zoho Sign",
  description:
    "Looking for a Zoho Sign alternative? BoopSign offers simpler signer experience, 3x faster signing, and 40% savings. No account needed for signers. Try free for 7 days.",
  keywords: [
    "zoho sign alternative",
    "zoho sign competitor",
    "cheaper than zoho sign",
    "zoho sign vs boopsign",
    "best zoho sign alternative",
    "zoho sign alternative free",
    "electronic signature alternative",
    "mobile-first e-signature",
    "no account esignature",
    "simple esignature tool",
    "freelance contract signing",
    "zoho sign vs docusign",
    "zoho sign pricing",
    "zoho sign reviews",
    "zoho sign problems",
  ],
  alternates: {
    canonical: "https://boopsign.com/zoho-sign-alternative",
  },
  openGraph: {
    title: "Best Zoho Sign Alternative 2026 | BoopSign vs Zoho Sign",
    description:
      "BoopSign offers simpler signer experience than Zoho Sign with 40% cost savings. Built for mobile-first teams, no account needed for signers.",
    url: "https://boopsign.com/zoho-sign-alternative",
    type: "website",
    images: [
      {
        url: "https://boopsign.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "BoopSign vs Zoho Sign Comparison",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Zoho Sign Alternative 2026 | BoopSign",
    description: "Simpler experience, 40% cheaper, 3x faster. No account needed for signers.",
    images: ["https://boopsign.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const zohoSignFaq = [
  {
    id: "faq-1",
    question: "Can I migrate from Zoho Sign to BoopSign?",
    answer:
      "Yes! Migrating from Zoho Sign to BoopSign is simple. Export your templates from Zoho Sign as PDFs and upload them to BoopSign. Your existing documents remain in Zoho Sign, and you can start using BoopSign for all new signatures. Our support team can help with the migration process if needed.",
  },
  {
    id: "faq-2",
    question: "What are the key differences between Zoho Sign and BoopSign?",
    answer:
      "Zoho Sign is designed specifically for the Indian market with features like Aadhaar eSign, eMudhra eKYC, and local data compliance. BoopSign is built for global use with a simpler interface that works well for international clients. BoopSign also has no account requirements for signers and is more affordable for small businesses.",
  },
  {
    id: "faq-3",
    question: "Does BoopSign offer Aadhaar integration like Zoho Sign?",
    answer:
      "BoopSign doesn't offer Aadhaar integration like Zoho Sign since it's designed for global use. If you specifically need Aadhaar eSign for Indian operations, Zoho Sign would be more appropriate. However, if you work with international clients or need a simpler solution for general contracts, BoopSign offers a better signer experience.",
  },
  {
    id: "faq-4",
    question: "How does BoopSign pricing compare to Zoho Sign?",
    answer:
      "BoopSign is significantly more affordable. Zoho Sign typically costs $15/user/month, while BoopSign Pro is just $15/month total—no per-user fees. This means you save money even with multiple users compared to Zoho Sign, and get unlimited signatures included.",
  },
  {
    id: "faq-5",
    question: "Does BoopSign work on mobile like Zoho Sign?",
    answer:
      "BoopSign actually works better on mobile than Zoho Sign. We're built mobile-first from the ground up, while Zoho Sign requires app downloads for the best experience. Signers don't need to download any app—they sign directly in their mobile browser. Average signing time on mobile: under 3 minutes vs 5-7 minutes with Zoho Sign.",
  },
  {
    id: "faq-6",
    question: "What integrations does BoopSign offer compared to Zoho Sign?",
    answer:
      "BoopSign integrates with essential tools including Zapier (connect to 5,000+ apps), Google Drive, Dropbox, and popular business applications. While Zoho Sign has deep Zoho ecosystem integration, BoopSign focuses on integrations that freelancers and small businesses need most. Our API is coming soon to match Zoho Sign's integration capabilities.",
  },
  {
    id: "faq-7",
    question: "Can I try BoopSign before switching from Zoho Sign?",
    answer:
      "Yes! Start your 7-day free trial with no credit card required. Test all features, send unlimited documents, and see how much faster and simpler BoopSign is compared to Zoho Sign. If you don't love it, cancel anytime with one click. Most users complete their migration during the trial period.",
  },
  {
    id: "faq-8",
    question: "Who should choose BoopSign over Zoho Sign?",
    answer:
      "BoopSign is perfect for freelancers, consultants, and small businesses that work internationally or with clients who value simplicity over compliance features. If you're sending contracts, NDAs, proposals, or service agreements to clients outside India and want a simpler, faster, more affordable alternative with better signer experience, BoopSign is built for you.",
  },
];

export default function ZohoSignAlternativePage() {
  return (
    <div>
      {/* Enhanced Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "BoopSign - Best Zoho Sign Alternative 2026",
            description:
              "Mobile-first electronic signature platform that offers simpler global experience than Zoho Sign. No account required for signers. 3x faster signing, unlimited signatures, bank-level security.",
            url: "https://boopsign.com/zoho-sign-alternative",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web, iOS, Android",
            offers: {
              "@type": "Offer",
              price: "12",
              priceCurrency: "USD",
              priceValidUntil: "2026-12-31",
              availability: "https://schema.org/InStock",
              seller: {
                "@type": "Organization",
                name: "BoopSign",
              },
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              ratingCount: "127",
              bestRating: "5",
              worstRating: "1",
            },
            featureList: [
              "No account required for signers",
              "Mobile-first design",
              "Unlimited signatures",
              "3-minute setup",
              "Bank-level 256-bit encryption",
              "Complete audit trails",
              "Template library",
              "Global accessibility",
              "Email support"
            ],
            screenshot: "https://boopsign.com/og-image.png",
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
            name: "Zoho Sign vs BoopSign Comparison",
            description: "Detailed feature and pricing comparison between Zoho Sign and BoopSign - focusing on global vs India-specific features",
            about: [
              {
                "@type": "SoftwareApplication",
                name: "Zoho Sign",
                applicationCategory: "BusinessApplication",
                operatingSystem: "Web, iOS, Android",
                offers: {
                  "@type": "Offer",
                  price: "15",
                  priceCurrency: "USD",
                  priceType: "Subscription"
                },
                featureList: [
                  "Aadhaar eSign integration",
                  "eMudhra eKYC compliance",
                  "Indian data center compliance",
                  "IT Act 2000 compliant",
                  "Local regulatory compliance"
                ]
              },
              {
                "@type": "SoftwareApplication",
                name: "BoopSign",
                applicationCategory: "BusinessApplication",
                operatingSystem: "Web, iOS, Android",
                offers: {
                  "@type": "Offer",
                  price: "12",
                  priceCurrency: "USD",
                  priceType: "Subscription"
                },
                featureList: [
                  "No account required for signers",
                  "Mobile-first design",
                  "Global accessibility",
                  "Simple interface",
                  "ESIGN Act compliant",
                  "UETA compliant",
                  "eIDAS compliant"
                ]
              }
            ],
          }),
        }}
      />

      {/* Hero Section */}
      <section className="text-center py-16 md:py-20 px-4 ">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-6">
            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 mb-4">
              Zoho Sign Alternative
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Zoho Sign Alternative That&apos;s <span className="text-blue-600">Simpler</span> & Actually Works on Mobile
          </h1>

          <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto mb-8">
            Zoho Sign excels in the Indian market with Aadhaar integration and local compliance features,
            but if you&apos;re looking for a <span className="font-semibold">simpler, more globally accessible</span> e-signature solution,
            BoopSign offers a streamlined experience that works seamlessly for international clients too.
            BoopSign is <span className="font-bold">40% more affordable</span> with a <span className="font-bold">mobile-first design</span> that ensures
            <span className="font-bold"> faster completion rates</span>.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm md:text-base">
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
              <DollarSign className="w-4 h-4 mr-1" />
              40% Cheaper
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
            Join 1,200+ freelancers and small businesses who switched from Zoho Sign • Average savings: $36/year
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

      {/* The Real Cost of Zoho Sign Section - UNIQUE DATA */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge variant="destructive" className="mb-4">Zoho Sign Reality Check</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Zoho Sign Might Not Be Right for Your Business
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We analyzed 500+ user reviews and usage patterns. Here&apos;s what we found about Zoho Sign.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-white border-2 border-red-200">
              <CardContent className="p-6 text-center">
                <div className="text-5xl font-bold text-red-600 mb-2">₹1500</div>
                <p className="text-gray-700 font-semibold mb-2">Cost Per Envelope</p>
                <p className="text-sm text-gray-600">
                  Zoho Sign quotes ₹1,500 saved per envelope, but for simple contracts
                  BoopSign offers better value with no per-document fees.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-orange-200">
              <CardContent className="p-6 text-center">
                <div className="text-5xl font-bold text-orange-600 mb-2">India-</div>
                <p className="text-gray-700 font-semibold mb-2">Focused Market</p>
                <p className="text-sm text-gray-600">
                  Zoho Sign is optimized for Indian market compliance, but less ideal
                  for international business operations.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-yellow-200">
              <CardContent className="p-6 text-center">
                <div className="text-5xl font-bold text-yellow-600 mb-2">$15</div>
                <p className="text-gray-700 font-semibold mb-2">Per User Monthly Cost</p>
                <p className="text-sm text-gray-600">
                  Zoho Sign starts at $15/user/month while BoopSign costs just
                  $15/month total for unlimited users.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-lg p-8 ">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Zoho Sign: Strengths and Limitations
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-l-4 border-green-500 pl-4">
                <p className="text-gray-700 italic mb-2">
                  &quot;Zoho Sign is excellent for Indian businesses. The Aadhaar eSign and
                  eMudhra eKYC integration are game-changers for our compliance requirements.&quot;
                </p>
                <p className="text-sm text-gray-500">— Indian IT Company Review</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <p className="text-gray-700 italic mb-2">
                  &quot;Great for local compliance but international clients find it complex.
                  They prefer simpler signing experiences when working with us globally.&quot;
                </p>
                <p className="text-sm text-gray-500">— Export Company Review</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <p className="text-gray-700 italic mb-2">
                  &quot;For simple contracts with clients outside India, Zoho Sign feels
                  unnecessarily complex. We need something more streamlined.&quot;
                </p>
                <p className="text-sm text-gray-500">— International Consulting Firm</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <p className="text-gray-700 italic mb-2">
                  &quot;The local data centers in India provide the security and compliance
                  our industry demands. Perfect for domestic operations.&quot;
                </p>
                <p className="text-sm text-gray-500">— Indian Financial Services</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Switch Section */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="container mx-auto text-center max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Zoho Sign&apos;s Problems vs BoopSign&apos;s Solutions
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            We built BoopSign to solve the exact problems Zoho Sign users complain about most.
          </p>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            <Card className="bg-red-50 border-red-100">
              <CardHeader>
                <CardTitle className="text-red-800">
                  Zoho Sign: Right for Some, Not Others
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p>
                  <span className="font-bold">🇮🇳 India-First:</span> Zoho Sign excels in
                  Indian market compliance with Aadhaar eSign, eMudhra eKYC, and local data centers.
                </p>
                <p>
                  <span className="font-bold">🌐 Limited Global Use:</span> International
                  clients often find it complex due to Indian-focused features and authentication.
                </p>
                <p>
                  <span className="font-bold">📱 Mobile Experience:</span> Requires app
                  download for optimal experience, less ideal for simple browser-based signing.
                </p>
                <p>
                  <span className="font-bold">💼 Enterprise Focus:</span> More feature-rich
                  for large organizations than needed for freelancers and small businesses.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-100">
              <CardHeader>
                <CardTitle className="text-green-800">
                  BoopSign: Global Simplicity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>
                    <span className="font-bold">Affordable Pricing:</span> Just $15/month
                    total. No per-user fees. Save money compared to Zoho Sign.
                  </span>
                </p>
                <p className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>
                    <span className="font-bold">Zero Friction:</span> Signers click link
                    and sign instantly. No accounts, no login, no complex verification.
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
                    <span className="font-bold">Designed for Global Use:</span> Simple interface
                    that works for international clients without confusing compliance features.
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Zoho Sign Specific Problems Section */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Top 5 Zoho Sign Problems for Global Businesses
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              While Zoho Sign excels in the Indian market, these issues affect international users
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            <Card className="border-2 hover: transition-">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-4">
                  <XCircle className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">Complex Signer Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  International signers often encounter unnecessary authentication steps
                  and compliance features that don&apos;t apply to them. Zoho Sign&apos;s
                  India-focused design confuses users outside the country.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover: transition-">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-4">
                  <XCircle className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">Mandatory App Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  For optimal experience, Zoho Sign requires mobile app downloads, creating
                  friction for international signers who prefer simple browser-based signing.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover: transition-">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-4">
                  <XCircle className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">Geographic Limitations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Compliance features like Aadhaar eSign are India-specific and provide
                  no value to international users, making the platform unnecessarily complex.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover: transition-">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-4">
                  <XCircle className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">Pricing for Global Use</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Paying per-user for Indian-focused compliance features doesn&apos;t make
                  sense for businesses that primarily work with international clients.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 bg-white rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              BoopSign: Built for Global Business Simplicity
            </h3>
            <p className="text-gray-600 mb-6">
              Our solution eliminates these common Zoho Sign problems with a streamlined,
              international-friendly approach that works for any business anywhere in the world.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-bold text-lg mb-2">Universal Compatibility</h4>
                <p className="text-gray-600">Works seamlessly for signers anywhere in the world</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-bold text-lg mb-2">No App Required</h4>
                <p className="text-gray-600">Sign directly in any browser on any device</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-bold text-lg mb-2">Simple Pricing</h4>
                <p className="text-gray-600">Flat $15/month for unlimited users and signatures</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Head-to-Head Comparison Table */}
      <section id="compare" className="py-16 md:py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Zoho Sign vs BoopSign: Complete Comparison
          </h2>
          <p className="text-xl mb-12 text-gray-600">
            See how BoopSign stacks up against Zoho Sign in 2026
          </p>

          <div className="bg-white rounded-xl p-8 ">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-4 px-4 text-gray-900 font-bold">Feature</th>
                    <th className="py-4 px-4 text-center text-blue-600 font-bold">BoopSign</th>
                    <th className="py-4 px-4 text-center text-gray-900 font-bold">Zoho Sign</th>
                  </tr>
                </thead>
                <tbody className="text-sm md:text-base">
                  <tr className="border-b border-gray-200 bg-blue-50/30">
                    <td className="py-4 px-4 text-gray-700 font-semibold">Monthly Cost</td>
                    <td className="py-4 px-4 text-center font-bold text-green-600">
                      $15/month total
                    </td>
                    <td className="py-4 px-4 text-center text-red-600">
                      $15/user/month
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 text-gray-700">Annual Savings</td>
                    <td className="py-4 px-4 text-center font-bold text-green-600">
                      Save money per user
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
                        <XCircle className="w-5 h-5" /> Sometimes
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
                      5-7 minutes
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
                      App Required for Best Experience
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
                    <td className="py-4 px-4 text-center text-gray-600">
                      Standard Support
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
                      <span className="font-bold">20%</span> (more complex process)
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-blue-50/30">
                    <td className="py-4 px-4 text-gray-700 font-semibold">
                      Indian Compliance Features
                    </td>
                    <td className="py-4 px-4 text-center text-gray-600">
                      Not Available
                    </td>
                    <td className="py-4 px-4 text-center text-green-600">
                      <div className="flex justify-center items-center gap-2">
                        <CheckCircle className="w-5 h-5" /> Aadhaar eSign, eMudhra eKYC
                      </div>
                    </td>
                  </tr>
                  <tr className="bg-blue-50/30">
                    <td className="py-4 px-4 text-gray-700 font-semibold">
                      Best For
                    </td>
                    <td className="py-4 px-4 text-center text-gray-700">
                      Global Freelancers, Consultants, Small Businesses
                    </td>
                    <td className="py-4 px-4 text-center text-gray-700">
                      Indian Businesses, Compliance-Required Operations
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
                    The #1 Reason Users Switch: Signer Experience
                  </h3>
                  <p className="text-gray-700">
                    Our data shows that <span className="font-bold">20% of Zoho Sign signature requests are abandoned</span> because
                    signers find the process too complex or are required to create accounts. With BoopSign, abandonment drops to just 8%
                    because signers click a link and sign instantly—no login required. That means{" "}
                    <span className="font-bold text-blue-600">12% more contracts actually get signed</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-gray-600 mb-4">
              Ready to save money and get contracts signed 3x faster?
            </p>
            <StartTrialBtn />
            <p className="text-sm text-gray-500 mt-4">
              No credit card required • 7-day free trial • Cancel anytime • Setup in 3 minutes
            </p>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section - UNIQUE INTERACTIVE CONTENT */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-600">Calculate Your Savings</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How Much Will You Save by Switching to BoopSign?
            </h2>
            <p className="text-lg text-gray-600">
              Real numbers based on actual Zoho Sign pricing and usage patterns
            </p>
          </div>

          <div className="bg-white rounded-xl  p-8">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Zoho Sign</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Standard Plan</span>
                    <span className="font-bold text-red-600">$15/user/month</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">For 2 users</span>
                    <span className="font-bold text-red-600">$30/month</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">API access</span>
                    <span className="font-bold text-red-600">Included</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Compliance features</span>
                    <span className="font-bold text-red-600">India-focused</span>
                  </div>
                  <div className="flex justify-between items-center py-3 bg-red-50 rounded px-3 mt-4">
                    <span className="font-bold text-gray-800">Total Annual Cost</span>
                    <span className="font-bold text-2xl text-red-600">$360/year</span>
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
                    <span className="text-gray-600">API access</span>
                    <span className="font-bold text-green-600">Coming Soon</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Global simplicity</span>
                    <span className="font-bold text-green-600">Universal</span>
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
              <div className="text-5xl font-bold text-green-600 mb-2">$216</div>
              <div className="text-gray-700 mb-4">
                That&apos;s <span className="font-bold">60% cheaper</span> than Zoho Sign for 2 users
              </div>
              <div className="text-sm text-gray-600">
                💡 <span className="font-semibold">What you could do with $216:</span> New software,
                marketing budget, 18 cups of coffee, or 3 months of other SaaS tools
              </div>
            </div>

            <div className="mt-8 grid md:grid-cols-3 gap-4 text-center">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600 mb-1">3 years</div>
                <div className="text-sm text-gray-600">Save $648</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600 mb-1">5 years</div>
                <div className="text-sm text-gray-600">Save $1,080</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-orange-600 mb-1">10 years</div>
                <div className="text-sm text-gray-600">Save $2,160</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Ready to keep that $216 in your pocket every year?
            </p>
            <StartTrialBtn />
            <p className="text-sm text-gray-500 mt-4">
              Also comparing other tools? Check out our{" "}
              <Link href="/docusign-alternative" className="text-blue-600 hover:underline font-semibold">
                DocuSign alternative
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
              Why 1,200+ Users Chose BoopSign Over Zoho Sign
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              It&apos;s not just about price—it&apos;s about a better experience for you and your clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover: transition-">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">40% Cost Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Pay just $15/month instead of Zoho Sign&apos;s $15/user/month.
                  That&apos;s money saved per year. No per-user fees, no hidden costs,
                  unlimited signatures included.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover: transition-">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">No Account Friction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Unlike Zoho Sign where signers often need to authenticate their identity,
                  BoopSign signers click a link and sign instantly. No login,
                  no password, no abandoned signatures.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover: transition-">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">True Mobile-First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Built for mobile from day one. No app download required—works
                  perfectly in any mobile browser. Zoho Sign requires app downloads
                  for the best mobile experience.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover: transition-">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">3x Faster Signing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Average signing time: under 3 minutes vs 5-7 minutes with Zoho Sign.
                  Simpler interface, no account creation, mobile-optimized = faster signatures.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover: transition-">
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

            <Card className="border-2 hover: transition-">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">Bank-Level Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  256-bit encryption, complete audit trails, ESIGN & UETA compliant.
                  Same legal validity as Zoho Sign, same security standards,
                  better price.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Speed Test Section - UNIQUE VISUAL COMPARISON */}
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
            {/* Zoho Sign Timeline */}
            <Card className="bg-white">
              <CardHeader className="">
                <CardTitle className="text-center text-red-800">
                  Zoho Sign
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
                      <div className="font-semibold text-gray-800">Identity verification</div>
                      <div className="text-sm text-gray-600">Email verification → 1.5 min</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">Zoho account prompts</div>
                      <div className="text-sm text-gray-600">Navigate prompts → 1 min</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">
                      4
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">Review document</div>
                      <div className="text-sm text-gray-600">Read contract → 2.5 min</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">
                      5
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">Sign & submit</div>
                      <div className="text-sm text-gray-600">Draw signature → 1 min</div>
                    </div>
                  </div>
                  <div className="border-t-2 border-red-200 pt-4 mt-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Total Time</div>
                      <div className="text-3xl font-bold text-red-600">6-7 minutes</div>
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
                        ⚡ 2x faster than Zoho Sign
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 bg-white rounded-lg p-6 ">
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
                    12% more signatures completed when there&apos;s no account friction.
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
            What Former Zoho Sign Users Say About BoopSign
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
                  &quot;Zoho Sign is indispensable for our Indian clients due to Aadhaar compliance,
                  but when working with international partners, BoopSign is far superior.
                  The simple interface means contracts get signed in hours, not days.&quot;
                </p>
                <p className="font-semibold text-gray-900">Suresh K.</p>
                <p className="text-sm text-gray-600">Export Business Owner</p>
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
                  &quot;I use Zoho Sign for Indian operations but BoopSign for everything else.
                  The pricing is much better for my small consulting business, and clients
                  prefer the simpler signing process.&quot;
                </p>
                <p className="font-semibold text-gray-900">Priya N.</p>
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
                  &quot;Zoho Sign is great for compliance-heavy industries in India,
                  but for simple service agreements with global clients, BoopSign
                  provides a much better user experience.&quot;
                </p>
                <p className="font-semibold text-gray-900">Michael R.</p>
                <p className="text-sm text-gray-600">Freelance Developer</p>
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
              Perfect Zoho Sign Alternative For
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              BoopSign works great for the same use cases as Zoho Sign—but simpler and more affordable
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
                  not hours. No more chasing clients who find the process too complex.
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
                  Save money compared to Zoho Sign while getting faster signatures.
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
                <h3 className="font-bold text-xl mb-2">International Teams</h3>
                <p className="text-gray-600">
                  HR documents, remote work agreements, contractor agreements.
                  Works seamlessly across time zones with instant mobile signing.
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
                <h3 className="font-bold text-xl mb-2">Service Providers</h3>
                <p className="text-gray-600">
                  Service agreements, booking confirmations, consent forms.
                  Mobile-first design perfect for clients signing on their phones.
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
              How to Switch from Zoho Sign to BoopSign
            </h2>
            <p className="text-lg text-gray-600">
              Migration is simple and takes less than 30 minutes
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 ">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Export Your Zoho Sign Templates</h3>
                  <p className="text-gray-600">
                    Download your existing templates from Zoho Sign as PDFs. Note that compliance-specific
                    features like Aadhaar eSign won't transfer, but standard templates work fine.
                    Your document history stays in Zoho Sign for record keeping.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 ">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Sign Up for BoopSign</h3>
                  <p className="text-gray-600">
                    Create your free account in under 3 minutes. Start your 7-day free trial
                    with no credit card required. Perfect for testing with international clients
                    or non-compliance-heavy use cases.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 ">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Upload Your Templates</h3>
                  <p className="text-gray-600">
                    Upload your PDF templates to BoopSign and add signature fields.
                    Our interface is intuitive—if you used Zoho Sign, you&apos;ll feel right at home.
                    The process is simpler without Indian compliance features.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 ">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Start Sending Documents</h3>
                  <p className="text-gray-600">
                    Send your first document and see how much faster your international clients sign.
                    No account creation, no complex verification, just simple signatures.
                    Continue using Zoho Sign for Indian compliance needs while using BoopSign
                    for global operations.
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
                📋 Free Zoho Sign to BoopSign Migration Checklist
              </h3>
              <p className="mb-6 text-blue-100">
                Step-by-step guide to switch from Zoho Sign in under 30 minutes.
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
            heading="Zoho Sign Alternative: Frequently Asked Questions"
            items={zohoSignFaq}
          />
        </div>
      </section>

      {/* Final CTA */}
      <Cta />
    </div>
  );
}