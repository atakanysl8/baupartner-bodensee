// Ankertabelle: genau ein Linktext je Linkziel, seitenweit (Vault-Regel „ein Anker je Query“).
// Textverweise in Inhalten stehen als [[/pfad/]] und bekommen ihren Text von hier.
import { LEISTUNGEN, LEISTUNG_SLUGS } from './leistungen'
import { RATGEBERLINKS } from './ratgeber-seiten/links'

export const ANKER: Record<string, string> = {
  '/regionen/': 'Leistungen nach Ort',
  '/ratgeber/': 'Ratgeber Baukosten',
  ...Object.fromEntries(LEISTUNG_SLUGS.map((s) => [`/leistungen/${s}/`, LEISTUNGEN[s].name])),
  ...Object.fromEntries(RATGEBERLINKS.map((r) => [`/ratgeber/${r.slug}/`, r.anker])),
}

export const anker = (pfad: string) => ANKER[pfad] ?? pfad
