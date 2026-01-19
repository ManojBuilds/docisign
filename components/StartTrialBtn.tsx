import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";

interface StartTrialBtnProps extends VariantProps<typeof buttonVariants> {
  label?: string;
  className?: string;
}

const StartTrialBtn = ({ variant, label = "Start Your 7-Day Free Trial", className }: StartTrialBtnProps) => {
  return (
    <div className={cn("relative", className)}>
      <Link href={"/sign-in"}>
        <Button
          size="lg"
          className="px-8 py-6 rounded-full"
          variant={variant}
        >
          {label}
        </Button>
      </Link>
    </div>
  );
};

export default StartTrialBtn;