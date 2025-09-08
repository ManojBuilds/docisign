import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { type VariantProps } from "class-variance-authority";

interface StartTrialBtnProps extends VariantProps<typeof buttonVariants> {}

const StartTrialBtn = ({ variant }: StartTrialBtnProps) => {
  return (
    <div className="relative">
      <Link href={"/sign-in"}>
        <Button
          size="lg"
          className="px-8 py-6 text-lg rounded-xl shadow-lg transition-transform duration-200 hover:scale-105"
          variant={variant}
        >
          Start Your 7-Day Free Trial
        </Button>
      </Link>
    </div>
  );
};

export default StartTrialBtn;