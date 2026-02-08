import { Star } from "lucide-react";
import { Highlighter } from "./ui/highlighter";

const HonestSocialProof = () => {
  const testimonials = [
    {
      quote: "DocuSign wanted $45/month for features I'd never use. Boopsign is faster, simpler, and my clients actually sign because there's no account creation wall. Best $39 I spend each month.",
      author: "Alex M.",
      role: "Marketing Consultant",
    },
    {
      quote: "Upload in 5 seconds. Client signs in 90 seconds. That's it. No complicated workflows, no training videos, no enterprise features I don't need. Just contracts signed fast.",
      author: "Jamie R.",
      role: "Freelance Developer",
    },
    {
      quote: "I tried DocuSign, HelloSign, and PandaDoc. All overkill. Boopsign does exactly what I need—gets NDAs and service agreements signed without making my clients jump through hoops.",
      author: "Taylor S.",
      role: "Brand Strategist",
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-white" id="social-proof">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium uppercase tracking-wider mb-6">
            <Star className="w-3 h-3 fill-current" />
            Real Solo Entrepreneurs
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6 font-primary">
            Built for Solos. <Highlighter action="circle" color="#6366f1" animationDuration={0} strokeWidth={2} padding={8}>Not Enterprises.</Highlighter>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
            Used by 20+ solo entrepreneurs who switched from DocuSign and PandaDoc because they refused to overpay for features they'd never use.
          </p>
        </div>

        {/* Stats */}
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 text-center">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm shadow-slate-100">
            <p className="text-3xl font-bold text-slate-900">92%</p>
            <p className="text-slate-600 font-medium">Completion Rate</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm shadow-slate-100">
            <p className="text-3xl font-bold text-slate-900">&lt;2s</p>
            <p className="text-slate-600 font-medium">Page Load Speed</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm shadow-slate-100">
            <p className="text-3xl font-bold text-slate-900">90s</p>
            <p className="text-slate-600 font-medium">Avg. Signing Time</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm shadow-slate-100">
            <p className="text-3xl font-bold text-slate-900">$39</p>
            <p className="text-slate-600 font-medium">Professional Plan</p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid gap-8 md:grid-cols-3 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 rounded-3xl bg-slate-50 border border-slate-100 shadow-sm shadow-slate-100 hover:shadow-md transition-shadow"
            >
              <blockquote className="space-y-6">
                <p className="text-lg font-medium leading-relaxed text-slate-700 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <footer className="text-sm border-t border-slate-200 pt-6">
                  <p className="font-semibold text-slate-900 text-base">
                    {testimonial.author}
                  </p>
                  <p className="text-slate-500 font-medium">{testimonial.role}</p>
                </footer>
              </blockquote>
            </div>
          ))}
        </div>

        {/* Honest Statement */}
        <div className="mt-20 max-w-4xl mx-auto text-center bg-indigo-50/50 rounded-3xl p-10 border border-indigo-100">
          <p className="text-lg text-slate-700 font-bold leading-relaxed mb-4">
            Boopsign isn&apos;t for everyone.
          </p>
          <p className="text-base text-slate-600 font-medium leading-relaxed">
            We&apos;re for solo entrepreneurs who value simplicity over complexity,
            speed over features, and honest pricing over vendor lock-in.
            If you&apos;re a team of one who needs contracts signed fast without the enterprise tax, you&apos;re in the right place.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HonestSocialProof;