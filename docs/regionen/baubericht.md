# Baubericht Ortsseiten Baden-Württemberg + SEO-Umbau — bodensee-baupartner.de

Stand: 2026-10-02 · Zweig `ortsseiten-bw` · nur lokal, nichts gepusht oder hochgeladen
Spec: `docs/superpowers/specs/2026-10-02-ortsseiten-bw-design.md` · Plan: `docs/superpowers/plans/2026-10-02-ortsseiten-bw.md` · Messung/Auswahl: `regionalplan.md`

## Ergebnis

- **90 Ortsseiten** unter `/leistungen/<leistung>/<ort>/` in 31 Stadt-/Landkreisen: Badsanierung 41, Bauunternehmen (Hochbau) 38, Sanierung 6, Innenausbau 5. Tiefbau bewusst ohne Ortsseiten (Suchabsicht navigational).
- Übersicht **`/regionen/`** (nach Kreis), Fußzeile „Leistungen nach Ort“, Abschnitt „<Leistung> nach Ort“ auf den Leistungsseiten, Formular-Vorbelegung `/?leistung=&ort=#kontakt`.
- Jede Seite: 5–8 amtlich belegte, leistungsbezogene Ortsangaben mit Quelle und Abrufdatum, 3–4 eigene FAQ, ca. 480–600 Wörter, Strukturdaten Service (areaServed City) + BreadcrumbList + FAQPage.
- Liste aller Seiten mit Kennzahlen: `orte.csv`.

## SEO-Umbau bestehende Seiten

- Canonical auf jeder Seite (vorher keiner), Sitemap mit Schrägstrich und ohne noindex-Seiten, fester `lastModified`.
- Strukturdaten: LocalBusiness nur Startseite; Leistungsseiten Service + BreadcrumbList + FAQPage (FAQPage aus den sichtbaren FAQ erzeugt). Schema-JSON-LD aus den Layouts in die Seiten verschoben (Layouts vererbten sich auf Ortsseiten).
- Titel ≤ 60 Zeichen, Beschreibungen 140–160 Zeichen (Start, Über uns, 5 Leistungsseiten).
- Leistungsseiten: Ratgeber-Abschnitt nach gemessener Nachfrage (Kosten, Förderung, barrierefreies Bad, Kernsanierung, Bodenplatte, Kanal-/Hausanschluss, Trockenbau, Dachgeschossausbau), je 7 FAQ.
- Entschärft (Guardrails/Anwaltsregeln): unbelegte Einsparquote „30–60 %“, „viele vermittelte Betriebe sind Energieeffizienz-Experten“, Standortbehauptung „unsere Verlege-Spezialisten in Überlingen, Friedrichshafen und Konstanz“, Notfall-Zusage Tiefbau, „perfekt“/„blitzschnell“, Zusagen im Namen der Betriebe.
- Audit-Befunde (OpenSEO): Überschriften-Sprung (Footer `h5`) behoben, Titellängen behoben; noindex Impressum/Datenschutz gewollt; langsame Antwortzeiten (bis 10,5 s) liegen am Hosting.
- Bilder: Hero 2 MB PNG → 151 KB WebP, Teamfotos und Logo als WebP; ungenutzte Vorlagendateien entfernt.
- Nav/Footer als gemeinsame Komponenten (Startseite behält ihre eigene Nav-Variante).

## Prüfkette (Endstand)

| Prüfung | Ergebnis |
|---|---|
| `node --test scripts/*.test.mjs` | 13/13 |
| `node scripts/check-orte.mjs` | 90 Seiten, 0 Fehler, 0 Warnungen, höchste Textgleichheit 7,5 % |
| `npx tsc --noEmit`, `sh scripts/build.sh` | ok |
| `node scripts/pruefe-seo.mjs` | 101 Seiten, 0 Fehler (Title, Description, Canonical, eine H1, Pflichtlinks, Schema-Dubletten, doppelte Titles/Descriptions) |
| `node scripts/pruefe-orte-aehnlichkeit.mjs` (gerendert) | höchste Gleichheit Hauptinhalt 8,9 %, niedrigster Eigenanteil 74,3 %, 0 Fehler (Referenz Solar: 24,4 % / 46,2 %) |
| `node scripts/quellen-check.mjs` | 517 URLs; 2 × „404“ (Herrenberg Fa-GAP, SER Reutlingen — liefern korrekten Inhalt mit falschem Status), 1 Zertifikatsfehler (Bodensee-Wasserversorgung, im Browser ok) |
| Browser 390/1366 px | Stichproben ohne horizontales Scrollen; bekannter RSC-Prefetch-404 (`__next.*.__PAGE__.txt`) im statischen Export, betrifft nur Client-Prefetch |

## Arbeitsweise

10 Recherche-Agenten (Gruppen nach Kreis, `wellen/`), Vorlage `agentenvorlage.md`; danach 4 QA-Agenten nach `qa-liste.md`. Nachprüfung durch Claude: ausgeschöpfte oder befristete Förderprogramme (KlimaBonus Bietigheim-Bissingen und Karlsruhe, Wohnimpuls Singen), Förderbeträge (Friedrichshafen) und Momentangaben (Mannheim, Weinheim, Göppingen, Lörrach) entfernt bzw. neutral gefasst; nur nach Kartenlage zugeordnete Härtewerte (Mosbach) entfernt.

## Anwaltsfragen (31, Dateien `anwaltsfragen/*.md`)

Themen, die mehrere Seiten betreffen:
1. Wiedergabe von Satzungspflichten (Rückstausicherung, Entwässerungsantrag, Genehmigung im Sanierungsgebiet/Erhaltungssatzung/Gesamtanlage, Stellplatzzahlen) — inzwischen überall als „die Satzung sieht vor …“ formuliert.
2. Nennung von Versorgern mit Firmennamen (MVV, badenova, Technische Werke Schussental, FairEnergie, Energieversorgung Filstal, Sanierungstreuhand Ulm).
3. Nennung städtischer Förderprogramme ohne aktuell verfügbare Mittel (Stuttgart, Donaueschingen) — ohne Beträge, mit Verweis auf die Stadt.
4. Hinweise auf steuerliche Förderung bei Kulturdenkmalen/Sanierungsgebiet, Legionellen-Untersuchungspflicht, Bleileitungsverbot, Erdwärme-Anzeigepflicht, HQ100-Bauverbot (§ 78 WHG), § 144 BauGB.
5. **Grundsatz:** Städteseiten von Vermittlungsportalen (HWK Freiburg, PM 53/26 vom 17.09.2026, § 5 UWG) — die Seiten behaupten keine Betriebe oder Präsenz im Ort.

## Offene Punkte / Wiedervorlage

- Vor einer Veröffentlichung: Ortsseiten sind auf Bodensee-Marke, die Startseite sagt „Bodenseeregion“ — Leads aus ganz BW müssen an Betriebe vor Ort verkauft werden können (Betreiber-Entscheidung 02.10.2026: ganz BW).
- Befristete Inhalte nach Ablauf prüfen: KlimaBonus Bietigheim-Bissingen (Neuauflage 2027), KlimaBonus Karlsruhe (Überarbeitung 2027), Stuttgarter Programme (jährlich), Analysewerte Wasserhärte (jährlich).
- Bestehende Aussagen „Innerhalb 24h“/„innerhalb von 24 Stunden“ (Startseite, Leistungsseiten) stehen weiter — Reaktionszeit-Zusage laut Guardrails nur, wenn belegt; Betreiber entscheidet.
- Nächster SEO-Hebel: eigene Ratgeberseiten zu „badsanierung kosten“ (4.400), „kernsanierung“ (2.400), „barrierefreies bad“ (2.400), „bodenplatte kosten“ (1.000) u. a.
- Nachmessung kleinere Orte (Rang 151–262, ~165 Credits) nur bei Bedarf.
- OpenSEO: 2.532 → 2.277 Credits (255 verbraucht, inkl. Audit).
