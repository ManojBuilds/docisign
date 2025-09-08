import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface HeroProps {
  heading?: string;
  description?: string;
  button?: {
    text: string;
    url: string;
  };
  reviews?: {
    count: number;
    rating?: number;
    avatars: {
      src: string;
      alt: string;
    }[];
  };
}

const HeroProps = ({
  description = "Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
  button = {
    text: "Discover all components",
    url: "https://www.shadcnblocks.com",
  },
  
}: HeroProps) => {
  return (
    <section className="py-32">
      <div className="container mx-auto text-center relative">
        <Image
          src={"/image.png"}
          alt="pen"
          width={200}
          height={200}
          className="object-contain absolute right-0 hidden md:block rotate-2 bottom-0"
        />
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <h1 className="text-3xl font-extrabold lg:text-5xl leading-tight">
            BoopSign vs DocuSign:
            <br /> 3x Faster, 50% Cheaper
            <br />{" "}
            <span className={`text-primary`}>
              No Login Required for Signers
            </span>
          </h1>
          <p className="text-muted-foreground text-balance lg:text-lg max-w-4xl mx-auto">
            {description}
          </p>
          <div className="flex items-center gap-2 justify-center text-xs sm:text-sm font-medium text-muted-foreground">
            <span>✓ Faster than DocuSign</span>• <span>✓ More affordable</span>{" "}
            • <span>✓ Mobile-first design</span>
          </div>
        </div>

        <Button asChild size="lg" className="mt-10">
          <Link href={button.url}>{button.text}</Link>
        </Button>

        {/*<div className="mx-auto mt-10 flex w-fit flex-col items-center gap-4 sm:flex-row">
          <span className="mx-4 inline-flex items-center -space-x-4">
            {reviews.avatars.map((avatar, index) => (
              <Avatar key={index} className="size-14 border">
                <AvatarImage src={avatar.src} alt={avatar.alt} />
              </Avatar>
            ))}
          </span>
          <div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className="size-5 fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="mr-1 font-semibold">
                {reviews.rating?.toFixed(1)}
              </span>
            </div>
            <p className="text-muted-foreground text-left font-medium">
              from {reviews.count}+ reviews
            </p>
          </div>
        </div>*/}
      </div>
    </section>
  );
};

export default HeroProps;
