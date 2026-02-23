import {
  allComparisons,
  allLandingPages,
  allPosts
} from "content-collections";
import { FREELANCE_ROLES } from "@/lib/seo/freelancer-roles";
import { ALL_TEMPLATES } from "@/lib/seo/all-templates";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.boopsign.com";
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
      url: `${baseUrl}/for-solo-entrepreneurs`,
      lastModified: defaultLastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/for-freelancers`,
      lastModified: defaultLastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/for-consultants`,
      lastModified: defaultLastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/online-signature-maker`,
      lastModified: defaultLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/contract-signing-best-practices`,
      lastModified: defaultLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/document-security-guide`,
      lastModified: defaultLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/electronic-signature-laws`,
      lastModified: defaultLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/esignature-vs-digital-signature`,
      lastModified: defaultLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/how-to-create-electronic-signature`,
      lastModified: defaultLastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/landing/mobile-electronic-signature`,
      lastModified: defaultLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/landing/no-account-esignature`,
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
      url: `${baseUrl}/contracts`,
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

  // Dynamic Landing Pages
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

  // 1. Base Template Pages (e.g. /contracts/consulting-agreement)
  const templateRoutes: MetadataRoute.Sitemap = ALL_TEMPLATES.map((template) => ({
    url: `${baseUrl}/contracts/${template.slug}`,
    lastModified: defaultLastModified,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // 2. Freelance Role Hubs (e.g. /contracts/freelance/designer)
  const roleHubRoutes: MetadataRoute.Sitemap = FREELANCE_ROLES.map((role) => ({
    url: `${baseUrl}/contracts/freelance/${role.slug}`,
    lastModified: defaultLastModified,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // 3. Matrix Combination Pages (e.g. /contracts/consulting-agreement/for-designer)
  const matrixRoutes: MetadataRoute.Sitemap = [];
  ALL_TEMPLATES.forEach((template) => {
    FREELANCE_ROLES.forEach((role) => {
      // Only include compatible combinations
      const isCompatible =
        template.category === "General" ||
        (role.tags && role.tags.includes(template.category)) ||
        (template.relatedRoles && template.relatedRoles.includes(role.slug));

      if (isCompatible) {
        matrixRoutes.push({
          url: `${baseUrl}/contracts/${template.slug}/for-${role.slug}`,
          lastModified: defaultLastModified,
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    });
  });

  return [
    ...staticRoutes,
    ...blogRoutes,
    ...landingPageRoutes,
    ...comparisonRoutes,
    ...templateRoutes,
    ...roleHubRoutes,
    ...matrixRoutes,
  ];
}
