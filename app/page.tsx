import { ClientHeaderWrapper } from "@/components/ClientHeaderWrapper";
import { PageBackground } from "@/components/PageBackground";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";

const Features = dynamic(() => import("@/components/Features"));
const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const Pricing = dynamic(() => import("@/components/Pricing"));
const TestimonialsSection = dynamic(() => import("@/components/testimonials"));
const VideoDemo = dynamic(() => import("@/components/VideoDemo"));
const Cta = dynamic(() => import("@/components/cta"));
const Problem = dynamic(() => import("@/components/Problem").then(m => m.Problem));
const FreelancerUseCases = dynamic(() => import("@/components/FreelancerUseCases"));
const RelatedPages = dynamic(() => import("@/components/RelatedPages").then(m => m.RelatedPages));
const SupportSection = dynamic(() => import("@/components/Support"));

export default function Home() {
  return (
    <div className="bg-background text-foreground flex min-h-[100dvh] flex-col items-center justify-items-center">
      <ClientHeaderWrapper />
      <PageBackground opacity="opacity-[0.835]" />

      <main className="w-full flex-1">
        <Hero />
        <VideoDemo />
        <Problem />
        <HowItWorks />
        <Features />
        <FreelancerUseCases />
        <TestimonialsSection />
        <SupportSection />
        <Pricing />
        <Cta />
        <RelatedPages
          pages={[
            {
              title: "E-Signature for Freelancers",
              description: "The zero-friction way to get contracts signed.",
              href: "/esignature-for-freelancers",
              icon: "users"
            },
            {
              title: "Free Freelance Contract",
              description: "Download our legally-binding freelance contract template.",
              href: "/contracts",
              icon: "document"
            },
            {
              title: "Boopsign vs DocuSign",
              description: "See why 2,000+ freelancers made the switch.",
              href: "/alternatives/docusign-alternative",
              icon: "page"
            }
          ]}
        />
      </main>
      <Footer />
    </div>
  );
}