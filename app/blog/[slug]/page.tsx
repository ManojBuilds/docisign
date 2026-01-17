import { MDXContent } from "@/components/mdx/MDXContent";
import { allPosts } from "content-collections";
import { Clock } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allPosts.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return {
    title: post?.title,
  };
}

function getPostBySlug(slug: string) {
  return allPosts.find((p) => p.slug === slug);
}


export default async function Post({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return notFound();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-slate-50 border-b border-slate-100 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-full bg-[url('/bg-noise.png')] opacity-[0.03]" />
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-blue-600 mb-8 transition-colors"
          >
            ← Back to Blog
          </Link>

          <div className="flex items-center gap-3 text-sm font-semibold tracking-wider text-blue-600 mb-6 uppercase">
            <span className="bg-blue-50 px-3 py-1 rounded-full">{post.category}</span>
            <span className="text-slate-300">•</span>
            <time dateTime={post.date.toString()}>
              {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </time>
            {post.readingTime && (
              <>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1 text-slate-500 lowercase font-medium">
                  <Clock className="size-4" /> {post.readingTime}
                </div>
              </>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 mb-6 leading-[1.1] font-primary">
            {post.title}
          </h1>

          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mb-12">
            {post.description}
          </p>

          {post.image && (
            <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[2rem] ring-1 ring-slate-200">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <article className="prose prose-gray prose-lg md:prose-xl max-w-none
          prose-img:rounded-3xl prose-img:ring-1 prose-img:ring-slate-100">
          <MDXContent code={post.mdx} />
        </article>

        <hr className="my-16 border-slate-100" />

        <div className="bg-slate-50 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Enjoyed this article?</h3>
          <p className="text-slate-600 mb-8 max-w-lg mx-auto">
            Get more freelance tips and contract templates delivered straight to your inbox.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/signup" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
              Get Started for Free
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
