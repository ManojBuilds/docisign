import { TemplatePageHeader } from "@/components/templates/TemplatePageHeader";
import { PdfDimensionsProvider } from "@/components/PdfDimensionsContext";
import {
    Check,
    FileText,
    Shield, Zap, Users,
    Globe
} from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { FREELANCE_ROLES } from "@/lib/seo/freelancer-roles";
import { ALL_TEMPLATES } from "@/lib/seo/all-templates";
import { ArrowRight } from "lucide-react";

// Dynamic Icon Component
// const Icon = ({ name, className }: { name: string; className?: string }) => {
//     const icons: Record<string, any> = {
//         Check,
//         FileText,
//         Shield,
//         Star,
//         Zap,
//         Clock,
//         DollarSign,
//         TrendingUp,
//         AlertCircle,
//         Smartphone
//     };

//     const LucideIcon = icons[name] || FileText;
//     return <LucideIcon className={className} />;
// };

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    return FREELANCE_ROLES.map((role) => ({
        slug: role.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const roleData = FREELANCE_ROLES.find((r) => r.slug === slug);

    if (!roleData) return {};

    const title = `Legal Contracts for Freelance ${roleData.role}s | Boopsign`;
    const description = `The complete legal toolkit for ${roleData.role}s. Free contract templates including Service Agreements, NDAs, and Leases tailored for the ${roleData.industry} industry.`;

    return {
        title,
        description,
        keywords: [
            `freelance ${roleData.role.toLowerCase()} contract`,
            `${roleData.role.toLowerCase()} agreement template`,
            `freelance ${roleData.role.toLowerCase()} services agreement`,
            "independent contractor agreement",
            "legally binding e-signature"
        ],
        alternates: {
            canonical: `https://boopsign.com/contracts/freelance/${slug}`,
        },
    };
}

export default async function ProgrammaticFreelancerContractPage({ params }: Props) {
    const { slug } = await params;
    const roleData = FREELANCE_ROLES.find((r) => r.slug === slug);

    if (!roleData) {
        notFound();
    }

    const role = roleData.role;
    const industry = roleData.industry;

    const compatibleTemplates = ALL_TEMPLATES.filter(template =>
        template.category === "General" ||
        (roleData.tags && roleData.tags.includes(template.category)) ||
        (template.relatedRoles && template.relatedRoles.includes(roleData.slug))
    );

    return (
        <PdfDimensionsProvider>
            <main className="min-h-screen bg-slate-50/50">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "CollectionPage",
                            "name": `Legal Templates for ${role}`,
                            "description": `Comprehensive collection of legal contracts for ${role}s.`,
                            "mainEntity": {
                                "@type": "ItemList",
                                "itemListElement": compatibleTemplates.map((t, i) => ({
                                    "@type": "ListItem",
                                    "position": i + 1,
                                    "url": `https://boopsign.com/contracts/${t.slug}/for-${slug}`,
                                    "name": `${t.name} for ${role}`
                                }))
                            }
                        }),
                    }}
                />

                <TemplatePageHeader
                    title={`Legal Contracts for ${role}s`}
                    subtitle={`The complete legal toolkit specifically tailored for freelance ${role.toLowerCase()}s in the ${industry} industry.`}
                    category="Role Toolkit"
                />

                {/* Trust Indicators */}
                <div className="border-b border-slate-100 bg-white py-6">
                    <div className="container mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 opacity-60">
                        <div className="flex items-center gap-2">
                            <Users className="size-5 text-slate-400" />
                            <span className="text-sm font-semibold text-slate-600">Used by 2,000+ {role}s</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Shield className="size-5 text-slate-400" />
                            <span className="text-sm font-semibold text-slate-600">Vetted by Experts</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Globe className="size-5 text-slate-400" />
                            <span className="text-sm font-semibold text-slate-600">Valid in 50+ Countries</span>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <section className="py-16" id="templates">
                    <div className="container mx-auto px-4 max-w-6xl">

                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl font-black text-slate-900 mb-6">
                                Essential Documents for {role}s
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Don't rely on generic templates. We've compiled the essential legal documents specifically adapted for the <strong>{industry}</strong> industry.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {compatibleTemplates.map((template) => (
                                <Link
                                    key={template.slug}
                                    href={`/contracts/${template.slug}/for-${slug}`}
                                    className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col h-full"
                                >
                                    <div className="mb-6 flex items-start justify-between">
                                        <div className={`size-12 rounded-xl flex items-center justify-center ${template.id === 'nda' ? 'bg-purple-50 text-purple-600' :
                                            template.id.includes('lease') ? 'bg-emerald-50 text-emerald-600' :
                                                'bg-blue-50 text-blue-600'
                                            }`}>
                                            {template.id === 'nda' ? <Shield className="size-6" /> : <FileText className="size-6" />}
                                        </div>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                                            <ArrowRight className="size-5 text-blue-500" />
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                        {template.name}
                                    </h3>
                                    <p className="text-sm text-slate-500 mb-6 flex-1 leading-relaxed">
                                        {template.description}
                                    </p>

                                    <div className="pt-4 border-t border-slate-50 mt-auto">
                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 group-hover:text-blue-600 transition-colors uppercase tracking-wider">
                                            <span>Customize for {role}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                    </div>
                </section>

                {/* Value Props Section */}
                {/* Custom Clauses Feature Grid */}
                <section className="py-24 bg-white border-t border-slate-200">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="text-center mb-16 max-w-3xl mx-auto">
                            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 mb-4 px-3">Peace of Mind</Badge>
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                                Tailored Protection for {role}s
                            </h2>
                            <p className="text-lg text-slate-600">
                                Generic contracts leave gaps. Our templates include specific clauses designed to prevent the most common disputes in the {industry} industry.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Pain Point Solution */}
                            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                                <div className="size-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-6">
                                    <Shield className="size-6" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">Anti-Liability Shield</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Specific language that protects you from paying for damages related to {roleData.painPoint}.
                                </p>
                            </div>

                            {/* Specific Clauses Loop */}
                            {roleData.specificClauses.map((clause, idx) => (
                                <div key={idx} className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                                    <div className="size-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                                        <Check className="size-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{clause}</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        Clear terms that define exactly what is expected, preventing scope creep and payment arguments.
                                    </p>
                                </div>
                            ))}

                            {/* Industry Standard */}
                            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                                <div className="size-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                                    <Zap className="size-6" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">Get Paid Faster</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Includes professional Late Fee and Deposit clauses standard for {industry} professionals.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-24 bg-white border-t border-slate-100">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <div className="p-8 md:p-16 bg-sky-50 rounded-[2.5rem] text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-5xl font-black mb-6 text-slate-900">Secure your {role.toLowerCase()} business today</h2>
                                <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
                                    Join thousands of freelance professionals who trust Boopsign to get their work protected in record time.
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <Link href="/dashboard" className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-slate-50 transition-colors shadow-lg border border-blue-100">
                                        Get Started for Free
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </PdfDimensionsProvider>
    );
}
