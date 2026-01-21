"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, FileText, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface HubTemplateItem {
  title: string;
  desc: string;
  href: string;
  popular: boolean;
}

interface HubCategory {
  category: string;
  items: HubTemplateItem[];
}

interface TemplatesHubProps {
  initialTemplates: HubCategory[];
}

export function TemplatesHub({ initialTemplates }: TemplatesHubProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = initialTemplates
    .map((section) => ({
      ...section,
      items: section.items.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.desc.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200 py-24">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-6 border border-blue-100 shadow-sm">
            contracts
          </div>
          <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tight text-slate-900 leading-[1.1]">
            Save time with our <br />
            <span className="text-primary">free contract templates</span>
          </h1>
          <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            All of our templates have been reviewed by legal experts and proofreaders. Find the one that matches your business, customize it and get it signed.
          </p>

          <div className="max-w-md mx-auto relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 size-5 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search for a contract..."
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((section) => (
              <div key={section.category} className="mb-16 last:mb-0">


                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.items.map((template) => (
                    <Link href={template.href} key={template.title} className="group">
                      <Card className="h-full border-slate-200 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 relative overflow-hidden bg-white">
                        <CardContent className="p-6 flex flex-col h-full relative z-10">
                          <div className="flex justify-between items-start mb-4">
                            <div className="size-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors border border-transparent group-hover:border-blue-100">
                              <FileText className="size-5" />
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              {template.popular && (
                                <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider shadow-sm">
                                  Popular
                                </span>
                              )}
                              <span className="bg-slate-50 text-slate-400 text-[9px] font-bold px-1.5 py-0.5 rounded border border-slate-100 group-hover:bg-blue-50 group-hover:text-blue-500 group-hover:border-blue-100 transition-colors">
                                DOCX + PDF
                              </span>
                            </div>
                          </div>
                          <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                            {template.title}
                          </h3>
                          <p className="text-sm text-slate-500 mb-6 flex-grow leading-relaxed">
                            {template.desc}
                          </p>
                          <div className="text-blue-600 font-bold text-sm flex items-center group-hover:translate-x-1 transition-transform">
                            View Contract <ArrowRight className="ml-1 size-4" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-500 text-lg">No contracts found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
