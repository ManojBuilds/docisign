"use client";

const testimonials = [
  {
    quote: "The BoopSign service has been awesome. The user interface is super easy to use and clean. I have also integrated our system with the BoopSign API and it's worked great. The company switched from DocuSign and this is so much better.",
    author: "Alex",
    role: "Full-Stack Engineer",
  },
  {
    quote: "BoopSign has nailed their UX. I truly disliked PandaDoc and I struggled to understand how they managed to overcomplicate a product like this. BoopSign's design is so intuitive and it took me 2 mins to set it all up.",
    author: "Chloe",
    role: "Technical Product Manager",
  },
  {
    quote: "I like the simplicity of the UI, which makes it user friendly and intuitive for the non-techie average user. The usability and easy accessibility of the available tools makes BoopSign a viable alternative to DocuSign.",
    author: "Marcus",
    role: "CEO & Founder",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest mb-4">
            Trusted by Early Adopters
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            What People Are Saying
          </h2>
          <div className="flex items-center justify-center mt-4 gap-1">
            <span className="text-2xl">⭐⭐⭐⭐⭐</span>
            <p className="text-muted-foreground font-medium">4.9/5</p>
          </div>
        </div>

        <div className="grid gap-8 mt-12 md:grid-cols-3 md:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="p-6 border rounded bg-card"
            >
              <blockquote className="space-y-4">
                <p className="text-lg font-medium leading-relaxed text-card-foreground">
                  “{testimonial.quote}”
                </p>
                <footer className="text-sm">
                  <p className="font-semibold text-card-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-muted-foreground">{testimonial.role}</p>
                </footer>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
