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
    question: "How is BoopSign different from DocuSign?",
    answer: "Three key differences: 1) $12/month vs DocuSign's $25-65/month, 2) Actually works well on mobile devices, 3) Signers don't need accounts—they just click and sign."
  },
  {
    id: "faq-2",
    question: "Will my clients find BoopSign easier than DocuSign?",
    answer: "Absolutely. The #1 complaint we hear about DocuSign is mobile usability. BoopSign is built mobile-first, so signing on phones actually works."
  },
  {
    id: "faq-3",
    question: "What if I have a team?",
    answer: "Currently $12/month covers unlimited personal use. Team features coming Q2 2025. Even then, we'll never charge per-user fees like DocuSign."
  },
  {
    id: "faq-4",
    question: "Are electronic signatures created with BoopSign legally binding and compliant?",
    answer: "Yes, BoopSign’s electronic signatures comply with major e-signature laws such as the ESIGN Act and UETA in the U.S., and signed documents include a detailed audit trail ensuring legal validity."
  },
  {
    id: "faq-5",
    question: "How secure are my documents and data stored with BoopSign?",
    answer: "Security is a top priority: all documents are encrypted both in transit and at rest. We use enterprise-grade cloud storage and adhere to industry best practices to ensure only you and your authorized signers can access your documents."
  },
  {
    id: "faq-6",
    question: "Does BoopSign offer a free plan or trial for new users?",
    answer: "BoopSign does not have a free plan. However, new users can try the platform with a 7-day free trial. After the trial, the full-featured plan costs $12 per month, providing unlimited document signing and premium features."
  },
  {
    id: "faq-7",
    question: "Do signers need to download an app?",
    answer: "Nope! They click and sign in their browser. No downloads, no accounts."
  },
  {
    id: "faq-8",
    question: "What happens to my data if I cancel?",
    answer: "You own it all. Export everything anytime, even after canceling."
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
