import { Metadata } from 'next'
import { SEO_CONFIG } from './seo-config'

// Base metadata configuration
export const baseMetadata: Metadata = {
    metadataBase: new URL(SEO_CONFIG.siteUrl),
    title: {
        default: `${SEO_CONFIG.siteName} - ${SEO_CONFIG.tagline}`,
        template: `%s | ${SEO_CONFIG.siteName} - Fast Document Signing`
    },
    description: SEO_CONFIG.longDescription,
    keywords: SEO_CONFIG.keywords as unknown as Metadata['keywords'],
    authors: [{ name: SEO_CONFIG.company }],
    creator: SEO_CONFIG.siteName,
    publisher: SEO_CONFIG.siteName,
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: SEO_CONFIG.siteUrl,
        siteName: SEO_CONFIG.siteName,
        title: `${SEO_CONFIG.siteName} - ${SEO_CONFIG.tagline}`,
        description: SEO_CONFIG.longDescription,
        images: [
            {
                url: SEO_CONFIG.images.ogImage,
                width: 1200,
                height: 630,
                alt: `${SEO_CONFIG.siteName} - Mobile Document Signing Platform`,
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: SEO_CONFIG.twitterHandle,
        creator: SEO_CONFIG.twitterHandle,
        title: `${SEO_CONFIG.siteName} - ${SEO_CONFIG.mainKeyword}`,
        description: `${SEO_CONFIG.shortDescription}. Mobile-first e-signature platform.`,
        images: [SEO_CONFIG.images.twitterImage],
    },
    verification: SEO_CONFIG.verification,
    category: 'SaaS',
    alternates: {
        canonical: SEO_CONFIG.siteUrl,
    }
}

// Page-specific metadata generators
export const generatePageMetadata = {
    homepage: (): Metadata => ({
        title: `${SEO_CONFIG.siteName} - ${SEO_CONFIG.mainKeyword} | ${SEO_CONFIG.shortDescription} in 3 Minutes`,
        description: `The fastest, most affordable ${SEO_CONFIG.mainKeyword.toLowerCase()}. ${SEO_CONFIG.shortDescription}. Perfect for freelancers and small businesses.`,
        openGraph: {
            title: `${SEO_CONFIG.siteName} - ${SEO_CONFIG.mainKeyword} | Mobile Document Signing`,
            description: `${SEO_CONFIG.shortDescription}. The mobile-first e-signature platform that's ${SEO_CONFIG.mainBenefits.slice(0, 2).join(' and ')}.`,
            url: SEO_CONFIG.siteUrl,
        },
        alternates: {
            canonical: SEO_CONFIG.siteUrl,
        }
    }),

    pricing: (): Metadata => ({
        title: `Affordable Pricing - ${SEO_CONFIG.mainKeyword} That Saves Money`,
        description: `Simple, transparent pricing for fast document signing. More affordable than DocuSign with all essential e-signature features. Plans starting from $${SEO_CONFIG.startingPrice}/month.`,
        openGraph: {
            title: `${SEO_CONFIG.siteName} Pricing - Affordable ${SEO_CONFIG.mainKeyword}`,
            description: `Simple, transparent pricing for document signing. More affordable than DocuSign with all essential features.`,
            url: `${SEO_CONFIG.siteUrl}/pricing`,
        },
        alternates: {
            canonical: `${SEO_CONFIG.siteUrl}/pricing`,
        }
    }),

    features: (): Metadata => ({
        title: `Features - ${SEO_CONFIG.mainBenefits[2]} Document Signing Platform`,
        description: `Discover ${SEO_CONFIG.siteName}'s powerful features: ${SEO_CONFIG.mainBenefits[2]} signing, bulk document sending, real-time notifications, and seamless integrations.`,
        openGraph: {
            title: `${SEO_CONFIG.siteName} Features - ${SEO_CONFIG.mainBenefits[2]} Document Signing Made Simple`,
            description: `${SEO_CONFIG.mainBenefits[2]} signing, bulk sending, real-time notifications, and seamless integrations for fast document workflows.`,
            url: `${SEO_CONFIG.siteUrl}/features`,
        },
        alternates: {
            canonical: `${SEO_CONFIG.siteUrl}/features`,
        }
    }),

    comparison: (competitor: string): Metadata => ({
        title: `${SEO_CONFIG.siteName} vs ${competitor} - Simple ${competitor} Alternative 2025`,
        description: `Compare ${SEO_CONFIG.siteName} vs ${competitor}: features, pricing, ease of use. Discover why ${SEO_CONFIG.siteName} is the better ${competitor} alternative for fast document signing.`,
        openGraph: {
            title: `${SEO_CONFIG.siteName} vs ${competitor} - Better ${competitor} Alternative`,
            description: `Compare features, pricing, and ease of use. See why ${SEO_CONFIG.siteName} is the better ${competitor} alternative for document signing.`,
            url: `${SEO_CONFIG.siteUrl}/vs/${competitor.toLowerCase()}`,
        },
        alternates: {
            canonical: `${SEO_CONFIG.siteUrl}/vs/${competitor.toLowerCase()}`,
        }
    }),

    blog: (title?: string, description?: string): Metadata => ({
        title: title ? `${title} - ${SEO_CONFIG.siteName} Blog` : `Blog - Document Signing Tips & Guides | ${SEO_CONFIG.siteName}`,
        description: description || 'Expert tips, guides, and insights on document signing, e-signatures, and business productivity. Learn how to streamline your document workflows.',
        openGraph: {
            title: title ? `${title} - ${SEO_CONFIG.siteName} Blog` : `${SEO_CONFIG.siteName} Blog - Document Signing Tips & Guides`,
            description: description || 'Expert tips and guides on document signing, e-signatures, and business productivity.',
            url: `${SEO_CONFIG.siteUrl}/blog`,
        },
        alternates: {
            canonical: `${SEO_CONFIG.siteUrl}/blog`,
        }
    }),

    alternatives: (): Metadata => ({
        title: `DocuSign Alternatives - Best E-Signature Software 2025 | ${SEO_CONFIG.siteName}`,
        description: `Looking for DocuSign alternatives? ${SEO_CONFIG.siteName} is the more affordable, mobile-first choice for fast document signing. Compare features and see why we're the best.`,
        openGraph: {
            title: `Best DocuSign Alternatives 2025 - ${SEO_CONFIG.siteName}`,
            description: `Compare DocuSign with ${SEO_CONFIG.siteName}. Discover a more affordable and mobile-friendly e-signature solution.`,
            url: `${SEO_CONFIG.siteUrl}/alternatives`,
        },
        alternates: {
            canonical: `${SEO_CONFIG.siteUrl}/alternatives`,
        }
    }),

    privacyPolicy: (): Metadata => ({
        title: `Privacy Policy - How We Protect Your Data | ${SEO_CONFIG.siteName}`,
        description: `Read our privacy policy to understand how ${SEO_CONFIG.siteName} collects, uses, and protects your personal information and document data. Your security is our priority.`,
        openGraph: {
            title: `Privacy Policy - ${SEO_CONFIG.siteName}`,
            description: `Learn how ${SEO_CONFIG.siteName} protects your data and privacy. Our commitment to securing your personal information.`,
            url: `${SEO_CONFIG.siteUrl}/privacy-policy`,
        },
        alternates: {
            canonical: `${SEO_CONFIG.siteUrl}/privacy-policy`,
        }
    }),

    signing: (documentTitle: string, ownerName: string): Metadata => ({        
        title: `Sign Document: ${documentTitle} | ${SEO_CONFIG.siteName}`,        
        description: `You have been invited to sign the document "${documentTitle}" by ${ownerName}. Securely sign documents online with ${SEO_CONFIG.siteName}.`,
        openGraph: {
            title: `Sign Document: ${documentTitle}`,
            description: `Invited by ${ownerName} to sign this document.`,
        },
        robots: { // No index for signing pages
            index: false,
            follow: false,
        }
    }),
    
    signingComplete: (documentTitle: string): Metadata => ({
        title: `Successfully Signed: ${documentTitle} | ${SEO_CONFIG.siteName}`,
        description: `Confirmation that you have successfully signed the document "${documentTitle}". A copy has been sent to your email.`,
        openGraph: {
            title: `Successfully Signed: ${documentTitle}`,
            description: `Confirmation of your signature on the document.`,
        },
        robots: { // No index for signing pages
            index: false,
            follow: false,
        }
    }),

    signUp: (): Metadata => ({
        title: `Sign Up Free - Start Signing Documents in Minutes | ${SEO_CONFIG.siteName}`,
        description: `Create your free ${SEO_CONFIG.siteName} account and start signing documents instantly. No credit card required. ${SEO_CONFIG.mainBenefits[3]} document signing platform.`,
        openGraph: {
            title: `Sign Up Free - ${SEO_CONFIG.siteName} Document Signing`,
            description: 'Create your free account and start signing documents instantly. No credit card required.',
            url: `${SEO_CONFIG.siteUrl}/signup`,
        },
        alternates: {
            canonical: `${SEO_CONFIG.siteUrl}/signup`,
        }
    }),
}

// Structured data schemas using config values
export const structuredData = {
    organization: {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": SEO_CONFIG.siteName,
        "url": SEO_CONFIG.siteUrl,
        "logo": `${SEO_CONFIG.siteUrl}${SEO_CONFIG.images.logo}`,
        "description": SEO_CONFIG.longDescription,
        "sameAs": Object.values(SEO_CONFIG.socialLinks)
    },

    softwareApplication: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": SEO_CONFIG.siteName,
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web, iOS, Android",
        "offers": {
            "@type": "Offer",
            "price": SEO_CONFIG.startingPrice,
            "priceCurrency": SEO_CONFIG.currency,
            "priceValidUntil": "2025-12-31"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": SEO_CONFIG.rating.value,
            "reviewCount": SEO_CONFIG.rating.count,
            "bestRating": SEO_CONFIG.rating.maxRating
        },
        "description": SEO_CONFIG.longDescription
    },

    faq: [
        {
            "@type": "Question",
            "name": `Is ${SEO_CONFIG.siteName} a good ${SEO_CONFIG.mainKeyword}?`,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": `Yes, ${SEO_CONFIG.siteName} is designed as a simpler, more affordable ${SEO_CONFIG.mainKeyword.toLowerCase()} with ${SEO_CONFIG.mainBenefits[2]} design and faster document signing workflows.`
            }
        },
        {
            "@type": "Question",
            "name": `How much does ${SEO_CONFIG.siteName} cost compared to DocuSign?`,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": `${SEO_CONFIG.siteName} starts at $${SEO_CONFIG.startingPrice}/month, significantly less than DocuSign's pricing, while providing all essential e-signature features.`
            }
        },
        {
            "@type": "Question",
            "name": `What makes ${SEO_CONFIG.siteName} different from other e-signature platforms?`,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": `${SEO_CONFIG.siteName} is ${SEO_CONFIG.mainBenefits.join(', ')}, making it the ideal choice for freelancers and small businesses who need quick document signing.`
            }
        }
    ]
}
