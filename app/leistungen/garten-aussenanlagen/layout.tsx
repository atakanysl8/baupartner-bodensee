import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/leistungen/garten-aussenanlagen/' },
  title: 'Terrassenüberdachung, Pflaster & Zaun – vermittelt',
  description:
    'Terrassenüberdachung, Pflasterarbeiten, Zaunbau oder Carport: Wir vermitteln Ihnen einen passenden Fachbetrieb in Baden-Württemberg – kostenlos.',
  openGraph: {
    title: 'Terrassenüberdachung, Pflaster & Zaun – vermittelt',
    description: 'Terrassenüberdachung, Pflasterarbeiten, Zaunbau oder Carport: Wir vermitteln Ihnen einen passenden Fachbetrieb in Baden-Württemberg – kostenlos.',
    locale: 'de_DE',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
