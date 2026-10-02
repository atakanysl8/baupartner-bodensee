import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/leistungen/heizung-waermepumpe/' },
  title: 'Wärmepumpe & Heizungstausch – Fachbetrieb vermittelt',
  description:
    'Wärmepumpe, Heizungstausch, Fußbodenheizung oder Wartung: Wir vermitteln Ihnen einen passenden Heizungsfachbetrieb – kostenlos und unverbindlich.',
  openGraph: {
    title: 'Wärmepumpe & Heizungstausch – Fachbetrieb vermittelt',
    description: 'Wärmepumpe, Heizungstausch, Fußbodenheizung oder Wartung: Wir vermitteln Ihnen einen passenden Heizungsfachbetrieb – kostenlos und unverbindlich.',
    locale: 'de_DE',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
