import Cta from "@/components/cta";
import { MDXContent } from "@/components/mdx/MDXContent";
import { allLandingPages } from "content-collections";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Import our new MDX components
import HeroSection from "@/components/mdx/HeroSection";
import WhyUseSection from "@/components/mdx/WhyUseSection";
import UseCaseSection from "@/components/mdx/UseCaseSection";
import ComparisonTable from "@/components/mdx/ComparisonTable";
import FAQSection from "@/components/mdx/FAQSection";

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
