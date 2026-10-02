// Schreibt je HTML-Seite in out/ die hrefs aus <nav> und <footer> als JSON (Vorher/Nachher-Vergleich).
// Vergleich: node scripts/links-snapshot.mjs --vergleich vorher.json nachher.json
import fs from 'node:fs'
import path from 'node:path'

const norm = (h) => (h === '#kontakt' ? '/#kontakt' : h.replace(/(.)\/$/, '$1').replace(/\/#/, '/#'))

if (process.argv[2] === '--vergleich') {
  const a = JSON.parse(fs.readFileSync(process.argv[3], 'utf8'))
  const b = JSON.parse(fs.readFileSync(process.argv[4], 'utf8'))
  let fehlt = 0
  for (const seite of Object.keys(a)) {
    for (const t of ['nav', 'footer']) {
      const nachher = new Set((b[seite]?.[t] ?? []).map(norm))
      for (const h of new Set(a[seite][t].map(norm))) {
        if (!nachher.has(h)) { console.log(`FEHLT ${seite} ${t} ${h}`); fehlt++ }
      }
    }
  }
  console.log(`${fehlt} fehlende Links`)
  process.exit(fehlt ? 1 : 0)
}

const ziel = process.argv[2]
const r = {}
;(function w(d) {
  for (const f of fs.readdirSync(d)) {
    const x = path.join(d, f)
    if (fs.statSync(x).isDirectory()) w(x)
    else if (f === 'index.html') {
      const h = fs.readFileSync(x, 'utf8')
      const hrefs = (t) => {
        const block = (h.match(new RegExp(`<${t}[\\s\\S]*?</${t}>`, 'g')) || []).join('')
        return [...block.matchAll(/href="([^"]+)"/g)].map((m) => m[1])
      }
      r[x.split(path.sep).join('/')] = { nav: hrefs('nav'), footer: hrefs('footer') }
    }
  }
})('out')
fs.writeFileSync(ziel, JSON.stringify(r, null, 1))
console.log(`${Object.keys(r).length} Seiten -> ${ziel}`)
