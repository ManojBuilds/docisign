"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BadgeCheck, FileText, Search, Shield, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const templates = [
  {
    category: "Creative & Freelance",
    items: [
      {
        title: "Social Media Management Contract",
        desc: "For SMM agencies and freelancers. Includes scope, payment, and platform independence clauses.",
        href: "/social-media-management-contract-template",
        popular: true,
      },
      {
        title: "Wedding Photography Contract",
        desc: "Secure your dates. Includes model release, meals, and harassment clauses.",
        href: "/wedding-photography-contract-template",
        popular: true,
      },
      {
        title: "Freelance Contract Template",
        desc: "General purpose agreement for consultants, designers, and developers.",
        href: "/freelance-contract-template",
        popular: false,
      },
      {
        title: "Consulting Agreement",
        desc: "For professional consultants. Defines deliverables, timelines, and confidentiality.",
        href: "/consulting-agreement-template",
        popular: false,
      },
    ],
  },
  {
    category: "Service Business",
    items: [
      {
        title: "House Cleaning Service Agreement",
        desc: "For residential cleaners. Covers access, supplies, and liability limits.",
        href: "/house-cleaning-service-agreement-template",
        popular: true,
      },
      {
        title: "Client Onboarding Documents",
        desc: "A bundle of essential forms for welcoming new clients properly.",
        href: "/client-onboarding-documents",
        popular: false,
      },
    ],
  },
  {
    category: "Legal & General",
    items: [
      {
        title: "Non-Disclosure Agreement (NDA)",
        desc: "Protect your ideas. Standard mutual NDA for business meetings.",
        href: "/nda-template-free",
        popular: true,
      },
      {
        title: "Remote Team Signing",
        desc: "Documents for hiring and managing remote employees.",
        href: "/remote-team-document-signing",
        popular: false,
      },
    ],
  },
];

export default function ContractTemplatesHubPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = templates
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
    <main className="min-h-screen bg-slate-50/50">
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

      {/* SEO Content */}
      <section className="bg-slate-900 text-slate-400 py-20 border-t border-slate-800">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Why use BoopSign templates?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <Shield className="size-8 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-white font-bold mb-2">Legally Vetted</h3>
              <p className="text-sm">Drafted to comply with common US/EU business laws.</p>
            </div>
            <div>
              <Zap className="size-8 text-amber-500 mx-auto mb-4" />
              <h3 className="text-white font-bold mb-2">Edit & Sign</h3>
              <p className="text-sm">Don't just download. Edit them in our browser and send for signature.</p>
            </div>
            <div>
              <BadgeCheck className="size-8 text-blue-500 mx-auto mb-4" />
              <h3 className="text-white font-bold mb-2">Always Free</h3>
              <p className="text-sm">Our template library is 100% free to access and use.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
