// TODO: FIX ME
export const SEO_CONFIG = {
  // Core brand information
  siteName: 'Docisign',
  siteUrl: 'https://docisign.vercel.app',
  company: 'Docisign Team',
  
  // Primary messaging
  mainKeyword: 'DocuSign alternative',
  tagline: 'Simple DocuSign Alternative | Mobile Document Signing',
  shortDescription: 'Upload, sign, send documents in minutes',
  longDescription: 'The fastest mobile-focused e-signature platform. Upload, sign, and send documents in minutes. Cheaper, simpler than DocuSign. Perfect for freelancers and businesses.',
  
  // Value propositions
  mainBenefits: [
    'faster than DocuSign',
    'more affordable',
    'mobile-first',
    'simple 3-step process'
  ],
  
  // Pricing
  startingPrice: '12',
  currency: 'USD',
  
  // Social & Contact
  twitterHandle: '@docisign',
  socialLinks: {
    twitter: 'https://twitter.com/docisign',
    linkedin: 'https://linkedin.com/company/docisign'
  },
  
  // SEO Keywords (main targets)
  keywords: [
    'DocuSign alternative',
    'e-signature platform',
    'document signing',
    'mobile document signing',
    'electronic signature',
    'digital signature',
    'sign PDF online',
    'contract signing',
    'freelancer tools',
    'business documents',
    'affordable e-signature',
    'simple document signing'
  ],
  
  // Images (update these paths to your actual images)
  images: {
    logo: '/logo.png',
    ogImage: '/og-image.png',
    twitterImage: '/twitter-image.png',
    favicon: '/favicon.ico',
    appleTouchIcon: '/apple-touch-icon.png'
  },
  
  // Brand colors
  themeColor: '#0066cc',
  
  // Verification codes (replace with your actual codes)
  verification: {
    google: 'your-google-verification-code',
    bing: 'your-bing-verification-code'
  },
  
  // Rating/Review data
  rating: {
    value: '4.8',
    count: '150',
    maxRating: '5'
  }
} as const
