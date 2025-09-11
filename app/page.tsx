"use client";

import Cta from "@/components/cta";
import Faq from "@/components/faq";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import HeroProps from "@/components/Hero";
import { Header } from "@/components/home/header";
import HowItWorks from "@/components/HowItWorks";
import { Problem } from "@/components/Problem";
import TestimonialsSection from "@/components/testimonials";
import { useEffect, useState } from "react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="bg-background text-foreground flex min-h-[100dvh] flex-col items-center justify-items-center">
      <Header
        isScrolled={isScrolled}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <div
        style={{
          backgroundImage: "url('/noise.png')",
        }}
        className="pointer-events-none [z-index:-1] absolute inset-0 bg-[size:180px] bg-repeat opacity-[0.035]"
      ></div>
      <main className="px-4 sm:px-0 w-full flex-1">
        <HeroProps
          heading="Get Documents Signed in Under 3 Minutes"
          description={`Stop losing deals to slow e-signature tools. Your clients can sign contracts
          on their phone in under 3 minutes—no account creation, no app downloads, no 'I never got the DocuSign email' frustrations`}
          button={{
            text: "Sign your first document",
            url: "/dashboard",
          }}
        />
        <HowItWorks />
        <Problem />
        <Features />
        <Faq />
        <TestimonialsSection />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
