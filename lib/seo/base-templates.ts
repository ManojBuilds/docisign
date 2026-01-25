

export type BaseTemplate = {
    id: string;
    slug: string;
    name: string;
    title: string;
    description: string;
    legalContext: string;
    keyFeatures: string[];
    docUrl?: string;
    pdfUrl?: string;
    category: "General" | "Real Estate" | "Specialized";
};

export const BASE_TEMPLATES: BaseTemplate[] = [
    // REAL ESTATE TEMPLATES
    {
        id: "residential-lease",
        slug: "residential-lease-agreement",
        name: "Residential Lease Agreement",
        title: "Rental Contract",
        description: "The standard contract between a landlord and a tenant for renting a residential property.",
        legalContext: "Compliant with state-specific landlord-tenant laws and fair housing regulations.",
        keyFeatures: [
            "Rent amount and due date",
            "Security deposit terms",
            "Maintenance responsibilities",
            "Pet and guest policies"
        ],
        docUrl: "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9PguHWlZJK9EJNUBXDqbifMz2VCdc7u8YS9Zvn56",
        pdfUrl: "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9PguRfuUXM2w50fPqjJsYVv8Q9nzZRtHkXOiBLDN",
        category: "Real Estate"
    },
    {
        id: "commercial-lease",
        slug: "commercial-lease-agreement",
        name: "Commercial Lease Agreement",
        title: "Business Property Lease",
        description: "For renting office, retail, or industrial space to a business tenant.",
        legalContext: "Defines the long-term relationship for business property usage.",
        keyFeatures: [
            "Triple Net (NNN) or Gross Lease terms",
            "Permitted business use",
            "Signage and modification rights",
            "Insurance requirements"
        ],
        docUrl: "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9PguauQwZMW5bk4q23iuyfFhwQdGBN7vjse1zp69",
        pdfUrl: "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9PgumPPsF6HSvrNMswQ9bfq3IPtLJ5jlyUFK6Cua",
        category: "Real Estate"
    },

    // GENERAL FREELANCE TEMPLATES
    {
        id: "independent-contractor",
        slug: "independent-contractor-agreement",
        name: "Independent Contractor Agreement",
        title: "Project-Based Work Agreement",
        description: "The primary legal document for defining the relationship between a freelancer and a client. Covers services, payment, and duration.",
        legalContext: "Compliant with ESIGN and UETA standards for valid independent contractor relationships.",
        keyFeatures: [
            "Explicit 'Independent Contractor' status definition",
            "Scope of services and deliverables",
            "Payment terms and schedule",
            "Confidentiality and non-solicitation"
        ],
        docUrl: "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9Pgug9eCIss57wvmNqyIOoL8RxlpUuXdzbsrCaFt", // User to populate
        pdfUrl: "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9PguKZ9EhNnKP1O3mwotei2RWHFvhJxCAyDz4Mk5",  // User to populate
        category: "General"
    },
    {
        id: "nda",
        slug: "non-disclosure-agreement",
        name: "Non-Disclosure Agreement (NDA)",
        title: "Confidentiality Agreement",
        description: "Protects your trade secrets, client data, and proprietary information during discussions and project delivery.",
        legalContext: "Legally binding protection for sensitive business information shared between parties.",
        keyFeatures: [
            "Mutual or One-way confidentiality",
            "Definition of 'Confidential Information'",
            "Exclusions from confidential treatment",
            "Remedies for breach of agreement"
        ],
        docUrl: "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9PguJyyUMK76R2PM1quQzNcvtpXGB7hnmfHaWbsC",
        pdfUrl: "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9Pguqchcr54C1lhcbPrMkxtOZY0H3eTSdfDv4pja",
        category: "General"
    },
    {
        id: "sow",
        slug: "statement-of-work",
        name: "Statement of Work (SOW)",
        title: "Project Scope Document",
        description: "A detailed breakdown of exactly what you will deliver, preventing scope creep and defining project milestones.",
        legalContext: "Serves as a supplement to a master service agreement or as a standalone task order.",
        keyFeatures: [
            "Detailed project milestones",
            "Technical or creative specifications",
            "Timeline and deadline commitments",
            "Acceptance criteria for deliverables"
        ],
        docUrl: "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9Pgu8LXZPHaq4236GeguUDtzXlnZKa0ixhVCfjIo",
        pdfUrl: "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9PguUOoFvagHm5AQSpR20Ye4oJwViXD3rgNqOaZb",
        category: "General"
    },
    {
        id: "ip-transfer",
        slug: "intellectual-property-transfer",
        name: "Intellectual Property Transfer",
        title: "Copyright Assignment Agreement",
        description: "Clarifies exactly when and how the ownership of your work transfers to the client, usually upon final payment.",
        legalContext: "Essential for ensuring clients own the final assets while protecting the freelancer from unpaid usage.",
        keyFeatures: [
            "Assignment of all intellectual property rights",
            "Moral rights waiver",
            "Transfer conditional on full payment",
            "Limited portfolio usage rights for freelancer"
        ],
        docUrl: "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9PguXHOj8rZ9PguU0r6OAGptdzw4HilYm8jhRZS5",
        pdfUrl: "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9PguRR0GMB2w50fPqjJsYVv8Q9nzZRtHkXOiBLDN",
        category: "General"
    },
    {
        id: "retainer",
        slug: "retainer-agreement",
        name: "Retainer Agreement",
        title: "Ongoing Service Contract",
        description: "Designed for recurring work where the client pays a fixed monthly fee for a set amount of hours or deliverables.",
        legalContext: "Optimized for long-term consultant-client relationships and stable monthly income.",
        keyFeatures: [
            "Monthly fee and hour allotment",
            "Rollover hour policy",
            "Priority availability commitments",
            "Monthly reporting requirements"
        ],
        docUrl: "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9PguXafyL3Z9PguU0r6OAGptdzw4HilYm8jhRZS5",
        pdfUrl: "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9PgukpBNsOa08GcmsdtOMDlEio2PAeFbrZLVxKXH",
        category: "General"
    },
    {
        id: "proposal",
        slug: "project-proposal",
        name: "Project Proposal",
        title: "Signed Proposal & Estimate",
        description: "A formal offer of services that becomes a binding contract once signed by the client.",
        legalContext: "Converts a sales document into a legally enforceable agreement upon signature.",
        keyFeatures: [
            "Estimated costs and timelines",
            "Validity period of the offer",
            "Standard terms and conditions",
            "Project-specific assumptions"
        ],
        docUrl: "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9Pgu5fTlG8HE1vmLZ9tcWbUpQFkC6oT2IPYBjgnH",
        pdfUrl: "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9PguM16YcJQp79kG1dVY4xFTZQWHXLt02In8uflJ",
        category: "General"
    },
    {
        id: "change-order",
        slug: "change-order-form",
        name: "Change Order Form",
        title: "Project Modification Document",
        description: "The professional way to handle requests for additional work that fall outside the original project scope.",
        legalContext: "Modifies existing agreements to reflect changes in time, budget, or deliverables.",
        keyFeatures: [
            "Description of requested changes",
            "Additional fee calculation",
            "Impact on project deadline",
            "Reference to original contract"
        ],
        docUrl: "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9Pgu8vqVrHaq4236GeguUDtzXlnZKa0ixhVCfjIo",
        pdfUrl: "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9PgupWOt5VwbAQC3TH6iZ98sKJ1Uvou4eYBdxWLO",
        category: "General"
    },
    {
        id: "referral",
        slug: "referral-agreement",
        name: "Referral Agreement",
        title: "Finders Fee Contract",
        description: "Outline the commission structure for when you refer leads to other professionals or vice-versa.",
        legalContext: "Legal framework for partnership commissions and lead generation payouts.",
        keyFeatures: [
            "Commission percentage or flat fee",
            "Payment triggering events",
            "Lead tracking and reporting",
            "Term and termination of partnership"
        ],
        docUrl: "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9PguwSlVaFm795SyVLzTiZ7WAIG6Ns4geYqh8buv",
        pdfUrl: "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9PgukwBHoH08GcmsdtOMDlEio2PAeFbrZLVxKXHw",
        category: "General"
    },
    {
        id: "termination",
        slug: "termination-notice",
        name: "Early Termination Notice",
        title: "Contract Cancellation Form",
        description: "Professional way to end a project early according to the notice period in your original contract.",
        legalContext: "Documents the formal end of a legal relationship to prevent future disputes.",
        keyFeatures: [
            "Formal notice of end date",
            "Final payment reconciliation",
            "Deliverable handover status",
            "Continuation of confidentiality"
        ],
        docUrl: "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9Pgu9ebj2euJvZkayxmqfCrJ21LNhKOpibWeQnwX",
        pdfUrl: "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9PguLlzWj2KvFEY8sMSG7grAfCXqpaJzIQVwtZPB",
        category: "General"
    },
    {
        id: "subcontractor",
        slug: "subcontractor-agreement",
        name: "Subcontractor Agreement",
        title: "Freelance-to-Freelance Contract",
        description: "The contract you use when hiring another freelancer to help you deliver on a large client project.",
        legalContext: "Protects your relationship with the end-client while managing a third-party producer.",
        keyFeatures: [
            "Flow-through client obligations",
            "Payment conditional on client payment",
            "Strict non-solicitation of end-client",
            "Ownership of intermediate assets"
        ],
        docUrl: "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9Pgu8hdBkPaq4236GeguUDtzXlnZKa0ixhVCfjIo",
        pdfUrl: "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9Pgu2h6uO3VDN5UqvTz1wVPfEBZkOhiYC0asrtXn",
        category: "General"
    },
];
