export type LeistungSlug = 'hochbau' | 'tiefbau' | 'bad-sanitaer' | 'innenausbau' | 'renovierung-sanierung'
export type Leistung = { slug: LeistungSlug; name: string; chip: string; ortsTitel: (ort: string) => string }

// `chip` muss exakt einem Eintrag in `projektTypen` (app/page.tsx) entsprechen — darüber wird das
// Anfrageformular von einer Ortsseite aus vorbelegt.
export const LEISTUNGEN: Record<LeistungSlug, Leistung> = {
  'hochbau': { slug: 'hochbau', name: 'Hochbau', chip: 'Hochbau / Rohbau', ortsTitel: o => `Bauunternehmen in ${o}` },
  'tiefbau': { slug: 'tiefbau', name: 'Tiefbau', chip: 'Tiefbau', ortsTitel: o => `Tiefbau in ${o}` },
  'bad-sanitaer': { slug: 'bad-sanitaer', name: 'Bad & Sanitär', chip: 'Bad & Sanitär', ortsTitel: o => `Badsanierung in ${o}` },
  'innenausbau': { slug: 'innenausbau', name: 'Innenausbau', chip: 'Innenausbau', ortsTitel: o => `Innenausbau in ${o}` },
  'renovierung-sanierung': { slug: 'renovierung-sanierung', name: 'Renovierung & Sanierung', chip: 'Renovierung & Sanierung', ortsTitel: o => `Sanierung in ${o}` },
}
export const LEISTUNG_SLUGS = Object.keys(LEISTUNGEN) as LeistungSlug[]
