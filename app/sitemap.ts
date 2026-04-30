import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.bodensee-baupartner.de'
  const now = new Date()

  return [
    { url: base, lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${base}/ueber-uns`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/leistungen/hochbau`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/leistungen/tiefbau`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/leistungen/bad-sanitaer`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/leistungen/innenausbau`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/leistungen/renovierung-sanierung`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/impressum`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/datenschutz`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
