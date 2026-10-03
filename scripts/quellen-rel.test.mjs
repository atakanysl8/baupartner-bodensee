import { test } from 'node:test'
import assert from 'node:assert/strict'
import { quellenRel } from '../app/inhalte/quellen-rel.ts'

test('amtliche und neutrale Quellen werden normal verlinkt', () => {
  for (const u of ['https://www.destatis.de/x', 'https://um.baden-wuerttemberg.de/y', 'https://www.co2online.de/z', 'https://www.energieagentur-kreis-konstanz.de/', 'https://www.verbraucherzentrale.de/a'])
    assert.equal(quellenRel(u), 'noopener', u)
})
test('kommerzielle Quellen bleiben nofollow', () => {
  for (const u of ['https://www.schwaebisch-hall.de/x', 'https://www.commerzbank.de/y', 'https://www.wohnglueck.de/z', 'kein-link'])
    assert.equal(quellenRel(u), 'nofollow noopener', u)
})
