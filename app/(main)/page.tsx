"use client";

import Cta from "@/components/cta";
import Faq from "@/components/faq";
import Features from "@/components/Features";
import HeroProps from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <div className="px-4 sm:px-0">
      <HeroProps
        heading="Get Documents Signed in Under 3 Minutes"
        description="The simplest document signing platform for busy professionals. Stop wrestling with complicated software. Upload, add signatures, and send documents in minutes. Your signers can sign on any device without creating accounts."
        button={
          {
            text: "Sign your first document",
            url: "/dashboard"
          }
        }
      />
      <HowItWorks/>
      <Features/>
      <Faq/>
      <Cta/>
    </div>
  );
}
