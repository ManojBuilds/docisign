"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingDown, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from 'next/link';

const SavingsCalculator = () => {
    const [documentsPerMonth, setDocumentsPerMonth] = useState(10);

    const docusignIndividual = 10; // $120/yr, max 5 docs/mo
    const docusignStandard = 25; // $300/yr, "unlimited" (but has 100/yr limit usually)
    const boopsignStarter = 19; // $19/mo for 20 signature requests
    const boopsignProfessional = 39; // $39/mo for 75 signature requests

    let docusignCost = 0;
    if (documentsPerMonth <= 5) {
        docusignCost = docusignIndividual;
    } else {
        docusignCost = docusignStandard;
    }

    // Determine which Boopsign plan to use based on document volume
    // Assuming 20 documents/month fits in Starter, 75 in Professional
    const boopsignPrice = documentsPerMonth <= 20 ? boopsignStarter : boopsignProfessional;

    const yearlyDocusign = docusignCost * 12;
    const yearlyBoopsign = boopsignPrice * 12;
    const savings = yearlyDocusign - yearlyBoopsign;

    return (
        <Card className="my-16 overflow-hidden border border-blue-100 shadow-2xl bg-white not-prose rounded-[2rem]">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8 md:p-10">
                <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary" className="bg-blue-600 text-white hover:bg-blue-700 font-bold px-4 py-1 rounded-full text-xs uppercase tracking-widest">
                        ROI Calculator
                    </Badge>
                </div>
                <CardTitle className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                    Stop overpaying. <span className="text-blue-600">See your savings.</span>
                </CardTitle>
                <p className="text-slate-500 mt-2 font-medium">Compare Boopsign's simple flat pricing against DocuSign's restrictive tiers.</p>
            </CardHeader>
            <CardContent className="p-8 md:p-12">
                <div className="grid lg:grid-cols-2 gap-16">
                    <div className="space-y-12">
                        {/* Document Slider */}
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-widest">
                                    <FileText className="size-4 text-blue-500" />
                                    Monthly Documents
                                </label>
                                <span className="text-3xl font-black text-blue-600 bg-blue-50 px-4 py-1 rounded-2xl">{documentsPerMonth}</span>
                            </div>
                            <Slider
                                value={[documentsPerMonth]}
                                onValueChange={(val: number[]) => setDocumentsPerMonth(val[0])}
                                max={50}
                                min={1}
                                step={1}
                                className="py-4"
                            />
                            <div className={cn(
                                "p-6 rounded-2xl text-sm font-medium transition-colors border",
                                documentsPerMonth > 5
                                    ? "bg-amber-50 text-amber-800 border-amber-200"
                                    : "bg-blue-50 text-blue-800 border-blue-200"
                            )}>
                                <div className="flex gap-3">
                                    {documentsPerMonth > 5 ? <AlertCircle className="size-5 shrink-0" /> : <CheckCircle2 className="size-5 shrink-0" />}
                                    <p>
                                        {documentsPerMonth > 5 ? (
                                            <>
                                                <strong>DocuSign Trap:</strong> Their "Personal" plan limits you to 5 documents. You'll be forced to pay <strong>$300/year</strong> ($25/mo) just to send your 6th document. Boopsign Starter ($19/mo) includes 20 signature requests, Professional ($39/mo) includes 75.
                                            </>
                                        ) : (
                                            <>
                                                You fit within DocuSign's limited "Personal" plan. But if you grow past 5 documents, your cost will jump instantly by <strong>150%</strong>. Boopsign Starter ($19/mo) includes 20 signature requests.
                                            </>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-bold text-slate-900">Why Freelancers Switch:</h4>
                            <ul className="space-y-3">
                                {[
                                    "Generous signature request limits (20 on Starter, 75 on Professional).",
                                    "No credit card required for your clients to sign.",
                                    "Professional branding included at no extra cost.",
                                    "Optimized for mobile-first client signing."
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-slate-600 text-sm">
                                        <CheckCircle2 className="size-4 text-emerald-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Result Card */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                        <div className="relative bg-slate-900 rounded-[2.5rem] p-10 text-white flex flex-col justify-center min-h-[400px] overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
                                <TrendingDown className="size-48" />
                            </div>

                            <div className="space-y-8 relative z-10">
                                <div>
                                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-4">The Comparison</p>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                                            <span className="text-slate-300">DocuSign Annual:</span>
                                            <span className="font-bold text-slate-400 line-through">${yearlyDocusign}</span>
                                        </div>
                                        <div className="flex justify-between items-center bg-blue-600/20 p-4 rounded-2xl border border-blue-500/30">
                                            <span className="text-blue-100 font-bold">Boopsign Annual:</span>
                                            <span className="font-black text-2xl text-blue-400">${yearlyBoopsign}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-white/10">
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.3em] mb-2 text-center">Your Annual Savings</p>
                                    <div className="text-6xl md:text-7xl font-black text-emerald-400 tracking-tighter text-center flex items-center justify-center">
                                        <DollarSign className="size-10 md:size-12 -mr-1" />
                                        {savings < 0 ? 0 : savings}
                                    </div>
                                </div>

                                <div className="bg-emerald-500/10 text-emerald-400 p-4 rounded-2xl text-center text-sm font-bold flex items-center justify-center gap-3 border border-emerald-500/20">
                                    <CheckCircle2 className="size-5" />
                                    <span>Enough to save {Math.round(savings / 5)} fancy coffees!</span>
                                </div>

                                <Link href="/dashboard" className="block outline-none">
                                    <button className="w-full bg-white text-slate-900 font-black py-4 rounded-2xl hover:bg-blue-50 transition-colors shadow-xl text-lg">
                                        Reclaim Your Budget
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default SavingsCalculator;
