# QA-Liste Ratgeberseiten (02.10.2026)

Prüft `app/inhalte/ratgeber-seiten/<slug>.json` gegen `docs/ratgeber/agentenvorlage-ratgeber.md` und `docs/regionen/agentenvorlage.md` Abschnitt 7. Bearbeite **nur** die Slugs aus deinem Auftrag. Kein Code, kein git, kein Build.

## Allgemein (jede Seite)

1. **Jede Zahl gegen die Quelle prüfen:** Quelle öffnen (curl -sL -A "Mozilla/5.0" oder WebFetch), Wert wörtlich vorhanden? Abweichung → korrigieren oder streichen. Quelle nicht erreichbar → in `offen` vermerken.
2. **Quellenqualität:** Handwerksfirmen, Vermittlungsportale (MyHammer, aroundhome, Check24, Houzz), Foren → ersetzen oder streichen. Finanz-/Darlehensvermittler (Interhyp, Dr. Klein, Wohnglück/Impleco) nur, wenn nichts Besseres auffindbar; dann im `herausgeber` klar benennen („Wohnglück.de (Impleco GmbH, Darlehensvermittler)“). Werte mit Erhebungsjahr vor 2023 nur mit Jahr.
3. **Gesetz:** Das GEG heißt laut gesetze-im-internet.de jetzt Gebäudemodernisierungsgesetz (GModG). Wo ein Gesetz genannt wird: „Gebäudemodernisierungsgesetz (früher Gebäudeenergiegesetz)“, keine Paragrafen-Pflichten als Anweisung, keine EnEV.
4. **Rechtliche Einordnung:** keine eigenen Subsumtionen („fällt nicht unter …“, „ist genehmigungsfrei“). Nur wörtliche Wiedergabe mit Quelle + „verbindlich beurteilt das die untere Baurechtsbehörde“.
5. **Förderung:** nur der Standardsatz (Programme von Bund/Land, Auskunft KfW/BAFA/Energieberatung). Förderbedingungen („nur bei Fachunternehmen“, „Einzelmaßnahme nicht förderfähig“) → streichen.
6. **Eigene Rechnungen:** nur einfache, im Text erklärte Multiplikationen einer Quellen-Spanne; selbst gebildete Durchschnitte/Divisionen → streichen.
7. **Verboten** (Vorlage Abschnitt 5): Förderbeträge, Steuerhinweise, Ersparnis, Rechtsanweisungen, „vor Ort“ + Betrieb, Momentangaben, Firmen-/Markennamen außer Quellen-Herausgebern, pauschale Genehmigungsgebühren ohne BW-Bezug.
8. **Links:** genau ein `[[/leistungen/<eigene>/]]` im Fließtext; 1–2 `[[/ratgeber/…/]]`, Satz liest sich mit dem Anker natürlich; keine Verweise in FAQ.
9. **Qualität:** Hauptbegriff in Title, H1, Einstieg und Kosten-H2; keine Wiederholungen; FAQ beantworten echte Fragen. 800–1.600 Wörter, ≥ 4 Quellen, ≥ 5 Kostenzeilen nach Änderungen.
10. Grund jeder Änderung in `offen` („QA 02.10.: …“).

## Bekannte Stellen (aus den Schreibberichten)

- haus-bauen-kosten: Rohbau je m² widersprüchlich (SH 1.000–1.500, Commerzbank 1.500–2.000) → beide Quellen als Spanne nennen oder Widerspruch offenlegen; Destatis 2.611 €/m² nur über SH zitiert → Herausgeber kennzeichnen („nach Destatis, zitiert von …“).
- anbau-kosten: Nebenkosten-Prozente stammen aus Neubau-Aufstellung → kennzeichnen oder streichen; 1.400–2.000 €/m² als grobe Schätzung kennzeichnen.
- bodenplatte-kosten: 80 cm Frosttiefe nur Commerzbank → „in der Regel“, keine regionale Aussage.
- photovoltaik-kosten: PV-Pflicht BW „ist … spätestens zwölf Monate … zu installieren“ → als Wiedergabe der Verordnung („Die Verordnung sieht vor …“).
- wallbox-kosten: FAQ „Darf ich selbst anschließen? – Nein“ → Wiedergabe VZ; ADAC-Stichprobe 2022 in FAQ → prüfen/streichen; Smart-Meter-Preisobergrenze (Betrag?) → kein Betrag.
- fussbodenheizung-nachruesten-kosten: „Fräsen als Einzelmaßnahme nicht förderfähig“ → streichen (Förderregeln ändern sich).
- waermepumpe-kosten: VZ BW Spanne ohne Erhebungszeitraum → kennzeichnen oder streichen; Kostenzeilen mehrzeilig formatiert (egal).
- kernsanierung-kosten: Quelle schreibt „200er-Jahre“, Agent machte „2000er-Jahre“ daraus → Quelle prüfen, sonst Satz streichen (keine eigene Deutung).
- energetische-sanierung: selbst errechneter €/m²-Wert in FAQ → streichen.
- hausanschluss-kosten: Kanalanschluss-Beispiel Hannover → wenn möglich BW-Gemeinde (Satzung/Gebührenblatt) ersetzen, sonst klar als Beispiel außerhalb BW kennzeichnen; Stadtwerke-Preise nur als Beispiel mit Stand.
- elektrik-erneuern-kosten: haustec-Werte ohne Erhebungsjahr → als „Angabe haustec (Stand Seite 10/2025)“ kennzeichnen.
- Alle Seiten: Gesetzesbezeichnung GEG/„Gebäudemodernisierungsgesetz (GModG)“ uneinheitlich, Rechtslage im Wandel → keine Paragrafen/Pflichtdetails; höchstens „gesetzliche Anforderungen an Dämmung/Heizung (Gebäudeenergiegesetz bzw. Nachfolgeregelung); Auskunft gibt die Energieberatung“. Einheitlich über alle Ratgeber.
- dachsanierung-kosten: SH 400–600 vs. Commerzbank 250–400 €/m² — beide genannt, ok; Commerzbank-Neueindeckung 80–140 ok.
- dachgaube-kosten: Hauptquelle Wüstenrot „Marktrichtwerte 2026“ → als Angabe Wüstenrot kennzeichnen.
- GESETZ: Laut gesetze-im-internet.de heißt das GEG jetzt Gebäudemodernisierungsgesetz (GModG), 10-%-Regel § 36 (Agent r4 geprüft). Einheitlich: „Gebäudemodernisierungsgesetz (GModG, früher GEG)“ nur wo nötig, ohne Pflicht-Anweisung; keine EnEV-Nennung. Auch Leistungsseiten-Texte (app/inhalte/leistungsseiten/*.ts, ratgeber.ts) auf „GEG“ prüfen.
- fassade-streichen-kosten: Dr. Klein (Baufinanzierungsvermittler) als Preisquelle → möglichst ersetzen/entfernen; Spannen als Bank-/Bausparkassenangaben kennzeichnen.
- boden-verlegen-kosten: Vinyl über BKI „PVC-Belag“ → so benennen.
- wintergarten-kosten: eigene rechtliche Einordnung (Wohnwintergarten ≠ Anhang 1 Nr. 1 k) → entfernen, nur „ob verfahrensfrei, beurteilt die Baurechtsbehörde“; GEG/EnEV nicht nennen.
- zaun-kosten: FAQ Höhe/§ 11 NRG → als Wiedergabe mit Quelle, keine eigene Zusammenfassung „keine feste Grenze“; Holzzaun-Wert Montage unklar → kennzeichnen.
- Garten-Seiten: pauschale Genehmigungskosten (500/650 €) aus Bankenratgebern → entfernen. LBO-Anhang-1-Zitate (Fassung 16.03.2026) als Wiedergabe ok.
- haustuer-kosten, treppe-kosten: fast nur Wohnglück.de (Impleco GmbH, Darlehensvermittler, undatiert) → Herausgeber so kennzeichnen; wenn möglich neutrale Zusatzquelle (BKI via Bausparkasse/LBS) ergänzen.
- fenster/haustuer: „GEG Anlage 7“ → GModG prüfen (gesetze-im-internet.de/geg), Benennung anpassen; RC-2-Polizeiempfehlung nur indirekt → als Angabe der Quelle kennzeichnen oder streichen.
- barrierefreies-bad: Interhyp (Vermittler, 02/2024) Preise ohne Erhebungsquelle → kennzeichnen.

## Abschluss

`node scripts/check-ratgeber.mjs <slug>` je bearbeiteter Seite ohne FEHLER. Rückmeldung knapp: je Seite was geändert wurde, Werte die nicht bestätigt werden konnten.
