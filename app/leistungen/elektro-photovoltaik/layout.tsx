import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/leistungen/elektro-photovoltaik/' },
  title: 'Elektriker & Photovoltaik – Fachbetrieb vermittelt',
  description:
    'Elektroinstallation, Photovoltaikanlage oder Wallbox: Wir vermitteln Ihnen einen passenden Elektrofachbetrieb am Bodensee – kostenlos.',
  openGraph: {
    title: 'Elektriker & Photovoltaik – Fachbetrieb vermittelt',
    description: 'Elektroinstallation, Photovoltaikanlage oder Wallbox: Wir vermitteln Ihnen einen passenden Elektrofachbetrieb am Bodensee – kostenlos.',
    locale: 'de_DE',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
