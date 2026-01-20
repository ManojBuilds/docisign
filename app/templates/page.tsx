import { TemplatesHub } from "@/components/templates/TemplatesHub";
import { allTemplates } from "content-collections";
import { BadgeCheck, Shield, Zap } from "lucide-react";

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
  const categories: Record<string, HubTemplateItem[]> = {};

  allTemplates.forEach((t) => {
    if (!t.category) return; // Skip templates without a category

    if (!categories[t.category]) {
      categories[t.category] = [];
    }
    categories[t.category].push({
      title: t.title,
      desc: t.subtitle || t.description,
      href: `/templates/${t.slug}`,
      popular: t.slug === "social-media-management-contract" || t.slug === "wedding-photography-contract" || t.slug === "house-cleaning-service-agreement" || t.slug === "nda-template"
    });
  });

  // Add static categories/items that are not yet in templatesData
  if (!categories["Service Business"]) categories["Service Business"] = [];
  categories["Service Business"].push({
    title: "Client Onboarding Documents",
    desc: "A bundle of essential forms for welcoming new clients properly.",
    href: "/client-onboarding-documents",
    popular: false,
  });

  if (!categories["Legal & General"]) categories["Legal & General"] = [];
  categories["Legal & General"].push({
    title: "Remote Team Signing",
    desc: "Documents for hiring and managing remote employees.",
    href: "/remote-team-document-signing",
    popular: false,
  });

  // Convert to expected array format
  return Object.entries(categories).map(([category, items]) => ({
    category,
    items,
  })).sort((a, b) => {
    const order = ["Creative & Freelance", "Agency & Freelance", "Freelance & Consulting", "Service Business", "Legal & General"];
    const aIdx = order.indexOf(a.category);
    const bIdx = order.indexOf(b.category);
    return (aIdx === -1 ? 99 : aIdx) - (bIdx === -1 ? 99 : bIdx);
  });
};


export default function ContractTemplatesHubPage() {
  const templates = getDynamicTemplates();

  return (
    <main className="min-h-screen bg-slate-50/50">
      <TemplatesHub initialTemplates={templates} />

      {/* Enhanced SEO Content */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-slate-400 py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/bg-noise.png')] opacity-[0.05]" />
        <div className="absolute top-0 left-1/4 size-[400px] bg-blue-500/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 size-[400px] bg-indigo-500/5 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Why use Boopsign templates?</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-16">
            Professional-grade contracts that protect your business and simplify your workflow
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="size-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="size-8 text-emerald-400" />
              </div>
              <h3 className="text-white font-black text-xl mb-3">Legally Vetted</h3>
              <p className="text-slate-300">
                Drafted to comply with common US/EU business laws.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="size-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="size-8 text-amber-400" />
              </div>
              <h3 className="text-white font-black text-xl mb-3">Edit & Sign</h3>
              <p className="text-slate-300">
                Don't just download. Edit them in our browser and send for signature.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="size-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <BadgeCheck className="size-8 text-blue-400" />
              </div>
              <h3 className="text-white font-black text-xl mb-3">Always Free</h3>
              <p className="text-slate-300">
                Our template library is 100% free to access and use.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
