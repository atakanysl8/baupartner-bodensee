// Erzeugt app/inhalte/orte/index.ts aus allen JSON-Dateien des Ordners und legt die Route
// app/leistungen/<leistung>/[ort]/page.tsx nur für Leistungen an, die Ortsseiten haben
// (der statische Export bricht bei einer dynamischen Route ohne Parameter ab).
// Nach jeder neuen oder gelöschten Ortsseite ausführen.
import fs from 'node:fs'
import path from 'node:path'

const app = path.join(import.meta.dirname, '..', 'app')
const ordner = path.join(app, 'inhalte', 'orte')
fs.mkdirSync(ordner, { recursive: true })
const dateien = fs.readdirSync(ordner).filter((d) => d.endsWith('.json')).sort()
const zeilen = dateien.map((d, i) => `import s${i} from './${d}'`)
fs.writeFileSync(
  path.join(ordner, 'index.ts'),
  `// generiert von scripts/orte-index.mjs — nicht von Hand ändern\nimport type { Ortsseite } from '../orte'\n${zeilen.join('\n')}\n\nexport const ORTSSEITEN = [${dateien.map((_, i) => `s${i}`).join(', ')}] as Ortsseite[]\n`,
)

const route = (l) => `// generiert von scripts/orte-index.mjs — nicht von Hand ändern
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import OrtSeite from '../../../components/OrtSeite'
import { seite, seitenFuer, pfad } from '../../../inhalte/orte'

const L = '${l}' as const
export const dynamicParams = false

export function generateStaticParams() {
  return seitenFuer(L).map((s) => ({ ort: s.ort }))
}

export async function generateMetadata({ params }: { params: Promise<{ ort: string }> }): Promise<Metadata> {
  const { ort } = await params
  const s = seite(L, ort)
  if (!s) return {}
  return {
    title: s.title,
    description: s.description,
    alternates: { canonical: pfad(s) },
    openGraph: { title: s.title, description: s.description, locale: 'de_DE', type: 'website' },
  }
}

export default async function Page({ params }: { params: Promise<{ ort: string }> }) {
  const { ort } = await params
  const s = seite(L, ort)
  if (!s) notFound()
  return <OrtSeite s={s} />
}
`
const LEISTUNGEN = ['hochbau', 'tiefbau', 'bad-sanitaer', 'innenausbau', 'renovierung-sanierung']
const mitSeiten = new Set(dateien.map((d) => d.split('--')[0]))
for (const l of LEISTUNGEN) {
  const dir = path.join(app, 'leistungen', l, '[ort]')
  if (mitSeiten.has(l)) {
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(path.join(dir, 'page.tsx'), route(l))
  } else {
    fs.rmSync(dir, { recursive: true, force: true })
  }
}
console.log(`${dateien.length} Ortsseiten im Index; Routen für: ${[...mitSeiten].join(', ') || '—'}`)
