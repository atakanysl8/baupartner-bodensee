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
- „Innerhalb 24h“ (Startseite, Leistungsseiten): vom Betreiber am 02.10.2026 bestätigt, bleibt.
- Nächster SEO-Hebel: eigene Ratgeberseiten zu „badsanierung kosten“ (4.400), „kernsanierung“ (2.400), „barrierefreies bad“ (2.400), „bodenplatte kosten“ (1.000) u. a.
- Nachmessung kleinere Orte (Rang 151–262, ~165 Credits) nur bei Bedarf.
- OpenSEO: 2.532 → 2.277 Credits (255 verbraucht, inkl. Audit).

## Nachtrag 2: Leistungen 5 → 11 und 100 weitere Ortsseiten (02.10.2026)

Spec: `docs/superpowers/specs/2026-10-02-leistungen-erweitern-design.md` · Plan: `docs/superpowers/plans/2026-10-02-leistungen-erweitern.md` · Messung/Auswahl: `regionalplan.md` (Nachtrag 2), `auswahl-2.json`

- **11 Leistungen** in drei Gruppen (Bauen · Sanieren & Modernisieren · Ausbau & Außen), zentrale Liste `app/inhalte/leistungen.ts`, Vorlage `LeistungSeite.tsx`, 6 neue Leistungsseiten (Dach & Fassade, Heizung & Wärmepumpe, Elektro & Photovoltaik, Fenster & Türen, Maler/Fliesen/Böden, Garten & Außenanlagen); Nav mit Gruppen-Dropdown, Footer, Startseiten-Kacheln und Formular-Chips aus der Liste.
- **100 neue Ortsseiten** in 27 Kreisen: Elektriker 31, Maler & Fliesenleger 31, Dachdecker 24, Wärmepumpe & Heizung 7, Terrassenüberdachung 7 (Fenster & Türen ohne Ortsseiten). Insgesamt jetzt **190 Ortsseiten**.
- Je neue Seite 5–8 belegte Fakten (zusammen 642), 3–4 FAQ, rund 450–700 Wörter; Fakten anderer Leistungen desselben Ortes wurden nicht wiederholt.
- Ablauf: 11 Schreib-Agenten (`wellen-2/`, Vorlage `agentenvorlage-2.md`), danach 4 QA-Agenten (`qa-liste-2.md`). QA entfernte u. a. Steuerhinweise (§ 7h/10f EStG), ausgeschöpfte/gestoppte Programme (Solaroffensive und Heizungsprogramm Stuttgart, Balkonkraftwerke Böblingen/Lörrach, Dachbegrünung Ettlingen, Dämmzuschuss Weinheim), Förderbedingungen aus Pressemitteilungen, Ersparnisaussagen, „vor Ort“-Formulierungen, Werte ohne Stand; Satzungspflichten durchgehend als Wiedergabe. Korrigiert: hochbau--baden-baden (Gesamtanlagensatzung 2018 statt 2008), maler--kornwestheim (FAQ zu Neuanstrich).
- Anwaltsfragen: 19 neue (Dateien 12–21 in `anwaltsfragen/`), v. a. Wiedergabe alter Satzungen (Konstanz 1982, Ravensburg 1976, Schorndorf 1978), PV-Pflicht bei Dachsanierung, Fernwärme-Anschlusspflicht, Asbestdach/PV, Gründach-Gebührenfaktor.

| Prüfung (Endstand) | Ergebnis |
|---|---|
| `node --test scripts/*.test.mjs` | 18/18 |
| `node scripts/check-orte.mjs` | 190 Seiten, 0 Fehler, 0 Warnungen, höchste Textgleichheit 7,5 % |
| `npx tsc --noEmit`, `sh scripts/build.sh` | ok |
| `node scripts/pruefe-seo.mjs` | 207 Seiten, 0 Fehler |
| `node scripts/pruefe-bundle.mjs` | 68 Chunks, 0 mit Ortsseiten-Texten |
| `node scripts/pruefe-orte-aehnlichkeit.mjs` | höchste Gleichheit Hauptinhalt 9,4 %, niedrigster Eigenanteil 67,5 %, 0 Fehler |
| `node scripts/quellen-check.mjs` | 896 URLs; dieselben 2 Soft-404 wie Runde 1, 3 Netz-/Zertifikatsfehler (ISONG per curl 200) |
| Browser 390/1366 px | Stichproben ohne horizontales Scrollen, Hub `/regionen/` mit 190 Links |

Offen: Für die neuen Gewerke müssen Betriebe vorhanden sein, an die Anfragen gehen können. OpenSEO: ~2.190 → ~1.860 Credits (Messung 1.050 Keywords + 6 SERP).

## Nachtrag 3: Ratgeberseiten, interne Verlinkung, Bilder (02.10.2026)

Spec: `docs/superpowers/specs/2026-10-02-ratgeber-verlinkung-design.md` · Plan: `docs/superpowers/plans/2026-10-02-ratgeber-verlinkung.md` · Seitenplan: `docs/ratgeber/seitenplan.json`

- **Keyword-Recherche** (OpenSEO, ca. 590 Credits): 10 Seeds × ~150 Ideen, 79 Kosten-Begriffe, 8 SERP-Stichproben; Rohdaten `docs/regionen/messung/keywords-06-*.json`, `keywords-07-kosten.json`.
- **28 Ratgeberseiten** `/ratgeber/<slug>/` (eine Suchanfrage je Seite, Summe Hauptbegriffe ≈ 110.000 Suchen/Monat, größte: wärmepumpe kosten 40.500, wallbox kosten 22.200, energetische sanierung 6.600) + Hub `/ratgeber/`. Je Seite 900–1.150 Wörter, 4–8 Quellen (99 URLs, alle erreichbar), Kostentabelle mit Quellennummern, Article + FAQPage + BreadcrumbList. 7 Schreib-Agenten + 4 QA-Agenten; QA hat jede Zahl gegen die Quelle geprüft und u. a. falsch zugeordnete Dämmstoffpreise, unbelegte Zusätze, eigene Rechtseinordnungen, pauschale Genehmigungsgebühren und Förderbedingungen entfernt.
- **Gesetz:** Das GEG heißt laut gesetze-im-internet.de jetzt Gebäudemodernisierungsgesetz (GModG); Ratgeber und Leistungsseiten nennen „Gebäudemodernisierungsgesetz (früher Gebäudeenergiegesetz)“ ohne Pflicht-Anweisungen.
- **Interne Verlinkung** (Regeln aus der Vault): Navigation „Ratgeber“, Fußzeile, Startseite (6 Ratgeber + Hub), Leistungsseiten → ihre Ratgeber, Ratgeber → genau eine Leistungsseite + 1–2 Ratgeber + Hub, Ortsseiten → 3 Nachbarorte + Leistung + 1–2 Ratgeber + ≤ 2 verwandte Leistungen im Ort + Hub (vorher alle übrigen Leistungen), Ankertabelle `app/inhalte/anker.ts` (ein Anker je Ziel), redaktionelle Links für „Über uns“ und „Für Fachbetriebe“ (vorher verwaist). Prüfskript `scripts/pruefe-links.mjs`.
- **Bilder:** Hero mit fal.ai SeedVR2 auf 3344 × 1888 hochskaliert, ausgeliefert in 960/1600/2560 px (`HeroBild`, srcset); Logo als SVG (Clip-Fehler und abgeschnittenes „AM SEE“ behoben).
- **Texte:** Startseite „11 Leistungsbereiche“ (aus der Liste gezählt); unbelegte Aussagen im Startseiten-SEO-Text entschärft; Titles der Bestandsseiten ohne „Kosten“ (keine Kannibalisierung mit Ratgebern).

| Prüfung (Endstand) | Ergebnis |
|---|---|
| `node --test scripts/*.test.mjs` | 42/42 |
| `check-orte` / `check-ratgeber` | 190 / 28 Seiten, 0 Fehler |
| `tsc`, `build.sh` | ok |
| `pruefe-seo` | 236 Seiten, 0 Fehler |
| `pruefe-bundle` | 71 Chunks, 0 mit Orts-/Ratgeber-Texten |
| `pruefe-links` | 236 Seiten, 0 Fehler; Klicktiefe ≤ 2; Ratgeber min. 2 / Median 11 Eingänge; 11 Warnungen (Startseiten-Kacheln nutzen Kartentext als Anker) |
| Ähnlichkeit Ortsseiten | max. 9,7 %, 0 Fehler |
| Quellen Ratgeber | 99 URLs, 0 Probleme |

Anwaltsfragen Ratgeber: `anwaltsfragen/ratgeber-r1…r6*.md` (PV-Pflicht-Wiedergabe, Wallbox/§ 14a EnWG, LBO-Anhang-Zitate, NRG-Zaunhöhe, Treppen, Fenster/RC 2). Offen: Haustür, Treppe und Teile Bad stützen sich mangels neutraler Quelle auf Wohnglück.de/Interhyp (als Darlehens-/Finanzierungsvermittler gekennzeichnet).

## Nachtrag 4: Ratgeber-Bereich aufgelöst, Kostenseiten unter den Leistungen (03.10.2026)

Betreiber-Entscheidung: Übersicht `/ratgeber/` und Menüpunkt „Ratgeber“ entfallen; Inhalte bleiben als Kostenseiten unter ihrer Leistung.
- URLs: `/leistungen/<leistung>/<slug>/` (z. B. `/leistungen/heizung-waermepumpe/waermepumpe-kosten/`), gleiche Route wie die Ortsseiten (`orte-index.mjs`, Slug-Konflikt-Prüfung). Brotkrume Start › Leistung › Kostenseite. Kein sichtbares „Ratgeber“ mehr (Fließtext: „die Übersicht …“).
- Verlinkung verstärkt: Leistungsseite → alle eigenen Kostenseiten (Karten „Kosten im Detail“); Ortsseite → alle Kostenseiten der Leistung; Kostenseite → verwandte + alle weiteren Kostenseiten der Leistung + Leistungsseite + 8 größte Ortsseiten der Leistung + `/regionen/`; Startseite → 12 Kostenseiten; `/regionen/` (Fußzeile, seitenweit) → alle 28 Kostenseiten.
- Ergebnis `pruefe-links`: 235 Seiten, 0 Fehler; Kostenseiten Eingänge min. 3 / Median 31 (vorher 2 / 11), Ortsseiten Median 6; Klicktiefe ≤ 2. Tests 50/50, `pruefe-seo` 235/0, Bundle 0.
- Da die Website noch nicht live ist, sind keine Weiterleitungen von `/ratgeber/…` nötig.
