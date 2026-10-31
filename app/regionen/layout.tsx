import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/regionen/' },
  title: 'Leistungen nach Ort am Bodensee | Bodensee BauPartner',
  description:
    'Elektriker, Maler, Dachdecker, Badsanierung und Bauunternehmen nach Ort: alle Orte am Bodensee mit eigener Seite – kostenlos anfragen.',
  openGraph: {
    title: 'Leistungen nach Ort – Bodensee BauPartner',
    description: 'Unsere Ortsseiten am Bodensee im Überblick.',
    locale: 'de_DE',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
