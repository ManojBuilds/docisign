import { ClientHeaderWrapper } from "@/components/ClientHeaderWrapper";
import Footer from "@/components/Footer";
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
    canonical: "https://boopsign.com/contracts",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>
    <ClientHeaderWrapper />
    {children}
    <Footer />
    <div
      style={{
        backgroundImage: "url('/optimized-images/noise.webp')",
      }}
      className="pointer-events-none [z-index:-1] absolute inset-0 bg-[size:180px] bg-repeat opacity-[0.035]"
    ></div>
  </>
}
