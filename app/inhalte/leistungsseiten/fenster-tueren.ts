import type { LeistungsInhalt } from '../../components/LeistungSeite'

export const INHALT: LeistungsInhalt = {
  beschreibung: 'Fenster austauschen, neue Haustür, Rollläden und Markisen: Bodensee BauPartner vermittelt Ihnen einen passenden Fachbetrieb – kostenlos und unverbindlich.',
  hero: {
    eyebrow: 'Vermittlung für Fenster & Türen · Baden-Württemberg',
    h1: 'Fenster &',
    h1Betont: 'Türen',
    unterzeile: 'Fenster, Haustüren und Sonnenschutz',
    lead: 'Zugige Fenster, eine alte Haustür oder fehlender Sonnenschutz: Schildern Sie uns Ihr Vorhaben, wir wählen einen passenden Fachbetrieb für Fenster und Türen aus.',
    bildAlt: 'Fenster und Türen erneuern',
  },
  karten: {
    h2: 'Fachbetriebe für',
    h2Betont: 'Fenster und Türen',
    intro: 'Vom einzelnen Fenster bis zur kompletten Gebäudehülle.',
    liste: [
      { icon: ['M4 3h16v18H4z', 'M12 3v18', 'M4 12h16'], titel: 'Fenster austauschen', kurz: 'Kunststoff, Holz oder Aluminium', text: 'Neue Fenster senken Wärmeverluste und Zugluft. Wichtig sind fachgerechter Einbau und ein Blick auf das Lüften, weil dichte Fenster den Luftaustausch verringern.' },
      { icon: ['M6 21V3h12v18', 'M3 21h18', 'M14 12h1'], titel: 'Haustüren', kurz: 'Sicherheit und Wärmeschutz', text: 'Eine neue Haustür verbessert Wärmeschutz und Einbruchschutz. Gefragt sind etwa Widerstandsklassen nach DIN EN 1627 und Mehrfachverriegelung.' },
      { icon: ['M4 3h16v4H4z', 'M4 7h16', 'M4 11h16', 'M4 15h16', 'M4 19h16'], titel: 'Rollläden & Raffstores', kurz: 'Nachrüsten oder erneuern', text: 'Vorbau- oder Aufsatzrollläden, Raffstores und elektrische Antriebe – auch zum Nachrüsten an bestehenden Fenstern.' },
      { icon: ['M3 7h18l-2 5H5z', 'M5 12v8', 'M19 12v8'], titel: 'Markisen & Sonnenschutz', kurz: 'Für Terrasse, Balkon und Fenster', text: 'Gelenkarm- und Kassettenmarkisen, Senkrechtmarkisen und Insektenschutz. Bei Mietwohnungen und Eigentümergemeinschaften gelten oft eigene Regeln.' },
    ],
  },
  ablauf: {
    h2Betont: 'Fensterbauer',
    schritte: [
      { titel: 'Vorhaben schildern', text: 'Anzahl und ungefähre Größe der Fenster oder Türen, Material und Ihre Wünsche – per Formular oder Telefon.' },
      { titel: 'Betrieb auswählen', text: 'Wir wählen einen Fachbetrieb aus, der zu Ihrem Vorhaben und Ihrem Ort passt.' },
      { titel: 'Aufmaß & Angebot', text: 'Der Betrieb meldet sich, nimmt Maß und erstellt ein Angebot.' },
      { titel: 'Sie entscheiden', text: 'Sie entscheiden frei; der Vertrag kommt direkt mit dem Betrieb zustande.' },
    ],
  },
  warum: {
    text: 'Bei Fenstern und Türen kommt es auf genaues Aufmaß und fachgerechten Einbau an. Wir nehmen Ihnen die Suche nach einem passenden Betrieb ab – für Sie kostenlos und unverbindlich. Die Kosten tragen die Fachbetriebe.',
    usps: [
      { titel: 'Ein Betrieb je Anfrage', text: 'Ihre Angaben gehen an genau einen passenden Fachbetrieb.' },
      { titel: 'Ortsbezogene Auswahl', text: 'Wir berücksichtigen bei der Auswahl, wo Ihr Haus steht.' },
      { titel: 'Kostenlos für Sie', text: 'Keine Gebühr und kein Aufschlag für Sie als Auftraggeber.' },
    ],
  },
  cta: { h2: 'Neue Fenster oder', h2Betont: 'Türen?', text: 'Schildern Sie uns Ihr Vorhaben – wir wählen einen passenden Fachbetrieb aus. Kostenlos und unverbindlich.' },
  faqTitel: 'Fenstern & Türen',
  faqs: [
    { q: 'Brauche ich für den Fenstertausch eine Genehmigung?', a: 'Ein Austausch in gleicher Größe und Gestaltung ist in der Regel verfahrensfrei. Bei Kulturdenkmalen, in Gesamtanlagen oder Gebieten mit Gestaltungssatzung können jedoch Vorgaben gelten; in Eigentümergemeinschaften entscheidet häufig die Gemeinschaft. Auskunft geben Stadt bzw. Denkmalbehörde.' },
    { q: 'Worauf muss ich nach dem Einbau neuer Fenster achten?', a: 'Dichte Fenster verringern den natürlichen Luftaustausch. Ob zusätzliche Lüftungsmaßnahmen nötig sind, wird mit einem Lüftungskonzept nach DIN 1946-6 bewertet; der Fachbetrieb berücksichtigt das bei der Planung.' },
    { q: 'Gibt es Förderung für neue Fenster und Türen?', a: 'Der Austausch von Fenstern und Außentüren kann im Rahmen der Bundesförderung für effiziente Gebäude als Einzelmaßnahme gefördert werden; Bedingungen ändern sich. Aktuelle Informationen geben BAFA und Energieberatung.' },
    { q: 'Was bedeutet RC2 bei Fenstern und Türen?', a: 'RC2 ist eine Widerstandsklasse nach DIN EN 1627 und beschreibt, wie lange ein Bauteil einem Einbruchsversuch mit einfachem Werkzeug standhält. Höhere Klassen bieten mehr Schutz.' },
    { q: 'Kann ich Rollläden nachrüsten?', a: 'Ja, häufig als Vorbaurollläden außen am Fenster. Ob Aufsatz- oder Vorbaulösung passt, hängt von Fenster und Fassade ab.' },
    { q: 'Welche Angaben helfen für ein Angebot?', a: 'Anzahl und ungefähre Maße, gewünschtes Material, ob Rollläden vorhanden sind, Baujahr des Hauses und Fotos der jetzigen Fenster oder Türen.' },
  ],
  seo: [
    { h2: 'Fenster austauschen lassen', text: 'Alte Fenster sind oft die größte Schwachstelle der Gebäudehülle. Beim Austausch zählen Verglasung, Rahmenmaterial und vor allem der fachgerechte Einbau mit luftdichtem Anschluss. Wir vermitteln Ihnen einen passenden Fensterbauer.' },
    { h2: 'Haustür erneuern', text: 'Eine neue Haustür verbessert Wärmeschutz, Schallschutz und Einbruchschutz. Gefragt sind etwa Mehrfachverriegelung und Widerstandsklassen nach DIN EN 1627.' },
    { h2: 'Rollläden, Raffstores und Markisen', text: 'Sonnenschutz hält Räume im Sommer kühler. Rollläden und Raffstores lassen sich häufig nachrüsten, Markisen schützen Terrasse und Balkon.' },
    { h2: 'Fenster im Altbau und Denkmal', text: 'In Altstädten und bei Kulturdenkmalen gelten oft Vorgaben zu Material, Teilung und Farbe. Eine frühe Abstimmung mit Stadt oder Denkmalbehörde vermeidet Verzögerungen.' },
  ],
}
