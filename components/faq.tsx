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
      question: "How is Docisign different from DocuSign?",
      answer:
        "Docisign is designed for simplicity and speed. While DocuSign has hundreds of features, we focus on the core workflow: upload, place signatures, send, done. You can get a document signed in under 3 minutes, and it costs 80% less than traditional solutions."
    },
    {
      id: "faq-2", 
      question: "Do signers need to create an account?",
      answer:
        "No! Signers can sign documents directly from the email link without creating an account or logging in. This removes friction and ensures faster completion rates."
    },
    {
      id: "faq-3",
      question: "What file formats does Docisign support?",
      answer:
        "We support PDF, DOC, and DOCX files up to 10MB. DOC and DOCX files are automatically converted to PDF for signing. All documents are processed and stored securely."
    },
    {
      id: "faq-4",
      question: "Does Docisign work on mobile devices?",
      answer:
        "Absolutely! Docisign is mobile-first. You can upload documents, place signature fields, and sign on any device. The signature capture works perfectly on touch screens."
    },
    {
      id: "faq-5",
      question: "How long does it take to set up a document for signing?",
      answer:
        "Our goal is under 3 minutes total: 30 seconds to upload, 60 seconds to place signature fields, 30 seconds to add signer details, and 15 seconds to send. Most users achieve this after their first document."
    },
    {
      id: "faq-6",
      question: "Are the signed documents legally binding?",
      answer:
        "Yes! Docisign creates legally binding electronic signatures that comply with e-signature laws including the ESIGN Act and UETA in the US. Each signed document includes a detailed audit trail."
    },
    {
      id: "faq-7",
      question: "What happens if someone doesn't sign?",
      answer:
        "Documents automatically expire after 30 days by default. You can resend reminders, copy the signing link, or adjust the expiration date as needed. You'll always know the current status from your dashboard."
    },
    {
      id: "faq-8",
      question: "Can I use Docisign for free?",
      answer:
        "Yes! Our free plan includes 5 documents per month with all core features. For unlimited documents and additional features like templates and custom branding, our Pro plan starts at just $9/month."
    },
    {
      id: "faq-9",
      question: "How do I add multiple signers to a document?",
      answer:
        "Simply place signature fields and assign each field to a different signer by email. You can add as many signers as needed. In the MVP, all signers can sign in any order - signing order controls will be added in a future update."
    },
    {
      id: "faq-10",
      question: "What if I make a mistake placing signature fields?",
      answer:
        "No problem! You can drag fields to reposition them, delete unwanted fields, and use undo/redo. Documents are saved as drafts automatically so you can always come back and make changes before sending."
    },
    {
      id: "faq-11",
      question: "How secure are my documents?",
      answer:
        "Very secure. All documents are encrypted in transit and at rest. We use enterprise-grade cloud storage and follow industry best practices for data protection. Documents are only accessible to you and your designated signers."
    },
    {
      id: "faq-12",
      question: "Can I download the signed documents?",
      answer:
        "Yes! Once a document is fully signed, you can download the final PDF from your dashboard. Signers also receive a copy via email and can download it from the signing page."
    }
  ],
}: Faq1Props) => {
  return (
    <section className="py-32" id="faq">
      <div className="container max-w-3xl mx-auto">
        <h1 className="mb-4 text-3xl font-semibold md:mb-11 md:text-4xl">
          {heading}
        </h1>
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
