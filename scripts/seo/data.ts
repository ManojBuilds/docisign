
export interface Industry {
    slug: string;
    name: string;
    role: string;
    category: string;
    painPoint: string;
    solution: string;
    deliverableExample: string;
    ipClause: string;
    statValue: string;
}

export const industries: Industry[] = [
    {
        slug: "wedding-videographer",
        name: "Wedding Videographer",
        role: "Wedding Videographer",
        category: "Photography & Video",
        painPoint: "clients requesting raw footage without paying extra",
        solution: "clearly define that raw footage is not included",
        deliverableExample: "5-minute highlight reel and full ceremony edit",
        ipClause: "Videographer retains copyright, client gets personal viewing rights",
        statValue: "Videography"
    },
    {
        slug: "seo-consultant",
        name: "SEO Consultant",
        role: "SEO Consultant",
        category: "Marketing",
        painPoint: "clients expecting #1 rankings overnight",
        solution: "set realistic goals and timelines for ranking improvements",
        deliverableExample: "monthly traffic report and keyword analysis",
        ipClause: "Client owns the strategy documents upon full payment",
        statValue: "Consulting"
    },
    {
        slug: "makeup-artist",
        name: "Freelance Makeup Artist",
        role: "Makeup Artist",
        category: "Events",
        painPoint: "clients arriving late or with dirty skin",
        solution: "add late fees and skin prep requirements",
        deliverableExample: "bridal makeup application with trial run",
        ipClause: "Artist retains rights to portfolio photos",
        statValue: "Beauty"
    },
    {
        slug: "video-editor",
        name: "Freelance Video Editor",
        role: "Video Editor",
        category: "Creative",
        painPoint: "endless rounds of 'tiny' changes",
        solution: "limit revisions to 2 rounds",
        deliverableExample: "final 1080p MP4 file exported for web",
        ipClause: "Client owns final render, editor keeps project files",
        statValue: "Video"
    },
    {
        slug: "copywriter",
        name: "Freelance Copywriter",
        role: "Copywriter",
        category: "Writing",
        painPoint: "scope creep with extra 'small' landing pages",
        solution: "strictly define the word count and number of pages",
        deliverableExample: "5-page website copy in Google Doc format",
        ipClause: "Full copyright transfer upon final payment",
        statValue: "Writing"
    },
    {
        slug: "personal-trainer",
        name: "Personal Trainer",
        role: "Personal Trainer",
        category: "Fitness",
        painPoint: "clients cancelling sessions an hour before",
        solution: "enforce a 24-hour cancellation policy",
        deliverableExample: "12-week customized workout plan",
        ipClause: "Trainer retains rights to the workout methodology",
        statValue: "Fitness"
    },
    {
        slug: "interior-designer",
        name: "Interior Designer",
        role: "Interior Designer",
        category: "Design",
        painPoint: "clients buying furniture that doesn't fit the plan",
        solution: "require approval for all purchases",
        deliverableExample: "room layout and furniture shopping list",
        ipClause: "Designer owns the design concepts until installed",
        statValue: "Design"
    },
    {
        slug: "dog-walker",
        name: "Dog Walker",
        role: "Dog Walker",
        category: "Services",
        painPoint: "incomplete aggressive behavior history",
        solution: "require full disclosure of behavioral issues",
        deliverableExample: "30-minute walk with GPS tracking report",
        ipClause: "Walker not liable for pre-existing conditions",
        statValue: "Pet Care"
    },
    {
        slug: "event-planner",
        name: "Event Planner",
        role: "Event Planner",
        category: "Events",
        painPoint: "vendors not showing up on time",
        solution: "outline vendor coordination responsibilities",
        deliverableExample: "full day-of coordination and vendor timeline",
        ipClause: "Planner retains rights to event design concept",
        statValue: "Events"
    },
    {
        slug: "mobile-app-developer",
        name: "Mobile App Developer",
        role: "App Developer",
        category: "Development",
        painPoint: "feature creep during development",
        solution: "lock scope to the initial features document",
        deliverableExample: "iOS app source code and TestFlight build",
        ipClause: "Client owns the code upon final payment",
        statValue: "Development"
    }
];

export const docTypes = [
    {
        slugSuffix: "-contract-template",
        titleSuffix: "Contract Template",
        desc: "Contract Template",
        action: "Download & E-Sign"
    },
    {
        slugSuffix: "-agreement-template",
        titleSuffix: "Agreement Template",
        desc: "Service Agreement",
        action: "Free Download"
    }
];

export const competitors = [
    {
        name: "DocuSign",
        slug: "docusign",
        price: "15",
        pros: ["Enterprise features", "Household name"],
        cons: ["Expensive for freelancers", "Complex interface", "Requires account for signers"],
        keyword: "docusign alternative"
    },
    {
        name: "PandaDoc",
        slug: "pandadoc",
        price: "29",
        pros: ["Good proposal tools", "CRM integrations"],
        cons: ["Tiered pricing limits features", "Overkill for simple contracts"],
        keyword: "pandadoc alternative"
    },
    {
        name: "HelloSign",
        slug: "hellosign",
        price: "15",
        pros: ["Dropbox integration", "Simple API"],
        cons: ["Limited free plan", "Branding costs extra"],
        keyword: "hellosign alternative"
    },
    {
        name: "Adobe Sign",
        slug: "adobe-sign",
        price: "13",
        pros: ["PDF integration", "Enterprise reliable"],
        cons: ["Part of expensive Cloud suite", "Clunky UX"],
        keyword: "adobe sign alternative"
    },
    {
        name: "SignWell",
        slug: "signwell",
        price: "10",
        pros: ["Good free plan", "Simple"],
        cons: ["Limited audit trail on lower tiers", "Fewer integrations"],
        keyword: "signwell alternative"
    },
    {
        name: "Dotloop",
        slug: "dotloop",
        price: "31",
        pros: ["Real estate specialized", "Transaction management"],
        cons: ["Very niche specific", "Expensive for non-realtors"],
        keyword: "dotloop alternative"
    },
    {
        name: "RightSignature",
        slug: "rightsignature",
        price: "60",
        pros: ["Owned by Citrix", "Good for ShareFile users"],
        cons: ["Very high starting price", "Dated interface"],
        keyword: "rightsignature alternative"
    },
    {
        name: "SignRequest",
        slug: "signrequest",
        price: "9",
        pros: ["Affordable", "Simple"],
        cons: ["Acquired by Box (uncertain future)", "Basic features"],
        keyword: "signrequest alternative"
    }
];

export const states = [
    { name: "Alabama", slug: "alabama", law: "UETA (Ala. Code § 8-1A-1 et seq.)" },
    { name: "Alaska", slug: "alaska", law: "UETA (Alaska Stat. § 09.80.010 et seq.)" },
    { name: "Arizona", slug: "arizona", law: "UETA (Ariz. Rev. Stat. § 44-7001 et seq.)" },
    { name: "Arkansas", slug: "arkansas", law: "UETA (Ark. Code Ann. § 25-32-101 et seq.)" },
    { name: "California", slug: "california", law: "UETA and California Civil Code 1633.1-1633.17" },
    { name: "Colorado", slug: "colorado", law: "UETA (Colo. Rev. Stat. § 24-71.3-101 et seq.)" },
    { name: "Connecticut", slug: "connecticut", law: "UETA (Conn. Gen. Stat. § 1-266 et seq.)" },
    { name: "Delaware", slug: "delaware", law: "UETA (Del. Code Ann. tit. 6, § 12A-101 et seq.)" },
    { name: "Florida", slug: "florida", law: "Electronic Signature Act of 1996" },
    { name: "Georgia", slug: "georgia", law: "UETA (O.C.G.A. § 10-12-1 et seq.)" },
    { name: "Hawaii", slug: "hawaii", law: "UETA (Haw. Rev. Stat. § 489E-1 et seq.)" },
    { name: "Idaho", slug: "idaho", law: "UETA (Idaho Code § 28-50-101 et seq.)" },
    { name: "Illinois", slug: "illinois", law: "Electronic Commerce Security Act" },
    { name: "Indiana", slug: "indiana", law: "UETA (Ind. Code § 26-2-8-101 et seq.)" },
    { name: "Iowa", slug: "iowa", law: "UETA (Iowa Code § 554D.101 et seq.)" },
    { name: "Kansas", slug: "kansas", law: "UETA (Kan. Stat. Ann. § 16-1601 et seq.)" },
    { name: "Kentucky", slug: "kentucky", law: "UETA (Ky. Rev. Stat. Ann. § 369.101 et seq.)" },
    { name: "Louisiana", slug: "louisiana", law: "LUETA (La. Rev. Stat. Ann. § 9:2601 et seq.)" },
    { name: "Maine", slug: "maine", law: "UETA (Me. Rev. Stat. Ann. tit. 10, § 9401 et seq.)" },
    { name: "Maryland", slug: "maryland", law: "UETA (Md. Code Ann., Com. Law § 21-101 et seq.)" },
    { name: "Massachusetts", slug: "massachusetts", law: "UETA (Mass. Gen. Laws ch. 110G)" },
    { name: "Michigan", slug: "michigan", law: "UETA (MCL 450.831 et seq.)" },
    { name: "Minnesota", slug: "minnesota", law: "UETA (Minn. Stat. § 325L.01 et seq.)" },
    { name: "Mississippi", slug: "mississippi", law: "UETA (Miss. Code Ann. § 75-12-1 et seq.)" },
    { name: "Missouri", slug: "missouri", law: "UETA (Mo. Rev. Stat. § 432.200 et seq.)" },
    { name: "Montana", slug: "montana", law: "UETA (Mont. Code Ann. § 30-18-101 et seq.)" },
    { name: "Nebraska", slug: "nebraska", law: "UETA (Neb. Rev. Stat. § 86-611 et seq.)" },
    { name: "Nevada", slug: "nevada", law: "UETA (Nev. Rev. Stat. § 719.010 et seq.)" },
    { name: "New Hampshire", slug: "new-hampshire", law: "UETA (N.H. Rev. Stat. Ann. § 294-E:1 et seq.)" },
    { name: "New Jersey", slug: "new-jersey", law: "UETA (N.J. Stat. Ann. § 12A:12-1 et seq.)" },
    { name: "New Mexico", slug: "new-mexico", law: "UETA (N.M. Stat. Ann. § 14-16-1 et seq.)" },
    { name: "New York", slug: "new-york", law: "Electronic Signatures and Records Act (ESRA)" },
    { name: "North Carolina", slug: "north-carolina", law: "UETA (N.C. Gen. Stat. § 66-311 et seq.)" },
    { name: "North Dakota", slug: "north-dakota", law: "UETA (N.D. Cent. Code § 9-16-01 et seq.)" },
    { name: "Ohio", slug: "ohio", law: "UETA (Ohio Rev. Code § 1306.01 et seq.)" },
    { name: "Oklahoma", slug: "oklahoma", law: "UETA (Okla. Stat. tit. 12A, § 15-101 et seq.)" },
    { name: "Oregon", slug: "oregon", law: "UETA (Or. Rev. Stat. § 84.001 et seq.)" },
    { name: "Pennsylvania", slug: "pennsylvania", law: "Electronic Transactions Act (UETA)" },
    { name: "Rhode Island", slug: "rhode-island", law: "UETA (R.I. Gen. Laws § 42-127.1-1 et seq.)" },
    { name: "South Carolina", slug: "south-carolina", law: "UETA (S.C. Code Ann. § 26-6-10 et seq.)" },
    { name: "South Dakota", slug: "south-dakota", law: "UETA (S.D. Codified Laws § 53-12-1 et seq.)" },
    { name: "Tennessee", slug: "tennessee", law: "UETA (Tenn. Code Ann. § 47-10-101 et seq.)" },
    { name: "Texas", slug: "texas", law: "Uniform Electronic Transactions Act (UETA)" },
    { name: "Utah", slug: "utah", law: "UETA (Utah Code Ann. § 46-4-101 et seq.)" },
    { name: "Vermont", slug: "vermont", law: "UETA (Vt. Stat. Ann. tit. 9, § 270 et seq.)" },
    { name: "Virginia", slug: "virginia", law: "UETA (Va. Code Ann. § 59.1-479 et seq.)" },
    { name: "Washington", slug: "washington", law: "Washington Electronic Authentication Act" },
    { name: "West Virginia", slug: "west-virginia", law: "UETA (W. Va. Code § 39A-1-1 et seq.)" },
    { name: "Wisconsin", slug: "wisconsin", law: "UETA (Wis. Stat. § 137.11 et seq.)" },
    { name: "Wyoming", slug: "wyoming", law: "UETA (Wyo. Stat. Ann. § 40-21-101 et seq.)" }
];

export const industryPages = [
    {
        name: "Real Estate",
        slug: "real-estate",
        benefits: ["Close deals faster", "Mobile signing for open houses", "Secure audit trails"],
        useCases: ["Purchase Agreements", "Lease Agreements", "Disclosures"],
        metaDesc: "The best e-signature solution for real estate agents. Close deals on the spot with mobile-friendly signing."
    },
    {
        name: "Human Resources",
        slug: "human-resources",
        benefits: ["Paperless onboarding", "Secure employee data", "Automated workflows"],
        useCases: ["Offer Letters", "NDAs", "Employee Handbooks"],
        metaDesc: "Streamline HR with secure digital signatures. Onboard employees faster with Boopsign."
    },
    {
        name: "Sales Teams",
        slug: "sales",
        benefits: ["Reduce turnaround time", "CRM integration friendly", "Real-time tracking"],
        useCases: ["Sales Contracts", "Quotes", "Service Agreements"],
        metaDesc: "Accelerate your sales cycle. Get contracts signed in minutes, not days, with Boopsign."
    },
    {
        name: "Legal",
        slug: "legal",
        benefits: ["Court-admissible", "Encrypted storage", "Identity verification"],
        useCases: ["Retainer Agreements", "Settlements", "Power of Attorney"],
        metaDesc: "Secure, compliant e-signatures for law firms. Protect client confidentiality with Boopsign."
    },
    {
        name: "Education",
        slug: "education",
        benefits: ["FERPA compliant features", "Bulk sending", "Parent-friendly"],
        useCases: ["Permission Slips", "Enrollment Forms", "Staff Contracts"],
        metaDesc: "Digital signatures for schools and universities. Simplify enrollment and administrative paperwork."
    },
    {
        name: "Healthcare",
        slug: "healthcare",
        benefits: ["HIPAA compliant features", "Patient privacy", "Tablet signing"],
        useCases: ["Patient Intake Forms", "Telehealth Consent", "Provider Agreements"],
        metaDesc: "Reliable e-signatures for healthcare providers. Streamline patient intake securely."
    },
    {
        name: "Non-Profits",
        slug: "non-profits",
        benefits: ["Affordable/Free", "Grant compliance", "Volunteer onboarding"],
        useCases: ["Volunteer Waivers", "Donation Receipts", "Grant Applications"],
        metaDesc: "Free and affordable e-signatures for non-profits. focus on your mission, not paperwork."
    },
    {
        name: "Finance",
        slug: "finance",
        benefits: ["Bank-grade security", "Audit logs", "Identity assurance"],
        useCases: ["Loan Applications", "Account Opening", "Wealth Management"],
        metaDesc: "Secure digital signing for financial institutions. Build trust with bank-grade security."
    },
    {
        name: "Construction",
        slug: "construction",
        benefits: ["Works offline (mobile)", "Bluebeam compatible", "Subcontractor management"],
        useCases: ["Subcontractor Agreements", "Change Orders", "Safety Waivers"],
        metaDesc: "E-signatures built for the job site. Manage subcontractor agreements and change orders from your phone."
    },
    {
        name: "Insurance",
        slug: "insurance",
        benefits: ["Speed up claims", "Policy binding", "Agent efficiency"],
        useCases: ["Policy Applications", "Claim Forms", "Renewals"],
        metaDesc: "Close policies faster. The preferred e-signature tool for modern insurance agents."
    }
];

export const questions = [
    {
        question: "How to Create an Electronic Signature",
        slug: "how-to-create-electronic-signature",
        answer: "You can create an electronic signature by using a dedicated e-signature platform like Boopsign. Simply upload your document, select the signature tool, and draw, type, or upload an image of your signature. It's secure, legal, and takes seconds.",
        category: "Tutorial"
    },
    {
        question: "Is an Electronic Signature Legal",
        slug: "is-electronic-signature-legal",
        answer: "Yes, electronic signatures are legally binding in the United States under the ESIGN Act of 2000 and the UETA. They have the same legal status as handwritten signatures for most business and personal transactions.",
        category: "Legal"
    },
    {
        question: "How to Sign a PDF Online",
        slug: "how-to-sign-pdf-online",
        answer: "To sign a PDF online, upload your file to Boopsign (no account needed). Drag and drop your signature onto the page, then download the signed document. It's free and works on any device.",
        category: "Tutorial"
    },
    {
        question: "How to Sign a Word Document",
        slug: "how-to-sign-word-document",
        answer: "While you can sign in Word directly, it's often not legally verifiable. The best way is to convert your Word doc to PDF (Boopsign does this automatically), then apply a secure digital signature.",
        category: "Tutorial"
    },
    {
        question: "Difference Between Digital and Electronic Signature",
        slug: "digital-vs-electronic-signature",
        answer: "An electronic signature (e-signature) is any digital mark indicating agreement. A digital signature is a specific type of e-signature that uses cryptographic technology to verify the signer's identity and ensure the document hasn't been changed. Boopsign uses digital signature technology for maximum security.",
        category: "Education"
    },
    {
        question: "Can I Sign on My Phone",
        slug: "can-i-sign-on-my-phone",
        answer: "Yes! Boopsign is mobile-optimized. You can open a contract link from your email, tap to sign with your finger, and complete the process in seconds directly on your smartphone.",
        category: "Features"
    },
    {
        question: "How to Send a Contract for Signature",
        slug: "how-to-send-contract-for-signature",
        answer: "Upload your contract to Boopsign, add your recipient's email address, and place the signature fields where they need to sign. Click send, and they'll receive a secure link immediately.",
        category: "Tutorial"
    },
    {
        question: "Is Boopsign Free",
        slug: "is-boopsign-free",
        answer: "Boopsign offers a generous free plan for freelancers and individuals. You can send free contracts per month without a credit card. Recipient signing is always free.",
        category: "Pricing"
    },
    {
        question: "How to Sign a Google Doc",
        slug: "how-to-sign-google-doc",
        answer: "Save your Google Doc as a PDF (File > Download > PDF), then upload it to Boopsign to add a legally binding signature. This ensures the document formatting is preserved and the signature is secure.",
        category: "Tutorial"
    },
    {
        question: "Best E-Signature for Freelancers",
        slug: "best-esignature-for-freelancers",
        answer: "Boopsign is rated the best e-signature for freelancers because it's fast, affordable, and doesn't require clients to create accounts. It allows you to protect your work with professional contracts in seconds.",
        category: "Comparison"
    }
];
