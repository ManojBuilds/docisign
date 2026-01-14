import { Clock } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The 3-Minute Freelance Workflow: From Proposal to Paid",
  description: "Stop wasting hours on paperwork. Learn how to get your freelance contracts signed and get paid in under 3 minutes with BoopSign.",
  keywords: ["freelance workflow", "get paid faster", "contract signing guide", "boopsign guide"],
};

export default function FreelanceWorkflowGuide() {
  return (
    <article className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-6">
          FREELANCE GUIDES
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 mb-6 leading-[1.1]">
          The 3-Minute Freelance Workflow: <br />
          <span className="text-blue-600">From Proposal to Paid</span>
        </h1>
        <div className="flex items-center justify-center gap-4 text-slate-500 font-medium">
          <div className="flex items-center gap-1">
            <Clock className="size-4" /> 4 min read
          </div>
          <div className="size-1 bg-slate-200 rounded-full" />
          <div>Updated for 2026</div>
        </div>
      </div>

      <div className="prose prose-slate prose-lg max-w-none">
        <p className="lead text-xl text-slate-600 mb-12 border-l-4 border-blue-600 pl-6 italic">
          "I love chasing people for signatures," said no freelancer ever. If you're tired of enterprise tools that turn a simple contract into a day-long saga, this guide is for you.
        </p>

        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">The Problem: Enterprise Bloat</h2>
        <p>
          Most e-signature tools (we won't name names, but they rhyme with "DocuLine") were built for HR departments and legal teams at Fortune 500 companies. They require:
        </p>
        <ul className="grid md:grid-cols-2 gap-4 mt-8 list-none pl-0">
          <li className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
            <div className="size-8 bg-red-50 text-red-500 rounded-full flex items-center justify-center flex-shrink-0">X</div>
            <span className="text-slate-700 font-medium">Complex account setups</span>
          </li>
          <li className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
            <div className="size-8 bg-red-50 text-red-500 rounded-full flex items-center justify-center flex-shrink-0">X</div>
            <span className="text-slate-700 font-medium">Forced password resets for clients</span>
          </li>
          <li className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
            <div className="size-8 bg-red-50 text-red-500 rounded-full flex items-center justify-center flex-shrink-0">X</div>
            <span className="text-slate-700 font-medium">Clunky mobile apps just to sign a PDF</span>
          </li>
          <li className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
            <div className="size-8 bg-red-50 text-red-500 rounded-full flex items-center justify-center flex-shrink-0">X</div>
            <span className="text-slate-700 font-medium">High monthly fees for solo pros</span>
          </li>
        </ul>

        <h2 className="text-3xl font-bold text-slate-900 mt-20 mb-6 font-primary">The Solution: The 3-Minute Boop Workflow</h2>
        <p>
          BoopSign was built with one goal: <strong>Get the contract out of the way so you can start working.</strong> Here is how we do it.
        </p>

        <div className="space-y-12 mt-16">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="size-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-2xl flex-shrink-0 shadow-xl shadow-blue-600/20">1</div>
            <div>
              <h3 className="text-2xl font-bold mb-3">Upload your PDF (30 Seconds)</h3>
              <p className="text-slate-600">
                Drag your proposal, SOW, or NDA into BoopSign. No fields to "pre-map." Just drop the file and move to the next step.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="size-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-2xl flex-shrink-0 shadow-xl shadow-blue-600/20">2</div>
            <div>
              <h3 className="text-2xl font-bold mb-3">Place Fields (60 Seconds)</h3>
              <p className="text-slate-600">
                Click to add signature, initial, or date fields. Our editor is stripped down to the essentials—no complex logic gates or enterprise settings. Just what you need.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="size-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-2xl flex-shrink-0 shadow-xl shadow-blue-600/20">3</div>
            <div>
              <h3 className="text-2xl font-bold mb-3">Send the Boop Link (30 Seconds)</h3>
              <p className="text-slate-600">
                Send a secure, unique link to your client via email. <strong>They don't need to create an account.</strong> They don't even need a desktop. They can sign from their phone in the elevator.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-24 p-12 bg-slate-900 rounded-[3rem] text-white text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-blue-600/5 blur-[100px]" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter">Ready to try the 3-minute workflow?</h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              Stop fighting with bloated tools. Join thousands of freelancers who use BoopSign to get contracts signed instantly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup" className="w-full sm:w-auto px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all text-xl shadow-2xl shadow-blue-600/40">
                Start Your Free Trial
              </Link>
              <Link href="/docusign-vs-boopsign" className="w-full sm:w-auto px-10 py-5 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold transition-all text-xl border border-white/10">
                Compare to DocuSign
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
