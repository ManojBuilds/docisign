import Cta from "@/components/cta";
import Faq from "@/components/faq";
import { CheckCircle, XCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Mobile Electronic Signature App | Sign Documents on Phone &amp; Tablet - BoopSign",
  description:
    "The best mobile electronic signature solution. Sign documents instantly on your phone or tablet - no app downloads required. 3x faster than DocuSign's mobile experience.",
  keywords: [
    "mobile electronic signature",
    "electronic signature mobile app",
    "sign documents on phone",
    "mobile esignature solution",
    "electronic signature tablet",
    "mobile first esignature",
    "sign documents mobile device",
    "mobile signature app",
    "electronic signature smartphone",
    "mobile document signing",
  ],
  alternates: {
    canonical: "https://boopsign.com/mobile-electronic-signature",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const mobileSignatureFaq = [
  {
    id: "faq-1",
    question: "Do clients need to download an app to sign?",
    answer:
      "No! One of BoopSign's biggest advantages is that signers can sign documents directly in their mobile browser. They simply click the signing link and sign immediately - no app downloads, no account creation, no friction.",
  },
  {
    id: "faq-2",
    question: "Is signing with a finger or phone legally binding?",
    answer:
      "Yes, electronic signatures created on mobile devices are legally binding under the ESIGN Act and UETA in the United States, and similar laws globally. BoopSign provides complete audit trails to ensure legal compliance.",
  },
  {
    id: "faq-3",
    question: "How is this different from other electronic signature apps?",
    answer:
      "Unlike DocuSign and other platforms that were built for desktop and adapted for mobile, BoopSign was designed mobile-first from the ground up. This means better touch interfaces, faster loading times, and no frustrating pinch-to-zoom experiences.",
  },
  {
    id: "faq-4",
    question: "What devices do we support?",
    answer:
      "BoopSign works on all smartphones and tablets - iPhone, iPad, Android phones, Android tablets, and even older devices. If it has a web browser, it can sign documents with BoopSign.",
  },
  {
    id: "faq-5",
    question: "Can I prepare documents on mobile too?",
    answer:
      "Absolutely! Our mobile document editor makes it easy to add signature fields, text fields, and other elements directly from your phone or tablet. You can manage your entire signing workflow on mobile.",
  },
  {
    id: "faq-6",
    question: "How fast is mobile signing with BoopSign?",
    answer:
      "Most signers complete documents in under 3 minutes on mobile. Compare this to DocuSign where users report mobile signing taking 7-9 minutes due to app downloads, account creation, and clunky mobile interfaces.",
  },
];

export default function MobileElectronicSignaturePage() {
  return (
    <main className="bg-gray-50">
      {/* Schema Markup for Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "BoopSign Mobile Electronic Signature",
            description:
              "Mobile-first electronic signature platform for signing documents on phones and tablets",
            url: "https://boopsign.com/mobile-electronic-signature",
            applicationCategory: "BusinessApplication",
            operatingSystem: ["iOS", "Android", "Web Browser"],
            offers: {
              "@type": "Offer",
              price: "12",
              priceCurrency: "USD",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: "12.00",
                priceCurrency: "USD",
                unitText: "MONTH",
              },
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              ratingCount: "2847",
            },
            provider: {
              "@type": "Organization",
              name: "BoopSign",
              url: "https://boopsign.com",
            },
          }),
        }}
      />

      {/* Hero Section */}
      <section className="text-center py-16 md:py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Mobile Electronic Signature
            <span className="block text-blue-600">Built for Your Phone</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto mb-8">
            The only electronic signature platform designed mobile-first. Sign
            documents in 3 minutes on any phone or tablet - no app downloads, no
            account creation, no frustration.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm md:text-base">
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
              ✓ No App Downloads
            </span>
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
              ✓ 3-Minute Signing
            </span>
            <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-semibold">
              ✓ Works on Any Device
            </span>
            <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-semibold">
              ✓ No Account Required
            </span>
          </div>

          <button className="bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg">
            Try Mobile Signing Now
          </button>

          <div className="mt-8 text-sm text-gray-600">
            Join 2,847+ businesses who&apos;ve ditched DocuSign for better
            mobile signing
          </div>
        </div>
      </section>

      {/* Market Statistics */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="container mx-auto text-center max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Mobile Signature Revolution is Here
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            The electronic signature market is experiencing explosive mobile
            growth, but most platforms still treat mobile as an afterthought.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl">
              <div className="text-4xl font-bold text-blue-600 mb-2">26.3%</div>
              <p className="text-gray-700 font-semibold">
                Annual growth rate for mobile e-signature solutions
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Market expected to reach $13.4B by 2030
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl">
              <div className="text-4xl font-bold text-green-600 mb-2">70%</div>
              <p className="text-gray-700 font-semibold">
                Of business documents are now signed on mobile
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Yet most platforms weren&apos;t built for mobile
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl">
              <div className="text-4xl font-bold text-purple-600 mb-2">3x</div>
              <p className="text-gray-700 font-semibold">
                Faster signing with mobile-first platforms
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Compared to desktop-adapted solutions
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <p className="text-yellow-800 font-semibold mb-2">
              💡 The Problem:
            </p>
            <p className="text-yellow-700">
              DocuSign and other legacy platforms were built in 2003 for desktop
              computers. They&apos;ve been playing catch-up on mobile ever
              since, resulting in clunky experiences that frustrate signers.
            </p>
          </div>
        </div>
      </section>

      {/* Mobile-First Features */}
      <section className="py-16 md:py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Designed for Your Phone, Not Just Adapted for It
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Every pixel of BoopSign was designed with mobile in mind.
              Here&apos;s what makes us different:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="text-5xl mb-6">📱</div>
              <h3 className="text-xl font-bold mb-4">Perfect Mobile UX</h3>
              <p className="text-gray-600 mb-6">
                Documents are perfectly formatted for mobile screens, with
                large, easy-to-tap signature fields. No more pinching and
                zooming.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700">
                <strong>DocuSign:</strong> Desktop forms shrunk to mobile
                <br />
                <strong>BoopSign:</strong> Native mobile experience
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="text-5xl mb-6">👆</div>
              <h3 className="text-xl font-bold mb-4">Sign with a Finger</h3>
              <p className="text-gray-600 mb-6">
                Users can easily draw their real signature with their finger,
                just like signing with a pen. Natural and intuitive.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700">
                <strong>Average time:</strong> 30 seconds
                <br />
                <strong>User feedback:</strong> &ldquo;Just like signing on
                paper&rdquo;
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="text-5xl mb-6">✉️</div>
              <h3 className="text-xl font-bold mb-4">No App Required</h3>
              <p className="text-gray-600 mb-6">
                Works instantly in any mobile browser, so clients don&apos;t
                need to download another app. One less barrier to getting
                signatures.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700">
                <strong>Completion rate:</strong> 94% vs 67% with app-required
                platforms
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="container mx-auto text-center max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            2,847 businesses have ditched DocuSign for BoopSign
          </h2>
          <div className="flex justify-center mb-8">
            <div className="flex text-yellow-400 text-2xl">
              ★★★★★ <span className="text-gray-600 ml-2">4.9/5</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="text-yellow-400 text-lg mb-3">★★★★★</div>
              <p className="text-gray-700 mb-4 italic">
                &ldquo;Finally, an e-signature tool that works on mobile!&rdquo;
              </p>
              <p className="text-sm text-gray-600">
                <strong>Sarah K.</strong>
                <br />
                Real Estate Agent
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="text-yellow-400 text-lg mb-3">★★★★★</div>
              <p className="text-gray-700 mb-4 italic">
                &ldquo;Real estate contracts that used to take 3 days now close
                in 3 hours&rdquo;
              </p>
              <p className="text-sm text-gray-600">
                <strong>Mike T.</strong>
                <br />
                Contractor
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="text-yellow-400 text-lg mb-3">★★★★★</div>
              <p className="text-gray-700 mb-4 italic">
                &ldquo;My 65-year-old clients can actually sign documents on
                their phone now&rdquo;
              </p>
              <p className="text-sm text-gray-600">
                <strong>Lisa M.</strong>
                <br />
                Consultant
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DocuSign vs BoopSign Mobile Comparison */}
      <section
        id="compare"
        className="py-16 md:py-20 px-4 bg-white text-gray-800"
      >
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Mobile Experience: DocuSign vs BoopSign
          </h2>
          <p className="text-xl mb-12 opacity-90">
            See why businesses switch to BoopSign for better mobile signing
          </p>

          <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-4 px-4 text-gray-900">Feature</th>
                    <th className="py-4 px-4 text-center text-gray-900">
                      BoopSign
                    </th>
                    <th className="py-4 px-4 text-center text-gray-900">
                      DocuSign
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm md:text-base">
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 text-gray-700">
                      App Download Required
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
                      Mobile Signing Time
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
                      Account Creation
                    </td>
                    <td className="py-4 px-4 text-center text-green-600">
                      <div className="flex justify-center items-center gap-2">
                        <CheckCircle /> No
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center text-red-600">
                      <div className="flex justify-center items-center gap-2">
                        <XCircle /> Required
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 text-gray-700">
                      Mobile-First Design
                    </td>
                    <td className="py-4 px-4 text-center text-green-600">
                      <div className="flex justify-center items-center gap-2">
                        <CheckCircle /> Yes
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center text-red-600">
                      <div className="flex justify-center items-center gap-2">
                        <XCircle /> Adapted
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-700">Cost per Month</td>
                    <td className="py-4 px-4 text-center font-bold text-green-600">
                      $15
                    </td>
                    <td className="py-4 px-4 text-center text-red-600">$25+</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <Faq heading="Mobile Signing Questions" items={mobileSignatureFaq} />
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="container mx-auto text-center max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Perfect for Mobile-Heavy Industries
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            These industries see the biggest benefits from mobile-first
            electronic signatures:
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-gray-50 rounded-xl text-center">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="font-semibold mb-2">Real Estate</h3>
              <p className="text-sm text-gray-600">
                Sign contracts on-site, at showings, anywhere deals happen
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl text-center">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="font-semibold mb-2">Field Services</h3>
              <p className="text-sm text-gray-600">
                Get work orders signed immediately after job completion
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl text-center">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="font-semibold mb-2">Sales Teams</h3>
              <p className="text-sm text-gray-600">
                Close deals faster with instant mobile contract signing
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl text-center">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="font-semibold mb-2">Healthcare</h3>
              <p className="text-sm text-gray-600">
                Patient forms and consents signed on tablets instantly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <Cta />
    </main>
  );
}
