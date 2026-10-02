import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/regionen/' },
  title: 'Leistungen nach Ort – Baden-Württemberg | Bodensee BauPartner',
  description:
    'Elektriker, Maler, Dachdecker, Badsanierung, Bauunternehmen und mehr nach Ort: alle Städte in Baden-Württemberg mit eigener Seite – kostenlos anfragen.',
  openGraph: {
    title: 'Leistungen nach Ort – Bodensee BauPartner',
    description: 'Unsere Ortsseiten für Baden-Württemberg im Überblick.',
    locale: 'de_DE',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
