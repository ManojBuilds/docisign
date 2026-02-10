import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ALL_TEMPLATES } from "@/lib/seo/all-templates";
import { FREELANCE_ROLES } from "@/lib/seo/freelancer-roles";
import Link from "next/link";
import { Metadata } from "next";
import { TemplateMatrixHub } from "@/components/templates/TemplateMatrixHub";
import { RelatedPages } from "@/components/RelatedPages";
import { BadgeCheck, Check, Shield, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Free Contract Templates for Solo Entrepreneurs | Boopsign",
  description: "Browse 300+ free contract templates tailored for solo entrepreneurs. From NDAs to service agreements. Download or sign online with no client accounts needed.",
  alternates: {
    canonical: "https://boopsign.com/contracts",
  },
};

export default function ContractTemplatesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-slate-50 border-b border-slate-100 py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="secondary" className="mb-6 bg-white border-blue-200 text-blue-700 px-4 py-1.5 rounded-full uppercase tracking-wider font-bold">
              The Contract Library
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
              Contract Templates for <span className="text-blue-600">Every Niche</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              Don't use generic legal forms. We've built 300+ tailored agreements for specific freelance roles.
              Find the perfect contract for your industry below.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
            <div className="text-center p-4">
              <div className="text-2xl font-black text-slate-900">{ALL_TEMPLATES.length}</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Doc Types</div>
            </div>
            <div className="text-center p-4 border-l border-slate-100">
              <div className="text-2xl font-black text-slate-900">{FREELANCE_ROLES.length}</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Niches</div>
            </div>
            <div className="text-center p-4 border-l border-slate-100">
              <div className="text-2xl font-black text-slate-900">300+</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Combinations</div>
            </div>
            <div className="text-center p-4 border-l border-slate-100">
              <div className="text-2xl font-black text-slate-900">Free</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Forever</div>
            </div>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 size-96 bg-blue-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 size-96 bg-amber-100 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2" />
      </section>

      {/* Directory Section - NOW DYNAMIC */}
      <section className="py-12 bg-slate-50/50">
        <div className="container mx-auto px-4 max-w-7xl">
          <TemplateMatrixHub />
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Trusted by 10,000+ signers worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale">
            <span className="text-xl font-black text-slate-900 tracking-tighter">TECHCORE</span>
            <span className="text-xl font-black text-slate-900 tracking-tighter">DESIGNFLOW</span>
            <span className="text-xl font-black text-slate-900 tracking-tighter">MEDIAHOUSE</span>
            <span className="text-xl font-black text-slate-900 tracking-tighter">DEVSTUDIO</span>
          </div>
        </div>
      </section>

      {/* Enhanced SEO Content - Light Design */}
      <section className="bg-slate-50 py-24 border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              Streamlined Contracts for Modern Business
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our free contract templates are designed to help you close deals faster while staying protected. Legal compliance shouldn't be a bottleneck.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="size-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                <Shield className="size-6" />
              </div>
              <h3 className="text-slate-900 font-bold text-xl">Legally Enforceable</h3>
              <p className="text-slate-600 leading-relaxed">
                Every template is drafted to comply with ESIGN and UETA standards, ensuring your agreements are court-admissible globally.
              </p>
            </div>
            <div className="space-y-4">
              <div className="size-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                <Zap className="size-6" />
              </div>
              <h3 className="text-slate-900 font-bold text-xl">Zero Setup Required</h3>
              <p className="text-slate-600 leading-relaxed">
                Pick a contract, add your details, and send it for signature instantly. No complex software or legal training needed.
              </p>
            </div>
            <div className="space-y-4">
              <div className="size-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                <BadgeCheck className="size-6" />
              </div>
              <h3 className="text-slate-900 font-bold text-xl">Cloud Optimized</h3>
              <p className="text-slate-600 leading-relaxed">
                Access your signed contracts from anywhere. We provide secure storage and detailed audit trails for every transaction.
              </p>
            </div>
          </div>

          <div className="mt-24 p-8 md:p-12 bg-white rounded-3xl border border-slate-200 shadow-sm text-center">
            <h3 className="text-2xl font-black text-slate-900 mb-4">Need a custom contract?</h3>
            <p className="text-slate-600 mb-8 max-w-xl mx-auto">
              If you don't find exactly what you're looking for, you can upload any PDF to Boopsign and turn it into a reusable template in seconds.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Check className="size-4 text-emerald-500" />
                <span>No Credit Card</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Check className="size-4 text-emerald-500" />
                <span>Unlimited Envelopes</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Check className="size-4 text-emerald-500" />
                <span>Live Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">How to use our free contracts</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Going from a template to a legally signed agreement takes less than 2 minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Select Template", desc: "Choose from our library of lawyer-vetted contracts tailored for your industry." },
              { step: "02", title: "Customize", desc: "Fill in the blank variables like names, dates, and project specifics in our editor." },
              { step: "03", title: "Send for Signature", desc: "Enter your client's email. They receive a secure link to sign on any device." },
              { step: "04", title: "Secure Storage", desc: "Once signed, both parties receive a copy, and the document is stored in your secure vault." }
            ].map((item, idx) => (
              <div key={idx} className="relative p-8 rounded-2xl bg-white border border-slate-100 group hover:border-blue-200 transition-all hover:shadow-md">
                <span className="text-4xl font-black text-blue-100 group-hover:text-blue-200 transition-colors absolute top-4 right-6">{item.step}</span>
                <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed relative z-10">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Educational Content */}
      <section className="py-24 border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-3xl font-black text-slate-900 mb-8">The Importance of Professional Contract Templates</h2>
            <p className="text-lg text-slate-600 mb-6">
              In business, oral agreements are often not enough. Whether you are a solo entrepreneur taking on a new client or an agency scaling its operations, having a written agreement is the foundation of trust. Professional <strong>contract templates</strong> serve as a shield against misunderstandings and late payments.
            </p>

            <div className="grid md:grid-cols-2 gap-12 my-12">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Protect Your IP and Payments</h3>
                <p className="text-slate-600">
                  Our templates include specific clauses for Intellectual Property (IP) transfer and payment terms. This ensures that you get paid for your work and your clients get the rights they deserve.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Standardize Your Workflow</h3>
                <p className="text-slate-600">
                  Consistency is key to scaling. By using standardized templates, you ensure every client receives the same high-quality legal protection, reducing the time spent on administrative overhead.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-black text-slate-900 mt-16 mb-8">Are these templates legally binding?</h2>
            <p className="text-slate-600 mb-6">
              Yes. When these templates are completed and signed using <strong>Boopsign’s eSignature platform</strong>, they meet the requirements of the <strong>ESIGN Act</strong> (USA), <strong>UETA</strong> (USA), and <strong>eIDAS</strong> (EU). We provide an electronic audit trail for every document, which includes IP addresses, timestamps, and verification details that are necessary for legal enforceability.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Hub Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-black text-center text-slate-900 mb-16">Frequently Asked Questions</h2>
          <div className="space-y-8">
            {[
              {
                q: "Are these contract templates really free?",
                a: "Yes, our entire library of contract templates is 100% free to access, download, and use. We believe that professional legal agreements should be accessible to every business owner."
              },
              {
                q: "Can I edit the templates before sending them?",
                a: "Absolutely. Once you select a template, you can customize every field to fit your specific deal. You can add your own branding, change clauses, and set custom signing orders."
              },
              {
                q: "Do my clients need a Boopsign account to sign?",
                a: "No. Your clients can sign any contract on their mobile device or desktop without ever creating an account. This zero-friction approach leads to much higher completion rates."
              },
              {
                q: "What file formats are supported?",
                a: "You can use our templates directly in our web editor, or you can download them as Microsoft Word (.docx) files if you prefer to edit them offline."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-3">{faq.q}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Final SEO CTA */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-black mb-6">Don't see your niche?</h2>
          <p className="text-xl opacity-80 mb-10 max-w-2xl mx-auto">
            Our legal team is constantly adding new roles. In the meantime, you can use our universal freelance contract which covers 95% of use cases.
          </p>
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-14 px-8 text-lg font-bold shadow-lg shadow-blue-900/50">
            <Link href="/contracts/independent-contractor-agreement">Get Universal Template</Link>
          </Button>
        </div>
      </section>

      <RelatedPages
        pages={[
          {
            title: "E-Signature for Solo Entrepreneurs",
            description: "Learn how to get your contracts signed 3x faster.",
            href: "/for-solo-entrepreneurs",
            icon: "users"
          },
          {
            title: "How Boopsign Works",
            description: "A step-by-step guide to sending your first document.",
            href: "/how-it-works",
            icon: "page"
          },
          {
            title: "Pricing Plans",
            description: "Simple, transparent pricing for solo entrepreneurs.",
            href: "/pricing",
            icon: "page"
          }
        ]}
      />
    </main>
  );
}
