import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Check, FileText, Layout, Shield, Zap } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free NDA Template for Freelancers | Download & E-Sign",
  description: "Protect your ideas with our free Non-Disclosure Agreement (NDA) template. Download as PDF and sign legally in minutes with BoopSign.",
  keywords: [
    "free NDA template",
    "freelance nda",
    "non-disclosure agreement free",
    "esignature for nda",
    "legal templates for consultants",
  ],
  alternates: {
    canonical: "https://boopsign.com/nda-template-free",
  },
};

export default function NdaTemplatePage() {
  return (
    <main className="min-h-screen bg-slate-50/50">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-[120px] rounded-full translate-x-1/2" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-6">
            FREE LEGAL TEMPLATE
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Protect Your Work with our <br />
            <span className="text-blue-500">Free NDA Template</span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Download our lawyer-vetted Non-Disclosure Agreement and get it signed legally by your client in under 3 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg font-bold shadow-xl shadow-blue-600/20">
              <Link href="/dashboard">
                Upload & Sign Now <Zap className="ml-2 size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-8 bg-white/5 hover:bg-white/10 text-white border-white/10 rounded-xl text-lg font-bold">
              <Link href="#template">
                Preview Template
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-24" id="template">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Template Preview (Sticky) */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-100 p-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                      <FileText className="size-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Standard NDA v2026</h3>
                      <p className="text-xs text-slate-500">Mutual Non-Disclosure Agreement</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 px-2 py-1 rounded">Vetted</span>
                </div>
                <div className="p-8 md:p-12 space-y-6 text-slate-400 select-none grayscale opacity-60">
                  <div className="h-4 bg-slate-100 rounded w-1/3" />
                  <div className="space-y-3">
                    <div className="h-3 bg-slate-50 rounded w-full" />
                    <div className="h-3 bg-slate-50 rounded w-full" />
                    <div className="h-3 bg-slate-50 rounded w-3/4" />
                  </div>
                  <div className="h-3 bg-slate-100 rounded w-1/4 mt-8" />
                  <div className="space-y-3">
                    <div className="h-3 bg-slate-50 rounded w-full" />
                    <div className="h-3 bg-slate-50 rounded w-full" />
                    <div className="h-3 bg-slate-50 rounded w-full" />
                    <div className="h-3 bg-slate-50 rounded w-5/6" />
                  </div>
                  <div className="h-3 bg-slate-100 rounded w-1/3 mt-8" />
                  <div className="space-y-3">
                    <div className="h-3 bg-slate-50 rounded w-full" />
                    <div className="h-3 bg-slate-50 rounded w-full" />
                  </div>
                </div>
                <div className="p-8 bg-slate-50 border-t border-slate-100 text-center">
                  <p className="text-sm text-slate-500 mb-6 font-medium">Ready to customize this document?</p>
                  <Button asChild className="bg-slate-900 hover:bg-slate-800 text-white px-8 h-12 rounded-xl">
                    <Link href="/dashboard">
                      Open in BoopSign Editor — Free
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="prose prose-slate max-w-none">
                <h2 className="text-3xl font-bold text-slate-900">Why use this NDA?</h2>
                <p>
                  This Non-Disclosure Agreement is designed specifically for freelancers, consultants, and solo professionals. It protects your proprietary information, client lists, and technical know-how during discovery calls or project onboarding.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <Shield className="size-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold mb-1">Mutual Protection</h4>
                      <p className="text-xs text-slate-500 m-0">Protects both you and your client equally.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <Layout className="size-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold mb-1">Easy to Edit</h4>
                      <p className="text-xs text-slate-500 m-0">Simple language that doesn't need a lawyer to translate.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar CTA */}
            <div className="space-y-8 lg:sticky lg:top-24">
              <Card className="rounded-3xl border-2 border-blue-600 overflow-hidden shadow-2xl">
                <div className="bg-blue-600 p-6 text-white text-center">
                  <h3 className="text-2xl font-black italic">Speed Matters</h3>
                  <p className="text-blue-100 text-sm mt-1">Sign in 60 seconds</p>
                </div>
                <CardContent className="p-8">
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3 text-sm font-medium">
                      <Check className="size-4 text-emerald-500" /> No Account for Signers
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium">
                      <Check className="size-4 text-emerald-500" /> Full Audit Trail
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium">
                      <Check className="size-4 text-emerald-500" /> Mobile-Optimized
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium">
                      <Check className="size-4 text-emerald-500" /> Legally Binding
                    </li>
                  </ul>
                  <Button asChild className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-600/30">
                    <Link href="/dashboard">
                      Use this Template <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <div className="p-8 bg-slate-900 rounded-3xl text-white">
                <h4 className="font-bold mb-4">FAQ</h4>
                <div className="space-y-6">
                  <div>
                    <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Legality</p>
                    <p className="text-sm text-slate-400">Yes, signatures through BoopSign are legally binding under the ESIGN Act.</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Pricing</p>
                    <p className="text-sm text-slate-400">You can use this template and sign it for free during your 7-day trial.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <blockquote className="text-2xl font-medium text-slate-900 leading-relaxed italic">
            &quot;Using the BoopSign NDA template was a game-changer. I sent the link during a discovery call and had it signed before we off the Zoom.&quot;
          </blockquote>
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="size-12 bg-slate-200 rounded-full" />
            <div className="text-left">
              <p className="font-bold text-slate-900 m-0">Jamie L.</p>
              <p className="text-sm text-slate-500 m-0">Independent Consultant</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}