// Einheitliche, klar klickbare Linkkarten und Link-Chips für die interne Verlinkung
// (Startseite, Leistungs-, Kosten- und Ortsseiten). Der Ankertext ist der Titel; der Zusatz
// (Klasse lk-zusatz) ist je Ziel fest und wird von scripts/pruefe-links.mjs nicht als Anker gewertet.
export type LinkKarte = { href: string; titel: string; zusatz?: string; art: 'kosten' | 'ort' | 'leistung' | 'hub' }

const Pfeil = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10m0 0L9 4m4 4l-4 4" stroke="currentColor" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

const ICON: Record<LinkKarte['art'], React.ReactNode> = {
  // Rechner für Kostenseiten
  kosten: <><rect x="5" y="3" width="14" height="18" rx="2.5" /><path d="M8.5 7.5h7M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 15.5h.01M12 15.5h.01M15.5 15.5v2.5M8.5 18h.01M12 18h.01" /></>,
  // Standort-Pin für Ortsseiten
  ort: <><path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  // Haus für Leistungsseiten
  leistung: <path d="M4 11l8-6.5 8 6.5M6 9.5V19h12V9.5M10 19v-5h4v5" />,
  // Raster für Übersichten
  hub: <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />,
}

export function LinkKarten({ karten, spalten = 3 }: { karten: LinkKarte[]; spalten?: 2 | 3 }) {
  if (!karten.length) return null
  return (
    <ul className={`lk-grid lk-grid--${spalten}`}>
      {karten.map((k) => (
        <li key={k.href}>
          <a className={`lk-karte lk-karte--${k.art}`} href={k.href}>
            <span className="lk-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{ICON[k.art]}</svg>
            </span>
            <span className="lk-text">
              {k.zusatz && <span className="lk-zusatz">{k.zusatz}</span>}
              <span className="lk-titel">{k.titel}</span>
            </span>
            <span className="lk-pfeil"><Pfeil /></span>
          </a>
        </li>
      ))}
    </ul>
  )
}

export function LinkChips({ label, links }: { label: string; links: { href: string; titel: string }[] }) {
  if (!links.length) return null
  return (
    <div className="lk-chips">
      <span className="lk-chips-label">{label}</span>
      <ul>
        {links.map((l) => (
          <li key={l.href}>
            <a className="lk-chip" href={l.href}>{l.titel}<Pfeil /></a>
          </li>
        ))}
      </ul>
    </div>
  )
}
