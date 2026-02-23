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
      question: "Is Boopsign good for solo entrepreneurs?",
      answer: "Absolutely. Boopsign was built specifically for solo entrepreneurs and consultants who need to get contracts signed fast without the enterprise complexity of DocuSign or PandaDoc. You get exactly what you need—nothing more, nothing less—at a price that makes sense for solopreneurs."
    },
    {
      id: "faq-freelancer-2",
      question: "Do my clients need to create accounts to sign?",
      answer: "Never. Your clients click a secure link in their email and sign instantly on any device—no account creation, no app download, no password to remember. This is why Boopsign has a 92% completion rate compared to the industry average of 63%. No friction = faster signatures = you get paid sooner."
    },
    {
      id: "faq-freelancer-3",
      question: "How much does Boopsign cost?",
      answer: "We offer two straightforward plans: Starter at $19/month (20 signature requests/month, 5 saved templates) and Professional at $39/month (75 signature requests/month, unlimited templates, bulk sending to 5 recipients, priority 4-hour support). Both plans include custom branding, mobile-optimized signing, and all core features. Start with a 7-day free trial—no credit card required."
    },
    {
      id: "faq-1",
      question: "How is Boopsign different from DocuSign?",
      answer: "Three key differences: (1) Your clients don't need accounts—they sign directly from email with zero friction. (2) We load in under 2 seconds vs DocuSign's ~15 seconds. (3) We're built for solo entrepreneurs, not enterprise teams, so you get exactly what you need at $19-39/month instead of $45-60/month. Same legal validity, better experience, lower cost."
    },
    {
      id: "faq-2",
      question: "Do signers need to create an account?",
      answer: "No! This is our biggest advantage. Signers get a secure, one-time link via email and can sign immediately—no login, no password, no app download. This eliminates the #1 reason people abandon signatures (37% abandon when forced to create accounts). Your clients sign in 90 seconds, not 4 days."
    },
    {
      id: "faq-3",
      question: "What's included in each plan?",
      answer: "Starter ($19/month): 20 signature requests/month, unlimited signers per document, custom branding (logo + name), 5 saved templates, mobile-optimized signing, 24-hour email support, and basic audit trails. Professional ($39/month): Everything in Starter plus 75 signature requests/month, unlimited templates, bulk send to 5 recipients at once, priority 4-hour support, advanced audit trails, and instant email notifications. No hidden fees, no setup costs."
    },
    {
      id: "faq-4",
      question: "Are Boopsign signatures legally binding?",
      answer: "Yes, absolutely. Every signature includes a complete audit trail with timestamp, IP address, email verification, and device information. Boopsign e-signatures are ESIGN Act and UETA compliant—the same legal standards as DocuSign. They're as legally binding as pen and paper, with better proof of authenticity."
    },
    {
      id: "faq-5",
      question: "Does it work on mobile?",
      answer: "Yes! Boopsign is mobile-first. Your clients can sign contracts on their phone in under 90 seconds—no app download needed. It works perfectly in any mobile browser (iPhone, Android, tablet). 73% of signatures happen on mobile devices, and Boopsign is actually built for that."
    },
    {
      id: "faq-6",
      question: "What file types do you support?",
      answer: "We support PDF and Word (.docx) files. Upload any contract, NDA, proposal, or agreement and we'll handle the rest. Signed contracts are always delivered as legally compliant PDFs with embedded audit trails for your records."
    },
    {
      id: "faq-7",
      question: "How fast can I get a contract signed?",
      answer: "Really fast. Upload your contract (5 seconds), add signature fields (30 seconds), send to your client (instant). Your client signs on their phone while waiting for coffee (90 seconds). Total time: under 3 minutes from start to signed PDF. Compare that to DocuSign's average of 4.2 days."
    },
    {
      id: "faq-8",
      question: "What happens if I reach my monthly signature limit?",
      answer: "If you reach your monthly limit, you'll need to upgrade to the next tier or wait until your next billing cycle. We'll send you a notification when you hit 80% of your limit so you can plan ahead. Most solo entrepreneurs find the Starter plan (20/month) covers their needs, but if you're consistently hitting the limit, the Professional plan (75/month) is a better fit."
    },
    {
      id: "faq-9",
      question: "Can I try it before paying?",
      answer: "Yes! Start with a 7-day free trial—no credit card required. Test up to 20 signature requests, custom branding, templates, and all features. If Boopsign doesn't save you at least $19 worth of time in your first month, we'll refund you. Cancel anytime with one click."
    },
    {
      id: "faq-10",
      question: "Who is Boopsign best for?",
      answer: "Solo entrepreneurs, consultants, freelancers, and independent professionals who send 5-75 contracts per month. If you're tired of DocuSign's complexity, client account friction, and high prices—but still need professional, legally binding e-signatures—Boopsign is built for you. Not for enterprise teams or agencies with complex approval workflows."
    },
    {
      id: "faq-11",
      question: "What's bulk sending and do I need it?",
      answer: "Bulk sending (Professional plan only) lets you send the same template to up to 5 people at once. Perfect for annual contract renewals, client onboarding, or sending NDAs to multiple contractors. Instead of uploading 5 times, you upload once and enter 5 email addresses. Saves 15 minutes per bulk send. If you regularly send the same contract to multiple people, you'll love this feature."
    },
    {
      id: "faq-12",
      question: "Can I cancel anytime?",
      answer: "Yes, absolutely. Cancel with one click from your account settings. No phone calls, no retention tactics, no questions asked. If you cancel mid-month, you keep access until your billing period ends. We don't believe in trapping customers—if Boopsign isn't right for you, we want you to leave happy."
    },
    {
      id: "faq-13",
      question: "How does custom branding work?",
      answer: "Both Starter and Professional plans include custom branding. Upload your logo and add your business name, and every email your clients receive will show YOUR brand—not 'Sent via Boopsign.' The signing page also displays your logo. You look professional and established, even if you're a team of one. No watermarks, no 'powered by' footers."
    },
    {
      id: "faq-14",
      question: "What's the difference between templates and regular documents?",
      answer: "Regular documents are one-time uploads for unique contracts. Templates are contracts you reuse repeatedly—like your standard NDA or service agreement. Save a contract as a template once, then reuse it in 10 seconds whenever you need it. Starter includes 5 saved templates; Professional includes unlimited templates. Templates are huge time-savers if you send the same contracts regularly."
    },
    {
      id: "faq-15",
      question: "Do you integrate with other tools?",
      answer: "Currently, Boopsign is a standalone tool focused on doing e-signatures exceptionally well. We don't have Salesforce, HubSpot, or Zapier integrations—and that's intentional. We're built for solo entrepreneurs who don't need (or want) complex integrations. If you need those features, DocuSign or PandaDoc might be better fits. We focus on being fast, simple, and excellent at the core e-signature experience."
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