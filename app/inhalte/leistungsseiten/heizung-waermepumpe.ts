import type { LeistungsInhalt } from '../../components/LeistungSeite'

export const INHALT: LeistungsInhalt = {
  beschreibung: 'Wärmepumpe, Heizungstausch, Fußbodenheizung und Heizungswartung: Bodensee BauPartner vermittelt Ihnen einen passenden Heizungsfachbetrieb – kostenlos.',
  hero: {
    eyebrow: 'Vermittlung für Heizung & Wärmepumpe · Baden-Württemberg',
    h1: 'Heizung &',
    h1Betont: 'Wärmepumpe',
    unterzeile: 'Heizung tauschen, Wärmepumpe planen',
    lead: 'Die alte Heizung macht Probleme oder Sie wollen auf eine Wärmepumpe umsteigen: Schildern Sie uns Ihr Haus und Ihr Vorhaben, wir wählen einen passenden Heizungsfachbetrieb aus.',
    bildAlt: 'Heizung und Wärmepumpe',
  },
  karten: {
    h2: 'Fachbetriebe für',
    h2Betont: 'Heizung und Wärme',
    intro: 'Vom Heizungstausch bis zur neuen Fußbodenheizung.',
    liste: [
      { icon: ['M4 6h16v12H4z', 'M8 10h8', 'M8 14h8', 'M12 18v3'], titel: 'Wärmepumpe', kurz: 'Luft-Wasser oder Erdwärme', text: 'Ob eine Wärmepumpe zu Ihrem Haus passt, hängt vor allem von Heizlast und benötigter Vorlauftemperatur ab. Wir vermitteln Betriebe, die Planung, Einbau und Inbetriebnahme übernehmen.' },
      { icon: ['M12 3c2 3-2 5 0 8s-2 5 0 8', 'M5 21h14'], titel: 'Heizungstausch', kurz: 'Alte Öl- oder Gasheizung ersetzen', text: 'Beim Austausch geht es um mehr als das Gerät: Hydraulischer Abgleich, Warmwasser und gegebenenfalls Heizkörper gehören zur Planung.' },
      { icon: ['M3 12h18', 'M3 6h18', 'M3 18h18'], titel: 'Fußbodenheizung & Heizkörper', kurz: 'Wärmeverteilung modernisieren', text: 'Fußbodenheizung im Neubau oder nachträglich, größere Heizkörper für niedrige Vorlauftemperaturen – passend zur geplanten Wärmeerzeugung.' },
      { icon: ['M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.8-3.8a6 6 0 01-7.9 7.9l-6.9 6.9a2.1 2.1 0 01-3-3l6.9-6.9a6 6 0 017.9-7.9z'], titel: 'Wartung & Reparatur', kurz: 'Planbare Arbeiten an der Heizung', text: 'Regelmäßige Wartung, Reparaturen und Optimierung bestehender Anlagen – planbar und nach Absprache.' },
    ],
  },
  ablauf: {
    h2Betont: 'Heizungsbetrieb',
    schritte: [
      { titel: 'Haus beschreiben', text: 'Baujahr, Wohnfläche, aktuelle Heizung und was Sie vorhaben – per Formular oder Telefon.' },
      { titel: 'Betrieb auswählen', text: 'Wir wählen einen Heizungsfachbetrieb aus, der zu Ihrem Vorhaben und Ihrem Ort passt.' },
      { titel: 'Vor-Ort-Termin', text: 'Der Betrieb meldet sich, prüft Haus und Anlage und erstellt ein Angebot.' },
      { titel: 'Sie entscheiden', text: 'Sie entscheiden frei; der Vertrag kommt direkt mit dem Betrieb zustande.' },
    ],
  },
  warum: {
    text: 'Beim Heizungstausch hängen Technik, Förderung und Gebäudezustand eng zusammen. Wir nehmen Ihnen die Suche nach einem passenden Fachbetrieb ab – für Sie kostenlos und unverbindlich. Die Kosten tragen die Fachbetriebe.',
    usps: [
      { titel: 'Ein Betrieb je Anfrage', text: 'Ihre Angaben gehen an genau einen passenden Fachbetrieb.' },
      { titel: 'Ortsbezogene Auswahl', text: 'Wir berücksichtigen bei der Auswahl, wo Ihr Haus steht.' },
      { titel: 'Kostenlos für Sie', text: 'Keine Gebühr und kein Aufschlag für Sie als Auftraggeber.' },
    ],
  },
  cta: { h2: 'Heizung', h2Betont: 'erneuern?', text: 'Schildern Sie uns Ihr Haus und Ihr Vorhaben – wir wählen einen passenden Heizungsfachbetrieb aus. Kostenlos und unverbindlich.' },
  faqTitel: 'Heizung & Wärmepumpe',
  faqs: [
    { q: 'Ist mein Haus für eine Wärmepumpe geeignet?', a: 'Entscheidend sind die Heizlast des Hauses und die Vorlauftemperatur, die die Heizflächen brauchen. Auch viele Bestandsgebäude kommen infrage, teils nach einzelnen Maßnahmen wie größeren Heizkörpern. Eine Heizlastberechnung schafft Klarheit.' },
    { q: 'Muss ich meine alte Öl- oder Gasheizung austauschen?', a: 'Ob für eine alte Heizung eine Austauschpflicht besteht und welche Ausnahmen gelten, regelt das Gebäudemodernisierungsgesetz (früher Gebäudeenergiegesetz). Ob das für Ihre Anlage zutrifft, kann Ihnen Ihr Schornsteinfeger oder eine Energieberatung sagen.' },
    { q: 'Was ist die kommunale Wärmeplanung?', a: 'In Baden-Württemberg haben Stadtkreise und Große Kreisstädte kommunale Wärmepläne erstellt. Sie zeigen unter anderem, wo Wärmenetze geplant sind – eine wichtige Information, bevor Sie sich für eine Heizung entscheiden. Den Plan veröffentlicht in der Regel die Stadt.' },
    { q: 'Gibt es Förderung für den Heizungstausch?', a: 'Der Bund fördert den Umstieg auf erneuerbare Heizungen im Rahmen der Bundesförderung für effiziente Gebäude; Bedingungen und Fördersätze ändern sich. Aktuelle Informationen geben KfW, BAFA und die Energieberatung.' },
    { q: 'Wo darf die Außeneinheit einer Wärmepumpe stehen?', a: 'Zu beachten sind vor allem Schallschutz gegenüber den Nachbarn und gegebenenfalls Abstandsvorgaben. Was am Standort gilt, klärt der Fachbetrieb bei der Planung; im Zweifel gibt die Baurechtsbehörde Auskunft.' },
    { q: 'Welche Angaben helfen für ein Angebot?', a: 'Baujahr und Wohnfläche, Art und Alter der jetzigen Heizung, ungefährer Verbrauch der letzten Jahre und ob Heizkörper oder Fußbodenheizung vorhanden sind.' },
  ],
  seo: [
    { h2: 'Wärmepumpe einbauen lassen', text: 'Eine Wärmepumpe arbeitet besonders effizient, wenn die Heizflächen mit niedriger Vorlauftemperatur auskommen. Der vermittelte Fachbetrieb prüft Heizlast, Heizflächen und Aufstellort und schlägt eine passende Lösung vor – Luft-Wasser oder Erdwärme.' },
    { h2: 'Heizungstausch in Baden-Württemberg', text: 'Ob Gas, Öl oder Nachtspeicher: Beim Heizungstausch spielen das Gebäudemodernisierungsgesetz (früher Gebäudeenergiegesetz), das Erneuerbare-Wärme-Gesetz Baden-Württemberg und die kommunale Wärmeplanung eine Rolle. Wir wählen für Ihre Anfrage einen Fachbetrieb aus, der Sie dazu berät.' },
    { h2: 'Heizungsinstallateur gesucht', text: 'Bodensee BauPartner sucht für Sie einen Heizungsfachbetrieb, der zu Ihrem Vorhaben und Ihrem Ort passt. Sie schildern einmal, was Sie brauchen – kostenlos und unverbindlich.' },
    { h2: 'Fußbodenheizung und Heizkörper', text: 'Die Wärmeverteilung entscheidet mit darüber, wie effizient eine neue Heizung arbeitet. Größere Heizkörper oder eine nachträgliche Fußbodenheizung können den Umstieg auf eine Wärmepumpe erleichtern.' },
  ],
}
