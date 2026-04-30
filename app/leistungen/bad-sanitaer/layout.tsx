import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Badezimmer renovieren Bodensee – Sanitär Meisterbetrieb | Bodensee BauPartner',
  description:
    'Geprüfte Sanitär-Meisterbetriebe für Badsanierung, barrierefreies Bad & Badezimmer-Renovierung am Bodensee. Kostenlose Vermittlung durch Bodensee BauPartner GbR.',
  openGraph: {
    title: 'Bad & Sanitär am Bodensee – Bodensee BauPartner',
    description:
      'Wir vermitteln geprüfte Sanitär-Meisterbetriebe in der Bodenseeregion – kostenlos & unverbindlich.',
    locale: 'de_DE',
    type: 'website',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Wie lange dauert eine komplette Badsanierung?', acceptedAnswer: { '@type': 'Answer', text: 'Eine typische Badsanierung dauert je nach Größe und Umfang zwischen zwei und vier Wochen. Bei aufwendigeren Projekten mit Installationsarbeiten, neuen Leitungen oder barrierefreiem Umbau kann es etwas länger dauern. Unsere Partnerbetriebe geben Ihnen nach der Besichtigung eine verbindliche Zeitplanung.' } },
    { '@type': 'Question', name: 'Was kostet ein neues Badezimmer am Bodensee?', acceptedAnswer: { '@type': 'Answer', text: 'Die Kosten hängen stark von Größe, Materialwahl und Umfang der Arbeiten ab. Ein einfaches Standardbad startet ab ca. 8.000–12.000 €, ein hochwertiges Designbad kann deutlich mehr kosten. Unsere Partnerbetriebe erstellen Ihnen ein transparentes Angebot — auf Wunsch als Festpreis.' } },
    { '@type': 'Question', name: 'Sind die vermittelten Sanitärbetriebe Meisterbetriebe?', acceptedAnswer: { '@type': 'Answer', text: 'Ja. Wir arbeiten ausschließlich mit eingetragenen Sanitär-Meisterbetrieben zusammen. Das ist für uns Pflicht — denn nur Meisterbetriebe dürfen Installationsarbeiten an wasserführenden und gasführenden Leitungen rechtssicher und mit Gewährleistung ausführen.' } },
    { '@type': 'Question', name: 'Kann ich auch ein barrierefreies Bad umbauen lassen?', acceptedAnswer: { '@type': 'Answer', text: 'Absolut. Barrierefreier Umbau — bodengleiche Dusche, Haltegriffe, breitere Türen — ist eines unserer häufigsten Vermittlungsthemen. Wir haben spezialisierte Fachbetriebe im Netzwerk, die solche Umbauten routiniert und förderfähig umsetzen.' } },
    { '@type': 'Question', name: 'Was kostet die Vermittlung eines Bad-Fachbetriebs?', acceptedAnswer: { '@type': 'Answer', text: 'Unsere Vermittlung ist für Sie vollständig kostenlos und unverbindlich. Wir finanzieren uns über unsere Partnerfirmen — Sie zahlen keinen Aufschlag und gehen keinerlei Verpflichtung ein.' } },
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
