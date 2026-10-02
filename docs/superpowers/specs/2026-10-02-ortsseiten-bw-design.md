# Ortsseiten Baden-Württemberg + SEO-Umbau — Design

Stand: 2026-10-02 · Freigabe des Designs im Chat durch Matei („ja passt“) · Umsetzung nur auf localhost

## 1. Ziel

1. So viele Ortsunterseiten für bodensee-baupartner.de wie SEO-technisch und nach Aufwand/Ertrag sinnvoll — Gebiet **ganz Baden-Württemberg**.
2. SEO-Umbau der gesamten bestehenden Website (technisch, On-Page, Inhalte, Strukturdaten), ohne Design, Geschäftsmodell oder Kernaussagen zu ändern.
3. Alles zuerst auf localhost. Kein Push, kein Upload ohne ausdrückliches Kommando.

Erfolg = (a) alle Ort×Leistung-Kombinationen mit gemessener Nachfrage und ≥ 5 belegten Ortsangaben sind gebaut, (b) Prüfkette ohne Fehler (Abschnitt 8), (c) Audit-Befunde der bestehenden Seite behoben oder begründet zurückgestellt.

## 2. Entscheidungen des Betreibers (02.10.2026)

| Punkt | Entscheidung |
|---|---|
| Gebiet | Ganz BW. Startseite und Marke bleiben bodenseegeprägt („Startseite unverändert“). |
| Leistungen je Ort | Alle fünf Kernbereiche erlaubt; Auswahl nach Messung (Claude entscheidet). |
| OpenSEO | max. 1.500 Credits in dieser Runde |
| Tempo | Alles in einem Durchgang (max. ~8 Agenten gleichzeitig) |
| Struktur | Ansatz A: Leistung × Ort im Silo der Leistungsseiten |
| Modell | Lead an genau einen Betrieb + 1 % Provision; auf der Website kein Wort zum Erlösmodell außer „Die Kosten tragen die Fachbetriebe.“ |

## 3. Informationsarchitektur

```
/                                       Startseite (bodenseegeprägt, unverändert im Kern)
/leistungen/<leistung>/                 bestehende 5 Leistungsseiten = Elternseiten
/leistungen/<leistung>/<ort>/           NEU: Ortsseite je Leistung × Ort
/regionen/                              NEU: Hub, gruppiert nach Stadt-/Landkreis, alle Ortsseiten verlinkt
/fuer-fachbetriebe/, /ueber-uns/, /impressum/, /datenschutz/
```

- `<leistung>` ∈ `hochbau`, `tiefbau`, `bad-sanitaer`, `innenausbau`, `renovierung-sanierung` (bestehende Slugs).
- `<ort>`: amtlicher Gemeindename, Kleinschreibung, ae/oe/ue/ss, Zusätze gekürzt (`villingen-schwenningen`, `freiburg`, `rottweil`). Bei Namensdopplung in BW Kreis-Kürzel anhängen.
- Brotkrume: Start › Leistungen › <Leistung> › <Ort>.
- Verlinkung je Ortsseite: Elternleistung, 3 Nachbarorte derselben Leistung, andere Leistungen im selben Ort (falls gebaut), Hub.
- Leistungsseite: neuer Abschnitt „<Leistung> nach Ort“ mit Link zum Hub-Anker der Leistung (keine Liste aller Orte auf der Leistungsseite, um sie nicht aufzublähen; max. 12 größte Orte + „alle Orte“).
- Fußzeile: in Spalte „Unternehmen“ ein Punkt „Leistungen nach Ort“ → `/regionen/`. Kein Menüpunkt oben, keine Städteliste in der Fußzeile.

## 4. Messung (OpenSEO)

1. OpenSEO-Projekt „Bodensee BauPartner – bodensee-baupartner.de“ anlegen (Deutschland, de).
2. Ortsliste: Destatis-Gemeindeverzeichnis, alle BW-Gemeinden ≥ 5.000 Einwohner (~400). Suchbegriff = Kurzname; mehrdeutige Namen voll oder auslassen.
3. Suchbegriffe je Leistung (ohne Monatsverläufe):

| Leistung | Begriffe „<begriff> <ort>“ |
|---|---|
| bad-sanitaer | badsanierung, badrenovierung |
| renovierung-sanierung | sanierung, altbausanierung, haussanierung |
| hochbau | bauunternehmen, hausbau |
| tiefbau | tiefbau, erdarbeiten |
| innenausbau | innenausbau, trockenbau |

4. Erst Kostentest mit 10 Städten × alle Begriffe, Credits per `whoami` vorher/nachher; danach Rest in Paketen ≤ 700 Begriffen. Hochrechnung > 1.500 → Begriffe kürzen (Zweitbegriffe nur für Orte ≥ 20.000 EW).
5. SERP (Tiefe 10) für die ~40 größten Orte je Leistung-Hauptbegriff (stichprobenartig, nicht jede Kombination); Absicht prüfen (Firmenseiten, Portale mit Stadtseiten, Local Pack, navigational).
6. Zusätzlich: Domain-Überblick und Ranking-Keywords der Live-Domain, Wettbewerber-SERPs für die Leistungsseiten (Bodensee-Begriffe).
7. Rohdaten unverändert sichern: Vault `MAAS Vermittlungen/Regionalplan/bodensee-baupartner.de/rohdaten/` und `Downloads/Bodensee BauPartner/02-keyword-seo/2026-10-02-ortsseiten-bw/`.

## 5. Auswahl

> **Nachtrag Matei (02.10.2026):** Der Umfang muss nicht so groß sein wie bei den MAAS-Portalen — „die Anzahl, die wirklich perfekt ist“. Deshalb gilt hier Qualität vor Menge: lieber weniger Seiten, jede mit klarer Nachfrage, eindeutiger Suchabsicht und starkem eigenem Ortsinhalt. Schwellen eher hoch ansetzen, P2 nur mit klarem SERP-Beleg, Grenzfälle zurückstellen.

- **P1:** Summe der Begriffe einer Leistung im Ort ≥ Schwelle → bauen. Startwerte: Bad 20, Sanierung 20, Hochbau 30, Tiefbau 20, Innenausbau 20; nach Messung je Leistung final festgelegt und im Regionalplan begründet (Lehre Solar: Nebenleistung mit niedriger Nachfrage höher ansetzen).
- **P2:** unter Schwelle, aber SERP-Beleg (Local Pack / rankende Stadtseiten) → bauen.
- **P3:** sonst zurückstellen, mit Begründung.
- Nicht bauen bei navigationaler Suchabsicht (Firmennamen) oder mehrdeutigem Ortsnamen.
- Jede Seite braucht **≥ 5 amtlich belegte, leistungsbezogene Ortsangaben**; sonst legt der Agent sie nicht an und begründet das.

## 6. Code

- Statischer Export bleibt (`output: 'export'`, `trailingSlash: true`, Hostinger).
- Daten: `app/inhalte/orte/<leistung>--<ort>.json` (eine Datei je Seite) + generierter Index `app/inhalte/orte/index.ts` (`scripts/orte-index.mjs`); Ortsstammdaten (Name, Kreis, Einwohner, Koordinaten, Nachbarn) in `app/inhalte/gemeinden-bw.json`.
- Schema je Seite: `slug, leistung, ort, kreis, title, description, h1, einstieg, abschnitte[{h2, text}], fakten[{text, quelle, url, abruf}], faq[{q, a}], nachbarn[], offen[]`.
- Route `app/leistungen/[leistung]/[ort]/page.tsx` mit `generateStaticParams` + `generateMetadata` (eigener Title, Description, Canonical, OG). Server-Komponente; nur Formular-Teile bleiben Client.
- Gemeinsame Komponenten `app/components/Nav.tsx`, `Footer.tsx`; die zehnfach kopierten Nav/Footer werden ersetzt, Optik und Klassen bleiben identisch.
- Formular: Ortsseiten verlinken auf `/?leistung=<x>&ort=<Ort>#kontakt`; das Formular übernimmt Leistung (Chip vorgewählt) und Ort aus der URL.
- Strukturdaten Ortsseite: `Service` (provider = Organization Bodensee BauPartner, `areaServed: City`), `BreadcrumbList`, `FAQPage` nur für sichtbare FAQ. Kein `LocalBusiness` auf Ortsseiten.
- Hub `/regionen/`: Abschnitte je Kreis, darunter Orte mit Links je gebauter Leistung.
- Sitemap: alle URLs mit abschließendem Schrägstrich, eigene Gruppe für Ortsseiten.

## 7. Inhalte (Agenten)

- Gruppen nach Stadt-/Landkreis (44 Kreise → Gruppen à 6–14 Seiten), max. ~8 Agenten gleichzeitig, nächste Gruppe erst nach Rückmeldung. Agentenvorlage vor dem ersten Start fertig (keine Änderung im Lauf).
- Jeder Agent schreibt nur seine JSON-Dateien, sofort je Seite; keine Unteragenten; keine WebSearch (Stadt-Sitemaps, WebFetch, curl mit Browser-UA, eigene Playwright-Skripte).
- **Leistungsbezogene Ortsquellen** (damit Seiten desselben Orts verschieden sind):
  - Bad & Sanitär: Wasserversorger + Wasserhärte, Trinkwasserverordnung/Gesundheitsamt, Zuschüsse barrierefreies Bad (KfW, Pflegekasse – nur allgemein), Wohnraumberatung Landkreis.
  - Sanierung: Sanierungsgebiete (Städtebauförderung BW), Denkmalpflege/Gesamtanlagen, Energieagentur des Landkreises, kommunale Förderprogramme, Wärmeplanung (KWP BW).
  - Hochbau: Baurechtsbehörde (Stadt oder Landratsamt), Bebauungspläne/Geoportal, Gutachterausschuss/Bodenrichtwerte, Bauplatzvergabe, Stellplatzsatzung.
  - Tiefbau: Entwässerungs-/Abwassersatzung, Grundstücksentwässerung, Baugrund/LGRB-Kartenviewer, Hochwasser-/Starkregenkarten (LUBW), Leitungsauskunft.
  - Innenausbau: Ortsbau-/Gestaltungssatzung (Altstadt), Denkmalschutz innen, Energieberatung, Brandschutz/Baurecht bei Dachgeschossausbau.
- Umfang 300–600 Wörter, 3–5 FAQ, eigene Formulierungen; Einstieg mit Lage/Bedürfnis des Besuchers, Vermittlerhinweis höchstens einmal.
- **Verboten** (Guardrails + Anwaltsregeln): Behauptung von Betrieben/Partnern/Niederlassungen im Ort, Netzwerkgröße, „geprüft“, Garantien, Reaktionszeit-Zusagen, Notdienst, Bewertungen, Firmennamen, Bußgelder, datierte Momentangaben, Handlungsanweisungen in Rechts-/Förderfragen, Zusagen im Namen von Behörden. Unsicheres → Feld `offen`. Unklare Rechtsfragen → `docs/anwaltsfragen/<gruppe>.md`.
- Risiko-Hinweis: HWK Freiburg PM 53/26 (17.09.2026) kritisiert Städteseiten von Vermittlungsportalen (§ 5 UWG) → Seiten sagen nie, dass wir Betriebe im Ort haben; Formulierung: „Wir suchen für Ihre Anfrage einen passenden Fachbetrieb.“
- Nach Rückkehr jedes Agenten: gemeldete Unsicherheiten selbst prüfen; anschließend QA-Runde (3 Agenten nach Alphabet) gegen QA-Liste.

## 8. SEO-Umbau bestehende Seiten

Grundlage: OpenSEO-Audit der Live-Domain + Wettbewerber-SERPs. Geplante Punkte (nach Audit ergänzt):

- Canonical je Seite (fehlt heute), Metadaten je Seite auf Primärsuchbegriff (Startseite bleibt Bodensee).
- Sitemap mit Schrägstrich (passt heute nicht zu `trailingSlash`), `lastModified` realistisch.
- Strukturdaten: Organization/LocalBusiness nur Startseite (bestehend, korrigiert), `Service` + `FAQPage` + `BreadcrumbList` auf Leistungsseiten; FAQ-JSON-LD und sichtbare FAQ deckungsgleich.
- Überschriften-Hierarchie (genau eine H1), Bild-`alt`, `hero.png` (2 MB) → WebP + Größenangaben, unnötige Dateien aus `public/` entfernen.
- Leistungsseiten: mehr Text nach echter Suchnachfrage (Kostenrahmen nur mit Quelle oder als Spanne „in der Regel“, Ablauf, Fragen), interne Links zu Ortsseiten/Hub.
- Interne Links `<a>` → `next/link` wo sinnvoll; keine Design-Änderung.
- Startseite: Texte bleiben bodenseegeprägt; nur technische/On-Page-Verbesserungen und Hub-Link.

## 9. Prüfkette (vor „fertig“)

1. `node scripts/orte-index.mjs`, `node scripts/check-orte.mjs` (≥ 5 Fakten mit URL, 3–5 FAQ, Länge, verbotene Muster, Textgleichheit Ortsinhalt < 20 % Ziel / > 70 % Fehler).
2. `tsc --noEmit`, `eslint` (keine neuen Fehler), `next build`.
3. Statischen Export lokal ausliefern (`scripts/server.mjs` auf `out/`), dann `pruefe-orte-http.mjs` (alle 200, Canonical, Title/H1 eindeutig) und `pruefe-orte-aehnlichkeit.mjs` (Paar > 50 % Fehler, Eigenanteil < 35 % Fehler) gegen eigenen frisch gestarteten Server.
4. Quellen-URLs automatisch prüfen (kein 404).
5. Browserprüfung 390/1366 px (Stichprobe je Leistung + Hub + alle bestehenden Seiten).

## 10. Dokumentation

- Vault `MAAS Vermittlungen/Regionalplan/bodensee-baupartner.de/`: Regionalplan (Messung, Schwellen, Auswahl, Credits), `orte.csv`, Baubericht, `rohdaten/`, Notiz „Anwaltsfeedback Bodensee BauPartner Ortsseiten — Umsetzung 2026-10-xx“.
- Repo: `docs/regionen/` (Auswahl, Wellen, Agentenvorlage, QA-Liste, Pause-/Fortsetzungsdateien bei Abbruch).
- Memory aktualisieren.

## 11. Nicht im Umfang

Upload/Deploy, Push, Google Search Console, Google Business Profile, Tracking-Änderungen, Änderungen am Geschäftsmodell oder Formularablauf (außer Vorbelegung aus der URL).

## 12. Risiken

- Wochenlimit durch viele Agenten (Tempo „ein Durchgang“ gewählt) → Pause-Muster bereithalten.
- Lead-Verkäuflichkeit außerhalb Bodensee hängt an Betrieben vor Ort (Betreiber-Risiko, kein Website-Thema).
- Startseite sagt „Bodenseeregion“, Ortsseiten decken BW ab → Ortsseiten formulieren ortsbezogen, ohne der Startseite zu widersprechen.
- Rechtliche Restunsicherheit (§ 5 UWG, Städteseiten) → Anwaltsfragen-Datei.
