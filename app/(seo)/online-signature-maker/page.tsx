import type { Metadata } from "next";
import OnlineSignatureCreator from "@/components/OnlineSignatureCreator";
import Faq from "@/components/faq";

export const metadata: Metadata = {
  title:
    "Free Online Signature Maker | Create Electronic Signatures - BoopSign",
  description:
    "Create professional electronic signatures online for free in seconds. No registration required. Works on mobile and desktop. Download as transparent PNG instantly. Try our signature generator now!",
  keywords: [
    "online signature maker",
    "electronic signature generator",
    "free signature tool",
    "create electronic signature",
    "digital signature maker",
    "signature creator free",
    "online signature generator",
    "electronic signature free",
    "make signature online",
    "signature maker tool",
  ],
  openGraph: {
    title: "Free Online Signature Maker - Create Electronic Signatures",
    description:
      "Create professional electronic signatures for free in seconds. No registration required. Works perfectly on mobile and desktop.",
    url: "https://boopsign.com/online-signature-maker",
    type: "website",
    images: [
      {
        url: "https://boopsign.com/og-signature-maker.jpg",
        width: 1200,
        height: 630,
        alt: "Free Online Signature Maker Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Signature Maker | BoopSign",
    description:
      "Create professional electronic signatures for free. No registration required.",
    images: ["https://boopsign.com/og-signature-maker.jpg"],
  },
  alternates: {
    canonical: "https://boopsign.com/online-signature-maker",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const signatureMakerFaq = [
  {
    id: "faq-1",
    question: "Are signatures created with this free tool legally binding?",
    answer:
      "Signatures created with our free online signature maker are great for personal documents and basic business uses. However, for legally binding contracts and documents requiring comprehensive audit trails, we recommend using BoopSign's full electronic signature platform, which provides advanced security features and legal compliance.",
  },
  {
    id: "faq-2",
    question: "Do you save or store the signatures I create?",
    answer:
      "Absolutely not. Your privacy is our top priority. We do not save, store, or have access to any signatures created with this free tool. Everything happens in your browser locally, and only you have access to download your signature.",
  },
  {
    id: "faq-3",
    question: "How can I use the signature I download?",
    answer:
      "You can download your signature as a high-quality, transparent PNG file. This makes it easy to add to documents in Microsoft Word, Google Docs, Adobe Acrobat, or any image editing software. The transparent background ensures it looks professional on any document.",
  },
  {
    id: "faq-4",
    question: "Is this online signature maker really completely free?",
    answer:
      "Yes, 100% free with no hidden costs, registration requirements, or limits on downloads. We offer this signature creator tool as a way to introduce you to the convenience of electronic signatures. For full document signing workflows, check out BoopSign.",
  },
  {
    id: "faq-5",
    question: "Can I create multiple signature styles?",
    answer:
      "Yes! You can draw different signature styles with your mouse or finger, or type your name and choose from various handwriting-style fonts. Create as many versions as you want until you find the perfect signature style.",
  },
  {
    id: "faq-6",
    question: "Does this work on mobile devices?",
    answer:
      "Absolutely! Our signature maker is fully optimized for mobile devices. You can easily draw your signature on your phone or tablet using your finger, just like signing on paper.",
  },
];

export default function OnlineSignatureMakerPage() {
  return (
    <main className="bg-gray-50">
      {/* Schema Markup for Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Free Online Signature Maker",
            description:
              "Create professional electronic signatures online for free. No registration required.",
            url: "https://boopsign.com/online-signature-maker",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web Browser",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            provider: {
              "@type": "Organization",
              name: "BoopSign",
              url: "https://boopsign.com",
            },
          }),
        }}
      />

      {/* Hero/Tool Section */}
      <section className="text-center py-16 md:py-20 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Free Online Signature Maker
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6">
          Create your perfect electronic signature in seconds. Draw it with your
          mouse or finger, or type it and choose from professional fonts.{" "}
          <strong>No registration required.</strong>
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-10 text-sm">
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
            ✓ 100% Free
          </span>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            ✓ Works on Mobile
          </span>
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
            ✓ Instant Download
          </span>
          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
            ✓ No Registration
          </span>
        </div>
        <OnlineSignatureCreator />
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="container mx-auto text-center max-w-6xl">
          <h2 className="text-3xl font-bold mb-4">
            Why Choose Our Online Signature Maker?
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            Join thousands of professionals who trust our free signature
            generator for creating beautiful, professional electronic
            signatures.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
              <p className="text-gray-600">
                Create and download your signature in under 30 seconds. No
                complex forms or lengthy registration processes.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-3">Mobile Optimized</h3>
              <p className="text-gray-600">
                Works perfectly on phones and tablets. Sign with your finger
                just like you would on paper.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-3">Privacy First</h3>
              <p className="text-gray-600">
                We never save or store your signature. Everything happens
                locally in your browser for maximum privacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 md:py-20 px-4 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Create Your Electronic Signature in 3 Simple Steps
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Our signature maker is designed to be intuitive and fast. Get your
            professional signature ready in minutes.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="text-5xl font-bold text-blue-600 opacity-80 mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Create Your Signature
              </h3>
              <p className="text-gray-600">
                Draw your signature with your mouse, trackpad, or finger on
                mobile. Or simply type your name for a clean, professional look.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="text-5xl font-bold text-blue-600 opacity-80 mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Choose Your Style</h3>
              <p className="text-gray-600">
                Select from various handwriting-style fonts if typing, or adjust
                the thickness and smoothness of your drawn signature.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="text-5xl font-bold text-blue-600 opacity-80 mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Download Instantly</h3>
              <p className="text-gray-600">
                Get your signature as a high-quality, transparent PNG file.
                Perfect for adding to any document or PDF.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl font-bold mb-4">
            Perfect for These Documents
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Use your electronic signature on various documents for personal and
            business purposes.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">📄</div>
              <h4 className="font-semibold mb-2">PDFs</h4>
              <p className="text-sm text-gray-600">Add to any PDF document</p>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-3">📧</div>
              <h4 className="font-semibold mb-2">Emails</h4>
              <p className="text-sm text-gray-600">
                Professional email signatures
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">📝</div>
              <h4 className="font-semibold mb-2">Letters</h4>
              <p className="text-sm text-gray-600">Personal correspondence</p>
            </div>
            <div className="text-center">
            <div className="text-3xl mb-3">💼</div>
            <h4 className="font-semibold mb-2">Forms</h4>
            <p className="text-sm text-gray-600">Applications and forms</p>
          </div>
          </div>

          
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-16 md:py-20 px-4 bg-gray-50">
        <Faq
          heading="Frequently Asked Questions About Our Signature Maker"
          items={signatureMakerFaq}
        />
      </section>

      {/* Upgrade CTA Section */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need to Send Documents for Signing?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            While our free signature maker is perfect for creating signatures,
            BoopSign makes it easy to send documents for signature - 3x faster
            than DocuSign.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8 text-left">
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">📱 Mobile-First</h3>
              <p className="text-sm opacity-90">
                Signers can sign on any device without downloads
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">⚡ 3-Minute Signing</h3>
              <p className="text-sm opacity-90">
                Average signing time vs 7-9 minutes with DocuSign
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">💰 $12/Month</h3>
              <p className="text-sm opacity-90">
                50% cheaper than DocuSign Standard plan
              </p>
            </div>
          </div>

          <a
            href="/signup"
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Start 7-Day Free Trial
          </a>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-12 px-4 bg-white text-center">
        <div className="container mx-auto">
          <p className="text-gray-600 mb-4">
            Trusted by professionals worldwide
          </p>
          <div className="flex justify-center items-center gap-8 text-sm text-gray-500">
            <span>✓ 500,000+ signatures created</span>
            <span>✓ 100% free forever</span>
            <span>✓ No registration required</span>
          </div>
        </div>
      </section>
    </main>
  );
}
