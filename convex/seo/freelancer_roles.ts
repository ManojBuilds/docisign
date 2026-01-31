export type FreelanceRole = {
    slug: string;
    role: string;
    industry: string;
    specificClauses: string[];
    painPoint: string;
    benefit: string;
    tags?: string[]; // e.g., ["Real Estate", "Creative"]
};

export const FREELANCE_ROLES: FreelanceRole[] = [
    // REAL ESTATE (NEW)
    {
        slug: "landlord",
        role: "Landlord",
        industry: "Real Estate",
        specificClauses: ["Property damage liability", "Security deposit terms", "Eviction procedures", "Pet policies"],
        painPoint: "tenants refusing to pay rent or destroying your property",
        benefit: "secure your rental income and legally protect your asset",
        tags: ["Real Estate"]
    },
    {
        slug: "real-estate-agent",
        role: "Real Estate Agent",
        industry: "Real Estate",
        specificClauses: ["Commission structure", "Exclusivity period", "Dual agency disclosure", "Marketing expense reimbursement"],
        painPoint: "clients bypassing you to cut out your commission",
        benefit: "ensure you get paid for every closed deal",
        tags: ["Real Estate", "General"]
    },
    {
        slug: "property-manager",
        role: "Property Manager",
        industry: "Real Estate",
        specificClauses: ["Maintenance spending limits", "Tenant screening criteria", "Emergency authority", "Liability indemnification"],
        painPoint: "being held personally liable for property issues",
        benefit: "define your management scope and limit your liability",
        tags: ["Real Estate", "General"]
    },

    // WRITING & CONTENT
    {
        slug: "ghostwriter",
        role: "Ghostwriter",
        industry: "Writing & Publishing",
        specificClauses: ["Strict non-attribution clause", "Confidentiality of client persona", "Full copyright transfer", "Kill fee for research phase"],
        painPoint: "spending hours on a book/article you can never claim credit for",
        benefit: "protect your anonymity and get paid fairly for silent work",
        tags: ["General"]
    },
    {
        slug: "technical-writer",
        role: "Technical Writer",
        industry: "Software & Engineering",
        specificClauses: ["Accuracy disclaimer", "Access to subject matter experts", "Documentation versioning", "Complex IP licensing"],
        painPoint: "clients changing technical specs midway through documentation",
        benefit: "ensure your technical expertise is protected and expectations are clear"
    },
    {
        slug: "copywriter",
        role: "Copywriter",
        industry: "Marketing & Advertising",
        specificClauses: ["Revision limit (usually 2)", "Approval of final proofs", "Sales performance disclaimer", "Fast turnaround fees"],
        painPoint: "endless tweaks to 'perfect' the messaging without extra pay",
        benefit: "set boundaries on creative revisions and secure your time"
    },
    {
        slug: "content-strategist",
        role: "Content Strategist",
        industry: "Digital Marketing",
        specificClauses: ["Strategy vs Implementation split", "Analytics access requirements", "Deliverables definition", "Consulting vs doing"],
        painPoint: "clients expecting you to write the content too without extra budget",
        benefit: "protect your high-level strategy and define your scope clearly"
    },
    {
        slug: "grant-writer",
        role: "Grant Writer",
        industry: "Non-Profit",
        specificClauses: ["No contingency fee disclosure", "Deadline strictness", "Data gathering responsibilities", "Success vs Effort disclaimer"],
        painPoint: "being blamed for a grant being rejected despite a great application",
        benefit: "ensure you get paid for the work regardless of the funding outcome"
    },

    // DESIGN & CREATIVE
    {
        slug: "ui-ux-designer",
        role: "UI/UX Designer",
        industry: "Software & Product Design",
        specificClauses: ["Prototype vs Final asset definition", "Figma file ownership", "Accessibility compliance (WCAG)", "User testing lab fees"],
        painPoint: "vague feedback like 'make it pop' leading to 10 rounds of UI tweaks",
        benefit: "professionalize your design process and protect your IP"
    },
    {
        slug: "motion-graphics-artist",
        role: "Motion Graphics Artist",
        industry: "Video & Animation",
        specificClauses: ["Asset rendering timeframes", "Stock music/footage licensing", "Project file (AEP) access", "Resolution & format specs"],
        painPoint: "the client wanting the source files for free at the end",
        benefit: "lock in your source file rights and get paid for rendering time"
    },
    {
        slug: "brand-identity-designer",
        role: "Brand Designer",
        industry: "Branding",
        specificClauses: ["Trademark search responsibility", "Brand guide limitations", "Vector vs Raster delivery", "Concept count (usually 3)"],
        painPoint: "clients picking a concept and then asking for a fourth 'hybrid'",
        benefit: "protect your conceptual effort and limit project creep"
    },
    {
        slug: "illustrator",
        role: "Illustrator",
        industry: "Arts",
        specificClauses: ["Sketch approval phase", "Commercial vs Editorial rights", "Merchandising royalty terms", "Final style consistency"],
        painPoint: "clients using your art on t-shirts when they only paid for a blog post",
        benefit: "secure your licensing revenue and project your unique style"
    },
    {
        slug: "interior-designer",
        role: "Interior Designer",
        industry: "Home & Office",
        specificClauses: ["Site visit limitations", "Vendor commission disclosure", "Render accuracy disclaimer", "Purchasing Agent terms"],
        painPoint: "being responsible for furniture delays caused by third parties",
        benefit: "limit your liability and define your consulting role clearly"
    },

    // TECH & DEVELOPMENT
    {
        slug: "shopify-developer",
        role: "Shopify Developer",
        industry: "eCommerce",
        specificClauses: ["Theme license ownership", "App subscription costs", "PCI compliance disclaimer", "Post-launch support period"],
        painPoint: "getting blamed for store downtime or broken third-party apps",
        benefit: "protect your code and clearly define platform responsibilities"
    },
    {
        slug: "data-scientist",
        role: "Data Scientist",
        industry: "Data & AI",
        specificClauses: ["Data privacy (GDPR/CCPA)", "Model accuracy disclaimer", "Training data source liability", "Python code ownership"],
        painPoint: "ambiguous results leading to questioning of your model integrity",
        benefit: "establish legal protection for your algorithms and analysis"
    },
    {
        slug: "no-code-developer",
        role: "No-Code Developer",
        industry: "Low-Code/Software",
        specificClauses: ["Bubble/Webflow account handover", "Plugin subscription terms", "Platform risk disclosure", "API integration maintenance"],
        painPoint: "clients not understanding they have a monthly platform bill",
        benefit: "clarify platform costs and handover procedures early"
    },
    {
        slug: "cybersecurity-consultant",
        role: "Security Consultant",
        industry: "IT Security",
        specificClauses: ["Authorization to 'hack'", "Liability for existing breaches", "Remediation vs Discovery", "Strict NDAs"],
        painPoint: "being held responsible for a hack that happened 2 years ago",
        benefit: "legalize your security testing and limit your professional liability"
    },
    {
        slug: "game-developer",
        role: "Game Developer",
        industry: "Gaming",
        specificClauses: ["Engine license (Unity/Unreal)", "Bug-fixing milestones", "Multi-platform delivery", "Audio/Asset royalties"],
        painPoint: "missing a release date due to platform-specific bugs",
        benefit: "manage release expectations and secure your source code"
    },

    // MARKETING & ADS
    {
        slug: "facebook-ads-manager",
        role: "Media Buyer",
        industry: "Advertising",
        specificClauses: ["Ad spend vs Management fee", "Account ownership", "ROAS disclaimer", "Pixel implementation responsibility"],
        painPoint: "clients wanting a refund because Facebook's algorithm changed",
        benefit: "protect your management fee and define success metrics fairly"
    },
    {
        slug: "seo-specialist",
        role: "SEO Consultant",
        industry: "Digital Marketing",
        specificClauses: ["No-ranking guarantee", "Search Console access", "Algorithm change disclosure", "Backlink procurement terms"],
        painPoint: "expecting #1 spots in 2 weeks for 'Best Insurance' keywords",
        benefit: "manage expectations and document the value of long-term organic growth"
    },
    {
        slug: "email-marketer",
        role: "Email Marketer",
        industry: "Marketing",
        specificClauses: ["List hygiene responsibility", "CAN-SPAM compliance", "Deliverability disclaimer", "A/B testing protocols"],
        painPoint: "getting blamed for low open rates on a 'bought' list",
        benefit: "protect your reputation and ensure legal compliant sending"
    },
    {
        slug: "google-ads-specialist",
        role: "PPC Specialist",
        industry: "Advertising",
        specificClauses: ["Click-fraud disclaimer", "Campaign asset ownership", "Reporting frequency", "Landing page recommendations"],
        painPoint: "clients pausing ads and refusing to pay your monthly retainer",
        benefit: "secure your recurring income and protect your campaign builds"
    },
    {
        slug: "influencer-marketing-manager",
        role: "Influencer Manager",
        industry: "Branding",
        specificClauses: ["Creator compliance (FTC)", "Usage rights duration", "Vetting procedures", "Payment disbursement terms"],
        painPoint: "being stuck in the middle of a creator-client legal dispute",
        benefit: "limit your liability as the middleman and clarify usage rights"
    },

    // BUSINESS & OPERATIONS
    {
        slug: "virtual-assistant",
        role: "Virtual Assistant",
        industry: "Admin Support",
        specificClauses: ["Response time (SLA)", "Password management", "Tool software costs", "Office hours boundaries"],
        painPoint: "clients texting you on a Sunday for a Monday morning task",
        benefit: "reclaim your weekends and set professional boundaries"
    },
    {
        slug: "bookkeeper",
        role: "Freelance Bookkeeper",
        industry: "Finance",
        specificClauses: ["No-audit disclaimer", "Client record accuracy", "Document submission dates", "Tax filing limits"],
        painPoint: "finding out at 11 PM on tax day that the client lost their receipts",
        benefit: "protect your practice and ensure you have the data you need"
    },
    {
        slug: "online-business-manager",
        role: "OBM",
        industry: "Operations",
        specificClauses: ["Strategy vs Implementation", "Team management authority", "Metric ownership", "Project tool access"],
        painPoint: "being treated as an assistant instead of a business manager",
        benefit: "establish your authority and define your management scope"
    },
    {
        slug: "business-coach",
        role: "Business Coach",
        industry: "Consulting",
        specificClauses: ["Results vs Effort disclaimer", "Session cancellation policy", "Intellectual property of materials", "Strict confidentiality"],
        painPoint: "clients demanding a refund because their business didn't double in 30 days",
        benefit: "protect your proprietary coaching methods and limit liability"
    },
    {
        slug: "event-planner",
        role: "Event Planner",
        industry: "Events",
        specificClauses: ["Force Majeure (weather/pandemic)", "Vendor payment flow", "On-site hour limits", "Cancellation schedule"],
        painPoint: "being responsible for a venue double-booking or rain on a wedding day",
        benefit: "protect your non-refundable deposit and limit liability"
    },
    {
        slug: "wedding-videographer",
        role: "Wedding Videographer",
        industry: "Events",
        specificClauses: ["Music licensing rights", "Raw footage policy", "Guest interference clause", "Meal requirement"],
        painPoint: "couples demanding the 'raw files' or uncle Bob blocking your shot",
        benefit: "secure your artistic rights and set boundaries for the big day"
    },
    {
        slug: "makeup-artist",
        role: "Makeup Artist",
        industry: "Beauty",
        specificClauses: ["Allergy liability waiver", "Sanitation standards", "Travel/Parking fees", "Touch-up time limits"],
        painPoint: "a bride having an allergic reaction you didn't know about",
        benefit: "limit liability for reactions and guarantee your travel costs"
    },

    // SERVICE & LABOR
    {
        slug: "personal-trainer",
        role: "Personal Trainer",
        industry: "Fitness",
        specificClauses: ["Health waiver & release", "Cancellation <24h policy", "Touch authorization", "Client medical disclosure"],
        painPoint: "clients cancelling 10 minutes before a session",
        benefit: "enforce your cancellation policy and protect against injury lawsuits"
    },
    {
        slug: "dog-walker",
        role: "Dog Walker",
        industry: "Pet Care",
        specificClauses: ["Aggressive behavior history", "Vet emergency authorization", "Key/Access liability", "Inclement weather policy"],
        painPoint: "a dog biting someone and you being held responsible",
        benefit: "get authorization for emergencies and limit bite liability"
    },
    {
        slug: "caregiver",
        role: "Caregiver",
        industry: "Health",
        specificClauses: ["Scope of medical duties", "Emergency protocols", "Overnight rates", "Transportation liability"],
        painPoint: "scope creep where 'companionship' turns into '24/7 nursing'",
        benefit: "clearly define your duties and protect against burnout"
    },

    // SPECIALIZED NICHES
    {
        slug: "voiceover-artist",
        role: "Voice Actor",
        industry: "Media",
        specificClauses: ["Usage duration (e.g. 1 year)", "Buyout options", "AI-training prohibition", "Retake/Pickup session costs"],
        painPoint: "the client using your voice for 10 years when they only paid for 1",
        benefit: "secure your residuals and prevent your voice from being 'AI-cloned'"
    },
    {
        slug: "tutor",
        role: "Online Tutor",
        industry: "Education",
        specificClauses: ["Cancellation window", "Parental supervision (if minor)", "Grade disclaimer", "Material usage rights"],
        painPoint: "students no-showing and still expecting their hour 'banked'",
        benefit: "protect your schedule and get paid for your time slots"
    },
    {
        slug: "translator",
        role: "Translator",
        industry: "Linguistics",
        specificClauses: ["Dialect specific specs", "Glossary approval", "Legal/Medical liability disclaimer", "Urgency surcharges"],
        painPoint: "legal documents being mistranslated due to original text ambiguity",
        benefit: "limit liability for nuanced meanings and charge for rush work"
    },
    {
        slug: "resume-writer",
        role: "Resume Writer",
        industry: "Careers",
        specificClauses: ["Interview guarantee (or not)", "Draft delivery time", "Fact-checking responsibility", "Final file types"],
        painPoint: "clients blaming you when they don't get a job interview",
        benefit: "protect your service time and define deliverable quality"
    },
    {
        slug: "podcast-editor",
        role: "Podcast Editor",
        industry: "Audio Production",
        specificClauses: ["Show notes included (or not)", "Raw audio quality disclaimer", "Turnaround days", "ID3 tagging"],
        painPoint: "spending 5 hours trying to fix 'laptop mic' audio without a fee",
        benefit: "set audio quality standards and protect your editing hours"
    }
];
