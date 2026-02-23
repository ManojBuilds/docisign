import { ClientHeaderWrapper } from "@/components/ClientHeaderWrapper";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HomeSeoContent from "@/components/HomeSeoContent";
import dynamic from "next/dynamic";
import { Metadata } from "next";

const ProblemSection = dynamic(() => import("@/components/ProblemSection"));
const Comparison = dynamic(() => import("@/components/Comparison"));
const SixCoreFeatures = dynamic(() => import("@/components/SixCoreFeatures"));
const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const HonestSocialProof = dynamic(() => import("@/components/HonestSocialProof"));
const Pricing = dynamic(() => import("@/components/Pricing"));
const Cta = dynamic(() => import("@/components/cta"));
// const VideoDemo = dynamic(() => import("@/components/VideoDemo"));

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div className="bg-[#faf7f5] text-gray-900 flex min-h-[100dvh] flex-col items-center justify-items-center">
      <ClientHeaderWrapper />

      <main className="w-full flex-1">
        <Hero />
        <HomeSeoContent />
        <ProblemSection />
        <Comparison />
        <SixCoreFeatures />
        <HowItWorks />
        <HonestSocialProof />
        <Pricing />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
