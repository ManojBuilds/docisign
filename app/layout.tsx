import type { Metadata } from "next";
import "./globals.css";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { PdfDimensionsProvider } from "@/components/PdfDimensionsContext";
import { Lora, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});


export const metadata: Metadata = {
  title: "Docisign: Simple, Affordable DocuSign Alternative for Mobile Signing",
  description: "The fastest mobile-focused e-signature platform—upload, sign, and send documents in minutes. Cheaper, simpler than DocuSign.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.variable} ${lora.variable} antialiased relative`}>
        <ClerkProvider >
          <ConvexClientProvider>
            <PdfDimensionsProvider>
                {children}
            </PdfDimensionsProvider>
          </ConvexClientProvider>
        </ClerkProvider>
        <Toaster />
        <Analytics/>
      </body>
    </html>
  );
}
