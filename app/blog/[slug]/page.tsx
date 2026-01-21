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
  return allPosts
    .filter((p) => p.status === "published")
    .map((p) => ({
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
  if (!post || post.status !== "published") return notFound();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-slate-50 border-b border-slate-100 py-16 md:py-12 relative overflow-hidden">
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

          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mb-6">
            {post.description}
          </p>

          {post.image && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg ring-1 ring-slate-200/5">
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
        <article className="prose prose-slate md:prose-lg max-w-none
          prose-headings:font-primary prose-headings:font-black prose-headings:tracking-tight
          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-slate-900 prose-blockquote:border-l-blue-500 prose-blockquote:not-italic
          prose-img:rounded-3xl prose-img:ring-1 prose-img:ring-slate-100
          prose-h2:mt-16 prose-h2:mb-8 prose-h2:text-3xl
          prose-h3:mt-12 prose-h3:mb-6 prose-h3:text-xl
          prose-p:leading-relaxed prose-p:text-slate-700
          prose-ul:mb-6 prose-li:mb-2">
          <MDXContent code={post.mdx} />
        </article>

        <hr className="my-16 border-slate-200" />

        {/* Newsletter CTA */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-10 md:p-16 text-center border border-blue-100 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 size-60 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 size-60 bg-indigo-500/5 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h3 className="text-3xl font-black text-slate-900 mb-4">
              Enjoyed this article?
            </h3>
            <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto">
              Get more freelance tips and contract templates delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/signup"
                className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
              >
                Get Started for Free
              </Link>
              <Link
                href="/blog"
                className="px-8 py-4 bg-white text-slate-900 font-semibold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                Browse More Articles
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
