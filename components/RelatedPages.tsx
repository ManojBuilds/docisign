"use client";

import Link from "next/link";
import { ArrowRight, FileText, Layout, Users } from "lucide-react";

interface PageLink {
    title: string;
    description: string;
    href: string;
    icon: "document" | "page" | "users";
    category?: string;
}

interface RelatedPagesProps {
    pages: PageLink[];
    title?: string;
}

const icons = {
    document: <FileText className="size-5" />,
    page: <Layout className="size-5" />,
    users: <Users className="size-5" />,
};

export const RelatedPages = ({ pages, title = "Related Resources" }: RelatedPagesProps) => {
    return (
        <section className="py-16 bg-slate-50 border-t border-slate-200">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">
                        {title}
                    </h2>
                    <p className="text-slate-600">Continue exploring our resources</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {pages.map((page, idx) => (
                        <Link
                            key={idx}
                            href={page.href}
                            className="group flex flex-col bg-white rounded-xl border border-slate-200 p-6 hover:border-blue-500 transition-colors"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`size-10 rounded-lg flex items-center justify-center ${page.icon === 'document' ? 'bg-blue-50 text-blue-600' :
                                        page.icon === 'page' ? 'bg-slate-50 text-slate-600' :
                                            'bg-amber-50 text-amber-600'
                                    }`}>
                                    {icons[page.icon]}
                                </div>
                            </div>

                            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                {page.title}
                            </h3>

                            <p className="text-slate-600 text-sm mb-4 flex-1">
                                {page.description}
                            </p>

                            <div className="flex items-center gap-2 text-blue-600 text-sm font-medium">
                                <span>Learn more</span>
                                <ArrowRight className="size-4" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
