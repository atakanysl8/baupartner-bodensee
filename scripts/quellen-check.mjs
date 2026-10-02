// Prüft alle Quellen-URLs der Ortsseiten (fakten[].url).
// Aufruf: node scripts/quellen-check.mjs — meldet 404/410 und Netzfehler; 403 (Bot-Sperre) gilt als ok.
import fs from "node:fs";
import path from "node:path";

const ordner = path.join(import.meta.dirname, "..", "app", "inhalte", "orte");
const urls = new Map();
for (const d of fs.readdirSync(ordner).filter((x) => x.endsWith(".json"))) {
  const j = JSON.parse(fs.readFileSync(path.join(ordner, d), "utf8"));
  const alle = j.fakten.map((f) => f.url);
  for (const u of alle) urls.set(u, [...(urls.get(u) ?? []), d]);
}
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36";
const liste = [...urls.keys()];
const ergebnis = [];
await Promise.all(
  Array.from({ length: 12 }, async () => {
    while (liste.length) {
      const u = liste.shift();
      try {
        const r = await fetch(u, { headers: { "User-Agent": UA, "Accept-Language": "de-DE,de" }, redirect: "follow", signal: AbortSignal.timeout(25000) });
        if (r.status === 404 || r.status === 410) ergebnis.push(`${r.status} ${u}  (${urls.get(u).join(", ")})`);
      } catch (e) {
        ergebnis.push(`NETZ ${u}  (${urls.get(u).join(", ")}) ${String(e.cause?.code ?? e.name)}`);
      }
    }
  }),
);
for (const e of ergebnis.sort()) console.log(e);
console.log(`${urls.size} URLs geprüft, ${ergebnis.filter((e) => /^40/.test(e)).length} × 404/410, ${ergebnis.filter((e) => e.startsWith("NETZ")).length} Netzfehler.`);

