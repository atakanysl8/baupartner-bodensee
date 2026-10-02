import Nav from './Nav'
import Footer from './Footer'
import { LEISTUNGEN } from '../inhalte/leistungen'
import { nachbarn, andereLeistungen, pfad, type Ortsseite } from '../inhalte/orte'
import { VERWANDT } from '../inhalte/ratgeber'
import { RATGEBERLINKS } from '../inhalte/ratgeber-seiten/links'
import { anker } from '../inhalte/anker'

const BASIS = 'https://www.bodensee-baupartner.de'

// Darstellung einer Ortsseite (Leistung × Ort). Server-Komponente: der Inhalt steht vollständig im HTML.
export default function OrtSeite({ s }: { s: Ortsseite }) {
  const l = LEISTUNGEN[s.leistung]
  const anfrage = `/?leistung=${encodeURIComponent(s.leistung)}&ort=${encodeURIComponent(s.ortName)}#kontakt`
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: l.name,
      name: s.h1,
      description: s.description,
      provider: { '@type': 'Organization', name: 'Bodensee BauPartner GbR', url: `${BASIS}/` },
      areaServed: { '@type': 'City', name: s.ortName },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Start', item: `${BASIS}/` },
        { '@type': 'ListItem', position: 2, name: l.name, item: `${BASIS}/leistungen/${s.leistung}/` },
        { '@type': 'ListItem', position: 3, name: s.ortName, item: `${BASIS}${pfad(s)}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: s.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ]
  // Linkblock nach Vault-Standard: 3 Nachbarorte derselben Leistung, Leistungsseite, 1–2 Ratgeber der Leistung,
  // höchstens 2 fachlich verwandte Leistungen im selben Ort (statt aller übrigen), Hub.
  const verwandt = VERWANDT[s.leistung]
  const imOrt = andereLeistungen(s)
    .filter((x) => verwandt.includes(x.leistung))
    .sort((a, b) => verwandt.indexOf(a.leistung) - verwandt.indexOf(b.leistung))
    .slice(0, 2)
  const ratgeber = RATGEBERLINKS.filter((r) => r.leistung === s.leistung).slice(0, 2)
  const leistungPfad = `/leistungen/${s.leistung}/`

  return (
    <>
      <Nav aktuelleLeistung={`/leistungen/${s.leistung}/`} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="ort-section">
        <div className="wrap ort-inner">
          <nav className="ort-crumbs" aria-label="Brotkrume">
            <a href="/">Start</a> › <a href={`/leistungen/${s.leistung}/`}>{l.name}</a> › <span>{s.ortName}</span>
          </nav>
          <div className="eyebrow"><span className="bullet" /> {l.name} · {s.kreis}</div>
          <h1 className="ort-h1">{s.h1}</h1>
          <p className="ort-lead">{s.einstieg}</p>
          <a className="btn btn-primary" href={anfrage}>Anfrage kostenlos stellen</a>

          {s.abschnitte.map((a) => (
            <section key={a.h2} className="ort-block">
              <h2>{a.h2}</h2>
              <p>{a.text}</p>
            </section>
          ))}

          <section className="ort-block">
            <h2>Gut zu wissen für {s.ortName}</h2>
            <ul className="ort-fakten">
              {s.fakten.map((f, i) => (
                <li key={i}>
                  {f.text}{' '}
                  <a href={f.url} rel="nofollow noopener" target="_blank">{f.quelle}</a>
                </li>
              ))}
            </ul>
          </section>

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
            <h2>Ihr Vorhaben in {s.ortName}</h2>
            <p>Schildern Sie uns kurz, was geplant ist – wir wählen einen passenden Fachbetrieb aus, der sich bei Ihnen meldet. Für Sie ist unser Service kostenlos und unverbindlich. Die Kosten tragen die Fachbetriebe.</p>
            <a className="btn btn-primary" href={anfrage}>Anfrage kostenlos stellen</a>
          </section>

          <section className="ort-block ort-links">
            <h2>Weitere Orte und Leistungen</h2>
            <ul>
              {nachbarn(s).map((n) => (
                <li key={pfad(n)}><a href={pfad(n)}>{n.h1}</a></li>
              ))}
              <li><a href={leistungPfad}>{anker(leistungPfad)}</a> – Überblick</li>
              {ratgeber.map((r) => (
                <li key={r.slug}><a href={`/ratgeber/${r.slug}/`}>{r.anker}</a> – Preisspannen und Kostenfaktoren</li>
              ))}
              {imOrt.map((n) => (
                <li key={pfad(n)}><a href={pfad(n)}>{n.h1}</a></li>
              ))}
              <li><a href="/regionen/">{anker('/regionen/')}</a></li>
            </ul>
          </section>

          <section className="ort-block ort-quellen">
            <h2>Quellen</h2>
            <ul>
              {s.fakten.map((f, i) => (
                <li key={i}>{f.quelle}, abgerufen am {f.abruf.split('-').reverse().join('.')}</li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
