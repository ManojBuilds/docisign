import { defineDocumentType, defineNestedType, makeSource } from 'contentlayer2/source-files'
import remarkGfm from 'remark-gfm'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    date: { type: 'date', required: true },
    image: { type: 'string', required: false },
    category: { type: 'string', required: false, default: 'Article' },
    readingTime: { type: 'string', required: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace(/^blog\//, ''),
    },
    url: {
      type: 'string',
      resolve: (doc) => `/blog/${doc._raw.flattenedPath.replace(/^blog\//, '')}`,
    },
  },
}))

const SEO = defineNestedType(() => ({
  name: 'SEO',
  fields: {
    title: { type: 'string', required: false },
    description: { type: 'string', required: false },
    keywords: { type: 'list', of: { type: 'string' }, required: false },
    canonical: { type: 'string', required: false },
  },
}))

const FAQ = defineNestedType(() => ({
  name: 'FAQ',
  fields: {
    id: { type: 'string', required: true },
    question: { type: 'string', required: true },
    answer: { type: 'string', required: true },
  },
}))

const Feature = defineNestedType(() => ({
  name: 'Feature',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    icon: { type: 'string', required: false },
  },
}))

const WhatsInside = defineNestedType(() => ({
  name: 'WhatsInside',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    features: { type: 'list', of: Feature, required: false },
  },
}))

const WhyUse = defineNestedType(() => ({
  name: 'WhyUse',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    benefits: { type: 'list', of: { type: 'string' }, required: false },
    theme: { type: 'string', required: false },
  },
}))

const Stat = defineNestedType(() => ({
  name: 'Stat',
  fields: {
    label: { type: 'string', required: true },
    value: { type: 'string', required: true },
  },
}))

const Sidebar = defineNestedType(() => ({
  name: 'Sidebar',
  fields: {
    title: { type: 'string', required: true },
    subtitle: { type: 'string', required: false },
    stats: { type: 'list', of: Stat, required: false },
  },
}))

const Testimonial = defineNestedType(() => ({
  name: 'Testimonial',
  fields: {
    quote: { type: 'string', required: true },
    author: { type: 'string', required: true },
    role: { type: 'string', required: false },
    stars: { type: 'number', required: false },
  },
}))

const Variable = defineNestedType(() => ({
  name: 'Variable',
  fields: {
    key: { type: 'string', required: true },
    label: { type: 'string', required: true },
    required: { type: 'boolean', required: false, default: false },
    type: { type: 'string', required: true }, // e.g., 'text', 'date', 'number', 'textarea'
    placeholder: { type: 'string', required: false },
    defaultValue: { type: 'string', required: false },
  },
}))

export const Template = defineDocumentType(() => ({
  name: 'Template',
  filePathPattern: `templates/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    date: { type: 'date', required: true },
    downloadUrl: { type: 'string', required: false },
    category: { type: 'string', required: false },
    subtitle: { type: 'string', required: false },
    seo: { type: 'nested', of: SEO, required: false },
    schema: { type: 'json', required: false },
    faqs: { type: 'list', of: FAQ, required: false },
    whatsInside: { type: 'nested', of: WhatsInside, required: false },
    whyUse: { type: 'nested', of: WhyUse, required: false },
    sidebar: { type: 'nested', of: Sidebar, required: false },
    testimonial: { type: 'nested', of: Testimonial, required: false },
    variables: { type: 'list', of: Variable, required: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace(/^templates\//, ''),
    },
    url: {
      type: 'string',
      resolve: (doc) => `/templates/${doc._raw.flattenedPath.replace(/^templates\//, '')}`,
    },
  },
}))

const Hero = defineNestedType(() => ({
  name: 'Hero',
  fields: {
    badge: { type: 'string', required: false },
    title: { type: 'string', required: true },
    subtitle: { type: 'string', required: true },
    highlights: { type: 'list', of: { type: 'string' }, required: false },
    cta: { type: 'string', required: false },
    testimonial: { type: 'string', required: false },
  },
}))

const CardItem = defineNestedType(() => ({
  name: 'CardItem',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    icon: { type: 'string', required: false },
    color: { type: 'string', required: false },
  },
}))

const UseCaseSection = defineNestedType(() => ({
  name: 'UseCaseSection',
  fields: {
    title: { type: 'string', required: true },
    items: { type: 'list', of: { type: 'string' }, required: true },
    stats: { type: 'list', of: Stat, required: false },
  },
}))

const ComparisonTableRow = defineNestedType(() => ({
  name: 'ComparisonTableRow',
  fields: {
    feature: { type: 'string', required: true },
    us: { type: 'string', required: true },
    them: { type: 'string', required: true },
  },
}))

const ComparisonTable = defineNestedType(() => ({
  name: 'ComparisonTable',
  fields: {
    title: { type: 'string', required: true },
    headers: { type: 'list', of: { type: 'string' }, required: true },
    rows: { type: 'list', of: ComparisonTableRow, required: true },
  },
}))

export const LandingPage = defineDocumentType(() => ({
  name: 'LandingPage',
  filePathPattern: `landing-pages/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    date: { type: 'date', required: true },
    category: { type: 'string', required: false },
    hero: { type: 'nested', of: Hero, required: false },
    whyUse: { type: 'nested', of: WhyUse, required: false },
    cardItems: { type: 'list', of: CardItem, required: false },
    useCaseSection: { type: 'nested', of: UseCaseSection, required: false },
    comparisonTable: { type: 'nested', of: ComparisonTable, required: false },
    faqs: { type: 'list', of: FAQ, required: false },
    seo: { type: 'nested', of: SEO, required: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace(/^landing-pages\//, ''),
    },
    url: {
      type: 'string',
      resolve: (doc) => `/${doc._raw.flattenedPath.replace(/^landing-pages\//, '')}`,
    },
  },
}))

export const Comparison = defineDocumentType(() => ({
  name: 'Comparison',
  filePathPattern: `alternatives/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    date: { type: 'date', required: true },
    competitorName: { type: 'string', required: false },
    priceComparison: { type: 'json', required: false }, // { us: 15, them: 40 }
    pros: { type: 'list', of: { type: 'string' }, required: false },
    cons: { type: 'list', of: { type: 'string' }, required: false },
    keywords: { type: 'list', of: { type: 'string' }, required: false },
    canonical: { type: 'string', required: false },
    openGraph: { type: 'json', required: false },
    twitter: { type: 'json', required: false },
    robots: { type: 'json', required: false },
    faq: { type: 'json', required: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace(/^alternatives\//, ''),
    },
    url: {
      type: 'string',
      resolve: (doc) => `/alternatives/${doc._raw.flattenedPath.replace(/^alternatives\//, '')}`,
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Template, Comparison, LandingPage],
  disableImportAliasWarning: true,
  mdx: {
    remarkPlugins: [remarkGfm],
  },
})
