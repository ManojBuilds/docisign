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

interface Faq1Props {
  heading?: string;
  items?: FaqItem[];
}

const Faq = ({
  heading = "Frequently asked questions",
  items = [
  {
    id: "faq-1",
    question: "What is your pricing model?",
    answer: "Simple, transparent pricing. Start with a 7-day free trial of Boopsign Pro. After the trial, it's just $12/month for unlimited document signing with all features included."
  },
  {
    id: "faq-2",
    question: "Do I need to pay to start my free trial?",
    answer: "No, you can start your 7-day free trial of Boopsign Pro today with no credit card required."
  },
  {
    id: "faq-3",
    question: "Can I cancel anytime during my free trial?",
    answer: "Yes, you can cancel your subscription at any time. No contracts or commitments. You can even cancel during your free trial with no questions asked."
  },
  {
    id: "faq-4",
    question: "Do document signers need to create accounts?",
    answer: "No! Signers can sign documents directly from their email without creating any accounts. This reduces friction and speeds up the signing process significantly."
  },
  {
    id: "faq-5",
    question: "What features are included in the Pro plan?",
    answer: "The Pro plan includes unlimited document signing, support for PDF, DOC, and DOCX files, mobile-friendly e-signature platform, real-time email notifications, legally binding digital signatures, and comprehensive document tracking."
  },
  {
    id: "faq-6",
    question: "Are there any hidden fees?",
    answer: "No hidden fees whatsoever. No per-document charges, no user fees, and no setup costs. Just $12/month for unlimited document signing."
  },
  {
    id: "faq-7",
    question: "Is the platform mobile-friendly?",
    answer: "Yes, our platform is mobile-first designed to work seamlessly on any device."
  },
  {
    id: "faq-8",
    question: "How does it compare to DocuSign?",
    answer: "BoopSign is simpler, faster, and more affordable than DocuSign. No login required for signers, mobile-optimized, and significantly more cost-effective with transparent pricing."
  }
]
}: Faq1Props) => {
  return (
    <section className="py-32" id="faq">
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

export default Faq;