"use client";

interface TestimonialProps {
  quote: string;
  author: string;
  role?: string;
  highlightKeywords?: string[];
}

const Testimonial = ({
  quote,
  author,
  role,
  highlightKeywords = [],
}: TestimonialProps) => {
  // Optional: highlight keywords in quote with strong tag
  const highlightedQuote = highlightKeywords.reduce<string>(
    (text, keyword) =>
      text.replace(
        new RegExp(`(${keyword})`, "gi"),
        '<strong class="text-primary font-semibold">$1</strong>'
      ),
    quote
  );

  return (
    <blockquote className="max-w-3xl mx-auto my-16 px-6 text-center text-lg italic text-muted-foreground relative">
      <p dangerouslySetInnerHTML={{ __html: highlightedQuote }} />
      <footer className="mt-8 text-base font-semibold">
        — {author}
        {role && <span className="block text-sm font-normal text-muted-foreground">{role}</span>}
      </footer>
    </blockquote>
  );
};

export default function TestimonialsSection() {
  const keywords = ["freelancers", "small businesses", "consultants", "DocuSign alternative"];

  return (
    <section className="py-20 text-center">
      <h2 className="mb-8 text-3xl font-bold">
        Trusted by Thousands of Professionals
      </h2>
      <Testimonial
        quote="Switched from DocuSign to Boopsign and cut our signing time by 70%. The mobile experience is incredible."
        author="Sarah K."
        role="Real Estate Agent"
        highlightKeywords={keywords}
      />
      <p className="max-w-2xl mx-auto text-md font-medium text-muted-foreground mt-10">
        Join thousands of&nbsp;
        <strong className="text-primary">freelancers</strong>,&nbsp;
        <strong className="text-primary">small businesses</strong>, and&nbsp;
        <strong className="text-primary">consultants</strong> who&apos;ve simplified their document signing process with the best&nbsp;
        <strong className="text-primary">DocuSign alternative</strong>.
      </p>
    </section>
  );
}
