"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, FileText, Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
  searchParams?: { [key: string]: string | string[] | undefined };
}

const TEMPLATES_PER_PAGE = 12;

export function TemplatesHub({ initialTemplates, searchParams }: TemplatesHubProps) {
  const router = useRouter();
  const pathname = usePathname();

  const searchQuery = (searchParams?.q as string) || "";
  const currentPage = Number(searchParams?.page) || 1;

  const updateSearchParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams as Record<string, string>);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  const getPageUrl = (page: number | string) => {
    const params = new URLSearchParams(searchParams as Record<string, string>);
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  const filteredItems = useMemo(() => {
    const allItems = initialTemplates.flatMap(section => section.items);
    if (!searchQuery) return allItems;

    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [initialTemplates, searchQuery]);

  const totalPages = Math.ceil(filteredItems.length / TEMPLATES_PER_PAGE);
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * TEMPLATES_PER_PAGE;
    return filteredItems.slice(start, start + TEMPLATES_PER_PAGE);
  }, [filteredItems, currentPage]);

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
              onChange={(e) => {
                updateSearchParams({ q: e.target.value || null, page: "1" });
              }}
            />
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {paginatedItems.length > 0 ? (
            <div className="space-y-12">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedItems.map((template) => (
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

              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href={currentPage > 1 ? getPageUrl(currentPage - 1) : "#"}
                          scroll={false}
                          aria-disabled={currentPage <= 1}
                          className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>

                      {[...Array(totalPages)].map((_, i) => {
                        const pageNum = i + 1;
                        if (
                          pageNum === 1 ||
                          pageNum === totalPages ||
                          (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                        ) {
                          return (
                            <PaginationItem key={pageNum}>
                              <PaginationLink
                                href={getPageUrl(pageNum)}
                                scroll={false}
                                isActive={currentPage === pageNum}
                                className="cursor-pointer"
                              >
                                {pageNum}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        }
                        if (
                          pageNum === currentPage - 2 ||
                          pageNum === currentPage + 2
                        ) {
                          return (
                            <PaginationItem key={pageNum}>
                              <PaginationEllipsis />
                            </PaginationItem>
                          );
                        }
                        return null;
                      })}

                      <PaginationItem>
                        <PaginationNext
                          href={currentPage < totalPages ? getPageUrl(currentPage + 1) : "#"}
                          scroll={false}
                          aria-disabled={currentPage >= totalPages}
                          className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
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
