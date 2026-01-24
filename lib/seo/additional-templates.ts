export type AdditionalTemplate = {
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
    priority: "high" | "medium" | "low";
    relatedRoles: string[]; // slugs from FREELANCE_ROLES
};

export const ADDITIONAL_TEMPLATES: AdditionalTemplate[] = [
    // HIGH PRIORITY TEMPLATES
    {
        id: "service-agreement",
        slug: "service-agreement",
        name: "Service Agreement",
        title: "General Service Contract",
        description: "A comprehensive catch-all agreement for any service-based business relationship.",
        legalContext: "Flexible framework suitable for various professional services across industries.",
        keyFeatures: [
            "Customizable service description",
            "Payment terms and invoicing",
            "Service level expectations",
            "Liability limitations"
        ],
        docUrl: "",
        pdfUrl: "",
        category: "General",
        priority: "high",
        relatedRoles: ["virtual-assistant", "business-coach", "online-business-manager"]
    },
    {
        id: "consulting-agreement",
        slug: "consulting-agreement",
        name: "Consulting Agreement",
        title: "Professional Consulting Contract",
        description: "For business coaches, consultants, and strategic advisors providing expert guidance.",
        legalContext: "Protects consultants from liability while defining advisory scope and deliverables.",
        keyFeatures: [
            "Consulting scope and objectives",
            "Results vs. effort disclaimer",
            "Intellectual property of materials",
            "Session cancellation policy"
        ],
        docUrl: "",
        pdfUrl: "",
        category: "General",
        priority: "high",
        relatedRoles: ["business-coach", "online-business-manager", "cybersecurity-consultant", "seo-specialist"]
    },
    {
        id: "photography-contract",
        slug: "photography-videography-contract",
        name: "Photography/Videography Contract",
        title: "Creative Media Services Agreement",
        description: "For photographers and videographers covering shoots, deliverables, and usage rights.",
        legalContext: "Protects creative rights while defining client usage and delivery expectations.",
        keyFeatures: [
            "Shoot duration and location",
            "Deliverable timeline and format",
            "Usage rights and licensing",
            "Raw footage/file policy"
        ],
        docUrl: "",
        pdfUrl: "",
        category: "Specialized",
        priority: "high",
        relatedRoles: ["wedding-videographer", "motion-graphics-artist"]
    },
    {
        id: "creative-services",
        slug: "creative-services-agreement",
        name: "Creative Services Agreement",
        title: "Design & Creative Work Contract",
        description: "For designers, illustrators, and creative professionals delivering visual assets.",
        legalContext: "Balances creative freedom with client expectations and IP ownership.",
        keyFeatures: [
            "Concept presentation rounds",
            "Revision limits",
            "File format deliverables",
            "Portfolio usage rights"
        ],
        docUrl: "",
        pdfUrl: "",
        category: "General",
        priority: "high",
        relatedRoles: ["ui-ux-designer", "brand-identity-designer", "illustrator", "interior-designer"]
    },
    {
        id: "web-development",
        slug: "website-development-agreement",
        name: "Website Development Agreement",
        title: "Web Development Contract",
        description: "For web developers building websites, web apps, or eCommerce platforms.",
        legalContext: "Defines technical scope, hosting responsibilities, and post-launch support.",
        keyFeatures: [
            "Technical specifications",
            "Hosting and domain ownership",
            "Browser compatibility standards",
            "Post-launch support period"
        ],
        docUrl: "",
        pdfUrl: "",
        category: "General",
        priority: "high",
        relatedRoles: ["shopify-developer", "no-code-developer", "game-developer"]
    },
    {
        id: "social-media-management",
        slug: "social-media-management-agreement",
        name: "Social Media Management Agreement",
        title: "Social Media Services Contract",
        description: "For social media managers handling content creation, posting, and community engagement.",
        legalContext: "Defines content ownership, posting schedules, and performance expectations.",
        keyFeatures: [
            "Content calendar and approval process",
            "Platform access and ownership",
            "Engagement metrics vs. guarantees",
            "Crisis management protocol"
        ],
        docUrl: "",
        pdfUrl: "",
        category: "General",
        priority: "high",
        relatedRoles: ["content-strategist", "copywriter", "influencer-marketing-manager"]
    },
    {
        id: "marketing-services",
        slug: "marketing-services-agreement",
        name: "Marketing Services Agreement",
        title: "Digital Marketing Contract",
        description: "For SEO specialists, PPC managers, and digital marketers running campaigns.",
        legalContext: "Protects against algorithm changes while defining campaign management scope.",
        keyFeatures: [
            "Campaign objectives and KPIs",
            "Ad spend vs. management fee separation",
            "Performance disclaimer",
            "Reporting frequency and metrics"
        ],
        docUrl: "",
        pdfUrl: "",
        category: "General",
        priority: "high",
        relatedRoles: ["seo-specialist", "facebook-ads-manager", "google-ads-specialist", "email-marketer"]
    },

    // MEDIUM PRIORITY TEMPLATES
    {
        id: "event-planning",
        slug: "event-planning-agreement",
        name: "Event Planning Agreement",
        title: "Event Services Contract",
        description: "For event planners coordinating venues, vendors, and logistics.",
        legalContext: "Limits liability for third-party vendor issues and force majeure events.",
        keyFeatures: [
            "Event scope and timeline",
            "Vendor coordination responsibilities",
            "Force majeure clause",
            "Cancellation and refund policy"
        ],
        docUrl: "",
        pdfUrl: "",
        category: "Specialized",
        priority: "medium",
        relatedRoles: ["event-planner", "wedding-videographer"]
    },
    {
        id: "coaching-agreement",
        slug: "coaching-agreement",
        name: "Coaching Agreement",
        title: "Personal Coaching Contract",
        description: "For personal trainers, life coaches, and tutors providing one-on-one guidance.",
        legalContext: "Protects coaches from unrealistic expectations while defining session terms.",
        keyFeatures: [
            "Session frequency and duration",
            "Cancellation policy",
            "Results disclaimer",
            "Confidentiality terms"
        ],
        docUrl: "",
        pdfUrl: "",
        category: "Specialized",
        priority: "medium",
        relatedRoles: ["personal-trainer", "tutor", "business-coach"]
    },
    {
        id: "translation-services",
        slug: "translation-services-agreement",
        name: "Translation Services Agreement",
        title: "Professional Translation Contract",
        description: "For translators and interpreters providing language services.",
        legalContext: "Limits liability for nuanced meanings while ensuring quality standards.",
        keyFeatures: [
            "Source and target languages",
            "Dialect specifications",
            "Urgency surcharges",
            "Legal/medical disclaimer"
        ],
        docUrl: "",
        pdfUrl: "",
        category: "Specialized",
        priority: "medium",
        relatedRoles: ["translator", "technical-writer"]
    },
    {
        id: "virtual-assistant",
        slug: "virtual-assistant-agreement",
        name: "Virtual Assistant Agreement",
        title: "VA Services Contract",
        description: "For virtual assistants providing administrative and operational support.",
        legalContext: "Defines working hours, response times, and task boundaries.",
        keyFeatures: [
            "Service level agreement (SLA)",
            "Office hours and availability",
            "Tool and software access",
            "Password management protocol"
        ],
        docUrl: "",
        pdfUrl: "",
        category: "General",
        priority: "medium",
        relatedRoles: ["virtual-assistant", "online-business-manager", "bookkeeper"]
    },
    {
        id: "influencer-marketing",
        slug: "influencer-marketing-agreement",
        name: "Influencer Marketing Agreement",
        title: "Brand Partnership Contract",
        description: "For influencer managers and brand partnerships defining content and compensation.",
        legalContext: "Ensures FTC compliance and defines content usage rights.",
        keyFeatures: [
            "Content deliverables and timeline",
            "FTC disclosure requirements",
            "Usage rights duration",
            "Performance metrics"
        ],
        docUrl: "",
        pdfUrl: "",
        category: "Specialized",
        priority: "medium",
        relatedRoles: ["influencer-marketing-manager", "content-strategist"]
    },
    {
        id: "audio-video-production",
        slug: "audio-video-production-agreement",
        name: "Audio/Video Production Agreement",
        title: "Media Production Contract",
        description: "For podcast editors, voiceover artists, and audio/video producers.",
        legalContext: "Protects source files and defines usage rights for produced content.",
        keyFeatures: [
            "Production deliverables",
            "Source file ownership",
            "Turnaround time",
            "Revision policy"
        ],
        docUrl: "",
        pdfUrl: "",
        category: "Specialized",
        priority: "medium",
        relatedRoles: ["podcast-editor", "voiceover-artist", "motion-graphics-artist"]
    },
    {
        id: "real-estate-services",
        slug: "real-estate-services-agreement",
        name: "Real Estate Services Agreement",
        title: "Real Estate Professional Contract",
        description: "For real estate agents and property managers providing property services.",
        legalContext: "Defines commission structure and service scope for real estate professionals.",
        keyFeatures: [
            "Commission structure",
            "Exclusivity period",
            "Marketing responsibilities",
            "Dual agency disclosure"
        ],
        docUrl: "",
        pdfUrl: "",
        category: "Real Estate",
        priority: "medium",
        relatedRoles: ["real-estate-agent", "property-manager", "landlord"]
    },

    // LOW PRIORITY TEMPLATES
    {
        id: "pet-care-services",
        slug: "pet-care-services-agreement",
        name: "Pet Care Services Agreement",
        title: "Pet Care Contract",
        description: "For dog walkers, pet sitters, and pet care professionals.",
        legalContext: "Limits liability for pet behavior and emergency situations.",
        keyFeatures: [
            "Pet behavior history",
            "Emergency vet authorization",
            "Key and access liability",
            "Inclement weather policy"
        ],
        docUrl: "",
        pdfUrl: "",
        category: "Specialized",
        priority: "low",
        relatedRoles: ["dog-walker"]
    },
    {
        id: "health-wellness-services",
        slug: "health-wellness-services-agreement",
        name: "Health & Wellness Services Agreement",
        title: "Wellness Services Contract",
        description: "For caregivers, makeup artists, and wellness professionals.",
        legalContext: "Includes health waivers and defines scope of care.",
        keyFeatures: [
            "Health waiver and release",
            "Scope of services",
            "Allergy disclosure",
            "Emergency protocols"
        ],
        docUrl: "",
        pdfUrl: "",
        category: "Specialized",
        priority: "low",
        relatedRoles: ["caregiver", "makeup-artist", "personal-trainer"]
    },
    {
        id: "tutoring-agreement",
        slug: "tutoring-agreement",
        name: "Tutoring Agreement",
        title: "Educational Services Contract",
        description: "For online tutors and educational consultants.",
        legalContext: "Protects tutors from grade guarantees while defining session terms.",
        keyFeatures: [
            "Session schedule",
            "Cancellation window",
            "Grade disclaimer",
            "Material usage rights"
        ],
        docUrl: "",
        pdfUrl: "",
        category: "Specialized",
        priority: "low",
        relatedRoles: ["tutor", "resume-writer"]
    }
];

// Helper function to get templates by priority
export function getTemplatesByPriority(priority: "high" | "medium" | "low") {
    return ADDITIONAL_TEMPLATES.filter(t => t.priority === priority);
}

// Helper function to get templates by role
export function getTemplatesByRole(roleSlug: string) {
    return ADDITIONAL_TEMPLATES.filter(t => t.relatedRoles.includes(roleSlug));
}

// Statistics
export const TEMPLATE_STATS = {
    total: ADDITIONAL_TEMPLATES.length,
    high: getTemplatesByPriority("high").length,
    medium: getTemplatesByPriority("medium").length,
    low: getTemplatesByPriority("low").length,
};
