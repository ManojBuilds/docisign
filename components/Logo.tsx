import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  showText?: boolean;
  className?: string;
  href?: string;
}

export default function Logo({
  showText = true,
  className,
  href = "/",
}: LogoProps) {
  return (
    <Link href={href} className={cn("flex items-center", className)}>
      <Image
        src="/logo.png"
        alt="BoopSign Logo"
        width={40}
        height={40}
        className="h-8 w-8 md:h-10 md:w-10"
      />
      {showText && (
        <span className="text-lg font-semibold md:text-xl">
          BoopSign
        </span>
      )}
    </Link>
  );
}
