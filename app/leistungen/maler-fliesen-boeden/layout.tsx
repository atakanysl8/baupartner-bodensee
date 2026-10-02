import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/leistungen/maler-fliesen-boeden/' },
  title: 'Maler, Fliesenleger & Bodenleger – vermittelt',
  description:
    'Malerarbeiten, Fliesen legen, Parkett oder Designboden: Wir vermitteln Ihnen einen passenden Fachbetrieb in Baden-Württemberg – kostenlos, unverbindlich.',
  openGraph: {
    title: 'Maler, Fliesenleger & Bodenleger – vermittelt',
    description: 'Malerarbeiten, Fliesen legen, Parkett oder Designboden: Wir vermitteln Ihnen einen passenden Fachbetrieb in Baden-Württemberg – kostenlos, unverbindlich.',
    locale: 'de_DE',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
