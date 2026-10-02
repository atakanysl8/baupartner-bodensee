import type { LeistungsInhalt } from '../../components/LeistungSeite'

export const INHALT: LeistungsInhalt = {
  beschreibung: 'Terrassenüberdachung, Pflasterarbeiten, Zaunbau, Carport und Wintergarten: Bodensee BauPartner vermittelt Ihnen einen passenden Fachbetrieb – kostenlos.',
  hero: {
    eyebrow: 'Vermittlung für Garten & Außenanlagen · Baden-Württemberg',
    h1: 'Garten &',
    h1Betont: 'Außenanlagen',
    unterzeile: 'Terrasse, Pflaster, Zaun und Carport',
    lead: 'Eine überdachte Terrasse, eine neue Einfahrt oder ein Zaun ums Grundstück: Schildern Sie uns Ihr Vorhaben, wir wählen einen passenden Fachbetrieb aus.',
    bildAlt: 'Garten und Außenanlagen',
  },
  karten: {
    h2: 'Fachbetriebe für',
    h2Betont: 'rund ums Haus',
    intro: 'Von der Terrassenüberdachung bis zur gepflasterten Einfahrt.',
    liste: [
      { icon: ['M3 10l9-5 9 5', 'M5 10v10', 'M19 10v10', 'M3 20h18'], titel: 'Terrassenüberdachung', kurz: 'Aluminium, Holz oder Glas', text: 'Eine Überdachung macht die Terrasse bei jedem Wetter nutzbar. Wichtig sind Statik, Entwässerung und die baurechtlichen Vorgaben am Grundstück.' },
      { icon: ['M3 8h6v6H3z', 'M9 8h6v6H9z', 'M15 8h6v6h-6z', 'M6 14h6v6H6z', 'M12 14h6v6h-6z'], titel: 'Pflasterarbeiten', kurz: 'Einfahrt, Wege und Terrasse', text: 'Pflaster, Platten und Natursteinflächen mit tragfähigem Unterbau. Versickerungsfähige Beläge können sich auf die Niederschlagswassergebühr auswirken.' },
      { icon: ['M4 4v16', 'M10 4v16', 'M16 4v16', 'M2 9h20', 'M2 15h20'], titel: 'Zaunbau & Sichtschutz', kurz: 'Metall, Holz oder Doppelstab', text: 'Zäune, Tore und Sichtschutzwände – mit Blick auf Grenzabstände und Höhen nach Nachbarrecht und Bebauungsplan.' },
      { icon: ['M3 10h18', 'M5 10v10', 'M19 10v10', 'M3 10l2-4h14l2 4'], titel: 'Carport & Wintergarten', kurz: 'Überdachter Stellplatz, mehr Wohnraum', text: 'Carports und Wintergärten verändern das Grundstück baulich; je nach Größe und Lage ist eine Genehmigung erforderlich.' },
    ],
  },
  ablauf: {
    h2Betont: 'Fachbetrieb für Außenanlagen',
    schritte: [
      { titel: 'Vorhaben schildern', text: 'Was geplant ist, ungefähre Maße und Fotos vom Grundstück – per Formular oder Telefon.' },
      { titel: 'Betrieb auswählen', text: 'Wir wählen einen Fachbetrieb aus, der zu Ihrem Vorhaben und Ihrem Ort passt.' },
      { titel: 'Besichtigung & Angebot', text: 'Der Betrieb meldet sich, sieht sich das Grundstück an und erstellt ein Angebot.' },
      { titel: 'Sie entscheiden', text: 'Sie entscheiden frei; der Vertrag kommt direkt mit dem Betrieb zustande.' },
    ],
  },
  warum: {
    text: 'Bei Außenanlagen spielen Baurecht, Nachbarrecht und Entwässerung eine Rolle. Wir übernehmen die Suche nach einem passenden Fachbetrieb – für Sie kostenlos und unverbindlich. Die Kosten tragen die Fachbetriebe.',
    usps: [
      { titel: 'Ein Betrieb je Anfrage', text: 'Ihre Angaben gehen an genau einen passenden Fachbetrieb.' },
      { titel: 'Ortsbezogene Auswahl', text: 'Wir berücksichtigen bei der Auswahl, wo Ihr Grundstück liegt.' },
      { titel: 'Kostenlos für Sie', text: 'Keine Gebühr und kein Aufschlag für Sie als Auftraggeber.' },
    ],
  },
  cta: { h2: 'Terrasse, Zaun oder', h2Betont: 'Einfahrt?', text: 'Schildern Sie uns Ihr Vorhaben – wir wählen einen passenden Fachbetrieb aus. Kostenlos und unverbindlich.' },
  faqTitel: 'Garten & Außenanlagen',
  faqs: [
    { q: 'Brauche ich für eine Terrassenüberdachung eine Baugenehmigung?', a: 'In Baden-Württemberg sind kleinere Terrassenüberdachungen nach dem Anhang zur Landesbauordnung häufig verfahrensfrei. Bebauungsplan, Abstandsflächen und gegebenenfalls Gestaltungsvorgaben gelten trotzdem. Verbindliche Auskunft gibt die zuständige Baurechtsbehörde.' },
    { q: 'Wie hoch darf mein Zaun sein?', a: 'Das hängt vom Bebauungsplan, örtlichen Satzungen und dem Nachbarrechtsgesetz Baden-Württemberg ab, das unter anderem Grenzabstände regelt. Auskunft geben Stadt bzw. Gemeinde.' },
    { q: 'Ist ein Carport genehmigungspflichtig?', a: 'Kleinere Carports und Garagen können verfahrensfrei sein, an der Grundstücksgrenze gelten jedoch besondere Regeln zu Länge, Höhe und Abstand. Maßgeblich sind Landesbauordnung und Bebauungsplan.' },
    { q: 'Spielt die Pflasterfläche für die Abwassergebühr eine Rolle?', a: 'In vielen Gemeinden wird die Niederschlagswassergebühr nach versiegelter Fläche berechnet. Versickerungsfähige Beläge können dabei geringer angesetzt werden; die Einzelheiten regelt die örtliche Satzung.' },
    { q: 'Brauche ich für einen Wintergarten eine Genehmigung?', a: 'Ein beheizter Wintergarten ist ein Anbau und in der Regel genehmigungspflichtig; zudem gelten Anforderungen an den Wärmeschutz. Auskunft gibt die Baurechtsbehörde.' },
    { q: 'Welche Angaben helfen für ein Angebot?', a: 'Was gebaut werden soll, ungefähre Maße, gewünschtes Material, Zugang zum Grundstück und Fotos der Fläche.' },
  ],
  seo: [
    { h2: 'Terrassenüberdachung planen und bauen lassen', text: 'Aluminium, Holz oder Glas, mit oder ohne Seitenwände: Eine Terrassenüberdachung braucht eine tragfähige Konstruktion und eine durchdachte Entwässerung. Wir vermitteln Ihnen einen passenden Fachbetrieb.' },
    { h2: 'Pflasterarbeiten für Einfahrt und Wege', text: 'Eine haltbare Pflasterfläche steht und fällt mit dem Unterbau. Je nach Belastung – Gehweg oder befahrene Einfahrt – unterscheiden sich Aufbau und Material.' },
    { h2: 'Zaunbau und Sichtschutz', text: 'Doppelstabmatten, Holz- oder Metallzäune, Tore und Sichtschutzwände: Der Fachbetrieb berücksichtigt Bodenverhältnisse, Höhenvorgaben und Grenzabstände.' },
    { h2: 'Carport und Wintergarten', text: 'Ein Carport schützt das Auto, ein Wintergarten schafft zusätzlichen Wohnraum. Beide Vorhaben sollten früh mit Bebauungsplan und Baurecht abgeglichen werden.' },
  ],
}
