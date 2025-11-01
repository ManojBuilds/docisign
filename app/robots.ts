import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/sign-up', '/sign-in', '/pricing', '/docusign-alternative', '/hellosign-alternative', '/zoho-sign-alternative', '/online-signature-maker', '/mobile-electronic-signature', '/no-account-signature', '/privacy-policy', '/adobe-sign-alternative', '/dropbox-sign-alternative', '/hellosign-alternative', '/pandadoc-alternative', '/signnow-alternative', '/signrequest-alternative', '/zoho-sign-alternative'],
      disallow: [
        '/dashboard/',
        '/documents/',
        '/documents/*',
        '/sign/',
        '/sign/*',
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
