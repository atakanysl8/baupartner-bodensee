import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hochbau am Bodensee – Rohbau & Mauerwerk | Bodensee BauPartner',
  description:
    'Geprüfte Hochbau-Fachbetriebe in der Bodenseeregion: Rohbau, Stahlbetonbau, Mauerwerk, Fassaden & Treppen. Kostenlose Vermittlung durch Bodensee BauPartner GbR.',
  openGraph: {
    title: 'Hochbau am Bodensee – Bodensee BauPartner',
    description:
      'Wir vermitteln geprüfte Hochbau-Fachbetriebe in der Bodenseeregion – kostenlos & unverbindlich.',
    locale: 'de_DE',
    type: 'website',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Was genau vermittelt Bodensee BauPartner im Hochbau?', acceptedAnswer: { '@type': 'Answer', text: 'Wir vermitteln geprüfte Fachbetriebe für alle Hochbauleistungen: Neubauprojekte, Rohbau, Mauerwerk, Stahlbetonbau, Deckenkonstruktionen, Fassaden sowie Anbau und Aufstockung. Sie schildern uns Ihr Vorhaben – wir finden den passenden Betrieb in der Bodenseeregion.' } },
    { '@type': 'Question', name: 'Wie lange dauert ein typischer Rohbau am Bodensee?', acceptedAnswer: { '@type': 'Answer', text: 'Die Dauer eines Rohbaus hängt stark von der Größe und Komplexität des Projekts ab. Ein Einfamilienhaus-Rohbau dauert in der Regel 8–16 Wochen. Unsere Partnerbetriebe geben Ihnen nach einer ersten Projektbeschreibung eine verlässliche Zeitschätzung.' } },
    { '@type': 'Question', name: 'Kann ich für einen Anbau oder eine Aufstockung anfragen?', acceptedAnswer: { '@type': 'Answer', text: 'Ja, absolut. Anbau, Aufstockung und Dachausbau gehören ebenfalls zu unserem Vermittlungsangebot. Wir finden spezialisierte Betriebe, die den Bestand schonend berücksichtigen und die neue Bausubstanz nahtlos integrieren.' } },
    { '@type': 'Question', name: 'Brauche ich für einen Neubau eine Baugenehmigung?', acceptedAnswer: { '@type': 'Answer', text: 'In der Regel ja. Für Neubauten, Anbauten und Aufstockungen ist in Baden-Württemberg eine Baugenehmigung erforderlich. Unsere Partnerbetriebe kennen die regionalen Vorschriften und unterstützen Sie bei der Vorbereitung der erforderlichen Unterlagen.' } },
    { '@type': 'Question', name: 'Was kostet mich die Vermittlung eines Hochbau-Betriebs?', acceptedAnswer: { '@type': 'Answer', text: 'Unsere Vermittlung ist für Sie vollständig kostenlos und unverbindlich. Wir finanzieren uns über unsere Partnerfirmen – Sie zahlen keinen Aufschlag und haben keinerlei Verpflichtung.' } },
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
