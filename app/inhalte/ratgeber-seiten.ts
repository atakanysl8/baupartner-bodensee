// Ratgeberseiten (Kosten-Ratgeber je Leistung). Daten: app/inhalte/ratgeber-seiten/*.json, Index generiert von
// scripts/ratgeber-index.mjs. Nur Server-Komponenten importieren diese Datei — Client-Komponenten nutzen links.ts.
import { RATGEBERSEITEN } from './ratgeber-seiten/index'
import type { LeistungSlug } from './leistungen'

export type Quelle = { titel: string; herausgeber: string; url: string; abruf: string }
export type Ratgeberseite = {
  slug: string
  leistung: LeistungSlug
  rang: number
  anker: string
  hauptbegriff: string
  title: string
  description: string
  h1: string
  einstieg: string
  kosten: { h2: string; intro: string; zeilen: { posten: string; spanne: string; q: number }[]; hinweis?: string }
  abschnitte: { h2: string; text: string }[]
  faq: { q: string; a: string }[]
  verwandt: string[]
  quellen: Quelle[]
  offen: string[]
}

export { RATGEBERSEITEN }
export const ratgeberPfad = (slug: string) => `/ratgeber/${slug}/`
export const ratgeberseite = (slug: string) => RATGEBERSEITEN.find((s) => s.slug === slug)
