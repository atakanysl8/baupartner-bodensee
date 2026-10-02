import type { LeistungSlug } from './leistungen'

// Ratgeber-Abschnitte der Leistungsseiten. Sie beantworten die Fragen mit der höchsten gemessenen
// Nachfrage (OpenSEO, 02.10.2026: z. B. „badsanierung kosten“ 4.400, „kernsanierung“ 2.400,
// „bodenplatte kosten“ 1.000 Suchen/Monat). Keine Beträge ohne Quelle, keine Handlungsanweisungen
// in Rechts- oder Förderfragen, keine Zusagen im Namen Dritter.
export type RatgeberBlock = { h3: string; text: string }
export type Ratgeber = { h2: string; intro: string; bloecke: RatgeberBlock[] }

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
      {
        h3: 'Böden, Türen und Oberflächen',
        text: 'Für Böden zählen Untergrund, Estrich und Feuchte: Auf einem unebenen oder feuchten Estrich muss vor dem Verlegen nachgearbeitet werden. Bei Türen und Malerarbeiten bestimmen Anzahl, Maße und gewünschte Ausführung den Aufwand. Mehrere Gewerke lassen sich zeitlich so abstimmen, dass Räume nur einmal stillgelegt werden.',
      },
    ],
  },
}
