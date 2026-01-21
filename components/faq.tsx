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
  items = [
    {
      id: "faq-freelancer-1",
      question: "Is Boopsign good for freelancers?",
      answer: "Absolutely. Boopsign was built specifically for freelancers and solo professionals who need to get contracts signed quickly without the enterprise bloat of DocuSign. It's simple, professional, and helps you get paid faster by removing signing friction."
    },
    {
      id: "faq-freelancer-2",
      question: "Do my clients need accounts to sign?",
      answer: "Never. Your clients receive a secure link in their email and can sign your contract instantly on any device without creating an account, downloading an app, or remembering a password. This is why Boopsign has a much higher completion rate than traditional tools."
    },
    {
      id: "faq-freelancer-3",
      question: "How much does Boopsign cost for freelancers?",
      answer: "We offer a single, simple plan for $20/month that includes unlimited documents and signers. There are no per-envelope fees or hidden charges. You can also start with a 7-day free trial to see how much time it saves you before committed."
    },
    {
      id: "faq-1",
      question: "How is Boopsign different from DocuSign?",
      answer: "Boopsign is built for speed and simplicity. Unlike DocuSign, your clients don't need to create accounts—they sign directly from email. We're also 10x cheaper ($20/month vs $150+/month) with no per-contract fees. Perfect for freelancers and consultants who need simple e-signatures without enterprise complexity."
    },
    {
      id: "faq-2",
      question: "Do signers need to create an account?",
      answer: "No! This is our biggest differentiator. Signers receive a secure, one-time link via email and can sign immediately—no login, no password, no app download. This reduces signing time from hours to minutes and eliminates the #1 friction point in e-signatures."
    },
    {
      id: "faq-3",
      question: "What's your pricing? Any hidden fees?",
      answer: "Simple, transparent pricing: $20/month for unlimited contract signing. No per-contract charges, no user fees, no setup costs. Start with a 7-day free trial—no credit card required. Cancel anytime with no questions asked."
    },
    {
      id: "faq-4",
      question: "Is it legally binding?",
      answer: "Yes! Every signature includes a complete audit trail with timestamp, IP address, email verification, and signer identity proof. Boopsign e-signatures are legally binding and compliant with ESIGN Act and UETA regulations—just like DocuSign, but simpler."
    },
    {
      id: "faq-5",
      question: "Can I use it on mobile?",
      answer: "Absolutely! Boopsign is mobile-first. Your clients can sign contracts, NDAs, and proposals on their phone in under 30 seconds. No app download required—works perfectly in any mobile browser."
    },
    {
      id: "faq-6",
      question: "What file types do you support?",
      answer: "We support PDF and Word files. Upload any contract type and we'll handle the rest. Signed contracts are always delivered as PDFs with embedded audit trails."
    },
    {
      id: "faq-7",
      question: "How fast can I get a contract signed?",
      answer: "Most contracts are signed within minutes. Upload takes 30 seconds, your client receives the email instantly, and they can sign in under 1 minute. Total time from upload to signed PDF: under 3 minutes. Compare that to DocuSign's average of 24-48 hours."
    },
    {
      id: "faq-8",
      question: "How does email verification work?",
      answer: "Every signer receives a unique, encrypted link via their verified email address. We track the IP address, timestamp, and browser fingerprint for every signature to ensure authenticity. This creates a legally binding audit trail without requiring the signer to manage another password."
    },
    {
      id: "faq-9",
      question: "Can I try it before paying?",
      answer: "Yes! Start with a 7-day free trial of Boopsign Pro—no credit card required. Test unlimited contract signing, all features included. If you don't love it, cancel anytime with one click."
    },
    {
      id: "faq-9",
      question: "Who is Boopsign best for?",
      answer: "Freelancers, consultants, small businesses, and agencies who need simple, fast e-signatures. If you're sending contracts, NDAs, proposals, or service agreements and find DocuSign too complex or expensive, Boopsign is built for you."
    }
  ]
}: Faq1Props) => {
  return (
    <section className="py-24 lg:py-32 bg-white" id="faq">
      <div className="container max-w-4xl mx-auto px-4">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: items.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
            }),
          }}
        />

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-slate-500 text-xs font-medium uppercase tracking-wider mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
            Common Questions
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6">
            Frequently asked questions
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Everything you need to know about Boopsign's features, pricing, and security.
          </p>
        </div>

        <div className="bg-slate-50/50 rounded-[2rem] p-6 md:p-8 border border-slate-100">
          <Accordion type="single" collapsible className="space-y-4">
            {items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b-0 bg-white rounded-2xl border border-slate-200/60 px-6 data-[state=open]:order-first data-[state=open]:ring-2 data-[state=open]:ring-blue-100 transition-all duration-300">
                <AccordionTrigger className="font-semibold text-slate-900 hover:text-blue-600 hover:no-underline py-6">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-500 text-base leading-relaxed pb-6">
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

export default Faq;