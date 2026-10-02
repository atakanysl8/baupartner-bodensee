import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const base = 'https://www.bodensee-baupartner.de'
// Fester Stand statt new Date(): sonst meldet jede Neuerzeugung alle Seiten als geändert.
const stand = new Date('2026-10-02')

export default function sitemap(): MetadataRoute.Sitemap {
  // URLs mit abschließendem Schrägstrich, passend zu trailingSlash: true.
  // Impressum und Datenschutz sind noindex und gehören nicht in die Sitemap.
  return [
    { url: `${base}/`, lastModified: stand, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${base}/leistungen/hochbau/`, lastModified: stand, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/leistungen/tiefbau/`, lastModified: stand, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/leistungen/bad-sanitaer/`, lastModified: stand, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/leistungen/innenausbau/`, lastModified: stand, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/leistungen/renovierung-sanierung/`, lastModified: stand, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/ueber-uns/`, lastModified: stand, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/fuer-fachbetriebe/`, lastModified: stand, changeFrequency: 'yearly', priority: 0.5 },
  ]
}
