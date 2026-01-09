"use client";

import { Header } from "@/components/home/header";
import { useState } from "react";

export function ClientHeaderWrapper() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Header
      mobileMenuOpen={mobileMenuOpen}
      setMobileMenuOpen={setMobileMenuOpen}
    />
  );
}
