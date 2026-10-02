import { RATGEBER, VERWANDT } from '../inhalte/ratgeber'
import { LEISTUNGEN, type LeistungSlug } from '../inhalte/leistungen'
import { RATGEBERLINKS } from '../inhalte/ratgeber-seiten/links'
import { LinkKarten, LinkChips } from './LinkKarten'

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
          {/* Aufklappbar: nur die Überschrift ist sichtbar, der Text steht trotzdem im HTML (Suchmaschinen) */}
          {r.bloecke.map((b) => (
            <details key={b.h3} className="ratgeber-block ratgeber-klapp">
              <summary>
                <h3>{b.h3}</h3>
                <span className="ratgeber-pfeil" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 5l4 4 4-4" stroke="currentColor" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </summary>
              <p>{b.text}</p>
            </details>
          ))}
        </div>
        {seiten.length > 0 && (
          <>
            <h3 className="lk-abschnitt-titel">Kosten im Detail</h3>
            <LinkKarten karten={seiten.map((x) => ({ href: x.pfad, titel: x.anker, zusatz: 'Preise & Kostenfaktoren', art: 'kosten' as const }))} />
          </>
        )}
        <LinkChips label="Passend dazu" links={VERWANDT[leistung].map((v) => ({ href: `/leistungen/${v}/`, titel: LEISTUNGEN[v].name }))} />
      </div>
    </section>
  )
}
