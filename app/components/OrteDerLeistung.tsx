import { LEISTUNGEN, type LeistungSlug } from '../inhalte/leistungen'
import { seitenFuer, pfad, einwohner } from '../inhalte/orte'

// Abschnitt „<Leistung> nach Ort“ auf einer Leistungsseite: die bis zu 12 einwohnerstärksten
// Ortsseiten dieser Leistung plus Link auf die Gesamtübersicht. Reines Datenmodul, daher auch
// in den Client-Leistungsseiten nutzbar; rendert nichts, wenn die Leistung keine Ortsseiten hat.
export default function OrteDerLeistung({ leistung }: { leistung: LeistungSlug }) {
  const seiten = seitenFuer(leistung).sort((a, b) => einwohner(b) - einwohner(a)).slice(0, 12)
  if (seiten.length === 0) return null
  const name = LEISTUNGEN[leistung].name
  return (
    <section className="seo-section orte-der-leistung">
      <div className="wrap">
        <h2 className="seo-heading">{name} nach Ort</h2>
        <p className="seo-body">
          Für diese Städte in Baden-Württemberg haben wir eigene Seiten mit örtlichen Hinweisen zu Zuständigkeiten, Satzungen und Beratungsstellen.
        </p>
        <ul className="regionen-liste" style={{ marginTop: 16 }}>
          {seiten.map((s) => (
            <li key={s.ort}><a href={pfad(s)}>{s.h1}</a></li>
          ))}
          <li><a href="/regionen/">Alle Orte im Überblick</a></li>
        </ul>
      </div>
    </section>
  )
}
