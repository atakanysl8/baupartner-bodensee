import { test } from 'node:test'
import assert from 'node:assert/strict'
import { pruefeRatgeber } from './check-ratgeber.mjs'

const satz = 'Die Kosten hängen von Fläche, Ausstattung und dem Zustand der vorhandenen Leitungen ab, deshalb lohnt ein genauer Blick vorab. '
const lang = (n) => satz.repeat(n)
const gut = () => ({
  slug: 'badsanierung-kosten', leistung: 'bad-sanitaer', rang: 4, anker: 'Badsanierung Kosten', hauptbegriff: 'badsanierung kosten',
  title: 'Badsanierung Kosten: Preise und Kostenfaktoren', description: 'x'.repeat(150), h1: 'Was kostet eine Badsanierung?',
  einstieg: 'Wer ein Bad erneuert, fragt zuerst nach dem Budget. Ein Fachbetrieb für [[/leistungen/bad-sanitaer/]] klärt das am Objekt.',
  kosten: { h2: 'Kosten im Überblick', intro: lang(3), zeilen: [{ posten: 'A', spanne: '1–2 €', q: 1 }, { posten: 'B', spanne: '3–4 €', q: 2 }, { posten: 'C', spanne: '5–6 €', q: 3 }], hinweis: lang(1) },
  abschnitte: [{ h2: 'Kostenfaktoren', text: lang(20) }, { h2: 'Ablauf', text: lang(20) + 'Mehr dazu unter [[/leistungen/bad-sanitaer/barrierefreies-bad/]].' }],
  faq: [1, 2, 3, 4].map((i) => ({ q: `Frage ${i}?`, a: 'Antwort ohne Verweis.' })),
  verwandt: ['barrierefreies-bad'],
  quellen: [1, 2, 3, 4].map((i) => ({ titel: `Q${i}`, herausgeber: 'Verbraucherzentrale', url: `https://example.org/${i}`, abruf: '2026-10-02' })),
  offen: [],
})
const PLAN = [{ slug: 'badsanierung-kosten', leistung: 'bad-sanitaer' }, { slug: 'barrierefreies-bad', leistung: 'bad-sanitaer' }, { slug: 'dachgaube-kosten', leistung: 'dach-fassade' }]
const fehler = (s, andere = []) => pruefeRatgeber([s, ...andere], PLAN).fehler

test('gute Ratgeberseite ohne Fehler', () => {
  assert.deepEqual(fehler(gut()), [])
})
test('kein Link auf die eigene Leistungsseite', () => {
  const s = gut(); s.einstieg = 'Ohne Link.'
  assert.ok(fehler(s).some((f) => f.includes('Geldlink')))
})
test('zwei Links auf die eigene Leistungsseite', () => {
  const s = gut(); s.abschnitte[0].text += ' [[/leistungen/bad-sanitaer/]]'
  assert.ok(fehler(s).some((f) => f.includes('Geldlink')))
})
test('Link auf fremde Leistungsseite (Money zu Money)', () => {
  const s = gut(); s.abschnitte[0].text += ' [[/leistungen/hochbau/]]'
  assert.ok(fehler(s).some((f) => f.includes('/leistungen/hochbau/')))
})
test('Verweis auf unbekannte Kostenseite', () => {
  const s = gut(); s.abschnitte[1].text += ' [[/leistungen/bad-sanitaer/gibt-es-nicht/]]'
  assert.ok(fehler(s).some((f) => f.includes('gibt-es-nicht')))
})
test('Kostenseite unter falscher Leistung verlinkt', () => {
  const s = gut(); s.abschnitte[1].text += ' [[/leistungen/bad-sanitaer/dachgaube-kosten/]]'
  assert.ok(fehler(s).some((f) => f.includes('dachgaube-kosten')))
})
test('Kostenseite einer anderen Leistung ist erlaubt', () => {
  const s = gut(); s.abschnitte[1].text += ' [[/leistungen/dach-fassade/dachgaube-kosten/]]'
  assert.deepEqual(fehler(s), [])
})
test('alte /ratgeber/-Pfade sind ungültig', () => {
  const s = gut(); s.abschnitte[1].text += ' [[/ratgeber/barrierefreies-bad/]]'
  assert.ok(fehler(s).some((f) => f.includes('/ratgeber/')))
})
test('Kostenzeile ohne gültige Quelle', () => {
  const s = gut(); s.kosten.zeilen[0].q = 9
  assert.ok(fehler(s).some((f) => f.includes('Quelle')))
})
test('zu wenige Quellen', () => {
  const s = gut(); s.quellen = s.quellen.slice(0, 3); s.kosten.zeilen.forEach((z) => (z.q = 1))
  assert.ok(fehler(s).some((f) => f.includes('Quellen')))
})
test('FAQ-Anzahl außerhalb 4–6', () => {
  const s = gut(); s.faq = s.faq.slice(0, 3)
  assert.ok(fehler(s).some((f) => f.includes('FAQ')))
})
test('Verweis in FAQ-Antwort', () => {
  const s = gut(); s.faq[0].a += ' [[/ratgeber/barrierefreies-bad/]]'
  assert.ok(fehler(s).some((f) => f.includes('FAQ')))
})
test('zu kurz', () => {
  const s = gut(); s.abschnitte = [{ h2: 'Kurz', text: 'Kurz [[/leistungen/bad-sanitaer/]]' }]; s.einstieg = 'Kurz.'
  assert.ok(fehler(s).some((f) => f.includes('Wörter')))
})
test('Förderbetrag und Ersparnisversprechen verboten', () => {
  const s = gut(); s.abschnitte[0].text += ' Der Zuschuss beträgt bis zu 30 Prozent. So sparen Sie 500 Euro.'
  const f = fehler(s)
  assert.ok(f.some((x) => x.includes('Förder')))
  assert.ok(f.some((x) => x.includes('Ersparnis')))
})
test('Title zu lang', () => {
  const s = gut(); s.title = 'x'.repeat(61)
  assert.ok(fehler(s).some((f) => f.includes('Title')))
})
test('doppelter Title über Seiten', () => {
  const b = gut(); b.slug = 'barrierefreies-bad'; b.h1 = 'Anders?'
  assert.ok(fehler(gut(), [b]).some((f) => f.includes('doppelt')))
})
test('Steuerhinweis, Rechtsanweisung, Präsenz-„vor Ort“ und Momentangabe verboten', () => {
  for (const satz of ['Die Kosten sind nach § 35a steuerlich absetzbar.', 'Sie müssen den Antrag vorher stellen.', 'Der Handwerker vor Ort prüft das.', 'Derzeit sind die Preise hoch.']) {
    const s = gut(); s.abschnitte[0].text += ' ' + satz
    assert.ok(fehler(s).some((f) => f.includes('verbotene Formulierung')), satz)
  }
})
test('„aktueller Grundriss“ ist keine Momentangabe', () => {
  const s = gut(); s.abschnitte[0].text += ' Der aktuelle Grundriss bleibt.'
  assert.deepEqual(fehler(s), [])
})
test('Fristen aus Rechtsvorschriften verboten', () => {
  const s = gut(); s.abschnitte[0].text += ' Die Anlage ist spätestens zwölf Monate nach Fertigstellung zu installieren.'
  assert.ok(fehler(s).some((f) => f.includes('verbotene Formulierung')))
})
