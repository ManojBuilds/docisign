import OnlineSignatureCreator from "@/components/OnlineSignatureCreator";
import Faq from "@/components/faq";
import TestimonialsSection from "@/components/testimonials";
import { ArrowRight, Check, Shield, Smartphone, Zap } from "lucide-react";
import type { Metadata } from "next";

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
      "Signatures created with our free online signature maker are great for personal documents and basic business uses. For legally binding contracts requiring a full audit trail (IP address, timestamp, etc.), we recommend using the BoopSign platform.",
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
];

export default function OnlineSignatureMakerPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Free Online Signature Maker",
            description: "Create professional electronic signatures online for free.",
            url: "https://boopsign.com/online-signature-maker",
            applicationCategory: "BusinessApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
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
            100% Free & No Registration Required
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
            Free Online <span className="text-blue-600">Signature Maker</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Create a professional electronic signature in seconds. Draw it, type it, and download a transparent PNG instantly.
          </p>

          <OnlineSignatureCreator />
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-8 border-y border-slate-100 bg-slate-50/50">
        <div className="container mx-auto px-4 flex flex-wrap justify-center items-center gap-8 md:gap-16">
          <div className="flex items-center gap-2 text-slate-500 font-medium">
            <Shield className="w-5 h-5 text-blue-500" /> Secure & Private
          </div>
          <div className="flex items-center gap-2 text-slate-500 font-medium">
            <Zap className="w-5 h-5 text-yellow-500" /> Instant Download
          </div>
          <div className="flex items-center gap-2 text-slate-500 font-medium">
            <Check className="w-5 h-5 text-green-500" /> Transparent PNG
          </div>
          <div className="flex items-center gap-2 text-slate-500 font-medium">
            <Smartphone className="w-5 h-5 text-purple-500" /> Mobile Ready
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Go Beyond Simple Signatures</h2>
            <p className="text-slate-600">When you're ready for real business, upgrade to the full BoopSign experience.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Tool */}
            <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50 relative">
              <h3 className="text-xl font-bold mb-4">Free Creator Tool</h3>
              <p className="text-slate-500 mb-6 text-sm">Perfect for personal use and quick tasks.</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-slate-700">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" /> <span>Draw or Type Signatures</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" /> <span>Transparent PNG Download</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <Check className="w-5 h-5 text-green-500 mt-0.5" /> <span>Works on all devices</span>
                </li>
                <li className="flex items-start gap-3 text-slate-400">
                  <div className="w-5 h-5 border border-slate-300 rounded-full flex items-center justify-center text-[10px] mt-0.5">X</div>
                  <span>No Audit Trail / Proof</span>
                </li>
                <li className="flex items-start gap-3 text-slate-400">
                  <div className="w-5 h-5 border border-slate-300 rounded-full flex items-center justify-center text-[10px] mt-0.5">X</div>
                  <span>Cannot request signatures</span>
                </li>
              </ul>
            </div>

            {/* BoopSign App */}
            <div className="p-8 rounded-2xl border-2 border-blue-600 bg-blue-50/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 text-xs font-bold rounded-bl-lg">RECOMMENDED</div>
              <h3 className="text-xl font-bold mb-4 text-blue-900">BoopSign Full App</h3>
              <p className="text-blue-700 mb-6 text-sm">For professionals who need legally binding documents.</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-blue-900">
                  <Check className="w-5 h-5 text-blue-600 mt-0.5" /> <span>Legally Binding (ESIGN & eIDAS)</span>
                </li>
                <li className="flex items-start gap-3 text-blue-900">
                  <Check className="w-5 h-5 text-blue-600 mt-0.5" /> <span>Full Audit Trail (IP, Timestamp)</span>
                </li>
                <li className="flex items-start gap-3 text-blue-900">
                  <Check className="w-5 h-5 text-blue-600 mt-0.5" /> <span>Send docs to multiple signers</span>
                </li>
                <li className="flex items-start gap-3 text-blue-900 font-semibold">
                  <Check className="w-5 h-5 text-blue-600 mt-0.5" /> <span>Auto-reminders & Tracking</span>
                </li>
                <li className="flex items-start gap-3 text-blue-900 font-semibold">
                  <Check className="w-5 h-5 text-blue-600 mt-0.5" /> <span>Secure Document Storage</span>
                </li>
              </ul>
              <a href="/signup" className="mt-8 flex items-center justify-center w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all gap-2 group">
                Try BoopSign Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* How it Works - Modernized */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 text-center max-w-5xl">
          <h2 className="text-3xl font-bold mb-12">How it works</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-blue-600 border border-slate-100">1</div>
              <h3 className="font-bold mb-3 text-lg">Create</h3>
              <p className="text-slate-600 leading-relaxed">Draw your signature with your mouse/touch, or type your name.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-blue-600 border border-slate-100">2</div>
              <h3 className="font-bold mb-3 text-lg">Download</h3>
              <p className="text-slate-600 leading-relaxed">Save your signature as a high-resolution, transparent PNG.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-blue-600 border border-slate-100">3</div>
              <h3 className="font-bold mb-3 text-lg">Sign</h3>
              <p className="text-slate-600 leading-relaxed">Drag and drop the PNG onto any document or email.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <Faq
        heading="Common Questions"
        items={signatureMakerFaq}
        className="py-24 bg-white"
      />

      {/* Final CTA */}
      <section className="py-24 px-4 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Need to send documents for signing?</h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            BoopSign is 3x faster than DocuSign and 50% cheaper. Join professionals signing smarter.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/signup" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all text-lg">
              Start 7-Day Free Trial
            </a>
            <a href="/pricing" className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all text-lg border border-white/10">
              View Pricing
            </a>
          </div>
          <p className="mt-8 text-slate-500 text-sm">No credit card required to start.</p>
        </div>
      </section>
    </main>
  );
}

