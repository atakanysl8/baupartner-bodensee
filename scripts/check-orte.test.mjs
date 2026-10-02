import { test } from 'node:test'
import assert from 'node:assert/strict'
import { pruefeSeiten } from './check-orte.mjs'

const fakt = (i) => ({ text: `Fakt ${i} über die Entwässerungssatzung mit eigenem Inhalt ${i}`, quelle: 'Stadt', url: `https://stadt.de/${i}`, abruf: '2026-10-02' })
// Füllwörter je Seite verschieden, damit nur der gewollte Fall Gleichheit erzeugt.
const text = (wort, n) => Array.from({ length: n }, (_, i) => `${wort}${i}`).join(' ')
const basis = (ort, extra = ort) => ({
  leistung: 'tiefbau', ort, ortName: ort, kreis: 'K', title: `Tiefbau in ${ort} – T`, description: `D ${ort}`, h1: `Tiefbau in ${ort}`,
  einstieg: text(extra + 'e', 120), abschnitte: [{ h2: 'A', text: text(extra + 'a', 220) }],
  fakten: [1, 2, 3, 4, 5].map(fakt), faq: [1, 2, 3].map(i => ({ q: `F${i} ${ort}?`, a: `A${i} ${extra}` })), offen: [],
})

test('gültige Seite', () => {
  assert.deepEqual(pruefeSeiten([basis('a', 'alpha')]).fehler, [])
})
test('weniger als 5 Fakten', () => {
  const s = basis('a'); s.fakten = s.fakten.slice(0, 4)
  assert.ok(pruefeSeiten([s]).fehler.some(f => f.includes('Fakten')))
})
test('Fakt ohne URL', () => {
  const s = basis('a'); s.fakten[0] = { ...s.fakten[0], url: '' }
  assert.ok(pruefeSeiten([s]).fehler.some(f => f.includes('URL')))
})
test('verbotenes Wort', () => {
  const s = basis('a'); s.einstieg += ' unsere geprüften Partnerbetriebe vor Ort'
  assert.ok(pruefeSeiten([s]).fehler.some(f => f.includes('verboten')))
})
test('doppelter Title', () => {
  const a = basis('a', 'eins'), b = basis('b', 'zwei'); b.title = a.title
  assert.ok(pruefeSeiten([a, b]).fehler.some(f => f.includes('Title')))
})
test('zu ähnlich', () => {
  assert.ok(pruefeSeiten([basis('Xstadt', 'gleich'), basis('Ydorf', 'gleich')]).fehler.some(f => f.includes('Gleichheit')))
})
test('zu kurz', () => {
  const s = basis('a'); s.einstieg = 'kurz'; s.abschnitte = [{ h2: 'A', text: 'kurz' }]
  assert.ok(pruefeSeiten([s]).fehler.some(f => f.includes('Wörter')))
})
