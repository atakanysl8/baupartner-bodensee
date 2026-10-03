import LINKS from '../inhalte/externe-links.json'

type ExternerLink = { anker: string; url: string; herausgeber: string; satz: string }

// Ausgehende Links auf amtliche und neutrale Informationsseiten je Leistung (Quelle: docs/seo/externe-links.json,
// alle URLs am 03.10.2026 geprüft). Normale (follow) Links: thematische Verweise auf Autoritäten.
export default function ExterneInfos({ leistung }: { leistung: string }) {
  const links = (LINKS as Record<string, ExternerLink[]>)[leistung] ?? []
  if (!links.length) return null
  return (
    <div className="ext-infos">
      <h3 className="lk-abschnitt-titel">Unabhängige Informationen</h3>
      <p className="ext-intro">Amtliche und neutrale Stellen, die bei der Planung weiterhelfen:</p>
      <ul className="ext-liste">
        {links.map((l) => (
          <li key={l.url}>
            <a className="ext-karte" href={l.url} target="_blank" rel="noopener">
              <span className="ext-kopf">
                <span className="ext-titel">{l.anker}</span>
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M5 3h6v6M11 3L4 10" stroke="currentColor" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <span className="ext-satz">{l.satz}</span>
              <span className="ext-herausgeber">{l.herausgeber}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
