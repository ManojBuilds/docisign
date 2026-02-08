import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";

interface StartTrialBtnProps extends VariantProps<typeof buttonVariants> {
  label?: string;
  className?: string;
}

const StartTrialBtn = ({ variant = "default", label = "Start Your 14-Day Free Trial", className }: StartTrialBtnProps) => {
  return (
    <div className={"relative"}>
      <Link href={"/dashboard"}>
        <Button
          size="lg"
          className={cn("px-8 py-6 rounded-lg", className)}
          variant={variant}
        >
          {label}
        </Button>
      </Link>
    </div>
  );
};

export default StartTrialBtn;