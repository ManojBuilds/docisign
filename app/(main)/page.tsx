"use client";

import Cta from "@/components/cta";
import Faq from "@/components/faq";
import Features from "@/components/Features";
import HeroProps from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import TestimonialsSection from "@/components/testimonials";

export default function Home() {
  return (
    <div className="px-4 sm:px-0">
      <HeroProps
        heading="Get Documents Signed in Under 3 Minutes"
        description="The fastest DocuSign alternative for busy professionals. Upload, sign, and send documents in under 3 minutes. Mobile-first platform with no account required for signers."
        button={{
          text: "Sign your first document",
          url: "/dashboard",
        }}
      />
      <HowItWorks />
      <Features />
      <Faq />
      <TestimonialsSection />
      <Cta />
    </div>
  );
}
