// Prüft die interne Verlinkung des statischen Exports (Regeln aus der Vault: Seitenpläne §5, pruefe.py D1/D2, pruefstand.ts).
// Aufruf: node scripts/pruefe-links.mjs [ordner=out] → Exit 1 bei Fehlern.
// Fehler: verwaiste Seite (0 redaktionelle Eingänge; Navigation, Fußzeile und Brotkrume zählen nicht), toter interner Link,
// Kostenseite (erkannt am Article-Schema) nicht mit genau einem Geldlink (/leistungen/<x>/), nichtssagender Ankertext,
// mehrere Ankertexte für dieselbe Kostenseite, Klicktiefe ab Startseite > 3. Warnung: mehrere Anker für eine Leistungsseite, < 2 Textlinks.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const NICHTSSAGEND = new Set(['hier', 'mehr', 'mehr erfahren', 'weiterlesen', 'weiter', 'link', 'jetzt', 'klicken sie hier', 'details'])
const text = (h) => h.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim()
const inhalt = (html) => html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<nav[\s\S]*?<\/nav>/g, '').replace(/<footer[\s\S]*?<\/footer>/g, '')

function links(html) {
  return [...html.matchAll(/<a\s[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)]
    .map(([, href, t]) => ({ ziel: href.split(/[?#]/)[0], text: text(t), roh: href }))
    .filter((l) => l.ziel.startsWith('/') && !l.ziel.startsWith('/_next') && !/\.[a-z0-9]+$/i.test(l.ziel))
}

// seiten: { '/pfad/': html } → { fehler, warnungen, statistik }
export function analysiere(seiten) {
  const fehler = [], warnungen = []
  const pfade = Object.keys(seiten)
  const istKosten = (p) => p in seiten && /"@type":"Article"/.test(seiten[p])
  const eingang = Object.fromEntries(pfade.map((p) => [p, new Set()]))
  const anker = {}
  const alle = {}
  for (const p of pfade) {
    alle[p] = new Set(links(seiten[p]).map((l) => l.ziel))
    for (const z of alle[p]) if (!(z in seiten)) fehler.push(`${p}: toter interner Link ${z}`)
    const eigene = links(inhalt(seiten[p])).filter((l) => l.ziel !== p)
    for (const l of eigene) {
      if (l.ziel in eingang) eingang[l.ziel].add(p)
      if (NICHTSSAGEND.has(l.text.toLowerCase())) fehler.push(`${p}: nichtssagender Anker „${l.text}“ → ${l.ziel}`)
      if (l.text && l.ziel !== '/' && !l.roh.includes('#') && !l.roh.includes('?')) (anker[l.ziel] ??= new Set()).add(l.text)
    }
    const textziele = new Set(eigene.map((l) => l.ziel).filter((z) => z !== '/'))
    if (istKosten(p)) {
      const geld = [...textziele].filter((z) => /^\/leistungen\/[^/]+\/$/.test(z))
      if (geld.length !== 1) fehler.push(`${p}: ${geld.length} Geldlinks (genau 1 Leistungsseite) ${geld.join(' ')}`)
    }
    if (/^\/leistungen\//.test(p) && textziele.size < 2) warnungen.push(`${p}: nur ${textziele.size} Textlinks`)
  }
  for (const p of pfade) if (p !== '/' && eingang[p].size === 0) fehler.push(`${p}: verwaist (kein redaktioneller Eingang)`)
  for (const [z, a] of Object.entries(anker)) {
    if (a.size < 2) continue
    const meldung = `${z}: ${a.size} Ankertexte (${[...a].slice(0, 4).join(' | ')})`
    if (istKosten(z)) fehler.push(meldung)
    else if (/^\/leistungen\/[^/]+\/$/.test(z)) warnungen.push(meldung)
  }
  // Klicktiefe: Breitensuche ab Startseite über alle Links (auch Navigation)
  const tiefe = { '/': 0 }
  const schlange = ['/']
  while (schlange.length) {
    const p = schlange.shift()
    for (const z of alle[p] ?? []) if (z in seiten && !(z in tiefe)) { tiefe[z] = tiefe[p] + 1; schlange.push(z) }
  }
  for (const p of pfade) {
    if (!(p in tiefe)) fehler.push(`${p}: von der Startseite nicht erreichbar (Klicktiefe ∞)`)
    else if (tiefe[p] > 3) fehler.push(`${p}: Klicktiefe ${tiefe[p]} (> 3)`)
  }
  const n = (ist) => pfade.filter(ist).map((p) => eingang[p].size).sort((a, b) => a - b)
  const median = (a) => (a.length ? a[Math.floor(a.length / 2)] : 0)
  const statistik = Object.fromEntries(
    [
      ['Leistungsseiten', (p) => /^\/leistungen\/[^/]+\/$/.test(p)],
      ['Ortsseiten', (p) => /^\/leistungen\/[^/]+\/[^/]+\/$/.test(p) && !istKosten(p)],
      ['Kostenseiten', istKosten],
    ].map(([k, ist]) => { const a = n(ist); return [k, { anzahl: a.length, minEingang: a[0] ?? 0, medianEingang: median(a), maxTiefe: Math.max(0, ...pfade.filter(ist).map((p) => tiefe[p] ?? 99)) }] }),
  )
  return { fehler, warnungen, statistik }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const ordner = path.resolve(process.argv[2] ?? 'out')
  const seiten = {}
  ;(function w(d) {
    for (const x of fs.readdirSync(d)) {
      const p = path.join(d, x)
      if (fs.statSync(p).isDirectory()) { if (!x.startsWith('_') && !x.startsWith('.') && x !== '404') w(p) }
      else if (x === 'index.html') seiten['/' + path.relative(ordner, d).split(path.sep).join('/') + (d === ordner ? '' : '/')] = fs.readFileSync(p, 'utf8')
    }
  })(ordner)
  // noindex-Seiten (Impressum, Datenschutz) brauchen keine redaktionellen Eingänge
  for (const p of Object.keys(seiten)) if (/<meta name="robots" content="[^"]*noindex/.test(seiten[p])) seiten[p] = seiten[p].replace('</body>', '<!--noindex--></body>')
  const { fehler, warnungen, statistik } = analysiere(seiten)
  const noindex = new Set(Object.keys(seiten).filter((p) => seiten[p].includes('<!--noindex-->') || p === '/404/' || p === '/_not-found/'))
  const echt = fehler.filter((f) => !noindex.has(f.split(':')[0]) || !f.includes('verwaist'))
  for (const w of warnungen) console.log('WARNUNG', w)
  for (const f of echt) console.log('FEHLER', f)
  console.log(JSON.stringify(statistik))
  console.log(`${Object.keys(seiten).length} Seiten, ${echt.length} Fehler, ${warnungen.length} Warnungen`)
  process.exit(echt.length ? 1 : 0)
}
