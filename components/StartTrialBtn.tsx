import { type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";

interface StartTrialBtnProps extends VariantProps<typeof buttonVariants> {
  label?: string;
}

const StartTrialBtn = ({ variant, label = "Start Your 7-Day Free Trial" }: StartTrialBtnProps) => {
  return (
    <div className="relative">
      <Link href={"/sign-in"}>
        <Button
          size="lg"
          className="px-8 py-6 text-lg rounded-xl shadow-lg transition-transform duration-200 hover:scale-105"
          variant={variant}
        >
          {label}
        </Button>
      </Link>
    </div>
  );
};

export default StartTrialBtn;