import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
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


