import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { LEISTUNGEN } from '../inhalte/leistungen'
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
            Hier finden Sie unsere Seiten zu Badsanierung, Bauunternehmen, Sanierung und Innenausbau in einzelnen Städten Baden-Württembergs – mit örtlichen Hinweisen zu Zuständigkeiten, Satzungen und Beratungsstellen. Ihre Anfrage ist kostenlos und unverbindlich.
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
                          <a href={pfad(s)} title={s.h1}>{LEISTUNGEN[s.leistung].ortsTitel(ort).split(' in ')[0]}</a>
                        </span>
                      ))}
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
