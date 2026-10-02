# Leistungen erweitern (5 → 11) — Design

Stand 2026-10-02 · Freigabe der Aufteilung im Chat durch Matei („ja das passt so die aufteilung fang an“) · nur localhost · Zweig `ortsseiten-bw`

## Ziel

Die Leistungen so schneiden, wie Kunden suchen (Gewerk/Arbeit statt Branchenbegriff), damit jede Leistungsseite einen eigenen Hauptsuchbegriff hat; 6 neue Bereiche mit gemessener Nachfrage ergänzen; danach Ortsseiten für die neuen Bereiche.

## Neue Leistungsstruktur (11, drei Gruppen)

| Gruppe | Name | Slug | Hauptsuchbegriff (Leistungsseite / Ortsseite) | Status |
|---|---|---|---|---|
| Bauen | Neubau & Rohbau | `hochbau` | bauunternehmen, hausbau | umbenannt (bisher „Hochbau“) |
| Bauen | Dach & Fassade | `dach-fassade` | dachdecker, dachsanierung | neu |
| Bauen | Tiefbau & Erdarbeiten | `tiefbau` | erdarbeiten kosten, kanalanschluss | umbenannt, keine Ortsseiten |
| Sanieren | Sanierung & Renovierung | `renovierung-sanierung` | sanierung, kernsanierung | umbenannt |
| Sanieren | Badsanierung & Sanitär | `bad-sanitaer` | badsanierung | umbenannt (bisher „Bad & Sanitär“) |
| Sanieren | Heizung & Wärmepumpe | `heizung-waermepumpe` | wärmepumpe, heizungsinstallateur | neu |
| Sanieren | Elektro & Photovoltaik | `elektro-photovoltaik` | elektriker | neu |
| Sanieren | Fenster & Türen | `fenster-tueren` | fensterbauer, fenster austauschen | neu, voraussichtlich keine Ortsseiten (navigational) |
| Ausbau | Innenausbau & Trockenbau | `innenausbau` | innenausbau, trockenbau | umbenannt |
| Ausbau | Maler, Fliesen & Böden | `maler-fliesen-boeden` | maler, fliesenleger | neu |
| Ausbau | Garten & Außenanlagen | `garten-aussenanlagen` | terrassenüberdachung, zaunbau | neu |

Nachfrage-Belege: OpenSEO 02.10.2026 (5 Städte Stuttgart/Karlsruhe/Freiburg/Ulm/Ravensburg + bundesweit), siehe `docs/regionen/messung/keywords-04-gewerke.md`.

Bestehende Slugs bleiben (keine Rankings zu verlieren, keine Weiterleitungen nötig); geändert werden Name, Titel, H1, Beschreibung.

## Umsetzung

- **Vorlage:** neue Client-Komponente `app/components/LeistungSeite.tsx`, optisch identisch zu den bestehenden Leistungsseiten (gleiche Klassen `hb-*`, `prozess-*`, `cta-*`, `faq-*`, `seo-*`), Inhalte aus `app/inhalte/leistungsseiten/<slug>.ts` (Hero, 4 Karten mit Icon-Schlüssel, 4 Ablaufschritte, Warum-Text + 3 USPs, CTA-Titel, 6–7 FAQ, 4 SEO-Blöcke). Strukturdaten Service + BreadcrumbList + FAQPage in der Seite (nicht im Layout). Ratgeber-Abschnitt und „<Leistung> nach Ort“ wie bisher.
- **6 neue Routen** `app/leistungen/<slug>/page.tsx` + `layout.tsx` (Metadaten, Canonical).
- **Bestehende 5:** Namen/Titel/H1 anpassen; Inhalte bleiben, Heizung-Hinweise auf der Sanierungsseite verweisen auf die neue Heizungsseite.
- **Zentrale Liste** `app/inhalte/leistungen.ts`: 11 Einträge mit `gruppe`, `name`, `chip`, `ortsTitel`, `kurz`; Nav, Footer, Startseiten-Kacheln, Formular-Chips und Sitemap lesen daraus (statt verstreuter Kopien).
- **Navigation:** Dropdown in drei Spalten nach Gruppe; mobil gruppierte Liste. **Footer:** Spalte Leistungen mit 11 Links. **Startseite:** Leistungsbereich mit 11 Kacheln (bestehendes Design). **Formular:** 11 Chips + „Sonstiges“.
- **Inhalte der neuen Seiten:** sachlich, ohne Netzwerk-/Qualitäts-/Tempo-Behauptungen, ohne Erlösmodell, mit Ratgeber-Abschnitt zu den gemessenen Fragen (z. B. „wärmepumpe kosten/förderung“, „dachsanierung kosten“, „elektriker“ …); Förderung nur allgemein ohne Beträge.

## Phase 2: Ortsseiten der neuen Bereiche

- Messung „<begriff> <ort>“ für die 150 größten BW-Orte (wie Runde 1): elektriker, maler, fliesenleger, dachdecker, dachsanierung, wärmepumpe, heizungsinstallateur, terrassenüberdachung, zaunbau.
- Auswahl wie Runde 1 (Qualität vor Menge): Schwellen nach Messung je Leistung, nur kommerzielle oder SERP-belegte Absicht, ≥ 5 amtliche Ortsangaben je Seite; Fenster/Tiefbau ohne Ortsseiten.
- Agenten nach angepasster Vorlage (leistungsbezogene Quellenarten für Elektro, Heizung, Dach, Maler/Fliesen, Garten), QA-Runde, Prüfkette wie Runde 1.

## Prüfung

`check-orte`, `pruefe-seo`, `pruefe-bundle`, Ähnlichkeit, Linkvergleich (keine Links verloren), `tsc`, Build via `sh scripts/build.sh`, Browser 390/1366 px (Nav-Dropdown mit 11 Punkten, Formular-Chips).

## Nicht im Umfang

Upload, Push, Vault, Google-Unternehmensprofil, Backlinks, eigene Ratgeberseiten.

## Offen beim Betreiber

Ob für die neuen Gewerke Betriebe vorhanden sind, an die Leads verkauft werden können (gefragt 02.10.2026, noch unbeantwortet) — die Seiten behaupten keine Betriebe; Risiko liegt beim Lead-Verkauf.
