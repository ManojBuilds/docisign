import { RelatedPages } from "@/components/RelatedPages";
import { MDXContent } from "@/components/mdx/MDXContent";
import { allPosts } from "content-collections";
import { Clock } from "lucide-react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const BlogNewsletterCta = dynamic(() => import("@/components/blog/BlogNewsletterCta"));

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
      <header className="bg-slate-50 border-b border-slate-100 pt-12 pb-10 md:pt-16 md:pb-20 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-full bg-[url('/bg-https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9Pgupj8r27wbAQC3TH6iZ98sKJ1Uvou4eYBdxWLO')] opacity-[0.03]" />
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-blue-600 mb-6 md:mb-10 transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform mr-2">←</span> Back to Blog
          </Link>

          <div className="flex flex-wrap items-center gap-x-1 md:gap-x-3 gap-y-2 text-xs md:text-sm font-semibold tracking-wider text-blue-600 mb-6 uppercase">
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

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter text-slate-900 mb-6 leading-[1.1] font-primary">
            {post.title}
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mb-8 md:mb-12">
            {post.description}
          </p>


          <div className="relative aspect-video w-full overflow-hidden rounded-lg ring-1 ring-slate-200/5">
            <Image
              src={post.image || "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9PguEsv0xcFawP3uHc7MitbWUIhfspkxBXVz20QE"}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
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
        <BlogNewsletterCta />
      </main>

      <RelatedPages
        pages={[
          {
            title: "Free Contract Library",
            description: "Browse 300+ templates for every industry and niche.",
            href: "/contracts",
            icon: "document"
          },
          {
            title: "E-Signature for Freelancers",
            description: "Learn how to get your documents signed 3x faster.",
            href: "/esignature-for-freelancers",
            icon: "users"
          },
          {
            title: "Fair Pricing",
            description: "Unlimited e-signatures for a flat monthly fee of $15.",
            href: "/pricing",
            icon: "page"
          }
        ]}
      />
    </div>
  );
}
