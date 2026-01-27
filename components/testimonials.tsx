"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "As a freelance designer, I was spending hours chasing clients for signatures. Boopsign cut that down to minutes. My clients love how easy it is - no accounts, no hassle. Just sign and done.",
    author: "Sarah Chen",
    role: "Freelance Designer",
  },
  {
    quote: "I switched from DocuSign and saved $156/year. For a freelance developer like me, that's real money. Plus, my clients actually sign contracts now because there's zero friction. Game changer.",
    author: "James Rodriguez",
    role: "Freelance Developer",
  },
  {
    quote: "The simplicity is what sold me. I send 10-15 contracts a month as a freelance writer. With Boopsign, I don't have to explain to clients how to create an account or download anything. They just click and sign.",
    author: "Emily Thompson",
    role: "Freelance Writer",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full py-24 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-semibold uppercase tracking-widest mb-4 border border-blue-200">
            <Star className="w-3 h-3 fill-current" />
            Popular with Freelancers
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6">
            Loved by Freelancers Worldwide
          </h2>
          <div className="flex items-center justify-center mt-4 gap-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              ))}
            </div>
            <p className="text-slate-600 font-semibold">4.9/5 from 1,200+ freelancers</p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3 md:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
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
      </div>
    </section>
  );
}
