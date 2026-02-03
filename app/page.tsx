import { ClientHeaderWrapper } from "@/components/ClientHeaderWrapper";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import dynamic from "next/dynamic";

const Features = dynamic(() => import("@/components/Features"));
const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const Pricing = dynamic(() => import("@/components/Pricing"));
const TestimonialsSection = dynamic(() => import("@/components/testimonials"));
const Cta = dynamic(() => import("@/components/cta"));

export default function Home() {
  return (
    <div className="bg-[#faf7f5] text-gray-900 flex min-h-[100dvh] flex-col items-center justify-items-center">
      <ClientHeaderWrapper />

      <main className="w-full flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <TestimonialsSection />
        <Pricing />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
