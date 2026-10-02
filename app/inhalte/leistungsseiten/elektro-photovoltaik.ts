import type { LeistungsInhalt } from '../../components/LeistungSeite'

export const INHALT: LeistungsInhalt = {
  beschreibung: 'Elektriker, Elektroinstallation, Photovoltaik und Wallbox: Bodensee BauPartner vermittelt Ihnen einen passenden Elektrofachbetrieb – kostenlos und unverbindlich.',
  hero: {
    eyebrow: 'Vermittlung für Elektro & Photovoltaik · Baden-Württemberg',
    h1: 'Elektriker &',
    h1Betont: 'Photovoltaik',
    unterzeile: 'Elektroinstallation, PV-Anlage und Wallbox',
    lead: 'Neue Elektrik im Altbau, eine Photovoltaikanlage aufs Dach oder eine Wallbox in die Garage: Schildern Sie uns Ihr Vorhaben, wir wählen einen passenden Elektrofachbetrieb aus.',
    bildAlt: 'Elektroinstallation und Photovoltaik',
  },
  karten: {
    h2: 'Fachbetriebe für',
    h2Betont: 'Elektro und Solar',
    intro: 'Von der Steckdose bis zur eigenen Stromerzeugung.',
    liste: [
      { icon: ['M13 2L4 14h7l-1 8 9-12h-7z'], titel: 'Elektroinstallation', kurz: 'Neu- und Altbau, Sanierung', text: 'Neue Leitungen, zusätzliche Stromkreise, Elektrik im Zuge einer Sanierung oder ein Umbau der Unterverteilung – ausgeführt von einem eingetragenen Elektrofachbetrieb.' },
      { icon: ['M3 20h18', 'M5 20l3-9h8l3 9', 'M8 11l1-4h6l1 4', 'M12 3v2'], titel: 'Photovoltaikanlage', kurz: 'Strom vom eigenen Dach', text: 'Planung und Installation einer PV-Anlage, auf Wunsch mit Speicher. Ausrichtung, Dachzustand und Netzanschluss bestimmen die sinnvolle Größe.' },
      { icon: ['M6 3h8v18H6z', 'M14 8h3a2 2 0 012 2v6', 'M9 7h2', 'M10 12l-1 3h2l-1 3'], titel: 'Wallbox', kurz: 'Laden in der eigenen Garage', text: 'Installation einer Ladestation für das Elektroauto, einschließlich Prüfung, ob Hausanschluss und Zählerschrank dafür ausgelegt sind.' },
      { icon: ['M4 4h16v16H4z', 'M8 8h3v3H8z', 'M13 8h3v3h-3z', 'M8 13h3v3H8z', 'M13 13h3v3h-3z'], titel: 'Zählerschrank & Smart Home', kurz: 'Unterverteilung modernisieren', text: 'Ein veralteter Zählerschrank muss bei Erweiterungen wie PV oder Wallbox oft erneuert werden. Dazu kommen Smart-Home-Lösungen für Licht, Heizung und Sicherheit.' },
    ],
  },
  ablauf: {
    h2Betont: 'Elektrofachbetrieb',
    schritte: [
      { titel: 'Vorhaben schildern', text: 'Was soll gemacht werden, Baujahr des Hauses, Zustand der Elektrik – per Formular oder Telefon.' },
      { titel: 'Betrieb auswählen', text: 'Wir wählen einen Elektrofachbetrieb aus, der zu Ihrem Vorhaben und Ihrem Ort passt.' },
      { titel: 'Termin & Angebot', text: 'Der Betrieb meldet sich bei Ihnen, prüft die Gegebenheiten und erstellt ein Angebot.' },
      { titel: 'Sie entscheiden', text: 'Sie entscheiden frei; der Vertrag kommt direkt mit dem Betrieb zustande.' },
    ],
  },
  warum: {
    text: 'Elektroarbeiten am Hausnetz dürfen nur eingetragene Fachbetriebe ausführen – und gerade bei PV und Wallbox hängt vieles am Netzanschluss. Wir übernehmen die Suche nach einem passenden Betrieb. Für Sie kostenlos und unverbindlich; die Kosten tragen die Fachbetriebe.',
    usps: [
      { titel: 'Ein Betrieb je Anfrage', text: 'Ihre Angaben gehen an genau einen passenden Fachbetrieb.' },
      { titel: 'Ortsbezogene Auswahl', text: 'Wir berücksichtigen bei der Auswahl, wo Ihr Haus steht.' },
      { titel: 'Kostenlos für Sie', text: 'Keine Gebühr und kein Aufschlag für Sie als Auftraggeber.' },
    ],
  },
  cta: { h2: 'Elektrik, PV oder', h2Betont: 'Wallbox?', text: 'Schildern Sie uns Ihr Vorhaben – wir wählen einen passenden Elektrofachbetrieb aus. Kostenlos und unverbindlich.' },
  faqTitel: 'Elektro & Photovoltaik',
  faqs: [
    { q: 'Wer darf Arbeiten an der Hausinstallation ausführen?', a: 'Arbeiten an elektrischen Anlagen hinter dem Hausanschluss dürfen nach der Niederspannungsanschlussverordnung grundsätzlich nur Installationsunternehmen ausführen, die im Installateurverzeichnis eines Netzbetreibers eingetragen sind.' },
    { q: 'Muss die Elektrik im Altbau erneuert werden?', a: 'Eine allgemeine Austauschpflicht gibt es in der Regel nicht. Bei Umbauten oder Erweiterungen müssen neue Anlagenteile aber den aktuellen Regeln entsprechen; bei sehr alten Anlagen ist eine Prüfung durch einen Elektrofachbetrieb sinnvoll.' },
    { q: 'Muss ich eine Wallbox anmelden?', a: 'Ladeeinrichtungen sind dem Netzbetreiber vor Inbetriebnahme anzumelden; Wallboxen mit mehr als 11 kW Leistung bedürfen zusätzlich seiner Zustimmung. Das regelt die Niederspannungsanschlussverordnung.' },
    { q: 'Was muss bei einer Photovoltaikanlage angemeldet werden?', a: 'Eine PV-Anlage ist beim Netzbetreiber anzumelden und im Marktstammdatenregister der Bundesnetzagentur zu registrieren. Welche Unterlagen der Netzbetreiber im Einzelnen verlangt, steht auf dessen Website.' },
    { q: 'Gibt es in Baden-Württemberg eine Photovoltaik-Pflicht?', a: 'Für Neubauten und bei grundlegenden Dachsanierungen gilt in Baden-Württemberg grundsätzlich eine Photovoltaik-Pflicht; Einzelheiten und Ausnahmen regelt die Photovoltaik-Pflicht-Verordnung des Landes.' },
    { q: 'Welche Angaben helfen für ein Angebot?', a: 'Baujahr des Hauses, Alter des Zählerschranks, bei PV Dachausrichtung und -fläche, bei der Wallbox Abstand zwischen Zählerschrank und Stellplatz. Fotos von Zählerschrank und Dach helfen sehr.' },
  ],
  seo: [
    { h2: 'Elektriker gesucht – Vermittlung in Baden-Württemberg', text: 'Ob neue Steckdosen, eine komplette Elektroinstallation im Altbau oder die Erweiterung der Unterverteilung: Bodensee BauPartner vermittelt Ihnen einen Elektrofachbetrieb, der zu Ihrem Vorhaben passt – kostenlos und unverbindlich.' },
    { h2: 'Photovoltaikanlage planen und installieren lassen', text: 'Wie groß eine PV-Anlage sinnvollerweise wird, hängt von Dachfläche, Ausrichtung, Verbrauch und Netzanschluss ab. Ein Batteriespeicher kann den Eigenverbrauch erhöhen. Der vermittelte Betrieb plant die Anlage für Ihr Dach.' },
    { h2: 'Wallbox für das Elektroauto', text: 'Für eine Wallbox prüft der Elektrofachbetrieb, ob Hausanschluss und Zählerschrank ausreichen, verlegt die Zuleitung und meldet die Ladeeinrichtung beim Netzbetreiber an. In Kombination mit PV lässt sich Solarstrom direkt laden.' },
    { h2: 'Elektrik bei Sanierung und Umbau', text: 'Wer Bad, Küche oder Dachgeschoss umbaut, erneuert die Elektrik sinnvollerweise gleich mit. Leitungen werden verlegt, bevor Wände geschlossen und Böden verlegt werden – eine frühe Abstimmung spart doppelte Arbeit.' },
  ],
}
