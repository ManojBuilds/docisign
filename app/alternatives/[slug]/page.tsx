import StartTrialBtn from "@/components/StartTrialBtn";
import Cta from "@/components/cta";
import Faq from "@/components/faq";
import { MDXContent } from "@/components/mdx/MDXContent";
import { Badge } from "@/components/ui/badge";
import { allComparisons } from "content-collections";
import { ArrowRight, CheckCircle, Clock, DollarSign, Zap } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allComparisons.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const comparison = allComparisons.find((p) => p.slug === slug);

  if (!comparison) return {};

  return {
    title: comparison.title,
    description: comparison.description,
    keywords: comparison.keywords,
    alternates: {
      canonical: comparison.canonical,
    },
    openGraph: comparison.openGraph ? {
      title: comparison.openGraph.title,
      description: comparison.openGraph.description,
      url: comparison.openGraph.url,
      type: comparison.openGraph.type,
      images: comparison.openGraph.images,
    } : undefined,
    twitter: comparison.twitter ? {
      card: comparison.twitter.card,
      title: comparison.twitter.title,
      description: comparison.twitter.description,
      images: comparison.twitter.images,
    } : undefined,
    robots: comparison.robots ? {
      index: comparison.robots.index,
      follow: comparison.robots.follow,
    } : undefined,
  };
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params;
  const comparison = allComparisons.find((p) => p.slug === slug);
  if (!comparison) return notFound();

  const faqItems = comparison.faq || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Schema Markups */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: `${comparison.title}`,
            image: comparison.openGraph?.images?.[0]?.url || "/images/default-og-image.jpg",
            description: comparison.description,
            url: comparison.canonical || `https://boopsign.com/alternatives/${slug}`,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web, iOS, Android",
            brand: { "@type": "Brand", name: "Boopsign" },
            offers: {
              "@type": "Offer",
              price: comparison.priceComparison?.us?.toString() || "15.00",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
          }),
        }}
      />

      {/* Hero Section */}
      <header className="bg-gradient-to-b from-blue-50/50 via-white to-white border-b border-slate-100 py-24 md:py-12 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-full bg-[url('/optimized-images/noise.webp')] opacity-[0.03]" />

        {/* Background Decorations */}
        <div className="absolute -top-1/4 left-0 size-[600px] bg-blue-100/40 rounded-full blur-[150px]" />
        <div className="absolute -bottom-1/4 -right-1/4 size-[800px] bg-indigo-100/20 rounded-full blur-[150px]" />

        <div className="container mx-auto px-4 max-w-6xl relative z-10 text-center">
          <Link
            href="/alternatives"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-blue-600 mb-16 transition-all group px-4 py-2 rounded-full hover:bg-white ring-1 ring-transparent hover:ring-slate-200"
          >
            <ArrowRight className="size-4 rotate-180 transition-transform group-hover:-translate-x-1" /> Back to Alternatives
          </Link>

          <div className="flex items-center justify-center gap-4 text-xs font-black tracking-[0.3em] text-blue-600 mb-10 uppercase">
            <Badge variant="outline" className="bg-white border-blue-100 text-blue-600 px-4 py-1.5 rounded-lg shadow-sm">Updated for 2026</Badge>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Clock className="size-3.5" />
              <span>{new Date(comparison.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-7xl font-black tracking-tight text-slate-900 mb-8 leading-[1.05] font-primary">
            {comparison.competitorName} <span className="text-slate-300 font-light italic">vs</span> <span className="text-white bg-blue-600 px-4 py-1 rounded-2xl rotate-2 inline-block shadow-xl shadow-blue-600/20">Boopsign</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl mx-auto mb-12 font-medium">
            Tired of {comparison.competitorName}&apos;s complexity? Switch to the mobile-first alternative that&apos;s <span className="text-white font-semibold px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg shadow-md">built for freelancers</span>.
          </p>

          <div className="grid md:grid-cols-2 items-center gap-8 md:gap-0 mb-16 max-w-4xl mx-auto relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center">
              <div className="size-16 bg-white rounded-full flex items-center justify-center font-black text-slate-400 shadow-2xl border border-slate-100">VS</div>
            </div>

            <div className="bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-200 shadow-lg relative md:rotate-[-3deg] md:hover:rotate-[-1deg] transition-transform duration-300">
              <div className="absolute top-0 right-0 p-4">
                <Badge variant="outline" className="text-slate-400 font-semibold border-slate-200 uppercase tracking-widest text-[10px] bg-white">The Giant</Badge>
              </div>
              <h3 className="text-xl font-semibold text-slate-500 mb-4">{comparison.competitorName}</h3>
              <div className="text-4xl font-black text-slate-400 line-through mb-2">${comparison.priceComparison?.them || '45'}<span className="text-sm font-semibold text-slate-400 ml-1">/mo</span></div>
              <p className="text-sm text-slate-500 font-medium">Limited documents & complex dashboard</p>
            </div>

            <div className="bg-blue-600 p-8 rounded-3xl shadow-2xl shadow-blue-600/30 relative md:scale-110 z-20 md:rotate-[3deg] md:hover:rotate-[1deg] transition-transform duration-300">
              <div className="absolute top-0 right-0 p-4">
                <Badge variant="secondary" className="bg-blue-500/50 text-white font-semibold border-transparent uppercase tracking-widest text-[10px]">The Winner</Badge>
              </div>
              <div className="absolute -bottom-10 -right-10 size-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700" />
              <h3 className="text-xl font-semibold text-blue-100 mb-4 tracking-tight">Boopsign</h3>
              <div className="text-4xl font-black text-white mb-2">${comparison.priceComparison?.us || '15'}<span className="text-sm font-semibold text-blue-200 ml-1">/mo</span></div>
              <p className="text-sm text-blue-100 font-medium">Unlimited signatures & zero friction</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <StartTrialBtn />
            <div className="flex items-center gap-3 text-sm text-slate-500 font-semibold">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="size-9 rounded-full border-2 border-white bg-slate-200 ring-2 ring-slate-50 shadow-sm overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-300" />
                  </div>
                ))}
              </div>
              <span>Join 2,847+ professionals</span>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-200/60">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { text: "75% Cheaper", icon: <DollarSign className="size-4 text-green-500" /> },
                  { text: "Unlimited Docs", icon: <CheckCircle className="size-4 text-blue-500" /> },
                  { text: "Sign in Seconds", icon: <Clock className="size-4 text-orange-500" /> },
                  { text: "No Login Needed", icon: <Zap className="size-4 text-purple-500" /> }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-center gap-3 text-sm font-semibold text-slate-700 bg-white/50 px-4 py-2 rounded-xl ring-1 ring-slate-200/60">
                    {item.icon}
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>



      {/* Main Content */}
      <main className="container mx-auto px-4 py-20 md:py-32 max-w-6xl flex flex-col lg:flex-row gap-20">
        <div className="flex-1 max-w-4xl mx-auto lg:mx-0">
          <article className="prose prose-slate   max-w-none
            prose-headings:font-primary prose-headings:tracking-tight prose-headings:font-black
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-slate-900 prose-blockquote:border-l-blue-500
            prose-img:rounded-3xl prose-img:ring-1 prose-img:ring-slate-100">
            <MDXContent code={comparison.mdx} />
          </article>

          {/* Comparison Summary Cards */}
          <div className="mt-20 grid md:grid-cols-2 gap-8 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 bg-white border border-slate-100 rounded-full flex items-center justify-center font-black text-slate-200 text-3xl z-10 hidden md:flex">
              VS
            </div>
            <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 hover:scale-[1.02] transition-transform duration-500">
              <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <span className="size-8 bg-slate-200 rounded-lg flex items-center justify-center text-slate-500">×</span>
                The {comparison.competitorName} Way
              </h3>
              <ul className="space-y-6">
                {comparison.cons?.map((con, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600 font-medium">
                    <div className="size-5 rounded-full bg-red-100 flex items-center justify-center mt-1 shrink-0">
                      <ArrowRight className="size-3 text-red-500 rotate-45" />
                    </div>
                    {con}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50/50 rounded-[2.5rem] p-10 border border-blue-100 hover:scale-[1.02] transition-transform duration-500">
              <h3 className="text-2xl font-black text-blue-600 mb-8 flex items-center gap-3">
                <span className="size-8 bg-blue-600 rounded-lg flex items-center justify-center text-white italic">b</span>
                The Boopsign Way
              </h3>
              <ul className="space-y-6">
                {comparison.pros?.map((pro, i) => (
                  <li key={i} className="flex items-start gap-4 text-slate-800 font-semibold">
                    <div className="size-6 rounded-full bg-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/20">
                      <CheckCircle className="size-3.5 text-white" />
                    </div>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* FAQ Section */}
          {faqItems.length > 0 && (
            <section className="border-t border-slate-100">
              <Faq
                heading={`${comparison.competitorName} vs Boopsign: Frequently Asked Questions`}
                items={faqItems}
              />
            </section>
          )}


        </div>

        {/* Sidebar for Desktop */}
        <aside className="hidden lg:block w-80 shrink-0">
          <div className="sticky top-24 space-y-8">
            <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white overflow-hidden relative group">
              <div className="absolute top-0 right-0 -mr-10 -mt-10 size-40 bg-blue-600 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative z-10">
                <h4 className="text-blue-400 font-semibold text-xs uppercase tracking-[0.2em] mb-4">Limited Offer</h4>
                <p className="text-2xl font-black mb-6 leading-tight">Start your <br /> 7-day free trial</p>
                <div className="space-y-4 mb-8">
                  {[
                    "No credit card required",
                    "Unlimited documents",
                    "Unlimited signers",
                    "Setup in 2 mins"
                  ].map(t => (
                    <div key={t} className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                      <CheckCircle className="size-4 text-blue-500" /> {t}
                    </div>
                  ))}
                </div>
                <StartTrialBtn />
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100">
              <h4 className="text-slate-900 font-black text-lg mb-6 leading-tight">Legal Validity</h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
                Boopsign is fully compliant with the ESIGN Act and UETA regulations. Every signature includes:
              </p>
              <ul className="space-y-4">
                {[
                  "Complete Audit Trail",
                  "IP & Timestamp Logs",
                  "Verified Email Auth",
                  "Tamper-proof Seals"
                ].map(t => (
                  <div key={t} className="flex items-center gap-3 text-xs font-semibold text-slate-700 bg-slate-50 px-3 py-2 rounded-lg">
                    <div className="size-1.5 rounded-full bg-blue-600" /> {t}
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </main>

      <div className="pb-20">
        <Cta />
      </div>
    </div>
  );
}
