import { TemplatePageHeader } from "@/components/templates/TemplatePageHeader";
import { TemplateSidebar } from "@/components/templates/TemplateSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { PdfDimensionsProvider } from "@/components/PdfDimensionsContext";
import { WordViewer } from "@/components/word-viewer";
import {
    Check, Shield, Briefcase
} from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALL_TEMPLATES } from "@/lib/seo/all-templates";
import { FREELANCE_ROLES } from "@/lib/seo/freelancer-roles";

type Props = {
    params: Promise<{ slug: string; roleSlug: string }>;
};

// MIGRATED from: export const dynamic = "force-static"
// → Add "use cache" to opt into caching (dynamic is now the default)
// MIGRATED from: export const dynamicParams = false
// → Use generateStaticParams (already present in this file) to define static routes

// Generate valid URLs for the matrix: Filtered by Category Logic
export async function generateStaticParams() {
    const params: { slug: string; roleSlug: string }[] = [];

    for (const template of ALL_TEMPLATES) {
        for (const role of FREELANCE_ROLES) {
            // Logic: 
            // 1. "General" templates work for everyone (e.g. NDA).
            // 2. Specific templates (e.g. Real Estate Lease) only work for roles with that tag.
            // 3. Templates with relatedRoles work for those specific roles.
            const isCompatible =
                template.category === "General" ||
                (role.tags && role.tags.includes(template.category)) ||
                (template.relatedRoles && template.relatedRoles.includes(role.slug));

            if (isCompatible) {
                params.push({
                    slug: template.slug,
                    roleSlug: `for-${role.slug}`,
                });
            }
        }
    }

    return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug, roleSlug } = await params;

    // Parse inputs
    const template = ALL_TEMPLATES.find((t) => t.slug === slug);
    const cleanRoleSlug = roleSlug.replace(/^for-/, "");
    const role = FREELANCE_ROLES.find((r) => r.slug === cleanRoleSlug);

    if (!template || !role) return {};

    const title = `Free ${template.name} for ${role.role}s | Boopsign`;
    const description = `Get a professional ${template.name} tailored for freelance ${role.role}s in the ${role.industry} industry. Protect your ${roleDataToPainPoint(role)}.`;

    return {
        title,
        description,
        keywords: [
            `${template.name} for ${role.role}`,
            `${role.role} contract template`,
            `freelance ${role.role} legal forms`,
            `free ${template.name} template`,
            `${role.industry} contract`
        ],
        alternates: {
            canonical: `https://boopsign.com/contracts/${slug}/${roleSlug}`,
        },
    };
}

function roleDataToPainPoint(role: any) {
    // Extract key noun phrase from pain point for description
    // The painPoint typically follows the pattern "clients doing X" or "being Y"
    // We want to extract the core issue for the meta description
    const painPoint = role.painPoint || "business and getting paid";

    // Remove common prefixes to get to the core issue
    const cleaned = painPoint
        .replace(/^(clients?|being|getting|having|finding|dealing with|worrying about)\s+/i, "")
        .trim();

    return cleaned || "business and getting paid";
}

export default async function MatrixContractPage({ params }: Props) {
    const { slug, roleSlug } = await params;

    // Validate Route
    const template = ALL_TEMPLATES.find((t) => t.slug === slug);
    const cleanRoleSlug = roleSlug.replace(/^for-/, "");
    const role = FREELANCE_ROLES.find((r) => r.slug === cleanRoleSlug);

    // Ensure strict matching for "for-" prefix to avoid duplicate content issues
    if (!template || !role || !roleSlug.startsWith("for-")) {
        notFound();
    }

    // Double check compatibility for runtime (in case of ISR/manual navigation)
    const isCompatible =
        template.category === "General" ||
        (role.tags && role.tags.includes(template.category)) ||
        (template.relatedRoles && template.relatedRoles.includes(role.slug));

    if (!isCompatible) {
        notFound();
    }

    return (
        <PdfDimensionsProvider>
            <main className="min-h-screen bg-white">
                {/* Schema Markup for "Product" (The Template) */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify([
                            {
                                "@context": "https://schema.org",
                                "@type": "Product",
                                "name": `${template.name} for ${role.role}s`,
                                "image": "https://boopsign.com/android-chrome-192x192.png",
                                "description": `Professional ${template.name} template specifically designed for ${role.role}s.`,
                                "category": "LegalForms",
                                "offers": {
                                    "@type": "Offer",
                                    "price": "0.00",
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
                                    "ratingCount": "850",
                                    "reviewCount": "850",
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
                                        "name": "Sarah Jenkins"
                                    },
                                    "reviewBody": `As a ${role.role}, I needed a contract that specifically addressed my industry needs. This template was perfect.`
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
                                    },
                                    {
                                        "@type": "ListItem",
                                        "position": 4,
                                        "name": `For ${role.role}s`,
                                        "item": `https://boopsign.com/contracts/${slug}/${roleSlug}`
                                    }
                                ]
                            },
                            {
                                "@context": "https://schema.org",
                                "@type": "FAQPage",
                                "mainEntity": [
                                    {
                                        "@type": "Question",
                                        "name": `Is this ${template.name} suitable for all ${role.role}s?`,
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": `Yes, this template has been tailored to include clauses commonly required by ${role.role}s while maintaining broad legal applicability.`
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "Do I need a lawyer to review this contract?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "While our templates are professionally drafted, we always recommend having a local legal professional review your final document to ensure compliance with specific local regulations."
                                        }
                                    }
                                ]
                            }
                        ]),
                    }}
                />

                <TemplatePageHeader
                    title={`${template.name} for ${role.role}s`}
                    subtitle={`A tailored ${template.name.toLowerCase()} for freelance ${role.role.toLowerCase()}s to ${role.benefit}.`}
                    category={role.industry}
                    templateId={template.slug} // We'll map this to the generic ID in the editor
                />

                {/* Trust Indicators */}
                <div className="border-b border-slate-100 bg-white py-6">
                    <div className="container mx-auto px-4 flex flex-wrap justify-center gap-6 md:gap-12 opacity-60">
                        <div className="flex items-center gap-2">
                            <Shield className="size-4 text-slate-400" />
                            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Legally Binding</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Check className="size-4 text-slate-400" />
                            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">ESIGN Compliant</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Briefcase className="size-4 text-slate-400" />
                            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Industry Standard</span>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <section className="py-16 md:py-24" id="preview">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

                            {/* Left Content Column */}
                            <div className="lg:col-span-2 space-y-24">

                                {/* Introduction - The "Why" */}
                                <div className="prose prose-slate max-w-none">
                                    <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">
                                        Why {role.role}s Need a Specific {template.name}
                                    </h2>
                                    <p className="text-lg text-slate-600 leading-relaxed">
                                        Standard contracts often fail to protect the unique needs of a <strong>{role.role}</strong>.
                                        You aren't just a generic contractor; you deal with specific liabilities like <em>{role.painPoint}</em>.
                                    </p>
                                    <p className="text-slate-600">
                                        This <strong>{template.name}</strong> is adapted to cover the nuances of {role.industry}.
                                        It ensures that your {template.legalContext.toLowerCase()} while specifically addressing the workflows of a modern {role.role.toLowerCase()}.
                                    </p>
                                </div>

                                {/* Document Preview - Pure PDF */}
                                {(template.pdfUrl || template.docUrl) && (
                                    <div className="md:space-y-6 md:pt-12">
                                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Contract Preview</h2>
                                        <WordViewer fileUrl={template.pdfUrl || template.docUrl || ""} />

                                    </div>
                                )}

                                {/* What's Inside - Merging Template Features + Role Clauses */}
                                <div>
                                    <div className="text-center mb-12">
                                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Tailored for {role.industry} Pros</h2>
                                        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                                            Combines standard legal protection with niche-specific safeguards.
                                        </p>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* Role Specifics */}
                                        {role.specificClauses.slice(0, 2).map((clause, idx) => (
                                            <Card key={`role-${idx}`} className="bg-blue-50 border-blue-100 shadow-none">
                                                <CardContent className="p-6">
                                                    <div className="size-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                                                        <Briefcase className="size-5" />
                                                    </div>
                                                    <h3 className="font-bold text-slate-900 text-lg mb-2">{role.role} Special:</h3>
                                                    <p className="text-slate-700 font-medium">{clause}</p>
                                                </CardContent>
                                            </Card>
                                        ))}

                                        {/* Template Standard Features */}
                                        {template.keyFeatures.slice(0, 2).map((feature, idx) => (
                                            <Card key={`base-${idx}`} className="bg-white border-slate-200">
                                                <CardContent className="p-6">
                                                    <div className="size-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center mb-4">
                                                        <Shield className="size-5" />
                                                    </div>
                                                    <h3 className="font-bold text-slate-900 text-lg mb-2">Standard Protection:</h3>
                                                    <p className="text-slate-600">{feature}</p>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>

                                {/* How to Use Section */}
                                <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100">
                                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-8">
                                        How to Use This {template.name}
                                    </h2>
                                    <div className="space-y-8">
                                        <div className="flex gap-4">
                                            <div className="size-10 rounded-full bg-white border border-slate-200 text-slate-900 flex items-center justify-center font-bold flex-shrink-0 shadow-sm">1</div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 text-lg mb-2">Review Role-Specific Clauses</h3>
                                                <p className="text-slate-600 leading-relaxed">
                                                    We've pre-filled clauses tailored for <strong>{role.industry}</strong> work. Check sections regarding {role.specificClauses[0].toLowerCase()} and {role.specificClauses[1].toLowerCase()} to ensure they match your project specifics.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="size-10 rounded-full bg-white border border-slate-200 text-slate-900 flex items-center justify-center font-bold flex-shrink-0 shadow-sm">2</div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 text-lg mb-2">Fill Project Variables</h3>
                                                <p className="text-slate-600 leading-relaxed">
                                                    Customize the bracketed information including Client Name, Project Start Date, and Payment Terms. Be specific about your deliverables to avoid scope creep later.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="size-10 rounded-full bg-white border border-slate-200 text-slate-900 flex items-center justify-center font-bold flex-shrink-0 shadow-sm">3</div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 text-lg mb-2">Send for eSignature</h3>
                                                <p className="text-slate-600 leading-relaxed">
                                                    Enter your client's email address. Boopsign will send a secure link allowing them to sign on any device without creating an account. You'll receive a notification instantly when they view and sign.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Common Pitfalls Section */}
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-8">
                                        Avoid These Common {role.role} Mistakes
                                    </h2>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <Card className="bg-amber-50 border-amber-100 shadow-none">
                                            <CardContent className="p-6">
                                                <div className="size-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                                                    <span className="font-black text-lg">1</span>
                                                </div>
                                                <h3 className="font-bold text-slate-900 mb-2">Vague Deliverables</h3>
                                                <p className="text-sm text-slate-600 leading-relaxed">
                                                    Failing to define exactly what 'finished' looks like often leads to endless unpaid revision cycles.
                                                </p>
                                            </CardContent>
                                        </Card>
                                        <Card className="bg-amber-50 border-amber-100 shadow-none">
                                            <CardContent className="p-6">
                                                <div className="size-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                                                    <span className="font-black text-lg">2</span>
                                                </div>
                                                <h3 className="font-bold text-slate-900 mb-2">Ignoring IP Rights</h3>
                                                <p className="text-sm text-slate-600 leading-relaxed">
                                                    Accidentally transferring ownership of your working files or background IP to the client perfectly.
                                                </p>
                                            </CardContent>
                                        </Card>
                                        <Card className="bg-amber-50 border-amber-100 shadow-none">
                                            <CardContent className="p-6">
                                                <div className="size-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                                                    <span className="font-black text-lg">3</span>
                                                </div>
                                                <h3 className="font-bold text-slate-900 mb-2">Verbal Agreements</h3>
                                                <p className="text-sm text-slate-600 leading-relaxed">
                                                    Starting work without a signature dramatically increases the chance of scope creep and late payment.
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>

                                {/* Legal Glossary */}
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-8">
                                        Legal Terms Glossary
                                    </h2>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                                            <span className="font-bold text-slate-900 block mb-1">Indemnification</span>
                                            <span className="text-sm text-slate-500">Protection against financial loss or legal liability.</span>
                                        </div>
                                        <div className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                                            <span className="font-bold text-slate-900 block mb-1">Force Majeure</span>
                                            <span className="text-sm text-slate-500">Unforeseeable circumstances that prevent contract fulfillment.</span>
                                        </div>
                                        <div className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                                            <span className="font-bold text-slate-900 block mb-1">Severability</span>
                                            <span className="text-sm text-slate-500">If one part of the contract is invalid, the rest remains valid.</span>
                                        </div>
                                        <div className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                                            <span className="font-bold text-slate-900 block mb-1">Governing Law</span>
                                            <span className="text-sm text-slate-500">Which state or country's laws apply to the agreement.</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
                                    <div className="relative z-10">
                                        <h2 className="text-2xl md:text-3xl font-black mb-8">Stop sending Word docs to clients</h2>
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-4 opacity-80">
                                                <h3 className="text-xl font-bold border-b border-slate-700 pb-2">The Old Way</h3>
                                                <ul className="space-y-3">
                                                    <li className="flex gap-2 text-sm"><span className="text-red-400">×</span> Email attachment ping-pong</li>
                                                    <li className="flex gap-2 text-sm"><span className="text-red-400">×</span> Client needs a printer/scanner</li>
                                                    <li className="flex gap-2 text-sm"><span className="text-red-400">×</span> No legal audit trail</li>
                                                    <li className="flex gap-2 text-sm"><span className="text-red-400">×</span> "I'll sign it next week"</li>
                                                </ul>
                                            </div>
                                            <div className="space-y-4">
                                                <h3 className="text-xl font-bold text-blue-400 border-b border-slate-700 pb-2">The Boopsign Way</h3>
                                                <ul className="space-y-3">
                                                    <li className="flex gap-2 text-sm font-bold"><Check className="size-4 text-blue-400" /> Instant mobile signing</li>
                                                    <li className="flex gap-2 text-sm font-bold"><Check className="size-4 text-blue-400" /> No client account needed</li>
                                                    <li className="flex gap-2 text-sm font-bold"><Check className="size-4 text-blue-400" /> Binds with ESIGN Act types</li>
                                                    <li className="flex gap-2 text-sm font-bold"><Check className="size-4 text-blue-400" /> 3x Faster Turnaround</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Decorative Logic for background */}
                                    <div className="absolute -bottom-24 -right-24 size-64 bg-blue-600 rounded-full blur-3xl opacity-20" />
                                </div>


                                {/* FAQ Section Tailored to Role */}
                                <div className="border-t border-slate-100 pt-16">
                                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-12">FAQs for {role.role}s</h2>
                                    <div className="space-y-6">
                                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                            <h3 className="font-bold text-slate-900 mb-2">Can I use this {template.name} for international clients?</h3>
                                            <p className="text-sm text-slate-600">Yes. E-signatures collected via Boopsign are compliant with major international laws like eIDAS (Europe), making this ideal for {role.role}s working with global clients.</p>
                                        </div>
                                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                            <h3 className="font-bold text-slate-900 mb-2">Does this protect my specific IP rights?</h3>
                                            <p className="text-sm text-slate-600">This template includes clauses specifically designed for {role.industry}, helping you define exactly what ownership rights transfer to the client and what you retain (like portfolio rights).</p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Sidebar CTA */}
                            <div className="space-y-8 lg:sticky lg:top-24">
                                <TemplateSidebar
                                    title={`${template.name}`}
                                    subtitle={`Ready to professionalize your ${role.role.toLowerCase()} business?`}
                                    buttonText="Customize & Sign Free"
                                    templateId={template.slug} // Maps to the generic template in the system
                                    templateTitle={`${role.role} ${template.name}`}
                                    docUrl={template.docUrl}
                                    pdfUrl={template.pdfUrl}
                                    stats={[
                                        { label: "Used by", value: `200+ ${role.role}s` },
                                        { label: "Setup Time", value: "60 Seconds" }
                                    ]}
                                />
                            </div>

                        </div>
                    </div>
                </section>

                {/* Localized Intent Section (SEO Juice) */}
                <section className="py-12 bg-slate-50 border-t border-slate-100">
                    <div className="container mx-auto px-4 text-center">
                        <p className="text-sm text-slate-400">
                            Valid for freelance {role.role.toLowerCase()}s in the United States, United Kingdom, Canada, Australia, and 180+ other countries.
                        </p>
                    </div>
                </section>

            </main>
        </PdfDimensionsProvider >
    );
}
