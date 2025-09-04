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
    question: "How is Boopsign a faster, simpler alternative to DocuSign for electronic signatures?",
    answer:
      "Boopsign is designed specifically for simplicity and speed. Unlike DocuSign’s feature-heavy approach, we focus solely on the core workflow: upload your document, place signature fields, send it out, and get it signed—all in under 3 minutes. Plus, Boopsign costs 80% less than traditional e-signature solutions."
  },
  {
    id: "faq-2",
    question: "Do document signers need to create an account to use Boopsign?",
    answer:
      "No user accounts are required for signers. Recipients can click the email link and sign documents directly without logging in, which removes barriers and speeds up the signing process significantly."
  },
  {
    id: "faq-3",
    question: "What types of document files does Boopsign support for electronic signing?",
    answer:
      "Boopsign supports uploading PDF, DOC, and DOCX files up to 10MB in size. DOC and DOCX files are seamlessly converted to PDF format server-side to ensure consistent signing experience."
  },
  {
    id: "faq-4",
    question: "Is Boopsign optimized for signing documents on mobile devices and touchscreen screens?",
    answer:
      "Absolutely. Boopsign is built mobile-first, enabling users to upload, place signature fields, and sign documents easily on any smartphone or tablet, with signature capture optimized for touch screens."
  },
  {
    id: "faq-5",
    question: "How quickly can I set up a document for signing using Boopsign?",
    answer:
      "Our platform is designed so users typically upload their document in 30 seconds, place all signature fields in 60 seconds, add signer information in 30 seconds, and send the document in just 15 seconds—totaling under 3 minutes."
  },
  {
    id: "faq-6",
    question: "Are electronic signatures created with Boopsign legally binding and compliant?",
    answer:
      "Yes, Boopsign’s electronic signatures comply with major e-signature laws such as the ESIGN Act and UETA in the U.S., and signed documents include a detailed audit trail ensuring legal validity."
  },
  {
    id: "faq-7",
    question: "What happens to documents if signers do not complete signing within the expiration period?",
    answer:
      "Documents on Boopsign automatically expire after 30 days by default. You can resend reminders, copy signing links for manual follow-ups, or adjust expiration periods as needed. Dashboard status updates keep you informed at all times."
  },
  {
    id: "faq-8",
    question: "Does Boopsign offer a free plan or trial for new users?",
    answer:
      "Boopsign does not have a free plan. However, new users can try the platform with a 7-day free trial. After the trial, the full-featured plan costs $12 per month, providing unlimited document signing and premium features."
  },
  {
    id: "faq-9",
    question: "How do I add and manage multiple signers on a single document in Boopsign?",
    answer:
      "Simply place distinct signature fields on your document and assign each field to a specific signer’s email address. All signers can sign in any order currently, with signing order management planned for future updates."
  },
  {
    id: "faq-10",
    question: "Can I edit or fix signature fields if I make a mistake before sending the document?",
    answer:
      "Yes, you have full control to drag, reposition, or delete signature fields. You can also use undo/redo features. Documents save automatically as drafts, allowing you to revisit and modify them anytime before sending."
  },
  {
    id: "faq-11",
    question: "How secure are my documents and data stored with Boopsign?",
    answer:
      "Security is a top priority: all documents are encrypted both in transit and at rest. We use enterprise-grade cloud storage and adhere to industry best practices to ensure only you and your authorized signers can access your documents."
  },
  {
    id: "faq-12",
    question: "Can signed documents be downloaded from Boopsign once the signing process completes?",
    answer:
      "Yes. Once the document is fully signed, both you and the signers will be able to download the final signed PDF from the dashboard or signing page."
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
