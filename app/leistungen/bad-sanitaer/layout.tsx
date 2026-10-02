import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/leistungen/bad-sanitaer/' },
  title: 'Badsanierung am Bodensee – Ablauf & Fachbetrieb vermittelt',
  description:
    'Badsanierung, barrierefreies Bad oder neues Gäste-WC: Wir vermitteln Ihnen einen passenden Sanitär-Fachbetrieb am Bodensee – kostenlos und unverbindlich.',
  openGraph: {
    title: 'Badsanierung & Sanitär am Bodensee – Bodensee BauPartner',
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
