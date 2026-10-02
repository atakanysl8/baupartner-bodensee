import { test } from 'node:test'
import assert from 'node:assert/strict'
import { analysiere } from './pruefe-links.mjs'

const seite = (inhalt, nav = '<a href="/">Start</a>') => `<html><body><nav>${nav}</nav><main>${inhalt}</main><footer><a href="/ratgeber/">Ratgeber</a></footer></body></html>`
const basis = () => ({
  '/': seite('<a href="/leistungen/bad-sanitaer/">Badsanierung &amp; Sanitär</a> <a href="/ratgeber/">Ratgeber Baukosten</a>'),
  '/leistungen/bad-sanitaer/': seite('<a href="/ratgeber/badsanierung-kosten/">Badsanierung Kosten</a> <a href="/">Start</a>'),
  '/ratgeber/': seite('<a href="/ratgeber/badsanierung-kosten/">Badsanierung Kosten</a> <a href="/leistungen/bad-sanitaer/">Badsanierung &amp; Sanitär</a>'),
  '/ratgeber/badsanierung-kosten/': seite('Text <a href="/leistungen/bad-sanitaer/">Badsanierung &amp; Sanitär</a> <a href="/?leistung=bad-sanitaer#kontakt">Anfrage</a> <a href="/ratgeber/">Ratgeber Baukosten</a>'),
})
const fehler = (p) => analysiere(p).fehler

test('sauberes Netz ohne Fehler', () => {
  assert.deepEqual(fehler(basis()), [])
})
test('verwaiste Seite (nur über Navigation erreichbar)', () => {
  const p = basis(); p['/ueber-uns/'] = seite('Text <a href="/">Start</a>')
  p['/'] = p['/'].replace('<a href="/">Start</a>', '<a href="/">Start</a><a href="/ueber-uns/">Über uns</a>')
  assert.ok(fehler(p).some((f) => f.includes('/ueber-uns/') && f.includes('verwaist')))
})
test('Ratgeber ohne Geldlink', () => {
  const p = basis(); p['/ratgeber/badsanierung-kosten/'] = seite('Text <a href="/ratgeber/">Ratgeber Baukosten</a>')
  p['/leistungen/bad-sanitaer/'] += ''
  assert.ok(fehler(p).some((f) => f.includes('Geldlink')))
})
test('Ratgeber mit zwei verschiedenen Geldlinks', () => {
  const p = basis(); p['/leistungen/hochbau/'] = seite('<a href="/">Start</a> <a href="/ratgeber/">Ratgeber Baukosten</a>')
  p['/ratgeber/badsanierung-kosten/'] = p['/ratgeber/badsanierung-kosten/'].replace('Text', 'Text <a href="/leistungen/hochbau/">Neubau &amp; Rohbau</a>')
  assert.ok(fehler(p).some((f) => f.includes('Geldlink')))
})
test('nichtssagender Ankertext', () => {
  const p = basis(); p['/leistungen/bad-sanitaer/'] = seite('<a href="/ratgeber/badsanierung-kosten/">hier</a> <a href="/">Start</a>')
  assert.ok(fehler(p).some((f) => f.includes('Anker') && f.includes('hier')))
})
test('uneinheitlicher Anker auf Ratgeber-Ziel', () => {
  const p = basis(); p['/ratgeber/'] = p['/ratgeber/'].replace('>Badsanierung Kosten<', '>Was kostet ein Bad<')
  assert.ok(fehler(p).some((f) => f.includes('Ankertexte')))
})
test('toter interner Link', () => {
  const p = basis(); p['/'] += seite('<a href="/gibt-es-nicht/">X Seite</a>')
  assert.ok(fehler(p).some((f) => f.includes('/gibt-es-nicht/')))
})
test('Klicktiefe größer 3', () => {
  const p = basis()
  p['/ratgeber/badsanierung-kosten/'] = p['/ratgeber/badsanierung-kosten/'].replace('Text', 'Text <a href="/a/">A Seite</a>')
  p['/a/'] = seite('<a href="/b/">B Seite</a> <a href="/">Start</a>')
  p['/b/'] = seite('<a href="/c/">C Seite</a> <a href="/">Start</a>')
  p['/c/'] = seite('<a href="/">Start</a>')
  assert.ok(fehler(p).some((f) => f.includes('/c/') && f.includes('Klicktiefe')))
})
test('Links in Navigation und Fußzeile zählen nicht als Eingang', () => {
  const p = basis(); p['/x/'] = seite('Text <a href="/">Start</a>')
  p['/'] = p['/'].replace('<nav><a href="/">Start</a></nav>', '<nav><a href="/">Start</a><a href="/x/">X Seite</a></nav>')
  assert.ok(fehler(p).some((f) => f.includes('/x/') && f.includes('verwaist')))
})
