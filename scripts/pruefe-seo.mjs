// SEO-Prüfung des statischen Exports: je Seite Title, Description, Canonical (selbst),
// genau eine H1, Pflichtlinks im Footer; seitenübergreifend doppelte Titles/Descriptions.
// Aufruf: node scripts/pruefe-seo.mjs [ordner=out] → Exit 1 bei Fehlern.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const BASIS = 'https://www.bodensee-baupartner.de'
const PFLICHT_FOOTER = ['/impressum', '/datenschutz', '/fuer-fachbetriebe']

export function pruefeSeite(html, pfad) {
  const f = []
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1]?.trim()
  if (!title) f.push('Title fehlt')
  if (!/<meta name="description" content="[^"]+"/.test(html)) f.push('Description fehlt')
  const can = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]
  if (!can) f.push('Canonical fehlt')
  else if (can !== BASIS + pfad) f.push(`Canonical zeigt auf ${can} statt ${BASIS + pfad}`)
  const h1 = (html.match(/<h1[\s>]/g) || []).length
  if (h1 !== 1) f.push(`H1-Anzahl ${h1}`)
  const footer = html.match(/<footer[\s\S]*?<\/footer>/)?.[0] ?? ''
  for (const l of PFLICHT_FOOTER) if (!new RegExp(`href="${l}/?"`).test(footer)) f.push(`Footer-Link ${l} fehlt`)
  return f
}

function seiten(ordner) {
  const out = []
  ;(function w(d) {
    for (const x of fs.readdirSync(d)) {
      const p = path.join(d, x)
      if (fs.statSync(p).isDirectory()) { if (!x.startsWith('_')) w(p) }
      else if (x === 'index.html') out.push(p)
    }
  })(ordner)
  return out
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const ordner = process.argv[2] ?? 'out'
  const titles = new Map(), descs = new Map()
  let fehler = 0, n = 0
  for (const datei of seiten(ordner)) {
    const rel = '/' + path.relative(ordner, path.dirname(datei)).split(path.sep).join('/')
    const pfad = rel === '/' ? '/' : rel + '/'
    if (pfad === '/404/') continue
    const html = fs.readFileSync(datei, 'utf8')
    n++
    for (const x of pruefeSeite(html, pfad)) { console.log(`FEHLER ${pfad}: ${x}`); fehler++ }
    const t = html.match(/<title>([^<]*)<\/title>/)?.[1]
    const d = html.match(/<meta name="description" content="([^"]+)"/)?.[1]
    if (t) { if (titles.has(t)) { console.log(`FEHLER doppelter Title: ${pfad} = ${titles.get(t)}`); fehler++ } titles.set(t, pfad) }
    if (d) { if (descs.has(d)) { console.log(`FEHLER doppelte Description: ${pfad} = ${descs.get(d)}`); fehler++ } descs.set(d, pfad) }
  }
  console.log(`${n} Seiten geprüft, ${fehler} Fehler`)
  process.exit(fehler ? 1 : 0)
}
