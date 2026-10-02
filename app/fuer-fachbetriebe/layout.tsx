import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Für Fachbetriebe – Zusammenarbeit mit Bodensee BauPartner',
  description:
    'Sie sind Handwerks- oder Baubetrieb in der Bodenseeregion? Bodensee BauPartner ist offen für Zusammenarbeit – melden Sie sich einfach per E-Mail.',
  alternates: { canonical: '/fuer-fachbetriebe/' },
  openGraph: {
    title: 'Für Fachbetriebe – Bodensee BauPartner',
    description: 'Handwerks- und Baubetriebe aus der Bodenseeregion: Wir sind offen für Zusammenarbeit.',
    locale: 'de_DE',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
