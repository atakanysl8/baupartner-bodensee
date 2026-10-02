import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/leistungen/innenausbau/' },
  title: 'Innenausbau Bodensee – Trockenbau, Parkett & Dachausbau | Bodensee BauPartner',
  description:
    'Innenausbau-Spezialisten am Bodensee: Trockenbau, Bodenbeläge, Malerarbeiten, Dachgeschossausbau & Türen. Kostenlose Vermittlung durch Bodensee BauPartner GbR.',
  openGraph: {
    title: 'Innenausbau am Bodensee – Bodensee BauPartner',
    description:
      'Wir vermitteln Innenausbau-Fachbetriebe in der Bodenseeregion – kostenlos & unverbindlich.',
    locale: 'de_DE',
    type: 'website',
  },
}

// Strukturdaten stehen in page.tsx: ein Layout gilt auch für die Ortsseiten darunter.
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
