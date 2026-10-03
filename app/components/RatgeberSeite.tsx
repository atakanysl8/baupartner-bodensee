import Nav from './Nav'
import Footer from './Footer'
import TextMitLinks from './TextMitLinks'
import { LEISTUNGEN } from '../inhalte/leistungen'
import { anker } from '../inhalte/anker'
import { LinkKarten } from './LinkKarten'
import { quellenRel } from '../inhalte/quellen-rel'
import { kostenPfad, kostenseitenFuer, type Ratgeberseite } from '../inhalte/ratgeber-seiten'
import { RATGEBERLINKS } from '../inhalte/ratgeber-seiten/links'

const BASIS = 'https://www.bodensee-baupartner.de'
const datum = (d: string) => d.split('-').reverse().join('.')

// Darstellung einer Kostenseite unter /leistungen/<leistung>/<slug>/. Server-Komponente: der Text steht vollständig im HTML
// und gelangt nicht ins Client-Bundle. Verlinkung: genau ein Textlink auf die eigene Leistungsseite (im Inhalt), Anfrage-Knopf,
// verwandte Kostenseiten, alle weiteren Kostenseiten der Leistung, Hub /regionen/ (Ortsseiten bewusst nicht, Betreiberwunsch).
export default function RatgeberSeite({ s }: { s: Ratgeberseite }) {
  const l = LEISTUNGEN[s.leistung]
  const anfrage = `/?leistung=${encodeURIComponent(s.leistung)}#kontakt`
  const stand = s.quellen.map((q) => q.abruf).sort().at(-1)!
  const verwandt = s.verwandt.map((v) => RATGEBERLINKS.find((r) => r.slug === v)).filter((r) => r !== undefined)
  const weitereKosten = kostenseitenFuer(s.leistung).filter((k) => k.slug !== s.slug && !s.verwandt.includes(k.slug))
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: s.h1,
      description: s.description,
      dateModified: stand,
      author: { '@type': 'Organization', name: 'Bodensee BauPartner GbR', url: `${BASIS}/` },
      publisher: { '@type': 'Organization', name: 'Bodensee BauPartner GbR', url: `${BASIS}/` },
      mainEntityOfPage: `${BASIS}${kostenPfad(s)}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Start', item: `${BASIS}/` },
        { '@type': 'ListItem', position: 2, name: l.name, item: `${BASIS}/leistungen/${s.leistung}/` },
        { '@type': 'ListItem', position: 3, name: s.anker, item: `${BASIS}${kostenPfad(s)}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: s.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ]

  return (
    <>
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="ort-section">
        <article className="wrap ort-inner">
          <nav className="ort-crumbs" aria-label="Brotkrume">
            <a href="/">Start</a> › <a href={`/leistungen/${s.leistung}/`}>{l.name}</a> › <span>{s.anker}</span>
          </nav>
          <div className="eyebrow"><span className="bullet" /> {l.name} · Kosten</div>
          <h1 className="ort-h1">{s.h1}</h1>
          <p className="ort-lead"><TextMitLinks text={s.einstieg} /></p>
          <a className="btn btn-primary" href={anfrage}>Anfrage kostenlos stellen</a>

          <section className="ort-block">
            <h2>{s.kosten.h2}</h2>
            <p><TextMitLinks text={s.kosten.intro} /></p>
            <div className="rg-tabelle-wrap">
              <table className="rg-tabelle">
                <thead><tr><th scope="col">Posten</th><th scope="col">Kostenspanne</th><th scope="col">Quelle</th></tr></thead>
                <tbody>
                  {s.kosten.zeilen.map((z) => (
                    <tr key={z.posten}>
                      <td>{z.posten}</td>
                      <td>{z.spanne}</td>
                      <td><a href={`#quelle-${z.q}`}>[{z.q}]</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {s.kosten.hinweis && <p className="rg-hinweis"><TextMitLinks text={s.kosten.hinweis} /></p>}
          </section>

          {s.abschnitte.map((a) => (
            <section key={a.h2} className="ort-block">
              <h2>{a.h2}</h2>
              <p><TextMitLinks text={a.text} /></p>
            </section>
          ))}

          <section className="ort-block">
            <h2>Häufige Fragen</h2>
            {s.faq.map((f) => (
              <details key={f.q} className="faq-item">
                <summary className="faq-q">{f.q}</summary>
                <div className="faq-a"><p>{f.a}</p></div>
              </details>
            ))}
          </section>

          <section className="ort-block ort-cta">
            <h2>Konkretes Angebot für Ihr Vorhaben</h2>
            <p>Kostenspannen ersetzen kein Angebot. Schildern Sie uns kurz, was geplant ist – wir wählen einen passenden Fachbetrieb aus, der sich bei Ihnen meldet und vor einem Angebot den Aufwand am Objekt prüft. Für Sie ist unser Service kostenlos und unverbindlich. Die Kosten tragen die Fachbetriebe.</p>
            <a className="btn btn-primary" href={anfrage}>Anfrage kostenlos stellen</a>
          </section>

          <section className="ort-block ort-links">
            <h2>Passend zu Ihrem Vorhaben</h2>
            <LinkKarten spalten={2} karten={[
              ...verwandt.map((r) => ({ href: r.pfad, titel: r.anker, zusatz: 'Preise & Kostenfaktoren', art: 'kosten' as const })),
              ...weitereKosten.map((k) => ({ href: kostenPfad(k), titel: k.anker, zusatz: 'Preise & Kostenfaktoren', art: 'kosten' as const })),
              { href: `/leistungen/${s.leistung}/`, titel: anker(`/leistungen/${s.leistung}/`), zusatz: 'Leistung im Überblick', art: 'leistung' as const },
              { href: '/regionen/', titel: anker('/regionen/'), zusatz: 'Alle Städte in Baden-Württemberg', art: 'hub' as const },
            ]} />
          </section>

          <section className="ort-block ort-quellen">
            <h2>Quellen</h2>
            <ol>
              {s.quellen.map((q, i) => (
                <li key={q.url} id={`quelle-${i + 1}`}>
                  {q.herausgeber}: <a href={q.url} rel={quellenRel(q.url)} target="_blank">{q.titel}</a>, abgerufen am {datum(q.abruf)}
                </li>
              ))}
            </ol>
            <p className="rg-hinweis">Alle Preise sind Spannen aus den genannten Quellen zum Abrufdatum, keine Angebote. Tatsächliche Kosten hängen vom Gebäude, vom Umfang und von der Region ab.</p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  )
}
