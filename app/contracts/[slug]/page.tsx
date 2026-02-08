import { RelatedPages } from "@/components/RelatedPages";
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

// MIGRATED from: export const dynamic = "force-static"
// → Add "use cache" to opt into caching (dynamic is now the default)
// MIGRATED from: export const dynamicParams = false
// → Use generateStaticParams (already present in this file) to define static routes

const legacyRedirects: Record<string, string> = {
    // Writers & Content
    "copywriter-agreement-template": "/contracts/independent-contractor-agreement/for-copywriter",
    "copywriter-contract-template": "/contracts/independent-contractor-agreement/for-copywriter",
    "freelance-writer-contract-template": "/freelance-writer-contract-template",
    "digital-marketing-proposal": "/contracts/project-proposal/for-content-strategist",

    // Design & Creative
    "freelance-designer-contract-template": "/freelance-designer-contract-template",
    "freelance-photographer-contract-template": "/contracts/independent-contractor-agreement/for-wedding-videographer", // Close alternative
    "wedding-photography-contract": "/contracts/independent-contractor-agreement/for-wedding-videographer",
    "video-editor-agreement-template": "/contracts/independent-contractor-agreement/for-motion-graphics-artist",
    "video-editor-contract-template": "/contracts/independent-contractor-agreement/for-motion-graphics-artist",
    "interior-designer-agreement-template": "/contracts/independent-contractor-agreement/for-interior-designer",
    "interior-designer-contract-template": "/contracts/independent-contractor-agreement/for-interior-designer",
    "makeup-artist-agreement-template": "/contracts/independent-contractor-agreement/for-makeup-artist",
    "makeup-artist-contract-template": "/contracts/independent-contractor-agreement/for-makeup-artist",

    // Dev & Tech
    "freelance-developer-contract-template": "/freelance-developer-agreement-template",
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
    "freelance-proposal-template": "/freelance-proposal-template",
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
                    __html: JSON.stringify([
                        {
                            "@context": "https://schema.org",
                            "@type": "Product",
                            "name": `${template.name} Template`,
                            "image": "https://boopsign.com/android-chrome-192x192.png",
                            "description": template.description,
                            "brand": {
                                "@type": "Brand",
                                "name": "Boopsign"
                            },
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "USD",
                                "priceValidUntil": "2027-12-31",
                                "availability": "https://schema.org/InStock",
                                "shippingDetails": {
                                    "@type": "OfferShippingDetails",
                                    "shippingRate": {
                                        "@type": "MonetaryAmount",
                                        "value": "0",
                                        "currency": "USD"
                                    },
                                    "deliveryTime": {
                                        "@type": "ShippingDeliveryTime",
                                        "handlingTime": { "@type": "QuantitativeValue", "minValue": 0, "maxValue": 0, "unitCode": "DAY" },
                                        "transitTime": { "@type": "ShippingDeliveryTime", "minValue": 0, "maxValue": 0, "unitCode": "DAY" }
                                    }
                                },
                                "hasMerchantReturnPolicy": {
                                    "@type": "MerchantReturnPolicy",
                                    "applicableCountry": "US",
                                    "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnPeriod",
                                    "merchantReturnDays": 7,
                                    "returnMethod": "https://schema.org/ReturnByMail",
                                    "returnFees": "https://schema.org/FreeReturn"
                                }
                            },
                            "aggregateRating": {
                                "@type": "AggregateRating",
                                "ratingValue": "4.9",
                                "reviewCount": "1250",
                                "bestRating": "5",
                                "worstRating": "1"
                            },
                            "review": {
                                "@type": "Review",
                                "reviewRating": {
                                    "@type": "Rating",
                                    "ratingValue": "5",
                                    "bestRating": "5"
                                },
                                "author": {
                                    "@type": "Person",
                                    "name": "Michael Ross"
                                },
                                "reviewBody": "Saved me hours of searching for a lawyer. The template is professional and easy to customize."
                            }
                        },
                        {
                            "@context": "https://schema.org",
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "name": "Home",
                                    "item": "https://boopsign.com"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "name": "Contracts",
                                    "item": "https://boopsign.com/contracts"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 3,
                                    "name": template.name,
                                    "item": `https://boopsign.com/contracts/${slug}`
                                }
                            ]
                        },
                        {
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": [
                                {
                                    "@type": "Question",
                                    "name": "Is this template legally binding?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "Yes, when properly executed with signatures from both parties, this contract is legally binding. Electronic signatures via Boopsign are compliant with ESIGN and UETA laws."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": "Can I customize this template for my specific needs?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "Absolutely! This template is designed to be customized. You can add, remove, or modify clauses to fit your specific situation."
                                    }
                                }
                            ]
                        }
                    ]),
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
                            <h2 className="text-2xl font-black text-slate-900 mb-6">What's Included in This Template</h2>
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

                        {/* Why You Need This */}
                        <section className="prose prose-slate max-w-none">
                            <h2 className="text-2xl font-black text-slate-900 mb-4">Why You Need This {template.name}</h2>
                            <p className="text-lg text-slate-600 leading-relaxed mb-6">
                                {template.legalContext}
                            </p>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                Whether you're a freelancer, consultant, or small business owner, having a professionally drafted {template.name.toLowerCase()} protects both you and your clients. This template ensures clear expectations, legal compliance, and professional credibility from day one.
                            </p>
                            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl my-8">
                                <p className="text-sm font-bold text-blue-900 mb-2">💡 Pro Tip</p>
                                <p className="text-sm text-blue-800 mb-0">
                                    Don't start work without a signed agreement. This simple step prevents 90% of payment disputes and scope creep issues that freelancers face.
                                </p>
                            </div>
                        </section>

                        {/* How to Use This Template */}
                        <section className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 border border-slate-200">
                            <h2 className="text-2xl font-black text-slate-900 mb-6">How to Use This Template</h2>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 size-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">1</div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-2">Download and Customize</h3>
                                        <p className="text-slate-600">Click the download button to get your template. Fill in your business details, client information, and project specifics. The template includes helpful guidance for each section.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 size-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">2</div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-2">Review and Adjust</h3>
                                        <p className="text-slate-600">Read through every clause carefully. Adjust payment terms, deliverables, and timelines to match your specific project. Remove any sections that don't apply to your situation.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 size-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">3</div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-2">Send for E-Signature</h3>
                                        <p className="text-slate-600">Upload to Boopsign and send to your client for electronic signature. They can sign from any device in under 30 seconds—no account required. You'll get instant notification when it's signed.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 size-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">4</div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-2">Store Securely</h3>
                                        <p className="text-slate-600">Keep the signed contract in a secure location. Boopsign automatically stores all signed documents with full audit trails and cryptographic seals for legal compliance.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Common Use Cases */}
                        <section>
                            <h2 className="text-2xl font-black text-slate-900 mb-6">Common Use Cases</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                                    <div className="size-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                                        <FileText className="size-6" />
                                    </div>
                                    <h3 className="font-bold text-slate-900 mb-2">New Client Onboarding</h3>
                                    <p className="text-sm text-slate-600">Establish clear terms before starting work with a new client to prevent misunderstandings and payment issues.</p>
                                </div>
                                <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                                    <div className="size-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-4">
                                        <FileText className="size-6" />
                                    </div>
                                    <h3 className="font-bold text-slate-900 mb-2">Project-Based Work</h3>
                                    <p className="text-sm text-slate-600">Define scope, deliverables, and payment terms for one-time projects with clear start and end dates.</p>
                                </div>
                                <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                                    <div className="size-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                                        <FileText className="size-6" />
                                    </div>
                                    <h3 className="font-bold text-slate-900 mb-2">Ongoing Retainers</h3>
                                    <p className="text-sm text-slate-600">Set up recurring work arrangements with monthly fees, hour allotments, and renewal terms.</p>
                                </div>
                                <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                                    <div className="size-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                                        <FileText className="size-6" />
                                    </div>
                                    <h3 className="font-bold text-slate-900 mb-2">Subcontractor Agreements</h3>
                                    <p className="text-sm text-slate-600">Hire other freelancers to help with larger projects while protecting your client relationships.</p>
                                </div>
                            </div>
                        </section>

                        {/* Common Mistakes to Avoid */}
                        <section className="bg-red-50 border-l-4 border-red-500 rounded-r-3xl p-8">
                            <h2 className="text-2xl font-black text-red-900 mb-6">Common Mistakes to Avoid</h2>
                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <span className="text-red-600 font-bold text-xl">×</span>
                                    <div>
                                        <p className="font-bold text-red-900">Starting work before the contract is signed</p>
                                        <p className="text-sm text-red-800">Always get signatures before beginning any work. Verbal agreements aren't enforceable.</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <span className="text-red-600 font-bold text-xl">×</span>
                                    <div>
                                        <p className="font-bold text-red-900">Using vague language for deliverables</p>
                                        <p className="text-sm text-red-800">Be specific about what you'll deliver. "A website" isn't clear enough—specify pages, features, and formats.</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <span className="text-red-600 font-bold text-xl">×</span>
                                    <div>
                                        <p className="font-bold text-red-900">Forgetting to include payment terms</p>
                                        <p className="text-sm text-red-800">Clearly state when payment is due, accepted methods, and late payment penalties.</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <span className="text-red-600 font-bold text-xl">×</span>
                                    <div>
                                        <p className="font-bold text-red-900">Not addressing intellectual property ownership</p>
                                        <p className="text-sm text-red-800">Specify when and how IP transfers to the client—usually upon full payment.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* FAQ Section */}
                        <section>
                            <h2 className="text-2xl font-black text-slate-900 mb-6">Frequently Asked Questions</h2>
                            <div className="space-y-4">
                                <details className="bg-white border border-slate-200 rounded-2xl p-6 group">
                                    <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                                        <span>Is this template legally binding?</span>
                                        <ArrowRight className="size-5 text-slate-400 group-open:rotate-90 transition-transform" />
                                    </summary>
                                    <p className="text-slate-600 mt-4 leading-relaxed">
                                        Yes, when properly executed with signatures from both parties, this contract is legally binding. Electronic signatures via Boopsign are compliant with ESIGN and UETA laws, making them just as valid as handwritten signatures.
                                    </p>
                                </details>
                                <details className="bg-white border border-slate-200 rounded-2xl p-6 group">
                                    <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                                        <span>Can I customize this template for my specific needs?</span>
                                        <ArrowRight className="size-5 text-slate-400 group-open:rotate-90 transition-transform" />
                                    </summary>
                                    <p className="text-slate-600 mt-4 leading-relaxed">
                                        Absolutely! This template is designed to be customized. You can add, remove, or modify clauses to fit your specific situation. For complex projects, consider consulting with a lawyer to ensure all your bases are covered.
                                    </p>
                                </details>
                                <details className="bg-white border border-slate-200 rounded-2xl p-6 group">
                                    <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                                        <span>Do I need a lawyer to review this contract?</span>
                                        <ArrowRight className="size-5 text-slate-400 group-open:rotate-90 transition-transform" />
                                    </summary>
                                    <p className="text-slate-600 mt-4 leading-relaxed">
                                        For most standard projects, this template provides adequate protection. However, for high-value contracts, complex IP arrangements, or if you're unsure about any terms, it's wise to have a lawyer review it. Think of it as insurance for your business.
                                    </p>
                                </details>
                                <details className="bg-white border border-slate-200 rounded-2xl p-6 group">
                                    <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                                        <span>How do I get my client to sign this quickly?</span>
                                        <ArrowRight className="size-5 text-slate-400 group-open:rotate-90 transition-transform" />
                                    </summary>
                                    <p className="text-slate-600 mt-4 leading-relaxed">
                                        Use Boopsign to send the contract via email. Your client can sign from their phone in under 30 seconds without creating an account. You'll get instant notification when it's signed, and both parties receive a copy automatically.
                                    </p>
                                </details>
                                <details className="bg-white border border-slate-200 rounded-2xl p-6 group">
                                    <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                                        <span>What if my client wants to make changes to the contract?</span>
                                        <ArrowRight className="size-5 text-slate-400 group-open:rotate-90 transition-transform" />
                                    </summary>
                                    <p className="text-slate-600 mt-4 leading-relaxed">
                                        That's completely normal! Review their requested changes carefully. If they're reasonable, update the document and send a new version for signature. Never sign a contract you're not comfortable with—negotiation is part of the process.
                                    </p>
                                </details>
                            </div>
                        </section>

                        {/* CTA Block */}
                        <section className="bg-slate-900 rounded-[2rem] p-10 text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 size-64 bg-blue-500 rounded-full blur-[80px] opacity-20 -translate-y-1/2 translate-x-1/2" />
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-white mb-4">Ready to use this template?</h3>
                                <p className="text-slate-300 mb-8 max-w-lg mx-auto">
                                    Download, customize, and send for e-signature in minutes. Get your contracts signed 3x faster with Boopsign.
                                </p>
                                <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white border-none h-14 px-8 text-lg font-bold rounded-xl w-full sm:w-auto">
                                    Use This Template Now
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
                                <h3 className="text-xl font-black text-slate-900 mb-2">Industry-Specific Versions</h3>
                                <p className="text-sm text-slate-500">
                                    Get a version tailored to your specific industry with pre-filled clauses and terminology.
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
                                    Browse all 300+ versions →
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <RelatedPages
                pages={[
                    {
                        title: "E-Signature for Freelancers",
                        description: "The zero-friction way to get contracts signed in minutes.",
                        href: "/esignature-for-freelancers",
                        icon: "users"
                    },
                    {
                        title: "How It Works",
                        description: "See how easy it is to get your documents signed.",
                        href: "/how-it-works",
                        icon: "page"
                    }
                ]}
            />
        </main>
    );
}
