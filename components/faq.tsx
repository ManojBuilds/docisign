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
  className?: string;
}

const Faq = ({
  heading = "Frequently Asked Questions",
  className = "py-32",
  items = [
    {
      id: "faq-1",
      question: "How is BoopSign different from DocuSign?",
      answer: "BoopSign is built for speed and simplicity. Unlike DocuSign, your clients don't need to create accounts—they sign directly from email. We're also 10x cheaper ($15/month vs $150+/month) with no per-contract fees. Perfect for freelancers and consultants who need simple e-signatures without enterprise complexity."
    },
    {
      id: "faq-2",
      question: "Do signers need to create an account?",
      answer: "No! This is our biggest differentiator. Signers receive a secure, one-time link via email and can sign immediately—no login, no password, no app download. This reduces signing time from hours to minutes and eliminates the #1 friction point in e-signatures."
    },
    {
      id: "faq-3",
      question: "What's your pricing? Any hidden fees?",
      answer: "Simple, transparent pricing: $15/month for unlimited contract signing. No per-contract charges, no user fees, no setup costs. Start with a 7-day free trial—no credit card required. Cancel anytime with no questions asked."
    },
    {
      id: "faq-4",
      question: "Is it legally binding?",
      answer: "Yes! Every signature includes a complete audit trail with timestamp, IP address, email verification, and signer identity proof. BoopSign e-signatures are legally binding and compliant with ESIGN Act and UETA regulations—just like DocuSign, but simpler."
    },
    {
      id: "faq-5",
      question: "Can I use it on mobile?",
      answer: "Absolutely! BoopSign is mobile-first. Your clients can sign contracts, NDAs, and proposals on their phone in under 30 seconds. No app download required—works perfectly in any mobile browser."
    },
    {
      id: "faq-6",
      question: "What file types do you support?",
      answer: "We support PDF, DOCX, DOC, and image files (PNG, JPG). Upload any contract type and we'll handle the rest. Signed contracts are always delivered as PDFs with embedded audit trails."
    },
    {
      id: "faq-7",
      question: "How fast can I get a contract signed?",
      answer: "Most contracts are signed within minutes. Upload takes 30 seconds, your client receives the email instantly, and they can sign in under 1 minute. Total time from upload to signed PDF: under 3 minutes. Compare that to DocuSign's average of 24-48 hours."
    },
    {
      id: "faq-8",
      question: "Can I try it before paying?",
      answer: "Yes! Start with a 7-day free trial of BoopSign Pro—no credit card required. Test unlimited contract signing, all features included. If you don't love it, cancel anytime with one click."
    },
    {
      id: "faq-9",
      question: "Who is BoopSign best for?",
      answer: "Freelancers, consultants, small businesses, and agencies who need simple, fast e-signatures. If you're sending contracts, NDAs, proposals, or service agreements and find DocuSign too complex or expensive, BoopSign is built for you."
    }
  ]
}: Faq1Props) => {
  return (
    <section className={className} id="faq">
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