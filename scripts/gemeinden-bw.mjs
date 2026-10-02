// Erzeugt app/inhalte/gemeinden-bw.json aus dem Destatis-Gemeindeverzeichnis (docs/regionen/messung/gv.xlsx):
// alle Gemeinden in Baden-Württemberg (Land 08) ab 5.000 Einwohnern.
// Aufruf: node scripts/gemeinden-bw.mjs   (braucht einmalig `npm i --no-save xlsx`)
import fs from 'node:fs'
import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'

export const slugify = (s) => s.toLowerCase()
  .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
  .replace(/\(.*?\)/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

// Anzeigename ohne Verwaltungszusatz („, Stadt“, „, Große Kreisstadt“ …)
export const anzeigename = (s) => s.replace(/,\s*(Stadt|Große Kreisstadt|Universitätsstadt|Hochschulstadt|Kurort|Kurstadt|Landeshauptstadt).*$/i, '').trim()

// Suchname: geografischer Zusatz nur weg, wo der Kurzname bundesweit eindeutig auf diesen Ort zielt
// (Suchvolumen wird national gemessen: „weilheim“ wäre Weilheim in Oberbayern). Deshalb Positivliste.
const KURZ_OK = new Set(['Freiburg', 'Esslingen', 'Heidenheim', 'Rottenburg', 'Biberach', 'Radolfzell', 'Remseck', 'Leutkirch',
  'Müllheim', 'Giengen', 'Breisach', 'Wendlingen', 'Marbach', 'Lauffen', 'Eningen', 'Endingen', 'Furtwangen', 'Staufen',
  'Immenstaad', 'Kressbronn', 'Vogtsburg', 'Bonndorf'])
export function suchname(name) {
  const m = name.match(/^(.+?)\s+(am|an der|an den|im|in der|ob der|bei|unter|vor der)\s+.+$/)
  return m && KURZ_OK.has(m[1]) ? m[1] : name
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const require = createRequire(import.meta.url)
  const X = require('xlsx')
  const w = X.readFile('docs/regionen/messung/gv.xlsx')
  const zeilen = X.utils.sheet_to_json(w.Sheets[w.SheetNames[1]], { header: 1 })
  const kreise = new Map()
  const roh = []
  for (const z of zeilen) {
    if (z[2] !== '08') continue
    if (z[0] === '40') kreise.set(`${z[3]}${z[4]}`, anzeigename(String(z[7])))
    if (z[0] === '60') {
      const einwohner = Number(String(z[9] ?? '').replace(/\s/g, ''))
      if (!(einwohner >= 5000)) continue
      const name = anzeigename(String(z[7]))
      roh.push({ name, such: suchname(name), kreis: kreise.get(`${z[3]}${z[4]}`) ?? '', einwohner, lon: Number(String(z[14]).replace(',', '.')), lat: Number(String(z[15]).replace(',', '.')) })
    }
  }
  // Klammerzusatz („Singen (Hohentwiel)“) nur Anzeige; gesucht wird ohne. Gleicher Kurzname zweimal in BW
  // (Weingarten / Weingarten (Baden)) → nur der größere Ort bleibt, der kleinere ist bei der Suche nicht trennbar.
  for (const g of roh) g.such = g.such.replace(/\s*\(.*\)/, '').split('/')[0]
  roh.sort((a, b) => b.einwohner - a.einwohner)
  const gesehen = new Set()
  const ausgelassen = []
  for (const g of [...roh]) {
    const k = g.such.toLowerCase()
    if (gesehen.has(k)) { ausgelassen.push(g.name); roh.splice(roh.indexOf(g), 1) } else gesehen.add(k)
  }
  if (ausgelassen.length) console.log('ausgelassen (Name doppelt in BW):', ausgelassen.join(', '))
  // Suchname doppelt in BW → vollen Namen nehmen; voller Name doppelt → Kreis anhängen
  const zaehle = (key) => roh.reduce((m, g) => m.set(key(g), (m.get(key(g)) ?? 0) + 1), new Map())
  const suchDoppelt = zaehle((g) => g.such.toLowerCase())
  for (const g of roh) if (suchDoppelt.get(g.such.toLowerCase()) > 1) g.such = g.name
  const nameDoppelt = zaehle((g) => g.such.toLowerCase())
  const gemeinden = roh.map((g) => ({
    name: g.name,
    such: g.such,
    slug: slugify(nameDoppelt.get(g.such.toLowerCase()) > 1 ? `${g.such} ${g.kreis}` : g.such),
    kreis: g.kreis,
    einwohner: g.einwohner,
    lat: g.lat,
    lon: g.lon,
  })).sort((a, b) => b.einwohner - a.einwohner)
  fs.writeFileSync('app/inhalte/gemeinden-bw.json', JSON.stringify(gemeinden, null, 1))
  console.log(`${gemeinden.length} Gemeinden ≥ 5.000 EW, ${new Set(gemeinden.map((g) => g.kreis)).size} Kreise`)
}
