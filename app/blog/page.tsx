import { allPosts, type Post } from "content-collections";
import { compareDesc } from "date-fns";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={post.url}
      className="group flex flex-col h-full bg-white border border-slate-200 rounded-2xl overflow-hidden hover:ring-1 hover:ring-blue-600/30 hover:border-blue-600/30 transition-all duration-300"
    >
      <div className="p-6 md:p-8 flex flex-col h-full">
        <div className="flex items-center gap-3 text-xs font-semibold tracking-wider text-slate-500 mb-4 uppercase">
          <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded-md">Article</span>
          <span>•</span>
          {/* <time >
            {format(parseISO(post.date.toString()), "MMM d, yyyy")}
          </time> */}
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
          {post.title}
        </h2>

        <p className="text-slate-600 mb-6 flex-grow line-clamp-3 leading-relaxed">
          {post.description}
        </p>

        <div className="flex items-center text-blue-600 font-semibold text-sm mt-auto">
          Read Article <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

export default function BlogIndex() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-blue-50 to-white opacity-50" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 mb-6 font-primary">
            BoopSign <span className="text-blue-600">Blog</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Tips, guides, and insights to help freelancers and consultants get paid faster and protect their work.
          </p>
        </div>
      </div>

      {/* Grid of Posts */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <PostCard key={idx} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}