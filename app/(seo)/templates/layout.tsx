import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Contract Templates | Sign & Send Instantly",
  description: "Browse our library of free, lawyer-vetted contract templates. Wedding photography, social media management, NDAs, and more. Edit and sign for free.",
  keywords: [
    "free contract templates",
    "legal document templates",
    "esignature templates",
    "freelance contracts",
    "business agreements free",
  ],
  alternates: {
    canonical: "https://boopsign.com/templates",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
