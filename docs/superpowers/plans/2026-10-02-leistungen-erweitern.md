# Leistungen erweitern (5 → 11) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** 11 Leistungsbereiche nach Suchverhalten, 6 neue Leistungsseiten, zentrale Leistungsliste für Nav/Footer/Startseite/Formular, danach Ortsseiten der neuen Bereiche.

**Architecture:** `app/inhalte/leistungen.ts` wird die einzige Quelle für Namen, Gruppen, Chips und Ortstitel. Neue Leistungsseiten rendern über die Client-Vorlage `app/components/LeistungSeite.tsx` mit Inhalten aus `app/inhalte/leistungsseiten/<slug>.ts`. Ortsseiten nutzen die bestehende Infrastruktur (`orte-index.mjs`, `OrtSeite`, `check-orte`).

**Tech Stack:** wie Plan `2026-10-02-ortsseiten-bw.md` (Next 16 Static Export, plain CSS, Node-Skripte, OpenSEO, Agenten).

**Spec:** `docs/superpowers/specs/2026-10-02-leistungen-erweitern-design.md`

## Global Constraints

- Alle Constraints aus `docs/superpowers/plans/2026-10-02-ortsseiten-bw.md` gelten weiter (nur localhost, kein Push, Design bleibt, Verbotsliste, Erlösmodell nur „Die Kosten tragen die Fachbetriebe.“, ≥ 5 amtliche Ortsangaben je Ortsseite, Qualität vor Menge, Build nur über `sh scripts/build.sh`).
- `chip` in `leistungen.ts` = exakter Text im Formular; contact.php übernimmt die Chips unverändert.
- Keine Inhalte aus dem Gedächtnis mit Zahlen/Beträgen; Förderung (BEG/KfW/BAFA) nur allgemein, ohne Fördersätze.

## Review Focus

1. Nav-Dropdown mit 11 Punkten auf 1366 px und mobil (390 px) lesbar, kein horizontales Scrollen. Test in Task 1.
2. Ortsseiten-Vorbelegung mit neuen Slugs (`/?leistung=elektro-photovoltaik&ort=Ulm#kontakt`) wählt den richtigen Chip. Test in Task 1.
3. Neue Leistungsseite ohne Ortsseiten: „<Leistung> nach Ort“ erscheint nicht, keine leere Liste. Test in Task 2.
4. Umbenannte Seiten behalten Canonical/URL, keine doppelten Titles (pruefe-seo). Test in Task 3.
5. Neue Leistungsseiten laden keine Ortsseiten-Daten ins Bundle (pruefe-bundle). Test in Task 2.

---

### Task 1: Zentrale Leistungsliste, Nav, Footer, Startseite, Formular, Sitemap

**Files:** Modify `app/inhalte/leistungen.ts`, `app/components/Nav.tsx`, `app/components/Footer.tsx`, `app/page.tsx` (Nav-Variante Startseite, Leistungskacheln, `projektTypen`), `app/sitemap.ts`, `app/globals.css`; Create `scripts/leistungen.test.mjs`.

- [ ] Test zuerst (`scripts/leistungen.test.mjs`, liest `app/inhalte/leistungen.ts` per Regex): 11 Slugs, jede `gruppe` ∈ {bauen, sanieren, ausbau}, `chip` eindeutig, Slugs = Ordner unter `app/leistungen/` (nach Task 2 vollständig) → RED.
- [ ] `leistungen.ts`: Typ `LeistungSlug` auf 11 erweitern; Felder `gruppe`, `name`, `kurz` (Linktext, z. B. „Elektriker“), `chip`, `ortsTitel`; Export `GRUPPEN` (Reihenfolge + Überschrift) und `LEISTUNG_SLUGS`.
- [ ] Nav: `leistungenItems` aus `LEISTUNGEN` erzeugen; Dropdown in 3 Spalten (`.nav-dropdown-menu--gruppen`, CSS grid 3 × auto, Spaltenüberschrift je Gruppe); mobil Gruppenüberschriften + Liste. Startseiten-Nav (eigene Variante in `app/page.tsx`) genauso.
- [ ] Footer: Spalte „Leistungen“ aus `LEISTUNGEN` (11 Links mit `/leistungen/<slug>/`).
- [ ] Startseite: `leistungen`-Kacheln um 6 ergänzen (gleiches Design, Icon + 3 Stichpunkte je Bereich).
- [ ] Formular: `projektTypen = [...LEISTUNG_SLUGS.map(chip), 'Sonstiges']`.
- [ ] Sitemap: alle 11 Leistungsseiten.
- [ ] Prüfen: Test GREEN, `tsc`, Build, `pruefe-seo`, Linkvergleich (`links-snapshot --vergleich` gegen `docs/regionen/links-vorher.json`: 0 fehlende), Playwright 1366/390 Dropdown + Vorbelegung mit neuem Slug.
- [ ] Commit.

### Task 2: Vorlage + 6 neue Leistungsseiten

**Files:** Create `app/components/LeistungSeite.tsx`, `app/inhalte/leistungsseiten/{dach-fassade,heizung-waermepumpe,elektro-photovoltaik,fenster-tueren,maler-fliesen-boeden,garten-aussenanlagen}.ts`, `app/leistungen/<slug>/{page,layout}.tsx`; Modify `app/inhalte/ratgeber.ts` (6 Einträge).

- [ ] `LeistungSeite`: Props `{ slug, inhalt }`; Abschnitte Hero, Karten (4, Icon per Schlüssel aus fester Icon-Map), Prozess, Warum, CTA, `LeistungRatgeber`, `OrteDerLeistung`, FAQ (Akkordeon wie bestehend), SEO-Blöcke; JSON-LD FAQPage (aus faqs), Service, BreadcrumbList; `Nav aktuelleLeistung`.
- [ ] Inhalt je Seite: H1 „<Bereich> am Bodensee“-Muster wie Bestand, Titel ≤ 60, Beschreibung 140–160, 6–7 FAQ ohne Banales, Ratgeber 3 Blöcke zu den gemessenen Fragen; Verbotsliste beachten (Script-Check: `VERBOTEN` aus check-orte auf die Texte anwenden).
- [ ] Prüfen: `pruefe-seo` (17 Seiten ohne Fehler), `pruefe-bundle` (0), Seite ohne Ortsseiten zeigt keinen Orte-Abschnitt, Playwright Stichprobe.
- [ ] Commit.

### Task 3: Bestehende 5 umbenennen

**Files:** Modify `app/leistungen/{hochbau,tiefbau,bad-sanitaer,innenausbau,renovierung-sanierung}/{page,layout}.tsx`.

- [ ] Namen in Hero-H1, Eyebrow, Titel, OG, Service-/Breadcrumb-Schema auf neue Namen; Sanierungsseite: Hinweis/Link auf Heizung & Wärmepumpe und Fenster & Türen; Innenausbau: Hinweis/Link auf Maler, Fliesen & Böden.
- [ ] Prüfen: `pruefe-seo`, Titellängen ≤ 60; Commit.

### Task 4: Messung Ortsseiten neue Bereiche

- [ ] `get_keyword_metrics` für die 150 größten Orte × {elektriker, maler, fliesenleger, dachdecker, dachsanierung, wärmepumpe, heizungsinstallateur, terrassenüberdachung, zaunbau} (ohne Trends, Pakete ≤ 700; Rohantworten nach `docs/regionen/messung/keywords-05-*.json`).
- [ ] SERP-Stichproben je Leistung (Absicht, Portale, Mehrdeutigkeit).
- [ ] Schwellen je Leistung festlegen und begründen (Regionalplan-Nachtrag), `docs/regionen/auswahl-2.json`; Commit.

### Task 5: Ortsseiten schreiben + QA

- [ ] Agentenvorlage um Quellenarten der neuen Bereiche ergänzen (`docs/regionen/agentenvorlage-2.md`): Elektro (Netzbetreiber/Netzanschluss, Marktstammdatenregister, PV-Pflicht BW nur allgemein, Solarkataster LUBW, Energieagentur), Heizung (kommunale Wärmeplanung, Wärmenetze/Fernwärme der Stadtwerke, Schornsteinfeger-Zuständigkeit allgemein, Energieagentur), Dach (Gestaltungs-/Dachsatzungen, Denkmalschutz, Solarkataster), Maler/Fliesen (Gestaltungs-/Farbleitplan, Denkmal, Altstadtsatzung), Garten (Baurecht für Terrassenüberdachung/Carport/Zaun laut LBO-Anhang nur als Wiedergabe der Stadt, Bebauungsplan, Baumschutzsatzung, Versickerung/Niederschlagsgebühr).
- [ ] Gruppen (≤ 8 Agenten gleichzeitig), Nachprüfung, QA-Runde (QA-Liste), `check-orte` 0 Fehler; Commit.

### Task 6: Endkontrolle + Doku

- [ ] `orte-index`, Tests, `check-orte`, `tsc`, `sh scripts/build.sh`, `pruefe-seo`, `pruefe-bundle`, Ähnlichkeit, `quellen-check`, Browser.
- [ ] Baubericht-Nachtrag, `orte.csv`, Workspace `02-keyword-seo`, Memory; Abschluss-Review; Commit.
