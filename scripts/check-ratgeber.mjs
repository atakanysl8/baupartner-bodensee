// Inhaltsprüfung der Ratgeberseiten (JSON in app/inhalte/ratgeber-seiten/). Aufruf: node scripts/check-ratgeber.mjs → Exit 1 bei Fehlern.
// Fehler: Pflichtfelder, Title > 60, < 4 Quellen, Kostenzeile ohne gültige Quelle, FAQ nicht 4–6 oder mit Verweis,
// < 800 / > 1.600 Wörter, nicht genau ein Geldlink [[/leistungen/<eigene>/]], Link auf fremde Leistungsseite,
// Verweis auf Ratgeber außerhalb des Seitenplans, verbotene Aussagen, Förderbeträge, Ersparnisversprechen, doppelte Title/H1.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { VERBOTEN } from './check-orte.mjs'

const FOERDERBETRAG = [/(zuschuss|förder\w*|bonus)[^.]{0,40}\d+\s*(%|prozent|euro|€)/i, /\d+\s*(%|prozent)[^.]{0,30}(zuschuss|förder)/i]
const ERSPARNIS = [/sparen sie/i, /\bsparen\s+(bis zu\s+)?\d/i, /amortis/i, /rechnet sich (nach|in)/i]
// Agentenvorlage-Ratgeber Abschnitt 5: Steuerhinweise, Rechtsanweisungen, „vor Ort“ (Präsenzandeutung), Momentangaben.
// „aktuell“ bewusst nicht, weil „aktueller Grundriss“ u. ä. sachlich ist.
const FORMULIERUNG = [/§\s*35[ac]|handwerkerbonus|steuerlich absetz/i, /\bsie müssen\b|beantragen sie/i, /vor ort/i, /\b(derzeit|zurzeit|momentan)\b/i, /\bspätestens\b[^.]{0,40}\b(tage|wochen|monate|jahre)\b/i]
const VERWEIS = /\[\[(\/[^\]]*)\]\]/g

const woerter = (t) => t.replace(VERWEIS, 'x').toLowerCase().replace(/[^a-zäöüß0-9 ]+/g, ' ').split(/\s+/).filter(Boolean).length
export const sichtbar = (s) => [s.einstieg, s.kosten.intro, ...s.kosten.zeilen.map((z) => `${z.posten} ${z.spanne}`), s.kosten.hinweis ?? '', ...s.abschnitte.map((a) => `${a.h2} ${a.text}`), ...s.faq.map((f) => `${f.q} ${f.a}`)].join(' ')
const fliesstext = (s) => [s.einstieg, s.kosten.intro, s.kosten.hinweis ?? '', ...s.abschnitte.map((a) => a.text)].join(' ')

export function pruefeRatgeber(seiten, plan) {
  const fehler = [], warnungen = []
  const titles = new Map(), h1s = new Map()
  for (const s of seiten) {
    const id = `ratgeber/${s.slug}`
    for (const k of ['slug', 'leistung', 'anker', 'hauptbegriff', 'title', 'description', 'h1', 'einstieg', 'kosten', 'abschnitte', 'faq', 'quellen', 'verwandt'])
      if (s[k] === undefined || s[k] === '') fehler.push(`${id}: Feld ${k} fehlt`)
    if (fehler.length) continue
    if (s.title.length > 60) fehler.push(`${id}: Title länger als 60 Zeichen`)
    if (s.description.length < 120 || s.description.length > 160) warnungen.push(`${id}: Description ${s.description.length} Zeichen`)
    if (s.quellen.length < 4) fehler.push(`${id}: nur ${s.quellen.length} Quellen (mindestens 4)`)
    for (const q of s.quellen) if (!/^https:\/\//.test(q.url) || !/^\d{4}-\d{2}-\d{2}$/.test(q.abruf ?? '') || !q.titel) fehler.push(`${id}: Quelle unvollständig (${q.url})`)
    if (s.kosten.zeilen.length < 3) fehler.push(`${id}: weniger als 3 Kostenzeilen`)
    for (const z of s.kosten.zeilen) if (!Number.isInteger(z.q) || z.q < 1 || z.q > s.quellen.length) fehler.push(`${id}: Kostenzeile „${z.posten}“ ohne gültige Quelle`)
    if (s.faq.length < 4 || s.faq.length > 6) fehler.push(`${id}: ${s.faq.length} FAQ (4–6)`)
    if (s.faq.some((f) => /\[\[/.test(f.a))) fehler.push(`${id}: Verweis in FAQ-Antwort`)
    const n = woerter(sichtbar(s))
    if (n < 800 || n > 1600) fehler.push(`${id}: ${n} Wörter (800–1.600)`)
    const ziele = [...fliesstext(s).matchAll(VERWEIS)].map((m) => m[1])
    const geld = ziele.filter((z) => z === `/leistungen/${s.leistung}/`).length
    if (geld !== 1) fehler.push(`${id}: ${geld} Geldlinks auf /leistungen/${s.leistung}/ (genau 1)`)
    for (const z of ziele) {
      if (/^\/leistungen\//.test(z) && z !== `/leistungen/${s.leistung}/`) fehler.push(`${id}: Link auf fremde Leistungsseite ${z}`)
      const r = z.match(/^\/ratgeber\/([^/]+)\/$/)
      if (r && !plan.includes(r[1])) fehler.push(`${id}: Verweis auf unbekannten Ratgeber ${r[1]}`)
      if (!/^\/(leistungen|ratgeber|regionen)\b/.test(z) || !z.endsWith('/')) fehler.push(`${id}: ungültiges Linkziel ${z}`)
    }
    if (s.verwandt.length < 1 || s.verwandt.length > 2) fehler.push(`${id}: verwandt 1–2 Einträge`)
    for (const v of s.verwandt) if (!plan.includes(v) || v === s.slug) fehler.push(`${id}: verwandt ${v} nicht im Seitenplan`)
    const alles = sichtbar(s) + ' ' + s.title + ' ' + s.description
    for (const r of VERBOTEN) if (r.test(alles)) fehler.push(`${id}: verbotenes Muster ${r}`)
    if (FOERDERBETRAG.some((r) => r.test(alles))) fehler.push(`${id}: Förderbetrag/Fördersatz im Text`)
    if (ERSPARNIS.some((r) => r.test(alles))) fehler.push(`${id}: Ersparnisversprechen`)
    for (const r of FORMULIERUNG) if (r.test(alles)) fehler.push(`${id}: verbotene Formulierung ${r}`)
    for (const [m, k, v] of [[titles, 'Title', s.title], [h1s, 'H1', s.h1]]) {
      if (m.has(v)) fehler.push(`${id}: ${k} doppelt mit ${m.get(v)}`)
      else m.set(v, id)
    }
  }
  return { fehler, warnungen }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const root = path.join(import.meta.dirname, '..')
  const ordner = path.join(root, 'app', 'inhalte', 'ratgeber-seiten')
  const plan = JSON.parse(fs.readFileSync(path.join(root, 'docs', 'ratgeber', 'seitenplan.json'), 'utf8')).map((p) => p.slug)
  const filter = process.argv[2] ?? ''
  const seiten = fs.readdirSync(ordner).filter((d) => d.endsWith('.json')).map((d) => JSON.parse(fs.readFileSync(path.join(ordner, d), 'utf8')))
  const { fehler, warnungen } = pruefeRatgeber(seiten, plan)
  const passt = (z) => z.includes(`ratgeber/${filter}`)
  for (const w of warnungen.filter(passt)) console.log('WARNUNG', w)
  for (const f of fehler.filter(passt)) console.log('FEHLER', f)
  const anz = fehler.filter(passt).length
  console.log(`${seiten.length} Ratgeberseiten, ${anz} Fehler, ${warnungen.filter(passt).length} Warnungen`)
  process.exit(anz ? 1 : 0)
}
