import {
  allComparisons,
  allLandingPages,
  allPosts,
  allTemplates
} from "content-collections";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.Boopsign.com";
  // Use current date for lastModified if not specified in content
  const defaultLastModified = new Date();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: defaultLastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: defaultLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/online-signature-maker`,
      lastModified: defaultLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contract-signing-best-practices`,
      lastModified: defaultLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/document-security-guide`,
      lastModified: defaultLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/electronic-signature-laws`,
      lastModified: defaultLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/esignature-vs-digital-signature`,
      lastModified: defaultLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/how-to-create-electronic-signature`,
      lastModified: defaultLastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mobile-electronic-signature`,
      lastModified: defaultLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/no-account-esignature`,
      lastModified: defaultLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: defaultLastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/sign-up`,
      lastModified: defaultLastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sign-in`,
      lastModified: defaultLastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/templates`,
      lastModified: defaultLastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/alternatives`,
      lastModified: defaultLastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: defaultLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: defaultLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Dynamic Blog Posts
  const blogRoutes: MetadataRoute.Sitemap = allPosts
    .filter((post) => post.status === "published")
    .map((post) => ({
      url: `${baseUrl}${post.url}`,
      lastModified: new Date(post.date) || defaultLastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  // Dynamic Templates
  const templateRoutes: MetadataRoute.Sitemap = allTemplates.map((template) => ({
    url: `${baseUrl}${template.url}`,
    lastModified: new Date(template.date) || defaultLastModified,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Dynamic Landing Pages
  // Note: Landing pages are often at root level or specific paths defined in the file
  const landingPageRoutes: MetadataRoute.Sitemap = allLandingPages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(page.date) || defaultLastModified,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Dynamic Alternatives (Comparisons)
  const comparisonRoutes: MetadataRoute.Sitemap = allComparisons.map((comparison) => ({
    url: `${baseUrl}${comparison.url}`,
    lastModified: new Date(comparison.date) || defaultLastModified,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [
    ...staticRoutes,
    ...blogRoutes,
    ...templateRoutes,
    ...landingPageRoutes,
    ...comparisonRoutes,
  ];
}