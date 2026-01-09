import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { DragAndClickUpload } from "./DragAndClickUpload";

const Hero = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-28 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-[520px] h-[520px] bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-[420px] h-[420px] bg-blue-500/10 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto flex flex-col items-center text-center">
        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] max-w-4xl">
          Get contracts signed
          <span className="text-primary"> without client accounts</span>
        </h1>

        <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-2xl">
          Upload a PDF. Send a link. Clients sign instantly — no login required.
        </p>

        {/* Upload Box (PRIMARY CTA) */}
        <div className="mt-10 w-full max-w-3xl">
          <DragAndClickUpload />
        </div>

        {/* Trust bullets */}
        <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-muted-foreground">
          {[
            "No client signup",
            "Works on mobile",
            "Sign from email"
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Secondary CTA */}
        <div className="mt-8">
          <Button
            size="lg"
            asChild
          >
            <Link href="/dashboard">
              Or create a free account <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
