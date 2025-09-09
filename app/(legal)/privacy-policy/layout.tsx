"use client";
import Footer from "@/components/Footer";
import { Header } from "@/components/home/header";
import React, { useEffect, useState } from "react";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <>
      <Header
        isScrolled={isScrolled}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      {children}
      <Footer />
      <div
        style={{
          backgroundImage: "url('/noise.png')",
        }}
        className="pointer-events-none [z-index:-1] absolute inset-0 bg-[size:180px] bg-repeat opacity-[0.035]"
      ></div>
    </>
  );
}
