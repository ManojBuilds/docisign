import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage } from "./ui/avatar"
import Link from "next/link"
import StartTrialBtn from "./StartTrialBtn"

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
]

const Cta = () => {
  return (
    <section className="py-20 flex flex-col items-center text-center">
      {/* Avatars row */}
      <span className="mx-4 inline-flex items-center -space-x-4 mb-6" aria-label="User testimonials profile pictures">
        {avatars.map((avatar, index) => (
          <Avatar key={index} className="size-14 border" aria-hidden="true">
            <AvatarImage src={avatar.src} alt={avatar.alt} />
          </Avatar>
        ))}
      </span>

      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
        Get your contracts signed in <span className="font-extrabold">under 3 minutes</span>
      </h2>

      {/* Subheading */}
      <p className="text-lg text-gray-600 max-w-2xl mb-8">
        Join thousands of professionals who&apos;ve simplified their document signing workflow with Docisign — the fast, simple, and mobile-first e-signature platform.
      </p>

      {/* Benefits List */}
      <div className="flex flex-col sm:flex-row gap-6 mb-8 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full" aria-hidden="true"></div>
          <span>Up to 90% faster than DocuSign</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full" aria-hidden="true"></div>
          <span>No account needed for signers to complete documents</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full" aria-hidden="true"></div>
          <span>Works seamlessly on any mobile device</span>
        </div>
      </div>

      {/* CTA Button */}
      <StartTrialBtn/>

      {/* Secondary CTA */}
      <p className="text-sm text-gray-500 mt-16">
        Already have an account?
        <Link href={"/sign-in"}>
          <button className="text-blue-600 hover:text-blue-700 font-medium ml-1 underline">
            Sign in here
          </button>
        </Link>
      </p>
    </section>
  )
}

export default Cta
