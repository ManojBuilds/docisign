import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface PricingFaqProps {
  heading?: string;
  items?: FaqItem[];
}

const PricingFaq = ({
  heading = "Frequently asked questions",
  items = [
    {
      id: "q1",
      question: "What happens during my free trial of Boopsign Pro?",
      answer:
        "You get full access to all Boopsign Pro features for 7 days. No credit card is required to start. Create unlimited documents, send them securely for signing, and explore all features risk-free.",
    },
    {
      id: "q2",
      question: "Are there any hidden fees?",
      answer:
        "No hidden fees whatsoever. No per-document charges, no user fees, and no setup costs. Just $15/month for unlimited document signing.",
    },
    {
      id: "q3",
      question: "Can I cancel my Boopsign subscription anytime?",
      answer:
        "Yes, you can cancel your subscription at any time. No contracts or commitments. You can even cancel during your free trial with no questions asked.",
    },
    {
      id: "q4",
      question: "Do document signers need to create accounts?",
      answer:
        "No! Signers can sign documents directly from their email without creating any accounts. This reduces friction and speeds up the signing process significantly.",
    },
  ]
}: PricingFaqProps) => {
  return (
    <section className="py-24 bg-secondary/20" id="faq">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            {heading}
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know about the product and billing.
          </p>
        </div>

        <div className="bg-background rounded-2xl shadow-sm border p-6 md:p-8">
          <Accordion type="single" collapsible className="w-full">
            {items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b-muted/50 last:border-0 px-2">
                <AccordionTrigger className="text-left font-medium hover:no-underline py-6 text-foreground/90 hover:text-primary transition-colors">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default PricingFaq;