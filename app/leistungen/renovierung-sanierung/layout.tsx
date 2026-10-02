import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/leistungen/renovierung-sanierung/' },
  title: 'Energetische Sanierung Bodensee – KfW Förderung & Kernsanierung | Bodensee BauPartner',
  description:
    'Sanierungs-Fachbetriebe am Bodensee: Kernsanierung, Heizungsaustausch, Dämmung & KfW-Förderung. Kostenlose Vermittlung durch Bodensee BauPartner GbR.',
  openGraph: {
    title: 'Renovierung & Sanierung am Bodensee – Bodensee BauPartner',
    description:
      'Wir vermitteln Sanierungs-Fachbetriebe in der Bodenseeregion – kostenlos & unverbindlich.',
    locale: 'de_DE',
    type: 'website',
  },
}

// Strukturdaten stehen in page.tsx: ein Layout gilt auch für die Ortsseiten darunter.
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
