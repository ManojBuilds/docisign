import Cta from "@/components/cta";
import Faq from "@/components/faq";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import HeroProps from "@/components/Hero";
import { ClientHeaderWrapper } from "@/components/ClientHeaderWrapper";
import HowItWorks from "@/components/HowItWorks";
import { Problem } from "@/components/Problem";
// import TestimonialsSection from "@/components/testimonials";
import Pricing from "@/components/Pricing";

export default function Home() {
  return (
    <div className="bg-background text-foreground flex min-h-[100dvh] flex-col items-center justify-items-center">
      <ClientHeaderWrapper />
      <div
        style={{
          backgroundImage: "url('/noise.png')",
        }}
        className="pointer-events-none [z-index:-1] absolute inset-0 bg-[size:180px] bg-repeat opacity-[0.035]"
      ></div>
      <main className="px-4 sm:px-0 w-full flex-1">
        <HeroProps
          heading="E-Signature for Freelancers & Consultants — No Account Required for Signers"
          description={`The simplest DocuSign alternative built for speed. Send contracts, NDAs, and proposals in under 3 minutes. Your clients sign instantly—no login, no app download, no friction. Just click, sign, done.`}
          button={{
            text: "Start Free Trial — No Credit Card",
            url: "/dashboard",
          }}
        />
        <HowItWorks />
        <Problem />
        <Features />
        <Pricing />
        <Faq />
        {/* <TestimonialsSection /> */}
        <Cta />
      </main>
      <Footer />
    </div>
  );
}