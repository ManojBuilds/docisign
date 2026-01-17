import { TemplatesHub } from "@/components/templates/TemplatesHub";
import { allTemplates } from "content-collections";
import { BadgeCheck, Shield, Zap } from "lucide-react";

export const metadata = {
  title: "Free Contract Templates Library | BoopSign",
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

      {/* SEO Content */}
      <section className="bg-slate-900 text-slate-400 py-20 border-t border-slate-800">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Why use BoopSign templates?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <Shield className="size-8 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-white font-bold mb-2">Legally Vetted</h3>
              <p className="text-sm">Drafted to comply with common US/EU business laws.</p>
            </div>
            <div>
              <Zap className="size-8 text-amber-500 mx-auto mb-4" />
              <h3 className="text-white font-bold mb-2">Edit & Sign</h3>
              <p className="text-sm">Don't just download. Edit them in our browser and send for signature.</p>
            </div>
            <div>
              <BadgeCheck className="size-8 text-blue-500 mx-auto mb-4" />
              <h3 className="text-white font-bold mb-2">Always Free</h3>
              <p className="text-sm">Our template library is 100% free to access and use.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
