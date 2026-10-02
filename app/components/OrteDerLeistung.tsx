import { LEISTUNGEN, type LeistungSlug } from '../inhalte/leistungen'
import { ORTSLINKS } from '../inhalte/orte/links'

// Abschnitt „<Leistung> nach Ort“ auf einer Leistungsseite: die bis zu 12 einwohnerstärksten
// Ortsseiten dieser Leistung plus Link auf die Gesamtübersicht. Die Leistungsseiten sind
// Client-Komponenten — deshalb nur die kleine, generierte Linkliste importieren, nie orte.ts
// (sonst landen alle Ortsseiten-Texte im JavaScript-Bundle; Prüfung: scripts/pruefe-bundle.mjs).
export default function OrteDerLeistung({ leistung }: { leistung: LeistungSlug }) {
  const seiten = ORTSLINKS[leistung] ?? []
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
            <li key={s.pfad}><a href={s.pfad}>{s.h1}</a></li>
          ))}
          <li><a href="/regionen/">Alle Orte im Überblick</a></li>
        </ul>
      </div>
    </section>
  )
}
