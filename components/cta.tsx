import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import Link from "next/link";
import StartTrialBtn from "./StartTrialBtn";

const avatars = [
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
    alt: "Avatar 1",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
    alt: "Avatar 2",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    alt: "Avatar 3",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
    alt: "Avatar 4",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
    alt: "Avatar 5",
  },
];

const Cta = () => {
  return (
    <section className="py-24 bg-gradient-tl from-muted/90 to-muted">
      <div className="container max-w-5xl mx-auto px-4 text-center">
        {/* Trust indicators */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="flex -space-x-2">
            {avatars.map((avatar, index) => (
              <Avatar key={index} className="h-8 w-8 border-2 border-primary-foreground/10">
                <AvatarImage src={avatar.src} alt={avatar.alt} />
              </Avatar>
            ))}
          </div>
          <p className="text-sm ml-2">
            Join <span className="font-semibold">10,000+</span> users who trust Boopsign
          </p>
        </div>

        {/* Main heading */}
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Start signing documents in <span className="text-foreground">seconds</span>, not hours
        </h2>

        {/* Subheading */}
        <p className="text-lg max-w-2xl mx-auto mb-8">
          Join thousands of freelancers, small businesses, and consultants who trust Boopsign as the best alternative to DocuSign.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <StartTrialBtn className="text-base px-8 py-6 rounded-full" />
        </div>

        {/* Trust indicators */}
        <p className="text-sm text-primary-foreground/80 mt-6">
          No credit card required • Setup in under 3 minutes • Cancel anytime
        </p>
      </div>
    </section>
  );
};

export default Cta;
