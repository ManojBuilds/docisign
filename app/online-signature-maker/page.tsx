import { ClientHeaderWrapper } from "@/components/ClientHeaderWrapper";
import Footer from "@/components/Footer";
import OnlineSignatureCreator from "@/components/OnlineSignatureCreator";
import Cta from "@/components/cta";
import Faq from "@/components/faq";
import TestimonialsSection from "@/components/testimonials";
import { ArrowRight, Check, FileText, Shield, Smartphone, Zap } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Online Signature Maker & Generator (Type or Draw) | Boopsign",
  description:
    "Create your free online signature in seconds. Draw or type a signature to download as a transparent PNG. 100% free, no registration required. Perfect for Word, PDF, and Google Docs.",
  keywords: [
    "online signature maker",
    "signature generator",
    "draw signature online",
    "type signature online",
    "free electronic signature",
    "digital signature creator",
    "esignature maker",
    "create signature for word",
    "signature for pdf",
    "transparent signature png",
  ],
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
      "Signatures created with our free online signature maker are suitable for personal documents and basic business uses. For legally binding contracts requiring a full audit trail (IP address, timestamp, etc.), we recommend using the Boopsign platform.",
  },
  {
    id: "faq-2",
    question: "Do you save or store the signatures I create?",
    answer:
      "Absolutely not. Everything happens locally in your browser. We never see, store, or have access to the signatures you create with this tool.",
  },
  {
    id: "faq-3",
    question: "How can I use the signature I download?",
    answer:
      "You get a high-quality, transparent PNG file. You can easily drag and drop this into Word, Google Docs, PDFs, or email signatures.",
  },
  {
    id: "faq-4",
    question: "Is this really 100% free?",
    answer:
      "Yes. No catch. We provide this tool to help you experience how easy digital signing can be. If you need to send docs to others, you can try our main app.",
  },
  {
    id: "faq-5",
    question: "What is the difference between an e-signature and a digital signature?",
    answer:
      "Electronic signatures (e-signatures) are a broad category of names, images, or symbols used to sign documents. Digital signatures are a specific, more secure subset of e-signatures that use encryption to provide proof of identity and document integrity.",
  },
  {
    id: "faq-6",
    question: "How do I add my signature to a PDF or Word document?",
    answer:
      "Once you download your transparent PNG signature, simply open your document in Word or a PDF editor, choose 'Insert Image', and select your signature file. You can then resize and position it wherever needed.",
  },
];

export default function OnlineSignatureMakerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ClientHeaderWrapper />
      <main className="flex-grow">
        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebApplication",
                name: "Free Online Signature Maker",
                image: "https://boopsign.com/images/og-signature-maker.jpg",
                description: "Create professional electronic signatures online for free.",
                url: "https://boopsign.com/online-signature-maker",
                applicationCategory: "BusinessApplication",
                brand: {
                  "@type": "Brand",
                  name: "Boopsign"
                },
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                  availability: "https://schema.org/InStock",
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: signatureMakerFaq.map(faq => ({
                  "@type": "Question",
                  name: faq.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answer
                  }
                }))
              },
              {
                "@context": "https://schema.org",
                "@type": "HowTo",
                name: "How to Create an Online Signature",
                step: [
                  {
                    "@type": "HowToStep",
                    text: "Draw or type your name in the signature generator tool."
                  },
                  {
                    "@type": "HowToStep",
                    text: "Customize the style, color, and thickness of your signature."
                  },
                  {
                    "@type": "HowToStep",
                    text: "Click 'Download' to save your signature as a transparent PNG."
                  }
                ]
              }
            ]),
          }}
        />

        {/* Hero Section with Gradient */}
        <section className="relative pt-20 pb-24 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(50%_50%_at_50%_0%,rgba(59,130,246,0.08)_0%,rgba(255,255,255,0)_100%)]" />

          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              100% Free Online Signature Maker & Generator
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
              Online <span className="text-blue-600">Signature Maker</span> (Draw or Type)
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Create a professional electronic signature in seconds. Draw it, type it, and download a transparent PNG instantly.
            </p>

            <div className="flex flex-col items-center gap-12">
              <OnlineSignatureCreator />

              {/* Secondary Magnet */}
              <div className="w-full max-w-2xl p-8 rounded-3xl bg-slate-900 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <FileText className="size-32" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-semibold mb-4 text-white">Already have a document to sign?</h3>
                  <p className="text-slate-400 mb-6">Stop dragging and dropping PNGs. Upload your PDF to Boopsign and sign it 100% legally in 60 seconds.</p>
                  <Link href="/dashboard" className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all gap-2">
                    Sign a PDF Now (Free) <Zap className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Platforms Section - SEO Boost */}
        <section className="py-16 bg-slate-50 border-y border-slate-100">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-slate-800">
              Use your online signature on any platform
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[
                { name: "Microsoft Word", icon: "DOCX" },
                { name: "Adobe PDF", icon: "PDF" },
                { name: "Google Docs", icon: "DOCS" },
                { name: "Gmail", icon: "MAIL" },
                { name: "Outlook", icon: "OUTLOOK" },
                { name: "Google Sheets", icon: "SHEETS" },
              ].map((platform) => (
                <div key={platform.name} className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <div className="size-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 font-bold text-xs mb-3">
                    {platform.icon}
                  </div>
                  <span className="text-sm font-medium text-slate-600">{platform.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="py-8 border-y border-slate-100 bg-slate-50/50">
          <div className="container mx-auto px-4 flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
              <Shield className="w-4 h-4 text-blue-500" /> Secure & Private
            </div>
            <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
              <Zap className="w-4 h-4 text-yellow-500" /> Instant Download
            </div>
            <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
              <Check className="w-4 h-4 text-green-500" /> Transparent PNG
            </div>
            <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
              <Smartphone className="w-4 h-4 text-purple-500" /> Mobile Ready
            </div>
          </div>
        </section>

        {/* Comparison Table Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-semibold mb-6 text-slate-900">Sign Like a Pro</h2>
              <p className="text-slate-600 text-lg">When you&apos;re ready for real business, upgrade to the full Boopsign experience.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Free Tool */}
              <div className="p-10 rounded-[2.5rem] border border-slate-100 bg-slate-50/50 relative group hover:border-slate-200 transition-colors">
                <h3 className="text-2xl font-semibold mb-4 text-slate-800">Free Creator Tool</h3>
                <p className="text-slate-500 mb-8 text-sm md:text-base leading-relaxed">Perfect for personal use, Word docs, and casual signing tasks.</p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3 text-slate-700">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" /> <span>Draw or Type Signatures</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" /> <span>Transparent PNG Download</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" /> <span>Works on all devices</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-300 line-through decoration-slate-200">
                    <span className="w-5 h-5 border border-slate-200 rounded-full flex items-center justify-center text-[8px] mt-0.5">X</span>
                    <span>No Legal Audit Trail</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-300 line-through decoration-slate-200">
                    <span className="w-5 h-5 border border-slate-200 rounded-full flex items-center justify-center text-[8px] mt-0.5">X</span>
                    <span>Cannot request signatures</span>
                  </li>
                </ul>
              </div>

              {/* Boopsign App */}
              <div className="p-10 rounded-[2.5rem] bg-sky-500 text-white relative overflow-hidden shadow-2xl shadow-blue-200/20 group hover:-translate-y-1 transition-all duration-300">
                <div className="absolute top-0 right-0 bg-white/20 text-white px-5 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-bl-2xl">SOLO PRO</div>
                <h3 className="text-2xl text-white font-semibold mb-4 text-white">Boopsign Full App</h3>
                <p className="text-blue-50 mb-8 text-sm md:text-base leading-relaxed">For freelancers who need legally binding contracts and zero friction.</p>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-start gap-3 text-blue-50 font-semibold">
                    <Check className="w-5 h-5 text-white mt-0.5" /> <span>Legally Binding (ESIGN & UETA)</span>
                  </li>
                  <li className="flex items-start gap-3 text-blue-50 font-semibold">
                    <Check className="w-5 h-5 text-white mt-0.5" /> <span>No Account Required for Clients</span>
                  </li>
                  <li className="flex items-start gap-3 text-blue-50">
                    <Check className="w-5 h-5 text-white mt-0.5" /> <span>Full Audit Trail (IP, Timestamp)</span>
                  </li>
                  <li className="flex items-start gap-3 text-blue-50">
                    <Check className="w-5 h-5 text-white mt-0.5" /> <span>Unlimited Document Sending</span>
                  </li>
                  <li className="flex items-start gap-3 text-blue-50">
                    <Check className="w-5 h-5 text-white mt-0.5" /> <span>Mobile-First Secure Link</span>
                  </li>
                </ul>
                <Link href="/dashboard" className="flex items-center justify-center w-full bg-white text-sky-600 py-5 rounded-2xl font-semibold hover:bg-blue-50 transition-all gap-2 group shadow-xl">
                  Sign a Real Document Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Benefits Section - SEO & Conversion */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                  Why choose an <span className="text-blue-600">electronic signature</span>?
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      title: "Eco-Friendly & Paperless",
                      description: "Stop printing, scanning, and mailing. Digital signatures help reduce your carbon footprint while saving on paper and ink costs."
                    },
                    {
                      title: "Legally Binding in 180+ Countries",
                      description: "Electronic signatures carry the same legal weight as traditional pen-and-ink signatures in most jurisdictions, including the US and EU."
                    },
                    {
                      title: "Faster Turnaround Times",
                      description: "Documents that used to take days to sign can now be completed in minutes. No more waiting for couriers or physical mail."
                    },
                    {
                      title: "Encrypted & Secure",
                      description: "Unlike paper signatures which can be forged or tampered with, digital signatures offer high security and document integrity."
                    }
                  ].map((benefit, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="size-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-1">
                        <Check className="size-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 mb-1">{benefit.title}</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2 relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-[3rem] blur-2xl opacity-50" />
                <div className="relative bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 md:p-12 shadow-xl">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Signature Types Explained</h3>
                  <div className="space-y-8">
                    <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-50">
                      <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold mb-3 uppercase tracking-wider">Type to Sign</span>
                      <p className="text-sm text-slate-600">Enter your name and choose from professional handwriting styles. Best for speed and professional appearance.</p>
                    </div>
                    <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-50">
                      <span className="inline-block px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-bold mb-3 uppercase tracking-wider">Draw to Sign</span>
                      <p className="text-sm text-slate-600">Use your mouse or touchscreen to draw your unique signature. Best for a personal touch and authenticity.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works - Modernized */}
        <section className="py-24 bg-slate-50/50">
          <div className="container mx-auto px-4 text-center max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-semibold mb-16 text-slate-900">How to use your signature</h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-xl font-semibold text-blue-600">1</div>
                <h3 className="font-semibold mb-3 text-lg">Create</h3>
                <p className="text-slate-500 leading-relaxed text-sm">Draw or type your name above to generate your custom PNG signature.</p>
              </div>
              <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-xl font-semibold text-blue-600">2</div>
                <h3 className="font-semibold mb-3 text-lg">Download</h3>
                <p className="text-slate-500 leading-relaxed text-sm">Save your signature as a transparent PNG. No background, high res.</p>
              </div>
              <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-xl font-semibold text-blue-600">3</div>
                <h3 className="font-semibold mb-3 text-lg">Sign</h3>
                <p className="text-slate-500 leading-relaxed text-sm">Drag your signature onto any contract. Or better yet, upload your PDF to Boopsign.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <Faq
          heading="Signature Maker FAQ"
          items={signatureMakerFaq}
          className="py-24 bg-white"
        />

        {/* Final CTA */}
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
