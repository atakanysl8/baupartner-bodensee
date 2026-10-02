# Agentenvorlage 2 — Ortsseiten für die neuen Leistungsbereiche

Stand 2026-10-02. Ergänzt `docs/regionen/agentenvorlage.md`. **Lies zuerst die ganze `agentenvorlage.md`.** Ihre Abschnitte 1, 3 (Dateiformat), 4, 6, 7, 8 und 9 gelten unverändert. Diese Datei ersetzt nur die Angaben unten.

## A. Gruppendatei

Deine Gruppendatei liegt in `docs/regionen/wellen-2/<gruppe>.json` (nicht `wellen/`). Anwaltsfragen nach `docs/regionen/anwaltsfragen/<gruppe>.md`.

Für einige Orte gibt es schon Ortsseiten anderer Leistungen (`app/inhalte/orte/<andere-leistung>--<ort>.json`). Lies sie, damit du **nichts doppelst**: Dieselben Fakten und dieselben Sätze dürfen auf deiner Seite nicht noch einmal stehen. Deine Seite braucht eigene, zur Leistung passende Fakten. Ändere diese Dateien nicht.

## B. H1 und Title je Leistung

| Leistung | `h1` | Title-Muster (≤ 60 Zeichen, je Seite eindeutig) |
|---|---|---|
| elektro-photovoltaik | Elektriker in <Ort> | Elektriker <Ort> – Fachbetrieb kostenlos vermittelt |
| maler-fliesen-boeden | Maler und Fliesenleger in <Ort> | Maler & Fliesenleger <Ort> – kostenlos vermittelt |
| dach-fassade | Dachdecker in <Ort> | Dachdecker <Ort> – Fachbetrieb kostenlos vermittelt |
| heizung-waermepumpe | Wärmepumpe und Heizung in <Ort> | Wärmepumpe <Ort> – Heizungsbauer kostenlos vermittelt |
| garten-aussenanlagen | Terrassenüberdachung in <Ort> | Terrassenüberdachung <Ort> – kostenlos vermittelt |

`<Ort>` = Feld `ortName`. Ist der Title zu lang, kürze den Zusatz. Kein „|“, kein Markenname.

Inhaltlicher Schwerpunkt:
- **elektro-photovoltaik**: Elektroinstallation und Modernisierung, Zählerschrank, Wallbox, Photovoltaik und Speicher. Suchbegriff „Elektriker <Ort>“ im Einstieg und in einer Zwischenüberschrift.
- **maler-fliesen-boeden**: Maler- und Fassadenarbeiten, Fliesen, Bodenbeläge. „Maler“ und „Fliesenleger“ kommen beide im Text vor.
- **dach-fassade**: Dachsanierung, Dachdämmung, Dachfenster, Dachbegrünung, Fassade. „Dachdecker <Ort>“ im Einstieg.
- **heizung-waermepumpe**: Heizungstausch, Wärmepumpe (Luft, Erdwärme), Anschluss an Wärmenetze. „Wärmepumpe“ und „Heizung“ im Einstieg.
- **garten-aussenanlagen**: Terrassenüberdachung, Carport, Zaun, Pflaster und Außenanlagen. „Terrassenüberdachung <Ort>“ im Einstieg.

## C. Leistungsbezogene Ortsquellen (nur amtliche oder zuständige Stellen)

- **elektro-photovoltaik**: örtlicher Netzbetreiber (Stadtwerke/Netzgesellschaft als Institution; Netzanschluss, Anmeldung von PV und Wallbox läuft über den Netzbetreiber), Solarpotenzial im Energieatlas BW bzw. Solarkataster der Stadt/LUBW, Photovoltaik-Pflicht in Baden-Württemberg **nur allgemein** (Klimaschutzgesetz BW; keine Fristen, keine Anweisungen), regionale Energieagentur, kommunale Wärmeplanung, Klimaschutzkonzept der Stadt, Gestaltungs- oder Denkmalvorgaben für Solaranlagen in der Altstadt.
- **heizung-waermepumpe**: kommunaler Wärmeplan (Stadt; Eignungsgebiete Wärmenetz/Einzelversorgung), Fernwärme/Wärmenetze der Stadtwerke und ggf. Satzung mit Anschluss- und Benutzungszwang (nur als Wiedergabe), Erdwärme: Informationssystem Oberflächennahe Geothermie (ISONG, LGRB) und Zuständigkeit der unteren Wasserbehörde (Stadt oder Landratsamt, wörtlich belegen), Wasserschutzgebiete, regionale Energieagentur, Klimaschutzkonzept.
- **dach-fassade**: Gestaltungs-/Altstadtsatzung (Dachform, Dacheindeckung, Dachgauben, Solaranlagen), Denkmalschutz/Gesamtanlagen, Dachbegrünung in Bebauungsplänen oder städtische Gründach-Programme (ohne Beträge), Solarkataster/Energieatlas, Starkregen-Gefahrenkarten, Energieagentur.
- **maler-fliesen-boeden**: Gestaltungssatzung oder Farbleitplan/Fassadengestaltung (Stadt), Fassadenprogramme der Stadt (ohne Beträge), Denkmalschutz und Sanierungsgebiete (Fassade, Fenster, Putz), Altstadt-Gestaltungsbeirat, Energieagentur (Fassadendämmung), Wasserversorger nur, wenn für Fliesen relevant (z. B. Kalk in Bad und Küche, mit Analysewert und Stand).
- **garten-aussenanlagen**: verfahrensfreie Vorhaben nach Landesbauordnung BW **nur so, wie die Stadt oder das Land es selbst darstellt** (keine eigene Auslegung, keine Maße aus dem Gedächtnis), Bebauungsplan/Geoportal, Baumschutzsatzung, gesplittete Abwassergebühr/Niederschlagswassergebühr (überdachte und versiegelte Flächen), Einfriedungs- oder Gestaltungssatzung, Nachbarrecht nur allgemein (Nachbarrechtsgesetz BW, keine Abstände nennen).

Gute Quellen wie in Abschnitt 5 der `agentenvorlage.md`, dazu: Energieatlas BW, LGRB/ISONG, Marktstammdatenregister (Bundesnetzagentur; nur mit Stand). **Keine** Herstellerseiten, keine Firmenseiten, keine Portale.

## D. Zusätzlich verboten

- Förderprogramme mit Beträgen, Fördersätzen oder Fristen (BEG, KfW, Landesprogramme): höchstens allgemein „Förderprogramme von Bund und Land“ mit Verweis auf die Energieagentur.
- Aussagen zu Pflichten des Lesers (GEG, PV-Pflicht, Anschlusszwang) als Anweisung. Nur Wiedergabe: „Das Klimaschutzgesetz BW sieht … vor“, „laut Satzung …“.
- Leistungsversprechen zu Ersparnis, Erträgen, Amortisation, Stromkosten.
