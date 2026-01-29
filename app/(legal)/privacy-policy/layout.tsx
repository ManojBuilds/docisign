import Footer from "@/components/Footer";
import { ClientHeaderWrapper } from "@/components/ClientHeaderWrapper";
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
      <div
        style={{
          backgroundImage: "url('https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9Pgupj8r27wbAQC3TH6iZ98sKJ1Uvou4eYBdxWLO')",
        }}
        className="pointer-events-none [z-index:-1] absolute inset-0 bg-[size:180px] bg-repeat opacity-[0.035]"
      ></div>
    </>
  );
}
