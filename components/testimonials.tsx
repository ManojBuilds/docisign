"use client";

const testimonials = [
  {
    quote: "Finally, an e-sign app that doesn't force my clients to create an account. Boopsign just works.",
    author: "Sarah",
    role: "Freelance Designer",
  },
  {
    quote:
      "We closed deals faster since switching from DocuSign. Clients love the one-click signing.",
    author: "James",
    role: "Agency Owner",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            What People Are Saying
          </h2>
          <div className="flex items-center justify-center mt-4 gap-1">
            <span className="text-2xl">⭐⭐⭐⭐⭐</span>
            <p className="text-muted-foreground font-medium">4.9/5</p>
          </div>
        </div>

        <div className="grid gap-8 mt-12 md:grid-cols-2 md:gap-12">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="p-6 border rounded-lg shadow-sm bg-card"
            >
              <blockquote className="space-y-4">
                <p className="text-lg font-medium leading-relaxed text-card-foreground italic">
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
