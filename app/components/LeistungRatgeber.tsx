import { RATGEBER } from '../inhalte/ratgeber'
import type { LeistungSlug } from '../inhalte/leistungen'

// Ratgeber-Abschnitt einer Leistungsseite (Kosten, Planung, Förderung) — siehe app/inhalte/ratgeber.ts.
export default function LeistungRatgeber({ leistung }: { leistung: LeistungSlug }) {
  const r = RATGEBER[leistung]
  return (
    <section className="ratgeber-section">
      <div className="wrap ratgeber-inner">
        <div className="eyebrow"><span className="bullet" /> Ratgeber</div>
        <h2>{r.h2}</h2>
        <p className="ratgeber-intro">{r.intro}</p>
        <div className="ratgeber-grid">
          {r.bloecke.map((b) => (
            <article key={b.h3} className="ratgeber-block">
              <h3>{b.h3}</h3>
              <p>{b.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
