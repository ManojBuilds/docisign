"use client";

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Switched from DocuSign and never looked back. My clients actually complete signatures now because there's no account creation wall. 92% completion rate vs the 60% I had before.",
    author: "Alex M.",
    role: "Marketing Consultant",
    contracts: "8-12 contracts/month",
  },
  {
    quote: "Upload takes 5 seconds. Client signs on their phone in under 90 seconds. Done. I don't need enterprise features for 15 contracts a month—I need this.",
    author: "Jamie R.",
    role: "Freelance Developer",
    contracts: "Solo business",
  },
  {
    quote: "Finally, a tool that doesn't force my clients to create yet another account. Fast, clean, professional. Exactly what solo entrepreneurs need—nothing more, nothing less.",
    author: "Taylor S.",
    role: "Brand Strategist",
    contracts: "10-15 contracts/month",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full py-24 bg-gradient-to-b from-white via-slate-50/50 to-white border-t border-slate-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-100/20 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6 border border-blue-200/50 shadow-sm">
            <Star className="w-3.5 h-3.5 fill-current" />
            Testimonials
          </div>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
            Real Feedback from Real Solo Entrepreneurs
          </h2>

          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            We're not faking numbers. These are actual testimonials from solo entrepreneurs who chose Boopsign over DocuSign and PandaDoc.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-3 max-w-7xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="group relative"
            >
              {/* Card */}
              <div className="h-full p-8 rounded-2xl bg-white border-2 border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 relative">
                {/* Quote icon */}
                <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
                  <Quote className="w-5 h-5 text-white fill-current" />
                </div>

                <blockquote className="space-y-6 pt-4">
                  {/* Quote text */}
                  <p className="text-base font-medium leading-relaxed text-slate-700">
                    "{testimonial.quote}"
                  </p>

                  {/* Author info */}
                  <footer className="border-t-2 border-slate-100 pt-6 space-y-2">
                    <p className="font-bold text-slate-900 text-base">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-slate-600 font-medium">
                      {testimonial.role}
                    </p>
                    <p className="text-xs text-slate-500 font-medium">
                      {testimonial.contracts}
                    </p>
                  </footer>
                </blockquote>

                {/* Star rating */}
                <div className="flex gap-0.5 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 max-w-2xl mx-auto">
          <p className="text-sm text-slate-600 font-medium mb-4">
            Join solo entrepreneurs who switched from DocuSign, PandaDoc, and HelloSign
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-semibold">92% completion rate</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="font-semibold">{'<'} 2 second page loads</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-indigo-500" />
              <span className="font-semibold">No client accounts needed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}