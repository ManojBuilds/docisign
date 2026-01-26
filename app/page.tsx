import { ClientHeaderWrapper } from "@/components/ClientHeaderWrapper";
const Features = dynamic(() => import("@/components/Features"));
const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const Pricing = dynamic(() => import("@/components/Pricing"));
const TestimonialsSection = dynamic(() => import("@/components/testimonials"));
const VideoDemo = dynamic(() => import("@/components/VideoDemo"));
const Cta = dynamic(() => import("@/components/cta"));
const Problem = dynamic(() => import("@/components/Problem").then(m => m.Problem));
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import dynamic from "next/dynamic";

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

      <link rel="preload" href="/optimized-images/noise.webp" as="image" />
      <link rel="preload" href="/logo.png" as="image" />
      <link rel="preload" href="/optimized-images/sign-mobile.webp" as="image" />

      <main className="w-full flex-1">
        <Hero />
        <VideoDemo />
        <Problem />
        <HowItWorks />
        <Features />
        <TestimonialsSection />
        <Pricing />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}