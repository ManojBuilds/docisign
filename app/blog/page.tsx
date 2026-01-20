import { allPosts, type Post } from "content-collections";
import { compareDesc } from "date-fns";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={post.url}
      className="group flex flex-col h-full bg-white border border-slate-200 rounded-3xl overflow-hidden hover:ring-2 hover:ring-blue-600/30 hover:border-blue-600/30 transition-all duration-300 shadow-sm hover:shadow-md"
    >
      {post.image && (
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={630}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className={`p-6 md:p-8 flex flex-col h-full ${post.image ? 'pt-6' : 'pt-8'}`}>
        <div className="flex items-center gap-3 text-xs font-semibold tracking-wider text-slate-500 mb-4 uppercase">
          <span className="text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{post.category}</span>
          <span>•</span>
          <time className="text-slate-400">
            {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </time>
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
          {post.title}
        </h2>

        <p className="text-slate-600 mb-6 flex-grow line-clamp-3 leading-relaxed">
          {post.description}
        </p>

        <div className="flex items-center text-blue-600 font-semibold text-sm">
          Read Article <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

export default function BlogIndex() {
  const posts = allPosts
    .filter((post) => post.status === "published")
    .sort((a, b) =>
      compareDesc(new Date(a.date), new Date(b.date))
    );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-full bg-[url('/bg-noise.png')] opacity-[0.03]" />
        <div className="absolute top-0 left-1/4 size-[500px] bg-blue-100/30 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 size-[500px] bg-indigo-100/20 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.8)_100%)]" />

        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 mb-6 font-primary">
            Boopsign <span className="text-blue-600">Blog</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Tips, guides, and insights to help freelancers and consultants get paid faster and protect their work.
          </p>
        </div>
      </div>

      {/* Featured Post */}
      {posts.length > 0 && (
        <div className="container mx-auto px-4 -mt-12 relative z-20">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden max-w-4xl mx-auto">
            <div className="md:flex">
              <div className="md:w-2/5">
                {posts[0].image && (
                  <div className="relative w-full h-64 md:h-full">
                    <Image
                      src={posts[0].image}
                      alt={posts[0].title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="p-8 md:w-3/5">
                <div className="flex items-center gap-3 text-xs font-semibold tracking-wider text-slate-500 mb-4 uppercase">
                  <span className="text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{posts[0].category}</span>
                  <span>•</span>
                  <time className="text-slate-400">
                    {new Date(posts[0].date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </time>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                  {posts[0].title}
                </h2>

                <p className="text-slate-600 mb-6 leading-relaxed">
                  {posts[0].description}
                </p>

                <Link
                  href={posts[0].url}
                  className="inline-flex items-center text-blue-600 font-semibold"
                >
                  Read Full Article <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Posts */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Latest Articles</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post, idx) => (
              <PostCard key={idx} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}