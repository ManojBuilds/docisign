import { ClientHeaderWrapper } from "@/components/ClientHeaderWrapper";
import Footer from "@/components/Footer";
import TestimonialsSection from "@/components/testimonials";
import { PageBackground } from "@/components/PageBackground";
import React from "react";

export default function SeoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClientHeaderWrapper />
      {children}
      <TestimonialsSection />
      <Footer />
      <PageBackground opacity="opacity-[0.035]" />
    </>
  );
}
