import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/ueber-uns/' },
  title: 'Über uns – Bodensee BauPartner GbR aus Überlingen',
  description:
    'Lernen Sie Bodensee BauPartner GbR kennen – Luca-Matei Brezeanu & Atakan Yigit vermitteln in Überlingen Fachbetriebe für Bauprojekte in der Bodenseeregion.',
  openGraph: {
    title: 'Über uns – Bodensee BauPartner GbR',
    description:
      'Ihr persönlicher Bau-Vermittler in der Bodenseeregion – wir verbinden Sie mit den richtigen Fachbetrieben.',
    locale: 'de_DE',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
