import type { MetadataRoute } from 'next'
import { ORTSSEITEN, pfad } from './inhalte/orte'
import { LEISTUNG_SLUGS } from './inhalte/leistungen'
import { RATGEBERLINKS } from './inhalte/ratgeber-seiten/links'

export const dynamic = 'force-static'

const base = 'https://www.bodensee-baupartner.de'
// Fester Stand statt new Date(): sonst meldet jede Neuerzeugung alle Seiten als geändert.
const stand = new Date('2026-10-02')

export default function sitemap(): MetadataRoute.Sitemap {
  // URLs mit abschließendem Schrägstrich, passend zu trailingSlash: true.
  // Impressum und Datenschutz sind noindex und gehören nicht in die Sitemap.
  return [
    { url: `${base}/`, lastModified: stand, changeFrequency: 'monthly', priority: 1.0 },
    ...LEISTUNG_SLUGS.map((slug) => ({ url: `${base}/leistungen/${slug}/`, lastModified: stand, changeFrequency: 'monthly' as const, priority: 0.9 })),
    { url: `${base}/ueber-uns/`, lastModified: stand, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/fuer-fachbetriebe/`, lastModified: stand, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${base}/regionen/`, lastModified: stand, changeFrequency: 'monthly', priority: 0.6 },
    ...RATGEBERLINKS.map((r) => ({ url: `${base}${r.pfad}`, lastModified: stand, changeFrequency: 'yearly' as const, priority: 0.7 })),
    ...ORTSSEITEN.map((s) => ({ url: `${base}${pfad(s)}`, lastModified: stand, changeFrequency: 'yearly' as const, priority: 0.6 })),
  ]
}
