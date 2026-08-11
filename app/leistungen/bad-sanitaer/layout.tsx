import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Badezimmer renovieren Bodensee – Sanitärbetriebe | Bodensee BauPartner',
  description:
    'Sanitärbetriebe für Badsanierung, barrierefreies Bad & Badezimmer-Renovierung am Bodensee. Kostenlose Vermittlung durch Bodensee BauPartner GbR.',
  openGraph: {
    title: 'Bad & Sanitär am Bodensee – Bodensee BauPartner',
    description:
      'Wir vermitteln Sanitärbetriebe in der Bodenseeregion – kostenlos & unverbindlich.',
    locale: 'de_DE',
    type: 'website',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Wie lange dauert eine komplette Badsanierung?', acceptedAnswer: { '@type': 'Answer', text: 'Eine typische Badsanierung dauert je nach Größe und Umfang zwischen zwei und vier Wochen. Bei aufwendigeren Projekten mit Installationsarbeiten, neuen Leitungen oder barrierefreiem Umbau kann es etwas länger dauern. Der vermittelte Fachbetrieb gibt Ihnen nach der Besichtigung eine verbindliche Zeitplanung.' } },
    { '@type': 'Question', name: 'Was kostet ein neues Badezimmer am Bodensee?', acceptedAnswer: { '@type': 'Answer', text: 'Die Kosten hängen stark von Größe, Materialwahl und Umfang der Arbeiten ab. Ein einfaches Standardbad startet ab ca. 8.000–12.000 €, ein hochwertiges Designbad kann deutlich mehr kosten. Der vermittelte Fachbetrieb erstellt Ihnen ein transparentes Angebot — auf Wunsch als Festpreis.' } },
    { '@type': 'Question', name: 'Welche Sanitärbetriebe vermitteln Sie?', acceptedAnswer: { '@type': 'Answer', text: 'Wir vermitteln Sanitärbetriebe aus der Bodenseeregion. Für Installationsarbeiten an wasser- und gasführenden Leitungen gelten die gesetzlichen Vorgaben der Handwerksordnung, die der jeweils ausführende Betrieb einzuhalten hat.' } },
    { '@type': 'Question', name: 'Kann ich auch ein barrierefreies Bad umbauen lassen?', acceptedAnswer: { '@type': 'Answer', text: 'Absolut. Barrierefreier Umbau — bodengleiche Dusche, Haltegriffe, breitere Türen — ist eines unserer häufigsten Vermittlungsthemen. Wir vermitteln spezialisierte Fachbetriebe, die solche Umbauten routiniert und förderfähig umsetzen.' } },
    { '@type': 'Question', name: 'Was kostet die Vermittlung eines Bad-Fachbetriebs?', acceptedAnswer: { '@type': 'Answer', text: 'Unsere Vermittlung ist für Sie vollständig kostenlos und unverbindlich. Wir finanzieren uns über eine Provision der vermittelten Fachbetriebe — Sie zahlen keinen Aufschlag und gehen keinerlei Verpflichtung ein.' } },
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
