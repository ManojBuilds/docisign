"use client";

import Link from "next/link";

export default function BlogNewsletterCta() {
    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-10 md:p-16 text-center border border-blue-100 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 size-60 bg-blue-500/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 size-60 bg-indigo-500/5 rounded-full blur-3xl" />

            <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">
                    Enjoyed this article?
                </h3>
                <p className="text-base md:text-lg text-slate-600 mb-8 max-w-lg mx-auto">
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
    );
}
