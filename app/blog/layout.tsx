import { ClientHeaderWrapper } from "@/components/ClientHeaderWrapper";
import Footer from "@/components/Footer";
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
      <div
        style={{
          backgroundImage: "url('/optimized-images/noise.webp')",
        }}
        className="pointer-events-none [z-index:-1] absolute inset-0 bg-[size:180px] bg-repeat opacity-[0.035]"
      ></div>
    </>
  );
}
