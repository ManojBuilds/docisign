import { withContentCollections } from "@content-collections/next";
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
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/realestate",
        destination: "/real-estate-document-signing",
        permanent: true,
      },
      {
        source: "/real-estate",
        destination: "/real-estate-document-signing",
        permanent: true,
      },
      {
        source: "/healthcare",
        destination: "/healthcare-document-signing",
        permanent: true,
      },
      {
        source: "/fintech",
        destination: "/fintech-document-signing",
        permanent: true,
      },
      {
        source: "/financial-services",
        destination: "/fintech-document-signing",
        permanent: true,
      },
      {
        source: "/education",
        destination: "/education-document-signing",
        permanent: true,
      },
      {
        source: "/freelancers",
        destination: "/esignature-for-freelancers",
        permanent: true,
      },
      {
        source: "/consultants",
        destination: "/esignature-for-consultants",
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
      }
    ];
  },
};

export default withContentCollections(nextConfig);
