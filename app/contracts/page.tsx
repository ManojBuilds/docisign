import { TemplatesHub } from "@/components/templates/TemplatesHub";
import { allContracts } from "content-collections";
import { BadgeCheck, Check, Shield, SignatureIcon, Zap } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Free Contract Templates Library | Boopsign",
  description: "Browse our collection of free, professionally drafted contract templates for freelancers, agencies, and small businesses. Edit and sign in minutes.",
};

// Type for the internal template structure
interface HubTemplateItem {
  title: string;
  desc: string;
  href: string;
  popular: boolean;
}

interface HubCategory {
  category: string;
  items: HubTemplateItem[];
}

// Convert templatesData Record into grouped categories for the hub
const getDynamicTemplates = (): HubCategory[] => {
  const allItems: HubTemplateItem[] = [];

  allContracts.forEach((t: any) => {
    allItems.push({
      title: t.title,
      desc: t.subtitle || t.description,
      href: `/contracts/${t.slug}`,
      popular: !!t.popular,
    });
  });

  return [{
    category: "All Contract Templates",
    items: allItems.sort((a, b) => (a.popular === b.popular ? 0 : a.popular ? -1 : 1))
  }];
};


export default function ContractTemplatesHubPage() {
  const templates = getDynamicTemplates();

  return (
    <main className="min-h-screen bg-white">
      <TemplatesHub initialTemplates={templates} />

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
              In business, oral agreements are often not enough. Whether you are a freelancer taking on a new client or an agency scaling its operations, having a written agreement is the foundation of trust. Professional <strong>contract templates</strong> serve as a shield against misunderstandings and late payments.
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

      {/* Featured Template Spotlight */}
      <section className="py-24 bg-blue-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12 bg-white rounded-[3rem] p-8 md:p-16 border border-blue-100 overflow-hidden relative">
            <div className="absolute top-0 right-0 size-64 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="flex-1 space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider">
                Featured Contract
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900">Social Media Management Contract</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Our most popular template for agencies and freelancers. Includes platform independence clauses, content approval workflows, and IP protection.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/contracts/social-media-management-contract" className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-200">
                  Get This Template
                </Link>
              </div>
            </div>
            <div className="flex-1 relative z-10">
              <div className="aspect-[4/5] bg-slate-50 rounded-2xl border border-slate-200 p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="space-y-4">
                  <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse" />
                  <div className="h-4 w-full bg-slate-100 rounded animate-pulse" />
                  <div className="h-4 w-5/6 bg-slate-100 rounded animate-pulse" />
                  <div className="space-y-2 pt-8">
                    <div className="h-10 w-full border-b border-slate-200 flex items-end pb-2">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Signer Name</span>
                    </div>
                    <div className="h-10 w-full border-b border-slate-200 flex items-end pb-2">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Date</span>
                    </div>
                  </div>
                  <div className="pt-12">
                    <div className="aspect-video border-2 border-dashed border-blue-200 rounded-lg flex items-center justify-center text-blue-300">
                      <SignatureIcon className="size-8" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

      {/* Final CTA */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="p-8 md:p-16 bg-sky-50 rounded-[2.5rem] text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black mb-6 text-slate-900">Stop wasting time on paperwork</h2>
              <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
                Join 10,000+ professionals who use Boopsign to secure their business agreements in record time.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/dashboard" className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-slate-50 transition-colors shadow-xl border border-blue-100">
                  Create Your Free Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
