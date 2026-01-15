export interface TemplateSEOData {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface TemplateFeature {
  title: string;
  description: string;
  icon?: string; // Icon name from lucide-react
}

export interface TemplateData {
  id: string;
  slug: string;
  name: string;
  category: string;
  subtitle: string;
  seo: TemplateSEOData;
  schema: any;
  faqs: FAQItem[];
  whatsInside: {
    title: string;
    description: string;
    features: TemplateFeature[];
  };
  whyUse: {
    title: string;
    description: string;
    benefits: string[];
    theme: "indigo" | "rose" | "emerald" | "amber" | "blue" | "slate";
  };
  sidebar: {
    title: string;
    subtitle: string;
    stats: { label: string; value: string }[];
  };
  testimonial: {
    quote: string;
    author: string;
    role: string;
    stars: number;
  };
}

export const templatesData: Record<string, TemplateData> = {
  "social-media-management-contract": {
    id: "social-media-management-contract",
    slug: "social-media-management-contract",
    name: "Social Media Management Contract",
    category: "Agency & Freelance",
    subtitle: "Stop scope creep and get paid on time. A professional contract template designed for SMM agencies and freelancers. Includes scope definitions and platform independence clauses.",
    seo: {
      title: "Free Social Media Management Contract Template (2026) | Edit & Sign",
      description: "Download our free social media management contract template. Protect your agency or freelance business with clauses for payment, scope, and IP. Sign instantly with no account required.",
      keywords: ["social media management contract template free", "social media manager contract", "freelance social media contract", "social media agency agreement", "social media marketing contract template", "simple social media contract"],
      canonical: "https://boopsign.com/templates/social-media-management-contract",
    },
    schema: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Free Social Media Management Contract Template",
      image: "https://boopsign.com/images/og-social-media-contract.jpg",
      description: "A comprehensive, free contract template for social media managers and agencies. Includes clauses for scope, payment, and IP rights.",
      url: "https://boopsign.com/templates/social-media-management-contract",
      brand: { "@type": "Brand", name: "BoopSign" },
      offers: {
        "@type": "Offer",
        url: "https://boopsign.com/templates/social-media-management-contract",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock"
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "420",
        bestRating: "5",
        worstRating: "1"
      }
    },
    faqs: [
      { id: "faq-1", question: "Is this social media contract template legally binding?", answer: "Yes, once filled out and signed by both parties, this contract constitutes a legally binding agreement. Electronic signatures added via BoopSign especially are fully compliant with the ESIGN Act and UETA." },
      { id: "faq-2", question: "Do I need a lawyer to use this template?", answer: "While we always recommend consulting a lawyer for complex situations, this standard template covers the essential protections most freelance social media managers and agencies need to get started safely." },
      { id: "faq-3", question: "Can I edit the clauses in this template?", answer: "Absolutely. The template is designed to be customizable. You can add specific deliverables, change payment terms, or include unique clauses like 'No ROI Guarantee' directly in the editor." },
      { id: "faq-4", question: "Does the client need an account to sign?", answer: "No. With BoopSign, your client receives a secure link and can sign the contract on their phone or computer in seconds without creating an account or downloading an app." }
    ],
    whatsInside: {
      title: "What's inside this template?",
      description: 'Social media management is prone to "scope creep"—clients asking for just one more post or expecting 24/7 community management. Our template protects you with specific clauses designed for SMM agencies and freelancers.',
      features: [
        { title: "Scope of Work & Deliverables", description: "Clearly define platform accounts (IG, LinkedIn), number of posts per week, and community management hours to prevent burnout.", icon: "Layout" },
        { title: "Platform Independence", description: "Crucial clause that protects you if a platform (e.g., TikTok) changes its algorithm or goes down. You can't control the Zuck!", icon: "Shield" },
        { title: "Content Approval Workflow", description: "Sets a deadline for clients to approve content (e.g., 48 hours). If they don't reply, it assumes approval to keep your schedule consistent.", icon: "Info" },
        { title: "IP & Access Rights", description: "Defines who owns the content created and ensures you have legal access to their accounts without liability for previous posts.", icon: "FileText" }
      ]
    },
    whyUse: {
      title: "Why use BoopSign for this contract?",
      description: "Most clients read contracts on their phone while between meetings. Sending a Word doc or PDF they have to print/scan is a deal-killer.",
      benefits: [
        "<b>3-Minute Signing:</b> Clients click one link and sign with their finger.",
        "<b>No Account Required:</b> We explicitly do not force your clients to sign up.",
        "<b>Real-time Status:</b> See exactly when they view and sign the document."
      ],
      theme: "indigo"
    },
    sidebar: {
      title: "Get It Signed",
      subtitle: "Free for your agency",
      stats: [
        { label: "Format", value: "Word / PDF / Editable" },
        { label: "Pages", value: "4 (Standard)" },
        { label: "Compliance", value: "ESIGN / UETA" }
      ]
    },
    testimonial: {
      quote: '"The platform independence clause saved me when Instagram changed its reels algorithm. Essential template for any SMM."',
      author: "Jessica Wong",
      role: "Freelance Social Media Manager",
      stars: 5
    }
  },
  "wedding-photography-contract": {
    id: "wedding-photography-contract",
    slug: "wedding-photography-contract",
    name: "Wedding Photography Contract",
    category: "Photography",
    subtitle: "Secure your dates and protect your images with a professional agreement designed for modern wedding photographers. Includes model releases, meal clauses, and cancellation policies.",
    seo: {
      title: "Free Wedding Photography Contract Template (2026) | Edit & Sign",
      description: "Download our free wedding photography contract template. Protect your business with clauses for meals, harassment, and model releases. Sign instantly with e-signature.",
      keywords: ["wedding photography contract template free", "wedding photographer agreement", "simple wedding photography contract", "photography contract with model release", "wedding photo contract pdf"],
      canonical: "https://boopsign.com/templates/wedding-photography-contract",
    },
    schema: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Free Wedding Photography Contract Template",
      image: "https://boopsign.com/images/og-wedding-contract.jpg",
      description: "Professional wedding photography contract template with clauses for model release, meals, and cancellation.",
      url: "https://boopsign.com/templates/wedding-photography-contract",
      brand: { "@type": "Brand", name: "BoopSign" },
      offers: {
        "@type": "Offer",
        url: "https://boopsign.com/templates/wedding-photography-contract",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock"
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "892",
        bestRating: "5",
        worstRating: "1"
      }
    },
    faqs: [
      { id: "faq-1", question: "Does this contract include a Model Release?", answer: "Yes, our template includes a standard Model Release clause that allows you to use the images for your portfolio, website, and social media marketing." },
      { id: "faq-2", question: "What happens if the client cancels?", answer: "The template includes a Cancellation & Retainer clause. Typically, the retainer is non-refundable, and cancellations within 30 days of the wedding may require full payment. You can adjust these terms in the editor." },
      { id: "faq-3", question: "Is there a 'Safe Working Environment' clause?", answer: "Absolutely. We include a harassment clause that protects you and your team from inappropriate behavior by guests, giving you the right to leave if the situation becomes unsafe." },
      { id: "faq-4", question: "Can I add my own logo?", answer: "Yes. When you use BoopSign to send this contract, you can upload your logo to the signing page for a professional brand experience." }
    ],
    whatsInside: {
      title: "Essential Clauses Included",
      description: "Wedding photography is high-stakes. Our template includes specific protections that generic contracts miss, ensuring you get fed, paid, and respected.",
      features: [
        { title: "Model Release", description: "Grants you the explicit right to use the wedding photos for your portfolio, Instagram, and website marketing.", icon: "Camera" },
        { title: "Retainer & Cancellation", description: "Protects your calendar. Clarifies that the booking fee is non-refundable if the couple cancels specifically for this date.", icon: "Calendar" },
        { title: "Meals & Breaks", description: "It's a long day. This clause ensures you and your second shooter are provided a hot meal at the reception.", icon: "Heart" },
        { title: "Harassment Policy", description: "Empowers you to stop coverage or leave if you or your staff are threatened or sexually harassed by guests.", icon: "AlertCircle" }
      ]
    },
    whyUse: {
      title: "Why Speed Matters",
      description: "Couples inquire with 5-10 photographers. The first one to get a signed contract often wins the date.",
      benefits: [
        "<b>Send via Link:</b> Text the contract link directly to the bride or groom.",
        "<b>Mobile Optimized:</b> They can sign on their phone during their lunch break.",
        "<b>Instant Copy:</b> Everyone gets a PDF copy instantly upon signing."
      ],
      theme: "rose"
    },
    sidebar: {
      title: "Secure The Date",
      subtitle: "Free for your business",
      stats: [
        { label: "Format", value: "Word / PDF / Editable" },
        { label: "Pages", value: "5 (Standard)" },
        { label: "Compliance", value: "ESIGN / UETA" }
      ]
    },
    testimonial: {
      quote: '"I used to lose bookings because my PDF contract was a pain to print. BoopSign fixed that. My booking rate is up 30%."',
      author: "Sarah Jenkins",
      role: "Wedding Photographer, Austin TX",
      stars: 5
    }
  },
  "freelance-contract": {
    id: "freelance-contract",
    slug: "freelance-contract",
    name: "Freelance Contract",
    category: "Freelance & Consulting",
    subtitle: "Download our professional contract template and sign it instantly. Customize terms, add signature fields, and get secure, legally binding signatures in minutes.",
    seo: {
      title: "Free Freelance Contract Template | Download & Sign Instantly in 2026",
      description: "Download our free freelance contract template and sign it instantly with BoopSign. Get paid on time, avoid scope creep, and protect your business with professional contracts.",
      keywords: ["freelance contract template", "free contract template", "freelance agreement template", "contract template for freelancers", "independent contractor agreement"],
      canonical: "https://boopsign.com/templates/freelance-contract",
    },
    schema: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Free Freelance Contract Template",
      image: "https://boopsign.com/images/og-contract-template.jpg",
      description: "Download our free freelance contract template and sign it instantly with BoopSign. Professional, lawyer-approved, and easy to customize.",
      url: "https://boopsign.com/templates/freelance-contract",
      brand: { "@type": "Brand", name: "BoopSign" },
      offers: {
        "@type": "Offer",
        url: "https://boopsign.com/templates/freelance-contract",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock"
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "1560",
        bestRating: "5",
        worstRating: "1"
      }
    },
    faqs: [
      { id: "faq-1", question: "How do I use the freelance contract template with BoopSign?", answer: "Download our free template and customize it with your client details, project scope, rates, and terms using your preferred editor. Then upload your completed contract to BoopSign to add signature fields and send to clients." },
      { id: "faq-2", question: "Can I get contracts signed quickly with BoopSign?", answer: "Absolutely! Upload your contract to BoopSign, add signature fields, and send to your client. They can review and sign in under 60 seconds on any device - no account required." },
      { id: "faq-3", question: "Do my clients need to create accounts to sign contracts?", answer: "No! This is one of BoopSign's biggest advantages. Clients receive a secure link to your contract and can sign immediately without creating accounts or downloading software." },
      { id: "faq-4", question: "Is the signed contract legally binding?", answer: "Yes! Electronic signatures are legally compliant with ESIGN Act and eIDAS regulations and have the same legal weight as handwritten signatures with full audit trails." }
    ],
    whatsInside: {
      title: "Essential Contract Clauses",
      description: "Our free templates include all these critical sections. Use them with BoopSign for fast, secure contract execution.",
      features: [
        { title: "Parties & Scope of Work", description: "Clearly identify both parties and define exactly what services you'll provide.", icon: "FileText" },
        { title: "Payment Terms", description: "Set your rates, payment schedule, and late fees. Include deposit requirements and specify when payment is due.", icon: "DollarSign" },
        { title: "Revision Limits", description: "Set boundaries on revisions (typically 2-3 rounds). Define what constitutes a revision vs. new work.", icon: "CheckCircle" },
        { title: "Termination Clause", description: "Outline how either party can end the agreement, notice periods, and payment for work completed.", icon: "Smartphone" }
      ]
    },
    whyUse: {
      title: "Why Freelancers Need Contracts",
      description: "Research shows that freelancers with contracts get paid 78% faster and prevent 90% of disputes.",
      benefits: [
        "<b>Legal Protection:</b> Recourse for non-payment.",
        "<b>Clear Boundaries:</b> Defined scope prevents scope creep.",
        "<b>IP Clarity:</b> Protected ownership of your creative work."
      ],
      theme: "blue"
    },
    sidebar: {
      title: "Get Protected",
      subtitle: "Free Contract Template",
      stats: [
        { label: "Format", value: "Word / PDF / Editable" },
        { label: "Compliance", value: "ESIGN / UETA" },
        { label: "Status", value: "Lawyer Vetted" }
      ]
    },
    testimonial: {
      quote: '"I was getting constant scope creep from clients. Since using BoopSign contracts, my clients respect the defined boundaries and I\'ve increased my rate."',
      author: "Alex M.",
      role: "Web Developer",
      stars: 5
    }
  },
  "consulting-agreement": {
    id: "consulting-agreement",
    slug: "consulting-agreement",
    name: "Consulting Agreement",
    category: "Freelance & Consulting",
    subtitle: "Formalize your consulting relationships. Clear terms, professional structure, and mobile-ready signing. Everything you need to close the deal and start billable work.",
    seo: {
      title: "Professional Consulting Agreement Template | Download & E-Sign",
      description: "Formalize your consulting relationships with our professional agreement template. Customisable, legal, and ready for e-signature with BoopSign.",
      keywords: ["consulting agreement template", "freelance consulting contract", "professional services agreement", "esignature for consultants", "legal contract template"],
      canonical: "https://boopsign.com/templates/consulting-agreement",
    },
    schema: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Professional Consulting Agreement Template",
      image: "https://boopsign.com/images/og-consulting.jpg",
      description: "Formalize your consulting relationships with our professional agreement template.",
      url: "https://boopsign.com/templates/consulting-agreement",
      brand: { "@type": "Brand", name: "BoopSign" },
      offers: {
        "@type": "Offer",
        url: "https://boopsign.com/templates/consulting-agreement",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock"
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "750",
        bestRating: "5",
        worstRating: "1"
      }
    },
    faqs: [
      { id: "faq-1", question: "Can I edit this template?", answer: "Yes! Once you upload it to BoopSign, you can add fields, text, and dates anywhere on the document." },
      { id: "faq-2", question: "Is it legally binding?", answer: "Absolutely. BoopSign agreements are compliant with ESIGN and UETA standards." },
      { id: "faq-3", question: "What if my client is on mobile?", answer: "That's where BoopSign shines. They can sign in seconds on their phone with zero friction." },
      { id: "faq-4", question: "How much does it cost?", answer: "$19/month for unlimited documents. No hidden per-signer fees." }
    ],
    whatsInside: {
      title: "What's inside this template?",
      description: 'This agreement has been refined through years of consulting feedback. It covers the essential legal bases without the "lawyer-speak" that scares off clients.',
      features: [
        { title: "Clear Scope of Work", description: "Includes placeholders for milestones and deliverables.", icon: "Check" },
        { title: "Payment Terms", description: "Strict clauses for net-terms and late payment penalties.", icon: "Check" },
        { title: "IP Retention", description: "Ensures you keep your methods while client gets the work.", icon: "Check" },
        { title: "Termination Clauses", description: "Protect your time if a project goes off the rails.", icon: "Check" }
      ]
    },
    whyUse: {
      title: "Pro Tip for Consultants",
      description: 'Always append a clear "Exhibit A" for your scope of work in the editor. It prevents scope-creep and ensures everyone knows exactly what is being signed for.',
      benefits: [
        "<b>100% Legally Binding:</b> Compliant with global standards.",
        "<b>No Client Accounts:</b> Remove friction from the signing process.",
        "<b>Real-time Tracking:</b> Know exactly when the client opens the doc."
      ],
      theme: "slate"
    },
    sidebar: {
      title: "Seal the Deal",
      subtitle: "Formal & Professional",
      stats: [
        { label: "Format", value: "Word / PDF / Editable" },
        { label: "Compliance", value: "ESIGN / UETA" },
        { label: "Security", value: "Bank-Level SSL" }
      ]
    },
    testimonial: {
      quote: '"Using the BoopSign consulting template was a game-changer. I sent the link during a discovery call and had it signed before we off the Zoom."',
      author: "Jamie L.",
      role: "Independent Consultant",
      stars: 5
    }
  },
  "house-cleaning-service-agreement": {
    id: "house-cleaning-service-agreement",
    slug: "house-cleaning-service-agreement",
    name: "House Cleaning Service Agreement",
    category: "Service Business",
    subtitle: "Protect your cleaning business with a professional service agreement. Defines scope of work, access policies, liability limits, and cancellations.",
    seo: {
      title: "Free House Cleaning Service Agreement Template (2026)",
      description: "Download our free house cleaning service agreement. Protect your cleaning business with clauses for access, cancellations, and supplies. Simple and professional.",
      keywords: ["house cleaning service agreement free", "cleaning contract template", "residential cleaning agreement", "maid service contract", "cleaning business forms"],
      canonical: "https://boopsign.com/templates/house-cleaning-service-agreement",
    },
    schema: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Free House Cleaning Service Agreement",
      image: "https://boopsign.com/images/og-cleaning-contract.jpg",
      description: "A simple, professional service agreement for house cleaners and maid services. Includes liability and cancellation clauses.",
      url: "https://boopsign.com/templates/house-cleaning-service-agreement",
      brand: { "@type": "Brand", name: "BoopSign" },
      offers: {
        "@type": "Offer",
        url: "https://boopsign.com/templates/house-cleaning-service-agreement",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock"
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "645",
        bestRating: "5",
        worstRating: "1"
      }
    },
    faqs: [
      { id: "faq-1", question: "Do I need a contract for residential cleaning?", answer: "Yes. Even for small jobs, a contract protects you from liability (e.g., broken items) and ensures you get paid for last-minute cancellations." },
      { id: "faq-2", question: "Who provides the vacuum and supplies?", answer: "Our template includes a 'Supplies' clause where you can specify if the client provides the vacuum/liquids or if you bring your own pro-grade equipment." },
      { id: "faq-3", question: "Can I charge a lockout fee?", answer: "Yes. The 'Access & Lockout' clause allows you to charge a fee (e.g., 50% of the service) if you arrive and cannot get inside the home." },
      { id: "faq-4", question: "Is this suitable for commercial cleaning?", answer: "This template is optimized for residential homes. For offices, we recommend editing the 'Scope of Work'." }
    ],
    whatsInside: {
      title: "Protect Your Cleaning Business",
      description: "Ambiguity causes refunds. Our agreement template clarifies exactly what is included (and excluded) in your standard clean.",
      features: [
        { title: "Scope of Services", description: "Definitively list standard tasks vs. extra services to avoid scope creep.", icon: "Home" },
        { title: "Supplies & Equipment", description: "Prevent damage claims by specifying if you use the client's vacuum or your own supplies. ", icon: "Sparkles" },
        { title: "Access & Lockouts", description: "If you show up and the key isn't there, you still get paid.", icon: "Clock" },
        { title: "Liability Limit", description: "Limits your liability for breakage to a specific amount or to replacement value only.", icon: "AlertTriangle" }
      ]
    },
    whyUse: {
      title: "Why Digital Contracts?",
      description: "Leaving a paper contract on the counter is unprofessional. Sending a digital link before you even arrive sets the tone for a premium service.",
      benefits: [
        "<b>Reduce Cancellations:</b> Clients take you seriously when they sign a formal agreement.",
        "<b>Recurring Service:</b> Set up the terms for weekly or bi-weekly visits once.",
        "<b>Easy on Mobile:</b> Clients can sign from their smartphone instantly."
      ],
      theme: "emerald"
    },
    sidebar: {
      title: "Professionalize Your Biz",
      subtitle: "Free for your business",
      stats: [
        { label: "Format", value: "Word / PDF / Editable" },
        { label: "Pages", value: "3 (Compact)" },
        { label: "Compliance", value: "ESIGN / UETA" }
      ]
    },
    testimonial: {
      quote: '"It used to be awkward asking for contracts. Now I just text the BoopSign link. It\'s so easy and clients love it."',
      author: "Maria R.",
      role: "Owner, Sparkle Clean Services",
      stars: 5
    }
  },
  "nda-template": {
    id: "nda-template",
    slug: "nda-template",
    name: "Non-Disclosure Agreement (NDA)",
    category: "Legal & General",
    subtitle: "Protect your proprietary information and client lists. Download our lawyer-vetted NDA template and get it signed legally in minutes.",
    seo: {
      title: "Free NDA Template for Freelancers | Download & E-Sign",
      description: "Protect your ideas with our free Non-Disclosure Agreement (NDA) template. Download as PDF and sign legally in minutes with BoopSign.",
      keywords: ["free NDA template", "freelance nda", "non-disclosure agreement free", "esignature for nda", "legal templates for consultants"],
      canonical: "https://boopsign.com/templates/nda-template",
    },
    schema: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Free NDA Template for Freelancers",
      image: "https://boopsign.com/images/og-nda-template.jpg",
      description: "Protect your ideas with our free Non-Disclosure Agreement (NDA) template.",
      url: "https://boopsign.com/templates/nda-template",
      brand: { "@type": "Brand", name: "BoopSign" },
      offers: {
        "@type": "Offer",
        url: "https://boopsign.com/templates/nda-template",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock"
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "920",
        bestRating: "5",
        worstRating: "1"
      }
    },
    faqs: [
      { id: "faq-1", question: "Is this mutual or one-way?", answer: "This template can be easily adjusted to be either, but by default, it includes mutual non-disclosure clauses." },
      { id: "faq-2", question: "Does it cover subcontractors?", answer: "Yes, it typically includes provisions for employees and subcontractors who need to know the information." },
      { id: "faq-3", question: "How long does it last?", answer: "The template includes a term section where you can specify the duration (e.g., 2 years, 5 years, or indefinitely)." },
      { id: "faq-4", question: "What if they break the NDA?", answer: "The agreement specifies remedies and jurisdiction for any breaches, giving you legal recourse." }
    ],
    whatsInside: {
      title: "Standard NDA v2026",
      description: "This Non-Disclosure Agreement is designed specifically for freelancers, consultants, and solo professionals. It protects your proprietary information, client lists, and technical know-how.",
      features: [
        { title: "Mutual Protection", description: "Protects both you and your client equally.", icon: "Shield" },
        { title: "Easy to Edit", description: "Simple language that doesn't need a lawyer to translate.", icon: "Layout" },
        { title: "Clear Scope", description: "Defines exactly what is considered 'Confidential Information'.", icon: "FileText" },
        { title: "Remedies", description: "Outlines consequences for unauthorized disclosure.", icon: "Zap" }
      ]
    },
    whyUse: {
      title: "Why use this NDA?",
      description: "Discovery calls and project onboarding involve sharing sensitive info. An NDA ensures your ideas stay yours.",
      benefits: [
        "<b>No Account for Signers:</b> Speed up the process by removing login hurdles.",
        "<b>Full Audit Trail:</b> Proof of who signed and when.",
        "<b>Mobile-Optimized:</b> Perfect for signing on the go."
      ],
      theme: "blue"
    },
    sidebar: {
      title: "Speed Matters",
      subtitle: "Sign in 60 seconds",
      stats: [
        { label: "Format", value: "Word / PDF / Editable" },
        { label: "Compliance", value: "ESIGN / UETA" },
        { label: "Type", value: "Mutual Disclosure" }
      ]
    },
    testimonial: {
      quote: '"Using the BoopSign NDA template was a game-changer. I sent the link during a discovery call and had it signed before we were off the Zoom."',
      author: "Jamie L.",
      role: "Independent Consultant",
      stars: 5
    }
  }
};
