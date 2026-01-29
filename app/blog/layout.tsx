import { ClientHeaderWrapper } from "@/components/ClientHeaderWrapper";
import Footer from "@/components/Footer";
import { PageBackground } from "@/components/PageBackground";
import React from "react";

export default function BlogLayout({
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
