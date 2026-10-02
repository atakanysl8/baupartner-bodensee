import type { LeistungSlug } from './leistungen'

// Ratgeber-Abschnitte der Leistungsseiten. Sie beantworten die Fragen mit der höchsten gemessenen
// Nachfrage (OpenSEO, 02.10.2026: z. B. „badsanierung kosten“ 4.400, „kernsanierung“ 2.400,
// „bodenplatte kosten“ 1.000 Suchen/Monat). Keine Beträge ohne Quelle, keine Handlungsanweisungen
// in Rechts- oder Förderfragen, keine Zusagen im Namen Dritter.
export type RatgeberBlock = { h3: string; text: string }
export type Ratgeber = { h2: string; intro: string; bloecke: RatgeberBlock[] }

// Verwandte Leistungen: Querverweise unter dem Ratgeber (interne Verlinkung)
export const VERWANDT: Record<LeistungSlug, LeistungSlug[]> = {
  'hochbau': ['dach-fassade', 'tiefbau', 'fenster-tueren'],
  'dach-fassade': ['elektro-photovoltaik', 'fenster-tueren', 'renovierung-sanierung'],
  'tiefbau': ['hochbau', 'garten-aussenanlagen'],
  'renovierung-sanierung': ['heizung-waermepumpe', 'fenster-tueren', 'dach-fassade', 'bad-sanitaer'],
  'bad-sanitaer': ['maler-fliesen-boeden', 'heizung-waermepumpe', 'renovierung-sanierung'],
  'heizung-waermepumpe': ['elektro-photovoltaik', 'renovierung-sanierung', 'bad-sanitaer'],
  'elektro-photovoltaik': ['heizung-waermepumpe', 'dach-fassade', 'innenausbau'],
  'fenster-tueren': ['renovierung-sanierung', 'dach-fassade', 'maler-fliesen-boeden'],
  'innenausbau': ['maler-fliesen-boeden', 'elektro-photovoltaik', 'bad-sanitaer'],
  'maler-fliesen-boeden': ['innenausbau', 'bad-sanitaer', 'renovierung-sanierung'],
  'garten-aussenanlagen': ['tiefbau', 'hochbau', 'fenster-tueren'],
}

export const RATGEBER: Record<LeistungSlug, Ratgeber> = {
  'bad-sanitaer': {
    h2: 'Badsanierung: Kosten, barrierefreies Bad und Förderung',
    intro: 'Die häufigsten Fragen vor einer Badsanierung drehen sich um den Preis, um ein barrierefreies Bad und um mögliche Zuschüsse. Hier die wichtigsten Zusammenhänge.',
    bloecke: [
      {
        h3: 'Wovon die Kosten einer Badsanierung abhängen',
        text: 'Den größten Unterschied macht der Umfang: Werden nur Sanitärobjekte und Armaturen getauscht, bleibt der Aufwand überschaubar. Müssen dagegen Wasser- und Abwasserleitungen, Estrich und Abdichtung erneuert oder Wände versetzt werden, steigen Kosten und Bauzeit deutlich. Weitere Faktoren sind die Größe des Raums, die Fliesenfläche, bodengleiche Duschen (Gefälle und Abdichtung), die Zahl der beteiligten Gewerke und die Ausstattungslinie. Ein belastbarer Preis entsteht erst nach einer Besichtigung – mit Maßen, Fotos und einer kurzen Beschreibung Ihrer Wünsche kann der Fachbetrieb sein Angebot gezielt vorbereiten.',
      },
      {
        h3: 'Barrierefreies und altersgerechtes Bad',
        text: 'Typische Maßnahmen sind eine bodengleiche Dusche, ausreichend Bewegungsfläche, ein unterfahrbarer Waschtisch, Haltegriffe und ein erhöhtes WC. Die DIN 18040-2 beschreibt Anforderungen an barrierefreie Wohnungen; ob alle Maße im Bestand erreichbar sind, hängt vom Grundriss ab. Oft lässt sich ein Bad schrittweise anpassen – etwa zuerst die Dusche, später weitere Elemente. Wichtig ist, Leitungsführung und Abdichtung von Anfang an so zu planen, dass spätere Ergänzungen möglich bleiben.',
      },
      {
        h3: 'Zuschüsse für den Badumbau',
        text: 'Für Menschen mit anerkanntem Pflegegrad kann die Pflegekasse wohnumfeldverbessernde Maßnahmen bezuschussen (§ 40 Abs. 4 SGB XI); maßgeblich ist die Entscheidung der Pflegekasse im Einzelfall. Daneben gibt es zeitweise Programme von Bund, Land oder Kommunen zur Barrierereduzierung, deren Bedingungen und Verfügbarkeit sich ändern. Auskunft geben die Pflegekasse, die Pflegestützpunkte der Landkreise und die jeweiligen Förderstellen – in der Regel muss ein Antrag vor Beginn der Arbeiten gestellt sein.',
      },
    ],
  },
  'renovierung-sanierung': {
    h2: 'Kernsanierung und energetische Sanierung: was den Aufwand bestimmt',
    intro: 'Ob Kernsanierung, energetische Modernisierung oder schrittweise Altbausanierung – die wichtigsten Fragen betreffen Umfang, Reihenfolge und Kosten.',
    bloecke: [
      {
        h3: 'Kernsanierung: was dazugehört',
        text: 'Bei einer Kernsanierung wird ein Gebäude bis auf die tragende Konstruktion zurückgebaut und technisch erneuert: Elektrik, Wasser- und Abwasserleitungen, Heizung, Fenster, Dämmung, Böden und oft auch der Grundriss. Weil viele Gewerke ineinandergreifen, ist eine saubere Reihenfolge entscheidend. Vor dem Start klärt eine Bestandsaufnahme Bausubstanz, Feuchte und Schadstoffe – sie bestimmt den tatsächlichen Umfang oft stärker als die Wohnfläche.',
      },
      {
        h3: 'Wovon die Kosten einer Sanierung abhängen',
        text: 'Kosten hängen vor allem vom Zustand der Substanz ab: Ein Haus mit trockenem Keller und intaktem Dach lässt sich anders sanieren als ein Altbau mit Feuchteschäden. Weitere Treiber sind der energetische Zielstandard, Denkmalschutz- oder Gestaltungsauflagen, der Umfang der Haustechnik und ob das Haus während der Arbeiten bewohnt bleibt. Seriös vergleichen lassen sich Angebote erst, wenn derselbe Leistungsumfang beschrieben ist.',
      },
      {
        h3: 'Energetische Sanierung und Förderung',
        text: 'Für Dämmung, Fenster, Heizungstausch und Anlagentechnik gibt es Förderprogramme des Bundes, die über KfW und BAFA laufen; Bedingungen und Fördersätze ändern sich regelmäßig. Häufig ist die Einbindung eines Energieeffizienz-Experten Voraussetzung, und der Antrag muss grundsätzlich vor Beginn der Maßnahme gestellt werden. Einen individuellen Sanierungsfahrplan erstellt eine Energieberatung; viele Landkreise in Baden-Württemberg haben dafür regionale Energieagenturen.',
      },
    ],
  },
  'hochbau': {
    h2: 'Rohbau, Anbau und Bodenplatte: Kosten und Planung',
    intro: 'Bei Neubau, Anbau oder Aufstockung fragen Bauherren vor allem nach den Kosten einzelner Bauabschnitte und nach dem Ablauf mit Behörden.',
    bloecke: [
      {
        h3: 'Wovon die Rohbaukosten abhängen',
        text: 'Zum Rohbau gehören in der Regel Erdarbeiten, Fundamente oder Bodenplatte, Keller, Wände, Decken, Treppen und der Dachstuhl. Die Kosten bestimmen vor allem Bauweise (Mauerwerk, Stahlbeton, Holz), Baugrund, Keller ja oder nein, Geschosszahl und die Komplexität des Grundrisses. Vergleichbar werden Angebote erst auf Basis derselben Ausführungsplanung und desselben Leistungsverzeichnisses.',
      },
      {
        h3: 'Bodenplatte: was den Preis bestimmt',
        text: 'Für die Bodenplatte entscheidend sind die Tragfähigkeit des Baugrunds, Fläche und Stärke der Platte, die Dämmung unter der Platte, Bewehrung und erforderliche Erdarbeiten. Ein Baugrundgutachten schafft hier Klarheit; ohne es lassen sich Mengen und damit Kosten nur grob abschätzen. Bei Hanglagen oder hohem Grundwasser kommen oft Abdichtung und Drainage hinzu.',
      },
      {
        h3: 'Anbau und Aufstockung',
        text: 'Ein Anbau oder eine Aufstockung schafft Wohnraum ohne Umzug, ist aber technisch anspruchsvoller als ein Neubau: Die Statik des Bestands muss die neue Last tragen, Anschlüsse an Dach, Fassade und Haustechnik müssen passen. In Baden-Württemberg sind Anbauten und Aufstockungen in der Regel genehmigungspflichtig; zuständig ist die untere Baurechtsbehörde. Den Rahmen setzt der Bebauungsplan, etwa bei Geschosszahl und Abständen.',
      },
    ],
  },
  'tiefbau': {
    h2: 'Erdarbeiten, Hausanschluss und Kanalanschluss: Kosten im Überblick',
    intro: 'Im Tiefbau entstehen die Kosten oft unsichtbar unter der Erde. Die häufigsten Fragen betreffen Erdarbeiten, Hausanschlüsse und die Entwässerung.',
    bloecke: [
      {
        h3: 'Wovon die Kosten für Erdarbeiten abhängen',
        text: 'Maßgeblich sind Menge und Art des Bodens, die Zugänglichkeit des Grundstücks für Maschinen und vor allem die Entsorgung des Aushubs. Belastetes oder felsiges Material und weite Transportwege erhöhen die Kosten deutlich. Ein Baugrundgutachten und eine frühzeitige Klärung, ob Aushub auf dem Grundstück verbleiben kann, helfen bei der Kalkulation.',
      },
      {
        h3: 'Hausanschluss und Kanalanschluss',
        text: 'Wasser-, Strom-, Gas- und Telekommunikationsanschlüsse stellen in der Regel die jeweiligen Versorger her; Grabenarbeiten auf dem Grundstück können je nach Versorger durch einen Tiefbaubetrieb erfolgen. Für den Anschluss an die öffentliche Kanalisation gelten die Entwässerungssatzung der Gemeinde und deren technische Vorgaben; häufig ist ein Entwässerungsantrag erforderlich. Die Kosten hängen von Leitungslänge, Tiefe, Oberflächen und der Entfernung zum Anschlusspunkt ab.',
      },
      {
        h3: 'Drainage und Abdichtung',
        text: 'Eine Drainage leitet Sicker- und Schichtenwasser vom Gebäude ab; ob sie sinnvoll und zulässig ist, hängt vom Baugrund und von den Vorgaben der Gemeinde zur Einleitung ab. Bei drückendem Wasser reicht eine Drainage allein in der Regel nicht – dann ist eine entsprechende Abdichtung des Bauwerks gefragt. Die Kosten richten sich nach Länge, Tiefe und dem nötigen Freilegen des Kellers.',
      },
    ],
  },
  'innenausbau': {
    h2: 'Trockenbau und Dachgeschossausbau: Kosten und Planung',
    intro: 'Beim Innenausbau geht es oft um mehr Wohnraum oder neue Raumaufteilungen. Die häufigsten Fragen betreffen Trockenbau und den Ausbau des Dachgeschosses.',
    bloecke: [
      {
        h3: 'Wovon die Kosten im Trockenbau abhängen',
        text: 'Den Preis bestimmen Fläche und Art der Konstruktion (Ständerwand, Vorsatzschale, abgehängte Decke), Anforderungen an Schall- und Brandschutz, Dämmung, Installationen in der Wand sowie die Qualitätsstufe der Oberfläche. Feuchträume brauchen geeignete Platten und Abdichtungen. Mit einem Grundriss und einer kurzen Beschreibung der gewünschten Räume kann ein Fachbetrieb gezielt anbieten.',
      },
      {
        h3: 'Dachgeschossausbau',
        text: 'Ob ein Dachgeschoss sinnvoll ausgebaut werden kann, hängt von Raumhöhe, Dachneigung, Zustand und Dämmung des Dachs sowie der Erschließung über eine Treppe ab. Entsteht neuer Wohnraum, ist in Baden-Württemberg oft ein Bauantrag nötig; die untere Baurechtsbehörde gibt Auskunft. Zu klären sind außerdem Brandschutz, Rettungswege und Wärmeschutz – sie beeinflussen Kosten und Ausführung stärker als die reine Fläche.',
      },
      { h3: 'Innentüren und Treppen', text: 'Neue Innentüren sind ein überschaubarer Eingriff, wenn Zargenmaße und Wandstärken passen; bei geänderten Öffnungen kommen Maurer- oder Trockenbauarbeiten dazu. Bei Treppen bestimmen Raumhöhe, Lauflinie und der verfügbare Grundriss die mögliche Form – im Bestand oft der entscheidende Engpass beim Dachgeschossausbau.' },
    ],
  },
  'dach-fassade': {
    h2: 'Dachsanierung: Kosten, Dämmung und Photovoltaik',
    intro: 'Vor einer Dachsanierung stehen meist drei Fragen: Was kostet sie, wie wird gedämmt und was gilt für Photovoltaik?',
    bloecke: [
      { h3: 'Wovon die Kosten einer Dachsanierung abhängen', text: 'Den Ausschlag geben Dachfläche und -form, das gewählte Material, der Zustand von Lattung und Dachstuhl, die Art der Dämmung sowie Gerüst, Entsorgung und Anschlüsse an Kamin, Gauben und Dachfenster. Ein belastbarer Preis entsteht erst nach einer Besichtigung; Fotos und die ungefähre Dachfläche helfen bei der Vorbereitung.' },
      { h3: 'Aufsparren- oder Zwischensparrendämmung?', text: 'Die Aufsparrendämmung wird von außen über die Sparren gelegt und bietet eine durchgehende Dämmebene – sinnvoll, wenn ohnehin neu eingedeckt wird. Die Zwischensparrendämmung füllt die Felder zwischen den Sparren und lässt sich oft auch von innen einbauen. Welche Lösung passt, hängt von Sparrenhöhe, Nutzung und Zustand ab.' },
      { h3: 'Photovoltaik bei der Dachsanierung', text: 'In Baden-Württemberg gilt bei grundlegenden Dachsanierungen grundsätzlich eine Photovoltaik-Pflicht; Einzelheiten und Ausnahmen regelt die Photovoltaik-Pflicht-Verordnung. Wer Dach und PV gemeinsam plant, spart ein zweites Gerüst und kann Dachdurchführungen und Leitungswege von Anfang an berücksichtigen.' },
    ],
  },
  'heizung-waermepumpe': {
    h2: 'Wärmepumpe und Heizungstausch: was vorher zu klären ist',
    intro: 'Bevor eine neue Heizung bestellt wird, lohnt der Blick auf Haus, Heizflächen und die örtliche Wärmeplanung.',
    bloecke: [
      { h3: 'Wovon die Kosten einer Wärmepumpe abhängen', text: 'Maßgeblich sind Art der Wärmepumpe (Luft-Wasser oder Erdwärme mit Bohrung bzw. Kollektor), die erforderliche Leistung, notwendige Anpassungen an Heizkörpern oder Warmwasserbereitung und der Aufwand für Aufstellung und Anschluss. Eine Heizlastberechnung ist die Grundlage für die richtige Dimensionierung.' },
      { h3: 'Vorlauftemperatur und Heizflächen', text: 'Je niedriger die Vorlauftemperatur, desto effizienter arbeitet eine Wärmepumpe. Fußbodenheizungen und große Heizkörper kommen mit niedrigen Temperaturen aus; in Bestandsgebäuden reicht es oft, einzelne Heizkörper zu tauschen oder die Gebäudehülle punktuell zu verbessern.' },
      { h3: 'Kommunale Wärmeplanung und Förderung', text: 'Die kommunale Wärmeplanung zeigt, wo Wärmenetze vorgesehen sind – dort kann ein Anschluss eine Alternative zur eigenen Heizung sein. Für erneuerbare Heizungen gibt es Förderung des Bundes im Rahmen der Bundesförderung für effiziente Gebäude; Bedingungen ändern sich, aktuelle Informationen geben KfW, BAFA und Energieberatung.' },
    ],
  },
  'elektro-photovoltaik': {
    h2: 'Elektroinstallation, Photovoltaik und Wallbox: worauf es ankommt',
    intro: 'Bei Elektroarbeiten hängen viele Fragen am Netzanschluss und am Zählerschrank.',
    bloecke: [
      { h3: 'Wovon die Kosten einer Elektroinstallation abhängen', text: 'Den Aufwand bestimmen Zahl der Stromkreise und Anschlüsse, ob Leitungen auf oder unter Putz verlegt werden, der Zustand der Bestandsanlage und ob der Zählerschrank erneuert werden muss. Bei Sanierungen ist es günstiger, Leitungen vor Putz- und Bodenarbeiten zu verlegen.' },
      { h3: 'Photovoltaik: Größe, Speicher, Anmeldung', text: 'Die sinnvolle Anlagengröße ergibt sich aus Dachfläche, Ausrichtung und Verbrauch; ein Speicher erhöht den Eigenverbrauch. PV-Anlagen sind beim Netzbetreiber anzumelden und im Marktstammdatenregister der Bundesnetzagentur zu registrieren.' },
      { h3: 'Wallbox und Zählerschrank', text: 'Für eine Wallbox prüft der Elektrofachbetrieb Hausanschluss und Zählerschrank und verlegt eine eigene Zuleitung. Ladeeinrichtungen sind dem Netzbetreiber vor Inbetriebnahme anzumelden, Geräte über 11 kW bedürfen seiner Zustimmung.' },
    ],
  },
  'fenster-tueren': {
    h2: 'Fenster tauschen: Kosten, Einbau und Lüftung',
    intro: 'Neue Fenster verändern Wärmeschutz und Raumklima – deshalb lohnt der Blick auf mehr als das Fenster selbst.',
    bloecke: [
      { h3: 'Wovon die Kosten neuer Fenster abhängen', text: 'Anzahl und Größe, Rahmenmaterial (Kunststoff, Holz, Holz-Aluminium, Aluminium), Verglasung, Sicherheitsausstattung und der Einbauaufwand bestimmen den Preis. Auch Rollladenkästen, Fensterbänke und Anschlussarbeiten an Putz und Dämmung spielen eine Rolle.' },
      { h3: 'Fachgerechter Einbau', text: 'Ein gutes Fenster verliert seinen Vorteil, wenn die Anschlüsse nicht luftdicht und schlagregendicht ausgeführt sind. Der Einbau in der Dämmebene und abgestimmte Anschlüsse vermeiden Wärmebrücken und Feuchteschäden.' },
      { h3: 'Lüften nach dem Fenstertausch', text: 'Dichte Fenster verringern den natürlichen Luftaustausch. Ein Lüftungskonzept nach DIN 1946-6 zeigt, ob zusätzliche Maßnahmen wie Fensterfalzlüfter oder eine Lüftungsanlage nötig sind, um Feuchte und Schimmel vorzubeugen.' },
    ],
  },
  'maler-fliesen-boeden': {
    h2: 'Maler, Fliesen und Böden: Kosten und Reihenfolge',
    intro: 'Bei Renovierungen entscheiden Untergrund und Reihenfolge der Arbeiten über Aufwand und Ergebnis.',
    bloecke: [
      { h3: 'Wovon die Kosten für Malerarbeiten abhängen', text: 'Fläche, Raumhöhe, Zustand des Untergrunds (Risse, alte Tapeten, Feuchteflecken), gewünschte Oberfläche und der Aufwand für Abkleben und Möbelschutz bestimmen den Preis. Ein sauber vorbereiteter Untergrund ist die halbe Arbeit.' },
      { h3: 'Fliesen: Format, Untergrund, Abdichtung', text: 'Großformatige Fliesen brauchen einen besonders ebenen Untergrund. In Duschen und Bädern ist eine fachgerechte Abdichtung unter den Fliesen entscheidend; Fliesen allein sind nicht wasserdicht.' },
      { h3: 'Böden: Belag passend zum Raum', text: 'Parkett, Laminat, Vinyl oder Fliesen unterscheiden sich in Optik, Strapazierfähigkeit, Trittschall und Eignung für Fußbodenheizung. Vor dem Verlegen werden Ebenheit und Restfeuchte des Untergrunds kontrolliert.' },
    ],
  },
  'garten-aussenanlagen': {
    h2: 'Terrassenüberdachung, Pflaster und Zaun: was zu beachten ist',
    intro: 'Bei Außenanlagen entscheiden Baurecht, Untergrund und Entwässerung über die richtige Lösung.',
    bloecke: [
      { h3: 'Wovon die Kosten einer Terrassenüberdachung abhängen', text: 'Größe, Material (Aluminium, Holz, Stahl), Eindeckung (Glas, Polycarbonat), Fundamente, Entwässerung und Extras wie Seitenwände, Beschattung oder Beleuchtung bestimmen den Preis. Schnee- und Windlasten am Standort beeinflussen die Statik.' },
      { h3: 'Baurecht und Nachbarrecht', text: 'Viele kleinere Überdachungen, Carports und Zäune sind in Baden-Württemberg verfahrensfrei – trotzdem gelten Bebauungsplan, Abstandsflächen und das Nachbarrechtsgesetz. Bei größeren Vorhaben oder an der Grundstücksgrenze lohnt eine frühe Anfrage bei der Baurechtsbehörde.' },
      { h3: 'Pflaster und Versickerung', text: 'Der Unterbau trägt die Last – für befahrene Einfahrten ist er deutlich stärker als für Gartenwege. Versickerungsfähige Beläge entlasten die Kanalisation und können je nach Satzung die Niederschlagswassergebühr senken.' },
    ],
  },
}
