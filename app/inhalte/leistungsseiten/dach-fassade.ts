import type { LeistungsInhalt } from '../../components/LeistungSeite'

export const INHALT: LeistungsInhalt = {
  beschreibung: 'Dachdecker, Dachsanierung, Dachdämmung und Fassadensanierung: Bodensee BauPartner vermittelt Ihnen einen passenden Fachbetrieb – kostenlos und unverbindlich.',
  hero: {
    eyebrow: 'Vermittlung für Dach & Fassade · Baden-Württemberg',
    h1: 'Dach & Fassade',
    h1Betont: 'sanieren lassen',
    unterzeile: 'Dachdecker, Dachsanierung und Fassade aus einer Anfrage',
    lead: 'Undichtes Dach, alte Eindeckung oder eine Fassade, die Wärme verliert: Schildern Sie uns Ihr Vorhaben, wir wählen einen passenden Fachbetrieb für Dach oder Fassade aus.',
    bildAlt: 'Dach und Fassade sanieren',
  },
  karten: {
    h2: 'Fachbetriebe für',
    h2Betont: 'Dach und Fassade',
    intro: 'Vom einzelnen Dachfenster bis zur kompletten Sanierung der Gebäudehülle.',
    liste: [
      { icon: ['M3 11l9-7 9 7', 'M5 9v11h14V9'], titel: 'Dacheindeckung', kurz: 'Neue Eindeckung mit Ziegel, Schiefer oder Blech', text: 'Ob Steildach oder Flachdach: Für eine neue Eindeckung, die Erneuerung von Lattung und Unterspannbahn oder die Abdichtung eines Flachdachs suchen wir den passenden Dachdeckerbetrieb.' },
      { icon: ['M3 11l9-7 9 7', 'M7 13h10', 'M7 17h10'], titel: 'Dachsanierung & Dämmung', kurz: 'Dach dämmen und erneuern', text: 'Zwischensparren-, Aufsparren- oder Untersparrendämmung, oft verbunden mit neuer Eindeckung. Welche Lösung passt, hängt von Konstruktion, Zustand und Nutzung des Dachgeschosses ab.' },
      { icon: ['M4 3h16v18H4z', 'M4 9h16', 'M4 15h16', 'M10 3v18'], titel: 'Fassadensanierung', kurz: 'Putz, Anstrich und Fassadendämmung', text: 'Risse im Putz, Feuchte oder hohe Heizkosten: Wir vermitteln Betriebe für Putzsanierung, Wärmedämmverbundsystem, vorgehängte Fassade oder einen neuen Anstrich.' },
      { icon: ['M12 3l9 8H3z', 'M6 11v9', 'M18 11v9', 'M9 20v-6h6v6'], titel: 'Dachstuhl, Gauben & Dachfenster', kurz: 'Zimmerei- und Dachausbauarbeiten', text: 'Reparatur oder Verstärkung des Dachstuhls, neue Gauben und Dachfenster – Arbeiten, bei denen Zimmerei und Dachdecker Hand in Hand gehen.' },
    ],
  },
  ablauf: {
    h2Betont: 'Dach-Fachbetrieb',
    schritte: [
      { titel: 'Vorhaben schildern', text: 'Dachform, ungefähre Fläche, Alter der Eindeckung und was Sie vorhaben – per Formular oder Telefon.' },
      { titel: 'Betrieb auswählen', text: 'Wir wählen einen Fachbetrieb aus, der zu Ihrem Dach oder Ihrer Fassade und Ihrem Ort passt.' },
      { titel: 'Besichtigung & Angebot', text: 'Der Betrieb meldet sich bei Ihnen, sieht sich Dach oder Fassade an und erstellt ein Angebot.' },
      { titel: 'Sie entscheiden', text: 'Sie entscheiden frei. Der Vertrag kommt direkt zwischen Ihnen und dem Betrieb zustande.' },
    ],
  },
  warum: {
    text: 'Beim Dach greifen oft mehrere Themen ineinander: Eindeckung, Dämmung, Dachfenster, manchmal Photovoltaik. Sie schildern Ihr Vorhaben einmal, wir suchen den passenden Betrieb – für Sie kostenlos und unverbindlich. Die Kosten tragen die Fachbetriebe.',
    usps: [
      { titel: 'Ein Betrieb je Anfrage', text: 'Ihre Angaben gehen an genau einen passenden Fachbetrieb – nicht an viele.' },
      { titel: 'Ortsbezogene Auswahl', text: 'Wir berücksichtigen bei der Auswahl, wo Ihr Haus steht.' },
      { titel: 'Kostenlos für Sie', text: 'Keine Gebühr und kein Aufschlag für Sie als Auftraggeber.' },
    ],
  },
  cta: { h2: 'Dach oder Fassade', h2Betont: 'erneuern?', text: 'Schildern Sie uns Ihr Vorhaben – wir wählen einen passenden Fachbetrieb aus. Kostenlos und unverbindlich.' },
  faqTitel: 'Dach & Fassade',
  faqs: [
    { q: 'Wann lohnt sich eine Dachsanierung statt einer Reparatur?', a: 'Wenn an mehreren Stellen Feuchte eindringt, die Eindeckung insgesamt verwittert ist oder ohnehin gedämmt werden soll, ist eine Sanierung oft wirtschaftlicher als wiederholte Einzelreparaturen. Eine Besichtigung durch den Fachbetrieb klärt den tatsächlichen Zustand.' },
    { q: 'Muss ich bei einer Dachsanierung auch dämmen?', a: 'Werden Dach oder Fassade in größerem Umfang erneuert, stellt das Gebäudeenergiegesetz in der Regel Anforderungen an den Wärmeschutz. Welche Werte für Ihr Haus gelten und welche Ausnahmen bestehen, klären Fachbetrieb und Energieberatung im Einzelfall.' },
    { q: 'Gilt in Baden-Württemberg eine Photovoltaik-Pflicht bei der Dachsanierung?', a: 'In Baden-Württemberg gilt bei grundlegenden Dachsanierungen von Gebäuden grundsätzlich eine Pflicht zur Installation einer Photovoltaikanlage; Einzelheiten und Ausnahmen regelt die Photovoltaik-Pflicht-Verordnung des Landes. Es lohnt sich deshalb, Dach und PV gemeinsam zu planen.' },
    { q: 'Brauche ich für eine neue Gaube eine Baugenehmigung?', a: 'Gauben verändern die äußere Gestalt des Gebäudes und sind deshalb häufig genehmigungspflichtig; zudem können Bebauungsplan, Gestaltungssatzung oder Denkmalschutz Vorgaben machen. Verbindliche Auskunft gibt die zuständige Baurechtsbehörde.' },
    { q: 'Welche Angaben helfen für ein Angebot?', a: 'Dachform, ungefähre Dachfläche, Alter und Material der Eindeckung, Fotos und ob das Dachgeschoss bewohnt ist. Bei der Fassade: Fläche, Bauweise und sichtbare Schäden.' },
    { q: 'Kann ich Dachsanierung und Fassade zusammen anfragen?', a: 'Ja. Beschreiben Sie in Ihrer Anfrage beide Vorhaben; ein gemeinsames Gerüst und eine abgestimmte Dämmung von Dach und Wand sind oft sinnvoll.' },
  ],
  seo: [
    { h2: 'Dachdecker gesucht – Vermittlung in Baden-Württemberg', text: 'Ob neue Eindeckung, Flachdachabdichtung oder Reparatur nach einem Sturm: Bodensee BauPartner vermittelt Ihnen einen Dachdeckerbetrieb, der zu Ihrem Vorhaben passt. Sie schildern Ihr Dach, wir übernehmen die Suche – kostenlos und unverbindlich.' },
    { h2: 'Dachsanierung und Dachdämmung', text: 'Eine Dachsanierung verbindet häufig neue Eindeckung und Dämmung. Ob Aufsparren- oder Zwischensparrendämmung sinnvoll ist, hängt von Konstruktion und Nutzung ab. Der vermittelte Fachbetrieb prüft das bei der Besichtigung.' },
    { h2: 'Fassadensanierung und Fassadendämmung', text: 'Risse, abplatzender Putz oder hohe Heizkosten sind typische Anlässe. Je nach Gebäude kommen Putzsanierung, Wärmedämmverbundsystem oder eine vorgehängte Fassade infrage. In Altstädten und bei Denkmalen gelten oft Gestaltungsvorgaben.' },
    { h2: 'Dach, Fassade und Photovoltaik gemeinsam planen', text: 'Wer das Dach erneuert, plant Photovoltaik und Dachfenster sinnvollerweise gleich mit. In Baden-Württemberg ist das bei grundlegenden Dachsanierungen grundsätzlich vorgeschrieben – eine gemeinsame Planung vermeidet doppelte Arbeiten.' },
  ],
}
