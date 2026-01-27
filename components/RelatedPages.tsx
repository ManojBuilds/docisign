"use client";

import Link from "next/link";
import { ArrowRight, FileText, Layout, Users, Sparkles } from "lucide-react";
import { motion } from "motion/react";

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

const categoryColors = {
    document: "bg-blue-50 text-blue-600 border-blue-100",
    page: "bg-indigo-50 text-indigo-600 border-indigo-100",
    users: "bg-amber-50 text-amber-600 border-amber-100",
};

export const RelatedPages = ({ pages, title = "Related Resources" }: RelatedPagesProps) => {
    return (
        <section className="py-24 bg-white border-t border-slate-100 relative overflow-hidden">
            {/* Background Texture & Patterns */}
            <div
                className="absolute inset-0 opacity-[0.4] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(#e2e8f0 1px, transparent 1px)`,
                    backgroundSize: '24px 24px'
                }}
            />

            {/* Decorative Blurs */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-0 size-[500px] bg-blue-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"
            />
            <motion.div
                animate={{
                    scale: [1.1, 1, 1.1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-0 left-0 size-[500px] bg-indigo-50/50 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none"
            />

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4 shadow-xl shadow-slate-900/10">
                        <Sparkles className="size-3 text-amber-400" />
                        Next Steps
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight text-center">
                        {title}
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {pages.map((page, idx) => (
                        <motion.div
                            key={idx}
                            className="h-full"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                        >
                            <Link
                                href={page.href}
                                className="group flex flex-col h-full bg-white/70 backdrop-blur-md rounded-[2.5rem] border border-slate-200/60 p-8 shadow-sm hover:shadow-2xl hover:shadow-blue-600/10 hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden h-full"
                            >
                                {/* Card Accent Line */}
                                <motion.div
                                    className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                />

                                <div className="flex items-center justify-between mb-8">
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        className={`size-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm ${page.icon === 'document' ? 'bg-blue-600 text-white ring-4 ring-blue-50' :
                                                page.icon === 'page' ? 'bg-indigo-600 text-white ring-4 ring-indigo-50' :
                                                    'bg-amber-500 text-white ring-4 ring-amber-50'
                                            }`}>
                                        {icons[page.icon]}
                                    </motion.div>

                                    <div className={`px-3 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider ${categoryColors[page.icon]}`}>
                                        {page.category || (page.icon === 'document' ? 'Resource' : page.icon === 'page' ? 'Guide' : 'Portal')}
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                                        {page.title}
                                    </h3>

                                    <p className="text-slate-500 leading-relaxed mb-8 text-sm font-medium">
                                        {page.description}
                                    </p>
                                </div>

                                <div className="pt-6 border-t border-slate-100 mt-auto flex items-center justify-between">
                                    <span className="text-blue-600 text-xs font-black uppercase tracking-[0.2em]">
                                        Learn More
                                    </span>
                                    <motion.div
                                        whileHover={{ x: 5 }}
                                        className="size-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300"
                                    >
                                        <ArrowRight className="size-4" />
                                    </motion.div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
