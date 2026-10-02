# Ratgeberseiten + interne Verlinkung — Design

Stand 2026-10-02 · Zweig `ortsseiten-bw` · nur lokal

## Ziel

Mehr organische Anfragen über Kosten-Suchbegriffe je Leistung (eine Suchanfrage = eine Seite) und eine interne Verlinkung, die Linkkraft gezielt auf die Leistungsseiten (Geldseiten) lenkt, ohne Linkringe oder Füllblöcke.

## Recherche (OpenSEO, 02.10.2026, ca. 590 Credits)

Rohdaten: `docs/regionen/messung/keywords-06-ratgeber-{a,b,c}.json` (10 Seeds × ~150 Ideen), `keywords-07-kosten.json` (79 Kosten-Begriffe), dazu `keywords-01..03`.
SERP-Stichproben (8 Begriffe): Ergebnisse sind überwiegend Ratgeber (co2online, Finanztip, ADAC, Herstellerseiten); bei „dachgaube kosten“, „haus bauen kosten“, „fenstereinbau kosten“ und „kernsanierung kosten“ ranken Foren (gutefrage, reddit, bau.de) auf den vorderen Plätzen → schwache Konkurrenz.

## Seitenplan Ratgeber (Welle 1: 28 Seiten)

URL `/ratgeber/<slug>/`. Volumen = Suchanfragen/Monat Deutschland, KD = Keyword Difficulty.

| # | Slug | Hauptbegriff (Vol/KD) | Nebenbegriffe (Vol) | Leistung |
|---|---|---|---|---|
| 1 | waermepumpe-kosten | wärmepumpe kosten (40.500/35) | gasheizung umrüsten auf wärmepumpe kosten (3.600), luftwärmepumpe kosten (2.400), neue heizung kosten (1.900) | heizung-waermepumpe |
| 2 | wallbox-kosten | wallbox kosten (22.200/1) | wallbox installation kosten (2.400) | elektro-photovoltaik |
| 3 | energetische-sanierung | energetische sanierung (6.600/39) | energetische sanierung kosten (260), haus sanieren kosten (1.000) | renovierung-sanierung |
| 4 | badsanierung-kosten | badsanierung kosten (4.400/7) | bad renovieren kosten (1.900), gäste wc renovieren kosten (90) | bad-sanitaer |
| 5 | wintergarten-kosten | wintergarten kosten (3.600/0) | — | garten-aussenanlagen |
| 6 | kernsanierung-kosten | kernsanierung kosten (1.000/0) | kosten einer kernsanierung (1.000), kernsanierung haus kosten (720) | renovierung-sanierung |
| 7 | dachsanierung-kosten | dachsanierung kosten (2.400/0) | dach neu decken kosten (2.400), neues dach kosten (1.600) | dach-fassade |
| 8 | barrierefreies-bad | barrierefreies bad (2.400/0) | — | bad-sanitaer |
| 9 | dachfenster-einbauen-kosten | dachfenster einbauen kosten (2.400/0) | — | dach-fassade |
| 10 | haus-bauen-kosten | haus bauen kosten (2.400/3) | hausbau kosten (1.600) | hochbau |
| 11 | photovoltaik-kosten | kosten photovoltaik anlage (2.400/45) | kosten photovoltaik mit speicher (1.600) | elektro-photovoltaik |
| 12 | dachgaube-kosten | dachgaube kosten (1.900/0) | — | dach-fassade |
| 13 | fenster-austauschen-kosten | fenstereinbau kosten (1.900/0) | fenster austauschen kosten (1.300) | fenster-tueren |
| 14 | fassadendaemmung-kosten | fassadendämmung kosten (1.600/0) | fassadensanierung kosten (390) | dach-fassade |
| 15 | fassade-streichen-kosten | fassade streichen kosten (1.600/0) | haus streichen kosten (720) | maler-fliesen-boeden |
| 16 | boden-verlegen-kosten | laminat verlegen kosten (1.600/0) | vinylboden verlegen kosten (880), parkett verlegen kosten (720), boden verlegen kosten (480) | maler-fliesen-boeden |
| 17 | dachdaemmung-kosten | dachdämmung kosten (1.300/0) | — | dach-fassade |
| 18 | carport-kosten | carport kosten (1.300/0) | — | garten-aussenanlagen |
| 19 | haustuer-kosten | haustür kosten (1.000/0) | haustür austauschen kosten (70) | fenster-tueren |
| 20 | bodenplatte-kosten | bodenplatte kosten (1.000/0) | — | hochbau |
| 21 | anbau-kosten | kosten anbau haus (1.000/0) | anbau kosten (390) | hochbau |
| 22 | fliesenleger-kosten | fliesenleger kosten (880/0) | fliesen verlegen kosten (590) | maler-fliesen-boeden |
| 23 | terrassenueberdachung-kosten | terrassenüberdachung kosten (880/40) | terrasse bauen kosten (320) | garten-aussenanlagen |
| 24 | fussbodenheizung-nachruesten-kosten | fußbodenheizung nachrüsten kosten (720/0) | — | heizung-waermepumpe |
| 25 | zaun-kosten | zaun kosten (590/0) | zaun setzen kosten (90) | garten-aussenanlagen |
| 26 | treppe-kosten | treppe kosten (590/0) | trockenbau kosten (320) als eigener Abschnitt nur, wenn sachlich passend — sonst eigene Seite in Welle 2 | innenausbau |
| 27 | elektrik-erneuern-kosten | elektrik erneuern kosten (480/0) | elektroinstallation kosten (210), zählerschrank erneuern kosten (140) | elektro-photovoltaik |
| 28 | hausanschluss-kosten | hausanschluss kosten (320/0) | erdarbeiten kosten (210), kanalanschluss kosten (140) | tiefbau |

Jede Leistung hat mindestens einen Ratgeber. Förder-Begriffe („wärmepumpe förderung“ 33.100 u. a.) bekommen **keine** eigene Seite: Förderbeträge dürfen laut Guardrails nicht ohne Quelle genannt werden und ändern sich laufend; die Kostenseiten verweisen allgemein auf KfW/BAFA/Energieberatung.

Abgrenzung (Kannibalisierung): Leistungsseiten zielen auf „<Gewerk>“/„<Leistung> + Region“, Ratgeber auf „… kosten“. Der Title der Leistungsseite Bad („… – Kosten, Ablauf & Fachbetrieb“) verliert „Kosten“.

### Aufbau einer Ratgeberseite

- H1 als Frage oder Klartext („Was kostet eine Wärmepumpe?“), Title ≤ 60 Zeichen mit Hauptbegriff, Description 140–160 Zeichen, ohne Jahreszahl.
- Kostenüberblick (Tabelle) mit **Spannen aus zitierfähigen Quellen** (co2online, Verbraucherzentrale, ADAC, KfW, Destatis, BKI, Energieagenturen) — jede Zahl mit Quelle und Abrufdatum in der Quellenliste; keine Firmenpreise als Beleg.
- Kostenfaktoren, Ablauf, typische Fehler, Hinweise Baden-Württemberg (nur belegt, z. B. PV-Pflicht allgemein), 4–6 FAQ, Quellen.
- 900–1.500 Wörter, eigener Text, keine Förderbeträge, keine Ersparnisversprechen, keine Rechts-/Steueranweisungen (Guardrails wie Ortsseiten).
- Strukturdaten: Article + FAQPage + BreadcrumbList.
- Daten als JSON in `app/inhalte/ratgeber-seiten/<slug>.json`, Prüfskript wie `check-orte`.

## Interne Verlinkung (Regeln aus der Vault, angepasst)

Quellen: Seitenpläne §5, Ortsunterseiten-Standard, `pruefe.py` (D1/D2), `pruefstand.ts`.

1. **Ratgeber-Hub `/ratgeber/`** gruppiert nach Bauen · Sanieren & Modernisieren · Ausbau & Außen; verlinkt alle Ratgeber. Erreichbar über Navigation („Ratgeber“), Fußzeile und Startseite.
2. **Leistungsseite → ihre Ratgeber**: Der bestehende Ratgeber-Abschnitt verlinkt jede passende Ratgeberseite mit festem Anker; Kostenblöcke werden zu kurzen Teasern (keine doppelte Kostenseite).
3. **Ratgeber → genau eine Geldseite**: ein kontextueller Link im Text auf die eigene Leistungsseite + Anfrage-Knopf (`/?leistung=<slug>#kontakt`) + 1–2 Ratgeber, die die nächste echte Nutzerfrage beantworten. Keine Money↔Money-Links ohne Kontext.
4. **Ortsseite**: Hub `/regionen/`, 3 Nachbarorte derselben Leistung, Leistungsseite, 1–2 Ratgeber der Leistung (mit einem Satz Begründung), höchstens 2 verwandte Leistungen im selben Ort (statt aller übrigen). Kein Ortsseiten-Ring über Regionen.
5. **Startseite**: Leistungskacheln (vorhanden), Link `/regionen/`, Abschnitt „Ratgeber“ mit 6 meistgesuchten Kostenseiten + Link zum Hub.
6. **Ankertabelle `app/inhalte/anker.ts`**: genau ein Ankertext je Ziel (Nomen, z. B. „Wärmepumpe Kosten“), seitenweit genutzt; Verbphrasen nur auf Knöpfen.
7. **Breadcrumbs** überall (Start › Ratgeber › Titel; Start › Leistung › Ort).
8. **Prüfskript `scripts/pruefe-links.mjs`** (gerenderter Export): verwaiste Seiten (0 redaktionelle Eingänge, Kopf/Fuß zählen nicht), Inhaltsseiten mit < 2 Textlinks, nichtssagende Anker („hier“, „mehr“ …), mehr als ein Anker je Ziel, Ratgeber ≠ genau 1 Geldlink, Links auf Umleitungen/404, Klicktiefe von der Startseite > 3. Läuft in der Prüfkette.

## Ablauf

1. Freigabe dieses Plans.
2. Code: Vorlage Ratgeberseite, Hub, Ankertabelle, Verlinkungsregeln, Prüfskript (TDD).
3. 7 Schreib-Agenten × 4 Seiten mit Agentenvorlage-Ratgeber, danach QA-Runde.
4. Prüfkette, Abschluss-Review, Doku. Kein Push ohne Anweisung.
