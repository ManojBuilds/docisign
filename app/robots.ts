import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/sign-up', '/sign-in', '/pricing', '/docusign-alternative', '/online-signature-maker', '/mobile-electronic-singature', '/privacy-policy'],
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
      ],
    },
    sitemap: 'https://boopsign.com/sitemap.xml',
  }
}
