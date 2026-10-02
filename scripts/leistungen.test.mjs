// Prüft die zentrale Leistungsliste app/inhalte/leistungen.ts gegen die Routen unter app/leistungen/.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const quelle = fs.readFileSync(path.join(import.meta.dirname, '..', 'app', 'inhalte', 'leistungen.ts'), 'utf8')
const eintraege = [...quelle.matchAll(/^\s*'([a-z-]+)': \{ slug: '([a-z-]+)', gruppe: '([a-z]+)', name: '([^']+)', kurz: '([^']+)', chip: '([^']+)'/gm)]
  .map(([, key, slug, gruppe, name, kurz, chip]) => ({ key, slug, gruppe, name, kurz, chip }))

test('11 Leistungen mit Schlüssel = Slug', () => {
  assert.equal(eintraege.length, 11)
  for (const e of eintraege) assert.equal(e.key, e.slug)
})
test('jede Gruppe ist bauen, sanieren oder ausbau', () => {
  for (const e of eintraege) assert.ok(['bauen', 'sanieren', 'ausbau'].includes(e.gruppe), e.slug)
})
test('Formular-Chips sind eindeutig', () => {
  assert.equal(new Set(eintraege.map((e) => e.chip)).size, eintraege.length)
})
test('jede Leistung hat eine Seite unter app/leistungen/<slug>/page.tsx', () => {
  for (const e of eintraege) assert.ok(fs.existsSync(path.join(import.meta.dirname, '..', 'app', 'leistungen', e.slug, 'page.tsx')), e.slug)
})
