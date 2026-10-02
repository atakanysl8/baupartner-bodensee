// generiert von scripts/orte-index.mjs — nicht von Hand ändern
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import OrtSeite from '../../../components/OrtSeite'
import { seite, seitenFuer, pfad } from '../../../inhalte/orte'

const L = 'garten-aussenanlagen' as const
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
