import { DollarSign, Clock, UserX } from "lucide-react";
import { Highlighter } from "./ui/highlighter";

const ProblemSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-slate-50" id="problems">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24 text-center mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs font-medium uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            The Enterprise E-Signature Tax
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6 font-primary">
            You're paying for <Highlighter action="crossed-off" color="#ef4444" animationDuration={0} strokeWidth={2}>bloat you don't need</Highlighter>
          </h2>
        </div>

        {/* Problems Grid */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
          {/* Problem 1: Overpaying */}
          <div className="group p-8 rounded-3xl bg-white border border-slate-200 shadow-sm transition-all duration-300">
            <span className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-red-50 border border-red-100">
              <DollarSign className="size-6 text-red-500" />
            </span>
            <h3 className="mb-3 text-xl font-semibold text-slate-900">
              $180/Year for Features You Never Use
            </h3>
            <p className="leading-relaxed text-slate-500">
              DocuSign, PandaDoc, and HelloSign were built for enterprise legal teams managing thousands of contracts.
              <br /><br />
              You send maybe 15 contracts a month.
              <br /><br />
              Why are you paying for features designed for Fortune 500 companies, not solo entrepreneurs?
            </p>

            {/* Quantified waste */}
            <div className="mt-6 p-4 bg-red-50 rounded-xl border border-red-100">
              <p className="text-red-700 font-semibold">$150/year wasted</p>
              <p className="text-red-600 text-sm">on enterprise bloat</p>
            </div>
          </div>

          {/* Problem 2: Client Friction */}
          <div className="group p-8 rounded-3xl bg-white border border-slate-200 shadow-sm transition-all duration-300">
            <span className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-red-50 border border-red-100">
              <UserX className="size-6 text-red-500" />
            </span>
            <h3 className="mb-3 text-xl font-semibold text-slate-900">
              37% Abandon at 'Create Account'
            </h3>
            <p className="leading-relaxed text-slate-500">
              Your client is ready to sign. They click your email link.
              <br /><br />
              "Please create an account to continue."
              <br /><br />
              37% of people abandon signature requests because of account creation friction. That's a tool problem, not a client problem.
            </p>

            {/* Quantified loss */}
            <div className="mt-6 p-4 bg-red-50 rounded-xl border border-red-100">
              <p className="text-red-700 font-semibold">$8,400/year lost</p>
              <p className="text-red-600 text-sm">in abandoned deals</p>
            </div>
          </div>

          {/* Problem 3: Time Theft */}
          <div className="group p-8 rounded-3xl bg-white border border-slate-200 shadow-sm transition-all duration-300">
            <span className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-red-50 border border-red-100">
              <Clock className="size-6 text-red-500" />
            </span>
            <h3 className="mb-3 text-xl font-semibold text-slate-900">
              4.2 Days Average Signature Time
            </h3>
            <p className="leading-relaxed text-slate-500">
              Send contract Monday. client says "I couldn't log in" Wednesday. Friday: Finally signed.
              <br /><br />
              That's 4 days of mental overhead and anxiety while you wait. Time you could spend finding the next client.
            </p>

            {/* Quantified time loss */}
            <div className="mt-6 p-4 bg-red-50 rounded-xl border border-red-100">
              <p className="text-red-700 font-semibold">$15,600/year opportunity cost</p>
              <p className="text-red-600 text-sm">from time spent on admin</p>
            </div>
          </div>
        </div>

        {/* Transition */}
        <div className="mt-20 text-center py-12 bg-white rounded-3xl border border-slate-200">
          <h3 className="text-2xl md:text-3xl font-semibold text-blue-600 mb-4 font-primary">
            There&apos;s a better way.
          </h3>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            (And it doesn&apos;t require an MBA in enterprise software.)
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;