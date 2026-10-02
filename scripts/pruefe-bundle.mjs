// Prüft, dass keine Ortsseiten- und Ratgeber-Texte im Client-JavaScript landen (out/_next/static/chunks).
// Ortsseiten sind Server-HTML; stehen ihre Texte in einem Chunk, lädt jede Seite, die ihn
// einbindet, hunderte KB Daten mit. Aufruf nach dem Build: node scripts/pruefe-bundle.mjs → Exit 1 bei Treffern.
import fs from 'node:fs'
import path from 'node:path'

const ordner = path.join('app', 'inhalte', 'orte')
const proben = fs.readdirSync(ordner)
  .filter((d) => d.endsWith('.json'))
  .map((d) => ({ datei: d, text: JSON.parse(fs.readFileSync(path.join(ordner, d), 'utf8')).abschnitte[0].text.slice(0, 60) }))
const rg = path.join('app', 'inhalte', 'ratgeber-seiten')
if (fs.existsSync(rg)) for (const d of fs.readdirSync(rg).filter((d) => d.endsWith('.json')))
  proben.push({ datei: d, text: JSON.parse(fs.readFileSync(path.join(rg, d), 'utf8')).abschnitte[0].text.slice(0, 60) })

const chunks = path.join('out', '_next', 'static', 'chunks')
const dateien = []
;(function w(d) {
  for (const x of fs.readdirSync(d)) {
    const p = path.join(d, x)
    if (fs.statSync(p).isDirectory()) w(p)
    else if (x.endsWith('.js')) dateien.push(p)
  }
})(chunks)

let treffer = 0
for (const f of dateien) {
  const inhalt = fs.readFileSync(f, 'utf8')
  const gefunden = proben.filter((p) => inhalt.includes(p.text))
  if (gefunden.length) {
    treffer++
    console.log(`FEHLER ${f} (${(fs.statSync(f).size / 1024).toFixed(0)} KB) enthält Texte von ${gefunden.length} Orts-/Ratgeberseiten, z. B. ${gefunden[0].datei}`)
  }
}
console.log(`${dateien.length} Chunks geprüft, ${treffer} mit Orts-/Ratgeber-Texten`)
process.exit(treffer ? 1 : 0)
