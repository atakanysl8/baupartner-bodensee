// Erzeugt app/inhalte/ratgeber-seiten/index.ts (alle Seiten, nur für Server-Komponenten) und links.ts
// (Slug, Leistung, Anker, H1 — klein, für Client-Komponenten). Legt die Route app/ratgeber/[slug]/page.tsx
// nur an, wenn es Seiten gibt (der statische Export bricht bei einer dynamischen Route ohne Parameter ab).
// Nach jeder neuen oder gelöschten Ratgeberseite ausführen.
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
const links = seiten.map(({ slug, leistung, anker, h1, rang }) => ({ slug, leistung, anker, h1, rang }))
fs.writeFileSync(
  path.join(ordner, 'links.ts'),
  `${kopf}export type RatgeberLink = { slug: string; leistung: string; anker: string; h1: string; rang: number }\nexport const RATGEBERLINKS: RatgeberLink[] = ${JSON.stringify(links, null, 2)}\n`,
)

const dir = path.join(app, 'ratgeber', '[slug]')
if (seiten.length) {
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'page.tsx'), `${kopf}import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import RatgeberSeite from '../../components/RatgeberSeite'
import { RATGEBERSEITEN, ratgeberseite, ratgeberPfad } from '../../inhalte/ratgeber-seiten'

export const dynamicParams = false

export function generateStaticParams() {
  return RATGEBERSEITEN.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const s = ratgeberseite(slug)
  if (!s) return {}
  return {
    title: s.title,
    description: s.description,
    alternates: { canonical: ratgeberPfad(s.slug) },
    openGraph: { title: s.title, description: s.description, locale: 'de_DE', type: 'article' },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const s = ratgeberseite(slug)
  if (!s) notFound()
  return <RatgeberSeite s={s} />
}
`)
} else {
  fs.rmSync(dir, { recursive: true, force: true })
}
console.log(`${seiten.length} Ratgeberseiten im Index`)
