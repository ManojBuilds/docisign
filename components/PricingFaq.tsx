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
  heading = "Questions Solo Entrepreneurs Actually Ask",
  items = [
    {
      id: "q1",
      question: "Is this legally binding?",
      answer:
        "Yes. Every signature includes timestamp, IP address, and email verification. Compliant with ESIGN Act and UETA. As legally binding as DocuSign's $500/month enterprise plan.",
    },
    {
      id: "q2",
      question: "What if I need [insert enterprise feature]?",
      answer:
        "You probably don't. But if you do, we're not your tool. We're built for solo operators who need speed and simplicity, not legal teams managing 1,000-person approval chains.",
    },
    {
      id: "q3",
      question: "Why should I trust a small tool?",
      answer:
        "Fair question. We're intentionally small. Small means: faster response to support emails (not routed through 5 departments), we actually read your feature requests, no corporate overlords forcing bloat, no acquisition → shutdown cycle. We're here for the long haul, just smaller and focused.",
    },
    {
      id: "q4",
      question: "Can my clients sign without creating an account?",
      answer:
        "That's literally the point. They click a link, they sign, they're done. No 'Forgot Password' emails. No app downloads. No onboarding.",
    },
    {
      id: "q5",
      question: "Will you add [feature X] in the future?",
      answer:
        "Only if it serves our core mission: simplicity and speed. We're not adding Salesforce integration or blockchain signatures. We might add multi-language support or SMS notifications. We'll never become DocuSign.",
    },
    {
      id: "q6",
      question: "What if I outgrow Boopsign?",
      answer:
        "Then we've done our job. If you scale to needing enterprise features, DocuSign will be waiting for you. We'll make it easy to export your data. No hard feelings. We're optimized for solo to small, not small to enterprise.",
    },
    {
      id: "q7",
      question: "Are there any hidden fees?",
      answer:
        "No hidden fees whatsoever. No per-document charges, no user fees, and no setup costs. Just $29/month for unlimited document signing.",
    },
    {
      id: "q8",
      question: "Can I cancel my Boopsign subscription anytime?",
      answer:
        "Yes, you can cancel your subscription at any time. No contracts or commitments. You can even cancel during your free trial with no questions asked.",
    },
  ]
}: PricingFaqProps) => {
  return (
    <section className="py-24 bg-secondary/20" id="faq">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold tracking-tight mb-4">
            {heading}
          </h2>
          <p className="text-muted-foreground">
            (And Honest Answers)
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