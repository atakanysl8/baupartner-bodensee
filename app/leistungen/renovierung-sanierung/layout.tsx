import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/leistungen/renovierung-sanierung/' },
  title: 'Sanierung am Bodensee – Kernsanierung & Altbau',
  description:
    'Kernsanierung, energetische Sanierung oder Altbau modernisieren: Wir vermitteln Ihnen einen passenden Sanierungs-Fachbetrieb am Bodensee – kostenlos.',
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
