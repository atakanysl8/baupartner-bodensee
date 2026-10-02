import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/leistungen/tiefbau/' },
  title: 'Tiefbau am Bodensee – Erdarbeiten & Kanalbau | Bodensee BauPartner',
  description:
    'Tiefbau-Fachbetriebe in der Bodenseeregion: Erdarbeiten, Fundamentierung, Kanal- & Leitungsbau, Straßenbau. Kostenlose Vermittlung durch Bodensee BauPartner GbR.',
  openGraph: {
    title: 'Tiefbau am Bodensee – Bodensee BauPartner',
    description:
      'Wir vermitteln Tiefbau-Fachbetriebe in der Bodenseeregion – kostenlos & unverbindlich.',
    locale: 'de_DE',
    type: 'website',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Was zählt alles zum Tiefbau?', acceptedAnswer: { '@type': 'Answer', text: 'Zum Tiefbau gehören alle Arbeiten unterhalb der Erdoberfläche: Erdaushub, Fundamentierung, Bodenplatte, Kanal- und Leitungsbau, Straßen- und Wegebau sowie Hangsicherung und Spundwände. Wir vermitteln Fachbetriebe für alle diese Bereiche.' } },
    { '@type': 'Question', name: 'Brauche ich für Tiefbauarbeiten eine Genehmigung?', acceptedAnswer: { '@type': 'Answer', text: 'Das hängt von Art und Umfang der Arbeiten ab. Für Kanalbauarbeiten, Leitungsverlegungen und größere Erdarbeiten sind in der Regel Genehmigungen und Leitungsauskünfte erforderlich. Die vermittelten Fachbetriebe kennen die regionalen Vorschriften und begleiten Sie durch den Prozess.' } },
    { '@type': 'Question', name: 'Kann ich für dringende Tiefbauarbeiten — z. B. Kanalschaden — anfragen?', acceptedAnswer: { '@type': 'Answer', text: 'Ja. Melden Sie sich direkt per Telefon, dann können wir schnellstmöglich einen geeigneten Betrieb aus der Region kontaktieren. Für Notfälle empfehlen wir den telefonischen Weg für eine schnellere Reaktion.' } },
    { '@type': 'Question', name: 'Wie läuft die Vermittlung eines Tiefbau-Betriebs ab?', acceptedAnswer: { '@type': 'Answer', text: 'Sie beschreiben uns Ihr Vorhaben — Lage, Umfang und Zeitplan. Wir wählen den passenden Fachbetrieb aus, stellen den Kontakt her und übergeben alle Informationen. Den Rest klären Sie direkt mit dem Betrieb — schnell, kostenlos und unverbindlich.' } },
    { '@type': 'Question', name: 'Was kostet mich die Tiefbau-Vermittlung?', acceptedAnswer: { '@type': 'Answer', text: 'Unsere Vermittlung ist für Sie vollständig kostenlos und unverbindlich. Die Kosten tragen die Fachbetriebe — Sie zahlen keinen Aufschlag und gehen keinerlei Verpflichtung ein.' } },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Tiefbau',
  provider: { '@type': 'Organization', name: 'Bodensee BauPartner GbR', url: 'https://www.bodensee-baupartner.de/' },
  areaServed: { '@type': 'State', name: 'Baden-Württemberg' },
  description: 'Tiefbau-Fachbetriebe in der Bodenseeregion: Erdarbeiten, Fundamentierung, Kanal- & Leitungsbau, Straßenbau. Kostenlose Vermittlung durch Bodensee BauPartner GbR.',
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Start', item: 'https://www.bodensee-baupartner.de/' },
    { '@type': 'ListItem', position: 2, name: 'Tiefbau', item: 'https://www.bodensee-baupartner.de/leistungen/tiefbau/' },
  ],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  )
}
