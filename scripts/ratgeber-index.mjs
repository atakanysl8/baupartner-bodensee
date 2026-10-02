// Erzeugt app/inhalte/ratgeber-seiten/index.ts (alle Kostenseiten, nur für Server-Komponenten) und links.ts
// (Pfad, Slug, Leistung, Anker, H1 — klein, für Client-Komponenten). Die Kostenseiten liegen unter ihrer Leistung
// (/leistungen/<leistung>/<slug>/); die Route dafür legt scripts/orte-index.mjs an (gemeinsam mit den Ortsseiten).
// Nach jeder neuen oder gelöschten Kostenseite ausführen, danach orte-index.
import fs from 'node:fs'
import path from 'node:path'

const app = path.join(import.meta.dirname, '..', 'app')
const ordner = path.join(app, 'inhalte', 'ratgeber-seiten')
fs.mkdirSync(ordner, { recursive: true })
const dateien = fs.readdirSync(ordner).filter((d) => d.endsWith('.json')).sort()
const seiten = dateien.map((d) => JSON.parse(fs.readFileSync(path.join(ordner, d), 'utf8'))).sort((a, b) => a.rang - b.rang)
const kopf = '// generiert von scripts/ratgeber-index.mjs — nicht von Hand ändern\n'

fs.writeFileSync(
  path.join(ordner, 'index.ts'),
  `${kopf}import type { Ratgeberseite } from '../ratgeber-seiten'\n${dateien.map((d, i) => `import s${i} from './${d}'`).join('\n')}\n\nexport const RATGEBERSEITEN = ([${dateien.map((_, i) => `s${i}`).join(', ')}] as Ratgeberseite[]).sort((a, b) => a.rang - b.rang)\n`,
)
const links = seiten.map(({ slug, leistung, anker, h1, rang }) => ({ pfad: `/leistungen/${leistung}/${slug}/`, slug, leistung, anker, h1, rang }))
fs.writeFileSync(
  path.join(ordner, 'links.ts'),
  `${kopf}export type RatgeberLink = { pfad: string; slug: string; leistung: string; anker: string; h1: string; rang: number }\nexport const RATGEBERLINKS: RatgeberLink[] = ${JSON.stringify(links, null, 2)}\n`,
)
// frühere eigene Route /ratgeber/<slug>/ entfernen
fs.rmSync(path.join(app, 'ratgeber', '[slug]'), { recursive: true, force: true })
console.log(`${seiten.length} Kostenseiten im Index`)
