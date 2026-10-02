import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/leistungen/hochbau/' },
  title: 'Bauunternehmen am Bodensee – Hochbau & Rohbau vermittelt',
  description:
    'Neubau, Rohbau, Anbau oder Aufstockung: Wir vermitteln Ihnen ein passendes Bauunternehmen am Bodensee – kostenlos und unverbindlich, ein Betrieb je Anfrage.',
  openGraph: {
    title: 'Hochbau am Bodensee – Bodensee BauPartner',
    description:
      'Wir vermitteln Hochbau-Fachbetriebe in der Bodenseeregion – kostenlos & unverbindlich.',
    locale: 'de_DE',
    type: 'website',
  },
}

// Strukturdaten stehen in page.tsx: ein Layout gilt auch für die Ortsseiten darunter.
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
