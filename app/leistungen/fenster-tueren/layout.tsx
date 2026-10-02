import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/leistungen/fenster-tueren/' },
  title: 'Fenster austauschen & Haustüren – Fachbetrieb',
  description:
    'Fenster austauschen, neue Haustür, Rollläden oder Markise: Wir vermitteln Ihnen einen passenden Fachbetrieb in Baden-Württemberg – kostenlos.',
  openGraph: {
    title: 'Fenster austauschen & Haustüren – Fachbetrieb',
    description: 'Fenster austauschen, neue Haustür, Rollläden oder Markise: Wir vermitteln Ihnen einen passenden Fachbetrieb in Baden-Württemberg – kostenlos.',
    locale: 'de_DE',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
