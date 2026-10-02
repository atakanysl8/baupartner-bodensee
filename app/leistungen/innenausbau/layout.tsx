import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/leistungen/innenausbau/' },
  title: 'Innenausbau am Bodensee – Trockenbau & Dachausbau',
  description:
    'Trockenbau, Dachgeschossausbau, Böden oder Malerarbeiten: Wir vermitteln Ihnen einen passenden Innenausbau-Fachbetrieb am Bodensee – kostenlos.',
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
