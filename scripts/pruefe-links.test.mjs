import { test } from 'node:test'
import assert from 'node:assert/strict'
import { analysiere } from './pruefe-links.mjs'

const seite = (inhalt, nav = '<a href="/">Start</a>') => `<html><body><nav>${nav}</nav><main>${inhalt}</main><footer><a href="/regionen/">Leistungen nach Ort</a></footer></body></html>`
// Kostenseiten erkennt das Skript am Article-Schema (sie liegen wie Ortsseiten unter /leistungen/<leistung>/<teil>/)
const artikel = (inhalt) => seite(inhalt).replace('<body>', '<body><script type="application/ld+json">{"@type":"Article"}</script>')
const K = '/leistungen/bad-sanitaer/badsanierung-kosten/'
const basis = () => ({
  '/': seite(`<a href="/leistungen/bad-sanitaer/">Badsanierung &amp; Sanitär</a> <a href="${K}">Badsanierung Kosten</a>`),
  '/regionen/': seite(`<a href="/leistungen/bad-sanitaer/stuttgart/">Badsanierung in Stuttgart</a> <a href="${K}">Badsanierung Kosten</a>`),
  '/leistungen/bad-sanitaer/': seite(`<a href="${K}">Badsanierung Kosten</a> <a href="/leistungen/bad-sanitaer/stuttgart/">Badsanierung in Stuttgart</a>`),
  '/leistungen/bad-sanitaer/stuttgart/': seite(`<a href="/leistungen/bad-sanitaer/">Badsanierung &amp; Sanitär</a> <a href="${K}">Badsanierung Kosten</a> <a href="/regionen/">Leistungen nach Ort</a>`),
  [K]: artikel('Text <a href="/leistungen/bad-sanitaer/">Badsanierung &amp; Sanitär</a> <a href="/?leistung=bad-sanitaer#kontakt">Anfrage</a> <a href="/leistungen/bad-sanitaer/stuttgart/">Badsanierung in Stuttgart</a>'),
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
test('Kostenseite ohne Geldlink', () => {
  const p = basis(); p[K] = artikel('Text <a href="/leistungen/bad-sanitaer/stuttgart/">Badsanierung in Stuttgart</a>')
  assert.ok(fehler(p).some((f) => f.includes('Geldlink')))
})
test('Kostenseite mit zwei verschiedenen Geldlinks', () => {
  const p = basis(); p['/leistungen/hochbau/'] = seite(`<a href="/">Start</a> <a href="${K}">Badsanierung Kosten</a>`)
  p[K] = p[K].replace('Text', 'Text <a href="/leistungen/hochbau/">Neubau &amp; Rohbau</a>')
  assert.ok(fehler(p).some((f) => f.includes('Geldlink')))
})
test('Ortsseite (ohne Article) braucht keinen einzelnen Geldlink', () => {
  const p = basis(); p['/leistungen/bad-sanitaer/stuttgart/'] += seite('<a href="/leistungen/hochbau/">Neubau &amp; Rohbau</a>')
  p['/leistungen/hochbau/'] = seite(`<a href="${K}">Badsanierung Kosten</a>`)
  assert.ok(!fehler(p).some((f) => f.includes('Geldlink')))
})
test('nichtssagender Ankertext', () => {
  const p = basis(); p['/leistungen/bad-sanitaer/'] = seite(`<a href="${K}">hier</a> <a href="/">Start</a>`)
  assert.ok(fehler(p).some((f) => f.includes('Anker') && f.includes('hier')))
})
test('uneinheitlicher Anker auf Kostenseite', () => {
  const p = basis(); p['/regionen/'] = p['/regionen/'].replace('>Badsanierung Kosten<', '>Was kostet ein Bad<')
  assert.ok(fehler(p).some((f) => f.includes('Ankertexte')))
})
test('toter interner Link', () => {
  const p = basis(); p['/'] += seite('<a href="/ratgeber/">Ratgeber</a>')
  assert.ok(fehler(p).some((f) => f.includes('/ratgeber/')))
})
test('Klicktiefe größer 3', () => {
  const p = basis()
  p[K] = p[K].replace('Text', 'Text <a href="/a/">A Seite</a>')
  p['/a/'] = seite('<a href="/b/">B Seite</a> <a href="/">Start</a>')
  p['/b/'] = seite('<a href="/c/">C Seite</a> <a href="/">Start</a>')
  p['/c/'] = seite('<a href="/d/">D Seite</a> <a href="/">Start</a>')
  p['/d/'] = seite('<a href="/">Start</a>')
  assert.ok(fehler(p).some((f) => f.includes('/d/') && f.includes('Klicktiefe')))
})
test('Links in Navigation und Fußzeile zählen nicht als Eingang', () => {
  const p = basis(); p['/x/'] = seite('Text <a href="/">Start</a>')
  p['/'] = p['/'].replace('<nav><a href="/">Start</a></nav>', '<nav><a href="/">Start</a><a href="/x/">X Seite</a></nav>')
  assert.ok(fehler(p).some((f) => f.includes('/x/') && f.includes('verwaist')))
})
test('Zusatz in Linkkarten (lk-zusatz) zählt nicht zum Ankertext', () => {
  const p = basis()
  p['/regionen/'] = p['/regionen/'].replace(`<a href="${K}">Badsanierung Kosten</a>`, `<a href="${K}"><span class="lk-zusatz">Badsanierung &amp; Sanitär</span><span class="lk-titel">Badsanierung Kosten</span></a>`)
  assert.deepEqual(fehler(p), [])
})
