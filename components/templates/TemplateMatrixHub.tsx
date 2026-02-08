"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FREELANCE_ROLES } from "@/lib/seo/freelancer-roles";
import { Briefcase, ChevronRight, Search, Zap, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
    Pagination,
    PaginationContent, PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";



export function TemplateMatrixHub() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedIndustry, setSelectedIndustry] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    // Scroll to top on page change
    const scrollToTop = () => {
        const hub = document.getElementById("template-hub-start");
        if (hub) hub.scrollIntoView({ behavior: "smooth", block: "start" });
    };


    // Group roles by industry
    const industries = useMemo(() => {
        const unique = new Set(FREELANCE_ROLES.map(r => r.industry));
        return ["All", ...Array.from(unique).sort()];
    }, []);

    // Filter roles

    // Filter roles
    const filteredRoles = useMemo(() => {
        return FREELANCE_ROLES.filter(role => {
            const matchesSearch = role.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                role.industry.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesIndustry = selectedIndustry === "All" || role.industry === selectedIndustry;
            return matchesSearch && matchesIndustry;
        });
    }, [searchTerm, selectedIndustry]);

    // Calculate pagination pages
    const { paginatedItems, totalPages } = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return {
            paginatedItems: filteredRoles.slice(startIndex, endIndex),
            totalPages: Math.ceil(filteredRoles.length / itemsPerPage)
        };
    }, [filteredRoles, currentPage]);

    // Reset page when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedIndustry]);

    return (
        <div className="space-y-12" id="template-hub-start">
            {/* Filter Controls */}
            <div className="py-4 max-w-2xl">
                <div className="flex flex-col md:flex-row gap-4 w-full items-stretch">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="Search roles (e.g. Ghostwriter)..."
                            className="pl-10 h-12 bg-white border-slate-200 w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                    <div className="w-full md:w-[200px]">
                        <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                            <SelectTrigger className="bg-white border-slate-200 w-full !h-full">
                                <SelectValue placeholder="Industry" />
                            </SelectTrigger>
                            <SelectContent>
                                {industries.map(ind => (
                                    <SelectItem key={ind} value={ind}>
                                        {ind === "All" ? "All Industries" : ind}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedItems.map((role) => (
                    <div
                        key={role.slug}
                        className="group bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 flex flex-col"
                    >
                        {/* Card Header */}
                        <div className="p-6 pb-4 bg-slate-50/50 border-b border-slate-100">
                            <div className="flex justify-between items-start mb-4">
                                <div className="size-12 rounded-2xl bg-white text-blue-600 flex items-center justify-center font-bold shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                                    {role.role.includes("Real Estate") || role.role.includes("Landlord") ? (
                                        <Briefcase className="size-6" /> // Placeholder, logic can be smarter
                                    ) : (
                                        <Zap className="size-6" />
                                    )}
                                </div>
                                <Badge variant="secondary" className="bg-slate-200/50 text-slate-600 hover:bg-slate-200">
                                    {role.industry}
                                </Badge>
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-1">{role.role}</h3>
                            <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                                Legal protection for {role.painPoint.replace("spending", "spend").replace("being", "be")}.
                            </p>
                        </div>

                        {/* Template Links */}
                        <div className="p-4 bg-white flex-1 flex flex-col gap-2">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-1">Most Popular</p>

                            <Link
                                href={`/contracts/independent-contractor-agreement/for-${role.slug}`}
                                className="flex items-center justify-between p-3 py-2 rounded-lg hover:bg-slate-50 group/link transition-colors"
                            >
                                <span className="text-sm font-medium text-slate-600 group-hover/link:text-slate-900">Contractor Agreement</span>
                                <ChevronRight className="size-4 text-slate-300 group-hover/link:text-blue-500 transition-colors" />
                            </Link>

                            <Link
                                href={`/contracts/non-disclosure-agreement/for-${role.slug}`}
                                className="flex items-center justify-between p-3 py-2 rounded-lg hover:bg-slate-50 group/link transition-colors"
                            >
                                <span className="text-sm font-medium text-slate-600 group-hover/link:text-slate-900">NDA Template</span>
                                <ChevronRight className="size-4 text-slate-300 group-hover/link:text-blue-500 transition-colors" />
                            </Link>

                            {role.tags?.includes("Real Estate") ? (
                                <Link
                                    href={`/contracts/residential-lease-agreement/for-${role.slug}`}
                                    className="flex items-center justify-between p-3 py-2 rounded-lg hover:bg-slate-50 group/link transition-colors"
                                >
                                    <span className="text-sm font-medium text-slate-600 group-hover/link:text-slate-900">Residential Lease</span>
                                    <ChevronRight className="size-4 text-slate-300 group-hover/link:text-blue-500 transition-colors" />
                                </Link>
                            ) : (
                                <Link
                                    href={`/contracts/statement-of-work/for-${role.slug}`}
                                    className="flex items-center justify-between p-3 py-2 rounded-lg hover:bg-slate-50 group/link transition-colors"
                                >
                                    <span className="text-sm font-medium text-slate-600 group-hover/link:text-slate-900">Statement of Work</span>
                                    <ChevronRight className="size-4 text-slate-300 group-hover/link:text-blue-500 transition-colors" />
                                </Link>
                            )}
                        </div>

                        {/* View All Footer */}
                        <div className="p-4 bg-slate-50 border-t border-slate-100">
                            <Button asChild variant="secondary" className="w-full bg-white border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 font-bold transition-all">
                                <Link href={`/contracts/freelance/${role.slug}`}>
                                    View All Documents
                                </Link>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            {/* Pagination Controls */}
            {totalPages > 1 && (
                <Pagination className="pt-6">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage > 1) {
                                        setCurrentPage(prev => prev - 1);
                                        scrollToTop();
                                    }
                                }}
                                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>

                        {/* Page Numbers */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    href="#"
                                    isActive={page === currentPage}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setCurrentPage(page);
                                        scrollToTop();
                                    }}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage < totalPages) {
                                        setCurrentPage(prev => prev + 1);
                                        scrollToTop();
                                    }
                                }}
                                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}


            {
                filteredRoles.length === 0 && (
                    <div className="text-center py-24">
                        <div className="size-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="size-8 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No roles found</h3>
                        <p className="text-slate-500 mb-6">Try adjusting your search or industry filter.</p>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedIndustry("All");
                            }}
                            className="min-w-[140px]"
                        >
                            Clear Filters
                        </Button>
                    </div>
                )
            }
        </div >
    );
}

