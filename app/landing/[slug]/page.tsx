import { MDXContent } from "@/components/mdx/MDXContent";
import { allLandingPages } from "content-collections";
import { Metadata } from "next";
import dynamicImport from "next/dynamic";
import { notFound } from "next/navigation";

// MIGRATED from: export const dynamic = "force-static"
// → Add "use cache" to opt into caching (dynamic is now the default)
// MIGRATED from: export const dynamicParams = false
// → Use generateStaticParams (already present in this file) to define static routes

// Import our new MDX components
import HeroSection from "@/components/mdx/HeroSection";

const Cta = dynamicImport(() => import("@/components/cta"));
const WhyUseSection = dynamicImport(() => import("@/components/mdx/WhyUseSection"));
const UseCaseSection = dynamicImport(() => import("@/components/mdx/UseCaseSection"));
const ComparisonTable = dynamicImport(() => import("@/components/mdx/ComparisonTable"));
const FAQSection = dynamicImport(() => import("@/components/mdx/FAQSection"));

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return allLandingPages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = allLandingPages.find((p) => p.slug === slug);

  if (!page) return {};

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || page.description,
    keywords: page.seo?.keywords,
    alternates: {
      canonical: page.seo?.canonical,
    },
  };
}

export default async function LandingPageLayout({ params }: Props) {
  const { slug } = await params;
  const page = allLandingPages.find((p) => p.slug === slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-16 md:gap-24 py-8 md:py-16">
      {page.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(page.schema) }}
        />
      )}
      {/* Render structured content sections */}
      {page.hero && (
        <HeroSection
          badge={page.hero.badge}
          title={page.hero.title}
          subtitle={page.hero.subtitle}
          highlights={page.hero.highlights}
          testimonial={page.hero.testimonial}
        />
      )}

      {page.whyUse && (
        <WhyUseSection
          title={page.whyUse.title}
          description={page.whyUse.description}
          cardItems={page.cardItems}
        />
      )}

      {page.useCaseSection && (
        <UseCaseSection
          title={page.useCaseSection.title}
          items={page.useCaseSection.items}
          stats={page.useCaseSection.stats}
        />
      )}

      {page.comparisonTable && (
        <ComparisonTable
          title={page.comparisonTable.title}
          headers={page.comparisonTable.headers}
          rows={page.comparisonTable.rows}
        />
      )}

      {/* Render MDX content */}
      <section className="px-4">
        <div className="container mx-auto max-w-4xl prose prose-slate">
          <MDXContent code={page.mdx} />
        </div>
      </section>

      {page.faqs && (
        <FAQSection
          heading={`${page.category || "General"} eSignatures: Frequently Asked Questions`}
          items={page.faqs}
          category={page.category}
        />
      )}

      {/* Final CTA - always present */}
      <Cta />
    </div>
  );
}
