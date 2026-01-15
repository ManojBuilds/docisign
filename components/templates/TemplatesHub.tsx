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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-6 border border-blue-100">
            TEMPLATE LIBRARY
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-slate-900">
            Documents that <span className="text-blue-600">close deals</span>.
          </h1>
          <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Stop copy-pasting from shady websites. Use our free, professional templates and get them signed in minutes with BoopSign.
          </p>

          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
            <input
              type="text"
              placeholder="Search for a template..."
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
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
                <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                  {section.category}
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.items.map((template) => (
                    <Link href={template.href} key={template.title} className="group">
                      <Card className="h-full border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6 flex flex-col h-full">
                          <div className="flex justify-between items-start mb-4">
                            <div className="size-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                              <FileText className="size-5" />
                            </div>
                            {template.popular && (
                              <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                                Popular
                              </span>
                            )}
                          </div>
                          <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                            {template.title}
                          </h3>
                          <p className="text-sm text-slate-500 mb-6 flex-grow">
                            {template.desc}
                          </p>
                          <div className="text-blue-600 font-bold text-sm flex items-center group-hover:gap-2 transition-all">
                            Get Template <ArrowRight className="ml-1 size-4" />
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
              <p className="text-slate-500 text-lg">No templates found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
