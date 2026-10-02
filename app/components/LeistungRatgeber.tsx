import { RATGEBER, VERWANDT } from '../inhalte/ratgeber'
import { LEISTUNGEN, type LeistungSlug } from '../inhalte/leistungen'
import { RATGEBERLINKS } from '../inhalte/ratgeber-seiten/links'

// Ratgeber-Abschnitt einer Leistungsseite (Kosten, Planung, Förderung) — siehe app/inhalte/ratgeber.ts.
// Darunter die Kostenseiten dieser Leistung (/leistungen/<leistung>/<slug>/) und Querverweise auf verwandte Leistungen (interne Verlinkung).
export default function LeistungRatgeber({ leistung }: { leistung: LeistungSlug }) {
  const r = RATGEBER[leistung]
  const seiten = RATGEBERLINKS.filter((x) => x.leistung === leistung)
  return (
    <section className="ratgeber-section">
      <div className="wrap ratgeber-inner">
        <div className="eyebrow"><span className="bullet" /> Kosten &amp; Planung</div>
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
        {seiten.length > 0 && (
          <>
            <h3 className="leistung-kosten-titel">Kosten im Detail</h3>
            <ul className="start-ratgeber-liste">
              {seiten.map((x) => (
                <li key={x.slug}><a href={x.pfad}>{x.anker}</a></li>
              ))}
            </ul>
          </>
        )}
        <p className="ratgeber-verwandt">
          Passend dazu:{' '}
          {VERWANDT[leistung].map((v, i) => (
            <span key={v}>
              {i > 0 && ' · '}
              <a href={`/leistungen/${v}/`}>{LEISTUNGEN[v].name}</a>
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
