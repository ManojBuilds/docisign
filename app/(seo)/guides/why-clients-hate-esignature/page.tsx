import { Frown, MailOpen, Smartphone, Sparkles } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Why Your Clients Hate Your E-Signature Tool (And How to Fix It)",
  description: "Account creation and clunky logins are the #1 reason clients delay signing contracts. Learn how to fix your signer experience.",
  keywords: ["signer experience", "esignature friction", "client onboarding", "boopsign no account"],
};

export default function SignerExperienceGuide() {
  return (
    <article className="container mx-auto px-4 py-16 md:py-24 max-w-4xl font-primary">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-sm font-bold mb-6">
          SIGNER EXPERIENCE
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 mb-6 leading-[1.1]">
          Why Your Clients Hate Your <br />
          <span className="text-amber-500 underline decoration-amber-500/20">E-Signature Tool</span>
        </h1>
        <div className="flex items-center justify-center gap-4 text-slate-500 font-medium">
          <div className="flex items-center gap-1">
            <Smartphone className="size-4" /> 5 min read
          </div>
          <div className="size-1 bg-slate-200 rounded-full" />
          <div>Conversion Optimization Guide</div>
        </div>
      </div>

      <div className="prose prose-slate prose-lg max-w-none">
        <p className="lead text-xl text-slate-600 mb-12">
          You just landed a dream client. You sent the contract. And then... <strong>crickets.</strong> Two days later, you follow up. "Oh, I haven't had a chance to set up an account on that signing thing yet," they reply.
        </p>

        <h2 className="text-3xl font-bold text-slate-900 mt-16 mb-6">The "Account Creation" Friction Point</h2>
        <p>
          In the world of UX, friction is anything that prevents a user from completing a task. When you send a contract via an enterprise e-signature tool, you are asking your client to:
        </p>
        <ol className="space-y-6 my-10 pl-6">
          <li className="flex items-start gap-4">
            <span className="size-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</span>
            <p className="m-0">Find your email in their inbox.</p>
          </li>
          <li className="flex items-start gap-4">
            <span className="size-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</span>
            <p className="m-0 text-red-600 font-bold italic">Click a link that forces them to create an account or set a password.</p>
          </li>
          <li className="flex items-start gap-4">
            <span className="size-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</span>
            <p className="m-0">Verify their email (again).</p>
          </li>
          <li className="flex items-start gap-4">
            <span className="size-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold">4</span>
            <p className="m-0">Log in to the platform.</p>
          </li>
        </ol>

        <p>
          By step 2, most busy CEOs and managers have closed the tab. They'll "get to it later," which in business terms usually means never.
        </p>

        <div className="my-16 p-8 bg-amber-50 rounded-3xl border border-amber-100 flex gap-6 items-start">
          <Frown className="size-10 text-amber-500 flex-shrink-0 mt-1" />
          <div>
            <h4 className="text-xl font-bold text-amber-900 mb-2">The Hidden Cost of Friction</h4>
            <p className="text-amber-800 m-0">
              Every minute a contract sits unsigned is a minute you aren't getting paid. For a freelancer with a $5,000 project, a 3-day signing delay basically costs you $100/day in cash-flow velocity.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-slate-900 mt-20 mb-6">The Better Way: Zero-Account Signing</h2>
        <p>
          BoopSign was built to eliminate the #1 reason signers stop mid-flow. With BoopSign, the experience looks like this:
        </p>

        <div className="grid md:grid-cols-2 gap-8 my-12">
          <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm">
            <MailOpen className="size-10 text-blue-600 mb-6" />
            <h4 className="text-xl font-bold mb-3">One Secure Link</h4>
            <p className="text-slate-600 text-sm leading-relaxed">Client gets a unique, encrypted link in their email. No passwords required.</p>
          </div>
          <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm">
            <Smartphone className="size-10 text-blue-600 mb-6" />
            <h4 className="text-xl font-bold mb-3">Mobile-First Signature</h4>
            <p className="text-slate-600 text-sm leading-relaxed">They sign with their finger on their phone. Works instantly in any browser.</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-slate-900 mt-20 mb-6">3 Tips to Improve Your Sign Rate</h2>
        <ul className="space-y-4 list-disc pl-6">
          <li><strong>Keep it mobile-friendly:</strong> 70% of e-signatures are now completed on a mobile device. Ensure your tool doesn't require an app download.</li>
          <li><strong>Send at the right time:</strong> Send contracts on Tuesday mornings or Thursday afternoons. Avoid Friday evening "document dumps."</li>
          <li><strong>Remove the account barrier:</strong> Use a tool like BoopSign where the signer can go from email to "Signed" in under 60 seconds.</li>
        </ul>

        <div className="mt-24 p-12 bg-blue-600 rounded-[3rem] text-white text-center relative overflow-hidden">
          <Sparkles className="absolute top-10 right-10 size-20 opacity-20" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter text-white">Delight your clients today.</h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Switch to BoopSign and see how much faster your contracts get signed when you remove the signup barrier.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup" className="w-full sm:w-auto px-10 py-5 bg-white text-blue-600 rounded-2xl font-black transition-all text-xl shadow-2xl">
                Get Started for Free
              </Link>
              <Link href="/pricing" className="w-full sm:w-auto px-10 py-5 bg-blue-700 text-white rounded-2xl font-bold transition-all text-xl border border-blue-500">
                View All Features
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
