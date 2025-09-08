"use client";

const testimonials = [
  {
    quote: "Finally, an e-signature tool that works on mobile!",
    author: "Sarah K.",
    role: "Real Estate Agent",
  },
  {
    quote:
      "Real estate contracts that used to take 3 days now close in 3 hours",
    author: "Mike T.",
    role: "Contractor",
  },
  {
    quote:
      "My 65-year-old clients can actually sign documents on their phone now",
    author: "Lisa M.",
    role: "Consultant",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            2,847 businesses have ditched DocuSign for BoopSign
          </h2>
          <div className="flex items-center justify-center mt-4 gap-1">
            <span className="text-2xl">⭐⭐⭐⭐⭐</span>
            <p className="text-muted-foreground font-medium">4.9/5</p>
          </div>
        </div>

        <div className="grid gap-8 mt-12 md:grid-cols-3 md:gap-12">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="p-6 border rounded-lg shadow-sm bg-card"
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
