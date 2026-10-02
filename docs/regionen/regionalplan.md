# Regionalplan bodensee-baupartner.de — Ortsseiten Baden-Württemberg

Stand: 2026-10-02 · Spec: `docs/superpowers/specs/2026-10-02-ortsseiten-bw-design.md`

## Grundlagen

- OpenSEO-Projekt „Bodensee BauPartner – bodensee-baupartner.de“, ID `41dc81a7-47ba-43e6-becd-18e285a61ccc`, Markt Deutschland (2276), de.
- Ortsliste: Destatis-Gemeindeverzeichnis, Gebietsstand 30.09.2026, Bevölkerung 31.12.2025 (`messung/gv.xlsx`), BW (Land 08), ≥ 5.000 EW → 535 Gemeinden in 42 Kreisen (`app/inhalte/gemeinden-bw.json`, Skript `scripts/gemeinden-bw.mjs`).
  - Suchname = amtlicher Name ohne Verwaltungszusatz; geografischer Zusatz nur bei Positivliste entfernt (Volumen ist bundesweit: „weilheim“ wäre Oberbayern).
  - Ausgelassen: Weingarten (Baden) — Kurzname gleich Weingarten (Ravensburg).
- Live-Domain rankt am 02.10.2026 für genau 1 Suchbegriff („sanitärbetriebe“, Position 37, `/leistungen/bad-sanitaer/`) — Quelle: OpenSEO get_ranked_keywords.

## Messung (Credits: 2.532 vor Beginn)

| Schritt | Umfang | Credits | Rohdaten |
|---|---|---|---|
| Kostentest | 10 größte Orte × 11 Begriffe = 110 | 33 | `messung/keywords-01-kostentest.csv` |
| Vollmessung | Orte 11–150 (≥ ca. 14.000 EW) × 5 Begriffe = 700 | ca. 105 | `messung/keywords-02.json` (unverändert) |
| SERP | 20 Abfragen, Tiefe 10 | ca. 40 | Befunde unten |
| Leistungsseiten-Begriffe | 52 | ca. 15 | `messung/keywords-03-leistungsseiten.csv` |
| Ranked Keywords Domain | 1 Abruf | gering | — |

Stand nach Messung: 2.355 Credits verbleibend (177 verbraucht). Endstand nach Audit und SERP-Nachprüfung: 2.277 (255 verbraucht).

### Entscheidungen aus dem Kostentest

- **Tiefbau**: „tiefbau <ort>“ in allen 10 Großstädten navigational (Firmensuche), „erdarbeiten <ort>“ ≤ 20 → **keine Tiefbau-Ortsseiten** (RUNBOOK 7d: Absicht muss commercial sein).
- **Trockenbau**: überwiegend navigational → nicht als eigene Achse; Innenausbau nur über „innenausbau <ort>“.
- **haussanierung, badrenovierung, altbausanierung, erdarbeiten**: in Großstädten meist ≤ 20 → nur im Kostentest gemessen, nicht in der Vollmessung.
- Gemessene Begriffe der Vollmessung: badsanierung, sanierung, bauunternehmen, hausbau, innenausbau.

### Warum nicht alle 262 Orte ≥ 10.000 EW gemessen wurden

Verteilung „≥ 20 Suchen“ nach Ortsrang (Kostentest + Vollmessung):

| Begriff | Rang 1–50 | 51–100 | 101–150 |
|---|---|---|---|
| badsanierung | 37 | 4 | 1 |
| sanierung | 9 | 0 | 0 |
| bauunternehmen | 46 | 30 | 11 |
| hausbau | 31 | 5 | 0 |
| innenausbau | 9 | 0 | 0 |

Ab Rang 100 trägt praktisch nur noch „bauunternehmen“ knapp (≤ 30, oft navigational). Die restlichen 111 Orte (10.000–14.000 EW) hätten ~165 Credits gekostet für erwartbar 0–5 grenzwertige Seiten → zurückgestellt (P3), passend zu „Qualität vor Menge“ (Matei 02.10.2026).

## SERP-Befunde (02.10.2026, national, Tiefe 10)

- **bauunternehmen** (Bruchsal, Wertheim, Lörrach, Biberach, Weinheim, Heidenheim, Reutlingen, Lahr, Herrenberg, Singen): überall Local Pack + Betriebe; Verzeichnisse/Portale ranken (Gelbe Seiten überall, Houzz Weinheim, MyHammer Lörrach, werkenntdenbesten Lahr, dasoertliche) → Vermittler-Seite hat Platz. **Biberach** mehrdeutig (Riß, Kinzigtal, Heilbronn-Biberach) → ausgeschlossen. **Wertheim** Treffer zum Teil ortsfremd, Hausbau-Volumen navigational → ausgeschlossen.
- **badsanierung** (Schwetzingen, Bad Rappenau, Mosbach, Balingen, Friedrichshafen): commercial, Local Pack, Betriebe mit Stadtseiten, Houzz/Trustlocal → auch Orte mit 20 Suchen tragen.
- **sanierung** (Göppingen, Schwäbisch Gmünd, Ludwigsburg): gemischt — Wasserschaden-Dienste, städtische Förder-/Sanierungsseiten, Komplettsanierer → nur Orte ≥ 30 Suchen; Ortsseite mit Schwerpunkt Haus-/Altbau- und energetische Sanierung.
- **innenausbau** (Ludwigsburg, Esslingen): oft Schreinerei/Möbel gemeint → nur Orte ≥ 30 Suchen.

## Schwellen und Auswahl (`auswahl.json`)

| Leistung | Regel | Seiten |
|---|---|---|
| Bad & Sanitär | badsanierung ≥ 20 (ohne Brühl: Brühl NRW größer) | 41 |
| Hochbau („Bauunternehmen in <Ort>“) | bauunternehmen + hausbau ≥ 50 und Absicht commercial; navigational nur mit SERP-Beleg (8 Orte, Stufe P2); ohne Biberach, Wertheim, Rottweil, Laupheim | 38 |
| Renovierung & Sanierung | sanierung ≥ 30 | 6 |
| Innenausbau | innenausbau ≥ 30 | 5 |
| Tiefbau | keine (navigational) | 0 |
| **Gesamt** | 31 Kreise | **90** |

Jede Seite zusätzlich: ≥ 5 amtlich belegte, leistungsbezogene Ortsangaben, sonst wird sie nicht gebaut.

## Erkenntnisse für die Leistungsseiten (Task 8)

Bodensee-Begriffe haben kaum Volumen (bauunternehmen bodensee 40, bauunternehmen bodenseekreis 30, badsanierung bodensee / überlingen ohne Messwert). Stark und leicht (KD ≤ 13) sind bundesweite Kosten-/Fragebegriffe:
badsanierung kosten 4.400 · kernsanierung 2.400 · barrierefreies bad 2.400 · bodenplatte kosten 1.000 · kernsanierung kosten 1.000 · badsanierung förderung 880 · anbau kosten 390 · rohbau kosten 320 · trockenbau kosten 320 · hausanschluss kosten 320 · erdarbeiten kosten 210 · altbausanierung kosten 140 · kanalanschluss kosten 140 · drainage kosten 140 · dachgeschossausbau kosten 90.
→ Leistungsseiten bekommen Abschnitte zu diesen Fragen. Eigene Ratgeberseiten je Frage wären der nächste große Hebel (nicht im Umfang dieser Runde).
