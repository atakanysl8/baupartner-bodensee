import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/leistungen/bad-sanitaer/' },
  title: 'Badezimmer renovieren Bodensee – Sanitärbetriebe | Bodensee BauPartner',
  description:
    'Sanitärbetriebe für Badsanierung, barrierefreies Bad & Badezimmer-Renovierung am Bodensee. Kostenlose Vermittlung durch Bodensee BauPartner GbR.',
  openGraph: {
    title: 'Bad & Sanitär am Bodensee – Bodensee BauPartner',
    description:
      'Wir vermitteln Sanitärbetriebe in der Bodenseeregion – kostenlos & unverbindlich.',
    locale: 'de_DE',
    type: 'website',
  },
}

// Strukturdaten stehen in page.tsx: ein Layout gilt auch für die Ortsseiten darunter.
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
