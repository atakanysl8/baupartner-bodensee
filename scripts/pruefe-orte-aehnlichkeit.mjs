// Ähnlichkeitsprüfung der Ortsseiten am gerenderten HTML — so, wie Google die Seiten sieht.
// Aufruf: node scripts/pruefe-orte-aehnlichkeit.mjs [basis-url]   (Standard http://localhost:3417)
// Angepasst für Bodensee BauPartner (Leistung × Ort), Herkunft: MAAS-Vault Werkzeuge Ortsunterseiten.
//
// check-orte.ts misst nur den Ortsinhalt aus den JSON-Dateien. Hier zählt die ganze Seite
// samt Kopf, Fußzeile und Formular, damit Beinahe-Duplikate auffallen, bevor Google sie
// als „Duplikat, nicht als kanonisch ausgewählt“ aussortiert.
//
// FEHLER (Exit 1):
//   - zwei Ortsseiten teilen im <main> mehr als 50 % ihrer Wort-Fünfergruppen (Ortsname neutralisiert)
//   - Eigenanteil einer Seite unter 35 %: Anteil der Fünfergruppen, die auf höchstens 3 Seiten vorkommen
//   - doppelter Title, doppelte Meta-Beschreibung oder doppelte H1
//   - Canonical fehlt oder zeigt nicht auf die Seite selbst
// WARNUNG: Paar über 30 %, Eigenanteil unter 45 %.
import fs from "node:fs";
import path from "node:path";

const basis = (process.argv[2] ?? "http://localhost:3417").replace(/\/$/, "");
const ordner = path.join(import.meta.dirname, "..", "app", "inhalte", "orte");
const seiten = fs
  .readdirSync(ordner)
  .filter((d) => d.endsWith(".json") && !d.startsWith("_"))
  .map((d) => JSON.parse(fs.readFileSync(path.join(ordner, d), "utf8")))
  // Bodensee BauPartner: Leistung × Ort unter /leistungen/<leistung>/<ort>/
  .map((o) => ({ ...o, pfad: `/leistungen/${o.leistung}/${o.ort}/`, ort: o.ortName, titel: o.title, beschreibung: o.description }));

if (seiten.length < 2) {
  console.log(`${seiten.length} Ortsseite(n) — Ähnlichkeit braucht mindestens zwei. Nichts zu prüfen.`);
  process.exit(0);
}

const html = {};
const warteschlange = seiten.map((o) => o.pfad);
await Promise.all(
  Array.from({ length: 8 }, async () => {
    while (warteschlange.length) {
      const p = warteschlange.shift();
      html[p] = await (await fetch(basis + p)).text();
    }
  }),
);

const entitaeten = (s) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ");
function text(h, teil) {
  const m = h.match(teil === "main" ? /<main[\s\S]*?<\/main>/ : /<body[\s\S]*?<\/body>/);
  const t = (m ? m[0] : "").replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ");
  return entitaeten(t).replace(/\s+/g, " ").trim();
}
function woerter(t, o) {
  const namen = [o.ort, o.kurz, o.ort.split(" (")[0]].filter(Boolean).sort((a, b) => b.length - a.length);
  for (const n of namen) t = t.split(n).join(" ORT ");
  return t.toLowerCase().replace(/[^a-zäöüß0-9 ]/g, " ").split(/\s+/).filter(Boolean);
}
function streuwert(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function fuenfer(w) {
  const s = new Set();
  for (let i = 0; i + 5 <= w.length; i++) s.add(streuwert(w.slice(i, i + 5).join(" ")));
  return s;
}
function gleichheit(a, b) {
  const [klein, gross] = a.size < b.size ? [a, b] : [b, a];
  let n = 0;
  for (const x of klein) if (gross.has(x)) n++;
  return n / (a.size + b.size - n);
}

const daten = seiten.map((o) => ({
  o,
  main: fuenfer(woerter(text(html[o.pfad], "main"), o)),
  body: fuenfer(woerter(text(html[o.pfad], "body"), o)),
}));
const fehler = [];
const warnungen = [];

const haeufigkeit = new Map();
for (const d of daten) for (const x of d.body) haeufigkeit.set(x, (haeufigkeit.get(x) ?? 0) + 1);
let tiefster = { wert: 1, pfad: "" };
for (const d of daten) {
  let eigen = 0;
  for (const x of d.body) if (haeufigkeit.get(x) <= 3) eigen++;
  const anteil = eigen / d.body.size;
  if (anteil < tiefster.wert) tiefster = { wert: anteil, pfad: d.o.pfad };
  if (anteil < 0.35) fehler.push(`${d.o.pfad}: Eigenanteil nur ${(anteil * 100).toFixed(1)} %`);
  else if (anteil < 0.45) warnungen.push(`${d.o.pfad}: Eigenanteil ${(anteil * 100).toFixed(1)} %`);
}

let hoechste = { wert: 0, paar: "" };
for (let i = 0; i < daten.length; i++) {
  for (let j = i + 1; j < daten.length; j++) {
    const g = gleichheit(daten[i].main, daten[j].main);
    const paar = `${daten[i].o.pfad} ↔ ${daten[j].o.pfad}`;
    if (g > hoechste.wert) hoechste = { wert: g, paar };
    if (g > 0.5) fehler.push(`Gleichheit ${(g * 100).toFixed(0)} %: ${paar}`);
    else if (g > 0.3) warnungen.push(`Gleichheit ${(g * 100).toFixed(0)} %: ${paar}`);
  }
}

for (const [feld, wert] of [
  ["Title", (o) => o.titel],
  ["Beschreibung", (o) => o.beschreibung],
  ["H1", (o) => o.h1],
]) {
  const gesehen = new Map();
  for (const o of seiten) {
    const v = wert(o);
    if (gesehen.has(v)) fehler.push(`${feld} doppelt: ${gesehen.get(v)} und ${o.pfad}`);
    else gesehen.set(v, o.pfad);
  }
}
for (const o of seiten) {
  const m = html[o.pfad].match(/<link rel="canonical" href="([^"]+)"/);
  if (!m || !m[1].endsWith(o.pfad)) fehler.push(`${o.pfad}: Canonical ${m ? m[1] : "fehlt"}`);
}

for (const w of warnungen) console.log("WARNUNG", w);
for (const f of fehler) console.error("FEHLER", f);
console.log(`Höchste Gleichheit im Hauptinhalt: ${(hoechste.wert * 100).toFixed(1)} % (${hoechste.paar})`);
console.log(`Niedrigster Eigenanteil der ganzen Seite: ${(tiefster.wert * 100).toFixed(1)} % (${tiefster.pfad})`);
console.log(`${seiten.length} Ortsseiten, ${fehler.length} Fehler, ${warnungen.length} Warnungen.`);
process.exit(fehler.length ? 1 : 0);

