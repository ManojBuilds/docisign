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
        "No hidden fees whatsoever. No per-document charges, no user fees, and no setup costs. Just $12/month for unlimited document signing.",
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
    <section className="py-16" id="faq">
      <div className="container max-w-3xl mx-auto">
        <h2 className="mb-4 text-3xl font-semibold md:mb-11 md:text-4xl">
          {heading}
        </h2>
        <Accordion type="single" collapsible>
          {items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="font-semibold hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default PricingFaq;