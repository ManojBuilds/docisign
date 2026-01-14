
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
  const { isPaidUser, isTrialActive, isLoading, isAuthenticated } = useTrialStatus();

  return (
    <div className="flex items-center gap-2">
      <Link href={href} className={cn("flex items-center", className)}>
        <Image
          src="/logo.png"
          alt="BoopSign Logo"
          width={40}
          height={40}
          className="h-8 w-8 md:h-10 md:w-10"
        />
        {showText && (
          <span className="text-lg font-semibold md:text-xl font-heading ml-2">
            BoopSign
          </span>
        )}
      </Link>

      {showStatus && !isLoading && isAuthenticated && (
        <div className="flex items-center">
          {isPaidUser ? (
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors py-0 px-2 text-[10px] font-bold uppercase tracking-wider h-5">
              PRO
            </Badge>
          ) : isTrialActive ? (
            <Badge variant="outline" className="border-orange-200 text-orange-600 bg-orange-50 py-0 px-2 text-[10px] font-bold uppercase tracking-wider h-5">
              Trial
            </Badge>
          ) : (
            <Badge variant="outline" className="text-muted-foreground py-0 px-2 text-[10px] font-bold uppercase tracking-wider h-5">
              Free
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
