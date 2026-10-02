import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/leistungen/tiefbau/' },
  title: 'Tiefbau am Bodensee – Erdarbeiten & Kanalanschluss',
  description:
    'Erdarbeiten, Kanalanschluss, Hausanschluss oder Drainage: Wir vermitteln Ihnen einen passenden Tiefbaubetrieb am Bodensee – kostenlos und unverbindlich.',
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
