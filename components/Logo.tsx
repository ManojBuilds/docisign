
"use client";

import { Badge } from "@/components/ui/badge";
import { useTrialStatus } from "@/hooks/useTrialStatus";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
interface LogoProps {
  showText?: boolean;
  className?: string;
  href?: string;
  showStatus?: boolean;
}

export default function Logo({
  showText = true,
  className,
  href = "/",
  showStatus = false,
}: LogoProps) {
  const { isPaidUser, isTrialActive, isLoading, isAuthenticated, plan } = useTrialStatus();

  return (
    <div className={cn("flex items-center", className)}>
      <Link href={href} className="flex items-center group">
        <div className="relative flex items-center shrink-0">
          <Image
            src="https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9PguaOEZELMW5bk4q23iuyfFhwQdGBN7vjse1zp6"
            alt="Boopsign Logo"
            width={40}
            height={40}
            priority
            className="h-8 w-8 md:h-10 md:w-10 transition-transform group-hover:scale-105"
          />
        </div>

        {showText && (
          <span className="text-lg md:text-xl font-semibold font-heading tracking-tight md:-ml-1">
            Boopsign
          </span>
        )}

        {showStatus && !isLoading && isAuthenticated && (
          <div className="ml-1 sm:ml-1.5 flex items-center">
            {isPaidUser ? (
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 py-0 px-2 text-[9px] md:text-[10px] font-black uppercase tracking-[0.1em] h-5 rounded-full">
                {plan}
              </Badge>
            ) : isTrialActive ? (
              <Badge variant="secondary" className="border-orange-200 text-orange-600 bg-orange-50 py-0 px-2 text-[9px] md:text-[10px] font-semibold uppercase tracking-wider h-5 rounded-full">
                Trial
              </Badge>
            ) : (
              <Badge variant="secondary" className="text-muted-foreground py-0 px-2 text-[9px] md:text-[10px] font-semibold uppercase tracking-wider h-5 rounded-full">
                Free
              </Badge>
            )}
          </div>
        )}
      </Link>
    </div>
  );
}
