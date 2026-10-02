# QA-Runde Ortsseiten Bodensee BauPartner (02.10.2026)

Endkontrolle aller Dateien in `app/inhalte/orte/*.json` nach `docs/regionen/agentenvorlage.md` (Abschnitte 3–8).
Bearbeite **nur** die Dateien deines Buchstabenbereichs (Anfangsbuchstabe des Ortes nach `--`). Kein Code, kein git, kein Build.
Übernommen aus der MAAS-QA-Liste (Vault, Stand 02.10.2026) und an diese Website angepasst.

## Allgemein (jede Datei)

Nur sichtbarer Text zählt: `title`, `description`, `h1`, `einstieg`, `abschnitte`, `fakten[].text`, `faq` (nicht `offen`).

1. **Momentangaben/datierte Termine:** Sprechzeiten, Hotline-Zeiten, „derzeit“, „aktuell“, „zurzeit“, Bearbeitungsstände, künftige Starttermine, Verkaufsstarts, Bewerbungsfristen → streichen oder ohne Datum/Zeit fassen. **Erlaubt** bleiben dauerhafte Fakten mit Datum („seit 2025 nur digitale Bauanträge“, „Satzung vom …“, Analysewerte „Stand 12/2025“, historische Ereignisse).
2. **Befristete, ausgeschöpfte oder beendete Förderprogramme** (Laufzeitende 2026, „Mittel ausgeschöpft“, „geschlossen“) → streichen. Regelmäßig neu aufgelegte städtische Programme dürfen ohne Beträge/Fristen bleiben, mit Verweis auf die Stadt („über die aktuellen Bedingungen informiert die Stadt“). **Förderbeträge und Fördersätze nie im sichtbaren Text.**
3. **Veraltete Zahlen** ohne Stand oder mit Stand vor 2023 → streichen (Analysewerte, Satzungsinhalte und Strukturzahlen mit Quelle dürfen bleiben).
4. **Zuständigkeitsbehauptungen ohne wörtlichen Beleg** („die Stadt ist untere Baurechtsbehörde“, wenn das nur abgeleitet ist — siehe `offen`) → neutral fassen („Bauanträge nimmt die Stadt … entgegen“, „zuständig ist laut Stadt …“).
5. **Nicht geprüfte Inhalte** (laut `offen` nicht gelesene PDFs/Satzungen, aus Bildern abgelesene Werte mit Unsicherheitsvermerk) → nur Existenz/Titel nennen, keine Inhalte daraus; unsichere Einzelwerte streichen.
6. **Verbotenes** (Vorlage Abschnitt 7): Netzwerk/Partner/Betriebe im Ort, Superlative, „geprüft“, Garantien, Tempo-Zusagen, Notdienst, Firmennamen von Handwerksbetrieben, Bußgelder, **Rechtsfolgen** (z. B. Versicherung zahlt nicht), **Handlungsanweisungen in Rechts- oder Förderfragen** („Sie müssen …“, „beantragen Sie …“, „ist … zu stellen“) → neutral („zuständig ist …“, „Auskunft gibt …“, „in der Regel“, „grundsätzlich“).
7. **Meta-Sätze** („Diese Seite …“, „Im Folgenden …“) und **FAQ zu Vermittlungskosten** → streichen/ersetzen.
8. **Versorger-Namen:** Stadtwerke, Zweckverbände und städtische Betriebe dürfen genannt werden (auch als GmbH/AG); keine privaten Handwerks- oder Planungsfirmen.
9. Nach Streichungen muss jede Seite noch **≥ 5 Fakten** (mit URL), **3–5 FAQ**, **300–600 Wörter** und **2–3 Abschnitte** haben. Entfernte Tatsachen auch aus `fakten` nehmen, wenn sie nicht mehr auf der Seite stehen (die Quellenliste wird angezeigt) — außer sie belegen noch andere Aussagen. Kommen keine 5 Fakten mehr zusammen: **melden, nicht löschen.**
10. Grund jeder Änderung in `offen` notieren („QA 02.10.: … entfernt“).

## Bekannte Stellen

- **hochbau--singen**: Programm „Wohnimpuls“ ist bis 31.12.2026 befristet → Abschnitt/Fakt/FAQ dazu streichen und ersetzen (Punkt 2).
- **hochbau--donaueschingen**: Ortskernförderung, Mittel 2026 ausgeschöpft → nur neutral ohne Mittelstand oder streichen.
- **bad-sanitaer--stuttgart / renovierung-sanierung--stuttgart**: städtische Programme ohne Beträge/Fristen lassen, nur neutral mit Verweis.
- **bad-sanitaer--boeblingen, hochbau--ravensburg, hochbau--donaueschingen, hochbau--offenburg, hochbau--balingen, hochbau--esslingen, hochbau--tuebingen, hochbau--leonberg, hochbau--heidenheim, hochbau--rastatt, hochbau--baden-baden, hochbau--konstanz**: Baurechts-Zuständigkeit nur abgeleitet → Punkt 4 prüfen.
- **Seiten mit Satzungspflichten** (Rückstausicherung, Entwässerungsantrag, Genehmigung im Sanierungsgebiet, Erhaltungssatzung, Gesamtanlage): als Wiedergabe der Satzung formulieren („die Satzung sieht vor …“), keine Anweisung an den Leser.
- Bereits bereinigt (nicht erneut anfassen, nur prüfen): bad-sanitaer--friedrichshafen (Förderbetrag), bad-sanitaer--bietigheim-bissingen (KlimaBonus), renovierung-sanierung--karlsruhe (KlimaBonus), renovierung-sanierung--mannheim, hochbau--weinheim, hochbau--goeppingen.

## Abschluss

`node scripts/check-orte.mjs <leistung>--` für jede Leistung, in der du Dateien geändert hast — ohne FEHLER für deine Dateien. Melde knapp: je geänderter Datei, was entfernt/geändert wurde; Seiten, die unter 5 Fakten fallen.
