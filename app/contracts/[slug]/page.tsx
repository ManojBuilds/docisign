import { TemplatePageHeader } from "@/components/templates/TemplatePageHeader";
import { Button } from "@/components/ui/button";
import { ALL_TEMPLATES } from "@/lib/seo/all-templates";
import { FREELANCE_ROLES } from "@/lib/seo/freelancer-roles";
import { ArrowRight, Check, FileText, Sparkles } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

type Props = {
    params: Promise<{ slug: string }>;
};

const legacyRedirects: Record<string, string> = {
    // Writers & Content
    "copywriter-agreement-template": "/contracts/independent-contractor-agreement/for-copywriter",
    "copywriter-contract-template": "/contracts/independent-contractor-agreement/for-copywriter",
    "freelance-writer-contract-template": "/contracts/independent-contractor-agreement/for-ghostwriter",
    "digital-marketing-proposal": "/contracts/project-proposal/for-content-strategist",

    // Design & Creative
    "freelance-designer-contract-template": "/contracts/independent-contractor-agreement/for-ui-ux-designer",
    "freelance-photographer-contract-template": "/contracts/independent-contractor-agreement/for-wedding-videographer", // Close alternative
    "wedding-photography-contract": "/contracts/independent-contractor-agreement/for-wedding-videographer",
    "video-editor-agreement-template": "/contracts/independent-contractor-agreement/for-motion-graphics-artist",
    "video-editor-contract-template": "/contracts/independent-contractor-agreement/for-motion-graphics-artist",
    "interior-designer-agreement-template": "/contracts/independent-contractor-agreement/for-interior-designer",
    "interior-designer-contract-template": "/contracts/independent-contractor-agreement/for-interior-designer",
    "makeup-artist-agreement-template": "/contracts/independent-contractor-agreement/for-makeup-artist",
    "makeup-artist-contract-template": "/contracts/independent-contractor-agreement/for-makeup-artist",

    // Dev & Tech
    "freelance-developer-contract-template": "/contracts/independent-contractor-agreement/for-shopify-developer",
    "mobile-app-developer-agreement-template": "/contracts/independent-contractor-agreement/for-no-code-developer",
    "mobile-app-developer-contract-template": "/contracts/independent-contractor-agreement/for-no-code-developer",

    // Services & Events
    "dog-walker-agreement-template": "/contracts/independent-contractor-agreement/for-dog-walker",
    "dog-walker-contract-template": "/contracts/independent-contractor-agreement/for-dog-walker",
    "caregiver-contract-template": "/contracts/independent-contractor-agreement/for-caregiver",
    "personal-trainer-agreement-template": "/contracts/independent-contractor-agreement/for-personal-trainer",
    "personal-trainer-contract-template": "/contracts/independent-contractor-agreement/for-personal-trainer",
    "event-planner-agreement-template": "/contracts/independent-contractor-agreement/for-event-planner",
    "event-planner-contract-template": "/contracts/independent-contractor-agreement/for-event-planner",
    "wedding-videographer-agreement-template": "/contracts/independent-contractor-agreement/for-wedding-videographer",
    "wedding-videographer-contract-template": "/contracts/independent-contractor-agreement/for-wedding-videographer",
    "snow-removal-contract-template": "/contracts/independent-contractor-agreement", // General fallback
    "house-cleaning-service-agreement": "/contracts/independent-contractor-agreement", // General fallback

    // General Business
    "freelance-contract-template": "/contracts/independent-contractor-agreement",
    "freelance-consultant-contract-template": "/contracts/independent-contractor-agreement",
    "freelance-nda-template": "/contracts/non-disclosure-agreement",
    "freelance-proposal-template": "/contracts/project-proposal",
    "statement-of-work-template": "/contracts/statement-of-work",
    "resignation-letter-template": "/contracts/termination-notice",
    "social-media-management-contract": "/contracts/independent-contractor-agreement/for-facebook-ads-manager", // Best fit
    "strategic-partnership-agreement": "/contracts/referral-agreement",
    "supply-agreement": "/contracts/independent-contractor-agreement",

    // Real Estate
    "sublease-agreement-california": "/contracts/residential-lease-agreement",
    "sublease-agreement-florida": "/contracts/residential-lease-agreement",
    "sublease-agreement-nyc": "/contracts/residential-lease-agreement",
    "sublease-agreement-texas": "/contracts/residential-lease-agreement",
    "owner-financing-contract": "/contracts/residential-lease-agreement",

    // Misc
    "letter-of-intent-to-sue": "/contracts",
    "scholarship-application-template": "/contracts",
    "notary-signature-template": "/contracts",
    "invitation-to-bid-template": "/contracts/project-proposal",
};

export async function generateStaticParams() {
    return ALL_TEMPLATES.map((t) => ({
        slug: t.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const template = ALL_TEMPLATES.find((t) => t.slug === slug);

    if (!template) return {};

    return {
        title: `Free ${template.name} Template | Boopsign`,
        description: template.description,
        alternates: {
            canonical: `https://boopsign.com/contracts/${slug}`,
        },
    };
}

export default async function BaseTemplatePage({ params }: Props) {
    const { slug } = await params;

    // Check for Legacy Redirects first
    if (legacyRedirects[slug]) {
        redirect(legacyRedirects[slug]);
    }

    const template = ALL_TEMPLATES.find((t) => t.slug === slug);

    if (!template) {
        notFound();
    }

    // Find roles that might use this template
    // Logic: If role has tags that match template category, OR template is General, OR role is in relatedRoles
    const relatedRoles = FREELANCE_ROLES.filter(role =>
        template.category === "General" ||
        (role.tags && role.tags.includes(template.category)) ||
        (template.relatedRoles && template.relatedRoles.includes(role.slug))
    ).slice(0, 9); // Limit to 9 for grid

    return (
        <main className="min-h-screen bg-slate-50/50">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Product",
                        "name": `${template.name} Template`,
                        "description": template.description,
                        "brand": {
                            "@type": "Brand",
                            "name": "Boopsign"
                        },
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD",
                            "availability": "https://schema.org/InStock"
                        }
                    }),
                }}
            />

            <TemplatePageHeader
                title={template.name}
                subtitle={template.description}
                category="Standard Template"
            />

            <div className="container mx-auto px-4 max-w-6xl py-12">
                <div className="grid lg:grid-cols-3 gap-12">

                    {/* Left Column: Template Details */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Key Features */}
                        <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                            <h2 className="text-2xl font-black text-slate-900 mb-6">What's inside?</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {template.keyFeatures.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="size-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Check className="size-3.5 stroke-[3]" />
                                        </div>
                                        <span className="text-slate-600 font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Legal Context */}
                        <section>
                            <h2 className="text-2xl font-black text-slate-900 mb-4">Legal Context</h2>
                            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mb-6">
                                {template.legalContext}
                            </p>
                            <Link href="/esignature-for-freelancers" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors py-2 px-4 bg-blue-50 rounded-lg">
                                <Sparkles className="size-4" />
                                <span>Why this contract works perfectly for freelancers</span>
                                <ArrowRight className="size-3.5" />
                            </Link>
                        </section>

                        {/* CTA Block */}
                        <section className="bg-slate-900 rounded-[2rem] p-10 text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 size-64 bg-blue-500 rounded-full blur-[80px] opacity-20 -translate-y-1/2 translate-x-1/2" />
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-white mb-4">Ready to use this template?</h3>
                                <p className="text-slate-300 mb-8 max-w-lg mx-auto">
                                    Edit directly in your browser, send for e-signature, and track status instantly.
                                </p>
                                <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white border-none h-14 px-8 text-lg font-bold rounded-xl w-full sm:w-auto">
                                    Use Standard Template
                                </Button>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Tailored Options */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl shadow-slate-200/50 sticky top-24">
                            <div className="mb-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider mb-3">
                                    <Sparkles className="size-3" />
                                    Recommended
                                </div>
                                <h3 className="text-xl font-black text-slate-900 mb-2">Tailored Versions</h3>
                                <p className="text-sm text-slate-500">
                                    We have specialized versions of this contract for specific industries.
                                </p>
                            </div>

                            <div className="space-y-3">
                                {relatedRoles.map(role => (
                                    <Link
                                        key={role.slug}
                                        href={`/contracts/${template.slug}/for-${role.slug}`}
                                        className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                                <FileText className="size-4" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">For {role.role}s</span>
                                                <span className="text-[10px] text-slate-400">Includes {role.industry} clauses</span>
                                            </div>
                                        </div>
                                        <ArrowRight className="size-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-6 pt-6 border-t border-slate-100 text-center">
                                <Link
                                    href="/contracts"
                                    className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                                >
                                    Browse all 300+ versions
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
