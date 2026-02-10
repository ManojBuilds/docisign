import { PageBackground } from "@/components/PageBackground";
import { ClientHeaderWrapper } from "@/components/ClientHeaderWrapper";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Contract Templates for Solo Entrepreneurs | Boopsign",
  description: "Browse our library of free, lawyer-vetted contract templates tailored for solo entrepreneurs. From NDAs to service agreements. Edit and sign for free.",
  keywords: [
    "free contract templates for solo entrepreneurs",
    "legal document templates for solo entrepreneurs",
    "esignature templates for solo entrepreneurs",
    "solo entrepreneur contracts",
    "business agreements for solos",
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
    <PageBackground opacity="opacity-[0.035]" />
  </>
}
