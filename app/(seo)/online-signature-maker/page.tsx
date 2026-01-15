import OnlineSignatureCreator from "@/components/OnlineSignatureCreator";
import Faq from "@/components/faq";
import TestimonialsSection from "@/components/testimonials";
import { ArrowRight, Check, FileText, Shield, Smartphone, Zap } from "lucide-react";
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
            image: "https://boopsign.com/images/og-signature-maker.jpg",
            description: "Create professional electronic signatures online for free.",
            url: "https://boopsign.com/online-signature-maker",
            applicationCategory: "BusinessApplication",
            brand: {
              "@type": "Brand",
              name: "BoopSign"
            },
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "2847",
              bestRating: "5",
              worstRating: "1"
            },
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

          <div className="flex flex-col items-center gap-12">
            <OnlineSignatureCreator />

            {/* Secondary Magnet */}
            <div className="w-full max-w-2xl p-8 rounded-3xl bg-slate-900 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <FileText className="size-32" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Already have a document to sign?</h3>
                <p className="text-slate-400 mb-6">Stop dragging and dropping PNGs. Upload your PDF to BoopSign and sign it 100% legally in 60 seconds.</p>
                <a href="/dashboard" className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all gap-2">
                  Sign a PDF Now (Free) <Zap className="size-4" />
                </a>
              </div>
            </div>
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
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">Sign Like a Pro</h2>
            <p className="text-slate-600 text-lg">When you&apos;re ready for real business, upgrade to the full BoopSign experience.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Tool */}
            <div className="p-10 rounded-[2.5rem] border border-slate-100 bg-slate-50/50 relative group hover:border-slate-200 transition-colors">
              <h3 className="text-2xl font-bold mb-4 text-slate-800">Free Creator Tool</h3>
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

            {/* BoopSign App */}
            <div className="p-10 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden shadow-2xl shadow-blue-200/20 group hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 right-0 bg-blue-600 text-white px-5 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-bl-2xl">SOLO PRO</div>
              <h3 className="text-2xl font-bold mb-4">BoopSign Full App</h3>
              <p className="text-slate-400 mb-8 text-sm md:text-base leading-relaxed">For freelancers who need legally binding contracts and zero friction.</p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3 text-blue-50">
                  <Check className="w-5 h-5 text-blue-400 mt-0.5" /> <span>Legally Binding (ESIGN & UETA)</span>
                </li>
                <li className="flex items-start gap-3 text-blue-50 font-bold">
                  <Check className="w-5 h-5 text-blue-400 mt-0.5" /> <span>No Account Required for Clients</span>
                </li>
                <li className="flex items-start gap-3 text-blue-50">
                  <Check className="w-5 h-5 text-blue-400 mt-0.5" /> <span>Full Audit Trail (IP, Timestamp)</span>
                </li>
                <li className="flex items-start gap-3 text-blue-50">
                  <Check className="w-5 h-5 text-blue-400 mt-0.5" /> <span>Unlimited Document Sending</span>
                </li>
                <li className="flex items-start gap-3 text-blue-50">
                  <Check className="w-5 h-5 text-blue-400 mt-0.5" /> <span>Mobile-First Secure Link</span>
                </li>
              </ul>
              <a href="/dashboard" className="flex items-center justify-center w-full bg-blue-600 text-white py-5 rounded-2xl font-bold hover:bg-blue-700 transition-all gap-2 group shadow-xl shadow-blue-600/20">
                Sign a Real Document Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* How it Works - Modernized */}
      <section className="py-24 bg-slate-50/50">
        <div className="container mx-auto px-4 text-center max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-slate-900">How to use your signature</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-xl font-bold text-blue-600">1</div>
              <h3 className="font-bold mb-3 text-lg">Create</h3>
              <p className="text-slate-500 leading-relaxed text-sm">Draw or type your name above to generate your custom PNG signature.</p>
            </div>
            <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-xl font-bold text-blue-600">2</div>
              <h3 className="font-bold mb-3 text-lg">Download</h3>
              <p className="text-slate-500 leading-relaxed text-sm">Save your signature as a transparent PNG. No background, high res.</p>
            </div>
            <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-xl font-bold text-blue-600">3</div>
              <h3 className="font-bold mb-3 text-lg">Sign</h3>
              <p className="text-slate-500 leading-relaxed text-sm">Drag your signature onto any contract. Or better yet, upload your PDF to BoopSign.</p>
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
      <section className="py-32 px-4 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">Sign faster. Sign better.</h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            BoopSign is the 60-second e-signature platform for freelancers. No client accounts. No friction. $15/month for unlimited everything.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="/dashboard" className="w-full sm:w-auto px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all text-xl shadow-2xl shadow-blue-600/40">
              Start Free Trial
            </a>
            <a href="/pricing" className="w-full sm:w-auto px-10 py-5 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold transition-all text-xl border border-white/10">
              View Pricing
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
