import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { GRUPPEN, leistungenDerGruppe } from '../inhalte/leistungen'
import { RATGEBERLINKS } from '../inhalte/ratgeber-seiten/links'

const BASIS = 'https://www.bodensee-baupartner.de'

// Hub aller Ratgeberseiten, gruppiert wie die Leistungen — normale, crawlbare Links mit festem Anker.
export default function RatgeberHub() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Start', item: `${BASIS}/` },
      { '@type': 'ListItem', position: 2, name: 'Ratgeber', item: `${BASIS}/ratgeber/` },
    ],
  }
  return (
    <>
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="ort-section">
        <div className="wrap ort-inner">
          <nav className="ort-crumbs" aria-label="Brotkrume">
            <a href="/">Start</a> › <span>Ratgeber</span>
          </nav>
          <div className="eyebrow"><span className="bullet" /> Ratgeber</div>
          <h1 className="ort-h1">Ratgeber: Was kosten Bau, Sanierung und Ausbau?</h1>
          <p className="ort-lead">
            Bevor ein Angebot kommt, hilft eine realistische Vorstellung vom Budget. Unsere Kostenratgeber nennen Preisspannen aus zitierfähigen Quellen, erklären, wovon der Preis abhängt, und zeigen, was Sie für ein belastbares Angebot vorbereiten können. Für ein konkretes Vorhaben wählen wir kostenlos einen passenden Fachbetrieb aus.
          </p>
          {GRUPPEN.map((g) => {
            const leistungen = leistungenDerGruppe(g.gruppe).filter((l) => RATGEBERLINKS.some((r) => r.leistung === l.slug))
            if (!leistungen.length) return null
            return (
              <section key={g.gruppe} className="regionen-kreis">
                <h2>{g.titel}</h2>
                <ul className="regionen-liste">
                  {leistungen.map((l) => (
                    <li key={l.slug}>
                      <strong>{l.name}:</strong>{' '}
                      {RATGEBERLINKS.filter((r) => r.leistung === l.slug).map((r, i) => (
                        <span key={r.slug}>
                          {i > 0 && ' · '}
                          <a href={`/ratgeber/${r.slug}/`}>{r.anker}</a>
                        </span>
                      ))}
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}
        </div>
      </main>
      <Footer />
    </>
  )
}
