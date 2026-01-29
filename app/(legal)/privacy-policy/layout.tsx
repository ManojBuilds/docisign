import Footer from "@/components/Footer";
import { ClientHeaderWrapper } from "@/components/ClientHeaderWrapper";
import { PageBackground } from "@/components/PageBackground";
import React from "react";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ClientHeaderWrapper />
      {children}
      <Footer />
      <PageBackground opacity="opacity-[0.035]" />
    </>
  );
}
