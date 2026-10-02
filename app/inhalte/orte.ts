import { ORTSSEITEN } from './orte/index'
import GEMEINDEN from './gemeinden-bw.json'
import type { LeistungSlug } from './leistungen'

export type Fakt = { text: string; quelle: string; url: string; abruf: string }
export type Ortsseite = {
  leistung: LeistungSlug
  ort: string
  ortName: string
  kreis: string
  title: string
  description: string
  h1: string
  einstieg: string
  abschnitte: { h2: string; text: string }[]
  fakten: Fakt[]
  faq: { q: string; a: string }[]
  offen: string[]
}
type Gemeinde = { name: string; such: string; slug: string; kreis: string; einwohner: number; lat: number; lon: number }

const geo = new Map((GEMEINDEN as Gemeinde[]).map((g) => [g.slug, g]))

export { ORTSSEITEN }
export const pfad = (s: Ortsseite) => `/leistungen/${s.leistung}/${s.ort}/`
export const einwohner = (s: Ortsseite) => geo.get(s.ort)?.einwohner ?? 0
export const seitenFuer = (l: LeistungSlug) => ORTSSEITEN.filter((s) => s.leistung === l)
export const seite = (l: LeistungSlug, ort: string) => ORTSSEITEN.find((s) => s.leistung === l && s.ort === ort)
export const andereLeistungen = (s: Ortsseite) => ORTSSEITEN.filter((x) => x.ort === s.ort && x.leistung !== s.leistung)

function km(a: Gemeinde, b: Gemeinde) {
  const r = Math.PI / 180
  const x = (b.lon - a.lon) * r * Math.cos(((a.lat + b.lat) / 2) * r)
  const y = (b.lat - a.lat) * r
  return Math.sqrt(x * x + y * y) * 6371
}

// Nächste Orte mit Seite derselben Leistung (Luftlinie).
export function nachbarn(s: Ortsseite, n = 3): Ortsseite[] {
  const g = geo.get(s.ort)
  const andere = seitenFuer(s.leistung).filter((x) => x.ort !== s.ort)
  if (!g) return andere.slice(0, n)
  return andere
    .map((x) => ({ x, d: geo.has(x.ort) ? km(g, geo.get(x.ort)!) : Infinity }))
    .sort((a, b) => a.d - b.d)
    .slice(0, n)
    .map((v) => v.x)
}
