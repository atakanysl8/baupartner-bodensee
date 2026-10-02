import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/ratgeber/' },
  title: 'Ratgeber Baukosten: Was kosten Bau und Sanierung?',
  description:
    'Kostenratgeber für Bau, Sanierung und Ausbau: Wärmepumpe, Bad, Dach, Fenster, Photovoltaik und mehr – Preisspannen mit Quellen und Kostenfaktoren.',
  openGraph: {
    title: 'Ratgeber Baukosten – Bodensee BauPartner',
    description: 'Was kosten Bau, Sanierung und Ausbau? Kostenspannen mit Quellen.',
    locale: 'de_DE',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
