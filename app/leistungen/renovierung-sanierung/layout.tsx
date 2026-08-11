import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Energetische Sanierung Bodensee – KfW Förderung & Kernsanierung | Bodensee BauPartner',
  description:
    'Sanierungs-Fachbetriebe am Bodensee: Kernsanierung, Heizungsaustausch, Dämmung & KfW-Förderung. Kostenlose Vermittlung durch Bodensee BauPartner GbR.',
  openGraph: {
    title: 'Renovierung & Sanierung am Bodensee – Bodensee BauPartner',
    description:
      'Wir vermitteln Sanierungs-Fachbetriebe in der Bodenseeregion – kostenlos & unverbindlich.',
    locale: 'de_DE',
    type: 'website',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Welche staatlichen Förderungen gibt es für Sanierungen am Bodensee?', acceptedAnswer: { '@type': 'Answer', text: 'Für energetische Sanierungen stehen verschiedene Förderprogramme zur Verfügung: KfW-Bundesförderung für effiziente Gebäude (BEG), BAFA-Zuschüsse für Heizungsaustausch und Dämmmaßnahmen sowie ggf. Landesmittel in Baden-Württemberg. Die vermittelten Fachbetriebe kennen die aktuellen Programme und begleiten Sie bei der Antragstellung.' } },
    { '@type': 'Question', name: 'Was ist eine Kernsanierung und wann lohnt sie sich?', acceptedAnswer: { '@type': 'Answer', text: 'Bei einer Kernsanierung wird ein Gebäude bis auf die tragende Struktur zurückgebaut und vollständig modernisiert — Elektrik, Sanitär, Heizung, Dämmung, Innenausbau. Das lohnt sich besonders bei stark veralteten Gebäuden, wenn Einzelmaßnahmen wirtschaftlich nicht sinnvoll wären.' } },
    { '@type': 'Question', name: 'Wie viel kann ich durch eine energetische Sanierung sparen?', acceptedAnswer: { '@type': 'Answer', text: 'In der Praxis berichten Eigentümer nach einer umfassenden energetischen Sanierung oft von 30–60 % Energieeinsparung. Besonders wirkungsvoll sind Dachdämmung, Fassadendämmung, neue Fenster und ein moderner Heizungsaustausch.' } },
    { '@type': 'Question', name: 'Können die vermittelten Betriebe bei KfW- und BAFA-Anträgen helfen?', acceptedAnswer: { '@type': 'Answer', text: 'Ja. Viele der vermittelten Fachbetriebe sind als Energieeffizienz-Experten anerkannt oder arbeiten regelmäßig mit solchen zusammen. Für KfW-Förderungen ist ein zugelassener Energie-Effizienz-Experte (EEE) verpflichtend — wir achten darauf, dass Ihnen der richtige Betrieb vermittelt wird.' } },
    { '@type': 'Question', name: 'Was kostet die Vermittlung eines Sanierungs-Fachbetriebs?', acceptedAnswer: { '@type': 'Answer', text: 'Unsere Vermittlung ist für Sie vollständig kostenlos und unverbindlich. Wir finanzieren uns über eine Provision der vermittelten Fachbetriebe — Sie zahlen keinen Aufschlag auf das Handwerkerangebot und gehen keinerlei Verpflichtung ein.' } },
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
