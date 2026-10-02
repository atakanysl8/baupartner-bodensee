// generiert von scripts/orte-index.mjs — nicht von Hand ändern
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import OrtSeite from '../../../components/OrtSeite'
import RatgeberSeite from '../../../components/RatgeberSeite'
import { seite, seitenFuer, pfad } from '../../../inhalte/orte'
import { kostenseite, kostenseitenFuer, kostenPfad } from '../../../inhalte/ratgeber-seiten'

const L = 'heizung-waermepumpe' as const
export const dynamicParams = false

export function generateStaticParams() {
  return [...seitenFuer(L).map((s) => ({ ort: s.ort })), ...kostenseitenFuer(L).map((s) => ({ ort: s.slug }))]
}

export async function generateMetadata({ params }: { params: Promise<{ ort: string }> }): Promise<Metadata> {
  const { ort } = await params
  const k = kostenseite(L, ort)
  if (k) {
    return {
      title: k.title,
      description: k.description,
      alternates: { canonical: kostenPfad(k) },
      openGraph: { title: k.title, description: k.description, locale: 'de_DE', type: 'article' },
    }
  }
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
  const k = kostenseite(L, ort)
  if (k) return <RatgeberSeite s={k} />
  const s = seite(L, ort)
  if (!s) notFound()
  return <OrtSeite s={s} />
}
