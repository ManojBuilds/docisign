import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage } from "./ui/avatar"
import Link from "next/link"

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
      <span className="mx-4 inline-flex items-center -space-x-4 mb-6">
        {avatars.map((avatar, index) => (
          <Avatar key={index} className="size-14 border">
            <AvatarImage src={avatar.src} alt={avatar.alt} />
          </Avatar>
        ))}
      </span>

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
        Get documents signed in <span className="font-extrabold">under 3 minutes</span>
      </h1>

      {/* Subheading */}
      <p className="text-lg text-gray-600 max-w-2xl mb-8">
        Join thousands of professionals who&apos;ve simplified their document signing process. Upload, place signatures, send - it&apos;s that easy.
      </p>
      <div className="flex flex-col sm:flex-row gap-6 mb-8 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>90% faster than DocuSign</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span>No account required for signers</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <span>Works perfectly on mobile</span>
        </div>
      </div>


      {/* CTA Button + note */}
      <div className="relative">
        <Link href={'/sign-in'}>
          <Button
            size="lg"
            className="px-8 py-6 text-lg rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            Start Signing Documents Free
          </Button>
        </Link>


        {/* Arrow + note */}
        {/* <div
                    className="absolute -bottom-10 right-0 text-sm text-black italic"
                >
                    <span className="block transform translate-x-12 -translate-y-2 rotate-6">
                        No Signup Required. Enjoy!!!!!
                    </span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 -mt-4 ml-6 rotate-[130deg]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V6m0 0l-7 7m7-7l7 7" />
                    </svg>
                </div> */}
        {/* <div className="absolute -bottom-12 right-0 text-sm text-gray-700 italic">
          <span className="block transform translate-x-8 -translate-y-2 rotate-6 bg-yellow-100 px-2 py-1 rounded shadow-sm">
            5 free documents/month!
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 -mt-3 ml-6 rotate-[130deg] text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V6m0 0l-7 7m7-7l7 7" />
          </svg>
        </div> */}
      </div>
      {/* Secondary CTA */}
      <p className="text-sm text-gray-500 mt-16">
        Already have an account?
        <Link href={'/sign-in'}>
          <button className="text-blue-600 hover:text-blue-700 font-medium ml-1 underline">
            Sign in here
          </button>
        </Link>
      </p>
    </section>
  )
}

export default Cta
