import { test } from 'node:test'
import assert from 'node:assert/strict'
import { pruefeSeite } from './pruefe-seo.mjs'

const gut = `<html><head><title>T</title><meta name="description" content="D"><link rel="canonical" href="https://www.bodensee-baupartner.de/x/"></head><body><nav><a href="/impressum/">i</a></nav><h1>H</h1><footer><a href="/impressum">I</a><a href="/datenschutz">D</a><a href="/fuer-fachbetriebe">F</a></footer></body></html>`

test('gute Seite ohne Fehler', () => {
  assert.deepEqual(pruefeSeite(gut, '/x/'), [])
})
test('fehlender Canonical', () => {
  assert.ok(pruefeSeite(gut.replace(/<link[^>]+>/, ''), '/x/').some(f => f.includes('Canonical')))
})
test('Canonical auf andere Seite', () => {
  assert.ok(pruefeSeite(gut, '/y/').some(f => f.includes('Canonical')))
})
test('zwei H1', () => {
  assert.ok(pruefeSeite(gut.replace('<h1>H</h1>', '<h1>A</h1><h1>B</h1>'), '/x/').some(f => f.includes('H1')))
})
test('fehlender Pflichtlink im Footer', () => {
  assert.ok(pruefeSeite(gut.replace('<a href="/fuer-fachbetriebe">F</a>', ''), '/x/').some(f => f.includes('fuer-fachbetriebe')))
})
test('doppelter Schema-Typ (z. B. zwei FAQPage)', () => {
  const ld = '<script type="application/ld+json">{"@type":"FAQPage"}</script>'
  const html = gut.replace('</head>', ld + '<script type="application/ld+json">[{"@type":"Service"},{"@type":"FAQPage"}]</script></head>')
  assert.ok(pruefeSeite(html, '/x/').some(f => f.includes('FAQPage')))
})
test('OneDrive-Konfliktkopie erkannt', async () => {
  const { istKonfliktkopie } = await import('./pruefe-seo.mjs')
  assert.equal(istKonfliktkopie('index-LAPTOP-DEU06RDV.html'), true)
  assert.equal(istKonfliktkopie('page-LAPTOP-DEU06RDV-LAPTOP-DEU06RDV.js'), true)
  assert.equal(istKonfliktkopie('index.html'), false)
  assert.equal(istKonfliktkopie('395-45337087cfcb33c3.js'), false)
})
