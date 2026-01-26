import { ClientHeaderWrapper } from "@/components/ClientHeaderWrapper";
import Footer from "@/components/Footer";
import { Check, Shield, Zap, Star, Users, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import OnlineSignatureCreator from "@/components/OnlineSignatureCreator";
import Cta from "@/components/cta";
import Faq from "@/components/faq";
import TestimonialsSection from "@/components/testimonials";
export const metadata: Metadata = {
  title: "Free Online Signature Maker & Generator (Type or Draw)",
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

const famousSignatures = [
  { name: "Steve Jobs", avatar: "/signatures/steve-jobs.png", title: "Apple", desc: "Small letters, indicate focus and precision.", initials: "SJ", image: "/signatures/steve-jobs-signature.png" },
  { name: "Oprah Winfrey", avatar: "/signatures/oprah-winfrey.png", title: "Harpo Productions", desc: "Large, bold letters show confidence.", initials: "OW", image: "/signatures/oprah-winfrey-signature.png" },
  { name: "Richard Branson", avatar: "/signatures/richard-branson.png", title: "Virgin Group", desc: "The upward angle shows optimism.", initials: "RB", image: "/signatures/richard-branson-signature.png" },
  { name: "Jeff Bezos", avatar: "/signatures/jeff-bezos.png", title: "Amazon", desc: "Simple and legible, focused on results.", initials: "JB", image: "/signatures/jeff-bezoss-signature.png" },
  { name: "Mary Barra", avatar: "/signatures/mary-barra.png", title: "General Motors", desc: "Clear and professional structure.", initials: "MB", image: "/signatures/mary-barra-signature.png" },
  { name: "Bill Gates", avatar: "/signatures/bill-gates.png", title: "Microsoft", desc: "Balanced and analytical lettering.", initials: "BG", image: "/signatures/bill-gates-signature.png" },
];

const personalityTraits = [
  { trait: "Unreadable letters", meaning: "Sharp, creative agility", image: "/signatures/unreadable-letters.svg" },
  { trait: "Easy to read", meaning: "Transparent personality", image: "/signatures/easy-to-read.svg" },
  { trait: "With underline", meaning: "Proud and energetic", image: "/signatures/with-underline.svg" },
  { trait: "Upward angle", meaning: "Ambitious and optimistic", image: "/signatures/upward-angle.svg" },
  { trait: "Slanted", meaning: "Outgoing and friendly", image: "/signatures/slanted.svg" },
  { trait: "Just a nickname", meaning: "Self-confident", image: "/signatures/just-a-nickname.svg" },
];

export default function OnlineSignatureMakerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ClientHeaderWrapper />
      <main className="flex-grow">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Allison&family=Bilbo+Swash+Caps&family=Caveat&family=Comforter+Brush&family=Dancing+Script&family=Dr+Sugiyama&family=Fuggles&family=Great+Vibes&family=Kaushan+Script&family=Liu+Jian+Mao+Cao&family=Montez&family=Mrs+Saint+Delafield&family=Over+the+Rainbow&family=Pinyon+Script&family=Qwigley&family=Reenie+Beanie&family=Sacramento&family=Style+Script&family=Zeyada&display=swap" rel="stylesheet" />

        <section className="relative pt-20 pb-32 overflow-hidden bg-slate-50/40">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(100%_100%_at_50%_0%,rgba(59,130,246,0.05)_0%,rgba(255,255,255,0)_100%)] pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <Sparkles className="size-3" />
                PROFESSIONAL SIGNATURE GENERATOR
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8">
                Sign with <span className="text-blue-600">Personality.</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Create a stunning, transparent esignature in seconds. Choose from
                dozens of professional styles or draw your own unique mark.
              </p>
            </div>

            <OnlineSignatureCreator />
          </div>
        </section>

        {/* Personality Insight Section */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                What does your signature <br />
                <span className="text-blue-600">say about you?</span>
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                Graphologists believe your signature is a statement of your
                personality. Express yourself with the right style.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {personalityTraits.map((t, i) => (
                <div
                  key={i}
                  className="group p-8 flex flex-col items-center bg-white rounded-3xl border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-full h-40 flex items-center justify-center mb-6 bg-slate-50/50 rounded-2xl relative overflow-hidden group-hover:bg-blue-50/30 transition-colors p-6">
                    <Image
                      src={t.image}
                      alt={t.trait}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {t.trait}
                  </h3>
                  <p className="text-slate-500 text-sm text-center">
                    {t.meaning}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Successful People Section */}
        <section className="py-32 bg-slate-50/50 overflow-hidden relative border-y border-slate-100">
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-8">
              <div className="max-w-2xl text-left">
                <h2 className="text-4xl md:text-6xl font-bold mb-8 text-slate-900">The signatures of <br /><span className="text-blue-600">successful people</span></h2>
                <p className="text-slate-500 text-lg">See how some of the world's most influential leaders leave their mark. Each signature is unique to its creator's journey.</p>
              </div>
              <div className="flex items-center gap-4 text-slate-400 text-sm font-medium">
                <Users className="size-5" /> 1M+ Signatures generated
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {famousSignatures.map((person, i) => (
                <div key={i} className="p-8 group">
                  <div className="flex flex-col items-center gap-4">
                    <Avatar>
                      <AvatarImage src={person.avatar} />
                      <AvatarFallback>{person.initials}</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <h4 className="font-bold text-slate-900 text-lg">{person.name}</h4>
                      <p className="text-blue-600 text-xs font-semibold uppercase tracking-wider">{person.title}</p>
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed mt-2 text-center">{person.desc}</p>
                  <div className="h-24 flex items-center justify-start relative mt-4">
                    <Image
                      src={person.image}
                      alt={`${person.name} Signature`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col lg:flex-row items-center gap-20">
              <div className="lg:w-1/2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-6">
                  WHY GO DIGITAL?
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-[1.1]">
                  Better for your business, <br /><span className="text-blue-600">better for the planet.</span>
                </h2>
                <div className="space-y-8">
                  {[
                    { title: "Eco-Friendly", desc: "Reduce paper waste and save trees.", icon: <Star className="size-5" /> },
                    { title: "Legally Binding", desc: "Recognized globally in 180+ countries.", icon: <Shield className="size-5" /> },
                    { title: "Lightning Fast", desc: "Sign documents in seconds, not days.", icon: <Zap className="size-5" /> },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6">
                      <div className="size-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 text-blue-600">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2 relative">
                <div className="absolute -inset-10 bg-blue-50 rounded-full blur-[100px] opacity-40 pointer-events-none" />
                <div className="relative border border-slate-100 shadow-2xl rounded-[3rem] p-10 bg-white">
                  <div className="flex items-center justify-between mb-10">
                    <div className="font-bold text-lg">Signature Modes</div>
                    <div className="flex gap-2">
                      <div className="size-3 rounded-full bg-slate-100" />
                      <div className="size-3 rounded-full bg-slate-100" />
                      <div className="size-3 rounded-full bg-slate-100" />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between group hover:border-blue-200 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="size-10 rounded-xl bg-white flex items-center justify-center text-blue-600 shadow-sm font-bold">T</div>
                        <div className="font-semibold text-slate-900">Type to Sign</div>
                      </div>
                      <Check className="size-5 text-green-500" />
                    </div>
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between group hover:border-blue-200 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="size-10 rounded-xl bg-white flex items-center justify-center text-blue-600 shadow-sm font-bold">D</div>
                        <div className="font-semibold text-slate-900">Draw to Sign</div>
                      </div>
                      <Check className="size-5 text-green-500" />
                    </div>
                  </div>
                  <div className="mt-10 p-6 rounded-2xl bg-blue-600 text-white text-center font-bold">
                    Start Signing Now
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-slate-50/50 border-y border-slate-100">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 className="text-3xl font-bold mb-12">Trusted by 10,000+ professionals worldwide</h2>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale group-hover:grayscale-0 transition-all">
              {/* Add some dummy company names if no logos */}
              <div className="text-xl font-bold tracking-tighter">TECHCORP</div>
              <div className="text-xl font-bold tracking-tighter">FINANCEGO</div>
              <div className="text-xl font-bold tracking-tighter">SOFTLY</div>
              <div className="text-xl font-bold tracking-tighter">UPSTREAM</div>
              <div className="text-xl font-bold tracking-tighter">GLOBALNET</div>
            </div>
          </div>
        </section>

        <TestimonialsSection />

        <Faq
          heading="Signature Maker FAQ"
          items={signatureMakerFaq}
          className="py-32 bg-white"
        />

        <Cta />
      </main>
      <Footer />
    </div>
  );
}
