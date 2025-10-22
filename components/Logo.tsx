import Link from "next/link";
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
    <Link href={href} className={cn("flex items-center gap-2", className)}>
      {
        /* 
        <Image
          src="/logo.png"
          alt="Boopsign Logo"
          width={40}
          height={40}
          className="h-8 w-8 md:h-10 md:w-10"
        />
  */
      }
      {showText && (
        <span className="hidden sm:inline-flex text-lg font-semibold md:text-xl">
          Boopsign
        </span>
      )}
    </Link>
  );
}
