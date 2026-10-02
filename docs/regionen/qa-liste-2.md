# QA-Runde 2 — neue Ortsseiten (02.10.2026)

Prüft die 100 neuen Seiten `app/inhalte/orte/{elektro-photovoltaik,maler-fliesen-boeden,dach-fassade,heizung-waermepumpe,garten-aussenanlagen}--*.json`.
Regeln: Abschnitt „Allgemein“ (Punkte 1–10) aus `docs/regionen/qa-liste.md` gilt vollständig, dazu `docs/regionen/agentenvorlage-2.md` Abschnitt D.
Bearbeite **nur** Dateien deines Buchstabenbereichs (Anfangsbuchstabe des Ortes nach `--`). Kein Code, kein git, kein Build.

## Zusätzlich in dieser Runde

11. **Wortzahl** 300–600 sichtbare Wörter; Seiten darüber kürzen (Wiederholungen, allgemeine Sätze zuerst).
12. **Steuerhinweise** (§ 7h, § 10f, § 11a EStG, Abschreibung) → streichen.
13. **Fachaussagen ohne Quelle**, die wie Tatsachen klingen (z. B. Asbest in Altbelägen, Leistungsgrenzen in kVA/Wp aus Zusammenfassungen) → streichen oder allgemein ohne Zahl.
14. **„vor Ort“** in Verbindung mit Fachbetrieb/Handwerker → umformulieren (keine Präsenzandeutung).
15. **Abgeleitete Regeln** (z. B. Denkmalregel auf Solar übertragen) → Wortlaut der Quelle.
16. **Förderbedingungen** aus Pressemitteilungen, Programme mit „derzeit keine Mittel“, „pausiert“, „gestoppt“ oder nur alter Beleg → streichen bzw. nur Verweis auf die Programmseite der Stadt.

## Bekannte Stellen (aus den Schreibberichten)

- elektro-photovoltaik--heidelberg: städtische PV-Förderung „seit 1.7.2026“ → ohne Datum fassen.
- maler-fliesen-boeden--pforzheim: Gestaltungssatzung nur über Seitenbilder gelesen, Leitfarben-Anhang nicht gesehen → nur belegte Inhalte.
- garten-aussenanlagen--goeppingen: Belag „mit Blick auf gebührenrelevante Fläche“ → kein Ersparnisversprechen.
- maler-fliesen-boeden--kornwestheim: Satzung 1995 Scan → Inhalte vorsichtig, Stand nennen.
- Ludwigsburg: Förderrichtlinie 2007 Gültigkeit unklar → streichen, wenn nicht belegt.
- Schorndorf (elektro/maler): Bauordnungssatzung 1968/1978 → nur als „Satzung … (Stand 2006)“ wiedergeben oder streichen.
- Fellbach: Hinweis § 7h/§ 10f EStG (Steuer) → streichen (Rechts-/Steuerauskunft). Solarstatistik ohne klares Bezugsjahr → streichen.
- Weinstadt dach: Sanierungsgebiet Beutelsbach „sobald …“ → prüfen.
- Allgemein: „beste…“ (karlsruhe dach/heizung, ravensburg maler, waiblingen dach?), Description-Länge bruchsal/ettlingen/freiburg dach, ludwigsburg elektro.
- hochbau--baden-baden: Gesamtanlage „2008“ prüfen — Satzung Beschluss 22.10.2018, in Kraft 01.11.2018.
- maler-fliesen-boeden--rastatt: Gestaltungssatzung Scan, Datum unbekannt → Inhalte vorsichtig.
- dach-fassade--ettlingen: Satzung nur über Ausstellungstafel 2016 belegt; Dachbegrünungsprogramm „keine Haushaltsmittel“ → Programm streichen (Momentangabe).
- elektro-photovoltaik--boeblingen: Satz zu Bearbeitungszeiten nach Netzübernahme („mehr Abstimmung“) → streichen (Momentangabe).
- maler-fliesen-boeden--boeblingen: FAQ Faserzementplatten verweist auf „Fachbetrieb vor Ort“ → keine Präsenzandeutung; Denkmalbehörde nur über Formular belegt.
- elektro-photovoltaik--leonberg: „Solarmodule am Kulturdenkmal genehmigungspflichtig“ abgeleitet → Wortlaut Stadt („sämtliche Aufbauten“).
- dach-fassade--stuttgart / maler--stuttgart: Zuschussrichtlinie 6/13 von 1990, Anwendung unbestätigt → streichen oder nur Existenz.
- Weitere Fundstellen „beste/geprüft“: elektro konstanz, elektro offenburg, dach mannheim.
- dach-fassade--offenburg: Gebührenfaktor Gründach 0,4 → als Satzungswiedergabe ohne Ersparnisaussage.
- maler/dach Lörrach: „Begonnen werden darf erst nach Vorliegen der Genehmigung“ → Wiedergabe („laut … “), keine Anweisung.
- Freiburg: Netzbetreiber nur über Faktenblatt Juli 2025 belegt — ok mit Quelle.
- elektro-photovoltaik--singen: Netzbetreiber nur über Verfahrensbrief 2021 belegt (Thüga Energienetze) → neutral „örtlicher Netzbetreiber“ oder Stand nennen.
- Konstanz: Förderrichtlinie energetische Sanierung (Stand 31.10.2024) → nur Existenz, Verweis Stadt.
- Konstanz Solarkataster: PDF nicht gelesen → nur Existenz.
- Alte Satzungen Konstanz 1982, Ravensburg 1976 → Wiedergabe mit Jahr, keine Pflichtaussage.
- garten-aussenanlagen--ravensburg: Mitteilungspflicht Abwassersatzung (>10 m², 1 Monat) → Wiedergabe „laut Satzung“.
- maler-fliesen-boeden--reutlingen: „beste“ (Gruppe 21 läuft).
- elektro--tuebingen/balingen: Werte (3,6 kVA, 12 kVA, 2.000 Wp, 960 Wp, Steuerbox) nur aus WebFetch-Zusammenfassung → streichen, wenn nicht wörtlich prüfbar.
- elektro--balingen: Denkmalregel auf Solar übertragen → Wortlaut Stadt.
- maler--tuebingen: § 17 Stadtbildsatzung nur an historischen Straßen → Geltungsbereich klar nennen.
- dach--reutlingen: Asbestdach/PV „gesetzlich untersagt“ als Wiedergabe der Stadt; FAQ-Zusatz „Das Dach wird also … zuerst saniert“ streichen.
- maler--schwaebisch-gmuend: Fassadenprogramm nur über PM 2019 → streichen (Punkt 2/3).
- garten--ulm: allgemeine Einordnung verfahrensfreie Vorhaben ohne Quelle → prüfen; dach--ulm Starkregenkarten unklar → nur belegtes.
- Mannheim (Gruppe 15): Seiten 620–670 Wörter → auf ≤ 600 kürzen.
- Mannheim: Förderbedingungen aus PM 10.03.2026 → nur Existenz, keine Bedingungen (jährlich wechselnd).
- heizung--mannheim: 15 % EWärmeG BW mit veralteter Quelle (EEWärmeG) → streichen; Fernwärme-Anschlusspflicht FAQ als Wiedergabe.
- maler--mannheim: Steuerhinweis §§ 7h, 10f, 11a EStG → streichen; Asbest-Satz ohne Quelle → allgemein oder streichen.

## Abschluss

`node scripts/check-orte.mjs <leistung>--` für jede Leistung, in der du Dateien geändert hast — ohne FEHLER. Melde knapp je geänderter Datei, was entfernt/geändert wurde; Seiten, die unter 5 Fakten oder 300 Wörter fallen.
