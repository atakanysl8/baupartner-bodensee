// generiert von scripts/ratgeber-index.mjs — nicht von Hand ändern
import type { Metadata } from 'next'
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
