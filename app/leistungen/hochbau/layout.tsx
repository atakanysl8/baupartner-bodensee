import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/leistungen/hochbau/' },
  title: 'Hochbau am Bodensee – Rohbau & Mauerwerk | Bodensee BauPartner',
  description:
    'Hochbau-Fachbetriebe in der Bodenseeregion: Rohbau, Stahlbetonbau, Mauerwerk, Fassaden & Treppen. Kostenlose Vermittlung durch Bodensee BauPartner GbR.',
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
