import { AlertCircle, Check, DollarSign, TrendingUp } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "E-Signature Pricing: $15 vs $65 Tools - Which is Better?",
  description: "Comparing the cost and value of e-signature platforms. Why pay $65/month for enterprise features you'll never use?",
  keywords: ["esignature pricing", "docusign vs boopsign cost", "cheap esignature", "freelancer software budget"],
};

export default function CostComparisonGuide() {
  return (
    <article className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-600 text-sm font-bold mb-6">
          PRICING ANALYSIS
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 mb-6 leading-[1.1]">
          The $15 vs $65 Choice: <br />
          <span className="text-green-600">Which Tool Do You Need?</span>
        </h1>
        <div className="flex items-center justify-center gap-4 text-slate-500 font-medium">
          <div className="flex items-center gap-1">
            <DollarSign className="size-4" /> 6 min read
          </div>
          <div className="size-1 bg-slate-200 rounded-full" />
          <div>Budget Planning 2026</div>
        </div>
      </div>

      <div className="prose prose-slate prose-lg max-w-none">
        <p className="lead text-xl text-slate-600 mb-12">
          You shouldn't need a corporate budget just to sign an NDA. Yet, many e-signature tools have hiked their prices so high that solo professionals are paying for "Enterprise API Access" they'll never use.
        </p>

        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">The Market Split</h2>
        <p>
          Broadly speaking, the e-signature market has split into two camps:
        </p>

        <div className="grid md:grid-cols-2 gap-8 my-12">
          <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm">
            <div className="text-3xl font-black text-slate-900 mb-2">$45 - $65 /mo</div>
            <h4 className="text-slate-500 font-bold mb-6 text-sm uppercase tracking-widest">Enterprise Giants</h4>
            <ul className="space-y-3 pl-0 list-none text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <AlertCircle className="size-4 text-amber-500" /> Complex User Management
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="size-4 text-amber-500" /> Corporate Compliance Sheets
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="size-4 text-amber-500" /> Hidden "Per-Document" Fees
              </li>
            </ul>
          </div>
          <div className="p-8 bg-blue-600 text-white rounded-3xl shadow-xl shadow-blue-600/20">
            <div className="text-3xl font-black mb-2">$15 /mo</div>
            <h4 className="text-blue-200 font-bold mb-6 text-sm uppercase tracking-widest">BoopSign (Solo Pro)</h4>
            <ul className="space-y-3 pl-0 list-none text-sm text-blue-100">
              <li className="flex items-center gap-2">
                <Check className="size-4 text-blue-400" /> Unlimited Documents
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4 text-blue-400" /> Mobile-First Signing
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4 text-blue-400" /> Simple Audit Trail
              </li>
            </ul>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-slate-900 mt-20 mb-6">Why the Price Difference?</h2>
        <p>
          Enterprise tools are expensive not because they sign documents "better," but because they support 500-user teams with complex hierarchical permissions. If you are a team of 1-5 people, you are subsidizing their sales teams and trade show booths.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Hidden Costs to Watch Out For</h3>
        <ul className="space-y-4">
          <li><strong>Envelope Limits:</strong> Many "Pro" plans limit you to 25 documents a month. Send one more and your bill spikes.</li>
          <li><strong>Signer Requirements:</strong> Does the tool force your client to see ads or create an account? That's a cost to your reputation.</li>
          <li><strong>Branding:</strong> Do you have to pay $50/mo extra just to add your logo? (At BoopSign, custom logos are included).</li>
        </ul>

        <h2 className="text-3xl font-bold text-slate-900 mt-20 mb-6">The ROI calculation for BoopSign</h2>
        <p>
          At $15/month, BoopSign pays for itself if it saves you just 15 minutes of work a <strong>month</strong>.
        </p>

        <div className="my-16 p-10 bg-slate-50 rounded-3xl border border-slate-100 italic">
          "I was paying $45/month for DocuSign and using maybe 10% of the features. Switched to BoopSign and my clients are actually signing faster because they don't have to log in. It's a no-brainer."
          <div className="mt-4 not-italic font-bold text-slate-900">— Sarah J., Creative Director</div>
        </div>

        <div className="mt-24 p-12 bg-slate-900 rounded-[3rem] text-white text-center relative overflow-hidden">
          <TrendingUp className="absolute -bottom-10 -left-10 size-40 opacity-10 text-green-500" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter">Sign smarter, not more expensive.</h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              Get all the legal-binding security you need for a fraction of the enterprise price.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup" className="w-full sm:w-auto px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all text-xl shadow-2xl">
                Try it for $15/mo
              </Link>
              <Link href="/docusign-vs-boopsign" className="w-full sm:w-auto px-10 py-5 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold transition-all text-xl border border-white/10">
                Detailed Comparison
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
