import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/sign-up', '/sign-in', '/pricing', '/docusign-alternative', '/hellosign-alternative', '/zoho-sign-alternative', '/online-signature-maker', '/mobile-electronic-signature', '/no-account-signature', '/privacy-policy', '/adobe-sign-alternative', '/dropbox-sign-alternative', '/hellosign-alternative', '/pandadoc-alternative', '/signnow-alternative', '/signrequest-alternative', '/zoho-sign-alternative', '/proposal-signing-software', '/freelance-contract-template', '/electronic-signature-laws', '/esignature-vs-digital-signature', '/how-to-create-electronic-signature', '/contract-signing-best-practices', '/document-security-guide', '/nda-template-free', '/consulting-agreement-template', '/client-onboarding-documents', '/remote-team-document-signing', '/real-estate-document-signing', '/hr-document-signing'],
      disallow: [
        '/dashboard/',
        '/d/',
        '/d/*',
        '/s/',
        '/s/*',
        '/api/',
        '/api/*',
        '/account/billing/',
        '/complete/',
        '/callback'
      ],
    },
    sitemap: 'https://www.boopsign.com/sitemap.xml',
  }
}
