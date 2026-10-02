import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/leistungen/dach-fassade/' },
  title: 'Dachdecker & Dachsanierung – Fachbetrieb vermittelt',
  description:
    'Dachdecker, Dachsanierung, Dachdämmung oder Fassade: Wir vermitteln Ihnen einen passenden Fachbetrieb in Baden-Württemberg – kostenlos und unverbindlich.',
  openGraph: {
    title: 'Dachdecker & Dachsanierung – Fachbetrieb vermittelt',
    description: 'Dachdecker, Dachsanierung, Dachdämmung oder Fassade: Wir vermitteln Ihnen einen passenden Fachbetrieb in Baden-Württemberg – kostenlos und unverbindlich.',
    locale: 'de_DE',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
