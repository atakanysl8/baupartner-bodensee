import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/leistungen/tiefbau/' },
  title: 'Tiefbau am Bodensee – Erdarbeiten & Kanalbau | Bodensee BauPartner',
  description:
    'Tiefbau-Fachbetriebe in der Bodenseeregion: Erdarbeiten, Fundamentierung, Kanal- & Leitungsbau, Straßenbau. Kostenlose Vermittlung durch Bodensee BauPartner GbR.',
  openGraph: {
    title: 'Tiefbau am Bodensee – Bodensee BauPartner',
    description:
      'Wir vermitteln Tiefbau-Fachbetriebe in der Bodenseeregion – kostenlos & unverbindlich.',
    locale: 'de_DE',
    type: 'website',
  },
}

// Strukturdaten stehen in page.tsx: ein Layout gilt auch für die Ortsseiten darunter.
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
