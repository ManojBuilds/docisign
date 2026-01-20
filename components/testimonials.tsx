"use client";

const testimonials = [
  {
    quote: "The Boopsign service has been awesome. The user interface is super easy to use and clean. I have also integrated our system with the Boopsign API and it's worked great. The company switched from DocuSign and this is so much better.",
    author: "Alex",
    role: "Full-Stack Engineer",
  },
  {
    quote: "Boopsign has nailed their UX. I truly disliked PandaDoc and I struggled to understand how they managed to overcomplicate a product like this. Boopsign's design is so intuitive and it took me 2 mins to set it all up.",
    author: "Chloe",
    role: "Technical Product Manager",
  },
  {
    quote: "I like the simplicity of the UI, which makes it user friendly and intuitive for the non-techie average user. The usability and easy accessibility of the available tools makes Boopsign a viable alternative to DocuSign.",
    author: "Marcus",
    role: "CEO & Founder",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full py-24 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-[10px] font-bold uppercase tracking-widest mb-4 border border-amber-100">
            Trusted by Early Adopters
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            What People Are Saying
          </h2>
          <div className="flex items-center justify-center mt-4 gap-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              ))}
            </div>
            <p className="text-slate-600 font-semibold">4.9/5 Average Rating</p>
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
                  <p className="font-bold text-slate-900 text-base">
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
