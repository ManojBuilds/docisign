import { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.boopsign.com";
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/docusign-alternative`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hellosign-alternative`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/adobe-sign-alternative`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/dropbox-sign-alternative`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,

    },
    {
      url: `${baseUrl}/pandadoc-alternative`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,

    },
    {
      url: `${baseUrl}/signnow-alternative`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,

    },
    {
      url: `${baseUrl}/online-signature-maker`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/signrequest-alternative`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,

    },
    {
      url: `${baseUrl}/zoho-sign-alternative`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,


    },

    {
      url: `${baseUrl}/mobile-electronic-signature`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/no-account-signature`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/sign-up`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sign-in`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];
}