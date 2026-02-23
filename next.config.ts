import { withContentCollections } from "@content-collections/next";
import fs from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,  // Enable Cache Components for Next.js 16
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
  // Image optimization
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "majestic-fox-274.convex.cloud",
      },
      {
        protocol: "https",
        hostname: "2d9wfb370a.ufs.sh",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc"
      }
    ],
  },
  // Compression
  compress: true,
  // Headers for SEO
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
  // Redirects for SEO
  async redirects() {
    const landingDir = path.join(process.cwd(), "content", "landing-pages");
    const reservedRootSlugs = new Set([
      "",
      "api",
      "alternatives",
      "blog",
      "contracts",
      "dashboard",
      "for-consultants",
      "for-freelancers",
      "for-solo-entrepreneurs",
      "landing",
      "pricing",
      "privacy-policy",
      "sign-in",
      "sign-up",
      "upgrade",
    ]);

    const landingLegacyRedirects = fs.existsSync(landingDir)
      ? fs
          .readdirSync(landingDir)
          .filter((file) => file.endsWith(".mdx"))
          .map((file) => file.replace(/\.mdx$/, ""))
          .filter((slug) => !reservedRootSlugs.has(slug))
          .map((slug) => ({
            source: `/${slug}`,
            destination: `/landing/${slug}`,
            permanent: true,
          }))
      : [];

    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "boopsign.com",
          },
        ],
        destination: "https://www.boopsign.com/:path*",
        permanent: true,
      },
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/realestate",
        destination: "/landing/real-estate-document-signing",
        permanent: true,
      },
      {
        source: "/real-estate",
        destination: "/landing/real-estate-document-signing",
        permanent: true,
      },
      {
        source: "/healthcare",
        destination: "/landing/healthcare-document-signing",
        permanent: true,
      },
      {
        source: "/fintech",
        destination: "/landing/fintech-document-signing",
        permanent: true,
      },
      {
        source: "/financial-services",
        destination: "/landing/fintech-document-signing",
        permanent: true,
      },
      {
        source: "/education",
        destination: "/landing/education-document-signing",
        permanent: true,
      },
      {
        source: "/freelancers",
        destination: "/landing/esignature-for-freelancers",
        permanent: true,
      },
      {
        source: "/consultants",
        destination: "/landing/esignature-for-consultants",
        permanent: true,
      },
      {
        source: "/online-signature",
        destination: "/online-signature-maker",
        permanent: true
      },
      {
        source: "/freelance-contract-template",
        destination: "/contracts/independent-contractor-agreement",
        permanent: true
      },
      {
        source: "/login",
        destination: "/sign-in",
        permanent: true
      },
      {
        source: "/log-in",
        destination: "/sign-in",
        permanent: true
      },
      {
        source: "/signin",
        destination: "/sign-in",
        permanent: true
      },
      {
        source: "/document-security-guide",
        destination: "/blog/document-security-guide",
        permanent: true,
      },
      {
        source: "/electronic-signature-laws",
        destination: "/blog/electronic-signature-laws",
        permanent: true,
      },
      {
        source: "/esignature-vs-digital-signature",
        destination: "/blog/esignature-vs-digital-signature",
        permanent: true,
      },
      {
        source: "/how-to-create-electronic-signature",
        destination: "/blog/how-to-create-electronic-signature",
        permanent: true,
      },
      {
        source: "/contract-signing-best-practices",
        destination: "/blog/contract-signing-best-practices",
        permanent: true,
      },
      {
        source: "/pandadoc-alternative",
        destination: "/alternatives/pandadoc-alternative",
        permanent: true,
      },
      {
        source: "/adobe-sign-alternative",
        destination: "/alternatives/adobe-sign-alternative",
        permanent: true,
      },
      {
        source: "/hellosign-alternative",
        destination: "/alternatives/hellosign-alternative",
        permanent: true,
      },
      {
        source: "/dropbox-sign-alternative",
        destination: "/alternatives/dropbox-sign-alternative",
        permanent: true,
      },
      {
        source: "/signnow-alternative",
        destination: "/alternatives/signnow-alternative",
        permanent: true,
      },
      {
        source: "/zoho-sign-alternative",
        destination: "/alternatives/zoho-sign-alternative",
        permanent: true,
      },
      {
        source: "/signrequest-alternative",
        destination: "/alternatives/signrequest-alternative",
        permanent: true,
      },
      {
        source: "/rightsignature-alternative",
        destination: "/alternatives/rightsignature-alternative",
        permanent: true,
      },
      {
        source: "/signwell-alternative",
        destination: "/alternatives/signwell-alternative",
        permanent: true,
      },
      {
        source: "/boldsign-alternative",
        destination: "/alternatives/boldsign-alternative",
        permanent: true,
      },
      {
        source: "/dotloop-alternative",
        destination: "/alternatives/dotloop-alternative",
        permanent: true,
      },
      ...landingLegacyRedirects,
    ];
  },
};

export default withContentCollections(nextConfig);
