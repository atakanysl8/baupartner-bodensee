# Agentenvorlage — Ortsseiten Bodensee BauPartner (Baden-Württemberg)

Stand 2026-10-02. Diese Vorlage wird während des Laufs nicht geändert.

## 1. Wer wir sind (verbindlich)

Bodensee BauPartner GbR (Überlingen) ist ein **Vermittler** von Bau- und Handwerksleistungen. Wir führen keine Arbeiten aus, sind weder Bauleiter noch Generalunternehmer und nicht Vertragspartner des Ausführungsvertrags. Ablauf: Der Kunde schildert sein Vorhaben über das Formular, wir wählen **einen** passenden Fachbetrieb aus, der sich beim Kunden meldet. Für Kunden kostenlos und unverbindlich. Einziger erlaubter Satz zum Geld: „Die Kosten tragen die Fachbetriebe.“

## 2. Dein Auftrag

- Repo: `C:\Users\matei\OneDrive\Dokumente\Bodensee BauPartner GbR\baupartner-bodensee` (Arbeitsverzeichnis).
- Du bekommst **eine Gruppendatei** `docs/regionen/wellen/<gruppe>.json`. Lege **nur** die dort genannten Seiten an — keine zusätzlichen.
- Je Seite **sofort nach Fertigstellung** eine Datei `app/inhalte/orte/<leistung>--<ort>.json` schreiben (nicht alle am Ende).
- Unklare Rechtsfragen in `docs/regionen/anwaltsfragen/<gruppe>.md` (Seite, Textstelle, Frage, Vorschlag).
- Sonst keine Dateien ändern. Kein git, kein Build, keine Unteragenten.

## 3. Dateiformat (exakt)

```json
{
  "leistung": "bad-sanitaer",
  "ort": "ravensburg",
  "ortName": "Ravensburg",
  "kreis": "Ravensburg",
  "title": "Badsanierung Ravensburg – Fachbetrieb kostenlos vermittelt",
  "description": "140–160 Zeichen, Nutzen + Ort + „kostenlos“, kein Superlativ.",
  "h1": "Badsanierung in Ravensburg",
  "einstieg": "2–4 Sätze: Lage und Anliegen des Besuchers in diesem Ort, nicht mit „Wir“ beginnen.",
  "abschnitte": [
    { "h2": "Eigene Zwischenüberschrift mit Ortsbezug", "text": "Ein Absatz, 80–160 Wörter." }
  ],
  "fakten": [
    { "text": "Ein bis zwei Sätze, leistungsbezogen, mit Ortsbezug.", "quelle": "Stadt Ravensburg – Stadtwerke", "url": "https://…", "abruf": "2026-10-02" }
  ],
  "faq": [ { "q": "Frage?", "a": "Antwort in 1–3 Sätzen." } ],
  "offen": [ "Was du nicht sicher belegen konntest (wird nicht angezeigt)." ]
}
```

Felder `leistung`, `ort`, `ortName`, `kreis` aus der Gruppendatei übernehmen (`ortName` = Feld `ortName`).

| Leistung | `h1` | Title-Muster (≤ 60 Zeichen, je Seite eindeutig) |
|---|---|---|
| bad-sanitaer | Badsanierung in <Ort> | Badsanierung <Ort> – Fachbetrieb kostenlos vermittelt |
| hochbau | Bauunternehmen in <Ort> | Bauunternehmen <Ort> – kostenlos vermittelt |
| renovierung-sanierung | Sanierung in <Ort> | Sanierung <Ort> – Fachbetrieb kostenlos vermittelt |
| innenausbau | Innenausbau in <Ort> | Innenausbau <Ort> – Fachbetrieb kostenlos vermittelt |

Ist der Title zu lang, kürze den Zusatz („– kostenlos vermittelt“). Kein „|“ und kein Markenname im Title.

## 4. Umfang und Aufbau

- 300–600 Wörter gesamt (Einstieg + Abschnitte + Fakten + FAQ). 2–3 Abschnitte, **mindestens 5 Fakten**, 3–5 FAQ.
- Jeder Abschnitt hat echten Ortsbezug (Zuständigkeiten, Satzungen, Programme, Besonderheiten des Ortes) — keine austauschbaren Textbausteine, keine Sätze, die in jeder Stadt gleich wären.
- Seiten derselben Gruppe und derselben Leistung müssen sich deutlich unterscheiden (Prüfskript misst Textgleichheit; Ziel < 20 %).
- Ein Abschnitt darf erklären, wie die Anfrage über uns läuft — höchstens 2 Sätze, einmal je Seite.
- Keine Meta-Sätze über die Seite selbst („Diese Seite fasst zusammen …“, „Im Folgenden …“).
- **Keine FAQ zu den Vermittlungskosten** („Was kostet mich die Vermittlung?“): Das steht bereits im Kasten am Seitenende; dieselbe Antwort auf vielen Seiten würde als Duplikat gewertet. Alle FAQ müssen ortsbezogen sein.

## 5. Leistungsbezogene Ortsquellen (nur amtliche oder zuständige Stellen)

Fakten müssen zur Leistung passen — dadurch unterscheiden sich die Seiten desselben Ortes:

- **bad-sanitaer**: örtlicher Wasserversorger und Wasserhärte (Härtebereich/°dH aus Trinkwasseranalyse), Abwasser/Grundstücksentwässerung bei Umbau, Wohnraumanpassung/Pflegestützpunkt bzw. Wohnberatung des Landkreises, Energieberatung (Warmwasser), barrierefreies Bauen (Landesbauordnung BW nur allgemein).
- **renovierung-sanierung**: Sanierungsgebiete der Städtebauförderung (Stadt), Denkmalschutz/Gesamtanlagen (Stadt, Landesamt für Denkmalpflege), regionale Energieagentur, kommunale Förderprogramme (nur nennen, keine Beträge ohne Quelle), kommunale Wärmeplanung (Stadt), Gutachterausschuss.
- **hochbau**: untere Baurechtsbehörde (Stadt oder Landratsamt — prüfen, wer zuständig ist), Bebauungspläne/Geoportal der Stadt, Bauplatzvergabe/Baugebiete, Stellplatzsatzung, Bodenrichtwerte (Gutachterausschuss/BORIS-BW), Baugrund (LGRB-Kartenviewer), Hochwasser-/Starkregengefahrenkarten (LUBW/Stadt).
- **innenausbau**: Altstadt-/Gestaltungssatzung, Denkmalschutz (auch innen), Dachgeschossausbau und Baurecht (Baurechtsbehörde), Energieberatung, Brandschutz-Zuständigkeit (nur allgemein).

Gute Quellen: Website der Stadt (Bauen/Wohnen, Satzungen/Ortsrecht), Stadtwerke/Wasserversorger, Landratsamt, Regierungspräsidium, LUBW, LGRB, Landesamt für Denkmalpflege, regionale Energieagentur, BORIS-BW. **Keine** Firmenseiten, keine Portale (MyHammer, Houzz, Gelbe Seiten), keine Wikipedia als alleinige Quelle.

## 6. Recherche-Werkzeuge

- **Keine WebSearch** (Kontingent ist geteilt und schnell erschöpft).
- Nutze WebFetch (falls nur als Name bekannt: per ToolSearch „select:WebFetch“ laden) oder `curl -sL -A "Mozilla/5.0"` auf Stadt-Websites, deren Sitemap (`/sitemap.xml`) oder Suchfunktion.
- polizei-bw.de und manche Landesportale blocken Abrufe — dann andere Quelle.
- Jede Fakt-URL selbst geöffnet haben. Abrufdatum = heute (2026-10-02 oder das tatsächliche Datum).

## 7. Verboten (Guardrails + Anwaltsregeln — streichen statt umformulieren)

- Behaupten oder andeuten, wir hätten Betriebe, Partner, ein Netzwerk oder eine Niederlassung in diesem Ort; Netzwerkgröße.
- „geprüft“, „zertifiziert“, „beste/r“, „perfekt“, „Garantie“, „Top“, Bewertungen/Sterne, Kundenzahlen, Referenzen.
- Reaktionszeit-Zusagen („innerhalb von 24 Stunden“), Notdienst, „rund um die Uhr“.
- Firmennamen (auch der Wasserversorger nur als Institution nennen, wenn er Stadtwerke/Zweckverband ist — das ist erlaubt; private Handwerksfirmen nie).
- Bußgelder, Rechtsfolgen, Handlungsanweisungen in Rechts- oder Förderfragen („Sie müssen …“, „beantragen Sie …“). Stattdessen neutral: „zuständig ist …“, „Auskunft gibt …“, „in der Regel“, „grundsätzlich“.
- Zusagen im Namen von Behörden, Banken oder Betrieben; Förderbeträge oder Fristen ohne Quelle; datierte Momentangaben („derzeit acht Wochen“, „bis Ende 2026“).
- Erlösmodell (Provision, Leadpreis) — nur „Die Kosten tragen die Fachbetriebe.“
- Banale Erklärungen (Definitionen des Offensichtlichen), FAQ mit offensichtlicher Antwort, Wiederholungen.
- Das Prüfskript lehnt u. a. diese Wörter ab: geprüft, zertifiziert, beste, perfekt, garant…, 24/7, Notdienst, Partnerbetrieb, Netzwerk, Niederlassung, Bewertung, Sterne, Bußgeld, Provision.

Hinweis: Die Handwerkskammer Freiburg hat Städteseiten von Vermittlungsportalen kritisiert (PM 53/26, 17.09.2026, § 5 UWG). Deshalb: keine Aussage, die eine örtliche Präsenz oder einen örtlichen Betrieb vortäuscht. Formulierung für den Ablauf: „Wir wählen für Ihre Anfrage einen passenden Fachbetrieb aus.“

## 8. Ton

Sachlich, freundlich, konkret. Leser ist Eigentümer/Bauherr mit konkretem Vorhaben. Erst sein Anliegen und die örtlichen Rahmenbedingungen, dann das Angebot. Sie-Form. Keine Werbesprache.

## 9. Abschluss

1. `node scripts/check-orte.mjs <leistung>--` ist für deine Dateien fehlerfrei (Aufruf je Leistung deiner Gruppe; Präfixfilter). Warnungen zu Gleichheit > 20 % innerhalb deiner Gruppe beheben.
2. Rückmeldung (kurz): angelegte Seiten; nicht angelegte Seiten mit Grund (z. B. < 5 belegbare Fakten); Unsicherheiten (Feld `offen`), die ich prüfen soll; Anzahl Anwaltsfragen.
