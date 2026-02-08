"use client";

import Footer from "@/components/Footer";
import { Header } from "@/components/home/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export default function NotFound() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h1 className="text-6xl font-semibold text-foreground mb-2">404</h1>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
            <p className="text-muted-foreground mb-8">
              Oops! The page you're looking for doesn't exist or has been moved.
              But don't worry, signing documents with Boopsign is still super simple!
            </p>
          </div>

          <div className="space-y-4">
            <Link href="/" className="w-full block">
              <Button className="w-full">Go Back Home</Button>
            </Link>
            <Link href="/contracts" className="w-full block">
              <Button variant="secondary" className="w-full">Explore free contract templates</Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              While you're here, why not learn why 20+ professionals chose Boopsign
              as their e-signature solution?
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}