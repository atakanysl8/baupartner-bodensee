# Ratgeberseiten + interne Verlinkung Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** 28 Ratgeber-Kostenseiten unter `/ratgeber/<slug>/` plus Hub, und eine regelbasierte interne Verlinkung (Ankertabelle, Linkregeln je Seitentyp, Prüfskript).
**Architecture:** Ratgeber als JSON in `app/inhalte/ratgeber-seiten/` (wie Ortsseiten), generierter Index + kleine Linkliste für Client-Komponenten, Server-Komponente `RatgeberSeite`. Textverweise als `[[/pfad/]]`, Anker aus `app/inhalte/anker.ts`. Prüfung am gerenderten Export mit `scripts/pruefe-links.mjs`.
**Tech Stack:** Next.js 16 (statischer Export), Node-Skripte mit `node --test`.
**Spec:** `docs/superpowers/specs/2026-10-02-ratgeber-verlinkung-design.md`

## Global Constraints

- Guardrails wie Ortsseiten (Agentenvorlage Abschnitt 7): keine Präsenz/Netzwerk, keine Förderbeträge, keine Ersparnisversprechen, keine Rechts-/Steueranweisungen, „Die Kosten tragen die Fachbetriebe.“ als einziger Geld-Satz.
- Jede Kostenzahl mit Quelle + Abrufdatum aus zitierfähiger, nicht-kommerzieller Quelle (Verbraucherzentrale, co2online, ADAC, KfW, BAFA, Destatis, Energieagenturen, Landesportale); Herstellerseiten nur, wenn keine neutrale Quelle existiert, und dann als Herstellerangabe gekennzeichnet.
- Interne Links mit Schrägstrich am Ende; Anker je Ziel einheitlich aus `anker.ts`.
- Nur lokal, Commits als Matei, kein Push.

## Review Focus

1. Ratgeber mit 0 oder >1 Geldlink (Leistungsseite) im Text.
2. Kannibalisierung: Leistungsseiten-Title mit „Kosten“.
3. Client-Bundle: Ratgeber-Texte dürfen nicht in Client-Chunks landen (nur `links.ts`).
4. Ortsseiten-Linkblock nach Umbau: Nachbarn + Leistung + Ratgeber + ≤ 2 verwandte Leistungen + Hub.
5. Verwaiste Seiten und Klicktiefe > 3.

### Task 1: Ratgeber-Datenmodell, Vorlage, Hub, Musterseite, Inhaltsprüfung
- [ ] Test `scripts/check-ratgeber.test.mjs` (Pflichtfelder, ≥ 4 Quellen, Kosten-Zeile verweist auf vorhandene Quelle, 4–6 FAQ, 800–1.600 Wörter, genau ein `[[/leistungen/<eigene>/]]`, nur bekannte Linkziele, verbotene Muster) → RED.
- [ ] `scripts/check-ratgeber.mjs`, `scripts/ratgeber-index.mjs` (index.ts, links.ts, Route nur bei Seiten), `app/inhalte/ratgeber-seiten.ts` (Typ, Helfer), `app/inhalte/anker.ts`, `app/components/TextMitLinks.tsx`, `RatgeberSeite.tsx`, `app/ratgeber/page.tsx` (Hub), Musterseite `badsanierung-kosten.json` → GREEN; Commit.

### Task 2: Verlinkung im Bestand
- [ ] Nav/Startseiten-Nav: Punkt „Ratgeber“; Footer: „Ratgeber“; Startseite: Abschnitt mit 6 Kostenratgebern + Hub-Link; Sitemap.
- [ ] `LeistungRatgeber`: Liste „Ratgeber zu <Leistung>“ aus `links.ts`.
- [ ] `OrtSeite`: Linkblock = 3 Nachbarn, Leistungsseite, 1–2 Ratgeber, ≤ 2 verwandte Leistungen (VERWANDT) im Ort, Hub.
- [ ] Title Leistungsseite Bad ohne „Kosten“; Commit.

### Task 3: Prüfskript Verlinkung
- [ ] Test `scripts/pruefe-links.test.mjs` (verwaist, Ratgeber-Geldlink ≠ 1, nichtssagender Anker, Anker-Uneinheitlichkeit bei Ratgeber-Zielen, Klicktiefe > 3, toter Link) → RED → `scripts/pruefe-links.mjs` → GREEN; Befunde im Bestand beheben; Commit.

### Task 4: 27 Ratgeberseiten schreiben + QA
- [ ] `docs/ratgeber/agentenvorlage-ratgeber.md`, Gruppen `docs/ratgeber/wellen/*.json` (7 × ~4), Agenten, Nachprüfung, QA-Runde, `check-ratgeber` 0 Fehler; Commit.

### Task 5: Endkontrolle + Doku
- [ ] Indizes, Tests, Checks, tsc, Build, pruefe-seo, pruefe-bundle, pruefe-links, Quellen-Check, Browser; Baubericht-Nachtrag, Memory, OpenSEO-Researchlog; Abschluss-Review; Commit.
