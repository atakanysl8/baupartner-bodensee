import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Innenausbau Bodensee – Trockenbau, Parkett & Dachausbau | Bodensee BauPartner',
  description:
    'Geprüfte Innenausbau-Spezialisten am Bodensee: Trockenbau, Bodenbeläge, Malerarbeiten, Dachgeschossausbau & Türen. Kostenlose Vermittlung durch Bodensee BauPartner GbR.',
  openGraph: {
    title: 'Innenausbau am Bodensee – Bodensee BauPartner',
    description:
      'Wir vermitteln geprüfte Innenausbau-Fachbetriebe in der Bodenseeregion – kostenlos & unverbindlich.',
    locale: 'de_DE',
    type: 'website',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Welche Innengewerke vermittelt Bodensee BauPartner?', acceptedAnswer: { '@type': 'Answer', text: 'Wir vermitteln Fachbetriebe für alle Innenausbaugewerke: Trockenbau, Bodenbeläge (Parkett, Fliesen, Designboden), Malerarbeiten, Tapezieren, Dachgeschossausbau sowie Türen und Innenverkleidungen. Sie nennen uns Ihr Projekt — wir finden den passenden Spezialisten.' } },
    { '@type': 'Question', name: 'Wie lange dauert ein Dachgeschossausbau?', acceptedAnswer: { '@type': 'Answer', text: 'Die Dauer hängt vom Zustand des Dachstuhls, der gewünschten Ausbaustufe und dem Umfang der Dämmarbeiten ab. Ein durchschnittlicher Dachgeschossausbau dauert zwischen 6 und 14 Wochen. Unsere Partnerbetriebe geben Ihnen nach einer ersten Besichtigung eine verbindliche Zeitplanung.' } },
    { '@type': 'Question', name: 'Kann ich für mehrere Gewerke gleichzeitig anfragen?', acceptedAnswer: { '@type': 'Answer', text: 'Ja, absolut. Wir können für ein Projekt mehrere passende Fachbetriebe vermitteln oder einen Betrieb, der mehrere Gewerke abdeckt. Beschreiben Sie uns einfach alle gewünschten Leistungen — wir koordinieren die Vermittlung.' } },
    { '@type': 'Question', name: 'Was ist der Unterschied zwischen Parkett und Designboden?', acceptedAnswer: { '@type': 'Answer', text: 'Parkett besteht aus echtem Holz und ist besonders langlebig, kann mehrfach abgeschliffen werden und wertet optisch stark auf. Designboden (LVT) ist günstiger, feuchtigkeitsbeständiger und einfacher zu verlegen — ideal für Küche, Bad oder Mietobjekte.' } },
    { '@type': 'Question', name: 'Was kostet die Innenausbau-Vermittlung?', acceptedAnswer: { '@type': 'Answer', text: 'Unsere Vermittlung ist vollständig kostenlos und unverbindlich. Sie zahlen keinen Aufschlag auf das Handwerkerangebot. Wir finanzieren uns über die Partnerbetriebe, die wir in unser geprüftes Netzwerk aufnehmen.' } },
  ],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  )
}
