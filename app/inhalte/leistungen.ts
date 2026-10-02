// Zentrale Liste aller Leistungsbereiche. Nav, Footer, Startseite, Formular-Chips, Sitemap,
// Ortsseiten und Übersicht lesen hieraus — neue Bereiche nur hier ergänzen.
// Schnitt nach Suchverhalten (Gewerk/Arbeit statt Branchenbegriff), Messung OpenSEO 02.10.2026:
// docs/regionen/messung/keywords-04-gewerke.md
export type LeistungSlug =
  | 'hochbau' | 'dach-fassade' | 'tiefbau'
  | 'renovierung-sanierung' | 'bad-sanitaer' | 'heizung-waermepumpe' | 'elektro-photovoltaik' | 'fenster-tueren'
  | 'innenausbau' | 'maler-fliesen-boeden' | 'garten-aussenanlagen'
export type Gruppe = 'bauen' | 'sanieren' | 'ausbau'
export type Leistung = {
  slug: LeistungSlug
  gruppe: Gruppe
  name: string
  /** kurzer Linktext / Suchbegriff, z. B. in der Übersicht „Elektriker“ */
  kurz: string
  /** exakter Chip-Text im Anfrageformular (app/page.tsx) */
  chip: string
  ortsTitel: (ort: string) => string
}

export const GRUPPEN: { gruppe: Gruppe; titel: string }[] = [
  { gruppe: 'bauen', titel: 'Bauen' },
  { gruppe: 'sanieren', titel: 'Sanieren & Modernisieren' },
  { gruppe: 'ausbau', titel: 'Ausbau & Außen' },
]

export const LEISTUNGEN: Record<LeistungSlug, Leistung> = {
  'hochbau': { slug: 'hochbau', gruppe: 'bauen', name: 'Neubau & Rohbau', kurz: 'Bauunternehmen', chip: 'Neubau & Rohbau', ortsTitel: o => `Bauunternehmen in ${o}` },
  'dach-fassade': { slug: 'dach-fassade', gruppe: 'bauen', name: 'Dach & Fassade', kurz: 'Dachdecker', chip: 'Dach & Fassade', ortsTitel: o => `Dachdecker in ${o}` },
  'tiefbau': { slug: 'tiefbau', gruppe: 'bauen', name: 'Tiefbau & Erdarbeiten', kurz: 'Tiefbau', chip: 'Tiefbau & Erdarbeiten', ortsTitel: o => `Tiefbau in ${o}` },
  'renovierung-sanierung': { slug: 'renovierung-sanierung', gruppe: 'sanieren', name: 'Sanierung & Renovierung', kurz: 'Sanierung', chip: 'Sanierung & Renovierung', ortsTitel: o => `Sanierung in ${o}` },
  'bad-sanitaer': { slug: 'bad-sanitaer', gruppe: 'sanieren', name: 'Badsanierung & Sanitär', kurz: 'Badsanierung', chip: 'Bad & Sanitär', ortsTitel: o => `Badsanierung in ${o}` },
  'heizung-waermepumpe': { slug: 'heizung-waermepumpe', gruppe: 'sanieren', name: 'Heizung & Wärmepumpe', kurz: 'Heizung & Wärmepumpe', chip: 'Heizung & Wärmepumpe', ortsTitel: o => `Heizung & Wärmepumpe in ${o}` },
  'elektro-photovoltaik': { slug: 'elektro-photovoltaik', gruppe: 'sanieren', name: 'Elektro & Photovoltaik', kurz: 'Elektriker', chip: 'Elektro & Photovoltaik', ortsTitel: o => `Elektriker in ${o}` },
  'fenster-tueren': { slug: 'fenster-tueren', gruppe: 'sanieren', name: 'Fenster & Türen', kurz: 'Fenster & Türen', chip: 'Fenster & Türen', ortsTitel: o => `Fenster & Türen in ${o}` },
  'innenausbau': { slug: 'innenausbau', gruppe: 'ausbau', name: 'Innenausbau & Trockenbau', kurz: 'Innenausbau', chip: 'Innenausbau & Trockenbau', ortsTitel: o => `Innenausbau in ${o}` },
  'maler-fliesen-boeden': { slug: 'maler-fliesen-boeden', gruppe: 'ausbau', name: 'Maler, Fliesen & Böden', kurz: 'Maler', chip: 'Maler, Fliesen & Böden', ortsTitel: o => `Maler in ${o}` },
  'garten-aussenanlagen': { slug: 'garten-aussenanlagen', gruppe: 'ausbau', name: 'Garten & Außenanlagen', kurz: 'Terrassenüberdachung', chip: 'Garten & Außenanlagen', ortsTitel: o => `Terrassenüberdachung in ${o}` },
}
export const LEISTUNG_SLUGS = Object.keys(LEISTUNGEN) as LeistungSlug[]
export const leistungenDerGruppe = (g: Gruppe) => LEISTUNG_SLUGS.filter((s) => LEISTUNGEN[s].gruppe === g).map((s) => LEISTUNGEN[s])
