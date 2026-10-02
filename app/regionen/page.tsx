import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { LEISTUNGEN, LEISTUNG_SLUGS } from '../inhalte/leistungen'
import { RATGEBERLINKS } from '../inhalte/ratgeber-seiten/links'
import { ORTSSEITEN, pfad, einwohner, type Ortsseite } from '../inhalte/orte'

// Übersicht aller Ortsseiten, gruppiert nach Stadt-/Landkreis — normale, crawlbare Links.
export default function RegionenPage() {
  const kreise = new Map<string, Map<string, Ortsseite[]>>()
  for (const s of ORTSSEITEN) {
    const orte = kreise.get(s.kreis) ?? new Map<string, Ortsseite[]>()
    orte.set(s.ortName, [...(orte.get(s.ortName) ?? []), s])
    kreise.set(s.kreis, orte)
  }
  const sortiert = [...kreise.entries()].sort(([a], [b]) => a.localeCompare(b, 'de'))

  return (
    <>
      <Nav />
      <main className="ort-section">
        <div className="wrap ort-inner">
          <nav className="ort-crumbs" aria-label="Brotkrume">
            <a href="/">Start</a> › <span>Leistungen nach Ort</span>
          </nav>
          <div className="eyebrow"><span className="bullet" /> Baden-Württemberg</div>
          <h1 className="ort-h1">Leistungen nach Ort in Baden-Württemberg</h1>
          <p className="ort-lead">
            Hier finden Sie unsere Seiten für Badsanierung, Bauunternehmen, Sanierung, Innenausbau, Elektriker, Maler und Fliesenleger, Dachdecker, Wärmepumpe und Heizung sowie Terrassenüberdachung in einzelnen Städten Baden-Württembergs – mit örtlichen Hinweisen zu Zuständigkeiten, Satzungen und Beratungsstellen. Was Vorhaben ungefähr kosten, zeigen die Kostenübersichten weiter unten. Ihre Anfrage ist kostenlos und unverbindlich.
          </p>
          {sortiert.map(([kreis, orte]) => (
            <section key={kreis} className="regionen-kreis">
              <h2>{kreis}</h2>
              <ul className="regionen-liste">
                {[...orte.entries()]
                  .sort(([, a], [, b]) => einwohner(b[0]) - einwohner(a[0]))
                  .map(([ort, seiten]) => (
                    <li key={ort}>
                      <strong>{ort}:</strong>{' '}
                      {seiten.map((s, i) => (
                        <span key={s.leistung}>
                          {i > 0 && ' · '}
                          <a href={pfad(s)} title={s.h1}>{LEISTUNGEN[s.leistung].kurz}</a>
                        </span>
                      ))}
                    </li>
                  ))}
              </ul>
            </section>
          ))}
          <section className="regionen-kreis">
            <h2>Kosten nach Leistung</h2>
            <ul className="regionen-liste">
              {LEISTUNG_SLUGS.filter((l) => RATGEBERLINKS.some((r) => r.leistung === l)).map((l) => (
                <li key={l}>
                  <strong>{LEISTUNGEN[l].name}:</strong>{' '}
                  {RATGEBERLINKS.filter((r) => r.leistung === l).map((r, i) => (
                    <span key={r.slug}>
                      {i > 0 && ' · '}
                      <a href={r.pfad}>{r.anker}</a>
                    </span>
                  ))}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
