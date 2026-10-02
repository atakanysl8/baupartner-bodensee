# Agentenvorlage — Ratgeberseiten (Kosten) Bodensee BauPartner

Stand 2026-10-02. Lies zuerst `docs/regionen/agentenvorlage.md` Abschnitt 1 (Wer wir sind), 7 (Verboten) und 8 (Ton). Sie gelten unverändert.

## 1. Auftrag

- Repo: `C:\Users\matei\OneDrive\Dokumente\Bodensee BauPartner GbR\baupartner-bodensee`.
- Deine Gruppendatei `docs/ratgeber/wellen/<gruppe>.json` nennt die Seiten (Slug, Leistung, Anker, Hauptbegriff, Nebenbegriffe, Rang). Lege **nur** diese an, jede als `app/inhalte/ratgeber-seiten/<slug>.json`, sofort nach Fertigstellung.
- **Vorbild:** `app/inhalte/ratgeber-seiten/badsanierung-kosten.json` — gleiches Format, gleiche Sorgfalt. Seitenplan aller 28 Ratgeber: `docs/ratgeber/seitenplan.json`.
- Unklare Rechtsfragen nach `docs/regionen/anwaltsfragen/ratgeber-<gruppe>.md`. Sonst keine Dateien ändern, kein git, kein Build, keine Unteragenten.

## 2. Format und Felder

Wie die Musterseite. Felder `slug`, `leistung`, `rang`, `anker`, `hauptbegriff` aus der Gruppendatei übernehmen.

- `title`: ≤ 60 Zeichen, beginnt mit dem Anker bzw. Hauptbegriff („Wärmepumpe Kosten: …“), keine Jahreszahl, kein „|“, kein Markenname.
- `description`: 140–160 Zeichen, Nutzen + Hauptbegriff, keine Jahreszahl, kein Superlativ.
- `h1`: natürliche Frage („Was kostet eine Wärmepumpe?“).
- `einstieg`: 3–5 Sätze. Hauptbegriff sinngemäß im ersten Absatz.
- `kosten`: `h2` mit Hauptbegriff, `intro`, **mindestens 5 Zeilen** `{ posten, spanne, q }` (q = Nummer der Quelle, 1-basiert), optional `hinweis`.
- `abschnitte`: 3–5 Abschnitte, je 100–250 Wörter. Nebenbegriffe als Zwischenüberschrift oder FAQ, wo es natürlich passt.
- `faq`: 4–6, Antworten 1–3 Sätze, **ohne** Verweise `[[…]]`.
- `verwandt`: 1–2 Slugs aus dem Seitenplan (nächste echte Nutzerfrage, möglichst gleiche oder benachbarte Leistung).
- `quellen`: mindestens 4, `{ titel, herausgeber, url, abruf }`.
- `offen`: was du nicht sicher belegen konntest (wird nicht angezeigt).
- Umfang: 900–1.500 Wörter sichtbarer Text (Prüfung: 800–1.600).

## 3. Interne Links (Pflicht)

- Im Fließtext (einstieg, kosten.intro/hinweis, abschnitte) steht **genau ein** Verweis `[[/leistungen/<eigene-leistung>/]]` — natürlich eingebettet, z. B. „… wählen wir einen Fachbetrieb für [[/leistungen/bad-sanitaer/]] aus …“. Der Linktext wird automatisch gesetzt (Ankertabelle), also so formulieren, dass der Leistungsname grammatisch passt.
- 1–2 Verweise `[[/ratgeber/<slug>/]]` auf Ratgeber aus dem Seitenplan, nur wo sie die nächste Frage beantworten (Linktext = Anker aus dem Seitenplan, z. B. „Dachdämmung Kosten“ → Satz wie „… erklärt der Ratgeber [[/ratgeber/dachdaemmung-kosten/]].“).
- **Keine** Verweise auf andere Leistungsseiten, keine externen Links im Text (externe nur in `quellen`), keine Verweise in FAQ.

## 4. Zahlen und Quellen (wichtig)

- **Jede Zahl in der Kostentabelle und im Text stammt wörtlich aus einer genannten Quelle**, die du selbst geöffnet hast. Keine eigenen Hochrechnungen außer einfacher, im Text erklärter Multiplikation einer Quellen-Spanne.
- Quellenrang: (1) neutral/öffentlich: Verbraucherzentrale, co2online, ADAC, KfW, BAFA, Destatis, BKI, Energieagenturen, Landesportale (z. B. Zukunft Altbau BW, Energieatlas BW), Stiftung Warentest, Finanztip; (2) Banken/Bausparkassen-Ratgeber (Schwäbisch Hall, LBS, Commerzbank), Fachpresse (haustec, SBZ); (3) Herstellerangaben nur, wenn nichts Neutrales existiert, dann im Herausgeber als „Herstellerangabe“ kennzeichnen.
- **Verboten als Quelle:** Handwerks-/Montagefirmen, Vermittlungsportale (MyHammer, aroundhome, Houzz, Check24, Daa), Foren, Wikipedia allein, KI-Zusammenfassungen.
- Preisentwicklung: Destatis-Pressemitteilung vom 10.07.2026 (Baupreise Mai 2026) darf zitiert werden: https://www.destatis.de/DE/Presse/Pressemitteilungen/2026/07/PD26_241_61261.html — Gewerkewerte dort: Ausbau +5,1 %, Heiz-/Wassererwärmung inkl. Wärmepumpen +5,0 %, Elektro +6,4 %, Dachdeckung und Zimmer-/Holzbau +7,3 %, Instandhaltung Wohngebäude +5,6 % (je ggü. Mai 2025). Selbst öffnen und prüfen.
- Werte mit Erhebungsjahr vor 2023 nur mit Jahr nennen oder weglassen.

## 5. Zusätzlich verboten (Prüfskript lehnt ab)

- Förderbeträge und Fördersätze („bis zu 30 %“, „70 % Zuschuss“, „x Euro Bonus“). Erlaubt: „Für … gibt es Förderprogramme des Bundes (BEG über KfW bzw. BAFA); Bedingungen ändern sich, Auskunft geben KfW, BAFA und Energieberatung.“
- Steuerhinweise (Handwerkerbonus, § 35a, § 35c EStG, Abschreibungen).
- Ersparnis-/Renditeversprechen („sparen Sie“, „amortisiert sich“, „rechnet sich nach x Jahren“).
- Rechtsanweisungen („Sie müssen …“, „beantragen Sie …“); Pflichten nur als Wiedergabe mit Quelle („Das GEG sieht vor …“, „Laut Photovoltaik-Pflicht-Verordnung BW …“).
- „vor Ort“ zusammen mit Betrieben/Handwerkern (Präsenzandeutung) → „am Objekt“, „beim Termin“.
- Datierte Momentangaben („derzeit“, „aktuell“, „2026 gilt“), Lieferzeiten, Wartezeiten.
- Firmen- und Markennamen (außer Quellen-Herausgeber).

## 6. Abschluss

1. `node scripts/check-ratgeber.mjs <slug>` für jede deiner Seiten: 0 Fehler (Hinweis: Verweise auf Ratgeber, die andere Agenten noch schreiben, sind erlaubt, solange der Slug im Seitenplan steht).
2. Rückmeldung kurz: angelegte Seiten mit Wortzahl und Quellenzahl, Unsicherheiten (`offen`), Anwaltsfragen.
