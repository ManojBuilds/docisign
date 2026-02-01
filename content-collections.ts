import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import remarkGfm from "remark-gfm";
import { z } from "zod";

// Define nested types first
const SEO = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  canonical: z.string().optional(),
});

const FAQ = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
});


const Stat = z.object({
  label: z.string(),
  value: z.string(),
});

const WhyUse = z.object({
  title: z.string(),
  description: z.string(),
  benefits: z.array(z.string()).optional(),
  theme: z.string().optional(),
});


const Hero = z.object({
  badge: z.string().optional(),
  title: z.string(),
  subtitle: z.string(),
  highlights: z.array(z.string()).optional(),
  cta: z.string().optional(),
  testimonial: z.string().optional(),
});

const CardItem = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
  color: z.string().optional(),
});

const UseCaseSection = z.object({
  title: z.string(),
  items: z.array(z.string()),
  stats: z.array(Stat).optional(),
});

const ComparisonTableRow = z.object({
  feature: z.string(),
  us: z.string(),
  them: z.string(),
});

const ComparisonTable = z.object({
  title: z.string(),
  headers: z.array(z.string()),
  rows: z.array(ComparisonTableRow),
});

// Posts collection
const posts = defineCollection({
  name: "posts",
  directory: "content/blog",
  include: "*.mdx",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    image: z.string().optional(),
    category: z.string().optional().default('Article'),
    readingTime: z.string().optional(),
    status: z.enum(['published', 'draft']).optional().default('published'),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      remarkPlugins: [remarkGfm],
    });
    return {
      ...document,
      slug: document._meta.fileName.replace(/^.*[\\/]/, '').replace(/\.mdx$/, ''),
      url: `/blog/${document._meta.fileName.replace(/^.*[\\/]/, '').replace(/\.mdx$/, '')}`,
      mdx,
    };
  },
});


// Landing Pages collection
const landingPages = defineCollection({
  name: "landingPages",
  directory: "content/landing-pages",
  include: "*.mdx",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.string().optional(),
    hero: Hero.optional(),
    whyUse: WhyUse.optional(),
    cardItems: z.array(CardItem).optional(),
    useCaseSection: UseCaseSection.optional(),
    comparisonTable: ComparisonTable.optional(),
    faqs: z.array(FAQ).optional(),
    seo: SEO.optional(),
    schema: z.any().optional(),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      remarkPlugins: [remarkGfm],
    });
    return {
      ...document,
      slug: document._meta.fileName.replace(/^.*[\\/]/, '').replace(/\.mdx$/, ''),
      url: `/${document._meta.fileName.replace(/^.*[\\/]/, '').replace(/\.mdx$/, '')}`,
      mdx,
    };
  },
});

// Comparisons collection
const comparisons = defineCollection({
  name: "comparisons",
  directory: "content/alternatives",
  include: "*.mdx",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    competitorName: z.string().optional(),
    priceComparison: z.any().optional(), // { us: 15, them: 40 }
    pros: z.array(z.string()).optional(),
    cons: z.array(z.string()).optional(),
    keywords: z.array(z.string()).optional(),
    canonical: z.string().optional(),
    openGraph: z.any().optional(),
    twitter: z.any().optional(),
    robots: z.any().optional(),
    faq: z.any().optional(),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      remarkPlugins: [remarkGfm],
    });
    return {
      ...document,
      slug: document._meta.fileName.replace(/^.*[\\/]/, '').replace(/\.mdx$/, ''),
      url: `/alternatives/${document._meta.fileName.replace(/^.*[\\/]/, '').replace(/\.mdx$/, '')}`,
      mdx,
    };
  },
});

export default defineConfig({
  collections: [posts, landingPages, comparisons],
});
