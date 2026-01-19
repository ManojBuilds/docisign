import { FaqItem } from "@/types";
import Faq from "@/components/faq";

interface FAQSectionProps {
  heading: string;
  items: FaqItem[];
  category?: string;
}

export default function FAQSection({ heading, items, category }: FAQSectionProps) {
  return (
    <section className="px-4">
      <div className="container mx-auto max-w-4xl">
        <Faq
          heading={heading || `${category || "General"} eSignatures: Frequently Asked Questions`}
          items={items}
        />
      </div>
    </section>
  );
}