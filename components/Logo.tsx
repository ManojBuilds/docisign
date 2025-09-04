import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  showText?: boolean;
  className?: string;
}

export default function Logo({ showText = true, className }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <Image
        src="/logo.png"
        alt="Docisign Logo"
        width={40}
        height={40}
        className="h-8 w-8 md:h-10 md:w-10"
      />
      {showText && (
        <span className="text-lg font-semibold md:text-xl">Boopsign.com</span>
      )}
    </Link>
  );
}
