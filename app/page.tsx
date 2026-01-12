import { ClientHeaderWrapper } from "@/components/ClientHeaderWrapper";
import Cta from "@/components/cta";
import Faq from "@/components/faq";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import { Problem } from "@/components/Problem";
import TestimonialsSection from "@/components/testimonials";
import VideoDemo from "@/components/VideoDemo";

export default function Home() {
  return (
    <div className="bg-background text-foreground flex min-h-[100dvh] flex-col items-center justify-items-center">
      <ClientHeaderWrapper />
      <div
        style={{
          backgroundImage: "url('/noise.png')",
        }}
        className="pointer-events-none [z-index:-1] absolute inset-0 bg-[size:180px] bg-repeat opacity-[0.835]"
      ></div>

      <main className="px-4 sm:px-0 w-full flex-1">
        <Hero />
        <VideoDemo />
        <HowItWorks />
        <Problem />
        <Features />
        <TestimonialsSection />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}