// Inhaltsprüfung der Ortsseiten (JSON in app/inhalte/orte/). Aufruf: node scripts/check-orte.mjs → Exit 1 bei Fehlern.
// Fehler: < 5 Fakten, Fakt ohne URL/Quelle/Abrufdatum, FAQ nicht 3–5, < 300 Wörter, verbotene Aussage,
// doppelter Title/H1, Textgleichheit eines Seitenpaars > 70 %. Warnung: Gleichheit > 20 %, > 900 Wörter.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

// Guardrails + Anwaltsregeln: keine Netzwerk-/Qualitäts-/Tempo-Behauptungen, keine Erlösmodell-Details.
export const VERBOTEN = [
  /geprüft/i, /zertifiziert/i, /\bbeste[nrs]?\b/i, /perfekt/i, /garant/i, /24\s*\/\s*7|rund um die uhr|24[- ]?stunden/i,
  /notdienst/i, /partnerbetrieb/i, /unser(e|em|en)? (netzwerk|partner)/i, /vor ort ansässig/i, /niederlassung/i,
  /bewertung/i, /\bsterne\b/i, /zufriedene kunden/i, /bußgeld/i, /provision/i, /innerhalb von \d+ (stunden|tagen)/i,
]
const woerter = (s) => s.toLowerCase().replace(/[^a-zäöüß0-9 ]+/g, ' ').split(/\s+/).filter(Boolean)
const text = (s) => [s.einstieg, ...s.abschnitte.map((a) => a.h2 + ' ' + a.text), ...s.fakten.map((f) => f.text), ...s.faq.map((f) => f.q + ' ' + f.a)].join(' ')
const gramme = (s) => {
  // Ortsname nur als ganzes Wort neutralisieren („Ulm“, nicht „Ulmer“)
  const ort = new RegExp(`(?<!\\p{L})${s.ortName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?!\\p{L})`, 'gu')
  const w = woerter(text(s).replace(ort, 'ORT'))
  const g = new Set()
  for (let i = 0; i + 5 <= w.length; i++) g.add(w.slice(i, i + 5).join(' '))
  return g
}

export function pruefeSeiten(seiten) {
  const fehler = [], warnungen = []
  const titles = new Map(), h1s = new Map()
  for (const s of seiten) {
    const id = `${s.leistung}/${s.ort}`
    if (!Array.isArray(s.fakten) || s.fakten.length < 5) fehler.push(`${id}: nur ${s.fakten?.length ?? 0} Fakten (min. 5)`)
    for (const f of s.fakten ?? []) {
      if (!/^https?:\/\//.test(f.url ?? '')) fehler.push(`${id}: Fakt ohne URL: ${String(f.text).slice(0, 50)}`)
      if (!f.quelle || !/^\d{4}-\d{2}-\d{2}$/.test(f.abruf ?? '')) fehler.push(`${id}: Fakt ohne Quelle/Abrufdatum: ${String(f.text).slice(0, 50)}`)
    }
    if (!(s.faq?.length >= 3 && s.faq.length <= 5)) fehler.push(`${id}: ${s.faq?.length ?? 0} FAQ (3–5)`)
    const n = woerter(text(s)).length
    if (n < 300) fehler.push(`${id}: nur ${n} Wörter (min. 300)`)
    if (n > 900) warnungen.push(`${id}: ${n} Wörter`)
    for (const r of VERBOTEN) if (r.test(text(s) + ' ' + s.title + ' ' + s.description)) fehler.push(`${id}: verbotenes Muster ${r}`)
    for (const [m, k, v] of [[titles, 'Title', s.title], [h1s, 'H1', s.h1]]) {
      if (m.has(v)) fehler.push(`${id}: doppelter ${k} mit ${m.get(v)}`)
      else m.set(v, id)
    }
    if ((s.description ?? '').length > 160) warnungen.push(`${id}: Description ${s.description.length} Zeichen`)
  }
  const g = seiten.map(gramme)
  let max = 0
  for (let i = 0; i < seiten.length; i++) {
    for (let j = i + 1; j < seiten.length; j++) {
      const a = g[i], b = g[j]
      let gem = 0
      for (const x of a) if (b.has(x)) gem++
      const q = gem / Math.max(1, Math.min(a.size, b.size))
      max = Math.max(max, q)
      const paar = `${seiten[i].leistung}/${seiten[i].ort} ↔ ${seiten[j].leistung}/${seiten[j].ort}`
      if (q > 0.7) fehler.push(`Gleichheit ${(q * 100).toFixed(1)} %: ${paar}`)
      else if (q > 0.2) warnungen.push(`Gleichheit ${(q * 100).toFixed(1)} %: ${paar}`)
    }
  }
  return { fehler, warnungen, max }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const ordner = path.join(import.meta.dirname, '..', 'app', 'inhalte', 'orte')
  const nur = process.argv[2] // optional: Dateinamen-Präfix, z. B. eine Gruppe
  const seiten = fs.readdirSync(ordner)
    .filter((d) => d.endsWith('.json') && (!nur || d.startsWith(nur)))
    .map((d) => JSON.parse(fs.readFileSync(path.join(ordner, d), 'utf8')))
  const { fehler, warnungen, max } = pruefeSeiten(seiten)
  warnungen.forEach((w) => console.log('WARNUNG', w))
  fehler.forEach((f) => console.log('FEHLER', f))
  console.log(`${seiten.length} Seiten, höchste Gleichheit ${(max * 100).toFixed(1)} %, ${fehler.length} Fehler, ${warnungen.length} Warnungen`)
  process.exit(fehler.length ? 1 : 0)
}
