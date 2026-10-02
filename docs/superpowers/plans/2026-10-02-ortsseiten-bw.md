# Ortsseiten Baden-Württemberg + SEO-Umbau — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Leistung×Ort-Seiten für Baden-Württemberg (nur mit gemessener Nachfrage, Qualität vor Menge) plus technischer und inhaltlicher SEO-Umbau der bestehenden Website — alles lokal.

**Architecture:** Statischer Next-Export bleibt. Ortsseiten liegen als JSON-Dateien in `app/inhalte/orte/`, ein generierter Index speist je Leistung eine Route `app/leistungen/<leistung>/[ort]/page.tsx` (Server-Komponente, `generateStaticParams`). Nav/Footer werden gemeinsame Komponenten. Prüfskripte in `scripts/` laufen gegen den gebauten Export in `out/`.

**Tech Stack:** Next.js 16.2.4 (App Router, `output: 'export'`, `trailingSlash: true`), React 19, TypeScript, plain CSS (`app/globals.css`), Node 24 (`node --test` für Skripttests), OpenSEO MCP, Playwright MCP.

**Spec:** `docs/superpowers/specs/2026-10-02-ortsseiten-bw-design.md`

## Global Constraints

- Nur localhost. Kein `git push`, kein Upload, keine Live-Änderung (Hostinger, DNS, Tracking).
- Commits mit Repo-Identität `Matei <mateibrezeanu139@gmail.com>` auf Zweig `ortsseiten-bw`; Commit-Text endet mit `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- Design bleibt: bestehende Klassen/Farben aus `app/globals.css`, keine neuen UI-Bibliotheken, Tailwind nicht einführen.
- Startseite bleibt inhaltlich bodenseegeprägt; nur technische/On-Page-Änderungen und Hub-Link.
- Erlösmodell nie erwähnen außer „Die Kosten tragen die Fachbetriebe.“; kein „Provision“, kein Leadpreis.
- Verboten auf allen Seiten: Betriebe/Partner/Niederlassungen im Ort, Netzwerkgröße, „geprüft“, „bester/perfekt“, Garantien, Reaktionszeit-Zusagen, Notdienst/24h, Bewertungen/Kundenzahlen, Firmennamen, Bußgelder, datierte Momentangaben, Handlungsanweisungen in Rechts-/Förderfragen, Zusagen im Namen Dritter.
- OpenSEO: höchstens 1.500 Credits in dieser Runde; Keyword-Abrufe ohne Monatsverläufe; Credits vor/nach jeder Abfragegruppe per `whoami` protokollieren.
- Ortsseite gilt nur mit ≥ 5 leistungsbezogenen, amtlich belegten Ortsangaben (Quelle + URL + Abrufdatum), 3–5 FAQ, 300–600 Wörter.
- Qualität vor Menge (Matei 02.10.2026): Schwellen eher hoch, P2 nur mit klarem SERP-Beleg.
- Agenten: höchstens ~8 gleichzeitig, keine Unteragenten, keine WebSearch, jede Seite sofort als JSON schreiben, Vorlage vor dem ersten Start fertig.
- Next 16: `params` ist ein `Promise` (`const { ort } = await params`).

## Review Focus

1. Ortsseite aufgerufen mit Slug, der nicht im Index steht → statischer Export erzeugt keine Seite; `dynamicParams = false` muss gesetzt sein, sonst Build-Fehler im Export. Test in Task 5.
2. Ortsname mit Umlaut/Sonderform (Überlingen, Villingen-Schwenningen, „Weil am Rhein“) → Slug ae/oe/ue/ss, Anzeige mit Umlaut, Formular-Vorbelegung zeigt korrekten Namen. Test in Task 4 (`slugify`) und Task 5 (Prefill).
3. Formular-Vorbelegung über `/?leistung=x&ort=y#kontakt` mit ungültiger Leistung → keine Chip-Auswahl, kein Absturz. Test in Task 5.
4. Zwei Seiten mit identischem Title/H1 (gleicher Ort, gleiche Leistung doppelt angelegt oder zwei Orte gleichen Namens) → `check-orte` meldet Fehler. Test in Task 4.
5. Bestehende Seite verliert nach dem Nav/Footer-Umbau einen Link (z. B. „Für Fachbetriebe“, Impressum) → `pruefe-seo.mjs` prüft Pflichtlinks auf allen Seiten. Test in Task 2.

---

## File Structure

| Datei | Verantwortung |
|---|---|
| `app/components/Nav.tsx` | gemeinsame Navigation (Client), Prop `aktiv` |
| `app/components/Footer.tsx` | gemeinsame Fußzeile (Client wegen motion) |
| `app/inhalte/leistungen.ts` | Stammdaten der 5 Leistungen (Slug, Name, Formular-Chip, Suchbegriffe) |
| `app/inhalte/gemeinden-bw.json` | Ortsstammdaten (Name, Slug, Kreis, Einwohner, lat/lon) |
| `app/inhalte/orte/<leistung>--<ort>.json` | Inhalt je Ortsseite |
| `app/inhalte/orte/index.ts` | generiert: Liste aller Ortsseiten |
| `app/inhalte/orte.ts` | Typen + Abfragen (`ortsseitenFuer`, `nachbarn`, `seite`) |
| `app/components/OrtSeite.tsx` | Darstellung einer Ortsseite (Server) |
| `app/leistungen/<leistung>/[ort]/page.tsx` (5×) | Route, Metadaten, statische Parameter |
| `app/regionen/page.tsx` + `layout.tsx` | Hub nach Kreis |
| `scripts/orte-index.mjs` | erzeugt `index.ts` |
| `scripts/check-orte.mjs` (+ `.test.mjs`) | Inhaltsprüfung der JSON-Dateien |
| `scripts/pruefe-seo.mjs` (+ `.test.mjs`) | SEO-Prüfung aller HTML-Dateien in `out/` |
| `scripts/server.mjs` | liefert `out/` lokal aus |
| `scripts/pruefe-orte-aehnlichkeit.mjs`, `scripts/quellen-check.mjs` | aus Vault übernommen, angepasst |
| `docs/regionen/*` | Messung, Auswahl, Agentenvorlage, Wellen, QA, Anwaltsfragen |

---

### Task 1: Gemeinsame Nav- und Footer-Komponenten

**Files:**
- Create: `app/components/Nav.tsx`, `app/components/Footer.tsx`
- Modify: `app/page.tsx`, `app/ueber-uns/page.tsx`, `app/impressum/page.tsx`, `app/datenschutz/page.tsx`, `app/fuer-fachbetriebe/page.tsx`, `app/leistungen/{hochbau,tiefbau,bad-sanitaer,innenausbau,renovierung-sanierung}/page.tsx` (jeweils lokale `leistungenItems`, `Nav`, `Footer` entfernen, Import nutzen)

**Interfaces:**
- Produces: `export default function Nav({ aktiv }: { aktiv?: '/ueber-uns' | '/fuer-fachbetriebe' })`, `export default function Footer()`

- [ ] **Step 1: Vorher-Schnappschuss der Links** — `npm run build`, dann für jede HTML-Datei in `out/` die Liste aller `href` in `<nav>` und `<footer>` nach `docs/regionen/links-vorher.json` schreiben:

```bash
node -e "const fs=require('fs'),p=require('path');const r={};(function w(d){for(const f of fs.readdirSync(d)){const x=p.join(d,f);if(fs.statSync(x).isDirectory())w(x);else if(f==='index.html'){const h=fs.readFileSync(x,'utf8');const hrefs=s=>[...(h.match(new RegExp('<'+s+'[\\s\\S]*?</'+s+'>'))||[''])[0].matchAll(/href=\"([^\"]+)\"/g)].map(m=>m[1]);r[x.replace(/\\\\/g,'/')]={nav:hrefs('nav'),footer:hrefs('footer')}}}})('out');fs.mkdirSync('docs/regionen',{recursive:true});fs.writeFileSync('docs/regionen/links-vorher.json',JSON.stringify(r,null,1))"
```

- [ ] **Step 2: Komponenten anlegen** — `Nav.tsx`: Inhalt von `function Nav()` samt `leistungenItems` aus `app/ueber-uns/page.tsx` (Zeilen 20–176) übernehmen, `'use client'`, Imports `motion, AnimatePresence` aus `motion/react`, `useState, useEffect` aus `react`; die Zeile mit `au-nav-active` wird `className={l.href === aktiv ? 'au-nav-active' : ''}`. `Footer.tsx`: `function Footer()` aus `app/impressum/page.tsx` übernehmen (inkl. „Für Fachbetriebe“), `'use client'`. Beide `export default`.

- [ ] **Step 3: Seiten umstellen** — in jeder genannten Seite lokale `leistungenItems`/`Nav`/`Footer` löschen, `import Nav from '../components/Nav'` bzw. `'../../components/Nav'` und `Footer` importieren. `app/ueber-uns/page.tsx` nutzt `<Nav aktiv="/ueber-uns" />`, `app/fuer-fachbetriebe/page.tsx` `<Nav aktiv="/fuer-fachbetriebe" />`. Startseite: Footer-Link `#kontakt` war relativ → in der gemeinsamen Komponente `/#kontakt` (funktioniert auch auf der Startseite).

- [ ] **Step 4: Prüfen** — `npx tsc --noEmit` (keine Fehler), `npm run build`, Link-Schnappschuss erneut nach `docs/regionen/links-nachher.json` (Befehl aus Step 1 mit anderem Dateinamen) und vergleichen:

```bash
node -e "const a=require('./docs/regionen/links-vorher.json'),b=require('./docs/regionen/links-nachher.json');let f=0;for(const k in a){for(const t of ['nav','footer']){const x=new Set(a[k][t].map(h=>h.replace('#kontakt','/#kontakt').replace('//#','/#'))),y=new Set(b[k]?.[t]||[]);for(const h of x)if(!y.has(h)){console.log('FEHLT',k,t,h);f=1}}}process.exit(f)"
```
Expected: Exit 0. Danach Playwright: `/`, `/ueber-uns/`, `/leistungen/hochbau/` bei 1366 px — Nav identisch zu vorher (Screenshot-Vergleich nach Augenmaß).

- [ ] **Step 5: Commit** — `git add app docs/regionen && git commit -m "Nav und Footer als gemeinsame Komponenten"` (+ Co-Authored-By-Zeile).

---

### Task 2: Technische SEO-Grundlage + Prüfskript

**Files:**
- Create: `scripts/pruefe-seo.mjs`, `scripts/pruefe-seo.test.mjs`, `scripts/server.mjs`
- Modify: alle `app/**/layout.tsx` (Canonical), `app/layout.tsx`, `app/sitemap.ts`, `app/leistungen/*/layout.tsx` (Service + BreadcrumbList), `public/` (Bilder), Seiten mit `<img>`/hero

**Interfaces:**
- Produces: `node scripts/pruefe-seo.mjs [ordner=out]` → Exit 1 bei Fehlern; exportiert `pruefeSeite(html, pfad)` → `string[]` (Fehlerliste)

- [ ] **Step 1: Test schreiben** — `scripts/pruefe-seo.test.mjs`:

```js
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { pruefeSeite } from './pruefe-seo.mjs'

const gut = `<html><head><title>T</title><meta name="description" content="D"><link rel="canonical" href="https://www.bodensee-baupartner.de/x/"></head><body><nav><a href="/impressum/">i</a></nav><h1>H</h1><footer><a href="/impressum">I</a><a href="/datenschutz">D</a><a href="/fuer-fachbetriebe">F</a></footer></body></html>`

test('gute Seite ohne Fehler', () => {
  assert.deepEqual(pruefeSeite(gut, '/x/'), [])
})
test('fehlender Canonical', () => {
  assert.ok(pruefeSeite(gut.replace(/<link[^>]+>/, ''), '/x/').some(f => f.includes('Canonical')))
})
test('Canonical auf andere Seite', () => {
  assert.ok(pruefeSeite(gut, '/y/').some(f => f.includes('Canonical')))
})
test('zwei H1', () => {
  assert.ok(pruefeSeite(gut.replace('<h1>H</h1>', '<h1>A</h1><h1>B</h1>'), '/x/').some(f => f.includes('H1')))
})
test('fehlender Pflichtlink im Footer', () => {
  assert.ok(pruefeSeite(gut.replace('<a href="/fuer-fachbetriebe">F</a>', ''), '/x/').some(f => f.includes('fuer-fachbetriebe')))
})
```

- [ ] **Step 2: Test laufen lassen** — `node --test scripts/pruefe-seo.test.mjs` → FAIL (Modul fehlt).

- [ ] **Step 3: Skript schreiben** — `scripts/pruefe-seo.mjs`:

```js
// SEO-Prüfung des statischen Exports: je Seite Title, Description, Canonical (selbst),
// genau eine H1, Pflichtlinks im Footer; seitenübergreifend doppelte Titles/Descriptions.
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
    const rel = '/' + path.relative(ordner, path.dirname(datei)).replace(/\\/g, '/')
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
```

- [ ] **Step 4: Test grün** — `node --test scripts/pruefe-seo.test.mjs` → 5 pass.

- [ ] **Step 5: Ist-Zustand messen** — `npm run build && node scripts/pruefe-seo.mjs` → erwartet: Canonical fehlt auf allen Seiten (Liste speichern in `docs/regionen/seo-vorher.txt`).

- [ ] **Step 6: Canonicals** — `app/layout.tsx` bekommt `alternates: { canonical: '/' }` (gilt für die Startseite, die als Client-Komponente keine eigenen Metadaten exportieren kann). Jede Unterseite überschreibt das in ihrer `layout.tsx` mit `alternates: { canonical: '/<pfad>/' }` (z. B. `'/leistungen/hochbau/'`, `'/ueber-uns/'`, `'/impressum/'`, `'/datenschutz/'`). Impressum/Datenschutz behalten `robots: noindex`. Titles/Descriptions der Leistungsseiten erst in Task 8.

- [ ] **Step 7: Sitemap** — `app/sitemap.ts`: alle URLs mit abschließendem `/` (`${base}/`, `${base}/ueber-uns/` …), `lastModified` fest `new Date('2026-10-02')`; Impressum/Datenschutz entfernen (noindex-Seiten gehören nicht in die Sitemap).

- [ ] **Step 8: Strukturdaten Leistungsseiten** — in jeder `app/leistungen/<x>/layout.tsx` zusätzlich zu `FAQPage` ein `Service`- und ein `BreadcrumbList`-Objekt ausgeben:

```tsx
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: '<Leistungsname>',
  provider: { '@type': 'Organization', name: 'Bodensee BauPartner GbR', url: 'https://www.bodensee-baupartner.de/' },
  areaServed: { '@type': 'State', name: 'Baden-Württemberg' },
  description: '<Meta-Description der Seite>',
}
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Start', item: 'https://www.bodensee-baupartner.de/' },
    { '@type': 'ListItem', position: 2, name: '<Leistungsname>', item: 'https://www.bodensee-baupartner.de/leistungen/<x>/' },
  ],
}
```
Ausgabe wie bestehendes FAQ-Schema per `<script type="application/ld+json" dangerouslySetInnerHTML=…>`. Prüfen, dass die FAQ-Fragen im JSON-LD wortgleich mit den sichtbaren FAQ der `page.tsx` sind (Abweichungen angleichen).

- [ ] **Step 9: Bilder** — `hero.png`/`hero-alt.png` (identisch, 2 MB) per `npx sharp-cli`-freiem Weg konvertieren: `node -e "require('sharp')('public/hero.png').resize({width:1920,withoutEnlargement:true}).webp({quality:78}).toFile('public/hero.webp')"` (sharp ist über Next installiert); alle `src="/hero.png"` und `"/hero-alt.png"` → `"/hero.webp"`; `hero-alt.png`, `hero.png`, `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`, `logo.jpeg` löschen, sofern `grep -r` keine Verwendung mehr findet. Jedes `<img>` mit `width`/`height` und sinnvollem `alt` versehen.

- [ ] **Step 10: Prüfen** — `npm run build && node scripts/pruefe-seo.mjs` → 0 Fehler. `scripts/server.mjs` anlegen (statischer Server für `out/`, Port aus argv, Standard 3417):

```js
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
const port = Number(process.argv[2] ?? 3417), root = path.resolve('out')
const typ = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml', '.txt': 'text/plain', '.xml': 'application/xml', '.ico': 'image/x-icon', '.jpeg': 'image/jpeg', '.woff2': 'font/woff2' }
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0])
  let f = path.join(root, p)
  if (!f.startsWith(root)) { res.writeHead(403); return res.end() }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html')
  if (!fs.existsSync(f)) { res.writeHead(404, { 'content-type': typ['.html'] }); return res.end(fs.existsSync(path.join(root, '404.html')) ? fs.readFileSync(path.join(root, '404.html')) : 'not found') }
  res.writeHead(200, { 'content-type': typ[path.extname(f)] ?? 'application/octet-stream' })
  fs.createReadStream(f).pipe(res)
}).listen(port, () => console.log(`out/ auf http://localhost:${port}`))
```

- [ ] **Step 11: Commit** — `git add -A app public scripts docs && git commit -m "SEO-Grundlage: Canonicals, Sitemap, Strukturdaten, Bilder, Prüfskript"`.

---

### Task 3: Messung mit OpenSEO + Audit + Auswahl

**Files:**
- Create: `app/inhalte/gemeinden-bw.json`, `docs/regionen/messung/*.json` (Rohdaten), `docs/regionen/auswahl.json`, `docs/regionen/regionalplan.md`, `scripts/gemeinden-bw.mjs`

**Interfaces:**
- Produces: `gemeinden-bw.json`: `[{ name: string, slug: string, kreis: string, einwohner: number, lat: number, lon: number }]`; `auswahl.json`: `[{ leistung: LeistungSlug, ort: string /*slug*/, volumen: number, stufe: 'P1'|'P2', begruendung: string }]`

- [ ] **Step 1: Ortsliste** — `scripts/gemeinden-bw.mjs`: Destatis-Gemeindeverzeichnis (`https://www.destatis.de/DE/Themen/Laender-Regionen/Regionales/Gemeindeverzeichnis/Administrativ/Archiv/GVAuszugQ/AuszugGV3QAktuell.xlsx?__blob=publicationFile`) herunterladen nach `docs/regionen/messung/gv.xlsx`, mit `npx xlsx-cli`-freiem Weg lesen (`npm i --no-save xlsx` nur temporär, nicht in package.json), Land = 08, Einwohner ≥ 5.000, Name kürzen (Zusätze „, Stadt“, „am Neckar“ bleiben im Anzeigenamen, Slug ohne „, Stadt“), Kreisname aus der Kreiszeile, Koordinaten aus den Spalten Längengrad/Breitengrad. `slugify`:

```js
export const slugify = (s) => s.toLowerCase()
  .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
  .replace(/\(.*?\)/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
```
Namensdopplungen in BW: Slug + `-` + Kreiskürzel. Test: `node -e "import('./scripts/gemeinden-bw.mjs').then(m=>console.log(m.slugify('Villingen-Schwenningen'),m.slugify('Weil am Rhein'),m.slugify('Überlingen')))"` → `villingen-schwenningen weil-am-rhein ueberlingen`. Ergebnis ~400 Orte in `app/inhalte/gemeinden-bw.json`.

- [ ] **Step 2: OpenSEO-Projekt** — `whoami` (Credits notieren), `create_project` „Bodensee BauPartner – bodensee-baupartner.de“, Domain `bodensee-baupartner.de`, Location Deutschland (2276), Sprache de. Projekt-ID in `docs/regionen/regionalplan.md` notieren.

- [ ] **Step 3: Kostentest** — `get_keyword_metrics` für die 10 größten Orte × 11 Begriffe (Tabelle Spec §4), ohne Trends. `whoami` danach; Kosten je Begriff ausrechnen und notieren. Hochrechnung für alle Orte; liegt sie > 1.000 Credits, Zweitbegriffe (badrenovierung, altbausanierung, haussanierung, hausbau, erdarbeiten, trockenbau) nur für Orte ≥ 20.000 EW.

- [ ] **Step 4: Vollmessung** — Pakete ≤ 700 Begriffe, Rohantworten unverändert als `docs/regionen/messung/keywords-<nr>.json`. Credits je Paket notieren.

- [ ] **Step 5: SERP-Stichproben** — `get_serp_results` (Tiefe 10, lokal per `search_serp_locations`) für Hauptbegriff jeder Leistung in den 8 größten Orten (= 40 Abfragen) + 10 Kleinstädte 5–15k EW je Leistung mit Volumen knapp unter Schwelle. Notieren: Local Pack ja/nein, Portale/Vermittler mit Stadtseiten ja/nein, Absicht. Rohdaten `docs/regionen/messung/serp-*.json`.

- [ ] **Step 6: Audit + Wettbewerb** — `run_site_audit` für `https://www.bodensee-baupartner.de/` (Status mit `get_audit_status`, Befunde `get_audit_issues` → `docs/regionen/audit-live.json`); `get_domain_overview` + `get_ranked_keywords` für die Domain; SERP für „badsanierung bodensee“, „bauunternehmen bodensee“, „handwerker überlingen“, „sanierung friedrichshafen“, „tiefbau bodenseekreis“, „innenausbau konstanz“ → Wettbewerber und Inhaltslücken in `regionalplan.md`.

- [ ] **Step 7: Auswahl** — Skript-freie Auswertung per `node -e` aus den Rohdaten: Volumen je Leistung×Ort = Summe der Begriffe. Schwellen festlegen (Startwerte Bad 20, Sanierung 20, Hochbau 30, Tiefbau 20, Innenausbau 20; nach Verteilung und SERP-Absicht anheben, Qualität vor Menge). P2 nur mit Local Pack **und** rankenden Stadtseiten von Portalen. Navigationale Treffer (Firmenname im Ortsnamen) streichen. Ergebnis `docs/regionen/auswahl.json`, Begründung je Schwelle in `regionalplan.md`, Credits gesamt. Kopie der Rohdaten in Vault `MAAS Vermittlungen/Regionalplan/bodensee-baupartner.de/rohdaten/` und `Downloads/Bodensee BauPartner/02-keyword-seo/2026-10-02-ortsseiten-bw/`.

- [ ] **Step 8: Commit** — `git add app/inhalte/gemeinden-bw.json docs scripts && git commit -m "Messung Ortsseiten BW: Ortsliste, Keyword- und SERP-Daten, Auswahl"`.

---

### Task 4: Datenmodell, Index-Generator, Inhaltsprüfung

**Files:**
- Create: `app/inhalte/leistungen.ts`, `app/inhalte/orte.ts`, `scripts/orte-index.mjs`, `scripts/check-orte.mjs`, `scripts/check-orte.test.mjs`, `app/inhalte/orte/.gitkeep`

**Interfaces:**
- Produces:

```ts
// app/inhalte/leistungen.ts
export type LeistungSlug = 'hochbau' | 'tiefbau' | 'bad-sanitaer' | 'innenausbau' | 'renovierung-sanierung'
export type Leistung = { slug: LeistungSlug; name: string; chip: string; ortsTitel: (ort: string) => string }
export const LEISTUNGEN: Record<LeistungSlug, Leistung>
// app/inhalte/orte.ts
export type Fakt = { text: string; quelle: string; url: string; abruf: string }
export type Ortsseite = {
  leistung: LeistungSlug; ort: string; ortName: string; kreis: string
  title: string; description: string; h1: string; einstieg: string
  abschnitte: { h2: string; text: string }[]; fakten: Fakt[]; faq: { q: string; a: string }[]
  offen: string[]
}
export function seitenFuer(leistung: LeistungSlug): Ortsseite[]
export function seite(leistung: LeistungSlug, ort: string): Ortsseite | undefined
export function nachbarn(s: Ortsseite, n?: number): Ortsseite[]   // gleiche Leistung, nächste per Koordinaten
export function andereLeistungen(s: Ortsseite): Ortsseite[]          // gleicher Ort
export function pfad(s: Ortsseite): string                            // `/leistungen/${leistung}/${ort}/`
```

- [ ] **Step 1: `leistungen.ts`** schreiben:

```ts
export type LeistungSlug = 'hochbau' | 'tiefbau' | 'bad-sanitaer' | 'innenausbau' | 'renovierung-sanierung'
export type Leistung = { slug: LeistungSlug; name: string; chip: string; ortsTitel: (ort: string) => string }

export const LEISTUNGEN: Record<LeistungSlug, Leistung> = {
  'hochbau': { slug: 'hochbau', name: 'Hochbau', chip: 'Hochbau / Rohbau', ortsTitel: o => `Bauunternehmen in ${o}` },
  'tiefbau': { slug: 'tiefbau', name: 'Tiefbau', chip: 'Tiefbau', ortsTitel: o => `Tiefbau in ${o}` },
  'bad-sanitaer': { slug: 'bad-sanitaer', name: 'Bad & Sanitär', chip: 'Bad & Sanitär', ortsTitel: o => `Badsanierung in ${o}` },
  'innenausbau': { slug: 'innenausbau', name: 'Innenausbau', chip: 'Innenausbau', ortsTitel: o => `Innenausbau in ${o}` },
  'renovierung-sanierung': { slug: 'renovierung-sanierung', name: 'Renovierung & Sanierung', chip: 'Renovierung & Sanierung', ortsTitel: o => `Sanierung in ${o}` },
}
export const LEISTUNG_SLUGS = Object.keys(LEISTUNGEN) as LeistungSlug[]
```
(`chip` muss exakt einem Eintrag in `projektTypen` in `app/page.tsx` entsprechen.)

- [ ] **Step 2: Test für `check-orte`** — `scripts/check-orte.test.mjs`:

```js
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { pruefeSeiten } from './check-orte.mjs'

const fakt = (i) => ({ text: `Fakt ${i} über die Entwässerungssatzung mit eigenem Inhalt ${i}`, quelle: 'Stadt', url: `https://stadt.de/${i}`, abruf: '2026-10-02' })
const basis = (ort, extra = '') => ({
  leistung: 'tiefbau', ort, ortName: ort, kreis: 'K', title: `Tiefbau in ${ort} – T`, description: `D ${ort}`, h1: `Tiefbau in ${ort}`,
  einstieg: `Einstieg ${ort} ${extra} `.repeat(30), abschnitte: [{ h2: 'A', text: `Text ${ort} ${extra} `.repeat(60) }],
  fakten: [1, 2, 3, 4, 5].map(fakt), faq: [1, 2, 3].map(i => ({ q: `F${i} ${ort}?`, a: `A${i} ${extra}` })), offen: [],
})

test('gültige Seite', () => {
  assert.deepEqual(pruefeSeiten([basis('a', 'alpha')]).fehler, [])
})
test('weniger als 5 Fakten', () => {
  const s = basis('a'); s.fakten = s.fakten.slice(0, 4)
  assert.ok(pruefeSeiten([s]).fehler.some(f => f.includes('Fakten')))
})
test('Fakt ohne URL', () => {
  const s = basis('a'); s.fakten[0].url = ''
  assert.ok(pruefeSeiten([s]).fehler.some(f => f.includes('URL')))
})
test('verbotenes Wort', () => {
  const s = basis('a'); s.einstieg += ' unsere geprüften Partnerbetriebe vor Ort'
  assert.ok(pruefeSeiten([s]).fehler.some(f => f.includes('verboten')))
})
test('doppelter Title', () => {
  const a = basis('a', 'eins'), b = basis('b', 'zwei'); b.title = a.title
  assert.ok(pruefeSeiten([a, b]).fehler.some(f => f.includes('Title')))
})
test('zu ähnlich', () => {
  assert.ok(pruefeSeiten([basis('a', 'gleich'), basis('b', 'gleich')]).fehler.some(f => f.includes('Gleichheit')))
})
```

- [ ] **Step 3: Test rot** — `node --test scripts/check-orte.test.mjs` → FAIL (Modul fehlt).

- [ ] **Step 4: `check-orte.mjs`** schreiben:

```js
// Inhaltsprüfung der Ortsseiten (JSON). Aufruf: node scripts/check-orte.mjs → Exit 1 bei Fehlern.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const VERBOTEN = [
  /geprüft/i, /zertifiziert/i, /\bbeste[nrs]?\b/i, /perfekt/i, /garant/i, /24\s*\/\s*7|rund um die uhr|24[- ]?stunden/i,
  /notdienst/i, /partnerbetrieb/i, /unser(e|em|en)? (netzwerk|partner)/i, /vor ort ansässig/i, /niederlassung/i,
  /bewertung/i, /sterne/i, /zufriedene kunden/i, /bußgeld/i, /provision/i, /innerhalb von \d+ (stunden|tagen)/i,
]
const woerter = (s) => s.toLowerCase().replace(/[^a-zäöüß0-9 ]+/g, ' ').split(/\s+/).filter(Boolean)
const text = (s) => [s.einstieg, ...s.abschnitte.map(a => a.h2 + ' ' + a.text), ...s.fakten.map(f => f.text), ...s.faq.map(f => f.q + ' ' + f.a)].join(' ')
const gramme = (s) => {
  const w = woerter(text(s).replaceAll(s.ortName, 'ORT'))
  const g = new Set(); for (let i = 0; i + 5 <= w.length; i++) g.add(w.slice(i, i + 5).join(' ')); return g
}

export function pruefeSeiten(seiten) {
  const fehler = [], warnungen = []
  const titles = new Map(), h1s = new Map()
  for (const s of seiten) {
    const id = `${s.leistung}/${s.ort}`
    if (!Array.isArray(s.fakten) || s.fakten.length < 5) fehler.push(`${id}: nur ${s.fakten?.length ?? 0} Fakten (min. 5)`)
    for (const f of s.fakten ?? []) if (!/^https?:\/\//.test(f.url ?? '')) fehler.push(`${id}: Fakt ohne URL: ${f.text.slice(0, 50)}`)
    if (!(s.faq?.length >= 3 && s.faq.length <= 5)) fehler.push(`${id}: ${s.faq?.length ?? 0} FAQ (3–5)`)
    const n = woerter(text(s)).length
    if (n < 300) fehler.push(`${id}: nur ${n} Wörter (min. 300)`)
    if (n > 900) warnungen.push(`${id}: ${n} Wörter`)
    for (const r of VERBOTEN) if (r.test(text(s) + ' ' + s.title + ' ' + s.description)) fehler.push(`${id}: verbotenes Muster ${r}`)
    for (const [m, k] of [[titles, 'Title'], [h1s, 'H1']]) {
      const v = k === 'Title' ? s.title : s.h1
      if (m.has(v)) fehler.push(`${id}: doppelter ${k} mit ${m.get(v)}`); else m.set(v, id)
    }
    if ((s.description ?? '').length > 160) warnungen.push(`${id}: Description ${s.description.length} Zeichen`)
  }
  const g = seiten.map(gramme)
  let max = 0
  for (let i = 0; i < seiten.length; i++) for (let j = i + 1; j < seiten.length; j++) {
    const a = g[i], b = g[j]; let gem = 0; for (const x of a) if (b.has(x)) gem++
    const q = gem / Math.max(1, Math.min(a.size, b.size)); max = Math.max(max, q)
    const paar = `${seiten[i].leistung}/${seiten[i].ort} ↔ ${seiten[j].leistung}/${seiten[j].ort}`
    if (q > 0.7) fehler.push(`Gleichheit ${(q * 100).toFixed(1)} %: ${paar}`)
    else if (q > 0.2) warnungen.push(`Gleichheit ${(q * 100).toFixed(1)} %: ${paar}`)
  }
  return { fehler, warnungen, max }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const ordner = path.join(import.meta.dirname, '..', 'app', 'inhalte', 'orte')
  const seiten = fs.readdirSync(ordner).filter(d => d.endsWith('.json')).map(d => JSON.parse(fs.readFileSync(path.join(ordner, d), 'utf8')))
  const { fehler, warnungen, max } = pruefeSeiten(seiten)
  warnungen.forEach(w => console.log('WARNUNG', w)); fehler.forEach(f => console.log('FEHLER', f))
  console.log(`${seiten.length} Seiten, höchste Gleichheit ${(max * 100).toFixed(1)} %, ${fehler.length} Fehler, ${warnungen.length} Warnungen`)
  process.exit(fehler.length ? 1 : 0)
}
```

- [ ] **Step 5: Test grün** — `node --test scripts/check-orte.test.mjs` → 6 pass.

- [ ] **Step 6: `orte-index.mjs`** schreiben:

```js
// Erzeugt app/inhalte/orte/index.ts aus allen JSON-Dateien des Ordners.
import fs from 'node:fs'
import path from 'node:path'
const ordner = path.join(import.meta.dirname, '..', 'app', 'inhalte', 'orte')
const dateien = fs.readdirSync(ordner).filter(d => d.endsWith('.json')).sort()
const zeilen = dateien.map((d, i) => `import s${i} from './${d}'`)
fs.writeFileSync(path.join(ordner, 'index.ts'),
  `// generiert von scripts/orte-index.mjs — nicht von Hand ändern\nimport type { Ortsseite } from '../orte'\n${zeilen.join('\n')}\n\nexport const ORTSSEITEN = [${dateien.map((_, i) => `s${i}`).join(', ')}] as Ortsseite[]\n`)
console.log(`${dateien.length} Ortsseiten im Index`)
```
`tsconfig.json`: `"resolveJsonModule": true` prüfen (Next-Standard ja).

- [ ] **Step 7: `orte.ts`** schreiben:

```ts
import { ORTSSEITEN } from './orte/index'
import GEMEINDEN from './gemeinden-bw.json'
import type { LeistungSlug } from './leistungen'

export type Fakt = { text: string; quelle: string; url: string; abruf: string }
export type Ortsseite = {
  leistung: LeistungSlug; ort: string; ortName: string; kreis: string
  title: string; description: string; h1: string; einstieg: string
  abschnitte: { h2: string; text: string }[]; fakten: Fakt[]; faq: { q: string; a: string }[]
  offen: string[]
}
type Gemeinde = { name: string; slug: string; kreis: string; einwohner: number; lat: number; lon: number }
const geo = new Map((GEMEINDEN as Gemeinde[]).map(g => [g.slug, g]))

export const pfad = (s: Ortsseite) => `/leistungen/${s.leistung}/${s.ort}/`
export const seitenFuer = (l: LeistungSlug) => ORTSSEITEN.filter(s => s.leistung === l)
export const seite = (l: LeistungSlug, ort: string) => ORTSSEITEN.find(s => s.leistung === l && s.ort === ort)
export const andereLeistungen = (s: Ortsseite) => ORTSSEITEN.filter(x => x.ort === s.ort && x.leistung !== s.leistung)

function km(a: Gemeinde, b: Gemeinde) {
  const r = Math.PI / 180, x = (b.lon - a.lon) * r * Math.cos(((a.lat + b.lat) / 2) * r), y = (b.lat - a.lat) * r
  return Math.sqrt(x * x + y * y) * 6371
}
export function nachbarn(s: Ortsseite, n = 3): Ortsseite[] {
  const g = geo.get(s.ort)
  const andere = seitenFuer(s.leistung).filter(x => x.ort !== s.ort)
  if (!g) return andere.slice(0, n)
  return andere
    .map(x => ({ x, d: geo.get(x.ort) ? km(g, geo.get(x.ort)!) : 1e9 }))
    .sort((a, b) => a.d - b.d).slice(0, n).map(v => v.x)
}
```

- [ ] **Step 8: Leerer Index baut** — `node scripts/orte-index.mjs` (0 Seiten), `npx tsc --noEmit` → keine Fehler.

- [ ] **Step 9: Commit** — `git add app/inhalte scripts && git commit -m "Datenmodell und Prüfskripte für Ortsseiten"`.

---

### Task 5: Route, Ortsseiten-Darstellung, Hub, Verlinkung, Formular-Vorbelegung

**Files:**
- Create: `app/components/OrtSeite.tsx`, `app/leistungen/<x>/[ort]/page.tsx` (5×), `app/regionen/page.tsx`, `app/regionen/layout.tsx`, `app/inhalte/orte/tiefbau--beispielstadt.json` (nur Testfixture, wird in Step 9 wieder gelöscht)
- Modify: `app/globals.css` (Block `/* ─── Ortsseiten ─── */`), `app/components/Footer.tsx` (Link „Leistungen nach Ort“), `app/leistungen/<x>/page.tsx` (Abschnitt „nach Ort“), `app/page.tsx` (Vorbelegung), `app/sitemap.ts`

**Interfaces:**
- Consumes: `Ortsseite`, `seitenFuer`, `seite`, `nachbarn`, `andereLeistungen`, `pfad` (Task 4), `LEISTUNGEN` (Task 4), `Nav`, `Footer` (Task 1)
- Produces: `export default function OrtSeite({ s }: { s: Ortsseite })`

- [ ] **Step 1: Fixture** — eine gültige Beispielseite `tiefbau--beispielstadt.json` (Schema Task 4, `ort: "beispielstadt"`, 5 Fakten mit `https://example.org/…`, 3 FAQ, ≥ 300 Wörter) anlegen, `node scripts/orte-index.mjs`, `node scripts/check-orte.mjs` → 0 Fehler.

- [ ] **Step 2: Route je Leistung** — `app/leistungen/tiefbau/[ort]/page.tsx` (für die anderen vier identisch, nur `L` ändert sich):

```tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import OrtSeite from '../../../components/OrtSeite'
import { seite, seitenFuer, pfad } from '../../../inhalte/orte'

const L = 'tiefbau' as const
export const dynamicParams = false

export function generateStaticParams() {
  return seitenFuer(L).map(s => ({ ort: s.ort }))
}

export async function generateMetadata({ params }: { params: Promise<{ ort: string }> }): Promise<Metadata> {
  const { ort } = await params
  const s = seite(L, ort)
  if (!s) return {}
  return {
    title: s.title,
    description: s.description,
    alternates: { canonical: pfad(s) },
    openGraph: { title: s.title, description: s.description, locale: 'de_DE', type: 'website' },
  }
}

export default async function Page({ params }: { params: Promise<{ ort: string }> }) {
  const { ort } = await params
  const s = seite(L, ort)
  if (!s) notFound()
  return <OrtSeite s={s} />
}
```
Hinweis: Leistung ohne Seiten → `generateStaticParams` liefert `[]`; mit `output: 'export'` muss dann ein Platzhalter vermieden werden: Ordner `[ort]` nur für Leistungen anlegen, die in `auswahl.json` Seiten haben. Test: Build mit Fixture erzeugt `out/leistungen/tiefbau/beispielstadt/index.html`.

- [ ] **Step 3: `OrtSeite.tsx`** (Server-Komponente, nutzt Client-Komponenten Nav/Footer):

```tsx
import Nav from './Nav'
import Footer from './Footer'
import { LEISTUNGEN } from '../inhalte/leistungen'
import { nachbarn, andereLeistungen, pfad, type Ortsseite } from '../inhalte/orte'

const BASIS = 'https://www.bodensee-baupartner.de'

export default function OrtSeite({ s }: { s: Ortsseite }) {
  const l = LEISTUNGEN[s.leistung]
  const anfrage = `/?leistung=${encodeURIComponent(s.leistung)}&ort=${encodeURIComponent(s.ortName)}#kontakt`
  const jsonLd = [
    { '@context': 'https://schema.org', '@type': 'Service', serviceType: l.name, name: s.h1, description: s.description,
      provider: { '@type': 'Organization', name: 'Bodensee BauPartner GbR', url: `${BASIS}/` },
      areaServed: { '@type': 'City', name: s.ortName } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Start', item: `${BASIS}/` },
      { '@type': 'ListItem', position: 2, name: l.name, item: `${BASIS}/leistungen/${s.leistung}/` },
      { '@type': 'ListItem', position: 3, name: s.ortName, item: `${BASIS}${pfad(s)}` } ] },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: s.faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
  ]
  return (
    <>
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="ort-section">
        <div className="wrap ort-inner">
          <nav className="ort-crumbs" aria-label="Brotkrume">
            <a href="/">Start</a> › <a href={`/leistungen/${s.leistung}/`}>{l.name}</a> › <span>{s.ortName}</span>
          </nav>
          <div className="eyebrow"><span className="bullet" /> {l.name} · {s.kreis}</div>
          <h1 className="ort-h1">{s.h1}</h1>
          <p className="ort-lead">{s.einstieg}</p>
          <a className="btn btn-primary" href={anfrage}>Anfrage kostenlos stellen</a>

          {s.abschnitte.map(a => (
            <section key={a.h2} className="ort-block"><h2>{a.h2}</h2><p>{a.text}</p></section>
          ))}

          <section className="ort-block">
            <h2>Gut zu wissen für {s.ortName}</h2>
            <ul className="ort-fakten">
              {s.fakten.map((f, i) => <li key={i}>{f.text} <a href={f.url} rel="nofollow noopener" target="_blank">{f.quelle}</a></li>)}
            </ul>
          </section>

          <section className="ort-block">
            <h2>Häufige Fragen</h2>
            {s.faq.map(f => (
              <details key={f.q} className="faq-item"><summary className="faq-q">{f.q}</summary><div className="faq-a"><p>{f.a}</p></div></details>
            ))}
          </section>

          <section className="ort-block ort-cta">
            <h2>Ihr Vorhaben in {s.ortName}</h2>
            <p>Für Sie ist unser Service kostenlos und unverbindlich. Die Kosten tragen die Fachbetriebe.</p>
            <a className="btn btn-primary" href={anfrage}>Anfrage kostenlos stellen</a>
          </section>

          <section className="ort-block ort-links">
            <h2>Weitere Orte und Leistungen</h2>
            <ul>
              {nachbarn(s).map(n => <li key={n.ort}><a href={pfad(n)}>{n.h1}</a></li>)}
              {andereLeistungen(s).map(n => <li key={n.leistung}><a href={pfad(n)}>{n.h1}</a></li>)}
              <li><a href={`/leistungen/${s.leistung}/`}>{l.name} – Überblick</a></li>
              <li><a href="/regionen/">Alle Orte</a></li>
            </ul>
          </section>

          <section className="ort-block ort-quellen">
            <h2>Quellen</h2>
            <ul>{s.fakten.map((f, i) => <li key={i}>{f.quelle}, abgerufen am {f.abruf.split('-').reverse().join('.')}</li>)}</ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
```
CSS-Block in `globals.css` anhängen (Stil wie `.fb-*`):

```css
/* ─── Ortsseiten ─────────────────────────────────────────────────────────── */
.ort-section { padding: 140px 0 90px; background: var(--paper); }
.ort-inner { max-width: 860px; }
.ort-crumbs { font-size: 13px; color: var(--ink-3); margin-bottom: 20px; }
.ort-crumbs a { color: var(--ink-2); text-decoration: underline; }
.ort-h1 { font-size: clamp(32px, 4vw, 52px); margin: 16px 0 20px; }
.ort-lead { font-size: 18px; color: var(--ink-2); line-height: 1.65; margin-bottom: 28px; }
.ort-block { margin-top: 48px; }
.ort-block h2 { font-size: clamp(22px, 2.4vw, 30px); margin-bottom: 14px; }
.ort-block p { font-size: 16px; color: var(--ink-2); line-height: 1.75; }
.ort-fakten { display: flex; flex-direction: column; gap: 10px; padding-left: 18px; color: var(--ink-2); line-height: 1.65; }
.ort-fakten a, .ort-links a { color: var(--primary); text-decoration: underline; }
.ort-cta { background: #fff; border: 1px solid var(--line); border-radius: var(--radius); padding: 28px; }
.ort-cta p { margin-bottom: 18px; }
.ort-links ul { list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 8px 24px; }
.ort-quellen ul { font-size: 13px; color: var(--ink-3); padding-left: 18px; line-height: 1.7; }
details.faq-item summary { list-style: none; }
details.faq-item summary::-webkit-details-marker { display: none; }
@media (max-width: 768px) { .ort-section { padding: 110px 0 60px; } .ort-links ul { grid-template-columns: 1fr; } }
```

- [ ] **Step 4: Hub `/regionen/`** — `app/regionen/layout.tsx` mit Metadaten (`title: 'Leistungen nach Ort – Baden-Württemberg | Bodensee BauPartner'`, eigene Description, `alternates: { canonical: '/regionen/' }`), `app/regionen/page.tsx`: Server-Komponente, `Nav` + `Footer`, H1 „Leistungen nach Ort in Baden-Württemberg“, kurzer Einleitungssatz, danach je Kreis (alphabetisch) eine `<section>` mit `<h2>{kreis}</h2>` und Liste „Ort: Leistung, Leistung“ mit Links (`pfad(s)`), gruppiert über `ORTSSEITEN`. Anker je Leistung nicht nötig.

- [ ] **Step 5: Verlinkung** — `Footer.tsx`: unter „Für Fachbetriebe“ `<a href="/regionen/">Leistungen nach Ort</a>`. Jede Leistungsseite: vor der FAQ ein Abschnitt (bestehende Klassen `seo-section`/`seo-block` wiederverwenden) „{Leistung} nach Ort“ mit Links zu den bis zu 12 einwohnerstärksten Ortsseiten dieser Leistung + Link „Alle Orte“ → `/regionen/`. Umsetzung als Komponente `app/components/OrteDerLeistung.tsx` (`{ leistung }: { leistung: LeistungSlug }`) ohne Server-only-APIs; sie importiert `seitenFuer` aus dem reinen Datenmodul und funktioniert daher auch in den Client-Leistungsseiten. Sortierung nach Einwohnern über `gemeinden-bw.json`. In jede Leistungs-`page.tsx` direkt vor `<FAQ />` einsetzen; rendert nichts, wenn die Leistung keine Ortsseiten hat.

- [ ] **Step 6: Sitemap** — `app/sitemap.ts`: `/regionen/` + alle `ORTSSEITEN` (`priority: 0.6`, `changeFrequency: 'yearly'`).

- [ ] **Step 7: Formular-Vorbelegung (Test zuerst im Browser-Skript)** — in `Kontakt()` (`app/page.tsx`) nach den `useState`:

```tsx
useEffect(() => {
  const p = new URLSearchParams(window.location.search)
  const l = p.get('leistung'), o = p.get('ort')
  const chip = l && (LEISTUNGEN as Record<string, { chip: string }>)[l]?.chip
  if (chip && projektTypen.includes(chip)) setSelected([chip])
  if (o) setOrt(o.slice(0, 60))
}, [])
```
Import `LEISTUNGEN` aus `./inhalte/leistungen`. Prüfen per Playwright: `/?leistung=tiefbau&ort=%C3%9Cberlingen#kontakt` → Chip „Tiefbau“ ausgewählt, in Schritt 2 Ort „Überlingen“; `/?leistung=quatsch&ort=X#kontakt` → kein Chip, kein Konsolenfehler.

- [ ] **Step 8: Gesamtprüfung mit Fixture** — `npm run build`, `node scripts/pruefe-seo.mjs` → 0 Fehler (inkl. Ortsseite + Hub), Playwright 390/1366 px auf `/leistungen/tiefbau/beispielstadt/` und `/regionen/`.

- [ ] **Step 9: Fixture entfernen + Commit** — Fixture löschen, `node scripts/orte-index.mjs`, Ordner `[ort]` nur für Leistungen mit Auswahl behalten (bis Task 6 alle fünf behalten, aber Build erst nach Inhalten), `git add -A && git commit -m "Ortsseiten: Route, Darstellung, Hub, Verlinkung, Formular-Vorbelegung"`.

---

### Task 6: Inhalte durch Agenten

**Files:**
- Create: `docs/regionen/agentenvorlage.md`, `docs/regionen/wellen/<gruppe>.json`, `docs/regionen/anwaltsfragen/<gruppe>.md`, `app/inhalte/orte/<leistung>--<ort>.json` (alle ausgewählten)

**Interfaces:**
- Consumes: `docs/regionen/auswahl.json` (Task 3), Schema `Ortsseite` (Task 4), `scripts/check-orte.mjs`

- [ ] **Step 1: Gruppen** — `auswahl.json` nach Kreis gruppieren, Gruppen 6–14 Seiten (kleine Nachbarkreise zusammenlegen), je Gruppe `docs/regionen/wellen/<nr>-<kreis>.json` = Liste `{ leistung, ort, ortName, kreis, volumen }`.

- [ ] **Step 2: Agentenvorlage** — `docs/regionen/agentenvorlage.md` vollständig schreiben (vor dem ersten Start, danach nicht ändern). Inhalt:
  1. Rolle: Recherche + Text für Ortsseiten von Bodensee BauPartner GbR (regionaler **Vermittler**, führt nichts selbst aus, kostenlos für Kunden, „Die Kosten tragen die Fachbetriebe.“, eine Anfrage → ein passender Fachbetrieb).
  2. Eingabe: Gruppendatei-Pfad; nur diese Seiten anlegen.
  3. Ausgabe: je Seite sofort `app/inhalte/orte/<leistung>--<ort>.json` nach Schema (Feldliste aus Task 4 wörtlich), `title` ≤ 60 Zeichen nach Muster „<ortsTitel> – kostenlos vermittelt“ (Varianten erlaubt, nie doppelt), `description` 140–160 Zeichen, `h1` = `ortsTitel(ortName)`.
  4. Leistungsbezogene Quellenarten (Liste aus Spec §7 wörtlich) — mindestens 5 Fakten, nur amtliche/zuständige Stellen (Stadt, Landratsamt, LUBW, LGRB, Regierungspräsidium, Wasserversorger, Energieagentur, Landesamt für Denkmalpflege), jede mit URL + Abrufdatum 2026-10-xx.
  5. Text: 300–600 Wörter, Einstieg mit Lage/Bedürfnis des Besuchers (nicht mit „Wir“), 2–3 Abschnitte mit eigenem Ortsbezug, 3–5 FAQ ohne offensichtliche Antworten, „in der Regel“/„grundsätzlich“ bei Einzelfallfragen.
  6. Verbotsliste (Global Constraints wörtlich) + HWK-Freiburg-Hinweis (PM 53/26, § 5 UWG): nie behaupten, wir hätten Betriebe im Ort.
  7. Recherche: keine WebSearch; Stadt-Sitemaps, WebFetch, `curl -A "Mozilla/5.0"`, eigenes Playwright-Skript; polizei-bw.de blockt.
  8. Unsicheres → `offen`; Rechtsfragen → `docs/regionen/anwaltsfragen/<gruppe>.md` (Seite, Textstelle, Frage).
  9. Abschluss: `node scripts/check-orte.mjs` für die eigenen Dateien grün; Rückmeldung: Liste der Seiten, nicht angelegte Seiten mit Grund, Unsicherheiten.
  10. Keine Unteragenten, keine Dateien außerhalb der eigenen JSON + Anwaltsfrage-Datei, kein Commit.

- [ ] **Step 3: Probelauf** — eine Gruppe mit 1 Agent; Ergebnis selbst prüfen (Fakten an Quelle stichprobenartig öffnen, Ton, Verbote). Vorlage nur jetzt noch korrigieren.

- [ ] **Step 4: Alle Gruppen** — max. 8 Agenten parallel (`Agent`, `subagent_type: general-purpose`, Prompt = Vorlage + Gruppendatei), nächste Gruppe erst nach Rückmeldung. Nach jeder Rückmeldung: gemeldete Unsicherheiten prüfen, `node scripts/check-orte.mjs`; Zwischencommit je 3 Gruppen (`git add app/inhalte/orte docs/regionen && git commit -m "Ortsseiten: Gruppen …"`).

- [ ] **Step 5: Pause-Fall** — Wochenlimit/Abbruch: Agenten per `SendMessage` stoppen, je Gruppe `docs/regionen/pause/<gruppe>.md`, Commit, `docs/regionen/FORTSETZUNG.md` schreiben.

- [ ] **Step 6: Index + Prüfung** — `node scripts/orte-index.mjs`, `node scripts/check-orte.mjs` → 0 Fehler; `[ort]`-Ordner für Leistungen ohne Seiten löschen.

---

### Task 7: Endkontrolle Ortsseiten

**Files:**
- Create: `scripts/pruefe-orte-aehnlichkeit.mjs`, `scripts/quellen-check.mjs`, `docs/regionen/qa-liste.md`

- [ ] **Step 1: Skripte aus Vault** — Codeblock aus `Downloads/MMME/MAAS Vermittlungen/Regionalplan/Werkzeuge Ortsunterseiten/pruefe-orte-aehnlichkeit.mjs.md` nach `scripts/pruefe-orte-aehnlichkeit.mjs` kopieren; anpassen: `ordner` → `path.join(import.meta.dirname, '..', 'app', 'inhalte', 'orte')`, Pfad je Seite `` `/leistungen/${o.leistung}/${o.ort}/` `` statt `o.pfad`, Ortsname-Neutralisierung über `o.ortName`. Ebenso `quellen-check.mjs.md` → `scripts/quellen-check.mjs` (liest `fakten[].url`).

- [ ] **Step 2: QA-Runde** — `docs/regionen/qa-liste.md` aus Vault-Notiz `QA-Liste.md` übernehmen und um BBP-Verbote ergänzen; 3 QA-Agenten (Orte a–f, g–o, p–z) prüfen nach Liste und korrigieren direkt in den JSON-Dateien; danach `node scripts/check-orte.mjs` → 0 Fehler.

- [ ] **Step 3: Build + Prüfkette** —
```bash
node scripts/orte-index.mjs && node scripts/check-orte.mjs && npx tsc --noEmit && npm run build && node scripts/pruefe-seo.mjs
node scripts/server.mjs 3417   # im Hintergrund, eigener frischer Server
node scripts/pruefe-orte-aehnlichkeit.mjs http://localhost:3417
node scripts/quellen-check.mjs
```
Expected: alle Exit 0 (Quellen: 403 bei Bot-Sperre zulässig, 404 → Fakt ersetzen oder Seite entfernen).

- [ ] **Step 4: Browser** — Playwright 390/1366 px: je Leistung 2 Ortsseiten, `/regionen/`, alle bestehenden Seiten; kein horizontales Scrollen, keine Konsolenfehler, Formular-Vorbelegung von einer Ortsseite aus.

- [ ] **Step 5: Commit** — `git add -A && git commit -m "Ortsseiten: Endkontrolle, Ähnlichkeits- und Quellenprüfung"`.

---

### Task 8: Inhaltlicher SEO-Ausbau der bestehenden Seiten

**Files:**
- Modify: `app/leistungen/*/page.tsx`, `app/leistungen/*/layout.tsx`, `app/layout.tsx`, `app/ueber-uns/layout.tsx`, ggf. `app/page.tsx` (nur Metadaten/Technik)

- [ ] **Step 1: Ziel-Suchbegriffe je Seite** aus Task-3-Daten (`docs/regionen/regionalplan.md`) festlegen: eine Primärquery je Leistungsseite (Bodensee-Bezug, z. B. „Badsanierung Bodensee“), 3–6 Nebenqueries; Kannibalisierung mit Ortsseiten vermeiden (Leistungsseite = Region, Ortsseite = Ort).

- [ ] **Step 2: Metadaten** — Title ≤ 60 Zeichen mit Primärquery vorn, Description 140–160 Zeichen mit Nutzen + „kostenlos“; OG-Titel/-Beschreibung angleichen.

- [ ] **Step 3: Texte ergänzen** — je Leistungsseite: Abschnitt zu typischem Ablauf/Kostenrahmen (Spannen nur „in der Regel“, mit Quelle oder ohne Zahl), Abschnitt zu Fragen aus der Suchnachfrage (Nebenqueries), FAQ auf 6–8 Fragen ohne Banales; sichtbare FAQ und `FAQPage`-JSON-LD wortgleich. Design-Komponenten der Seite wiederverwenden, keine neuen Layouts. Verbotsliste beachten.

- [ ] **Step 4: Audit-Befunde** — jeden Befund aus `docs/regionen/audit-live.json` abarbeiten oder in `regionalplan.md` begründet zurückstellen.

- [ ] **Step 5: Prüfen + Commit** — `npm run build && node scripts/pruefe-seo.mjs && node scripts/check-orte.mjs`, Playwright-Stichprobe, `git commit -m "SEO-Ausbau der Leistungsseiten"`.

---

### Task 9: Dokumentation und Abschluss

**Files:**
- Create: Vault `MAAS Vermittlungen/Regionalplan/bodensee-baupartner.de/Regionalplan bodensee-baupartner.de 2026-10-02.md`, `…/Baubericht bodensee-baupartner.de 2026-10-02.md`, `…/orte.csv`, `…/rohdaten/*`, Vault-Notiz „Anwaltsfeedback Bodensee BauPartner Ortsseiten — Umsetzung 2026-10-xx“; `Downloads/Bodensee BauPartner/02-keyword-seo/2026-10-02-ortsseiten-bw/{keywords-roh.csv,keywords-cluster.md,offene-fragen.md,annahmen.md}`
- Modify: Memory `project-bbp-ortsseiten-bw.md`

- [ ] **Step 1: Vault-Notizen** (YAML-Frontmatter, Wikilinks, jede Zahl mit Quelle + Abrufdatum, kein Code): Messung, Schwellen + Begründung, Seitenzahl je Leistung, Credits, Prüfergebnisse (höchste Gleichheit, Eigenanteil min.), offene Punkte, Anwaltsfragen gesammelt; RUNBOOK-Abschnitt „Stand je Portal“ um BBP ergänzen.
- [ ] **Step 2: Workspace-Ablage** nach `bbp-keyword-recherche` Schritt 3.
- [ ] **Step 3: Memory** aktualisieren (Stand, Commit, Seitenzahl, offene Punkte).
- [ ] **Step 4: Abschluss-Review** — `superpowers:requesting-code-review` für den Zweig `ortsseiten-bw`; Befunde beheben; Dev-Server nur auf Mateis Wunsch starten.
- [ ] **Step 5: Commit** — `git add docs && git commit -m "Doku Ortsseiten BW"`. Kein Push.
