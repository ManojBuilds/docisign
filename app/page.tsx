import { ClientHeaderWrapper } from "@/components/ClientHeaderWrapper";
const Features = dynamic(() => import("@/components/Features"));
const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const Pricing = dynamic(() => import("@/components/Pricing"));
const TestimonialsSection = dynamic(() => import("@/components/testimonials"));
const VideoDemo = dynamic(() => import("@/components/VideoDemo"));
const Cta = dynamic(() => import("@/components/cta"));
const Problem = dynamic(() => import("@/components/Problem").then(m => m.Problem));
const FreelancerUseCases = dynamic(() => import("@/components/FreelancerUseCases"));
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import dynamic from "next/dynamic";
const RelatedPages = dynamic(() => import("@/components/RelatedPages").then(m => m.RelatedPages));

export default function Home() {
  return (
    <div className="bg-background text-foreground flex min-h-[100dvh] flex-col items-center justify-items-center">
      <ClientHeaderWrapper />
      <div
        style={{
          backgroundImage: "url('/optimized-images/noise.webp')",
        }}
        className="pointer-events-none [z-index:-1] absolute inset-0 bg-[size:180px] bg-repeat opacity-[0.835]"
      ></div>

      <main className="w-full flex-1">
        <Hero />
        <VideoDemo />
        <Problem />
        <HowItWorks />
        <Features />
        <FreelancerUseCases />
        <TestimonialsSection />
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